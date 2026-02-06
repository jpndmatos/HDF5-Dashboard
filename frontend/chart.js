import Plotly from 'plotly.js-dist';

const config = {
    responsive: true,
    useResizeHandler: true,
    autosize: true
};

function getLayoutColors(isDarkMode) {
    return {
        bgcolor: isDarkMode ? 'rgba(40, 46, 53, 0.95)' : 'rgba(255, 255, 255, 0.8)',
        gridcolor: '#e6e6e6',
        linecolor: isDarkMode ? '#fff' : '#000',
        zerolinecolor: isDarkMode ? '#fff' : '#000',
    };
}

function createLayout(title, isDarkMode) {
    const colors = getLayoutColors(isDarkMode);
    return {
        font: {
            family: 'Poppins, sans-serif',
            color: isDarkMode ? '#ecf0f1' : '#333'
        },
        autosize: true,
        margin: { l: 60, r: 60, b: 80, t: 60, pad: 4 },
        paper_bgcolor: colors.bgcolor,
        plot_bgcolor: colors.bgcolor,
        title: {
            text: title,
            y: 0.94,
            yanchor: 'top'
        },
        xaxis: {
            gridcolor: colors.gridcolor,
            linecolor: colors.linecolor,
            zerolinecolor: colors.zerolinecolor,
        },
        yaxis: {
            gridcolor: colors.gridcolor,
            linecolor: colors.linecolor,
            zerolinecolor: colors.zerolinecolor,
        }
    };
}

export function createTempHumidityChart(element, data, title, isDarkMode) {
    // create temperature and humidity line chart
    const trace1 = {
        x: data.timestamps,
        y: data.temperature,
        type: 'scatter',
        mode: 'lines',
        name: 'Temperature',
        line: { color: isDarkMode ? '#ff6b6b' : '#d63031' }
    };
    const trace2 = {
        x: data.timestamps,
        y: data.humidity,
        type: 'scatter',
        mode: 'lines',
        name: 'Humidity',
        yaxis: 'y2',
        line: { color: isDarkMode ? '#74b9ff' : '#0984e3' }
    };
    const layout = {
        ...createLayout(title, isDarkMode),
        xaxis: { title: 'Time (seconds)', automargin: true },
        yaxis: { title: 'Temperature (°C)', automargin: true },
        yaxis2: {
            title: 'Humidity (%)',
            overlaying: 'y',
            side: 'right',
            automargin: true
        },
        showlegend: true,
        legend: { orientation: 'h', y: -0.2, yanchor: 'top' }
    };

    Plotly.newPlot(element, [trace1, trace2], layout, config);
}

export function createHeatmap(element, data, title, isDarkMode) {
    // create temperature distribution heatmap
    const layout = {
        ...createLayout(title, isDarkMode),
        xaxis: { title: 'Time (seconds)', automargin: true },
        yaxis: { title: 'Sensor Position', autorange: 'reversed', automargin: true },
    };
    const heatmapData = [{
        z: data.values,
        x: data.timestamps,
        y: data.distancePoints,
        type: 'heatmap',
        colorscale: 'Viridis',
        colorbar: {
            title: 'Temperature (°C)',
            titleside: 'right',
            thickness: 20,
            len: 0.9,
            y: 0.5,
            yanchor: 'middle'
        },
        zsmooth: 'best'
    }];

    Plotly.newPlot(element, heatmapData, layout, config);
}