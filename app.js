console.log("JS loaded");

/* رابط Google Script */
const SHEET_URL = "https://script.google.com/macros/s/AKfycbzJPOpVY_X1LaAxwuXlMIXhP63h-y6DLMVVxo0nNGq2vOe83cUBSnwFs1g4aQr5LXTGSw/exec";

/* الولايات */
const WILAYAS = {
  "1":"أدرار","2":"الشلف","3":"الأغواط","4":"أم البواقي","5":"باتنة",
  "6":"بجاية","7":"بسكرة","8":"بشار","9":"البليدة","10":"البويرة",
  "11":"تمنراست","12":"تبسة","13":"تلمسان","14":"تيارت","15":"تيزي وزو",
  "16":"الجزائر","17":"الجلفة","18":"جيجل","19":"سطيف","20":"سعيدة",
  "21":"سكيكدة","22":"سيدي بلعباس","23":"عنابة","24":"قالمة","25":"قسنطينة",
  "26":"المدية","27":"مستغانم","28":"المسيلة","29":"معسكر","30":"ورقلة",
  "31":"وهران","32":"البيض","33":"إليزي","34":"برج بوعريريج","35":"بومرداس",
  "36":"الطارف","37":"تندوف","38":"تيسمسيلت","39":"الوادي","40":"خنشلة",
  "41":"سوق أهراس","42":"تيبازة","43":"ميلة","44":"عين الدفلى",
  "45":"النعامة","46":"عين تموشنت","47":"غرداية","48":"غليزان",
  "49":"تيميمون","50":"برج باجي مختار","51":"أولاد جلال",
  "52":"بني عباس","53":"عين صالح","54":"عين قزام",
  "55":"تقرت","56":"جانت","57":"المغير","58":"المنيعة"
};

/* أسعار التوصيل (عدّل كما تحب) */
const DELIVERY_PRICES = {
  "16":400,"9":450,"35":500,"42":500,
  "31":500,"25":500,"23":550,
  "19":600,"15":600,"6":650,
  "5":650,"7":700,"30":800,"47":800
};

/* البلديات */
let BALADIYAT = {};

/* تحميل البلديات وتحويلها */
fetch("baladiyat.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      if (!BALADIYAT[item.wilaya_id]) {
        BALADIYAT[item.wilaya_id] = [];
      }
      BALADIYAT[item.wilaya_id].push(item.ar_name);
    });
    loadWilayas();
  })
  .catch(err => console.error("Baladiyat error", err));

/* تحميل الولايات */
function loadWilayas() {
  [1,2].forEach(id=>{
    const w = document.getElementById("wilaya"+id);
    if(!w) return;

    w.innerHTML = `<option value="">اختر الولاية</option>`;
    for (let code in WILAYAS) {
      w.innerHTML += `<option value="${code}">${WILAYAS[code]}</option>`;
    }
  });
}

/* تحميل البلديات + سعر التوصيل */
function loadBaladiya(id) {
  const wilayaCode = document.getElementById("wilaya"+id).value;
  const baladiya = document.getElementById("baladiya"+id);
  const msg = document.getElementById("msg"+id);

  baladiya.innerHTML = `<option value="">اختر البلدية</option>`;

  if (BALADIYAT[wilayaCode]) {
    BALADIYAT[wilayaCode].forEach(name=>{
      baladiya.innerHTML += `<option value="${name}">${name}</option>`;
    });
  }

  if (DELIVERY_PRICES[wilayaCode]) {
    msg.textContent = `سعر التوصيل: ${DELIVERY_PRICES[wilayaCode]} دج`;
    msg.style.color="#333";
  } else if (wilayaCode) {
    msg.textContent = "سعر التوصيل: يُحدد عند الاتصال";
    msg.style.color="#333";
  } else {
    msg.textContent="";
  }
}

/* إرسال الطلب */
function sendOrder(id, product) {
  const name = document.getElementById("name"+id).value.trim();
  const phone = document.getElementById("phone"+id).value.trim();
  const wilayaCode = document.getElementById("wilaya"+id).value;
  const baladiya = document.getElementById("baladiya"+id).value;
  const msg = document.getElementById("msg"+id);

  if(!name||!phone||!wilayaCode||!baladiya){
    msg.textContent="يرجى ملء جميع الحقول";
    msg.style.color="red";
    return;
  }

  const productPrice = (product==="3-5") ? 3200 : 2900;
  const delivery = DELIVERY_PRICES[wilayaCode] || 0;
  const total = productPrice + delivery;

  msg.textContent=`المجموع: ${total} دج`;
  msg.style.color="blue";

  fetch(SHEET_URL,{
    method:"POST",
    body:JSON.stringify({
      name,
      phone,
      wilaya: WILAYAS[wilayaCode],
      wilayaCode,
      baladiya,
      product,
      delivery,
      total
    })
  })
  .then(()=>{
    msg.textContent="تم إرسال طلبك بنجاح ✅";
    msg.style.color="green";
  })
  .catch(()=>{
    msg.textContent="حدث خطأ، حاول لاحقاً";
    msg.style.color="red";
  });
  }
