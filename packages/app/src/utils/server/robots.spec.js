import Robots, { getServerSideProps, getRobotsServerSideProps } from './robots';

const mockContext = {
  res: {
    end: jest.fn(),
    setHeader: jest.fn(),
  },
  req: {
    headers: {
      host: 'uat.tudn.com',
    },
  },
};

describe('robots.txt test', () => {
  it('should return empty component', () => {
    expect(Robots()).toBeNull();
  });

  it('should return dev robots.txt file', () => {
    const serverSideProps = getServerSideProps(mockContext);

    expect(serverSideProps).toEqual(expect.any(Promise));
    expect(mockContext.res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(mockContext.res.end).toHaveBeenCalledWith('User-agent: *\nDisallow: /\n');
  });

  it('should return prod robots.txt file', () => {
    const robotsProd = `
      User-agent: *
      Allow: /
      Disallow: /deportes/fantasy/template*
    `;
    process.env.DEPLOY_ENV = 'production';
    const customGetServerSideProps = getRobotsServerSideProps(robotsProd);
    const serverSideProps = customGetServerSideProps(mockContext);

    expect(serverSideProps).toEqual(expect.any(Promise));
    expect(mockContext.res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(mockContext.res.end).toHaveBeenCalledWith(robotsProd);
  });
});
