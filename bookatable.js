let Un = document.querySelector("#un");
let UnN = document.getElementsByClassName("un-n")
let closeBtn = document.querySelector("#close");
let closebBtn = document.querySelector("#closeb");
let fatBtn = document.querySelector("#findatableBtn");

fatBtn.addEventListener("click", () => {
    Un.style.display = "flex";
})

closeBtn.addEventListener("click", () => {
    Un.style.display = "none";
})

closebBtn.addEventListener("click", () => {
    Un.style.display = "none";
})


let submitmessageBtn = querySelector("#submitMessage");

submitmessageBtn.addEventListener("click", () => {
   alert("We received your message!")
   console.log(1);
})