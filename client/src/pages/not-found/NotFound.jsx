import React from 'react';
import "./not-found.css"
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <section className="not-found">
            <div className="not-found-title">404</div>
            <h1 className="not-found-text">Page Not found</h1>
            <Link  className='not-found-link' to="/"  >
                Go to the home page
            </Link>
        </section>
    );
};

export default NotFound;