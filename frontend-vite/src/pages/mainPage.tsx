import React, { useEffect, useState } from "react";
import { Layout } from "../components/layout";
import { PostsList } from "../components/postsList";
import { PostsViewSwitcher } from "../components/postsViewSwitcher";
import { api } from "../api";

type Props = {};

export const MainPage = (props: Props) => {
  const posts = [
    {
      title: "First Post",
      dateCreated: "2024-01-01T12:00:00Z",
      memberPostedBy: { user: { username: "Alice" } },
      comments: [
        {
          id: 1,
          content: "Great post!",
          dateCreated: "2024-01-01T13:00:00Z",
          memberPostedBy: { user: { username: "Bob" } },
        },
        {
          id: 2,
          content: "Thanks for sharing!",
          dateCreated: "2024-01-01T14:00:00Z",
          memberPostedBy: { user: { username: "Charlie" } },
        },
      ],
      votes: [
        {
          memberVotedBy: { user: { username: "Bob" } },
          voteType: "upvote",
          dateCreated: "2024-01-01T15:00:00Z",
        },
        {
          memberVotedBy: { user: { username: "Charlie" } },
          voteType: "upvote",
          dateCreated: "2024-01-01T16:00:00Z",
        },
      ],
    },
    {
      title: "Second Post",
      dateCreated: "2024-02-01T12:00:00Z",
      memberPostedBy: { user: { username: "Bob" } },
      comments: [
        {
          id: 3,
          content: "Very informative.",
          dateCreated: "2024-02-01T13:00:00Z",
          memberPostedBy: { user: { username: "Alice" } },
        },
      ],
      votes: [
        {
          memberVotedBy: { user: { username: "Alice" } },
          voteType: "upvote",
          dateCreated: "2024-02-01T14:00:00Z",
        },
        {
          memberVotedBy: { user: { username: "Charlie" } },
          voteType: "downvote",
          dateCreated: "2024-02-01T15:00:00Z",
        },
      ],
    },
    {
      title: "Third Post",
      dateCreated: "2024-03-01T12:00:00Z",
      memberPostedBy: { user: { username: "Charlie" } },
      comments: [],
      votes: [],
    },
  ];
  return (
    <Layout>
      <PostsViewSwitcher />
      <PostsList posts={posts} />
    </Layout>
  );
};
