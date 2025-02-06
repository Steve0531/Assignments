document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.getElementById("input-todo");
    const buttonTodo = document.getElementById("button-todo");
    const ulTodo = document.getElementById("ul-todo");
    const delTodo = document.getElementById("button-del");

    let editMode = false;
    let editElement = null;

    buttonTodo.addEventListener("click", () =>{
        const text = inputTodo.value;
        if(editMode){
            editElement.querySelector(".text-todo").textContent = text;
            editMode = false;
            editElement = null;
            buttonTodo.textContent = "Add";
        } else {
            createTodo(text);
        }
        inputTodo.value = "";
        saveAllTodo();
    });

    const createTodo = (task) =>{
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-start";
        li.innerHTML = `<span class="text-todo">${task}</span>
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-danger">Edit</button>
        <button type="button" class="btn btn-warning">Delete</button>
      </div>`;
      ulTodo.appendChild(li);
    };


    delTodo.addEventListener("click", () =>{
        const confirmDel = window.confirm("Are you sure ?");
        if(confirmDel){
            document.getElementById("ul-todo").innerHTML = "";
        }
    });

    ulTodo.addEventListener("click", (e) =>{
        if(e.target.classList.contains("btn-warning")) {
            const confirmDel = window.confirm("Are you sure?");
            if (confirmDel) {
                e.target.closest(".list-group-item").remove();
                saveAllTodo();
            }
        }


        if(e.target.classList.contains("btn-danger")) {
            const li = e.target.closest(".list-group-item");
            const taskTextElement = li.querySelector(".text-todo");
            if(!taskTextElement) return;

            const ipField = document.createElement("input");
            ipField.type = "text";
            ipField.value = taskTextElement.textContent;
            ipField.classList.add("form-control", "d-inline-block", "w-75");

            const savebtn = document.createElement("button");
            savebtn.textContent = "Save";
            savebtn.classList.add("btn", "btn-success", "btn-sm", "ms-2");

            taskTextElement.replaceWith(ipField);

            e.target.replaceWith(savebtn);

            ipField.focus();

            savebtn.addEventListener("click", () => {
                saveEditedTask(li, ipField, savebtn);
            });
        }
    });
    function saveEditedTask(li, ipField, savebtn) {
        const newText = ipField.value.trim();

        if (newText) {
            const span = document.createElement("span");
            span.classList.add("text-todo");
            span.textContent = newText;

            ipField.replaceWith(span);


            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");


            savebtn.replaceWith(editButton);

            saveAllTodo();

        }
    }

    const saveAllTodo = () => {
        const allTodos = [...document.querySelectorAll(".text-todo")].map(
            (task) => task.textContent
        );

        localStorage.setItem("allTodos", JSON.stringify(allTodos));
    };

    const loadAllTodo = () => {
        const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
        allTodos.forEach((task) => createTodo(task));
    };

    loadAllTodo();
});

