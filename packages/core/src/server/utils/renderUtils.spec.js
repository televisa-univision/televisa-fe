/**
 * @jest-environment node
 */
import React from 'react';
import styled from 'styled-components';
import ampPageFactory from 'app/AMP/utils/factories/ampPageFactory';
import AmpArticle from 'app/AMP/components/pages/Article/AmpArticle';
import pageFactory, { mapPageTypeToBundleName } from 'app/utils/factories/pageFactory';
import SpaShell from 'components/pages/SpaShell/SpaShell';

import Time from '@univision/shared-components/dist/components/Time';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import * as spaHelpers from '@univision/fe-commons/dist/utils/helpers/spa';
import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';

import renderUtils from './renderUtils';

jest.mock('components/shell/MainShell/MainShell', () => jest.fn());
jest.mock('app/AMP/components/shell/AmpShell', () => jest.fn());
jest.mock('app/AMP/utils/factories/ampPageFactory', () => ({
  getPageComponent: () => jest.fn(),
  isAmpPage: jest.fn(),
  getHtmlAndCss: () => '<html />',
  getAssets: jest.fn(),
}));
jest.mock('app/AMP/utils/factories/ampFactory', () => ({
  cleanCss: jest.fn(),
}));
jest.mock('app/utils/factories/pageFactory', () => ({
  getPageComponent: jest.fn(),
  mapPageTypeToBundleName: jest.fn(),
  getCurrentPageType: jest.fn(),
  getInlineCssPath: jest.fn(),
  getAssets: jest.fn(),
}));

const currentAssets = {
  javascript: 'http://localhost:8081/assets/soccerMatch.d18b9035cf72dee47a9e.js',
  inlineCss: {
    style: '.hola { color: purple; margin: 10px 15px',
  },
};

const req = {
  path: '/deportes',
};

process.env.NODE_ENV = 'production';

describe('getMainShell', () => {
  it('should return MainShell component for deportes', () => {
    const render = renderUtils.getMainShell(currentAssets, 'soccerMatch', req);
    expect(render).toBeDefined();
  });
  it('should return MainShell component with an amp url', () => {
    ampPageFactory.isAmpPage.mockReturnValueOnce(true);
    ampPageFactory.getPageComponent = jest.fn();
    ampPageFactory.getPageComponent.mockReturnValueOnce(<AmpArticle />);
    const render = renderUtils.getMainShell(currentAssets, 'article', req);
    expect(render).toBeDefined();
  });
  it('should return the SPA shell.', () => {
    const shell = renderUtils.getMainShell(currentAssets, contentTypes.SPA, { ...req, path: '/spa/test' });
    expect(shell.props.page.type).toBe(SpaShell);
  });
});

describe('getCurrentAssets', () => {
  it('should return current assets for normal page', () => {
    const getAssetsSpy = jest.spyOn(pageFactory, 'getAssets');
    ampPageFactory.isAmpPage.mockReturnValue(false);
    renderUtils.getCurrentAssets('section', {}, req.path);
    expect(getAssetsSpy).toHaveBeenCalled();
  });
  it('should return current assets for amp page', () => {
    const getAmpAssetsSpy = jest.spyOn(ampPageFactory, 'getAssets');
    ampPageFactory.isAmpPage.mockReturnValue(true);
    renderUtils.getCurrentAssets('section', {}, req.path);
    expect(getAmpAssetsSpy).toHaveBeenCalled();
  });
});

describe('setPageHead', () => {
  it('should return MainShell component for deportes', () => {
    const page = `
      <!doctype html>
      <html lang="es">
        <head>
          <script />
        </head>
        <body>
          <p>hello</p>
        </body>
      </html>
    `;
    const render = renderUtils.setPageHead(page);
    expect(render).toEqual(page);
  });
});

describe('newHtmlPage with styled components', () => {
  it('should render html with styled components', async () => {
    const StyledDummy = styled.div`
      background: red
    `;
    /**
     * Dummy component
     * @returns {JSX}
     */
    const Dummy = (
      <html lang="es">
        <head />
        <body>
          <StyledDummy />
        </body>
      </html>
    );

    const render = await renderUtils.newHtmlPage(Dummy, null, req);
    expect(render).not.toEqual(expect.stringMatching(/data-styled-components="">/));
  });
  it('should render html without styled components', async () => {
    /**
     * Dummy component
     * @returns {JSX}
     */
    const Dummy = (
      <html lang="es">
        <head />
        <body>
          <p>hello world</p>
        </body>
      </html>
    );

    const render = await renderUtils.newHtmlPage(Dummy, null, req);
    expect(render).toEqual(expect.stringMatching(/[object Object]/));
  });
  it('should render html with react-native components', async () => {
    /**
     * Dummy component
     * @returns {JSX}
     */
    const Dummy = (
      <html lang="es">
        <head />
        <body>
          <Time>hello world</Time>
        </body>
      </html>
    );

    const render = await renderUtils.newHtmlPage(Dummy, null, req);
    expect(render).toEqual(expect.stringMatching(/.rn-/));
  });
  it('should render html without react-native components', async () => {
    /**
     * Dummy component
     * @returns {JSX}
     */
    const Dummy = (
      <html lang="es">
        <head />
        <body>
          <p>hello world</p>
        </body>
      </html>
    );

    const render = await renderUtils.newHtmlPage(Dummy, null, req);
    expect(render).not.toEqual(expect.stringMatching(/.rn-/));
  });

  it('should render html without styled components for amp page', async () => {
    const StyledDummy = styled.div`
      background: red
    `;
    /**
     * Dummy component
     * @returns {JSX}
     */
    const Dummy = (
      <html lang="es">
        <head />
        <body>
          <StyledDummy />
        </body>
      </html>
    );

    spyOn(storeHelpers, 'isAmp').and.returnValue(true);
    const render = await renderUtils.newHtmlPage(Dummy);
    expect(render).not.toContain('data-styled-components');
  });
});

describe('getInlineStyles', () => {
  it('should return only the CSS for the entry point if there is not Extra CSS from react-loadable', () => {
    const assets = { inlineCss: 'a{color:red}' };
    const css = renderUtils.getInlineStyles(assets, null, req);
    expect(css).toBe(`<style>${assets.inlineCss}</style>`);
  });

  it('should include extra css from cache for SPA pages.', () => {
    const assets = { inlineCss: 'a{color:red}' };
    const request = {
      path: '/spa/test',
      assets: {
        styles: {
          section: '/assets/section.23.css',
        },
        ssrInlineCss: {
          section_inlineCss: 'p{color:#000}',
        },
      },
    };
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(false);
    mapPageTypeToBundleName.mockReturnValueOnce('section');
    const css = renderUtils.getInlineStyles(assets, null, request);
    expect(css).toBe(`<style>${assets.inlineCss}${request.assets.ssrInlineCss.section_inlineCss}</style>`);
  });

  it('should include extra css from file for SPA pages.', () => {
    const assets = { inlineCss: 'a{color:red}' };
    const inline = 'p{color:black}</style>';
    const request = {
      path: '/spa/test',
      assets: {
        styles: {
          section: '/section.23.css',
        },
        ssrInlineCss: {
          section_inlineCss: inline,
        },
      },
    };
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(false);
    mapPageTypeToBundleName.mockReturnValueOnce('section');
    const css = renderUtils.getInlineStyles(assets, null, request);
    expect(css).toBe(`<style>${assets.inlineCss}${inline}</style>`);
  });

  it('should return the CSS for the entry point AND the extra CSS from react-lodable', () => {
    const assets = { inlineCss: 'a{color:red}' };
    const request = {
      path: '/test',
      assets: {
        ssrInlineCss: {
          promotable_inlineCss: 'p{color:#000}',
        },
      },
    };
    const css = renderUtils.getInlineStyles(assets, ['Random Name'], request);
    expect(css).toBe(`<style>${assets.inlineCss}</style>`);
  });

  it('should return the CSS from assets cache', () => {
    const assets = { inlineCss: 'a{color:red}' };
    const request = {
      path: '/test',
      assets: {
        ssrInlineCss: {
          globalWidgets_inlineCss: 'p{color:black}',
          'test-undefined_inlineCss': '.this-rule-should-me-removed{color:blue;}',
        },
      },
    };
    const css = renderUtils.getInlineStyles(assets, ['globalWidgets'], request);
    expect(css).toBe('<style>a{color:red}p{color:black}</style>');
  });
});
