import HttpError from './HttpError';
/**
 * @test {page/HttpError}
 */
describe('setupPage test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should return a new HttpError object with deefault values', () => {
    const err = new HttpError();

    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(HttpError);
    expect(err.code).toBe(500);
    expect(err.message).toBe('Internal Server Error');
    expect(err.stack).toBeDefined();
    expect(err.payload).toEqual({
      error: 'Internal Server Error',
      message: 'Internal server error occurred',
      statusCode: 500,
    });
  });

  it('should return a new HttpError object from a Error', () => {
    const err = new HttpError(new Error('custom error'), {
      statusCode: 0,
      constructor: undefined,
    });

    expect(err.code).toBe(500);
    expect(err.message).toBe('custom error');
    expect(err.stack).toBeDefined();
    expect(err.payload).toEqual({
      error: 'Internal Server Error',
      message: 'Internal server error occurred',
      statusCode: 500,
    });
  });

  it('should return a new HttpError object custom data', () => {
    const err = new HttpError('needs token', {
      statusCode: 401,
      data: { userId: 1 },
    });

    expect(err.code).toBe(401);
    expect(err.message).toBe('needs token');
    expect(err.type).toBe('UNAUTHORIZED');
    expect(err.stack).toBeDefined();
    expect(err.payload).toEqual({
      error: 'Unauthorized',
      message: 'needs token',
      statusCode: 401,
    });
  });

  it('should return a new HttpError object with Bad Request from a static method', () => {
    const err = HttpError.badRequest('oops!');

    expect(err.code).toBe(400);
    expect(err.message).toBe('oops!');
    expect(err.type).toBe('BAD_REQUEST');
    expect(err.payload).toEqual({
      error: 'Bad Request',
      message: 'oops!',
      statusCode: 400,
    });
  });

  it('should return a new HttpError object with Not Found from a static method', () => {
    const err = HttpError.notFound();

    expect(err.code).toBe(404);
    expect(err.message).toBe('Not Found');
    expect(err.type).toBe('NOT_FOUND');
    expect(err.payload).toEqual({
      error: 'Not Found',
      message: 'Not Found',
      statusCode: 404,
    });
  });

  it('should return a new HttpError object with Forbidden from a static method', () => {
    const err = HttpError.forbidden('not Allowed');

    expect(err.code).toBe(403);
    expect(err.message).toBe('not Allowed');
    expect(err.type).toBe('FORBIDDEN');
    expect(err.payload).toEqual({
      error: 'Forbidden',
      message: 'not Allowed',
      statusCode: 403,
    });
  });

  it('should return a new HttpError object with custom Internal Error from a static method', () => {
    const err = HttpError.internal('Something is wrong', {
      userId: 1,
    }, 501);

    expect(err.code).toBe(501);
    expect(err.message).toBe('Something is wrong');
    expect(err.type).toBe('UNKNOWN');
    expect(err.payload).toEqual({
      error: 'Unknown error',
      message: 'Something is wrong',
      statusCode: 501,
    });
  });
});
