from flask import json
import h5py
import numpy as np

def read_file(filename):
    f = h5py.File(filename,'r')
    groupList = list(f.keys())
    # get datasets from each group
    result = {}
    # map with dataset name and data
    for group in groupList:
        datasetList = list(f[group].keys())
        for dataset in datasetList:
            data = f[group][dataset][:]
            result[dataset] = data.tolist()
            
    return result


def result_to_json(result):
    return json.dumps(result)