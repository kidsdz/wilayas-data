document.addEventListener("DOMContentLoaded", function () {

  /* ===== DATA (مثال – أضف كل الولايات والبلديات) ===== */

  var WILAYAS = [
    { id: 16, name: "الجزائر" },
    { id: 31, name: "وهران" },
    { id: 25, name: "قسنطينة" }
  ];

  var BALADIYAT = [
    { wilayaId: 16, name: "القصبة" },
    { wilayaId: 16, name: "باب الواد" },

    { wilayaId: 31, name: "السانية" },
    { wilayaId: 31, name: "أرزيو" },

    { wilayaId: 25, name: "الخروب" },
    { wilayaId: 25, name: "عين سمارة" }
  ];

  /* ===== DOM ===== */

  var wilayaSelect = document.getElementById("wilaya");
  var baladiyaSelect = document.getElementById("baladiya");

  /* ===== FILL WILAYAS ===== */

  for (var i = 0; i < WILAYAS.length; i++) {
    var opt = document.createElement("option");
    opt.value = WILAYAS[i].id;
    opt.textContent = WILAYAS[i].name;
    wilayaSelect.appendChild(opt);
  }

  /* ===== ON CHANGE ===== */

  wilayaSelect.onchange = function () {
    baladiyaSelect.innerHTML =
      '<option value="">-- اختر البلدية --</option>';

    var wid = parseInt(this.value);
    if (!wid) return;

    for (var j = 0; j < BALADIYAT.length; j++) {
      if (BALADIYAT[j].wilayaId === wid) {
        var opt2 = document.createElement("option");
        opt2.textContent = BALADIYAT[j].name;
        baladiyaSelect.appendChild(opt2);
      }
    }
  };

});
