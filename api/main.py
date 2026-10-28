from pathlib import Path
from flask import Flask, jsonify
from . import hdf5_read as reader

app = Flask(__name__)

@app.get('/')
def sensor_data():
    response = jsonify(reader.read_file(Path(__file__).with_name('data.hdf5')))
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
