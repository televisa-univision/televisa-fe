import loadTwitterScript, { doLoad as doLoadTwitter } from './twitter';
import loadCarSaverScript, { doLoad as doLoadCarSaver } from './carsaver';
import loadGatsbyScript, { doLoad as doLoadGatsby } from './gatsby';

describe('Twitter loader', () => {
  it('loadTwitterScript returns a promise', (done) => {
    const head = { appendChild: jest.fn() };
    const script = { onload: jest.fn() };
    global.document.createElement = jest.fn(() => script);
    global.document.getElementsByTagName = jest.fn(() => [head]);

    const expectedPromise = loadTwitterScript();
    expect(expectedPromise).toBeInstanceOf(Promise);
    done();
  });

  it('doLoadTwitter resolves with existing twttr object', () => {
    global.window.twttr = { foo: true };
    const reject = jest.fn();
    const resolve = jest.fn();
    doLoadTwitter(resolve, reject);
    expect(resolve).toBeCalledWith(global.window.twttr);
  });

  it('script.onLoad resolves with window.twttr object', () => {
    const reject = jest.fn();
    const resolve = jest.fn();
    global.window.twttr = { twitter: true };
    const head = { appendChild: jest.fn() };
    const script = { onload: jest.fn() };
    global.document.createElement = jest.fn(() => script);
    global.document.getElementsByTagName = jest.fn(() => [head]);
    doLoadTwitter(resolve, reject);
    expect(head.appendChild).toBeCalledWith(script);
    script.onload();
    expect(resolve).toBeCalledWith(global.window.twttr);
  });
});

describe('CarSaver loader', () => {
  it('loadCarSaverScript returns a promise', (done) => {
    const head = { appendChild: jest.fn() };
    const script = { onload: jest.fn() };
    global.document.createElement = jest.fn(() => script);
    global.document.getElementById = jest.fn(() => head);

    const expectedPromise = loadCarSaverScript(2);
    expect(expectedPromise).toBeInstanceOf(Promise);
    done();
  });

  it('doLoadCarSaver resolves with existing carsaverWidgetSearchInit value', () => {
    const reject = jest.fn();
    const resolve = jest.fn();
    global.window.carsaverWidgetSearchInit = true;
    doLoadCarSaver('id')(resolve, reject);
    expect(resolve).toBeCalledWith(true);
  });

  it('doLoadCarSaver resolves with existing twttr object', () => {
    global.window.carsaverWidgetSearchInit = false;
    const reject = new Error('error');
    const resolve = jest.fn();
    const head = { appendChild: jest.fn() };
    const script = { onload: jest.fn() };
    global.document.createElement = jest.fn(() => script);
    global.document.getElementById = jest.fn(() => head);
    doLoadCarSaver('id')(resolve, reject);
    expect(head.appendChild).toBeCalledWith(script);
    script.onload();
    expect(resolve).toBeCalledWith(global.window.carsaverWidgetSearchInit);
  });
});

describe('GATSBY loader', () => {
  it('loadGATSBYScript returns a promise', (done) => {
    const head = { appendChild: jest.fn() };
    const script = { onload: jest.fn() };
    global.document.createElement = jest.fn(() => script);
    global.document.getElementsByTagName = jest.fn(() => [head]);

    const expectedPromise = loadGatsbyScript();
    expect(expectedPromise).toBeInstanceOf(Promise);
    done();
  });

  it('doLoadGatsby resolves with existing gatsby object', () => {
    global.window.GATSBY = { foo: true };
    const reject = jest.fn();
    const resolve = jest.fn();
    doLoadGatsby(resolve, reject);
    expect(resolve).toBeCalledWith(global.window.GATSBY);
  });

  it('script.onLoad resolves with window.GATSBY object', () => {
    const reject = jest.fn();
    const resolve = jest.fn();
    global.window.GATSBY = false;
    const head = { appendChild: jest.fn() };
    const script = { onload: jest.fn() };
    global.document.createElement = jest.fn(() => script);
    global.document.getElementsByTagName = jest.fn(() => [head]);
    doLoadGatsby(resolve, reject);
    expect(head.appendChild).toBeCalledWith(script);
    script.onload();
    expect(resolve).toBeCalledWith(global.window.GATSBY);
  });
});
