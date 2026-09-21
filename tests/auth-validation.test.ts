import assert from 'node:assert/strict';
import test from 'node:test';

import { getAuthErrorMessage } from '../features/auth/map-auth-error.ts';
import {
  forgotPasswordSchema,
  loginSchema,
  signupSchema,
} from '../features/auth/auth-schema.ts';

test('signup schema requires a valid email, 8-character password, and matching confirmation', () => {
  const parsed = signupSchema.safeParse({
    email: 'not-an-email',
    password: 'short',
    confirmPassword: 'other',
  });
  assert.equal(parsed.success, false);

  const valid = signupSchema.safeParse({
    email: 'user@example.com',
    password: 'password1',
    confirmPassword: 'password1',
  });
  assert.equal(valid.success, true);
});

test('login schema rejects empty credentials', () => {
  const parsed = loginSchema.safeParse({ email: '', password: '' });
  assert.equal(parsed.success, false);
});

test('forgot password schema requires a valid email', () => {
  assert.equal(forgotPasswordSchema.safeParse({ email: 'nope' }).success, false);
  assert.equal(
    forgotPasswordSchema.safeParse({ email: 'user@example.com' }).success,
    true,
  );
});

test('auth errors stay user-facing and never echo secrets', () => {
  assert.equal(
    getAuthErrorMessage({ code: 'invalid_credentials' }),
    'Email or password is incorrect.',
  );
  const leaked = getAuthErrorMessage({
    code: 'unknown_code',
    message: 'jwt eyJhbGciOi password=secret token=abc',
  });
  assert.equal(
    leaked,
    'We couldn’t complete that request. Check your connection and try again.',
  );
  assert.equal(leaked.includes('password='), false);
  assert.equal(leaked.includes('token='), false);
  assert.equal(leaked.includes('eyJ'), false);
});
