let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
setData();

function setData() {
  const todoSec = document.getElementById("todo-sec");
  todoSec.innerHTML = "";
  for (let i of todoList) {
    todoSec.innerHTML += `
 <div id="todo">
      <p id="todo-name">${i.content}</p>
      <div class="btn-sec">
      ${
        i.isDone
          ? ` <img src='./assests/check.svg' alt='' class='check mark-btn' data-id=${i.id}>`
          : `  <img src='./assests/check-n.svg' class='check mark-btn' data-id=${i.id}>`
      }
        <button class="btn edit-btn" data-id=${i.id} data-content=${
      i.content
    }>Edit</button>
        <button class="btn delete-btn" data-id=${i.id}>Delete</button>
      </div>
`;
  }
}

const addBtn = document
  .getElementById("add-btn")
  .addEventListener("click", function (e) {
    const todo = document.getElementById("todo-input").value;

    if (todo) {
      let newTodo = {
        id: Date.now(),
        content: todo,
        isDone: false,
      };
      todoList.push(newTodo);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      setData();
      document.getElementById("todo-input").value = "";
    }
  });

document.getElementById("todo-sec").addEventListener("click", function (e) {
  const target = e.target;
  const id = target.getAttribute("data-id");
  const content = e.target.getAttribute("data-content");

  if (target.classList.contains("delete-btn")) {
    deleteTodo(id);
  } else if (target.classList.contains("edit-btn")) {
    editTodo(id, content);
  } else if (target.classList.contains("mark-btn")) {
    markAsREAD(id);
  }
});

function deleteTodo(id) {
  todoList = todoList.filter((todo) => todo.id != id);
  setData();
  localStorage.setItem("todoList", JSON.stringify(todoList));
  console.log(todoList);
}

function editTodo(id, content) {
  console.log("Bhansuj");
  const overlay = document.getElementById("wrapper");
  const editInput = document.getElementById("todo-edit-input");
  overlay.style.display = "flex";
  editInput.focus();
  editInput.value = content;
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.style.display = "none";
    }
  });
  const todoEditBtn = document.getElementById("todo-edit-btn");
  todoEditBtn.setAttribute("data-id", id);
}

const todoEditBtn = document.getElementById("todo-edit-btn");

todoEditBtn.addEventListener("click", function () {
  const id = todoEditBtn.getAttribute("data-id");
  const editInput = document.getElementById("todo-edit-input");

  console.log(id);
  todoList = todoList.map((todo) =>
    todo.id == id ? { ...todo, content: editInput.value } : todo
  );

  localStorage.setItem("todoList", JSON.stringify(todoList));
  setData();
  document.getElementById("wrapper").style.display = "none";
});

function markAsREAD(id) {
  todoList = todoList.map((todo) =>
    todo.id == id ? { ...todo, isDone: !todo.isDone } : todo
  );
  setData();
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
