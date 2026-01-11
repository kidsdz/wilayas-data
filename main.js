function getBaladiyatByWilayaId(wilayaId) {
  return DATA.baladiyat.filter(
    b => b.wilayaId === wilayaId
  );
}

const wilayaSelect = document.getElementById("wilaya");
const baladiyaSelect = document.getElementById("baladiya");

// fill wilayas
DATA.wilayas.forEach(w => {
  const option = document.createElement("option");
  option.value = w.id;
  option.textContent = `${w.id} - ${w.name}`;
  wilayaSelect.appendChild(option);
});

// on change
wilayaSelect.addEventListener("change", () => {
  baladiyaSelect.innerHTML =
    '<option value="">-- اختر البلدية --</option>';

  const wilayaId = Number(wilayaSelect.value);
  if (!wilayaId) return;

  getBaladiyatByWilayaId(wilayaId).forEach(b => {
    const option = document.createElement("option");
    option.textContent = b.name;
    baladiyaSelect.appendChild(option);
  });
});