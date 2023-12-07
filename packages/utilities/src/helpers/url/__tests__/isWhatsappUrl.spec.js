import isWhatsappUrl from '../isWhatsappUrl';

describe('isWhatsappUrl', () => {
  it('should return false by default', () => {
    expect(isWhatsappUrl()).toBe(false);
  });

  it('should return true when whatsapp url', () => {
    expect(isWhatsappUrl('whatsapp://text=test')).toBe(true);
  });

  it('should return false when https url', () => {
    expect(isWhatsappUrl('https://www.univision.com')).toBe(false);
  });
});
