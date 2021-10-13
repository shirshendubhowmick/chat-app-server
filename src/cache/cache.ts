import NodeCache from 'node-cache';

export interface AuthPayload {
  userId: string;
  name: string;
}

class Cache {
  cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  setAccessToken(accessToken: string, payload: AuthPayload): boolean {
    return this.cache.set(accessToken, payload);
  }

  verifyAccessToken(accessToken: string): AuthPayload | undefined {
    return this.cache.get(accessToken);
  }

  deleteAccessToken(accessToken: string) {
    this.cache.del(accessToken);
  }
}

const cache = new Cache();

export default cache;
