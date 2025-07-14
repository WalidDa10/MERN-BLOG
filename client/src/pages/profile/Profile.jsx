import "./profile.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
//import { useDispatch, useSelector } from "react-redux";
//import { useParams } from "react-router-dom";
import swal from "sweetalert";

//import PostItem from "../../components/posts/PostItem";
import PostList from "../../components/posts/PostList";
import { posts } from "../../dummyData";
import UpdateProfileModal from "./UpdateProfileModal";


const Profile = () => {
  


  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("ther is no file!");

    alert('Image Uploaded')
    // const formData = new FormData();
    // formData.append("image", file);
  };

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        swal("Account has been deleted!")
      }else{
        swal('Somthing went wrong!')
      }
    });
  };

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file): "/images/user-avatar.png" }
            alt=""
            className="profile-image"
          />
          
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill upload-profile-photo-icon"
                ></label>
              </abbr>
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                id="file"
                onChange={(e)=>setFile(e.target.files[0])}
              />
              <button className="upload-profile-photo-btn" type="submit">
                upload
              </button>
            </form>
          
        </div>
        <h1 className="profile-username">walid</h1>
        <p className="profile-bio">Hello .......</p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>fri nov 23</span>
        </div>
          <button
            onClick={() => setUpdateProfile(true)}
            className="profile-update-btn"
          >
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>

      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title"> Posts</h2>
        <PostList posts={posts} />
      </div>
      
        <button onClick={deleteAccountHandler} className="delete-account-btn">
          Delete Your Account
        </button>
        {updateProfile && ( <UpdateProfileModal setUpdateProfile={setUpdateProfile} />  )}
    </section>
  );
};

export default Profile;
