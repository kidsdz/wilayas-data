document.addEventListener("DOMContentLoaded", () => {
  const wilayaSelect = document.getElementById("wilaya");

  WILAYAS.forEach(w => {
    const option = document.createElement("option");
    option.value = w.id;
    option.textContent = `${w.id} - ${w.ar_name}`;
    wilayaSelect.appendChild(option);
  });
});
