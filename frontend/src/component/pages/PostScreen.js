import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import BounceLoader from "react-spinners/BounceLoader";

const PostScreen = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      const response = await axios.get(`https://dev.to/api/articles?per_page=10&page=${page}`);
      console.log("response : ", response);
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
      setPage((prevPage) => prevPage + 10);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleScroll = async () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    fetchPosts();
  };
  

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  const Day = ({ date }) => {
    const day = new Date(date).toLocaleString('en-US', { weekday: 'short' });
    const month = new Date(date).toLocaleString('en-US', { month: 'short' });
    const dayNumber = new Date(date).toLocaleString('en-US', { day: 'numeric' });
    const year = new Date(date).getFullYear();
    return (
        <div>
            {`posted on ${day}, ${dayNumber} ${month}, ${year}`}
        </div>
    );
  }

  return (
    <div className='text-white relative min-h-max'>
  {posts.map((post, index) => (
    <div key={index} className=" bg-white w-full md:w-[80%] lg:w-[60%] mx-auto mt-5 text-black p-6 rounded-lg mb-4">
      <div className="flex items-center gap-1 mt-2">
        <img src={post.user.profile_image} alt={post.username} className="w-8 h-8 rounded-full" />
        <span>{post.user.username}</span>
        {post.user.github_username && (
          <a href={`https://github.com/${post.user.github_username}`} className='ml-6' target="_blank" rel="noopener noreferrer">
           <FaGithub size={30}/>
          </a>
        )}
        {post.user.twitter_username && (
          <a href={`https://twitter.com/${post.user.twitter_username}`} className="ml-6" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30}/>
          </a>
        )}
      </div>
      <h2 className='mt-3 text-xl font-bold'>{post.title}</h2>
      <span>{`${post.description}...`}</span>
      <a href={post.url} className="text-blue-500 hover:underline mr-4" target="_blank" rel="noopener noreferrer">Read more</a>
      <div className="flex items-center mt-4">
        <div className="flex items-center gap-2 mr-10">
          <FaThumbsUp />
          <div>{post.public_reactions_count}</div>
        </div>
        <div className="mr-4">
          <span>{post.comments_count} comments</span>
        </div>
        <div className='ml-4'><Day date={post.created_at}/></div>
      </div>
      <div className="flex items-center mt-2">
        {post.tag_list.map((tag, index) => (
          <span key={index} className=" bg-richblack-50 text-blue-300 text-sm px-2 py-1 rounded-full mr-2">{`#${tag}`}</span>
        ))}
      </div>
    </div>
  ))}
  {/* loading indicator while fetching data */}
  {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <BounceLoader
        color={"blue"}
        loading={isLoading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
  )}

  {/* showing error message if any */}
  {error && <p className="text-red-500">{error}</p>}
</div>

  );
};

export default PostScreen;
