import React from "react";
import { blog } from "../../dummydata";

const BlogCard = () => {
  return (
    <>
      {blog.map((val) => (
        <div className='items shadow' key={val.id}>
         
        </div>
      ))}
    </>
  );
};

export default BlogCard;
