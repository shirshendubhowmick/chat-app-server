import NodeCache from 'node-cache';
import { ProcessedMessage } from '~/socket/eventListeners/types';

export interface AuthPayload {
  userId: string;
  name: string;
}

const adminUserKey = 'adminUser';
const msgListKey = 'messageList';

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

  addMessageToList(processedMessage: ProcessedMessage) {
    let msgList: ProcessedMessage[] | undefined = this.cache.get(msgListKey);

    if (!msgList) {
      msgList = [];
    }

    const id = msgList.length;
    msgList.push({
      ...processedMessage,
      id,
    });

    this.cache.set(msgListKey, msgList);

    return id;
  }
}

const cache = new Cache();

export default cache;
