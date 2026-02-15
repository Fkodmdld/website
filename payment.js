// Load cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let payTotal = document.getElementById("payTotal");
let qrBox = document.getElementById("qrBox");
let qrImg = document.getElementById("qrImg");

let selectedPay = "";

// ✅ Calculate total (checked items only)
let total = cart
    .filter(i => i.checked)
    .reduce((s, i) => s + i.price * i.qty, 0);

payTotal.innerText = total.toFixed(2);

// ✅ Select payment method
function selectPay(type) {
    selectedPay = type;

    qrBox.classList.remove("hidden");

    if (type === "ABA") {
        qrImg.src = "image/images.Q&R ABA.jpg";
    } else if (type === "ACLEDA") {
        qrImg.src = "image/images.Q&R ACLEDA.jpg";
    } else if (type === "FTB") {
        qrImg.src = "image/images.Q&R FTB.jpg";
    } else {
        qrBox.classList.add("hidden");
    }

}

// ✅ Confirm payment
function confirmPay() {
    if (!selectedPay) {
        alert("សូមជ្រើសរើស Payment Method");
        return;
    }

    // Load orders
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    // Create new order
    orders.push({
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: cart.filter(i => i.checked),
        total: total,
        payment: selectedPay,
        status: "paid"
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    // Remove paid items from cart
    cart = cart.filter(i => !i.checked);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("✅ Payment Success\nMethod: " + selectedPay);

    window.location.href = "success.html";
}

function payWithABA() {
    if (cart.length === 0) return alert("សូមជ្រើសរើសទំនិញជាមុន!");
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    window.open(`https://pay.ababank.com/oRF8/0fx430z0?amount=${total.toFixed(2)}`, '_blank');
    launchConfetti();
}

function payWithKBPRASAC() {
    if (cart.length === 0) {
        alert("⚠️ សូមជ្រើសរើសទំនិញជាមុន!");
        return;
    }

    const total = cart.reduce((s, i) => s + i.price, 0).toFixed(2);

    // KB PRASAC OneLink ត្រឹមត្រូវ (មាន amount ស្វ័យប្រវត្តិ)
    const kbLink = `https://kbp.onelink.me/BBfd/p64sy8c6?amount=${total}`;
    window.open(kbLink, '_blank');
    launchConfetti();
    alert("កំពុងបើក KB PRASAC Mobile App...\nបើគ្មាន app សូមទាញយកពី App Store ឬ Play Store។");
}

function payWithPAYPAL() {
    if (cart.length === 0) {
        alert("⚠️ សូមជ្រើសរើសទំនិញជាមុន!");
        return;
    }

    const total = cart.reduce((s, i) => s + i.price, 0).toFixed(2);

    // KB PRASAC OneLink ត្រឹមត្រូវ (មាន amount ស្វ័យប្រវត្តិ)
    const kbLink = `https://www.paypal.com/myaccount/summary?intl=0?amount=${total}`;
    window.open(kbLink, '_blank');
    launchConfetti();
    alert("កំពុងបើក KB PRASAC Mobile App...\nបើគ្មាន app សូមទាញយកពី App Store ឬ Play Store។");
}