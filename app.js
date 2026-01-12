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
     تحميل الولايات + البلديات
     =============================== */
  function fillWilayas(num) {
    var wilaya = document.getElementById("wilaya" + num);
    var baladiya = document.getElementById("baladiya" + num);

    wilaya.innerHTML = '<option value="">اختر الولاية</option>';
    baladiya.innerHTML = '<option value="">اختر البلدية</option>';

    for (var code in WILAYAS) {
      var opt = document.createElement("option");
      opt.value = code;
      opt.textContent = WILAYAS[code];
      wilaya.appendChild(opt);
    }

    wilaya.addEventListener("change", function () {
      baladiya.innerHTML = '<option value="">اختر البلدية</option>';

      if (!this.value) return;

      BALADIYAT.forEach(function (b) {
        if (b.wilayaId === parseInt(wilaya.value)) {
          var opt = document.createElement("option");
          opt.textContent = b.name;
          baladiya.appendChild(opt);
        }
      });
    });
  }

  // تحميل للمنتجين
  fillWilayas(1);
  fillWilayas(2);

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

  if (!name || !phone || !wilayaSelect.value || !baladiya) {
    msg.textContent = "يرجى ملء جميع الحقول";
    return;
  }

  var wilaya = wilayaSelect.options[wilayaSelect.selectedIndex].text;

  var text =
    "طلب جديد\n" +
    "الاسم: " + name + "\n" +
    "الهاتف: " + phone + "\n" +
    "العمر: " + age + "\n" +
    "الولاية: " + wilaya + "\n" +
    "البلدية: " + baladiya + "\n" +
    "السعر: " + price + " دج";

  var url =
    "https://wa.me/213XXXXXXXXX?text=" +
    encodeURIComponent(text);

  window.open(url, "_blank");
        }
