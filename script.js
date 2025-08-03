let tasks = [];

function addTask() {
  const text = document.getElementById('taskText').value.trim();
  const time = document.getElementById('taskTime').value;

  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    text,
    time,
    completed: false
  };

  tasks.push(task);
  renderTasks();
  document.getElementById('taskText').value = "";
  document.getElementById('taskTime').value = "";
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement('li');

    const taskInfo = document.createElement('div');
    taskInfo.className = task.completed ? 'completed' : '';
    taskInfo.innerHTML = `
      <strong>${task.text}</strong><br>
      <small>${task.time ? new Date(task.time).toLocaleString() : ''}</small>
    `;
    li.appendChild(taskInfo);

    const actions = document.createElement('div');
    actions.className = "actions";

    const completeBtn = document.createElement('button');
    completeBtn.textContent = "✔";
    completeBtn.onclick = () => toggleComplete(task.id);
    actions.appendChild(completeBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = "✏";
    editBtn.onclick = () => editTask(task.id);
    actions.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "🗑";
    deleteBtn.className = "delete";
    deleteBtn.onclick = () => deleteTask(task.id);
    actions.appendChild(deleteBtn);

    li.appendChild(actions);
    list.appendChild(li);
  });
}

function toggleComplete(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function editTask(id) {
  const newText = prompt("Edit your task:");
  if (newText) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    );
    renderTasks();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}
