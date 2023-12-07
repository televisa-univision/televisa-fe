import customShow from './customShow';
import deportes from '../../config/features/deportes';
import * as pageCategories from '../../constants/pageCategories';

deportes.isTudn = jest.fn();
let shows;
let showsTudn;

describe('Custom Shows', () => {
  beforeAll(() => {
  });
  it('Should match entrevistas Logo when TUDN flag is off', () => {
    deportes.isTudn.mockReturnValue(false);
    shows = customShow();
    expect(shows[pageCategories.ENTREVISTAS].brandable.show.headerLogo.original.href)
      .toBe('https://cdn2.uvnimg.com/b6/21/e3b6b2c7409c841726827c45b9eb/logo-180x56.svg');
  });
  it('Should match entrevistas Logo when TUDN flag is on', () => {
    deportes.isTudn.mockReturnValue(true);
    showsTudn = customShow();
    expect(showsTudn[pageCategories.ENTREVISTAS].brandable.show.headerLogo.original.href)
      .toBe('https://st1.uvnimg.com/f7/d6/9f2a114c4e25af9b308a9f1ad1a0/lg-entrevistas-desktop.svg');
  });
  it('Should match videos-virales Logo when TUDN flag is off', () => {
    deportes.isTudn.mockReturnValue(false);
    shows = customShow();
    expect(shows[pageCategories.VIDEOS_VIRALES].brandable.show.headerLogo.original.href)
      .toBe('https://cdn4.uvnimg.com/fd/f6/a849ca644cfc8c7b8b99033d8e09/virales-logo.svg');
  });
  it('Should match videos-virales Logo when TUDN flag is on', () => {
    deportes.isTudn.mockReturnValue(true);
    showsTudn = customShow();
    expect(showsTudn[pageCategories.VIDEOS_VIRALES].brandable.show.headerLogo.original.href)
      .toBe('https://st1.uvnimg.com/a6/84/fa5613f6488ba5378199fccab3c0/lg-virales.svg');
  });
  it('Should match opinion Logo when TUDN flag is off', () => {
    deportes.isTudn.mockReturnValue(false);
    shows = customShow();
    expect(shows[pageCategories.OPINION].brandable.show.headerLogo.original.href)
      .toBe('https://cdn3.uvnimg.com/ee/90/c77bf65d49e289807b04d465e4cb/logo-opinion.svg');
  });
  it('Should match opinion Logo when TUDN flag is on', () => {
    deportes.isTudn.mockReturnValue(true);
    showsTudn = customShow();
    expect(showsTudn[pageCategories.OPINION].brandable.show.headerLogo.original.href)
      .toBe('https://st1.uvnimg.com/99/42/0e6da0b549fda09ea3ff40581d78/lg-opinion.svg');
  });
});
