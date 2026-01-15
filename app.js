console.log("JS loaded");

/* ===============================
   رابط Google Apps Script
   =============================== */
var WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbykVynzBf8U6AoB3CBa-EPo2Z16QjqD6XHmOcb24NNhs_7L66w_PcDdmsjkkb8Hbkcg/exec"; // لازم يكون رابط doGet

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
     ربط منتج
     =============================== */
  function bindProduct(num, basePrice) {
    var wilaya = document.getElementById("wilaya" + num);
    var baladiya = document.getElementById("baladiya" + num);
    var msg = document.getElementById("msg" + num);

    if (!wilaya || !baladiya) return;

    // تعبئة الولايات مباشرة
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
        msg.innerHTML =
          "المجموع: " + (basePrice + delivery) + " دج";
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
   إرسال الطلب (Image Beacon)
   ⚠️ لازم تكون خارج DOMContentLoaded
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

  // إرسال الطلب (بدون fetch)
  var img = new Image();
  img.src =
    WEB_APP_URL +
    "?name=" + encodeURIComponent(name) +
    "&phone=" + encodeURIComponent(phone) +
    "&wilaya=" + encodeURIComponent(wilaya) +
    "&baladiya=" + encodeURIComponent(baladiya) +
    "&age=" + encodeURIComponent(age) +
    "&price=" + encodeURIComponent(price) +
    "&t=" + Date.now();

  msgBox.innerHTML = "✅ تم إرسال الطلب بنجاح";
  msgBox.style.color = "green";

  // تنظيف الحقول
  document.getElementById("name" + id).value = "";
  document.getElementById("phone" + id).value = "";
}
