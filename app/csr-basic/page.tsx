"use client";
import React, { useEffect, useState } from 'react';

type User = {
  id: number;
  username: string;
};

export default function CSRBasicPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data: User[] = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Người dùng (CSR)</h1>
      <ul className="list-disc pl-5 space-y-2">
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
