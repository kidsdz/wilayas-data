console.log("JS loaded");
var GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzJPOpVY_X1LaAxwuXlMIXhP63h-y6DLMVVxo0nNGq2vOe83cUBSnwFs16qaQr5LXTGSw/exec";
document.addEventListener("DOMContentLoaded", function () {

/* ===============================
الولايات
=============================== */
var WILAYAS = {
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

/* ===============================
أسعار التوصيل
=============================== */
var DELIVERY_PRICES = {
"16": 400,
"31": 500,
"25": 500
};

/* ===============================
البلديات
=============================== */
var BALADIYAT = [
{ wilayaId: 5, name: "باتنة" },
{ wilayaId: 5, name: "غسيرة" },
{ wilayaId: 5, name: "معافة" },
{ wilayaId: 5, name: "سريانة" },
{ wilayaId: 5, name: "منعة" },
{ wilayaId: 5, name: "المعذر" },
{ wilayaId: 5, name: "تازولت" },
{ wilayaId: 5, name: "نقاوس" },
{ wilayaId: 5, name: "إينوغيسن" },
{ wilayaId: 5, name: "عيون العصافير" },
{ wilayaId: 5, name: "جرمة" },
{ wilayaId: 5, name: "بيطام" },
{ wilayaId: 5, name: "أريس" },
{ wilayaId: 5, name: "بومية" },
{ wilayaId: 5, name: "مرانة" },
{ wilayaId: 5, name: "تيمقاد" },
{ wilayaId: 5, name: "رأس العيون" },
{ wilayaId: 5, name: "شير" },
{ wilayaId: 5, name: "أولاد سلام" },
{ wilayaId: 5, name: "تيغرغار" },
{ wilayaId: 5, name: "عين جاسر" },
{ wilayaId: 5, name: "الحاسي" },
{ wilayaId: 5, name: "لازرو" },
{ wilayaId: 5, name: "فم الطوب" },
{ wilayaId: 5, name: "إشمول" },
{ wilayaId: 5, name: "فيسديس" },
{ wilayaId: 5, name: "القصبات" },
{ wilayaId: 5, name: "سقانة" },
{ wilayaId: 5, name: "بوزينة" },
{ wilayaId: 5, name: "وادي الشعبة" },
{ wilayaId: 5, name: "تاكسلانت" },
{ wilayaId: 5, name: "إمدوكل" },
{ wilayaId: 5, name: "أولاد عمار" },
{ wilayaId: 5, name: "الجزار" },
{ wilayaId: 5, name: "تكوت" },
{ wilayaId: 5, name: "عين التوتة" },
{ wilayaId: 5, name: "حيدوسة" },
{ wilayaId: 5, name: "ثنية العابد" },
{ wilayaId: 5, name: "وادي الماء" },
{ wilayaId: 5, name: "تالخمت" },
{ wilayaId: 5, name: "بولهيلات" },
{ wilayaId: 5, name: "لاوادي" },
{ wilayaId: 5, name: "لارباع" },
{ wilayaId: 5, name: "بولهيلات" },
{ wilayaId: 5, name: "أولاد فاضل" },
{ wilayaId: 5, name: "سفيان" },
{ wilayaId: 5, name: "رحبات" }

];

/* ===============================
تحميل الولايات
=============================== */
function fillWilayas(select) {
select.innerHTML = '<option value="">اختر الولاية</option>';
for (var code in WILAYAS) {
var opt = document.createElement("option");
opt.value = code;
opt.textContent = WILAYAS[code];
select.appendChild(opt);
}
}

/* ===============================
حساب المجموع
=============================== */
function calcTotal(wilayaCode, basePrice, box) {
var delivery = DELIVERY_PRICES[wilayaCode] || 0;
var total = basePrice + delivery;
box.textContent = "المجموع: " + total + " دج";
}

/* ===============================
ربط منتج
=============================== */
function bindProduct(num, basePrice) {
var wilaya = document.getElementById("wilaya" + num);
var baladiya = document.getElementById("baladiya" + num);
var msg = document.getElementById("msg" + num);

fillWilayas(wilaya);  

wilaya.addEventListener("change", function () {  
  baladiya.innerHTML = '<option value="">اختر البلدية</option>';  
  msg.textContent = "";  

  if (!this.value) return;  

  BALADIYAT.forEach(function (b) {  
    if (b.wilayaId === parseInt(wilaya.value)) {  
      var opt = document.createElement("option");  
      opt.value = b.name;  
      opt.textContent = b.name;  
      baladiya.appendChild(opt);  
    }  
  });  

  if (DELIVERY_PRICES[wilaya.value]) {  
    msg.textContent =  
      "سعر التوصيل: " + DELIVERY_PRICES[wilaya.value] +  
      " دج | المجموع: " +  
      (basePrice + DELIVERY_PRICES[wilaya.value]) + " دج";  
  } else {  
    msg.textContent = "سعر التوصيل يُحدد عند الاتصال";  
  }  
});

}

/* ===============================
ربط المنتجين
=============================== */
bindProduct(1, 3200);
bindProduct(2, 2900);

});

/* ===============================
إرسال الطلب واتساب
=============================== */
function sendOrder(num, price, age) {

var name = document.getElementById("name" + num).value.trim();
var phone = document.getElementById("phone" + num).value.trim();
var wilayaSelect = document.getElementById("wilaya" + num);
var baladiya = document.getElementById("baladiya" + num).value;
var msg = document.getElementById("msg" + num);

// 1️⃣ تحقق من الحقول
if (!name || !phone || !wilayaSelect.value || !baladiya) {
msg.textContent = "يرجى ملء جميع الحقول";
msg.style.color = "red";
return;
}

var wilaya = wilayaSelect.options[wilayaSelect.selectedIndex].text;

var data = {
name: name,
phone: phone,
product: "Kids DZ",
age: age,
wilaya: wilaya,
baladiya: baladiya,
price: price
};

// 2️⃣ إرسال إلى Google Sheet (هنا بالضبط 👇)
fetch(GOOGLE_SHEET_URL, {
method: "POST",
mode: "no-cors",
body: JSON.stringify(data),
headers: {
"Content-Type": "application/json"
}
});

// 3️⃣ إرسال واتساب
var text =
"طلب جديد\n" +
"الاسم: " + name + "\n" +
"الهاتف: " + phone + "\n" +
"العمر: " + age + "\n" +
"الولاية: " + wilaya + "\n" +
"البلدية: " + baladiya + "\n" +
"السعر: " + price + " دج";

window.open(
"https://wa.me/213XXXXXXXXX?text=" + encodeURIComponent(text),
"_blank"
);

// 4️⃣ رسالة نجاح
msg.style.color = "green";
msg.textContent = "تم إرسال الطلب بنجاح ✔️";
  }
 
