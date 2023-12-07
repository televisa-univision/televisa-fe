import React from 'react';
import { shallow, mount } from 'enzyme';
import preloadAll from 'jest-next-dynamic';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import features from '@univision/fe-commons/dist/config/features';
import styled from 'styled-components';
import {
  Opening, getDescription, getLoadableLiveblogLead, mapStateToProps,
} from '.';
import Styles from './LiveBlogOpening.styles';

configureStore({ page: { requestParams: {} } });

jest.mock('react-loadable');

features.televisa.isTelevisaSite = jest.fn(() => false);

/** @test {Header} */
describe('Header Spec', () => {
  const props = {
    title: 'test',
    description: 'Description',
    displayLeadMedia: true,
    linkableBulletedDescription: [],
    richTextDescription: [],
    hideLabel: false,
  };

  beforeEach(async () => {
    await preloadAll();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    const wrapper = shallow(<Opening {...props} />, div);
    expect(wrapper.exists()).toBe(true);
  });

  it('should include authors and tempAuthors', () => {
    const wrapper = shallow(<Opening {...props} authors={[{ uid: '1abc' }]} tempAuthors={[{ uid: '2bcd' }]} />);
    expect(wrapper.find('Meta').prop('authors')[0].uid).toEqual('1abc');
    expect(wrapper.find('Meta').prop('tempAuthors')[0].uid).toEqual('2bcd');
  });

  it('should render a regular description', () => {
    const res = getDescription({ description: 'hello' });
    expect(res).toEqual('hello');
  });

  it('should render a rich description', () => {
    const res = getDescription({ description: 'hello', richTextDescription: ['teststring'] });
    expect(res[0].props.dangerouslySetInnerHTML).toBeDefined();
  });

  it('should render a bulleted description', () => {
    const res = getDescription({
      description: 'hello',
      linkableBulletedDescription: [{ text: 'teststring' }],
      richTextDescription: ['dontrender'],
    });
    expect(res.type).toEqual('ul');
  });

  it('should render a linkable bulleted description', () => {
    const res = getDescription({
      description: 'hello',
      linkableBulletedDescription: [{ link: 'teststring' }],
      richTextDescription: ['dontrender'],
    });
    const wrapper = shallow(res);
    expect(wrapper.find('Link')).toHaveLength(1);
  });

  it('tracks ShareBar clicks', () => {
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(<Opening {...props} />);
    wrapper
      .find('Opening__ShareBarWrapper')
      .simulate('click', 'facebook');
    expect(SocialTracker.track).toBeCalled();
  });

  it('should return image lead with feature flag', () => {
    const wrapper = shallow(
      <div>
        {
          getLoadableLiveblogLead({
            type: 'image',
            renditions: {
              original: {
                href: '',
              },
            },
            // remove this when feature flag is gone
          }, true)
        }
      </div>,
    );

    expect(wrapper
      .find('FullWidth').childAt(0)
      .prop('fullWidthSettings')).toEqual(['xxs', 'xs']);
  });

  it('should return video lead', () => {
    const wrapper = shallow(<div>{getLoadableLiveblogLead({ type: 'video' })}</div>);
    expect(wrapper
      .find('FullWidth').childAt(0)
      .prop('autoplay')).toBe(true);
  });

  it('should return LiveStream lead', () => {
    const wrapper = shallow(<div>{getLoadableLiveblogLead({ type: 'livestream' })}</div>);
    expect(wrapper
      .find('FullWidth').childAt(0)
      .prop('fullWidthSettings')).toEqual(['xxs', 'xs']);
  });

  it('should return null for unknown lead type', async () => {
    const lead = getLoadableLiveblogLead({ type: 'random' });
    expect(lead).toBe(null);
  });

  it('should map the store state to props', () => {
    const state = {
      liveBlog: {
        displayLeadMedia: true,
      },
    };
    expect(mapStateToProps(state, {})).toEqual(state.liveBlog);
  });

  it('should have isWorldCupMVP', async () => {
    jest.spyOn(features.deportes, 'isWorldCupMVP').mockImplementation(() => true);
    const wrapper = shallow(<Opening {...props} />);
    expect(wrapper.find('Opening__LabelWrapper').prop('isWorldCupMVP')).toBe(true);
  });

  it('should have televisa style', async () => {
    jest.spyOn(features.deportes, 'isWorldCupMVP').mockImplementation(() => false);
    features.televisa.isTelevisaSite = jest.fn(() => true);
    const wrapper = shallow(<Opening {...props} />);
    expect(wrapper.find('Opening__StyledContentHeader').prop('isTelevisaSite')).toBe(true);
  });
});

describe('Opening styles', () => {
  it('should have a contentHeader', () => {
    const container = styled.div`${Styles.container}`;
    expect(container.displayName).toEqual('LiveBlogOpeningspec__container');
  });

  it('should return isWorldCupMVP', () => {
    const Label = styled.div`${Styles.labelWrapper}`;
    const wrapper = mount(<Label isWorldCupMVP />);
    expect(wrapper.html()).toContain('LiveBlogOpeningspec__Label');
  });

  it('should return Televisa Style', () => {
    const Label = styled.div`${Styles.labelWrapper}`;
    const wrapper = mount(<Label isTelevisaSite />);
    expect(wrapper.html()).toContain('LiveBlogOpeningspec__Label');
  });

  it('should return label with isWorldCupMVP', () => {
    const Label = styled.div`${Styles.label}`;
    const wrapper = mount(<Label isWorldCupMVP />);
    expect(wrapper.html()).toContain('LiveBlogOpeningspec__Label');
  });

  it('should return label with televisa style', () => {
    const Label = styled.div`${Styles.label}`;
    const wrapper = mount(<Label isTelevisaSite />);
    expect(wrapper.html()).toContain('LiveBlogOpeningspec__Label');
  });

  it('should return contentHeader with isWorldCupMVP', () => {
    const StyledContentHeader = styled.div`${Styles.contentHeader}`;
    const wrapper = mount(<StyledContentHeader isWorldCupMVP />);
    expect(wrapper.html()).toContain('LiveBlogOpeningspec__StyledContentHeader');
  });

  it('should return contentHeader with televisa style', () => {
    const StyledContentHeader = styled.div`${Styles.contentHeader}`;
    const wrapper = mount(<StyledContentHeader isTelevisaSite />);
    expect(wrapper.html()).toContain('LiveBlogOpeningspec__StyledContentHeader');
  });

  it('shoudl return separator with isWorldCupMVP', () => {
    const Separator = styled.div`${Styles.separator}`;
    const wrapper = mount(<Separator isWorldCupMVP />);
    expect(wrapper.html()).toContain('LiveBlogOpeningspec__Separator');
  });
});
