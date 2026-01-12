document.addEventListener("DOMContentLoaded", function () {

  console.log("js loaded");

  /* ===============================
     الولايات
     =============================== */
  var WILAYAS = {
    "16":"الجزائر",
    "31":"وهران",
    "25":"قسنطينة"
    // أضف باقي الولايات
  };

  /* ===============================
     أسعار التوصيل
     =============================== */
  var DELIVERY_PRICES = {
    "16":400,
    "31":500,
    "25":500
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
     DOM
     =============================== */
  var wilaya1 = document.getElementById("wilaya1");
  var baladiya1 = document.getElementById("baladiya1");
  var msg1 = document.getElementById("msg1");
  var total1 = document.getElementById("total1");
  var price1 = document.getElementById("price1");

  var wilaya2 = document.getElementById("wilaya2");
  var baladiya2 = document.getElementById("baladiya2");
  var msg2 = document.getElementById("msg2");
  var total2 = document.getElementById("total2");
  var price2 = document.getElementById("price2");

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

  fillWilayas(wilaya1);
  fillWilayas(wilaya2);

  /* ===============================
     حساب المجموع
     =============================== */
  function calcTotal(wilayaCode, price, totalBox) {
    var delivery = DELIVERY_PRICES[wilayaCode] || 0;
    var total = price + delivery;
    totalBox.textContent = "المجموع: " + total + " دج";
    totalBox.style.color = "blue";
  }

  /* ===============================
     تغيير الولاية 1
     =============================== */
  wilaya1.onchange = function () {

    baladiya1.innerHTML = '<option value="">اختر البلدية</option>';
    msg1.textContent = "";
    total1.textContent = "";

    var wid = this.value;
    if (!wid) return;

    for (var i = 0; i < BALADIYAT.length; i++) {
      if (BALADIYAT[i].wilayaId === parseInt(wid)) {
        var opt = document.createElement("option");
        opt.textContent = BALADIYAT[i].name;
        baladiya1.appendChild(opt);
      }
    }

    if (DELIVERY_PRICES[wid]) {
      msg1.textContent =
        "سعر التوصيل: " + DELIVERY_PRICES[wid] + " دج";
    } else {
      msg1.textContent = "سعر التوصيل: يُحدد عند الاتصال";
    }

    calcTotal(wid, Number(price1.value), total1);
  };

  /* ===============================
     تغيير الولاية 2
     =============================== */
  wilaya2.onchange = function () {

    baladiya2.innerHTML = '<option value="">اختر البلدية</option>';
    msg2.textContent = "";
    total2.textContent = "";

    var wid = this.value;
    if (!wid) return;

    for (var i = 0; i < BALADIYAT.length; i++) {
      if (BALADIYAT[i].wilayaId === parseInt(wid)) {
        var opt = document.createElement("option");
        opt.textContent = BALADIYAT[i].name;
        baladiya2.appendChild(opt);
      }
    }

    if (DELIVERY_PRICES[wid]) {
      msg2.textContent =
        "سعر التوصيل: " + DELIVERY_PRICES[wid] + " دج";
    } else {
      msg2.textContent = "سعر التوصيل: يُحدد عند الاتصال";
    }

    calcTotal(wid, Number(price2.value), total2);
  };

});
