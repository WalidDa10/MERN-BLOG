import AdminSidebar from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import { useEffect } from "react";

const UsersTable = () => {
  

  useEffect(() => {
    
  }, []);

  // Delete User Handler
  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("User has been deleted!", {
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
        <h1 className="table-title">Users</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5,6,7,8,9,10].map((item) => (
              <tr key={item}>
                <td>{item}</td>
                <td>
                  <div className="table-image">
                    <img
                      src='/images/user-avatar.png'
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">Walid</span>
                  </div>
                </td>
                <td>walid@gmail.com</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${item}`}>View Profile</Link>
                    </button>
                    <button onClick={() => deleteUserHandler(item)}>
                      Delete User
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

export default UsersTable;
