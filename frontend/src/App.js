import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  const API_URL = "http://backend:5000/tasks"; 
  // ⚠️ Pour Docker
  // Si tu testes hors Docker → http://localhost:5000/tasks

  // Charger les tâches
  const loadTasks = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setList(data));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // Ajouter ou modifier une tâche
  const addTask = () => {
    if (!tasks.trim()) return;

    if (editId) {
      fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: tasks })
      }).then(() => {
        setEditId(null);
        setTasks("");
        loadTasks();
      });
    } else {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: tasks })
      }).then(() => {
        setTasks("");
        loadTasks();
      });
    }
  };

  // Supprimer
  const deleteTask = (id) => {
    if (!window.confirm("Delete this task ?")) return;

    fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    }).then(loadTasks);
  };

  // Préparer l’édition
  const editTask = (task) => {
    setEditId(task.id);
    setTasks(task.text);
  };

  // Toggle Done
  const toggleDone = (id) => {
    fetch(`${API_URL}/${id}/done`, {
      method: "PUT"
    }).then(loadTasks);
  };

  return (
    <div className="App">
      <h1>TODO</h1>

      <input
        type="text"
        placeholder="Task Name"
        value={tasks}
        onChange={(e) => setTasks(e.target.value)}
      />

      <button
        className="update-btn"
        onClick={addTask}
        disabled={!tasks.trim()}
      >
        {editId ? "Update" : "Add"}
      </button>

      <br />

      <button
        className="submit-btn"
        onClick={addTask}
        disabled={!tasks.trim()}
      >
        Submit
      </button>

      {list.map(task => (
        <div className="task" key={task.id}>
          <span className={task.done ? "done" : ""}>
            {task.text}
          </span>

          <div>
            <button
              className="edit-btn"
              onClick={() => editTask(task)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              Delete
            </button>

            <button
              className="edit-btn"
              onClick={() => toggleDone(task.id)}
            >
              {task.done ? "Undo" : "Done"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
