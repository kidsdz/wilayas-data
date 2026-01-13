console.log("app.js loaded");

// ===============================
// CONFIG
// ===============================
var GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxpiCjTkWsYlWTBofmoIFLLUdh9g_YTLaijbcD5xl98540SlUMcbLpvxy-Oh4ODS7lIGA/exec";

var WILAYAS = {
  "16": "الجزائر",
  "31": "وهران",
  "25": "قسنطينة",
  "5": "باتنة"
};

var BALADIYAT = [
  { wilayaId: 5, name: "باتنة" },
  { wilayaId: 5, name: "عين التوتة" },
  { wilayaId: 5, name: "نقاوس" },
  { wilayaId: 16, name: "باب الزوار" },
  { wilayaId: 16, name: "الدار البيضاء" },
  { wilayaId: 31, name: "وهران" }
];

var DELIVERY_PRICES = {
  "16": 400,
  "31": 500,
  "25": 500
};

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
  for (var id in WILAYAS) {
    var opt = document.createElement("option");
    opt.value = id;
    opt.textContent = WILAYAS[id];
    select.appendChild(opt);
  }
}

function bindProduct(num, basePrice) {
  var wilaya = document.getElementById("wilaya" + num);
  var baladiya = document.getElementById("baladiya" + num);
  var msg = document.getElementById("msg" + num);

  if (!wilaya || !baladiya || !msg) return;

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
    msg.textContent = delivery
      ? "سعر التوصيل: " + delivery + " دج | المجموع: " + (basePrice + delivery) + " دج"
      : "سعر التوصيل يُحدد عند الاتصال";
  });
}

// ===============================
// SEND ORDER
// ===============================
function sendOrder(num, price, age) {
  var name = document.getElementById("name" + num).value.trim();
  var phone = document.getElementById("phone" + num).value.trim();
  var wilayaEl = document.getElementById("wilaya" + num);
  var baladiya = document.getElementById("baladiya" + num).value;
  var msg = document.getElementById("msg" + num);

  if (!name || !phone || !wilayaEl.value || !baladiya) {
    msg.style.color = "red";
    msg.textContent = "يرجى ملء جميع الحقول";
    return;
  }

  var delivery = DELIVERY_PRICES[wilayaEl.value] || 0;
  var total = price + delivery;

  msg.style.color = "green";
  msg.textContent = "تم إرسال الطلب بنجاح ✔️";

  // WhatsApp
  setTimeout(function () {
    window.open(
      "https://wa.me/213XXXXXXXXX?text=" +
        encodeURIComponent(
          "طلب جديد\n" +
          "الاسم: " + name + "\n" +
          "الهاتف: " + phone + "\n" +
          "العمر: " + age + "\n" +
          "الولاية: " + wilayaEl.options[wilayaEl.selectedIndex].text + "\n" +
          "البلدية: " + baladiya + "\n" +
          "المجموع: " + total + " دج"
        ),
      "_blank"
    );
  }, 300);

  // Google Sheet (غير معيق)
  try {
    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        age,
        wilaya: wilayaEl.value,
        baladiya,
        price: total
      })
    }).catch(() => {});
  } catch (e) {}
  }
