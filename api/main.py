from flask import Flask, jsonify, request, current_app
import hdf5_read as reader

app = Flask(__name__)

@app.route("/")
def hello_world():
    read_result = reader.read_file("data.hdf5")
    json_result = reader.result_to_json(read_result)
    response = jsonify(json_result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response