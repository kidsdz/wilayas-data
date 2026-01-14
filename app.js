const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbytnbr_qQBna6xIjFB4v_RCo48na1qIZIBZbPY7e61uvNke5Ye2hUwnqWbprqAu8qEm/exec";
document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     الولايات
     =============================== */
  var WILAYAS = {
    "16": "الجزائر",
    "31": "وهران",
    "25": "قسنطينة"
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
    { wilayaId: 16, name: "القصبة" },
    { wilayaId: 16, name: "باب الواد" },
    { wilayaId: 31, name: "السانية" },
    { wilayaId: 31, name: "أرزيو" },
    { wilayaId: 25, name: "الخروب" },
    { wilayaId: 25, name: "عين سمارة" }
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

function sendOrder(id, price, age) {

  const name = document.getElementById("name" + id).value.trim();
  const phone = document.getElementById("phone" + id).value.trim();
  const wilaya = document.getElementById("wilaya" + id).value;
  const baladiya = document.getElementById("baladiya" + id).value;
  const msgBox = document.getElementById("msg" + id);

  // 🛑 تحقق من البيانات
  if (!name || !phone) {
    msgBox.innerHTML = "❌ الرجاء إدخال الاسم ورقم الهاتف";
    msgBox.style.color = "red";
    return;
  }

  msgBox.innerHTML = "⏳ جاري إرسال الطلب...";
  msgBox.style.color = "black";

  const data = {
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
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(r => {
    if (r.status === "success") {
      msgBox.innerHTML = "✅ تم تسجيل الطلبية بنجاح";
      msgBox.style.color = "green";

      // تنظيف الحقول
      document.getElementById("name" + id).value = "";
      document.getElementById("phone" + id).value = "";
    } else {
      msgBox.innerHTML = "❌ حدث خطأ، حاول مرة أخرى";
      msgBox.style.color = "red";
    }
  })
  .catch(err => {
    msgBox.innerHTML = "⚠️ فشل الاتصال، افتح الصفحة في المتصفح";
    msgBox.style.color = "red";
    console.error(err);
  });
        }                             
