import React, { useState } from "react";
import { Button, SearchBar, Tabs } from "antd-mobile";

import UserPosts from "features/user/UserPosts";
import UserList from "components/Search/UserList";
import { queryPostContent, queryUserName } from "utils/APIUtils";
import "./Search.css";

function Search() {
  const [value, setValue] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [videoResults, setVideoResults] = useState([]);

  function onChange(v) {
    setValue(v);
  }

  function onClick() {
    queryPostContent(value).then((response) => {
      setVideoResults(response)
    });
    queryUserName(value).then((response) => {
      setUserResults(response);
    });
  };
  const tabs = [
    { title: "사용자", sub: "1" },
    { title: "동영상", sub: "2" },
    { title: "해시테그", sub: "3" },
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
          console.log("onChange", index, tab);
        }}
        onTabClick={(tab, index) => {
          console.log("onTabClick", index, tab);
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
