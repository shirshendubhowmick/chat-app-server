// eslint-disable-next-line import/prefer-default-export
export function validateIncomingEvents(
  args: any[],
  next: (err?: Error | undefined) => void,
) {
  const [, payload] = args;
  if (typeof payload !== 'object') {
    next(new Error('Payload is not of JSON type'));
    return;
  }
  next();
}
