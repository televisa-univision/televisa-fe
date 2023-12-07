import tracer from 'dd-trace';
import Datadog from './datadog';

jest.mock('dd-trace', () => ({
  init: jest.fn(),
  scope: jest.fn().mockReturnValue({
    active: jest.fn().mockReturnValue(null),
  }),
  use: jest.fn(),
  startSpan: jest.fn(),
}));

describe('Datadog', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('Should not add a new tag to the current span', () => {
    Datadog.addTag('', '');
    expect(tracer.scope().active()).toBeNull();
  });

  it('Should add a new span.', () => {
    Datadog.addSpan('test');
    expect(tracer.startSpan).toBeCalled();
  });

  it('Should close a span.', () => {
    const mockSpan = {
      finish: jest.fn(),
    };
    Datadog.closeSpan(mockSpan);
    expect(mockSpan.finish).toBeCalled();
  });

  it('Should not close a span if Library is not defined.', () => {
    const lib = Datadog.Library;
    delete Datadog.Library;
    const mockSpan = {
      finish: jest.fn(),
    };
    Datadog.closeSpan(mockSpan);
    expect(mockSpan.finish).not.toBeCalled();
    Datadog.Library = lib;
  });

  it('should set the http.route tag if Content-Type header is defined', () => {
    const res = {
      get: name => (name === 'X-Content-Type' ? 'video' : null),
    };
    const req = {
      get: () => null,
    };
    const mockSpan = {
      setTag: jest.fn(),
    };
    Datadog.constructor.onExpressRoute(mockSpan, req, res);
    expect(mockSpan.setTag).toBeCalledWith('http.route', '/video');
  });

  it('should set the http.route tag if X-Content-Type header is defined with X-Why', () => {
    const res = {
      get: name => (name === 'X-Content-Type' ? 'article' : null),
    };
    const req = {
      get: name => (name === 'X-Why' ? 'Prefetch' : null),
    };
    const mockSpan = {
      setTag: jest.fn(),
    };
    Datadog.constructor.onExpressRoute(mockSpan, req, res);
    expect(mockSpan.setTag).toBeCalledWith('http.route', '/Prefetch - article');
  });

  it('should not set the http.route tag if Content-Type header is not defined', () => {
    const res = {
      get: () => null,
    };
    const mockSpan = {
      setTag: jest.fn(),
    };
    Datadog.constructor.onExpressRoute(mockSpan, {}, res);
    expect(mockSpan.setTag).not.toBeCalled();
  });
});
