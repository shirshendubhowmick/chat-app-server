import { nanoid } from 'nanoid/async';

function generateAccessToken() {
  return nanoid();
}

export default generateAccessToken;
