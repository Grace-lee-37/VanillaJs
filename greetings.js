
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greetings = document.querySelector(".js-greetings");


const USER_LS = "currentUser",
    SHOW_CN = "show";

function saveName(name){
    localStorage.setItem(USER_LS, name)
};

function submitName(e){
    e.preventDefault();
    const getName = input.value;
    paintGreeting(getName);
    saveName(getName);
}

function askName(){
    form.classList.add(SHOW_CN);
    form.addEventListener("submit", submitName)
}

function paintGreeting(name){
    form.classList.remove(SHOW_CN);
    greetings.classList.add(SHOW_CN);
    greetings.innerHTML = `Hola, ${name}🕺🏻!`
}

function checkUsername(){
    const checkValue = localStorage.getItem(USER_LS)
    if (checkValue === null){
        askName();
    } else {
        paintGreeting(checkValue);
    }
}

function init(){
    checkUsername();
}

init();
