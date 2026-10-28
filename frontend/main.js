import Plotly from 'plotly.js-dist';
import {createTempHumidityChart,createHeatmap} from './chart.js';
import {prepareData} from './data.js';
let current;
const status=document.getElementById('status');
const summary=document.getElementById('dataset-summary');
const reset=document.getElementById('zoomReset');
const theme=document.getElementById('checkbox');
theme.checked=document.documentElement.dataset.mode==='dark';
const themeIcon=document.querySelector('.theme-icon');
function syncThemeIcon() {
 themeIcon.innerHTML=theme.checked ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42m0-14.14-1.42 1.42M6.35 17.65l-1.42 1.42"/></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/></svg>';
 theme.setAttribute('aria-label',theme.checked?'Switch to light mode':'Switch to dark mode');
}
syncThemeIcon();
async function render() {
 if(!current) return;
 await Promise.all([createTempHumidityChart('temp-humidity-chart',current),createHeatmap('heatmap-chart',current)]);
}
theme.addEventListener('change',()=>{
 const mode=theme.checked?'dark':'light';document.documentElement.dataset.mode=mode;
 syncThemeIcon();
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
