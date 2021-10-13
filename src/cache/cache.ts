import NodeCache from 'node-cache';

export interface AuthPayload {
  userId: string;
}

class Cache {
  cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  setAccessToken(accessToken: string, payload: AuthPayload): boolean {
    return this.cache.set(accessToken, payload);
  }

  deleteAccessToken(accessToken: string) {
    this.cache.del(accessToken);
  }
}

const cache = new Cache();

export default cache;
