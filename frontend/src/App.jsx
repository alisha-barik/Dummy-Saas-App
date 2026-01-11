import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRouter from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TaskDetails from "./pages/TaskDetails";
import Tasks from "./pages/Tasks";
import Signup from "./pages/Signup";


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/" element={<ProtectedRouter><Layout/></ProtectedRouter>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="/tasks" element={<Tasks/>}/>
          <Route path="/tasks/:id" element={<TaskDetails/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
