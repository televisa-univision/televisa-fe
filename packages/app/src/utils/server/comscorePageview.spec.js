import getComscorePageViewServerSideProps from './comscorePageview';

const mockContext = {
  res: {
    end: jest.fn(),
    setHeader: jest.fn(),
  },
  req: {
    headers: jest.fn(),
  },
};

describe('comscorePageview test', () => {
  it('should return comscore-pageview', () => {
    const serverSidePropsFn = getComscorePageViewServerSideProps();
    serverSidePropsFn(mockContext);
    expect(mockContext.res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(mockContext.res.end).toHaveBeenCalledWith('comscore-pageview');
  });

  it('should return comscore-pageview for las estrellas', () => {
    const mockContextLasEstrellas = {
      res: {
        end: jest.fn(),
        setHeader: jest.fn(),
      },
      req: {
        headers: {
          host: 'lasestrellas',
        },
      },
    };
    const serverSidePropsFn = getComscorePageViewServerSideProps();
    serverSidePropsFn(mockContextLasEstrellas);
    expect(mockContextLasEstrellas.res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(mockContextLasEstrellas.res.end).toHaveBeenCalledWith('comscore');
  });
});
