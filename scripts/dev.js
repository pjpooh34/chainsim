#!/usr/bin/env node
const { spawn } = require('node:child_process');

const HEALTH_URL = process.env.HEALTH_URL || 'http://localhost:5001/health';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

function run(cmd, args, options = {}) {
  const child = spawn(cmd, args, { stdio: 'inherit', ...options });
  return child;
}

async function waitForHealth(url, timeoutMs = 60_000, intervalMs = 1_000) {
  const start = Date.now();
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch (_) {}
    await sleep(intervalMs);
  }
  return false;
}

async function main() {
  console.log('Starting backend...');
  const backend = run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev'], { cwd: 'backend' });

  backend.on('exit', (code) => {
    console.log(`Backend exited with code ${code}`);
    process.exit(code || 1);
  });

  const healthy = await waitForHealth(HEALTH_URL, 60_000, 1_000);
  if (!healthy) {
    console.warn(`Backend health check did not pass within timeout at ${HEALTH_URL}. Continuing anyway...`);
  } else {
    console.log('Backend is healthy.');
  }

  console.log('Starting frontend...');
  const frontend = run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev'], { cwd: 'frontend' });

  const cleanup = () => {
    try { backend.kill(); } catch {}
    try { frontend.kill(); } catch {}
    process.exit(0);
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

