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
  e.preventDefault(); // Stop default submit

  const form = this;

  // Submit Google Form via hidden iframe
  const hiddenIframe = document.createElement("iframe");
  hiddenIframe.style.display = "none";
  hiddenIframe.name = "hidden_iframe";
  document.body.appendChild(hiddenIframe);
  form.target = "hidden_iframe";
  form.submit();

  // Small delay to ensure Google Form saves data
  setTimeout(() => {
    const amount = Number(totalInput.value) * 100; // Razorpay expects paise

    const options = {
      key: "rzp_live_S22rQFr4dJYjVs", // Replace with your Razorpay Key ID
      amount: amount,
      currency: "INR",
      name: "The Negotiator's Compass",
      description: `Order of ${quantityInput.value} book(s)`,
      image: "cover.jpg",
      handler: function (response) {
        // Create a thank-you overlay
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.background = "rgba(0,0,0,0.6)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "1000";

        const messageBox = document.createElement("div");
        messageBox.style.background = "#fff";
        messageBox.style.padding = "30px";
        messageBox.style.borderRadius = "10px";
        messageBox.style.textAlign = "center";
        messageBox.style.maxWidth = "400px";
        messageBox.innerHTML = `
          <h2>Thank You for Your Order!</h2>
          <p>Your payment of ₹${totalInput.value} was successful.</p>
          <p>Payment ID: ${response.razorpay_payment_id}</p>
          <p>We will ship your book(s) to the provided address soon.</p>
          <button id="closeThankYou" style="
            margin-top:20px; padding:10px 20px; background:#2563eb; color:white; border:none; border-radius:5px; cursor:pointer;
          ">Close</button>
        `;

        overlay.appendChild(messageBox);
        document.body.appendChild(overlay);

        document.getElementById("closeThankYou").addEventListener("click", () => {
          document.body.removeChild(overlay);
        });
      },
      theme: { color: "#2563eb" }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }, 500);
});
