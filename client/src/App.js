import Header from "./components/header/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import CreatePost from "./pages/create-post/CreatePost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PostsPage from "./pages/posts-page/PostsPage";

function App() {
  return (
    <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/Login" element={<Login/>} />
          <Route  path="/register" element={<Register/>} />
          <Route  path="/posts" element={<PostsPage/>} />
          <Route  path="/posts/create-post" element={<CreatePost/>} />
          <Route  path="/admin-dashboard" element={<AdminDashboard/>} />
        </Routes>

    </BrowserRouter>
  );
}

export default App;
