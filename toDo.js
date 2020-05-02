const toDoForm = document.querySelector(".js-toDo"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDo"

let toDos = []

function DeleteToDo(e) {
    const btn = e.target
    const li = btn.parentNode
    toDoList.removeChild(li)
    const cleanToDo = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id)
    })
    toDos = cleanToDo
    saveToDo(toDos)
}

function submitToDo(e){
    e.preventDefault();
    const getToDo = toDoInput.value
    paintToDo(getToDo);
}

function saveToDo(obj){
    localStorage.setItem(TODO_LS, JSON.stringify(obj))
}

function paintToDo(text){
    const li = document.createElement("li")
    const btn = document.createElement("button")
    const span = document.createElement("span")
    const newId = toDos.length + 1
    span.innerText = text
    span.style.fontWeight = "bold"
    btn.innerHTML = "❌"
    btn.classList.add("delBtn")
    li.id = newId
    btn.addEventListener("click", DeleteToDo)
    li.append(btn, span);
    toDoList.appendChild(li);
    const toDoObj = {
        id: newId,
        text: text
    }
    toDos.push(toDoObj);
    console.log(toDos)
    saveToDo(toDos);
}

function checkToDo(){
    const loadedToDo = localStorage.getItem(TODO_LS) 
    if(loadedToDo !== null){
        const parsedToDo = JSON.parse(loadedToDo)
        parsedToDo.forEach(function(toDo){
            paintToDo(toDo.text)
            console.log(toDo.text)
        })
    }
}

function init(){
    checkToDo();
    toDoForm.addEventListener("submit", submitToDo)
}

init();
