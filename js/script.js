const themeBtn = document.getElementById("theme-swicher");
const bodyTag = document.querySelector("body");
const todoInput = document.getElementById("todo-ipt");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

function main() {
  //themeSwicher
  themeBtn.addEventListener("click", () => {
    bodyTag.classList.toggle("dark");
  });

  makeElement(JSON.parse(localStorage.getItem("todos")));
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
      };

      todos.push(currentItem);
      localStorage.setItem("todos", JSON.stringify(todos));
      console.log("test");
    }
  });
}

function makeElement(todoArray) {
  if (!todoArray) {
    return null;
  }
  todoArray.forEach((element) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const checkBox = document.createElement("input");
    const item = document.createElement("p");
    const clearBtn = document.createElement("button");
    const clearImg = document.createElement("img");

    //set class
    li.className = "flex justify-between items-center cursor-move p-4 gap-4 border-b-2";
    div.className = "flex justify-start items-center gap-4";
    checkBox.className = "w-5 h-5 rounded-full";
    //set attribute
    li.setAttribute("draggable", true);
    checkBox.setAttribute("type", "checkbox");
    clearImg.setAttribute("src", "./assets/images/icon-cross.svg");
    clearImg.setAttribute("alt", "delete-icon");
    item.textContent = element.item;
    //add event

    //set elemen
    div.appendChild(checkBox);
    div.appendChild(item);
    clearBtn.appendChild(clearImg);
    li.appendChild(div);
    li.appendChild(clearBtn);
    todoList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", main);
