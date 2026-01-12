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
function sendOrder(num, age) {
  var name = document.getElementById("name" + num).value.trim();
  var phone = document.getElementById("phone" + num).value.trim();
  var wilayaSel = document.getElementById("wilaya" + num);
  var baladiya = document.getElementById("baladiya" + num).value;
  var msg = document.getElementById("msg" + num);

  if (!name || !phone || !wilayaSel.value || !baladiya) {
    msg.textContent = "يرجى ملء جميع الحقول";
    return;
  }

  var wilaya = wilayaSel.options[wilayaSel.selectedIndex].text;
  var delivery = DELIVERY_PRICES[wilayaSel.value] || 0;
  var basePrice = num === 1 ? 3200 : 2900;
  var total = basePrice + delivery;

  var text =
    "📦 طلب جديد\n" +
    "👤 الاسم: " + name + "\n" +
    "📞 الهاتف: " + phone + "\n" +
    "🎂 العمر: " + age + "\n" +
    "📍 الولاية: " + wilaya + "\n" +
    "🏘️ البلدية: " + baladiya + "\n" +
    "🚚 التوصيل: " + delivery + " دج\n" +
    "💰 المجموع: " + total + " دج";

  var url =
    "https://wa.me/213XXXXXXXXX?text=" +
    encodeURIComponent(text);

  window.open(url, "_blank");
     }
