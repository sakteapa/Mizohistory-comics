import type { ComicStorybook } from "../types/folklore";

const DB_NAME = "thawnthu_comics_db";
const DB_VERSION = 1;
const STORE_NAME = "comics";

function openComicDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new Error("IndexedDB is unavailable"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "taleId" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Failed to open comic cache DB"));
  });
}

export async function getCachedComic(
  taleId: string
): Promise<ComicStorybook | null> {
  try {
    const db = await openComicDb();
    return await new Promise<ComicStorybook | null>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(taleId);
      req.onsuccess = () => {
        const result = req.result as ComicStorybook | undefined;
        resolve(result && Array.isArray(result.panels) ? result : null);
      };
      req.onerror = () => resolve(null);
      tx.oncomplete = () => db.close();
    });
  } catch {
    return null;
  }
}

export async function saveCachedComic(comic: ComicStorybook): Promise<void> {
  try {
    const db = await openComicDb();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.put(comic);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        resolve();
      };
    });
  } catch {
    // Gracefully ignore cache failures
  }
}

export async function deleteCachedComic(taleId: string): Promise<void> {
  try {
    const db = await openComicDb();
    await new Promise<void>((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      store.delete(taleId);
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        resolve();
      };
    });
  } catch {
    // Gracefully ignore cache failures
  }
}
