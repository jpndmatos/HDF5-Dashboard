import Plotly from 'plotly.js-dist';
const config = {responsive:true,displaylogo:false,displayModeBar:false,scrollZoom:false};
function token(name) { return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
function layout() {
 const axis={gridcolor:token('--rule'),zeroline:false,tickfont:{size:11,color:token('--muted')},automargin:true};
 return {font:{family:token('--font-body'),size:12,color:token('--ink')},paper_bgcolor:token('--surface'),plot_bgcolor:token('--surface'),margin:{l:60,r:32,t:40,b:56},autosize:true,xaxis:{...axis,title:{text:'Elapsed time (s)',font:{size:11}}},yaxis:{...axis},dragmode:'zoom',hoverlabel:{bgcolor:token('--surface'),font:{color:token('--ink'),family:token('--font-body')}}};
}
export function createTempHumidityChart(element,data) {
 const mobile=matchMedia('(max-width:700px)').matches;
 const base=layout();
 const trace1={x:data.timestamps,y:data.temperature,type:'scatter',mode:'lines',name:'Temperature',line:{color:token('--temperature'),width:2},hovertemplate:'%{y:.2f} °C<br>%{x:.1f} s<extra>Temperature</extra>'};
 const trace2={x:data.timestamps,y:data.humidity,type:'scatter',mode:'lines',name:'Humidity',xaxis:'x2',yaxis:'y2',line:{color:token('--humidity'),width:2},hovertemplate:'%{y:.2f}%<br>%{x:.1f} s<extra>Humidity</extra>'};
 return Plotly.react(element,[trace1,trace2],{...base,showlegend:false,xaxis:{...base.xaxis,domain:mobile?[0,1]:[0,.42],anchor:'y'},xaxis2:{...base.xaxis,domain:mobile?[0,1]:[.58,1],anchor:'y2'},yaxis:{...base.yaxis,title:{text:'Temperature (°C)',font:{size:11}},domain:mobile?[.61,1]:[0,1]},yaxis2:{...base.yaxis,title:{text:'Humidity (%)',font:{size:11}},domain:mobile?[0,.39]:[0,1],anchor:'x2'},uirevision:'sensor-recording'},config);
}
export function createHeatmap(element,data) {
 const base=layout();
 return Plotly.react(element,[{z:data.values,x:data.timestamps,y:data.distancePoints,type:'heatmap',colorscale:[[0,token('--heat-low')],[.5,token('--heat-mid')],[1,token('--heat-high')]],zsmooth:false,colorbar:{title:{text:'°C',side:'top'},thickness:12,len:.9,tickfont:{size:10},outlinewidth:0},hovertemplate:'Position %{y}<br>%{x:.1f} s<br>%{z:.2f} °C<extra></extra>'}],{...base,margin:{l:60,r:44,t:16,b:56},yaxis:{...base.yaxis,title:{text:'Sensor position',font:{size:11}},autorange:'reversed'},uirevision:'sensor-recording'},config);
}
