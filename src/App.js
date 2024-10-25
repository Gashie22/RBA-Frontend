import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Notes from "./notes/Render";
import NotesList from "./pages/Notes";
import EditNote from "./pages/EditNote";
import AddNote from "./pages/AddNote";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/clients" element={<Products />} />
          <Route path="/clients/add" element={<AddProduct />} />
          <Route path="/clients/edit/:id" element={<EditProduct />} />
          <Route path="/notes" element={<NotesList/>} />
          <Route path="/addnotes" element={<AddNote/>} />
          <Route path="/schedule" element={<Notes/>} />
          <Route path="/notes/edit/:id" element={<EditNote/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


