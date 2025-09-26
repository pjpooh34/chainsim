#!/usr/bin/env node
// Cross-platform: open a URL in the default browser
const { spawn } = require('node:child_process');

const url = process.argv[2] || 'http://localhost:5173';
const platform = process.platform;

function run(cmd, args) {
  const child = spawn(cmd, args, { stdio: 'ignore', detached: true });
  child.unref();
}

try {
  if (platform === 'darwin') {
    run('open', [url]);
  } else if (platform === 'win32') {
    run('cmd', ['/c', 'start', '""', url]);
  } else {
    // Assume Linux or BSD with xdg-open available
    run('xdg-open', [url]);
  }
  console.log(`Opening ${url} in your default browser...`);
} catch (e) {
  console.error(`Please open ${url} manually.`, e);
  process.exit(1);
}

