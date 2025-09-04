import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-x-hidden overflow-y-auto">
      {/* Fixed Navbar */}
      <nav className="sticky top-0 left-0 w-full bg-zinc-900 text-white shadow-md z-50 flex justify-between items-center px-8 py-4">
        <div className="text-xl font-bold text-center flex-1">
          🌍 Earthquake Visualizer
        </div>
        <div>
          <Link
            to="/"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
