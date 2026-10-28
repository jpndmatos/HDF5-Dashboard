export function prepareData(data) {
    const temperature = data?.electrical_sensors?.[0]?.map(pair => pair[0]);
    const humidity = data?.electrical_sensors?.[1]?.map(pair => pair[0]);
    const rows = data?.results?.[0];
    const recorded = data?.timestamps?.[0];
    if (!temperature?.length || humidity?.length !== temperature.length || !rows?.length || rows.length !== temperature.length || !recorded?.length || recorded.length !== rows.length) throw new Error('The file does not contain matching sensor and timestamp datasets.');
    const positions = rows[0].length;
    if (!positions || rows.some(row => row.length !== positions)) throw new Error('The temperature dataset has inconsistent sensor positions.');
    const timestamps = recorded.map(value => value - recorded[0]);
    // HDF5 rows are time samples; Plotly needs a row per position.
    const values = Array.from({length:positions}, (_, position) => rows.map(row => row[position]));
    return {timestamps,temperature,humidity,values,distancePoints:Array.from({length:positions},(_,i)=>i),recorded};
}
