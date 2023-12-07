/**
 * @module PrendeTV News Item Specs
 */
import React from 'react';
import ReactDOM from 'react-dom';

import NewsItem from '.';

/**
 * @test {Header}
 */
describe('Prende TV Static News item test', () => {
  it('should render correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NewsItem />, div);
  });

  it('should render correctly with data specfied', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <NewsItem
        uri="uri"
        title="title"
        device="desktop"
        publishDate="date"
        image={{ renditions: { original: { href: 'uri' } } }}
      />
    ), div);
  });

  it('should render correctly in mobile', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <NewsItem
        uri="uri"
        title="title"
        description="description"
        device="mobile"
        publishDate="date"
        image={{ renditions: { original: { href: 'uri' } } }}
      />
    ), div);
  });

  it('should render correctly with no image specified', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <NewsItem
        uri="uri"
        title="title"
        publishDate="date"
      />
    ), div);
  });
});
