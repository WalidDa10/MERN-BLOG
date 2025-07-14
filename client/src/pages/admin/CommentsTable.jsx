import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import swal from "sweetalert";

import { useEffect } from "react";


const CommentsTable = () => {
  
  
  useEffect(() => {
  }, []);

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Comment has been deleted!", {
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
        <h1 className="table-title">Comments</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3].map((item) => (
              <tr key={item}>
                <td>{item}</td>
                <td>
                  <div className="table-image">
                    <img
                      src="/images/user-avatar.png"
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">
                      Walid
                    </span>
                  </div>
                </td>
                <td>thank for post</td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCommentHandler(item)}>
                      Delete Comment
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
};

export default CommentsTable;
