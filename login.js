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
const signInForm = document.querySelector("#signInForm")
const signInNumber = document.querySelector("#signInNumber");
const signInPassword = document.querySelector("#signInPassword");






regForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registerUser();
});

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signInUser();
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
  regForm.classList.add("hidden");
  signInForm.classList.remove("hidden");
}

async function signInUser() {
  let regData = {
    phoneNumber: regNumber.value,
    password: regPassword.value,
    email: "regEmail.value",
    firstName: "regFirstname.value",
    lastName: "regLastname.value",
    role: "user",
  };

  let resp = await fetch("https://rentcar.stepprojects.ge/api/Users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(regData),
  });

  if (!resp.ok) {
    let msg = await resp.text();
    alert(msg);
    return;
  }

  let data = await resp.json();
  console.log(data);
  alert(`${data.firstName}, You have successfully logged in!`);

  signInForm.reset();
  localStorage.setItem("token", data.token);
  location.reload();
};

let regLink = document.querySelector("#regLink")
regLink.addEventListener("click", () => {
  regForm.classList.remove("hidden");
  signInForm.classList.add("hidden");
});

let signInLink = document.querySelector("#signInLink");
signInLink.addEventListener("click", () => {
  regForm.classList.remove("hidden");
  signInForm.classList.add("hidden");
});

if (localStorage.getItem("token")) {
  signInForm.classList.add("hidden");
  document.querySelector("#signInlink").classList.add("hidden");
  document.querySelector("#regLink").classList.add("hidden");
  const greetUser = document.createElement("h2");

  const signOut = document.createElement("button");
  signOut.textContent = "log out";

  signOut.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.reload();
  });
  greetUser.textContent = "you are logged out";
  main.append(greetUser, signOut);
}


