import React from 'react';
import './home.css'
import PostList from '../../components/posts/PostList';
import Sidebar from '../../components/sidebar/Sidebar';
import { posts ,categories } from '../../dummyData';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <section className="home">
            <div className="home-hero-header">
                <div className="home-hero-header-layout">
                    <div className="home-title">Welcome to My Blog </div>
                </div>
            </div>
            <div className="home-latest-post">Latest Posts</div>
            <div className="home-container">
                <PostList posts={posts.slice(0,3)}/>
                <Sidebar categories ={categories} />
            </div>
            <div className="home-see-posts-link">
                <Link to="/posts"  className='home-link'>
                    See ALL Posts
                </Link>
            </div>
        </section>
    );
};

export default Home;