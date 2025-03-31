import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import ToDoList from "./components/ToDoList";
import AddToDo from './components/todocomponents/AddToDo';


function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect '/' to '/login' by default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Other Routes */}
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={<ToDoList />} />
        <Route path="/todo/add" element={<AddToDo />} />


        {/* Catch-all 404 Page */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
