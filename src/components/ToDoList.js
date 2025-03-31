import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from "../constants";
import AddToDo from './todocomponents/AddToDo';
import EditToDo from './todocomponents/EditToDo';
import DetailsToDo from './todocomponents/DetailsToDo';
import './ToDoList.css';
import { useNavigate } from 'react-router-dom';


function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [viewingDetail, setViewingDetail] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();


  // Fetch todos when the component is mounted
  useEffect(() => {
    axios.get(BaseUrl + '/api/todo/')
      .then(response => setTodos(response.data))
      .catch(error => console.log(error));
  }, []);

  // Delete todo
  const handleDeleteTodo = (id) => {
    axios.delete(BaseUrl + `/api/todo/${id}/`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(error => console.log(error));
  };

  // Handle logout (removes token)
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');  };

  // Handle AddTodo form visibility
  const handleAddTodoClick = () => {
    setIsAdding(true);
  };

  const handleCancelAddTodo = () => {
    setIsAdding(false);
  };

  return (
    <div className="todo-list-container">
      <div className="todo-list">
        <div className="todo-header">
          <h2>Todo List</h2>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        {/* Conditional rendering for AddToDo, EditToDo, or DetailsToDo */}
        {editing ? (
          <EditToDo todo={editing} setEditing={setEditing} setTodos={setTodos} />
        ) : viewingDetail ? (
          <DetailsToDo todo_id={viewingDetail} setViewingDetail={setViewingDetail} />
        ) : isAdding ? (
          <AddToDo setTodos={setTodos} setShowAddToDo={setIsAdding} />
        ) : (
          <button
            onClick={handleAddTodoClick}
            className="addnewtodo-btn"
          >
            Add New Todo
          </button>
        )}

        {/* Table to display the todos */}
        <div style={{ marginTop: 20 }}>
          <table className="todo-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map(todo => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>{todo.due_date}</td>
                  <td>{todo.status}</td>
                  <td>{todo.created_at}</td>
                  <td>{todo.updated_at}</td>
                  <td>
                    <button
                      onClick={() => setEditing(todo)}
                      style={{ marginRight: 8 }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      style={{ marginRight: 8 }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setViewingDetail(todo.id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
