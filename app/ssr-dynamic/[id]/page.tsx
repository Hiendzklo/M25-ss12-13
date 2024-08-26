import React from 'react';

// Hàm lấy chi tiết bài viết từ API
async function fetchPost(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

// Component trang động
export default async function PostDetailPage({ params }: { params: { id: string } }) {
  const post = await fetchPost(params.id);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Chi tiết Bài viết</h1>
      <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}
