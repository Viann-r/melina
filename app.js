// fetch("https://restaurant.stepprojects.ge/api/Products/GetAll").then((resp) => resp.json).then((data) => showProducts(data));



const burgerBtn = document.querySelector("#mobileNavBtn");
const mobileNav = document.querySelector("#mobNav");

burgerBtn.addEventListener("click", () => {
  burgerBtn.classList.toggle("activemobilenavbtn");
   mobileNav.classList.toggle("activemobnav");
});



// const themeBtn = document.querySelector("#themeBtn");
// themeBtn.addEventListener("click", () => changeTheme())

// function changeTheme() {
//     document.body.classList.toggle("lightTheme");
//     themeBtn.classList.toggle("lightBtnIcon");
// }

const ThemeBtn = document.querySelector("#themeBtn");
ThemeBtn.addEventListener("click", () => changeTheme())

function changeTheme() {
    document.body.classList.toggle("lightTheme")
    ThemeBtn.classList.toggle("lightBtnIcon")
}

const themeBtnMob = document.querySelector("#themeBtnMob");
themeBtnMob.addEventListener("click", () => changeThemeMob())

function changeThemeMob() {
    document.body.classList.toggle("lightThemeMob");
    themeBtnMob.classList.toggle("lightBtnIconMob");
}

const Delivery = document.querySelector(".PD");

Delivery.addEventListener("click", () => {
    alert("delivery not available");
})






