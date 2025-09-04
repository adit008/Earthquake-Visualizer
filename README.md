🌍 Earthquake Visualizer

An interactive web application to visualize recent earthquake activity around the world, built with React, Tailwind CSS, and Leaflet.js.

This project uses the USGS Earthquake API to fetch live earthquake data and displays it in a clean, user-friendly interface with sorting, filtering, and map-based visualization.

📌 Features

✅ Home Page – Simple landing page with a button to view recent earthquake activity.
✅ Earthquake List – Shows recent earthquake events with details such as location, magnitude, depth, and time.
✅ Sorting & Filtering

Sort by newest, oldest, largest magnitude, smallest magnitude

Search earthquakes by location name
✅ Interactive Map (Leaflet.js)

Earthquakes displayed as circle markers

Marker size corresponds to magnitude

On selecting an earthquake from the list, the map auto-zooms and highlights the circle
✅ Detailed Popup Window – Clicking an earthquake shows details (time, magnitude, coordinates, depth, link to USGS).
✅ Responsive UI – Works on desktop and mobile screens.


🛠️ Tech Stack

Frontend Framework: React

Styling: Tailwind CSS

Maps: Leaflet.js with react-leaflet

Routing: React Router

Data Source: USGS Earthquake API