const STATUS_CODES = {
  200: ['OK', 'OK'],
  201: ['CREATED', 'Created'],
  202: ['ACCEPTED', 'Accepted'],
  204: ['NO_CONTENT', 'No Content'],
  301: ['MOVED_PERMANENTLY', 'Moved Permanently'],
  302: ['FOUND', 'Found'],
  400: ['BAD_REQUEST', 'Bad Request'],
  401: ['UNAUTHORIZED', 'Unauthorized'],
  402: ['PAYMENT_REQUIRED', 'Payment Required'],
  403: ['FORBIDDEN', 'Forbidden'],
  404: ['NOT_FOUND', 'Not Found'],
  405: ['METHOD_NOT_ALLOWED', 'Method Not Allowed'],
  409: ['CONFLICT', 'Conflict'],
  410: ['GONE', 'Gone'],
  500: ['INTERNAL_ERROR', 'Internal Server Error'],
};

export default STATUS_CODES;
