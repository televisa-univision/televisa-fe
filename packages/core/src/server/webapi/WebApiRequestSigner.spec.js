import dotenv from 'dotenv';
import WebApiRequestSigner from './WebApiRequestSigner';

beforeEach(() => {
  // Load env variables
  dotenv.config();
  process.env.CMS_API_URL = 'https://syndicator.univision.com';
});

afterEach(() => {
  // Revert any changes
  dotenv.config();
});

describe('WebApiRequestSigner', () => {
  describe('generateSignature', () => {
    it('should generate a valid hash', () => {
      const expectedHash = '9faae814a998f92111fa7fc5c76a9bcc1cfe0460';
      expect(WebApiRequestSigner.generateHash('http://syndicator.univision.com')).toBe(expectedHash);
    });
  });

  describe('sign', () => {
    it('should generate valid signature parameters', () => {
      process.env.CMS_API_CLIENT_ID = 'jest';
      expect(WebApiRequestSigner.sign('http://syndicator.univision.com')).toBe('&client_id=jest&signature=6652f89b756f8ca4bf2afb95afa25488ac20e4ad');
    });
  });
});
