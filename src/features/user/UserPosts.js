import React from "react";
import { NavLink } from "react-router-dom";
import { Grid } from "antd-mobile";

import { IMAGE_SRC } from "utils/constants";
import "./UserPosts.css";

function UserPosts(props) {
  const data1 = Array.from(props.posts).map((post) => ({
    icon: IMAGE_SRC + post.thumbnailSrc,
    text: post.postId,
    id: post.postId,
  }));

  return (
    <Grid
      data={data1}
      columnNum={props.columnNum}
      renderItem={(item) => (
        <NavLink
          key={item.id}
          className="userposts-item"
          to={"/posts/" + item.id}
        >
          <div>
            <img
              src={item.icon}
              style={{ width: "100%", height: "100%", padding: "0" }}
              alt=""
            />
          </div>
        </NavLink>
      )}
    />
  );
}

export default UserPosts;
