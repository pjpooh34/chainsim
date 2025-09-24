import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../src/server';

async function run() {
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret';
  process.env.REFRESH_TOKEN_SECRET = 'test-refresh';

  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri('chainsim');
  await mongoose.connect(uri);

  try {
    const email = 'user@example.com';
    const password = 'password123';

    // Register
    const reg = await request(app)
      .post('/api/auth/register')
      .send({ name: 'User', email, password });
    if (reg.status !== 201 || !reg.body.token || !reg.body.refreshToken) throw new Error('register failed');

    // Login
    const login = await request(app).post('/api/auth/login').send({ email, password });
    if (login.status !== 200 || !login.body.token || !login.body.refreshToken) throw new Error('login failed');
    const token = login.body.token as string;
    const refreshToken = login.body.refreshToken as string;

    // Me
    const me = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
    if (me.status !== 200 || me.body.user.email !== email) throw new Error('me failed');

    // Refresh
    const refresh = await request(app).post('/api/auth/refresh').send({ refreshToken });
    if (refresh.status !== 200 || !refresh.body.token) throw new Error('refresh failed');

    // Forgot password
    const forgot = await request(app).post('/api/auth/forgot-password').send({ email });
    if (forgot.status !== 200 || !forgot.body.token) throw new Error('forgot failed');
    const resetToken = forgot.body.token as string;

    // Reset password
    const newPassword = 'newPassword123';
    const reset = await request(app).post('/api/auth/reset-password').send({ token: resetToken, password: newPassword });
    if (reset.status !== 200) throw new Error('reset failed');

    // Old token should now be invalid
    const meInvalid = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
    if (meInvalid.status === 200) throw new Error('old token should be invalid');

    // Login with new password
    const login2 = await request(app).post('/api/auth/login').send({ email, password: newPassword });
    if (login2.status !== 200 || !login2.body.token) throw new Error('relogin failed');

    console.log('Auth smoke tests passed ✅');
  } finally {
    await mongoose.disconnect();
    await mongo.stop();
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

