console.log("JS loaded");

/* ===============================
   رابط Google Apps Script
   =============================== */
var WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbytnbr_qQBna6xIjFB4v_RCo48na1qIZIBZbPY7e61uvNke5Ye2hUwnqWbprqAu8qEm/exec";

/* ===============================
   عند تحميل الصفحة
   =============================== */
document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     البيانات
     =============================== */

  var WILAYAS = {
    16: "الجزائر",
    31: "وهران",
    25: "قسنطينة"
  };

  var DELIVERY_PRICES = {
    16: 400,
    31: 500,
    25: 500
  };

  var BALADIYAT = [
    { wilayaId: 16, name: "القصبة" },
    { wilayaId: 16, name: "باب الواد" },
    { wilayaId: 31, name: "السانية" },
    { wilayaId: 31, name: "أرزيو" },
    { wilayaId: 25, name: "الخروب" },
    { wilayaId: 25, name: "عين سمارة" }
  ];

  /* ===============================
     تعبئة الولايات
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
     ربط المنتج
     =============================== */
  function bindProduct(num, basePrice) {
    var wilaya = document.getElementById("wilaya" + num);
    var baladiya = document.getElementById("baladiya" + num);
    var msg = document.getElementById("msg" + num);

    if (!wilaya || !baladiya) return;

    fillWilayas(wilaya);

    wilaya.addEventListener("change", function () {

      baladiya.innerHTML = '<option value="">اختر البلدية</option>';

      if (!wilaya.value) {
        if (msg) msg.innerHTML = "";
        return;
      }

      // تعبئة البلديات
      for (var i = 0; i < BALADIYAT.length; i++) {
        if (BALADIYAT[i].wilayaId === Number(wilaya.value)) {
          var opt = document.createElement("option");
          opt.value = BALADIYAT[i].name;
          opt.textContent = BALADIYAT[i].name;
          baladiya.appendChild(opt);
        }
      }

      // حساب المجموع
      if (msg) {
        var delivery = DELIVERY_PRICES[wilaya.value] || 0;
        msg.innerHTML = "المجموع: " + (basePrice + delivery) + " دج";
      }
    });
  }

  /* ===============================
     تشغيل المنتجات
     =============================== */
  bindProduct(1, 3200);
  bindProduct(2, 2900);

});

/* ===============================
   إرسال الطلب (مضمون)
   =============================== */
function sendOrder(id, price, age) {

  var name = document.getElementById("name" + id).value.trim();
  var phone = document.getElementById("phone" + id).value.trim();
  var wilaya = document.getElementById("wilaya" + id).value;
  var baladiya = document.getElementById("baladiya" + id).value;
  var msgBox = document.getElementById("msg" + id);

  if (!name || !phone) {
    msgBox.innerHTML = "❌ الرجاء إدخال الاسم ورقم الهاتف";
    msgBox.style.color = "red";
    return;
  }

  msgBox.innerHTML = "⏳ جاري إرسال الطلب...";
  msgBox.style.color = "black";

  var data = {
    name: name,
    phone: phone,
    wilaya: wilaya,
    baladiya: baladiya,
    product: "ملابس أطفال",
    age: age,
    price: price,
    pay: "الدفع عند الاستلام"
  };

  fetch(WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(function () {
    msgBox.innerHTML = "✅ تم إرسال الطلب بنجاح";
    msgBox.style.color = "green";

    document.getElementById("name" + id).value = "";
    document.getElementById("phone" + id).value = "";
  })
  .catch(function () {
    msgBox.innerHTML = "⚠️ تعذر الإرسال، جرّب متصفح آخر";
    msgBox.style.color = "red";
  });
}
