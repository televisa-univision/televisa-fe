import numberOfBytes from './numberOfBytes';

describe('Number of bytes test', () => {
  const text = 'abcdefghijlmnopqrstuvxz1234567890*~`!@#$%^&*()_-+=[{}]á|'
    + "'\\/.>,<;:\"?ABCDEFGHIJLMNOPQRSTUVXZ´ «¡™£¢∞§¶¶•ªº–≠‘“…æ≥≤œ∑´´†¥¨ˆˆπ¬˚∆˙©ƒ∂ßåΩ≈ç√∫˜≤≥";

  it('should return correct number of bytes in utf-8', () => {
    const bytes = numberOfBytes(text, 'utf-8');
    expect(bytes).toEqual(Buffer.byteLength(text));
  });
  it('should return correct number of bytes with utf-8 as default ', () => {
    const bytes = numberOfBytes(text);
    expect(bytes).toEqual(Buffer.byteLength(text));
  });
  it('should return 0 if no text is passed', () => {
    const bytes = numberOfBytes(undefined);
    expect(bytes).toEqual(0);
  });
  it('should return null when no encode is found', () => {
    const bytes = numberOfBytes('text', 'encode');
    expect(bytes).toEqual(null);
  });
});
