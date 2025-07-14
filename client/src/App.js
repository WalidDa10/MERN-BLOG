import Header from "./components/header/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import CreatePost from "./pages/create-post/CreatePost";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PostsPage from "./pages/posts-page/PostsPage";
import Footer from "./components/footer/Footer";
import NotFound from "./pages/not-found/NotFound";
import PostDetails from "./pages/post-details/PostDetails";
import {ToastContainer} from "react-toastify"
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import FrogotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer  theme="colored" position="top-center" />
        <Header></Header>
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/Login" element={<Login/>} />
          <Route  path="/register" element={<Register/>} />
          <Route  path="/forgot-password" element={<FrogotPassword/>} />
          <Route  path="/reset-password" element={<ResetPassword/>} />

          <Route  path="/profile/:id" element={<Profile/>} />


          <Route  path="/posts" element={<PostsPage/>} />
          <Route  path="/posts/create-post" element={<CreatePost/>} />
          <Route  path="/posts/details/:id" element={<PostDetails/>} />     
          <Route  path="/posts/categories/:categoy" element={<Category/>} />    

          <Route path="admin-dashboard" >
                <Route  index element={<AdminDashboard/>} />
                <Route  path="users-table" element={<UsersTable/>} />
                <Route  path="posts-table" element={<PostsTable/>} />
                <Route  path="categories-table" element={<CategoriesTable/>} />
                <Route  path="comments-table" element={<CommentsTable/>} />
          </Route>
          <Route  path="*"  element={<NotFound/>} /> 
        </Routes>
        <Footer/>
    </BrowserRouter>
  );
}

export default App;
