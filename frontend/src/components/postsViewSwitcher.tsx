import React from "react";

type Props = {};

export const PostsViewSwitcher = (props: Props) => {
  return (
    <div className="flex switcher">
      <h3 className="active">Popular</h3>
      <div className="separator">|</div>
      <h3>New</h3>
    </div>
  );
};
