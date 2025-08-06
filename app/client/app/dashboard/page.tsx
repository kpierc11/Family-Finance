export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-30 bg-gray-800 text-white p-4">
        <ul className="space-y-4">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <li key={item}>
              <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">
                {item}
              </a>
            </li>
          ))}
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
