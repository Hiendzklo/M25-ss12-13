"use client";

import React, { useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
};

// Hàm này chạy trên server để lấy dữ liệu bài viết
async function fetchPosts(): Promise<Post[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

// Đây là Client Component để quản lý CSR
function PostsList({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleRefresh = async () => {
    const freshPosts = await fetchPosts();
    setPosts(freshPosts);
  };

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={handleRefresh}
      >
        Refresh
      </button>
      <ul className="space-y-4">
        {posts.slice(0, 6).map((post) => (
          <li key={post.id} className="border-b pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Đây là Server Component
export default async function Page() {
  const initialPosts = await fetchPosts();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Bài viết với Refresh</h1>
      <PostsList initialPosts={initialPosts} />
    </div>
  );
}
