import "../../styles/app.css";
import Header from "../../components/Header";
import PostList from "../../components/PostList";

function HomePage() {
  return (
    <div>
      <Header />
      <div className="content-container">
        <div className="posts-view-switcher flex">
          <div className="active">Popular</div>
          <div className="active">New</div>
        </div>
        <PostList />
      </div>
    </div>
  );
}

export default HomePage;
