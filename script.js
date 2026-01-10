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

  // Update quantity display
  document.getElementById("qtyDisplay").textContent = qty;
  document.getElementById("qtyShipping").textContent = qty;
}

quantityInput.addEventListener("input", updateTotal);
updateTotal();

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default to handle Google Form + Razorpay

  const form = this;

  // Submit Google Form via hidden iframe
  const hiddenIframe = document.createElement("iframe");
  hiddenIframe.style.display = "none";
  hiddenIframe.name = "hidden_iframe";
  document.body.appendChild(hiddenIframe);
  form.target = "hidden_iframe";
  form.submit();

  // Small delay so Google receives data
  setTimeout(() => {
    const amount = Number(totalInput.value) * 100; // Razorpay expects paise

    const options = {
      key: "rzp_live_S22rQFr4dJYjVs", // Replace with your Razorpay Key ID
      amount: amount,
      currency: "INR",
      name: "The Negotiator's Compass",
      description: `Order of ${quantityInput.value} book(s)`,
      image: "cover.jpg", // Optional: book cover image
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        // Optional: redirect to thank you page
        window.location.href = "thankyou.html";
      },
      theme: {
        color: "#2563eb"
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }, 500); // half a second delay
});
