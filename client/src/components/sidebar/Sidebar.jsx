import React from 'react';
import './sidebar.css'
import { Link } from 'react-router-dom';
const Sidebar = ({categories}) => {  
    return (
        <div className='sidebar'>
            <h1 className='sidebar-title' >CATEGORIES</h1>
            <ul className="sidebar-links">
                { categories.map(category =>
                    <Link className='sidebar-link' key={category.id}  to={`/posts/categories/${category.title}`}>
                        {category.title}
                    </Link>
                ) }
            </ul>
        </div>
    );
};

export default Sidebar;