// const text = "3 tempura and 8 sushi";
// const regex = /\d+/g;

// console.log(regex.test(text));
// console.log(text.match(regex));
// console.log(text.replace(regex, "17"));


// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[A-Z])(?.=*[a-z])(?=.*[!@#$%^&*]).{8,}/;






const regFirstname = document.querySelector("#regFirstname");
const regLastname = document.querySelector("#regLastname");
const regEmail = document.querySelector("#regEmail");
const regPassword = document.querySelector("#regPassword");
const regNumber = document.querySelector("#regNumber");
const regReset = document.querySelector("#regReset");
const regSubmit = document.querySelector("#regSubmit");
const regForm = document.querySelector("#regForm");
const main = document.querySelector(".main");






regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registerUser();
});

async function registerUser() {
  let regData = {
    phoneNumber: regNumber.value,
    password: regPassword.value,
    email: regEmail.value,
    firstName: regFirstname.value,
    lastName: regLastname.value,
    role: "user",
  };

  let resp = await fetch("https://rentcar.stepprojects.ge/api/Users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(regData),
  });
  if (!resp.ok) {
    let msg = await resp.text();
    alert(msg);
    return;
  };

  let data = await resp.json();
  console.log(data);
  alert(`${data.firstName}, You have successfully logged in!`);
  regForm.reset();
}



