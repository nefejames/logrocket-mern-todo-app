import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios
      .get('http://localhost:3001/todos')
      .then((res) => {
        setTasks(res.data);
      })
      .catch((error) => {
        console.log('Unable to fetch tasks:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask.trim()) return; // Prevent empty tasks
    
    axios
      .post('http://localhost:3001/todos', { label: newTask, status: 'pending' })
      .then((res) => {
        setNewTask('');
        fetchTasks();
      })
      .catch((error) => {
        console.log('Unable to post task:', error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.log('Unable to delete task:', error);
      });
  };

  const toggleCompletion = (id, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    axios
      .put(`http://localhost:3001/todos/${id}`, { status: newStatus })
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.log('Unable to update task:', error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-orange-500">Todo App</h1>
        <form onSubmit={handleSubmit} className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Type todo here..."
            className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 focus:outline-none"
          >
            Add
          </button>
        </form>
        <ul>
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`flex items-center justify-between p-2 mb-2 rounded-md ${
                task.status === 'completed' ? 'bg-orange-100' : 'bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={() => toggleCompletion(task._id, task.status)}
                className="form-checkbox h-5 w-5 text-orange-500"
              />
              <span
                className={`flex-1 ml-2 cursor-pointer ${
                  task.status === 'completed' ? 'line-through text-gray-500' : ''
                }`}
                onClick={() => toggleCompletion(task._id, task.status)}
              >
                {task.label}
              </span>
              <button
                onClick={() => handleDelete(task._id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
                aria-label="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;