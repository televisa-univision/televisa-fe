import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { storiesOf } from '@storybook/react';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { image } from '../../config/storyMocks';
import RelatedArticle from '../enhancements/RelatedArticle';
import Collapsible from './index';

import Styles from './Collapsible.stories.scss';

/**
 * Example list component for Collapsible
 * @returns {JSX}
 */
const ExampleList = (
  <div>
    <RelatedArticle
      uri="http://theurl.com"
      title="Lorem ipsum dolor sit amet!"
      image={image}
    />
    <RelatedArticle
      uri="http://theurl.com"
      title="Donec hendrerit ac neque a fermentum!"
      image={image}
    />
    <RelatedArticle
      uri="http://theurl.com"
      title="My new test!"
      image={image}
    />
  </div>
);

/**
 * Example header component for Collapsible
 * @param {Object} props - an props from Collapsible
 * @returns {JSX}
 */
const Header = ({ status }) => {
  const isOpen = status === 'show';

  return (
    <div className={`${Styles.header} ${isOpen ? Styles.isOpen : ''}`}>
      <span className={Styles.title}>Liga MX</span>
      <button className={`${Styles.button} ${isOpen ? Styles.isOpen : ''}`}>
        <Icon name="arrowDown" className={Styles.icon} />
      </button>
    </div>
  );
};

Header.propTypes = {
  status: PropTypes.string,
};

Header.defaultProps = {
  status: 'hide',
};

/**
 * Example Collapsible with lazy load
 * @access public
 * @extends {React.Component}
 */
class CollapsibleLazy extends React.Component {
  /**
   * bind methods and setup component
   * @constructor
   */
  constructor () {
    super();

    this.changeHandler = this.changeHandler.bind(this);
    this.state = {
      isLoaded: false,
    };
  }

  /**
   * Handler when collapsible status changed
   * @access public
   * @param {string} status - the collapsible status show/hide
   */
  changeHandler (status) {
    const { isLoaded } = this.state;
    if (isLoaded === false && status === 'show') {
      this.setState({
        isLoaded: true,
      });
    }
  }

  /**
   * Render the Collapsible component
   * @returns {JSX}
   */
  render () {
    const { isLoaded } = this.state;

    return (
      <Collapsible header={Header} onChange={this.changeHandler}>
        {isLoaded ? <LazyLoad once>{ExampleList}</LazyLoad> : null}
      </Collapsible>
    );
  }
}

storiesOf('Collapsible', module)
  .add('Toggle with header', () => {
    return (
      <div>
        <Collapsible header={Header}>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ornare nibh mollis,
              sagittis elit id, blandit libero. In faucibus nisl ipsum,
              vitae venenatis est laoreet sit amet.
              Quisque semper ante a augue tempus, et lacinia felis iaculis.
              Nulla facilisi. Pellentesque ipsum nibh, lacinia non sagittis nec, ornare sed lectus.
              Cras diam nisi, bibendum scelerisque lectus eget, cursus laoreet purus.
              Vivamus commodo lectus et pulvinar viverra.
              Donec facilisis, libero et hendrerit dignissim, libero arcu venenatis diam,
              nec varius orci mauris et nisi. Sed aliquet mi ultricies dui fringilla,
              ut facilisis metus rutrum. Donec hendrerit ac neque a fermentum.
              Aenean bibendum vehicula commodo. Integer id porta nisl.
              Phasellus faucibus, tortor sed suscipit laoreet, mi massa posuere erat,
              nec tincidunt orci mi vel ex. Aenean vitae cursus elit, ac venenatis ex.
              Nulla mi sem, bibendum eget velit vel, luctus maximus urna.
            </p>
          </div>
        </Collapsible>
        <Collapsible header={Header}>
          {ExampleList}
        </Collapsible>
      </div>
    );
  })
  .add('Toggle with header and custom className', () => {
    return (
      <Collapsible header={Header} className={Styles.collapsible}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ornare nibh mollis,
          sagittis elit id, blandit libero. In faucibus nisl ipsum,
          vitae venenatis est laoreet sit amet.
          Quisque semper ante a augue tempus, et lacinia felis iaculis.
          Nulla facilisi. Pellentesque ipsum nibh, lacinia non sagittis nec, ornare sed lectus.
          Cras diam nisi, bibendum scelerisque lectus eget, cursus laoreet purus.
          Vivamus commodo lectus et pulvinar viverra.
        </p>
      </Collapsible>
    );
  })
  .add('Toggle with header and with LazyLoad', () => {
    return (
      <CollapsibleLazy />
    );
  })
  .add('Generic toggle', () => {
    return (
      <div>
        <Collapsible>
          {ExampleList}
        </Collapsible>
        <Collapsible>
          {ExampleList}
        </Collapsible>
      </div>
    );
  });
