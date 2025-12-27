import { useEffect, useState } from "react";
const backendUrl = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [tasks, setTasks] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("http://backend:5000/tasks")
      .then(res => res.json())
      .then(data => setList(data));
  }, []);

  const addTask = () => {
    fetch("http://backend:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: tasks })
    }).then(() => {
      setList([...list, { text: tasks }]);
      setTasks("");
    });
  };

  const deleteTask = (id) => {
    fetch(`http://backend:5000/tasks/${id}`, { method: "DELETE" })
      .then(() => setList(list.filter(t => t.id !== id)));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input value={tasks} onChange={e => setTasks(e.target.value)} />
      <button onClick={addTask}>Ajouter</button>

      <ul>
        {list.map(t => (
          <li key={t.id}>
            {t.text}
            <button onClick={() => deleteTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
