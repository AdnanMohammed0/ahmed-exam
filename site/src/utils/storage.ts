const STORAGE_KEY = "peds-uro-exam";

export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`${STORAGE_KEY}:${key}`, JSON.stringify(data));
  } catch {
    console.warn("Failed to save to localStorage");
  }
}

export function loadFromStorage<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}:${key}`);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function removeFromStorage(key: string): void {
  localStorage.removeItem(`${STORAGE_KEY}:${key}`);
}

export function clearAllStorage(): void {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(STORAGE_KEY))
    .forEach((k) => localStorage.removeItem(k));
}
