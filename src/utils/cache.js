/**
 * Caching utility sederhana dengan TTL (Time To Live)
 * 
 * Penjelasan:
 * - Cache menyimpan data dalam memory dengan key tertentu
 * - TTL membatasi berapa lama data disimpan sebelum expired
 * - get() mengembalikan null jika key tidak ada atau sudah expired
 * 
 * Contoh:
 * cache.set('jakarta', data, 600000) // menyimpan 10 menit
 * cache.get('jakarta') // ambil data jika masih fresh
 */

class Cache {
  constructor() {
    this.store = {};
  }

  set(key, value, ttl = 600000) {
    const expiresAt = Date.now() + ttl;
    this.store[key] = { value, expiresAt };
  }

  get(key) {
    if (!this.store[key]) {
      return null;
    }

    const { value, expiresAt } = this.store[key];

    if (Date.now() > expiresAt) {
      delete this.store[key];
      return null;
    }

    return value;
  }

  clear() {
    this.store = {};
  }
}

export default new Cache();
