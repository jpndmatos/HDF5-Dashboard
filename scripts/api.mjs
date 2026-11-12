import { spawnSync, spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const windows = process.platform === 'win32';
const python = join(root, '.venv', windows ? 'Scripts/python.exe' : 'bin/python');
if (process.argv.includes('--setup')) {
  const command = process.env.PYTHON || (windows ? 'python' : 'python3');
  for (const [executable, args] of [
    [command, ['-m', 'venv', '.venv']],
    [python, ['-m', 'pip', 'install', '-r', 'api/requirements.txt']],
  ]) {
    const result = spawnSync(executable, args, { cwd: root, stdio: 'inherit' });
    if (result.error) console.error(result.error.message);
    if (result.error || result.status !== 0) process.exit(result.status || 1);
  }
} else {
  if (!existsSync(python)) {
    console.error('Run npm run setup:api first.');
    process.exit(1);
  }
  const child = spawn(python, ['-m', 'flask', '--app', 'api.main', 'run', '--port', '5008'], { cwd: root, stdio: 'inherit' });
  child.on('error', error => { console.error(error.message); process.exitCode = 1; });
  child.on('exit', code => { process.exitCode = code ?? 1; });
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => child.kill(signal));
}
