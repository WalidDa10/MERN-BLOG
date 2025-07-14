import "./posts-page.css";
import { posts , categories } from "../../dummyData";
import { useEffect } from "react";
import PostList from "../../components/posts/PostList"; 
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagintaion/Pagination";

const PostsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <section className="posts-page">
        <PostList posts={posts} />
        <Sidebar categories ={categories} />
      </section>
      <Pagination />
    </>
  );
};

export default PostsPage;