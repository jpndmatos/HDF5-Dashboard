# HDF5 Dashboard

Temperature and humidity charts with a full-length sensor heatmap. Flask, h5py, NumPy, Plotly and Vite.

![Sensor dashboard](docs/desktop.jpg)

## Run

Node.js 22.12+ and Python 3.13.

Windows:

```sh
npm ci
npm run setup:api
npm start
```

Open http://localhost:5173. Flask runs on port 5008.

On macOS/Linux, run `npm ci`, create and activate a Python virtual environment, then install `api/requirements.txt`. Start `python -m flask --app api.main run --port 5008` and `npm run start:frontend` in separate terminals.

## Check

```sh
npm test
npm run build
```

The bundled `api/data.hdf5` contains 11 time samples and 901 sensor positions. `VITE_API_URL` configures a separate API host.
