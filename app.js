console.log("JS loaded");
const WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbytnbr_qQBna6xIjFB4v_RCo48na1qIZIBZbPY7e61uvNke5Ye2hUwnqWbprqAu8qEm/exec";
   document.addEventListener("DOMContentLoaded", () => {
  /* ===============================
     البيانات (Data)
     =============================== */

  const WILAYAS = {
    16: "الجزائر",
    31: "وهران",
    25: "قسنطينة"
  };

  const DELIVERY_PRICES = {
    16: 400,
    31: 500,
    25: 500
  };

  const BALADIYAT = [
    { wilayaId: 16, name: "القصبة" },
    { wilayaId: 16, name: "باب الواد" },
    { wilayaId: 31, name: "السانية" },
    { wilayaId: 31, name: "أرزيو" },
    { wilayaId: 25, name: "الخروب" },
    { wilayaId: 25, name: "عين سمارة" }
  ];

  /* ===============================
     الدوال (Functions)
     =============================== */

  function fillWilayas(select) {
    select.innerHTML = '<option value="">اختر الولاية</option>';

    Object.keys(WILAYAS).forEach(code => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = WILAYAS[code];
      select.appendChild(opt);
    });
  }

  function fillBaladiyat(wilayaSelect, baladiyaSelect) {
    baladiyaSelect.innerHTML = '<option value="">اختر البلدية</option>';

    if (!wilayaSelect.value) return;

    BALADIYAT
      .filter(b => b.wilayaId === Number(wilayaSelect.value))
      .forEach(b => {
        const opt = document.createElement("option");
        opt.value = b.name;
        opt.textContent = b.name;
        baladiyaSelect.appendChild(opt);
      });
  }

  function calcTotal(wilayaCode, basePrice, box) {
    const delivery = DELIVERY_PRICES[wilayaCode] || 0;
    const total = basePrice + delivery;
    box.textContent = `المجموع: ${total} دج`;
  }

  function bindProduct(num, basePrice) {
    const wilaya = document.getElementById(`wilaya${num}`);
    const baladiya = document.getElementById(`baladiya${num}`);
    const msg = document.getElementById(`msg${num}`);

    if (!wilaya || !baladiya || !msg) return;

    fillWilayas(wilaya);

    wilaya.addEventListener("change", () => {
      fillBaladiyat(wilaya, baladiya);
      msg.textContent = "";
      calcTotal(wilaya.value, basePrice, msg);
    });
  }

  /* ===============================
     التشغيل (Init)
     =============================== */

  bindProduct(1, 2500);
  bindProduct(2, 3000);
  // أضف منتجات أخرى هنا

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
