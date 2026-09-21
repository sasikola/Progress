import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

function loadLocalEnv() {
  const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '.env');
  if (!existsSync(envPath)) {
    return;
  }

  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const separator = trimmed.indexOf('=');
    if (separator === -1) {
      continue;
    }
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadLocalEnv();

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const canRunLive = Boolean(url && anonKey && !anonKey.includes('service_role'));

test(
  'invalid credentials are rejected by Supabase Auth',
  { skip: !canRunLive },
  async () => {
    const supabase = createClient(url ?? '', anonKey ?? '');
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'missing-user@example.com',
      password: 'not-the-real-password',
    });
    assert.equal(data.session, null);
    assert.ok(error);
    assert.equal(error.code, 'invalid_credentials');
  },
);

test(
  'password reset does not reveal whether an account exists',
  { skip: !canRunLive },
  async () => {
    const supabase = createClient(url ?? '', anonKey ?? '');
    const { error } = await supabase.auth.resetPasswordForEmail(
      'missing-user@example.com',
    );
    assert.equal(error, null);
  },
);
