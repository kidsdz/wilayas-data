var GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzJPOpVY_X1LaAxwuXlMIXhP63h-y6DLMVVxo0nNGq2vOe83cUBSnwFs1g4aQr5LXTGSw/exec";
document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     الولايات
     =============================== */
  var WILAYAS =  [
  {
    id: "1",
    code: "1",
    name: "Adrar",
    ar_name: "أدرار",
    longitude: "27.9766155",
    latitude: "-0.20396"
  },
  {
    id: "2",
    code: "2",
    name: "Chlef",
    ar_name: "الشلف",
    longitude: "36.1691245",
    latitude: "1.3539002"
  },
  {
    id: "3",
    code: "3",
    name: "Laghouat",
    ar_name: "الأغواط",
    longitude: "33.7873735",
    latitude: "2.8829115"
  },
  {
    id: "4",
    code: "4",
    name: "Oum El Bouaghi",
    ar_name: "أم البواقي",
    longitude: "35.8726014",
    latitude: "7.1180248"
  },
  {
    id: "5",
    code: "5",
    name: "Batna",
    ar_name: "باتنة",
    longitude: "35.32147",
    latitude: "3.1066502"
  },
  {
    id: "6",
    code: "6",
    name: "Béjaïa",
    ar_name: "بجاية",
    longitude: "36.7695969",
    latitude: "5.0085855"
  },
  {
    id: "7",
    code: "7",
    name: "Biskra",
    ar_name: "بسكرة",
    longitude: "34.8515041",
    latitude: "5.7246709"
  },
  {
    id: "8",
    code: "8",
    name: "Bechar",
    ar_name: "بشار",
    longitude: "31.5977602",
    latitude: "-1.8540446"
  },
  {
    id: "9",
    code: "9",
    name: "Blida",
    ar_name: "البليدة",
    longitude: "36.4803023",
    latitude: "2.8009379"
  },
  {
    id: "10",
    code: "10",
    name: "Bouira",
    ar_name: "البويرة",
    longitude: "36.2084234",
    latitude: "3.925049"
  },
  {
    id: "11",
    code: "11",
    name: "Tamanrasset",
    ar_name: "تمنراست",
    longitude: "22.2746227",
    latitude: "5.6754684"
  },
  {
    id: "12",
    code: "12",
    name: "Tbessa",
    ar_name: "تبسة",
    longitude: "35.4117259",
    latitude: "8.110545"
  },
  {
    id: "13",
    code: "13",
    name: "Tlemcen",
    ar_name: "تلمسان",
    longitude: "34.8959541",
    latitude: "-1.3150979"
  },
  {
    id: "14",
    code: "14",
    name: "Tiaret",
    ar_name: "تيارت",
    longitude: "35.3599899",
    latitude: "1.3916159"
  },
  {
    id: "15",
    code: "15",
    name: "Tizi Ouzou",
    ar_name: "تيزي وزو",
    longitude: "36.7002068",
    latitude: "4.075957"
  },
  {
    id: "16",
    code: "16",
    name: "Alger",
    ar_name: "الجزائر",
    longitude: "36.7538259",
    latitude: "3.057841"
  },
  {
    id: "17",
    code: "17",
    name: "Djelfa",
    ar_name: "الجلفة",
    longitude: "34.6672467",
    latitude: "3.2993118"
  },
  {
    id: "18",
    code: "18",
    name: "Jijel",
    ar_name: "جيجل",
    longitude: "36.7962714",
    latitude: "5.7504845"
  },
  {
    id: "19",
    code: "19",
    name: "Se9tif",
    ar_name: "سطيف",
    longitude: "36.1905173",
    latitude: "5.4202134"
  },
  {
    id: "20",
    code: "20",
    name: "Saefda",
    ar_name: "سعيدة",
    longitude: "34.841945",
    latitude: "0.1483583"
  },
  {
    id: "21",
    code: "21",
    name: "Skikda",
    ar_name: "سكيكدة",
    longitude: "36.8777912",
    latitude: "6.9357204"
  },
  {
    id: "22",
    code: "22",
    name: "Sidi Bel Abbes",
    ar_name: "سيدي بلعباس",
    longitude: "35.206334",
    latitude: "-0.6301368"
  },
  {
    id: "23",
    code: "23",
    name: "Annaba",
    ar_name: "عنابة",
    longitude: "36.9184345",
    latitude: "7.7452755"
  },
  {
    id: "24",
    code: "24",
    name: "Guelma",
    ar_name: "قالمة",
    longitude: "36.4569088",
    latitude: "7.4334312"
  },
  {
    id: "25",
    code: "25",
    name: "Constantine",
    ar_name: "قسنطينة",
    longitude: "36.319475",
    latitude: "6.7370571"
  },
  {
    id: "26",
    code: "26",
    name: "Medea",
    ar_name: "المدية",
    longitude: "36.2838408",
    latitude: "2.7728462"
  },
  {
    id: "27",
    code: "27",
    name: "Mostaganem",
    ar_name: "مستغانم",
    longitude: "35.9751841",
    latitude: "0.1149273"
  },
  {
    id: "28",
    code: "28",
    name: "M'Sila",
    ar_name: "المسيلة",
    longitude: "35.7211476",
    latitude: "4.5187283"
  },
  {
    id: "29",
    code: "29",
    name: "Mascara",
    ar_name: "معسكر",
    longitude: "35.382998",
    latitude: "0.1542592"
  },
  {
    id: "30",
    code: "30",
    name: "Ouargla",
    ar_name: "ورقلة",
    longitude: "32.1961967",
    latitude: "4.9634113"
  },
  {
    id: "31",
    code: "31",
    name: "Oran",
    ar_name: "وهران",
    longitude: "35.7066928",
    latitude: "-0.6405861"
  },
  {
    id: "32",
    code: "32",
    name: "El Bayadh",
    ar_name: "البيض",
    longitude: "32.5722756",
    latitude: "0.950011"
  },
  {
    id: "33",
    code: "33",
    name: "Illizi",
    ar_name: "إليزي",
    longitude: "26.5065999",
    latitude: "8.480587"
  },
  {
    id: "34",
    code: "34",
    name: "Bordj Bou Arreridj",
    ar_name: "برج بوعريريج",
    longitude: "36.0686488",
    latitude: "4.7691823"
  },
  {
    id: "35",
    code: "35",
    name: "Boumerdes",
    ar_name: "بومرداس",
    longitude: "36.7564181",
    latitude: "3.4917212"
  },
  {
    id: "36",
    code: "36",
    name: "El Tarf",
    ar_name: "الطارف",
    longitude: "36.7534258",
    latitude: "8.2984543"
  },
  {
    id: "37",
    code: "37",
    name: "Tindouf",
    ar_name: "تندوف",
    longitude: "27.2460501",
    latitude: "-6.3252899"
  },
  {
    id: "38",
    code: "38",
    name: "Tissemsilt",
    ar_name: "تيسمسيلت",
    longitude: "35.6021906",
    latitude: "1.802187"
  },
  {
    id: "39",
    code: "39",
    name: "El Oued",
    ar_name: "الوادي",
    longitude: "33.3714492",
    latitude: "6.8573436"
  },
  {
    id: "40",
    code: "40",
    name: "Khenchela",
    ar_name: "خنشلة",
    longitude: "35.4263293",
    latitude: "7.1414137"
  },
  {
    id: "41",
    code: "41",
    name: "Souk Ahras",
    ar_name: "سوق أهراس",
    longitude: "36.277849",
    latitude: "7.9592299"
  },
  {
    id: "42",
    code: "42",
    name: "Tipaza",
    ar_name: "تيبازة",
    longitude: "36.5980966",
    latitude: "2.4085379"
  },
  {
    id: "43",
    code: "43",
    name: "Mila",
    ar_name: "ميلة",
    longitude: "36.4514882",
    latitude: "6.2487316"
  },
  {
    id: "44",
    code: "44",
    name: "Ain Defla",
    ar_name: "عين الدفلى",
    longitude: "36.1283915",
    latitude: "2.1772514"
  },
  {
    id: "45",
    code: "45",
    name: "Naama",
    ar_name: "النعامة",
    longitude: "33.1995605",
    latitude: "-0.8021968"
  },
  {
    id: "46",
    code: "46",
    name: "Ain Temouchent",
    ar_name: "عين تموشنت",
    longitude: "35.404044",
    latitude: "-1.0580975"
  },
  {
    id: "47",
    code: "47",
    name: "Ghardaefa",
    ar_name: "غرداية",
    longitude: "32.5891743",
    latitude: "3.7455655"
  },
  {
    id: "48",
    code: "48",
    name: "Relizane",
    ar_name: "غليزان",
    longitude: "35.8050195",
    latitude: "0.867381"
  },
  {
    id: "49",
    code: "49",
    name: "El M'ghair",
    ar_name: "المغير",
    longitude: "33.947222",
    latitude: "5.922222"
  },
  {
    id: "50",
    code: "50",
    name: "El Menia",
    ar_name: "المنيعة",
    longitude: "30.579167",
    latitude: "2.879167"
  },
  {
    id: "51",
    code: "51",
    name: "Ouled Djellal",
    ar_name: "أولاد جلال",
    longitude: "34.433333",
    latitude: "5.066667"
  },
  {
    id: "52",
    code: "52",
    name: "Bordj Baji Mokhtar",
    ar_name: "برج باجي مختار",
    longitude: "21.327778",
    latitude: "0.955556"
  },
  {
    id: "53",
    code: "53",
    name: "Béni Abbès",
    ar_name: "بني عباس",
    longitude: "30.133333",
    latitude: "-2.166667"
  },
  {
    id: "54",
    code: "54",
    name: "Timimoun",
    ar_name: "تيميمون",
    longitude: "29.258333",
    latitude: "0.230556"
  },
  {
    id: "55",
    code: "55",
    name: "Touggourt",
    ar_name: "تقرت",
    longitude: "33.108333",
    latitude: "6.063889"
  },
  {
    id: "56",
    code: "56",
    name: "Djanet",
    ar_name: "جانت",
    longitude: "24.554167",
    latitude: "9.484722"
  },
  {
    id: "57",
    code: "57",
    name: "In Salah",
    ar_name: "عين صالح",
    longitude: "27.197222",
    latitude: "2.483333"
  },
  {
    id: "58",
    code: "58",
    name: "In Guezzam",
    ar_name: "عين قزام",
    longitude: "19.572222",
    latitude: "5.769444"
  }
];

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
