import getActiveSection from './getActiveSection';

const sections = {
  '2022-11-07': ['foo'],
  '2022-11-08': ['test'],
};

const dates = [
  { key: '2022-11-07' },
  { key: '2022-11-08' },
];

describe('getActiveSection', () => {
  it('should return an empty array', () => {
    expect(getActiveSection({})).toEqual([]);
    expect(getActiveSection({ sections })).toEqual([]);
    expect(getActiveSection({ dates })).toEqual([]);
  });

  it('should return the first value of dates when no activeTab is defined', () => {
    expect(getActiveSection({ activeTab: null, dates, sections }))
      .toEqual(sections['2022-11-07']);
  });

  it('should return the first section when activeTab value is not valid', () => {
    expect(getActiveSection({ activeTab: 'test', dates, sections }))
      .toEqual(sections['2022-11-07']);
  });

  it('should return the appropiate section when activeTab value is valid', () => {
    expect(getActiveSection({ activeTab: '2022-11-08', dates, sections }))
      .toEqual(sections['2022-11-08']);
  });

  it('should return the appropiate section when currentDateKey value is valid', () => {
    expect(getActiveSection({ currentDateKey: '2022-11-08', dates, sections }))
      .toEqual(sections['2022-11-08']);
  });
});
