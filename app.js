console.log("app.js loaded");

// ===============================
// CONFIG
// ===============================
var GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzJPOpVY_X1LaAxwuXlMIXhP63h-y6DLMVVxo0nNGq2vOe83cUBSnwFs16qaQr5LXTGSw/exec";

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
  "45":"النعامة","46":"عين تموشنت","47":"غرداية","48":"غليزان"
};

var DELIVERY_PRICES = {
  "16": 400,
  "31": 500,
  "25": 500
};

var BALADIYAT = [
  { wilayaId: 5, name: "باتنة" },
  { wilayaId: 5, name: "عين التوتة" },
  { wilayaId: 5, name: "نقاوس" },
  { wilayaId: 5, name: "تيمقاد" }
];

// ===============================
// DOM READY
// ===============================
document.addEventListener("DOMContentLoaded", function () {
  bindProduct(1, 3200);
  bindProduct(2, 2900);
});

// ===============================
// HELPERS
// ===============================
function fillWilayas(select) {
  select.innerHTML = '<option value="">اختر الولاية</option>';
  for (var code in WILAYAS) {
    var opt = document.createElement("option");
    opt.value = code;
    opt.textContent = WILAYAS[code];
    select.appendChild(opt);
  }
}

function bindProduct(num, basePrice) {
  var wilaya = document.getElementById("wilaya" + num);
  var baladiya = document.getElementById("baladiya" + num);
  var msg = document.getElementById("msg" + num);

  fillWilayas(wilaya);

  wilaya.addEventListener("change", function () {
    baladiya.innerHTML = '<option value="">اختر البلدية</option>';
    msg.textContent = "";

    BALADIYAT.forEach(function (b) {
      if (b.wilayaId === parseInt(wilaya.value)) {
        var opt = document.createElement("option");
        opt.value = b.name;
        opt.textContent = b.name;
        baladiya.appendChild(opt);
      }
    });

    var delivery = DELIVERY_PRICES[wilaya.value] || 0;
    if (delivery) {
      msg.textContent =
        "سعر التوصيل: " + delivery +
        " دج | المجموع: " + (basePrice + delivery) + " دج";
    } else {
      msg.textContent = "سعر التوصيل يُحدد عند الاتصال";
    }
  });
}

// ===============================
// SEND ORDER
// ===============================
function sendOrder(num, price, age) {

  if (sendOrder.locked) return;
  sendOrder.locked = true;

  var name = document.getElementById("name" + num).value.trim();
  var phone = document.getElementById("phone" + num).value.trim();
  var wilayaSelect = document.getElementById("wilaya" + num);
  var baladiya = document.getElementById("baladiya" + num).value;
  var msg = document.getElementById("msg" + num);

  if (!name || !phone || !wilayaSelect.value || !baladiya) {
    msg.style.color = "red";
    msg.textContent = "يرجى ملء جميع الحقول";
    sendOrder.locked = false;
    return;
  }

  var wilayaCode = wilayaSelect.value;
  var wilayaName = wilayaSelect.options[wilayaSelect.selectedIndex].text;
  var delivery = DELIVERY_PRICES[wilayaCode] || 0;
  var totalPrice = price + delivery;

  var data = {
    name,
    phone,
    product: "Kids DZ",
    age,
    wilaya: wilayaName,
    baladiya,
    price: totalPrice
  };

  // رسالة نجاح (قبل أي redirect)
  msg.style.color = "green";
  msg.textContent = "تم إرسال الطلب بنجاح ✔️";

  // Google Sheet (غير معيق)
  try {
    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).catch(() => {});
  } catch (e) {}

  // WhatsApp
  var text =
    "طلب جديد\n" +
    "الاسم: " + name + "\n" +
    "الهاتف: " + phone + "\n" +
    "العمر: " + age + "\n" +
    "الولاية: " + wilayaName + "\n" +
    "البلدية: " + baladiya + "\n" +
    "سعر التوصيل: " + delivery + " دج\n" +
    "المجموع: " + totalPrice + " دج";

  setTimeout(function () {
    window.open(
      "https://wa.me/213792095972?text=" + encodeURIComponent(text),
      "_blank"
    );
    sendOrder.locked = false;
  }, 300);
    }
