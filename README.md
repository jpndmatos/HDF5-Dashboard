Visualizing HDF5 Data

This project visualizes HDF5 data using a Python Flask backend and a JavaScript frontend with Plotly for charting.

## Prerequisites

- Python 3.7+
- Node.js 14+

## Setup Instructions

1.  Run the setup script: start the `setup.bat` file or run it from the command prompt.

This script will:
- Create a Python virtual environment
- Activate the virtual environment
- Install Python dependencies
- Install Node.js dependencies
- Start the application

2. If you prefer to set up manually:
a. Set up Python virtual environmenton api folder: python -m venv env
b. Activate the virtual environment on api folder: env\Scripts\activate
c. Install Python dependencies on api folder: pip install -r requirements.txt
d. Install Node.js dependencies on root folder: npm install
e. Start the application on root folder: npm start
f. Open a web browser and navigate to `http://localhost:5173` to view the application.

## Usage

- The application displays two charts: a Temperature & Humidity chart and a Temperature Distribution heatmap.
- Use the "Reset Zoom" button to reset the zoom level on both charts.
- Toggle between light and dark modes using the switch in the top right corner.
