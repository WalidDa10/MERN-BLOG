import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import { useEffect } from "react";
import { posts } from "../../dummyData";

const PostsTable = () => {

    useEffect(() => {
     
    }, []);

  // Delete Post Handler
  const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
        swal("Post has been deleted!", {
          icon: "Success"
        })
      }else{
        swal("Something went wrong!")
      }
    });
  };

    return ( 
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Posts</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Post Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="table-image">
                                        <img 
                                         src="/images/user-avatar.png"
                                         alt=""
                                         className="table-user-image"
                                        />
                                        <span className="table-username">
                                            {item.user.username}
                                        </span>
                                    </div>
                                </td>
                                <td>{item.title}</td>
                                <td>
                                    <div className="table-button-group">
                                        <button>
                                            <Link to={`/posts/details/${item._id}`}>
                                               View Post
                                            </Link>
                                        </button>
                                        <button onClick={() => deletePostHandler(item._id)}>
                                            Delete Post
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
     );
}
 
export default PostsTable;