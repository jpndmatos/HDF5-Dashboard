import test from 'node:test';
import assert from 'node:assert/strict';
import {prepareData,sensorCsv} from '../frontend/data.js';
test('preserves every position and uses recorded elapsed seconds',()=>{
 const data=prepareData({electrical_sensors:[[[24,0],[25,0]],[[40,0],[42,0]]],results:[[[1,2,3],[4,5,6]]],timestamps:[[100,112]]});
 assert.deepEqual(data.values,[[1,4],[2,5],[3,6]]);assert.deepEqual(data.timestamps,[0,12]);assert.deepEqual(data.temperature,[24,25]);assert.deepEqual(data.humidity,[40,42]);
});
test('rejects misaligned recordings and incomplete grids',()=>{
 assert.throws(()=>prepareData({}),/matching/);
 assert.throws(()=>prepareData({electrical_sensors:[[[24],[25]],[[40],[42]]],results:[[[1,2],[3]]],timestamps:[[100,112]]}),/inconsistent/);
});

test('CSV preserves all sensor positions and recorded timestamps',()=>{
 const data=prepareData({electrical_sensors:[[[24],[25]],[[40],[42]]],results:[[[1,2,3],[4,5,6]]],timestamps:[[100,112]]});
 const lines=sensorCsv(data).split('\r\n');
 assert.equal(lines.length,3);
 assert.equal(lines[0], '"Recorded (UTC)","Elapsed (s)","Temperature","Humidity","Position 0","Position 1","Position 2"');
 assert.equal(lines[2], '"1970-01-01T00:01:52.000Z","12","25","42","4","5","6"');
});
