import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = ({toggle , settogggle }) => {
    return (
        <nav style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} className="navbar">
                <ul className="nav-links">
                    <Link to="/" onClick={()=>settogggle(false)} className="nav-link">
                        <i className="bi bi-house"></i>Home
                    </Link>
                    <Link to="/posts" onClick={()=>settogggle(false)} className="nav-link">
                        <i className="bi bi-stickies"></i>Posts
                    </Link>
                    <Link to="/posts/create-post" onClick={()=>settogggle(false)} className="nav-link">
                        <i className="bi bi-journal-plus"></i>Create
                    </Link>
                    <Link to="/admin-dashboard" onClick={()=>settogggle(false)} className="nav-link">
                        <i className="bi bi-person-check"></i>Admin Dashboard
                    </Link>
                </ul>
            </nav>
    );
};

export default Navbar;