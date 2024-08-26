// app/ssr-error/page.tsx
import React from 'react';

// Định nghĩa kiểu dữ liệu cho bài viết
type Post = {
  id: number;
  title: string;
  body: string;
};

// Hàm fetch dữ liệu từ một URL không tồn tại
async function fetchPosts(): Promise<Post[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/nonexistent-url');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return await res.json();
  } catch (error) {
    throw new Error('Failed to fetch data from API');
  }
}

// Component trang xử lý lỗi
export default async function Page() {
  let posts: Post[];

  try {
    posts = await fetchPosts();
  } catch (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Xử lý Lỗi với SSR</h1>
        <p className="text-red-500">Xảy ra lỗi khi lấy dữ liệu</p>
        <p className="text-gray-700">{(error as Error).message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Bài viết</h1>
      <ul className="space-y-4">
        {posts.map((post: Post) => (
          <li key={post.id} className="border-b pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
