const PRICE_PER_BOOK = 349;
const SHIPPING_PER_BOOK = 40;

const quantityInput = document.getElementById("quantity");
const totalSpan = document.getElementById("total");
const totalInput = document.getElementById("totalInput");

function updateTotal() {
  const qty = Number(quantityInput.value);

  const total = qty * (PRICE_PER_BOOK + SHIPPING_PER_BOOK);

  totalSpan.textContent = total;
  totalInput.value = total;
}

quantityInput.addEventListener("input", updateTotal);
updateTotal();

document.getElementById("orderForm").addEventListener("submit", function () {
  // DO NOT prevent submission

  // Small delay so Google receives data first
  setTimeout(() => {
    alert(
      "Order details saved successfully.\n\n" +
      "You will now be redirected to payment."
    );

    // Razorpay checkout will be inserted here later
  }, 300);
});
