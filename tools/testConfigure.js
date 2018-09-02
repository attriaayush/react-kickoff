import {spawn} from 'child_process';

const requiresHarmonyFlag = parseInt(/^v(\d+)\./.exec(process.version)[1], 10) < 7;
const harmonyProxies = requiresHarmonyFlag ? ['--harmony_proxies'] : [];
const args = [
  ...harmonyProxies,
  'node_modules/jest/bin/jest',
  // First two args are always node and the script running, i.e. ['node', './tools/testConfigure.js', ...]
  ...process.argv.slice(2)
];

const testConfigure = spawn('node', args);
const consoleLogger = data => console.log(`${data}`); // eslint-disable-line no-console

testConfigure.stdout.on('data', consoleLogger);
testConfigure.stderr.on('data', consoleLogger);
