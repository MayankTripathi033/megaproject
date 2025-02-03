import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/Config.js";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const status = useSelector((state) => state.auth.status);
  console.log(status);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // console.log(posts[0].status);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  if (status === true) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }
  return (
    <>
      <h1>Please Login To see Post</h1>
    </>
  );
}

export default Home;
