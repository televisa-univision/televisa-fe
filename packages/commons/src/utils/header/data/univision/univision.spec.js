import univision from '.';
import univisionFoundation from './univisionFoundation';
import votaConmigo from './votaConmigo';
import lupita from './lupita';

describe('univision data object', () => {
  it('should return default data', () => {
    const data = univision();
    expect(data.title).toBeDefined();
    expect(data.links).toBeDefined();
    expect(data.links).toEqual(expect.any(Array));
  });
  it('should return data for vota conmigo header', () => {
    const data = votaConmigo();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/a0/2e/0db52abe48e2863b8920f98f6bb2/vota-conmigo-logo.svg');
  });
  it('should return data for lupita header', () => {
    const data = lupita();
    expect(data.title).toBeDefined();
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/9d/c3/47453baf4cf1999d3289b5291f73/lupita.png');
  });
  it('should return data for univision foundation header', () => {
    const data = univisionFoundation();
    expect(data.title.logo).toEqual('https://st1.uvnimg.com/bb/47/088b251e4edc90f287148739f8be/univision-foundation.svg');
    expect(data.links).toBeDefined();
    expect(data.links[0]).toEqual({
      name: 'Donate',
      link: 'https://secure.givelively.org/donate/univision-org-foundation',
      target: '_blank',
    });
  });
});
