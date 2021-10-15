import { nanoid } from 'nanoid/async';
import cache, { AuthPayload } from '~/cache/cache';

async function generateAccessToken(authPayload: AuthPayload) {
  const accessToken = await nanoid();

  const release = await cache.accuireAccessTokenLock();
  cache.setAccessToken(accessToken, authPayload);
  release();

  return accessToken;
}

export default generateAccessToken;
