import dotenv from 'dotenv';
import WebApiRequestSigner from '../../webapi/WebApiRequestSigner';
import generateApiUrl, { generateApiSignature } from './apiUrlHelper';

/**
 * Inject ENV variables
 */
dotenv.config();

/**
 * Example signature for testing
 * @type {string}
 */
const expectedSignature = '10d7894c3377b50fbc16a2cf57ebe71c6f09ec63';

/**
 * Base url for cms api calls
 * @type {string}
 */
const cmsApiBaseUrl = 'https://syndicator.univision.com';

/**
 * Url requested by cms api calls
 * @type {string}
 */
const requestedUrl = 'https://www.univision.com/los-angeles/klve';

/**
 * Url requested by local cms preview requests
 * @type {string}
 */
const localPreviewRequestedUrl = 'http://www.local.univision.com/_preview/__PLACEHOLDER__';

/**
 * Url requested by prod cms preview requests
 * @type {string}
 */
const prodPreviewRequestedUrl = 'https://www.univision.com/_preview/__PLACEHOLDER__';

/**
 * Base feed url for layouts
 * @type {string}
 */
const layoutFeedBaseUrl = `${cmsApiBaseUrl}/web-api/__PLACEHOLDER__?url=${requestedUrl}`;

/**
 * Url for a page preview using the local environment
 * @type {string}
 */
const localPreviewPageFeedBaseUrl = `http://www.local.univision.com/web-api/__PLACEHOLDER__?url=${localPreviewRequestedUrl}/local`;

/**
 * Url for a page preview using the default environment
 * @type {string}
 */
const defaultPreviewPageFeedBaseUrl = `${cmsApiBaseUrl}/web-api/__PLACEHOLDER__?url=${prodPreviewRequestedUrl}/undefined`;

const unsignedApiUrl = `${cmsApiBaseUrl}/web-api/content?url=${requestedUrl}`;
jest.mock('app/utils/logging/serverLogger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  log: jest.fn(),
}));

/** @test {generateApiSignature} */
describe('generateApiSignature function', () => {
  it('should return the signature correctly using default params', () => {
    const signature = generateApiSignature();
    expect(signature).toBeDefined();
  });

  it('should return the signature correctly explicity passing in params', () => {
    const signature = generateApiSignature(cmsApiBaseUrl, 'page', 'GET');
    expect(signature).toBe(expectedSignature);
  });

  it('should return the same value as WebApiRequestSigner', () => {
    const url = 'https://www.univision.com/noticias/amazing-webapp';
    expect(generateApiSignature(url)).toBe(WebApiRequestSigner.generateHash(url));
  });
});

/** @test {generateApiUrl} */
describe('generateApiUrl function', () => {
  describe('creates the unsigned API request portion correctly', () => {
    it('should return a signed URL', () => {
      process.env.CMS_API_SIGNING_REQUIRED = true;
      const contentUrl = 'https://www.univision.com/los-angeles/klve';
      const result = generateApiUrl(contentUrl, cmsApiBaseUrl, undefined);
      expect(result).toBeDefined();
    });

    it('should return null if call without params', () => {
      const result = generateApiUrl();
      expect(result).toBe(null);
    });

    it('should create unsigned url with custom path param', () => {
      delete process.env.CMS_API_SIGNING_REQUIRED;
      const contentUrl = 'https://www.univision.com/los-angeles/klve?param=value';
      const result = generateApiUrl(contentUrl, cmsApiBaseUrl, undefined);
      expect(result).toBe(`${unsignedApiUrl}&param=value`);
    });

    it('should create unsigned url with custom feed type', () => {
      const contentUrl = 'https://www.univision.com/los-angeles/klve?param=value&param2=value';
      const result = generateApiUrl(contentUrl, cmsApiBaseUrl, 'layout');
      expect(result).toBe(`${layoutFeedBaseUrl}&param=value&param2=value`);
    });

    it('should preview in requested environment', () => {
      const contentUrl = 'http://www.univision.com/_preview/__PLACEHOLDER__/local';
      const result = generateApiUrl(contentUrl, cmsApiBaseUrl, 'layout');
      expect(result).toBe(`${localPreviewPageFeedBaseUrl}`);
    });

    it('should preview in using fallback environment', () => {
      const contentUrl = 'https://www.univision.com/_preview/__PLACEHOLDER__/undefined';
      const result = generateApiUrl(contentUrl, cmsApiBaseUrl, 'layout');
      expect(result).toBe(`${defaultPreviewPageFeedBaseUrl}`);
    });

    it('should generate unsigned url when CMS_API_SIGNING_REQUIRED is missing', () => {
      delete process.env.CMS_API_SIGNING_REQUIRED;
      const contentUrl = 'https://www.univision.com/los-angeles/klve';
      const result = generateApiUrl(contentUrl, cmsApiBaseUrl);
      expect(result).toBe(`${unsignedApiUrl}`);
    });
  });
});
