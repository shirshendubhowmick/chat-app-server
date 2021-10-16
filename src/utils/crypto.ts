import { nanoid } from 'nanoid/async';
import cache, { AuthPayload } from '~/cache/cache';

async function generateAccessToken(authPayload: AuthPayload) {
  const accessToken = await nanoid();
  cache.setAccessToken(accessToken, authPayload);
  return accessToken;
}

export default generateAccessToken;
