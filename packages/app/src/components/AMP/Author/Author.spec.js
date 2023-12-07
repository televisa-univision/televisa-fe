import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import {
  AuthorsContainer, PublishDate, SingleAuthorContainer, Sponsor,
} from './Author.styles';
import AmpAuthor from '.';

let props;
beforeEach(() => {
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

/** @test {AmpAuthor} */
describe('AmpAuthor ', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AmpAuthor {...props} />, div);
  });

  it('should render the author image if available', () => {
    const wrapper = mount(<AmpAuthor {...props} tempAuthors={null} />);
    expect(wrapper.find('Authorstyles__AuthorAvatar')).toHaveLength(1);
  });

  it('should render the author if available', () => {
    const wrapper = shallow(<AmpAuthor {...props} tempAuthors={null} />);
    expect(wrapper.find(SingleAuthorContainer).length).toEqual(1);
  });

  it('should render the one temp author if no others available', () => {
    const wrapper = shallow(<AmpAuthor {...props} authors={null} />);
    expect(wrapper.find(SingleAuthorContainer).length).toEqual(1);
  });

  it('should render multiple Authors if available', () => {
    const wrapper = shallow(<AmpAuthor
      tempAuthors={null}
      authors={[{
        uid: '534',
        title: 'test',
      }, {
        uid: '284',
        title: 'test',
      }]}
      date=" "
    />);
    expect(wrapper.find(SingleAuthorContainer).length).toEqual(2);
  });

  it('should render one Author ', () => {
    const wrapper = shallow(<AmpAuthor
      tempAuthors={null}
      authors={[{
        uid: '534',
        title: 'test',
      }]}
      date=" "
    />);
    expect(wrapper.find(SingleAuthorContainer).length).toEqual(1);
  });

  it('should render multiple temp Authors if available', () => {
    const wrapper = shallow(<AmpAuthor
      authors={null}
      tempAuthors={[{
        uid: '534',
        fullName: 'test',
      }, {
        uid: '284',
        fullName: 'test',
      }]}
      date=" "
    />);
    expect(wrapper.find(SingleAuthorContainer).length).toEqual(2);
  });

  it('should render no temp Authors if array is empty', () => {
    const wrapper = shallow(<AmpAuthor
      tempAuthors={[]}
      authors={[{
        uid: '534',
        fullName: 'test',
      }, {
        uid: '284',
        fullName: 'test',
      },
      {
        uid: '285',
        fullName: 'test',
      }]}
      date=" "
    />);
    expect(wrapper.find(SingleAuthorContainer).length).toEqual(3);
  });

  it('should render no authors if array is empty', () => {
    const wrapper = shallow(<AmpAuthor
      authors={[]}
      tempAuthors={[{
        uid: '534',
        fullName: 'test',
      }, {
        uid: '284',
        fullName: 'test',
      }]}
      date=" "
    />);
    expect(wrapper.find(SingleAuthorContainer).length).toEqual(2);
  });

  it('should render no authors', () => {
    const wrapper = shallow(<AmpAuthor
      tempAuthors={[]}
      authors={null}
      date=" "
    />);
    expect(wrapper.find(SingleAuthorContainer).length).toEqual(0);
  });

  it('should render source if author is not available', () => {
    const wrapper = shallow(<AmpAuthor authors={null} tempAuthors={null} source="Univision" />);
    expect(wrapper.find(SingleAuthorContainer).length).toEqual(1);
  });

  it('render container even if no authors are present showing the date', () => {
    const wrapper = shallow(<AmpAuthor
      authors={[]}
      tempAuthors={[]}
      source={null}
      date=" "
    />);
    expect(wrapper.find(AuthorsContainer).length).toBe(1);
    expect(wrapper.find(PublishDate).length).toBe(1);
  });

  it('should render a sponsored author image only', () => {
    const wrapper = shallow(<AmpAuthor
      authors={[]}
      tempAUthors={[]}
      source={null}
      sponsor={{ image: { renditions: { original: { href: 'href' } } } }}
      date=" "
    />);
    expect(wrapper.find(Sponsor)).toHaveLength(1);
  });

  it('should render a sponsored author image with link', () => {
    const wrapper = shallow(<AmpAuthor
      authors={[]}
      tempAUthors={[]}
      source={null}
      sponsor={{ image: { renditions: { original: 'href' } }, link: { href: 'href' } }}
      date=" "
    />);
    expect(wrapper.find(Sponsor).find('a')).toHaveLength(1);
  });

  it('should render a sponsored author image AND one author', () => {
    const wrapper = shallow(<AmpAuthor
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
    />);
    expect(wrapper.find(Sponsor)).toHaveLength(1);
    expect(wrapper.find(SingleAuthorContainer).length).toEqual(1);
  });

  it('should render a sponsored author image AND multiple authors', () => {
    const wrapper = shallow(<AmpAuthor
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
    />);
    expect(wrapper.find(Sponsor)).toHaveLength(1);
    expect(wrapper.find(SingleAuthorContainer).length).toEqual(2);
  });

  it('should render an update date when the flag is on and the update date is available', () => {
    let wrapper = shallow(<AmpAuthor
      {...props}
      updateDate={new Date().toISOString()}
      showUpdateDate
    />);
    expect(wrapper.find('meta[itemProp="dateUpdated"]')).toHaveLength(1);

    wrapper = shallow(<AmpAuthor
      {...props}
      updateDate={new Date().toISOString()}
    />);
    expect(wrapper.find('meta[itemProp="dateUpdated"]')).toHaveLength(0);

    wrapper = shallow(<AmpAuthor
      {...props}
      updateDate=""
      showUpdateDate
    />);
    expect(wrapper.find('meta[itemProp="dateUpdated"]')).toHaveLength(0);
  });

  it('should be able to render an inline date for multiple authors', () => {
    const wrapper = shallow(<AmpAuthor
      {...props}
      inlineDate
    />);

    expect(wrapper.find(PublishDate).exists()).toBe(true);
  });

  it('should be able to render an inline date for a single author', () => {
    const wrapper = shallow(<AmpAuthor
      {...props}
      inlineDate
      tempAuthors={[]}
    />);

    expect(wrapper.find(PublishDate).exists()).toBe(true);
  });
});
