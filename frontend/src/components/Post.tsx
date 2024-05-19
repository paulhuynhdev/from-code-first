import ArrowIcon from "../assets/arrow.svg";

type PostProps = {
  title: string;
  username: string;
  date: string;
  votes: number;
  totalComment: number;
};

function Post({ title, username, date, votes, totalComment }: PostProps) {
  return (
    <div className="post-item">
      <div className="post-item-votes">
        <div className="post-item-upvote">
          <img src={ArrowIcon} />
        </div>
        <div>{votes}</div>
        <div className="post-item-downvote">
          <img src={ArrowIcon} />
        </div>
      </div>
      <div className="post-item-content">
        <div className="post-item-title">{title}</div>
        <div className="post-item-details">
          <div>{date}</div>
          <a href={`/member/${username}`}> by {username} </a>
          <div>{totalComment} comments</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
