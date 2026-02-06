import Plotly from 'plotly.js-dist';
import { createTempHumidityChart, createHeatmap } from './chart.js';

const apiEndpoint = 'http://127.0.0.1:5000';

async function fetchData() {
    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
        const text = await response.text();
        return JSON.parse(JSON.parse(text));
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; 
    }
}

function updateCharts(data, isDarkMode) {
    // prepare data for temperature and humidity chart
    const electricalSensorsData = {
        timestamps: data.electrical_sensors[0].map((_, i) => i),
        temperature: data.electrical_sensors[0].map(pair => pair[0]),
        humidity: data.electrical_sensors[1].map(pair => pair[0])
    };

    // prepare data for heatmap chart
    const heatmapData = {
        timestamps: electricalSensorsData.timestamps,
        distancePoints: Array.from({ length: data.results[0][0].length }, (_, i) => i),
        values: data.results[0].map((_, colIndex) => data.results[0].map(row => row[colIndex]))
    };

    createTempHumidityChart('temp-humidity-chart', electricalSensorsData, 'Temperature & Humidity', isDarkMode);
    createHeatmap('heatmap-chart', heatmapData, 'Temperature Distribution', isDarkMode);
}

function toggleDarkMode() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    document.getElementById('checkbox').checked = isDarkMode;
    updateCharts(window.currentData, isDarkMode);
}

function resetZoom() {
    Plotly.relayout('temp-humidity-chart', {'xaxis.autorange': true, 'yaxis.autorange': true, 'yaxis2.autorange': true});
    Plotly.relayout('heatmap-chart', {'xaxis.autorange': true, 'yaxis.autorange': true});
}

async function main() {
    const data = await fetchData();
    if (data && data.electrical_sensors && data.results) {
        window.currentData = data;
        updateCharts(data, false);
    } else {
        console.error('Data structure is not as expected. Received:', data);
    }
}

// initialize application and set up event listeners
document.addEventListener('DOMContentLoaded', () => {
    main();
    document.getElementById('checkbox').addEventListener('change', toggleDarkMode);
    document.getElementById('zoomReset').addEventListener('click', resetZoom);
    window.addEventListener('resize', () => window.currentData && updateCharts(window.currentData, document.body.classList.contains('dark-mode')));
});