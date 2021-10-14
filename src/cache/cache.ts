import NodeCache from 'node-cache';

export interface AuthPayload {
  userId: string;
  name: string;
}

const adminUserKey = 'adminUser';

class Cache {
  cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  setAccessToken(accessToken: string, payload: AuthPayload): boolean {
    return (
      this.cache.set(accessToken, payload) &&
      this.cache.set(adminUserKey, payload.userId)
    );
  }

  verifyAccessToken(accessToken: string): AuthPayload | undefined {
    return this.cache.get(accessToken);
  }

  deleteAccessToken(accessToken: string) {
    this.cache.del(accessToken);
    this.cache.del(adminUserKey);
  }

  isAdminUserPositionAvailable() {
    return !this.cache.get(adminUserKey);
  }
}

const cache = new Cache();

export default cache;
