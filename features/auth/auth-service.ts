import * as Linking from 'expo-linking';
import type { Session } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';

import { getAuthErrorMessage } from './map-auth-error';

export type SignUpResult =
  | { status: 'authenticated' }
  | { status: 'confirm_email' };

function asAuthError(error: unknown): Error {
  return new Error(getAuthErrorMessage(error));
}

export async function signUpWithEmail(
  email: string,
  password: string,
): Promise<SignUpResult> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: Linking.createURL('/login'),
    },
  });

  if (error) {
    throw asAuthError(error);
  }

  if (data.session) {
    return { status: 'authenticated' };
  }

  return { status: 'confirm_email' };
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw asAuthError(error);
  }
}

export async function sendPasswordResetEmail(email: string): Promise<void> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: Linking.createURL('/login'),
  });

  if (error) {
    throw asAuthError(error);
  }
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw asAuthError(error);
  }
}

export async function getCurrentSession(): Promise<Session | null> {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw asAuthError(error);
  }
  return data.session;
}

export function subscribeToAuthChanges(
  onSession: (session: Session | null) => void,
): () => void {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    onSession(session);
  });

  return () => {
    data.subscription.unsubscribe();
  };
}
