# HDF5 Dashboard

Temperature and humidity charts with a full-length sensor heatmap. Flask, h5py, NumPy, Plotly and Vite.

## Run

Node.js 22.12+ and Python 3.13.

Run `npm ci`, `npm run setup:api`, then `npm start` on Windows, macOS, or Linux. Set `PYTHON` to select a custom Python executable during setup.

Open http://localhost:5173. Flask runs on port 5008.

## Check

```sh
npm test
npm run build
```

The bundled `api/data.hdf5` contains 11 time samples and 901 sensor positions. `VITE_API_URL` configures a separate API host.
