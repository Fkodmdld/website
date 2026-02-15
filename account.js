// Load user data from localStorage
document.getElementById("name").innerText =
    localStorage.getItem("username") || "Guest User";

document.getElementById("email").innerText =
    localStorage.getItem("email") || "guest@email.com";

// Logout function
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}