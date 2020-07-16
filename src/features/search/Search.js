import React, { useState } from "react";
import { Button, SearchBar, Tabs } from "antd-mobile";

import UserPosts from "features/user/UserPosts";
import UserList from "components/Search/UserList";
import { queryPostContent, queryUserName } from "utils/APIUtils";
import "./Search.css";

const CATEGORY = {
  USER: "user",
  CONTENT: "content",
  HASHTAG: "hashtag"
}

function Search() {
  const [value, setValue] = useState("");
  const [category, setCategory] = useState(CATEGORY.USER);
  const [userResults, setUserResults] = useState([]);
  const [videoResults, setVideoResults] = useState([]);

  function onChange(v) {
    setValue(v);
  }

  function onClick() {
    console.log(category)
    if(category === CATEGORY.USER) {
      queryUserName(value).then((response) => {
        setUserResults(response);
      });
    } else if(category === CATEGORY.CONTENT) {
      queryPostContent(value).then((response) => {
        setVideoResults(response)
      });
    }
  };
  const tabs = [
    { title: "사용자", sub: CATEGORY.USER },
    { title: "동영상", sub: CATEGORY.CONTENT },
    { title: "해시테그", sub: CATEGORY.HASHTAG },
  ];

  return (
    <div className="main-tab" id="search">
      <div id="search-top">
        <SearchBar
          className="search-bar"
          onChange={onChange}
          cancelText="x"
        />
        <Button id="search-submit" onClick={onClick}>
          검색
        </Button>
      </div>
      <Tabs
        tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => {
          setCategory(tab.sub);
          console.log("onChange", index, tab);
        }}
        tabBarBackgroundColor="transparent"
        tabBarActiveTextColor="white"
        tabBarInactiveTextColor="gray"
      >
        <div>
          <UserList users={userResults} />
        </div>
        <div>
          <UserPosts columnNum={2} posts={videoResults} />
        </div>
        <div>해시테그 검색</div>
      </Tabs>
    </div>
  );
}

export default Search;
