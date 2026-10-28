from flask import json
import h5py

def read_file(filename):
    result = {}
    with h5py.File(filename, 'r') as file:
        for group in file.values():
            for name, dataset in group.items():
                result[name] = dataset[:].tolist()
    return result

def result_to_json(result):
    return json.dumps(result)
