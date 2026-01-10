const PRICE_PER_BOOK = 349;
const SHIPPING_PER_BOOK = 40;

const quantityInput = document.getElementById("quantity");
const totalSpan = document.getElementById("total");

function updateTotal() {
  const qty = Number(quantityInput.value);
  const total = qty * (PRICE_PER_BOOK + SHIPPING_PER_BOOK);
  totalSpan.textContent = total;
}

quantityInput.addEventListener("input", updateTotal);
updateTotal();

document.getElementById("orderForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const amount = Number(totalSpan.textContent) * 100;

  alert(
    "Razorpay will be connected here.\n\n" +
    "Amount to be charged: ₹" + (amount / 100)
  );

  // Razorpay Checkout code will be added AFTER
  // your Razorpay account is active and site URL is verified
});
