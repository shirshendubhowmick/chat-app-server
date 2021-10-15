import NodeCache from 'node-cache';
import { Mutex, MutexInterface, withTimeout } from 'async-mutex';

import { ProcessedMessage } from '~/socket/eventListeners/types';

export interface AuthPayload {
  userId: string;
  name: string;
}

const adminUserKey = 'adminUser';
const msgListKey = 'messageList';

class Cache {
  cache: NodeCache;

  accessTokenMutex: MutexInterface;

  chatMutex: MutexInterface;

  constructor() {
    this.cache = new NodeCache();
    this.accessTokenMutex = withTimeout(new Mutex(), 1000);
    this.chatMutex = withTimeout(new Mutex(), 1000);
  }

  accuireAccessTokenLock() {
    console.log('Accuring lock');
    return this.accessTokenMutex.acquire();
  }

  setAccessToken(accessToken: string, payload: AuthPayload) {
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

  getMessageList() {
    const msgList: ProcessedMessage[] | undefined = this.cache.get(msgListKey);
    return msgList || [];
  }
}

const cache = new Cache();

export default cache;
