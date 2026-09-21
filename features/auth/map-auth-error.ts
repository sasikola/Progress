const GENERIC_AUTH_ERROR =
  'We couldn’t complete that request. Check your connection and try again.';

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: 'Email or password is incorrect.',
  email_not_confirmed: 'Confirm your email before logging in.',
  user_already_exists: 'An account with this email already exists. Try logging in.',
  email_exists: 'An account with this email already exists. Try logging in.',
  over_email_send_rate_limit: 'Please wait a moment before requesting another email.',
  over_request_rate_limit: 'Please wait a moment and try again.',
  weak_password: 'Choose a stronger password with at least 8 characters.',
  same_password: 'Choose a password you haven’t used before.',
  signup_disabled: 'New accounts cannot be created right now.',
  user_banned: 'This account cannot sign in.',
  session_not_found: 'Your session expired. Please log in again.',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof TypeError) {
    return 'We couldn’t reach the server. Check your connection and try again.';
  }

  if (!isRecord(error)) {
    return GENERIC_AUTH_ERROR;
  }

  const code = typeof error.code === 'string' ? error.code : '';
  if (code && AUTH_ERROR_MESSAGES[code]) {
    return AUTH_ERROR_MESSAGES[code];
  }

  return GENERIC_AUTH_ERROR;
}
