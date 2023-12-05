document.addEventListener("DOMContentLoaded", async () => {
  const name = document.getElementById("name");
  const age = document.getElementById("age");
  const email = document.getElementById("email");

  const response = await fetch("/api/sessions/profile", {
    headers: { "Content-type": "application/json" },
    method: "POST",
  });
  const result = await response.json();
  if (result.status == "success") {
    name.innerHTML = `${result.data.fullName}`;
    age.innerHTML = `${result.data.age} años`;
    email.innerHTML = `Tu email: ${result.data.email}`;
  } else {
    window.location.href = "/login";
  }
});
