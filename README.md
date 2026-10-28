# HDF5 Dashboard

View temperature and humidity readings from an HDF5 recording. The dashboard has time-series charts and a heatmap showing how temperature changes along the sensor.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/dark.jpg">
  <img src="docs/desktop.jpg" alt="HDF5 Dashboard displaying the bundled sensor recording" width="1200">
</picture>

<details>
<summary>Mobile view</summary>
<br>
<img src="docs/mobile.jpg" alt="Stacked sensor charts on mobile" width="320">
</details>

## Features

- Separate temperature and humidity plots with recorded elapsed time.
- Temperature heatmap across every position in the dataset.
- Chart zoom, hover values, and reset controls.
- Mobile layout and saved light or dark mode.

The included `api/data.hdf5` recording has 11 time samples and 901 sensor positions. Screenshots show this file.

## Run locally

Node.js 22.12+ and Python 3.13.

On Windows:

```sh
npm ci
npm run setup:api
npm start
```

Open `http://localhost:5173`. The frontend proxies `/api/` to Flask on port 5008.

On macOS or Linux, create a virtual environment, install `api/requirements.txt`, and run these in separate terminals:

```sh
python -m flask --app api.main run --port 5008
npm run start:frontend
```

Activate the Python environment before starting Flask. `VITE_API_URL` can point the frontend at a separately hosted API.

```sh
npm test
npm run build
```

Built with Flask, h5py, NumPy, JavaScript, Plotly and Vite.
