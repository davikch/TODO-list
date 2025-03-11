document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("todoText");
  const list = document.getElementById("list-items");

  loadTasks();

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission (if inside a form)

      const taskText = input.value.trim();

      if (taskText !== "") {
        addTask(taskText);
        input.value = ""; // Clear the input field
      }
    }
  });

  function addTask(taskText) {
    const li = document.createElement("li");

    // Create a span to hold the task text
    const span = document.createElement("span");
    span.textContent = taskText;
    li.appendChild(span);

    const buttons = document.createElement("div");
    buttons.classList.add("button-group");
    li.appendChild(buttons);

    const doneButton = document.createElement("button");
    doneButton.classList.add("done-button");
    // doneButton.textContent = "~";
    doneButton.addEventListener("click", function () {
      li.classList.toggle("completed");
      saveTasks();
    });
    buttons.appendChild(doneButton);

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    // editButton.textContent = "O";
    editButton.addEventListener("click", function () {
      const newText = prompt("Edit your task:", span.textContent);
      if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
        saveTasks();
      }
    });
    buttons.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    // deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function () {
      li.classList.add("task-removed");

      setTimeout(() => {
        list.removeChild(li);
        saveTasks();
      }, 200);
    });
    buttons.appendChild(deleteButton);

    list.appendChild(li);

    li.classList.add("task-added");
    saveTasks();
  }

  function saveTasks() {
    const tasks = [];
    list.querySelectorAll("li").forEach((li) => {
      tasks.push({
        text: li.querySelector("span").textContent,
        completed: li.classList.contains("completed"),
      });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addTask(task.text, task.completed);
    });
  }
});
