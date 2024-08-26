// components/SSRBasicPage.tsx
import React from 'react';

// Hàm lấy dữ liệu từ API
async function fetchPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

// Component trang SSR
export default async function SSRBasicPage() {
  const posts = await fetchPosts();

  return (
    <div className="max-w-2xl mx-auto p-4">
      Bài 1
      <h1 className="text-2xl font-bold mb-4">Danh sách Bài viết (SSR)</h1>
      <ul className="space-y-4">
        {posts.slice(0, 4).map((post: any) => (
          <li key={post.id} className="border-b pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
