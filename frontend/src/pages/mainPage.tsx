import { useEffect, useState } from "react";
import { api } from "../api";
import { Layout } from "../components/layout";
import { Post, PostsList } from "../components/postsList";
import { PostsViewSwitcher } from "../components/postsViewSwitcher";

const getPosts = async () => {
  const posts = await api.posts.getPosts();
  return posts;
};

export const MainPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        const { posts } = res.data.data;
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);
  return (
    <Layout>
      <PostsViewSwitcher />
      <PostsList posts={posts} />
    </Layout>
  );
};
