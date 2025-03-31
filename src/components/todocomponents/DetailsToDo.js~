import React, { useEffect, useState } from 'react';
import axios from "axios";
import { BaseUrl } from "../../constants";

function DetailsToDo({ todo_id, setViewingDetail }) {
    const [todo, setTodo] = useState(null);
    const token = localStorage.getItem('authtoken'); // Ensure it's 'authtoken' instead of 'token'

    useEffect(() => {
        if (!todo_id) return;  // Prevent API call if no todo_id is provided

        // Fetch the todo details from the API
        axios.get(`${BaseUrl}/api/todo/${todo_id}/`, {
            headers: {
                "Authorization": `Token ${token}`, // Use 'authtoken' for authorization
                "Content-Type": "application/json"
            }
        })
        .then(response => setTodo(response.data))
        .catch(error => {
            console.log("Error fetching todo details:", error);
        });
    }, [todo_id, token]); // Ensure token is updated if it's changed

    if (!todo) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{todo.title}</h2>
            <p><strong>Description:</strong> {todo.description}</p>
            <p><strong>Due Date:</strong> {todo.due_date}</p>
            <p><strong>Status:</strong> {todo.status}</p>
            <p><strong>Created At:</strong> {todo.created_at}</p>
            <p><strong>Updated At:</strong> {todo.updated_at}</p>

            {/* Back button */}
            <button onClick={() => setViewingDetail(null)}>Back to List</button>
        </div>
    );
}

export default DetailsToDo;
