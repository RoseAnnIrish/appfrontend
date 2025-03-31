import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BaseUrl } from "../../constants";

const EditToDo = ({ todo, setEditing, setTodos }) => {
  const [editedTodo, setEditedTodo] = useState({
    title: '',
    description: '',
    due_date: '',
    status: 'pending'
  });

  // Fetch the todo data when the component mounts or when the todo prop changes
  useEffect(() => {
    setEditedTodo({
      title: todo.title,
      description: todo.description,
      due_date: todo.due_date,
      status: todo.status
    });
  }, [todo]);

  const handleTitleChange = (e) => {
    setEditedTodo({ ...editedTodo, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setEditedTodo({ ...editedTodo, description: e.target.value });
  };

  const handleDueDateChange = (e) => {
    setEditedTodo({ ...editedTodo, due_date: e.target.value });
  };

  const handleStatusChange = (e) => {
    setEditedTodo({ ...editedTodo, status: e.target.value });
  };

  const handleUpdateTodo = () => {
    axios.put(BaseUrl + `/api/todo/${todo.id}/`, editedTodo)
      .then(response => {
        const updatedTodos = todo.map(t => t.id === todo.id ? response.data : t);
        setTodos(updatedTodos);
        setEditing(null); // Close the edit form after updating
      })
      .catch(error => console.log("Error updating todo:", error.response ? error.response.data : error.message));
  };

  return (
    <div>
      <h3>Edit Todo</h3>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={editedTodo.title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          value={editedTodo.description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <label>Due Date</label>
        <input
          type="date"
          value={editedTodo.due_date}
          onChange={handleDueDateChange}
        />
      </div>
      <div>
        <label>Status</label>
        <select
          value={editedTodo.status}
          onChange={handleStatusChange}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button onClick={handleUpdateTodo}>Save</button>
      <button onClick={() => setEditing(null)}>Cancel</button>
    </div>
  );
};

export default EditToDo;
