import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { posts } from "../../dummyData";
import "./post-details.css";
import {toast ,ToastContainer } from "react-toastify"
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import UpdatePostModal from "./UpdatePostModal";
import swal from "sweetalert"


const PostDetails = () => {
  const { id } = useParams();
  const post = posts.find(p => p._id === parseInt(id) )

  const [file , setfile] = useState(null)
  const [ubdatePost, setUpdatePost ] = useState(false)


  useEffect(()=>{
    window.scrollTo(0,0);
  }, []);
  // Update Image Sunmit Handler
  const updateImageSubmitHandler = (e) =>{
    e.preventDefault();
    if (!file) return toast.warning('there is no file!')

    alert("Image uploaded successfully")
    console.log('Image uploaded successfully')
  } 

  // Delete Post Handler 
  const DeletePostHandler = () =>{
          swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          } else {
            swal("Your imaginary file is safe!");
          }
        }); 
  }
  return (
    <section className="post-details">
      <ToastContainer  theme="colored" position="top-center" />
      <div className="post-details-image-wrapper">
        <img
          src={ file? URL.createObjectURL(file) : post.image}
          alt=""
          className="post-details-image"
        />
        <form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
          <label htmlFor="file" className="update-post-label">
            <i className="bi bi-image-fill"></i>
            select new image
          </label>
          <input 
          style={{display:"none"}} 
          type="file" 
          name="file" 
          id="file"
          onChange={(e) => setfile(e.target.files[0]) }
          />
          <button type="submit">Upload </button>
        </form>
      </div>   
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          src={post?.user.image}
          alt=""
          className="post-details-user-image"
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post?.description}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero est
        reprehenderit, molestiae officia non corrupti iusto, molestias quod
        repellat, distinctio temporibus explicabo? Placeat, dolorum atque fugiat
        vitae suscipit ratione quo? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Vero est reprehenderit, molestiae officia non corrupti
        iusto, molestias quod repellat, distinctio temporibus explicabo?
        Placeat, dolorum atque fugiat vitae suscipit ratione quo?
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          <i className="bi bi-hand-thumbs-up"></i>
          <small></small>
          <small>{post?.likes.length} likes</small>
        </div>
        <div>
          <i  onClick={()=> setUpdatePost(true)} className="bi bi-pencil-square"></i>
          <i onClick={DeletePostHandler} className="bi bi-trash-fill"></i>
        </div>
      </div>
      <AddComment></AddComment>
      <CommentList/>
      {ubdatePost && <UpdatePostModal  post ={post} setUpdatePost = {setUpdatePost} />}
    </section>
  );
};

export default PostDetails;
