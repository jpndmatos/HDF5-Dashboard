import Plotly from 'plotly.js-dist';
import {createTempHumidityChart,createHeatmap} from './chart.js';
import {prepareData} from './data.js';
let current;
const status=document.getElementById('status');
const summary=document.getElementById('dataset-summary');
const reset=document.getElementById('zoomReset');
const theme=document.getElementById('checkbox');
theme.checked=document.documentElement.dataset.mode==='dark';
async function render() {
 if(!current) return;
 await Promise.all([createTempHumidityChart('temp-humidity-chart',current),createHeatmap('heatmap-chart',current)]);
}
theme.addEventListener('change',()=>{
 const mode=theme.checked?'dark':'light';document.documentElement.dataset.mode=mode;
 try {localStorage.setItem('hdf5-theme',mode);}catch{}
 render();
});
reset.addEventListener('click',()=>{
 if(!current)return;
 Plotly.relayout('temp-humidity-chart',{'xaxis.autorange':true,'yaxis.autorange':true,'xaxis2.autorange':true,'yaxis2.autorange':true});
 Plotly.relayout('heatmap-chart',{'xaxis.autorange':true,'yaxis.autorange':true});
});
let resizeTimer;window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(render,150)});
async function main(){
 try {
  const response=await fetch(import.meta.env.VITE_API_URL || '/api/');
  if(!response.ok)throw new Error('Sensor data is unavailable.');
  let data=await response.json();if(typeof data==='string')data=JSON.parse(data);
  current=prepareData(data);await render();reset.disabled=false;
  summary.textContent=`${current.timestamps.length} time samples / ${current.distancePoints.length} sensor positions`;
  status.textContent=`Recording: ${new Date(current.recorded[0]*1000).toLocaleDateString('en-GB',{timeZone:'UTC'})}`;
 }catch(error){status.textContent='Unable to load data';summary.textContent='Start the Flask API, then reload this page.';console.error(error);}
}
main();
