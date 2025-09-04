import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="h-screen w-screen overflow-x flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-6 text-center drop-shadow-lg">
        🌍 Earthquake Visualizer
      </h1>
      <p className="text-lg mb-10 max-w-xl text-center opacity-90">
        Stay informed about recent seismic activity worldwide.  
        Visualize earthquakes in real-time with an interactive map and details.
      </p>

      {/* Button */}
      <Link to="/earthquakes">
        <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:bg-blue-100 transition">
          Check Recent Earthquake Activity
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
