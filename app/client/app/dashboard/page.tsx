import { useEffect } from "react";

export default function Dashboard({ onLogin }: any) {
  useEffect(() => {
    fetch("http://localhost:8000/hi", {
      method: "GET",
      headers: { "Content-Type": "application/json",},
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
      });
  });

  function handleLogout() {
    onLogin();
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-30 bg-gray-800 text-white p-4">
        <ul className="space-y-4">
          <li>
            <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
              Home
            </a>
            <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
              About
            </a>
            <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
              Stats
            </a>
            <a
              onClick={handleLogout}
              href="#"
              className="block px-3 py-2 rounded hover:bg-gray-700"
            >
              Logout
            </a>
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Main Content</h1>
        <p>Put your page content here.</p>
      </main>
    </div>
  );
}
