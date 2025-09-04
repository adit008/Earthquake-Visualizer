import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import L from "leaflet";
import MapFocus from "./MapFocus";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function EarthquakeData() {

  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedEarthquake, setSelectedEarthquake] = useState(null);
  const [sortOption, setSortOption] = useState("newest");
   const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const response = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch earthquake data");
        }

        const data = await response.json();
        setEarthquakes(data.features); // ✅ features array contains events
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
  }, []);

  if (loading) return <p>Loading earthquakes...</p>;
  if (error) return <p>Error: {error}</p>;

  const sortedEarthquakes = [...earthquakes].sort((a, b) => {
    if (sortOption === "newest") {
      return b.properties.time - a.properties.time;
    } else if (sortOption === "oldest") {
      return a.properties.time - b.properties.time;
    } else if (sortOption === "largest") {
      return b.properties.mag - a.properties.mag;
    } else if (sortOption === "smallest") {
      return a.properties.mag - b.properties.mag;
    }
    return 0;
  });

  const filteredEarthquakes = sortedEarthquakes.filter((quake) =>
    quake.properties.place.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-0.5/3 h-screen overflow-y-auto border p-3 rounded bg-zinc-800 flex flex-col items-center">
        <h3 className="font-bold text-3xl text-center mb-2 text-white">Recent Earthquakes</h3>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 shadow-md shadow-zinc-600 text-center w-48 bg-white border rounded mb-3 mt-2"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="largest">Largest Magnitude First</option>
          <option value="smallest">Smallest Magnitude First</option>
        </select>

        <input
          type="text"
          placeholder="Search by location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 mb-4 w-64 border bg-white rounded shadow-md shadow-zinc-600"
        />

         <ul className="p-4 shadow-md shadow-zinc-600 bg-white rounded-md">
          {filteredEarthquakes.length === 0 ? (
            <p className="text-gray-500">No earthquakes found.</p>
          ) : (
            filteredEarthquakes.map((quake, index) => (
              <li
                key={index}
                className={`mb-3 p-2 border-b cursor-pointer ${
                  selectedEarthquake?.id === quake.id
                    ? "bg-cyan-200 font-bold"
                    : "hover:bg-amber-200"
                }`}
                onClick={() => setSelectedEarthquake(quake)}
              >
                <strong>{quake.properties.place}</strong>
                <br />
                Mag: {quake.properties.mag} | Depth: {quake.geometry.coordinates[2]} km
                <br />
                <span className="text-gray-500 text-sm">
                  {new Date(quake.properties.time).toLocaleString()}
                </span>
              </li>
            ))
          )}
        </ul>

        {selectedEarthquake && (
          <div
            className="fixed bottom-0 left-0 
               w-64 h-36            /* default mobile */
               sm:w-72 sm:h-48      /* tablet (≥640px) */
               md:w-[24rem] md:h-54 /* desktop (≥768px) */
               bg-white shadow-lg border-l p-5 
               overflow-y-auto z-50"
          >
            <button
              className="text-red-500 font-bold mb-3"
              onClick={() => setSelectedEarthquake(null)}
            >
              ✕ Close
            </button>

            <h2 className="text-xs sm:text-base md:text-lg font-bold mb-2">
              M {selectedEarthquake.properties.mag} –{" "}
              {selectedEarthquake.properties.place}
            </h2>

            <p className="text-xs sm:text-sm md:text-base">
              <strong>Time:</strong>{" "}
              {new Date(selectedEarthquake.properties.time).toLocaleString()}
            </p>

            <p className="text-xs sm:text-sm md:text-base">
              <strong>Location:</strong>{" "}
              {selectedEarthquake.geometry.coordinates[1].toFixed(3)}°N,{" "}
              {selectedEarthquake.geometry.coordinates[0].toFixed(3)}°W
            </p>

            <p className="text-xs sm:text-sm md:text-base">
              <strong>Depth:</strong>{" "}
              {selectedEarthquake.geometry.coordinates[2]} km
            </p>

            <a
              href={selectedEarthquake.properties.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs sm:text-sm md:text-base text-blue-600 underline block mt-2"
            >
              More Info (USGS)
            </a>
          </div>
        )}




      </div>

      {/* Right Side */}
      <div className="w-full">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {earthquakes.map((quake, index) => {
            const [lon, lat] = quake.geometry.coordinates;
            const isSelected = selectedEarthquake && quake.id === selectedEarthquake.id;

            return (
              <CircleMarker
                key={index}
                center={[lat, lon]}
                radius={Math.max(quake.properties.mag * 2, 4)}
                pathOptions={{
                  color: isSelected ? "blue" : "red",
                  fillColor: isSelected ? "blue" : "orange",
                  fillOpacity: 0.6,
                }}
                eventHandlers={{
                  click: () => setSelectedEarthquake(quake),
                }}
              >
                <Popup>
                  <strong>{quake.properties.place}</strong>
                  <br />
                  Mag: {quake.properties.mag}
                  <br />
                  Depth: {quake.geometry.coordinates[2]} km
                </Popup>
              </CircleMarker>
            );
          })}

          {/* Auto-focus on selection */}
          <MapFocus selectedEarthquake={selectedEarthquake} />
        </MapContainer>
      </div>

    </div>

  );
}

export default EarthquakeData;
