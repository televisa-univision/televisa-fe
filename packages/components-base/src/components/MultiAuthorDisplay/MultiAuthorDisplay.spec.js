import React from 'react';
import Loadable from 'react-loadable';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import features from '@univision/fe-commons/dist/config/features';

import Link from '../Link';
import Image from '../Image';

import Styles from './MultiAuthorDisplay.scss';
import MultiAuthorDisplay from '.';

/** @test {MultiAuthorDisplay} */
describe('MultiAuthorDisplay ', () => {
  let props;
  let store;

  beforeEach(() => {
    store = configureStore();
    props = {
      authors: [
        {
          uid: '1365',
          title: 'test',
          image: {
            renditions: {
              original: {
                href: 'test',
              },
              '1x1-xxs-mobile': {
                href: 'test',
              },
            },
          },
        },
      ],
      tempAuthors: [
        {
          uid: '22435',
          fullName: 'Temp',
          company: 'Company',
          designation: 'Publisher',
        },
      ],
      date: new Date().toISOString(),
      source: 'Univision',
    };
  });

  it('should render without crashing', () => {
    const wrapper = mount(<Provider store={store}><MultiAuthorDisplay {...props} /></Provider>);
    expect(wrapper).toBeDefined();
  });

  it('should render the author image if available', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay {...props} tempAuthors={null} />
      </Provider>
    );
    expect(wrapper.find(`div.${Styles.avatar}`).length).toBe(1);
  });

  it('should render the author if available', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay {...props} tempAuthors={null} />
      </Provider>
    );
    expect(wrapper.find('Author').length).toEqual(1);
  });

  it('should render the one temp author if no others available', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay {...props} authors={null} />
      </Provider>
    );
    expect(wrapper.find('Author').length).toEqual(1);
  });

  it('should render multiple Authors if available', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          tempAuthors={null}
          authors={[{
            uid: '534',
            title: 'test',
          }, {
            uid: '284',
            title: 'test',
          }]}
          date=" "
        />
      </Provider>
    );
    expect(wrapper.find('Author').length).toEqual(2);
  });

  it('should render one Author ', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          tempAuthors={null}
          authors={[{
            uid: '534',
            title: 'test',
          }]}
          date=" "
        />
      </Provider>
    );
    expect(wrapper.find('Author').length).toEqual(1);
  });

  it('should render multiple temp Authors if available', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          authors={null}
          tempAuthors={[{
            uid: '534',
            fullName: 'test',
          }, {
            uid: '284',
            fullName: 'test',
          }]}
          date=" "
        />
      </Provider>
    );
    expect(wrapper.find('Author').length).toEqual(2);
  });

  it('should render no temp Authors if array is empty', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          tempAuthors={[]}
          authors={[{
            uid: '534',
            fullName: 'test',
          }, {
            uid: '284',
            fullName: 'test',
          }]}
          date=" "
        />
      </Provider>
    );
    expect(wrapper.find('Author').length).toEqual(2);
  });

  it('should render no authors if array is empty', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          authors={[]}
          tempAuthors={[
            {
              uid: '534',
              fullName: 'test',
            },
            {
              uid: '284',
              fullName: 'test',
            },
          ]}
          date=" "
        />
      </Provider>
    );
    expect(wrapper.find('Author').length).toEqual(2);
  });

  it('should render the TwitterFollow widget if available', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          authors={[{
            title: 'test',
            uri: 'test',
            socialNetworks: {
              twitterUrl: {
                url: 'https://twitter.com/nuriapuntonet',
              },
            },
          }]}
          date=" "
        />
      </Provider>
    );
    await Loadable.preloadAll();
    expect(wrapper.find('.twitterButton')).toBeDefined();
  });

  it('should render no authors', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          tempAuthors={[]}
          authors={null}
          date=" "
        />
      </Provider>
    );
    expect(wrapper.find('Author').length).toEqual(0);
  });

  it('should render source if author is not available', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay authors={null} tempAuthors={null} source="Univision" />
      </Provider>
    );
    expect(wrapper.find(`span.${Styles.author}`).length).toEqual(2);
  });

  it('render container even if no authors are present showing the date', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          authors={[]}
          tempAuthors={[]}
          source={null}
          date=" "
        />
      </Provider>
    );
    expect(wrapper.find(`div.${Styles.authors}`).length).toBe(1);
    expect(wrapper.find(`span.${Styles.date}`).length).toBe(1);
  });

  it('should render a sponsored author image only', () => {
    const customStore = configureStore({
      page: {
        parentSite: 'televisa',
        site: 'lasestrellas',
      },
    });
    const wrapper = shallow(
      <Provider store={customStore}>
        <MultiAuthorDisplay
          authors={[]}
          tempAUthors={[]}
          source={null}
          sponsor={{
            image: {
              renditions: {
                original: {
                  href: 'https://uvn-brightspot.s3.amazonaws.com/0e/61/70ec40ed4cb3b7b61810e91b3a4a/bb-ycb20-lockup-primary.png',
                },
              },
            },
            link: { href: 'href' },
          }}
          date=""
        />
      </Provider>
    );
    expect(wrapper.html()).toContain('sponsored');
  });

  it('should not render a sponsored author image only', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          authors={[]}
          tempAUthors={[]}
          source={null}
          sponsor={{ image: null }}
          date=" "
        />
      </Provider>
    );
    expect(wrapper.find(Image)).toHaveLength(0);
  });

  it('should render a sponsored author image with link', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <MultiAuthorDisplay
          authors={[]}
          tempAUthors={[]}
          source={null}
          sponsor={{
            image: {
              renditions: {
                original: {
                  href: 'https://uvn-brightspot.s3.amazonaws.com/0e/61/70ec40ed4cb3b7b61810e91b3a4a/bb-ycb20-lockup-primary.png',
                },
              },
            },
            link: { href: '.univision.com' },
          }}
          date=" "
        />
      </Provider>
    );
    expect(wrapper.find(Link)).toHaveLength(0);
  });

  it('should render a sponsored author image AND one author', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          authors={[{
            title: 'test',
            uri: 'test',
            socialNetworks: {
              twitterUrl: {
                url: 'https://twitter.com/nuriapuntonet',
              },
            },
          }]}
          tempAUthors={[]}
          source={null}
          sponsor={{ image: { renditions: { original: 'href' } } }}
          date=" "
        />
      </Provider>
    );
    expect(wrapper.find('.sponsored')).toHaveLength(1);
    expect(wrapper.find('Author').length).toEqual(1);
  });

  it('should render a sponsored author image AND multiple authors', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          authors={[{
            uid: '534',
            fullName: 'test',
          }, {
            uid: '284',
            fullName: 'test',
          }]}
          tempAUthors={[]}
          source={null}
          sponsor={{ image: { renditions: { original: 'href' } } }}
          date=" "
        />
      </Provider>
    );
    expect(wrapper.find('.sponsored')).toHaveLength(1);
    expect(wrapper.find('Author').length).toEqual(2);
  });

  it('should render an update date when the flag is on and the update date is available', () => {
    let wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          {...props}
          updateDate={new Date().toISOString()}
          showUpdateDate
        />
      </Provider>
    );
    expect(wrapper.find('meta[itemProp="dateUpdated"]')).toHaveLength(1);

    wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          {...props}
          updateDate={new Date().toISOString()}
        />
      </Provider>
    );
    expect(wrapper.find('meta[itemProp="dateUpdated"]')).toHaveLength(0);

    wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          {...props}
          updateDate=""
          showUpdateDate
        />
      </Provider>
    );
    expect(wrapper.find('meta[itemProp="dateUpdated"]')).toHaveLength(0);
  });

  it('should render an update date when the flag is on and the update date is available with Univision', () => {
    const customStore = configureStore({
      page: {
        site: 'univision',
      },
    });
    let wrapper = mount(
      <Provider store={customStore}>
        <MultiAuthorDisplay
          {...props}
          updateDate={new Date().toISOString()}
          showUpdateDate
        />
      </Provider>
    );
    expect(wrapper.find('meta[itemProp="dateUpdated"]')).toHaveLength(1);

    wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          {...props}
          updateDate={new Date().toISOString()}
        />
      </Provider>
    );
    expect(wrapper.find('meta[itemProp="dateUpdated"]')).toHaveLength(0);

    wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          {...props}
          updateDate=""
          showUpdateDate
        />
      </Provider>
    );
    expect(wrapper.find('meta[itemProp="dateUpdated"]')).toHaveLength(0);
  });

  it('should be able to render an inline date for multiple authors', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          {...props}
          inlineDate
        />
      </Provider>
    );
    expect(wrapper.find(`span.${Styles.inlineDate}`).exists()).toBe(true);
  });

  it('should be able to render an inline date for a single author', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          {...props}
          inlineDate
          tempAuthors={[]}
        />
      </Provider>
    );
    expect(wrapper.find(`span.${Styles.inlineDate}`).exists()).toBe(true);
  });

  it('should not render an inline date if the required prop is not passed', () => {
    const wrapper = mount(<Provider store={store}><MultiAuthorDisplay {...props} /></Provider>);

    expect(wrapper.find(`span.${Styles.inlineDate}`).exists()).toBe(false);
  });

  it('should have the class isWorldCupMVP', () => {
    jest.spyOn(features.deportes, 'isWorldCupMVP').mockReturnValue(true);
    const wrapper = mount(
      <Provider store={store}>
        <MultiAuthorDisplay
          tempAuthors={null}
          authors={[{
            uid: '534',
            title: 'test',
          }, {
            uid: '284',
            title: 'test',
          }]}
          date=" "
        />
      </Provider>
    );
    const findComponent = wrapper.find('span.isWorldCupMVP');
    expect(findComponent.length >= 1).toBe(true);
  });
});
