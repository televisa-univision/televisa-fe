/**
 * Determines if we should parse the body
 * @param {Object} res request response
 * @returns {boolean}
 */
const shouldParseBody = (res) => {
  return res.get('content-type').includes('application/json');
};

/**
 * This middleware attach to the property body of the
 * response object the response of the request deserialized
 * @param {Object} req Request
 * @param {Object} res Response
 * @param {Object} next Next
 * @returns {Object}
 */
export function responseBodyParser(req, res, next) {
  if (req.method === 'HEAD') {
    return next();
  }

  const oldWrite = res.write;
  const oldEnd = res.end;

  const chunks = [];

  res.write = (...restArgs) => {
    try {
      if (shouldParseBody(res)) {
        if (restArgs[0]) {
          chunks.push(Buffer.from(restArgs[0]));
        }
      }
      oldWrite.apply(res, restArgs);
    } catch {
      oldWrite.apply(res, restArgs);
    }
  };

  res.end = (...restArgs) => {
    try {
      if (shouldParseBody(res)) {
        if (restArgs[0]) {
          chunks.push(Buffer.from(restArgs[0]));
        }
        const body = Buffer.concat(chunks).toString('utf8');
        res.body = body;
      }
      oldEnd.apply(res, restArgs);
    } catch {
      oldEnd.apply(res, restArgs);
    }
  };

  return next();
}

export default responseBodyParser;
