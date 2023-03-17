import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

export default function App() {
  return (
    <main>
      <h1>Re: Nightwood Forum</h1>
      <PostCreate />
      <hr />
      <PostList />
    </main>
  );
}
