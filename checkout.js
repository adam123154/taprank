"use strict";

const formats = {
  card: { name: "Adhesive NFC card", price: 20 },
  stand: { name: "Countertop NFC stand", price: 25 }
};
const form = document.getElementById("checkout");
const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const shop = document.getElementById("shop");
const preview = document.getElementById("preview");
const confirmation = document.getElementById("confirmation");
const selection = new URLSearchParams(location.search).get("product");
if (Object.hasOwn(formats, selection)) product.value = selection;

function updateSummary() {
  const valid = quantity.validity.valid && Number.isInteger(quantity.valueAsNumber);
  const unit = formats[product.value].price;
  document.getElementById("unit").textContent = "£" + unit;
  document.getElementById("total").textContent = valid ? "£" + unit * quantity.valueAsNumber : "—";
  document.getElementById("error").textContent = valid ? "" : "Enter a whole number from 1 to 99.";
  quantity.setAttribute("aria-invalid", String(!valid));
  preview.disabled = !valid;
  return valid;
}

quantity.addEventListener("input", updateSummary);
product.addEventListener("change", updateSummary);
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!updateSummary()) return;
  const item = formats[product.value];
  document.getElementById("result").textContent =
    item.name + " × " + quantity.valueAsNumber + " for " + shop.value +
    ". Total including UK delivery: £" + item.price * quantity.valueAsNumber + ".";
  form.hidden = true;
  confirmation.hidden = false;
  confirmation.focus();
});
document.getElementById("edit").addEventListener("click", () => {
  confirmation.hidden = true;
  form.hidden = false;
  product.focus();
});
updateSummary();
