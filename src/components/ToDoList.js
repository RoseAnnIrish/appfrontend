import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from "../constants";
import AddToDo from './todocomponents/AddToDo';
import EditToDo from './todocomponents/EditToDo';
import './ToDoList.css';
import { useNavigate } from 'react-router-dom';

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token'); // Get token for authorization

    if (!userId || !token) {
      navigate('/login'); // Redirect to login if no user or token is found
      return;
    }

    // Fetch todos for the logged-in user using the userId and Token for authorization
    axios.get(`${BaseUrl}/api/todo/todo/?user=${userId}`, {
      headers: {
        'Authorization': `Token ${token}`, // Include token for authentication
      }
    })
    .then(response => {
      if (response.data.length === 0) {
        console.log("No todos found for this user.");
      }
      setTodos(response.data); // Set fetched todos to state
    })
    .catch(error => {
      console.log("Error fetching todos:", error); // Handle error
    });
  }, [navigate]);

  const handleDeleteTodo = (id) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("No token found. Please log in.");
      return;
    }

    axios.delete(`${BaseUrl}/api/todo/todo/${id}/`, {
      headers: {
        'Authorization': `Token ${token}` // Include the token for authentication
      }
    })
    .then(() => {
      setTodos(todos.filter(todo => todo.id !== id)); // Remove deleted todo from state
    })
    .catch(error => {
      console.log("Error deleting todo:", error); // Handle error
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id'); // Remove user_id after logout
    navigate('/login');
  };

  const handleAddTodoClick = () => {
    setIsAdding(true); // Show the AddToDo form
  };

  const handleEditClick = (todo) => {
    setEditing(todo);
    setShowModal(true); // Show the modal when edit button is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal when done
    setEditing(null); // Reset the editing state
  };

  return (
    <div className="todo-list-container">
      <div className="todo-list">
        <div className="todo-header">
          <h2><strong>Get Things Done.</strong></h2>
        <p className="todo-subtitle">Your To-Do List</p> {/* Added class for styling */}
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        {/* Conditional rendering for AddToDo, EditToDo */}
        {isAdding ? (
          <AddToDo setTodos={setTodos} setShowAddToDo={setIsAdding} />
        ) : (
          <button onClick={handleAddTodoClick} className="addnewtodo-btn">
            Add New Todo
          </button>
        )}

        {/* Modal for editing a todo */}
        {showModal && editing && (
          <div className="modal-overlay">
            <div className="modal-content">
              <EditToDo todo={editing} setEditing={setEditing} setTodos={setTodos} />
              <button onClick={handleCloseModal} className="close-modal-btn">Close</button>
            </div>
          </div>
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
              {todos.length > 0 ? (
                todos.map(todo => (
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
                        onClick={() => handleEditClick(todo)}
                        style={{ marginRight: 8 }}
                        className={"btn-edit"}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTodo(todo.id)}
                        style={{ marginRight: 8 }}
                        className={"btn-delete"}

                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No todos available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
