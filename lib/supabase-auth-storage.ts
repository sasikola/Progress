import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const CHUNK_SIZE = 1800;

function webStorage() {
  return {
    getItem: (key: string) => {
      if (typeof localStorage === 'undefined') {
        return null;
      }
      return localStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
      localStorage.setItem(key, value);
    },
    removeItem: (key: string) => {
      localStorage.removeItem(key);
    },
  };
}

async function deleteSecureChunks(key: string): Promise<void> {
  const countRaw = await SecureStore.getItemAsync(`${key}_chunks`);
  const count = countRaw ? Number.parseInt(countRaw, 10) : 0;

  await SecureStore.deleteItemAsync(key);
  await SecureStore.deleteItemAsync(`${key}_chunks`);

  if (Number.isFinite(count) && count > 0) {
    await Promise.all(
      Array.from({ length: count }, (_, index) =>
        SecureStore.deleteItemAsync(`${key}_${index}`),
      ),
    );
  }
}

function nativeStorage() {
  return {
    getItem: async (key: string) => {
      const countRaw = await SecureStore.getItemAsync(`${key}_chunks`);
      if (!countRaw) {
        return SecureStore.getItemAsync(key);
      }

      const count = Number.parseInt(countRaw, 10);
      const parts: string[] = [];

      for (let index = 0; index < count; index += 1) {
        const part = await SecureStore.getItemAsync(`${key}_${index}`);
        if (part === null) {
          return null;
        }
        parts.push(part);
      }

      return parts.join('');
    },
    setItem: async (key: string, value: string) => {
      await deleteSecureChunks(key);

      if (value.length <= CHUNK_SIZE) {
        await SecureStore.setItemAsync(key, value);
        return;
      }

      const count = Math.ceil(value.length / CHUNK_SIZE);
      await SecureStore.setItemAsync(`${key}_chunks`, String(count));

      for (let index = 0; index < count; index += 1) {
        const slice = value.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE);
        await SecureStore.setItemAsync(`${key}_${index}`, slice);
      }
    },
    removeItem: async (key: string) => {
      await deleteSecureChunks(key);
    },
  };
}

export function createAuthStorage() {
  return Platform.OS === 'web' ? webStorage() : nativeStorage();
}
