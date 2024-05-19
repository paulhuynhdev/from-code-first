import Post from "./Post";

const postList = [
  {
    title: "First Post",
    username: "richard",
    date: "2 days ago",
    votes: 5,
    totalComment: 10,
  },
  {
    title: "Second Post",
    username: "bob",
    date: "1 month ago",
    votes: 2,
    totalComment: 3,
  },
  {
    title: "Why DDD?",
    username: "khalil",
    date: "10 month ago",
    votes: 7,
    totalComment: 3,
  },
];

export default function PostList() {
  return (
    <div className="posts-list">
      {postList.map((post, index) => (
        <Post key={index} {...post} />
      ))}
    </div>
  );
}
