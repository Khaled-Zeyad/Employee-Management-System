async function addEmployee(event) {
  event.preventDefault();

  const body = {
    firstName: document.getElementById("inputfirstName4").value,
    lastName: document.getElementById("inputlastName4").value,
    email: document.getElementById("inputemail4").value,
    phoneNumber: document.getElementById("inputtele4").value,
    age: document.getElementById("inputage4").value,
    country: document.getElementById("inputCountry").value,
    gender: document.getElementById("inputGender").value,
  };

  try {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      window.location.href = "/";
    } else {
      alert("Failed to add employee");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}
