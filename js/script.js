const themeBtn = document.getElementById("theme-swicher");
const bodyTag = document.querySelector("body");
const todoInput = document.getElementById("todo-ipt");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const numberRemaing = document.getElementById("num-ram");
const clearCompleteBtn = document.getElementById("clear-completed");
const showAllBtn = document.getElementById("show-all");
const showActiveBtn = document.getElementById("show-active");
const showCompletedBtn = document.getElementById("show-completed");

function main() {
  //themeSwicher
  themeBtn.addEventListener("click", () => {
    bodyTag.classList.toggle("dark");
    const themeImg = themeBtn.children[0];
    themeImg.setAttribute(
      "src",
      themeImg.getAttribute("src") === "./assets/images/icon-sun.svg"
        ? "./assets/images/icon-moon.svg"
        : "./assets/images/icon-sun.svg"
    );
  });

  makeElement(JSON.parse(localStorage.getItem("todos")) || []);
  //add todo input
  addBtn.addEventListener("click", () => {
    const item = todoInput.value.trim();
    if (item) {
      todoInput.value = "";

      const todos = !localStorage.getItem("todos")
        ? []
        : JSON.parse(localStorage.getItem("todos"));

      const currentItem = {
        item: item,
        completed: false,
      };

      todos.push(currentItem);
      localStorage.setItem("todos", JSON.stringify(todos));
      makeElement([currentItem]);
      updateSpanNumber();
    }
  });
  // add with press ener
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addBtn.click();
    }
  });
  //add clear completed
  clearCompleteBtn.addEventListener('click' , ()=>{
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const activeTodos = todos.filter(todo => !todo.completed);
    localStorage.setItem("todos" , JSON.stringify(activeTodos));
    todoList.innerHTML = "";
    makeElement(activeTodos);
    updateSpanNumber();
  });
  //add showing item
  showAllBtn.addEventListener('click' , ()=>{
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todoList.innerHTML = "";
    makeElement(todos);
    updateSpanNumber();
  });

  showActiveBtn.addEventListener('click' , ()=>{
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const activeTodos = todos.filter(todo => !todo.completed);
    todoList.innerHTML = "";
    makeElement(activeTodos);
    updateSpanNumber();
  })

  showCompletedBtn.addEventListener('click' , ()=>{
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const completeTodos = todos.filter(todo => todo.completed);
    todoList.innerHTML = "";
    makeElement(completeTodos);
    updateSpanNumber();
  })
  // drag and drap
  todoList.addEventListener("dragstart", (e) => {
    e.target.classList.add("opacity-50");
  });
  todoList.addEventListener("dragend", (e) => {
    e.target.classList.remove("opacity-50");
  });
  todoList.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (
      e.target.classList.contains("cursor-move") &&
      !e.target.classList.contains("draggable")
    ) {
      const dragItem = document.querySelector(".opacity-50");
      const cards = [...todoList.querySelectorAll("li")];
      const currentPos = cards.indexOf(dragItem);
      const newPos = cards.indexOf(e.target);
      if (currentPos > newPos) {
        todoList.insertBefore(dragItem, e.target);
      } else {
        todoList.insertBefore(dragItem, e.target.nextSibling);
      }
      const todos = JSON.parse(localStorage.getItem("todos"));
      const removed = todos.splice(currentPos, 1);
      todos.splice(newPos, 0, removed[0]);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });
}

function makeElement(todoArray) {
  if (!todoArray) {
    return null;
  }
  todoArray.forEach((element) => {
    if (!element) return;
    const li = document.createElement("li");
    const div = document.createElement("div");
    const checkBox = document.createElement("input");
    const item = document.createElement("p");
    const clearBtn = document.createElement("button");
    const clearImg = document.createElement("img");

    //set class
    li.className =
      "flex justify-between items-center cursor-move p-4 gap-4 border-b-2";
    div.className = "flex justify-start items-center gap-4";
    checkBox.className = "w-5 h-5 rounded-full";
    //set attribute
    li.setAttribute("draggable", true);
    checkBox.setAttribute("type", "checkbox");
    clearImg.setAttribute("src", "./assets/images/icon-cross.svg");
    clearImg.setAttribute("alt", "delete-icon");
    item.textContent = element.item;
    checkBox.checked = element.completed;
    if (element.completed) {
      item.classList.add("line-through", "text-gray-400");
    }
    //add event
    //add check box event
    checkBox.addEventListener("change", () => {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const index = [...todoList.children].indexOf(li);

      todos[index].completed = checkBox.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (checkBox.checked) {
        item.classList.add("line-through", "text-gray-400");
      } else {
        item.classList.remove("line-through", "text-gray-400");
      }
      updateSpanNumber();
    });
    //clear item
    clearBtn.addEventListener("click", () => {
      li.classList.add("opacity-0", "transition-opacity", "duration-500");
      setTimeout(() => {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        const index = [...todoList.children].indexOf(li);
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        li.remove();
        updateSpanNumber();
      }, 500);
    });
    //set elemen
    div.appendChild(checkBox);
    div.appendChild(item);
    clearBtn.appendChild(clearImg);
    li.appendChild(div);
    li.appendChild(clearBtn);
    todoList.appendChild(li);
  });
}

function updateSpanNumber() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const numFilter = todos.filter((todo) => !todo.completed).length;
  numberRemaing.textContent = numFilter;
}
// function rendertodos(e){
//     todoList.innerHTML = "";
//     makeElement(e);
//     updateSpanNumber();
// }

document.addEventListener("DOMContentLoaded", () => {
  main();
  updateSpanNumber();
});
