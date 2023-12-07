import React from 'react';
import { shallow, mount } from 'enzyme';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import features from '@univision/fe-commons/dist/config/features';
import LocalStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import Label from '../Label';
import { CONECTA } from './constants/contentCard';
import ContentCard from '.';

storeHelpers.getPageData = jest.fn();

jest.mock('../Picture', () => 'Picture');

/**
 * Mocked content items for test
 * @type {Array}
 */
let contentItems = [];
let mockPageData = {};

beforeEach(() => {
  contentItems = [{
    uid: '00000158-fa34-dc94-a979-fbfeab7f0000',
    uri: 'http://poc.dev.y.univision.com/shows/la-banda/asi-estuvo-el-detras-de-camaras-del-final-de-la-banda-2016-video',
    type: 'video',
    language: 'es',
    versionCreated: '2016-12-13T19:03:46-05:00',
    title: 'Así estuvo el detrás de cámaras del final de La Banda 2016',
    shortTitle: 'Así estuvo el detrás de cámaras del final de La Banda 2016',
    description: 'Así se preparó la final más esperada de la segunda temporada de La Banda. Los ensayos, los nervios y cómo se armó este espectacular show.',
    shortDescription: 'Así se preparó la final más esperada de la segunda temporada de La Banda. Los ensayos, los nervios y cómo se armó este espectacular show.',
    image: {
      renditions: {
        original: {
          href: 'http://univision-bs.s3.amazonaws.com/78/b9/a1b4dbb04bf08851a23d523306eb/47218d2d5ad84fe583915a1bc5dbabfe',
          width: 1920,
          height: 1080,
        },
        '16x9': {
          href: 'http://poc.dev.univision.psdops.com/dims4/default/50341be/2147483647/thumbnail/1240x698/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F78%2Fb9%2Fa1b4dbb04bf08851a23d523306eb%2F47218d2d5ad84fe583915a1bc5dbabfe',
          width: 1240,
          height: 698,
        },
        '16x9-extended': {
          href: 'http://poc.dev.univision.psdops.com/dims4/default/f6def6d/2147483647/thumbnail/1440x810/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F78%2Fb9%2Fa1b4dbb04bf08851a23d523306eb%2F47218d2d5ad84fe583915a1bc5dbabfe',
          width: 1440,
          height: 810,
        },
        '16x9-med': {
          href: 'http://poc.dev.univision.psdops.com/dims4/default/5bfe5be/2147483647/thumbnail/400x225/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F78%2Fb9%2Fa1b4dbb04bf08851a23d523306eb%2F47218d2d5ad84fe583915a1bc5dbabfe',
          width: 400,
          height: 225,
        },
        '16x9-mobile': {
          href: 'http://poc.dev.univision.psdops.com/dims4/default/b2c42c7/2147483647/thumbnail/480x270/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F78%2Fb9%2Fa1b4dbb04bf08851a23d523306eb%2F47218d2d5ad84fe583915a1bc5dbabfe',
          width: 480,
          height: 270,
        },
        '16x9-sm': {
          href: 'http://poc.dev.univision.psdops.com/dims4/default/012c2f8/2147483647/thumbnail/246x138/quality/75/?url=http%3A%2F%2Funivision-bs.s3.amazonaws.com%2F78%2Fb9%2Fa1b4dbb04bf08851a23d523306eb%2F47218d2d5ad84fe583915a1bc5dbabfe',
          width: 246,
          height: 138,
        },
      },
    },
    primaryTag: {
      name: 'Programas',
      link: 'http://qa.x.univision.com/temas/programas',
    },
    primaryTopic: 'Programas',
    theme: {
      primary: '#000',
    },
    isAnchor: true,
  },
  {
    uid: '00000158-fa34-dc94-a979-fbfeab7f0000',
    uri: 'http://poc.dev.y.univision.com/shows/la-banda/asi-estuvo-el-detras-de-camaras-del-final-de-la-banda-2016-video',
    type: 'article',
    leadType: 'livestream',
    videoType: 'livestream',
    language: 'es',
    versionCreated: '2016-12-13T19:03:46-05:00',
    title: 'Así estuvo el detrás de cámaras del final de La Banda 2016',
    shortTitle: 'Así estuvo el detrás de cámaras del final de La Banda 2016',
    description: 'Así se preparó la final más esperada de la segunda temporada de La Banda. Los ensayos, los nervios y cómo se armó este espectacular show.',
    shortDescription: 'Así se preparó la final más esperada de la segunda temporada de La Banda. Los ensayos, los nervios y cómo se armó este espectacular show.',
    image: {
      renditions: {},
    },
    primaryTag: {
      name: 'Programas',
      link: 'http://qa.x.univision.com/temas/programas',
    },
    primaryTopic: 'Programas',
    isAnchor: false,
  },
  {
    uid: '00000158-fa34-dc94-a979-fbfeab7f0000',
    uri: 'http://poc.dev.y.univision.com/shows/la-banda/asi-estuvo-el-detras-de-camaras-del-final-de-la-banda-2016-video',
    type: 'article',
    leadType: 'image',
    language: 'es',
    versionCreated: '2016-12-13T19:03:46-05:00',
    title: 'esto es un articulo con lead de imagen',
    shortTitle: 'asi que el icon de video no deberia verse',
    description: 'si se ve tenemos un problema.',
    shortDescription: 'y debemos salir del chamaco que escribio ese codigo.',
    image: {
      renditions: {},
    },
    primaryTag: {
      name: 'Programas',
      link: 'http://qa.x.univision.com/temas/programas',
    },
    primaryTopic: 'Programas',
  },
  {
    type: 'show',
    uri: '/shows/por-amar-sin-ley',
    title: 'Por Amar Sin Ley',
    description: 'En el bufete \'Vega y Asociados\' está de regreso. El mejor equipo de abogados lucha por hacer justicia, ellos son Ricardo, Leonardo, Roberto, Olivia, Victoria, Benjamín y Leticia, liderados por el prestigioso abogado Alonso Vega. Es aquí donde se unen sus historias personales con cada uno de los casos que defienden.',
    image: {
      renditions: {},
    },
    airTime: 'PROXIMAMENTE',
    publishDate: '2018-02-15T15:23:27-05:00',
  },
  {
    type: 'section',
    uid: '0000016e-a8ab-d1e2-a57f-febf98620000',
    uri: '/promo-participa-conecta-ex-1',
    title: 'Por Amar Sin Ley',
    description: 'En el bufete \'Vega y Asociados\' está de regreso. El mejor equipo de abogados lucha por hacer justicia, ellos son Ricardo, Leonardo, Roberto, Olivia, Victoria, Benjamín y Leticia, liderados por el prestigioso abogado Alonso Vega. Es aquí donde se unen sus historias personales con cada uno de los casos que defienden.',
    image: {
      renditions: {},
    },
    schedule: {
      feedConsumer: null,
      image: {
        type: 'image',
        title: 'source.gif',
        renditions: {
          original: {
            href: 'https://uvn-brightspot-lower.s3.amazonaws.com/22/4c/8fb0be24426ab75b8debb8c1f297/source.gif',
            width: 608,
            height: 456,
          },
          '16x9-med': {
            href: 'https://uat.uvn.psdops.com/dims4/default/e3dfc5a/2147483647/thumbnail/400x225/quality/75/format/jpg/?url=https%3A%2F%2Fuvn-brightspot-lower.s3.amazonaws.com%2F22%2F4c%2F8fb0be24426ab75b8debb8c1f297%2Fresizes%2F500%2Fsource.gif',
            width: 400,
            height: 225,
          },
          '16x9': {
            href: 'https://uat.uvn.psdops.com/dims4/default/ec40086/2147483647/thumbnail/1240x698/quality/75/format/jpg/?url=https%3A%2F%2Fuvn-brightspot-lower.s3.amazonaws.com%2F22%2F4c%2F8fb0be24426ab75b8debb8c1f297%2Fsource.gif',
            width: 1240,
            height: 698,
          },
          '16x9-mobile': {
            href: 'https://uat.uvn.psdops.com/dims4/default/1de35a8/2147483647/thumbnail/480x270/quality/75/format/jpg/?url=https%3A%2F%2Fuvn-brightspot-lower.s3.amazonaws.com%2F22%2F4c%2F8fb0be24426ab75b8debb8c1f297%2Fresizes%2F500%2Fsource.gif',
            width: 480,
            height: 270,
          },
          '16x9-sm': {
            href: 'https://uat.uvn.psdops.com/dims4/default/a523784/2147483647/thumbnail/246x138/quality/75/format/jpg/?url=https%3A%2F%2Fuvn-brightspot-lower.s3.amazonaws.com%2F22%2F4c%2F8fb0be24426ab75b8debb8c1f297%2Fresizes%2F500%2Fsource.gif',
            width: 246,
            height: 138,
          },
          '16x9-tablet': {
            href: 'https://uat.uvn.psdops.com/dims4/default/38bc2bb/2147483647/thumbnail/1024x576%3E/quality/75/format/jpg/?url=https%3A%2F%2Fuvn-brightspot-lower.s3.amazonaws.com%2F22%2F4c%2F8fb0be24426ab75b8debb8c1f297%2Fsource.gif',
            width: 1024,
            height: 576,
          },
          '16x9-extended': {
            href: 'https://uat.uvn.psdops.com/dims4/default/bc5ac17/2147483647/thumbnail/1440x810/quality/75/format/jpg/?url=https%3A%2F%2Fuvn-brightspot-lower.s3.amazonaws.com%2F22%2F4c%2F8fb0be24426ab75b8debb8c1f297%2Fsource.gif',
            width: 1440,
            height: 810,
          },
          '16x9-loading': {
            href: 'https://uat.uvn.psdops.com/dims4/default/4ebc17b/2147483647/thumbnail/30x17/quality/75/format/jpg/?url=https%3A%2F%2Fuvn-brightspot-lower.s3.amazonaws.com%2F22%2F4c%2F8fb0be24426ab75b8debb8c1f297%2Fresizes%2F500%2Fsource.gif',
            width: 30,
            height: 17,
          },
        },
      },
      schedules: [
        {
          pauseEvent: false,
          daysToGoLive: [
            'SATURDAY',
          ],
          startTime: '1:00:00',
          startMeridiem: 'AM',
          endTime: '2:00:00',
          endMeridiem: 'AM',
          timeZone: 'US/Eastern',
          startDate: 1575409305689,
          endDate: 1575502905689,
        },
      ],
    },
  }];

  mockPageData = {
    data: {
      primaryTag: {
        name: 'Programas',
        link: 'http://qa.x.univision.com/temas/programas',
      },
    },
  };
});

/** @test {ContentCard} */
describe('Content Card Spec', () => {
  it('should render the description', () => {
    const wrapper = shallow(<ContentCard {...contentItems[0]} />);
    expect(wrapper.dive().find('Title')).toBeDefined();
  });
  it('should render image', () => {
    const wrapper = shallow(<ContentCard {...contentItems[0]} />);
    expect(wrapper.dive().find('Picture').length).toBe(1);
    contentItems[0].image = undefined;
    wrapper.setProps(contentItems[0]);
    expect(wrapper.dive().find('Picture').length).toBe(1);
  });
  it('should render image if string', () => {
    contentItems[0].image = 'image.jpg';
    const wrapper = shallow(<ContentCard {...contentItems[0]} />);
    expect(wrapper.dive().find('Picture').props().overrideImageUrl).toEqual('image.jpg');
  });
  it('should render number', () => {
    const wrapper = shallow(<ContentCard {...contentItems[0]} number={1} />);
    expect(wrapper.dive().find('.cardNumber')).toHaveLength(1);
  });
  it('should get each type of icon', () => {
    contentItems[0].type = 'reactionslideshow';
    const wrapper = shallow(<ContentCard showPlayer={false} {...contentItems[0]} />);
    expect(wrapper.dive().find('IconWrapper').prop('iconName')).toEqual('slideshow');
  });
  it('should get video icon for articles with leadType=video', () => {
    const wrapper = shallow(<ContentCard {...contentItems[1]} />);
    expect(wrapper.dive().find('IconWrapper').prop('iconName')).toEqual('article');
  });
  it('should get video player when showPlayer=true', () => {
    const wrapper = shallow(<ContentCard showPlayer {...contentItems[1]} />);
    expect(wrapper.dive().find(VideoPlayer)).toHaveLength(1);
  });
  it('should render description', () => {
    const wrapper = shallow(<ContentCard showDesc {...contentItems[0]} />);
    expect(wrapper.dive().find('.description').length).toBe(1);
  });
  it('should render customIcon', () => {
    const customIcon = <div className="icon">Icon</div>;
    const wrapper = shallow(<ContentCard customIcon={customIcon} {...contentItems[0]} />);
    expect(wrapper.dive().find('.icon').length).toBe(1);
  });
  it('should render secondary label', () => {
    const secLabel = <div className="myLabel">My Label</div>;
    const wrapper = shallow(<ContentCard secLabel={secLabel} {...contentItems[0]} />);
    expect(wrapper.dive().find('.secondaryLabelWrapper').length).toBe(1);
  });
  it('should render FullWidth for main image on mobile', () => {
    const wrapper = shallow(<ContentCard {...contentItems[0]} isMain />);
    expect(wrapper.dive().find('FullWidth').length).toBe(1);
  });
  it('should render duration', () => {
    const props = {
      showInPlaylist: true,
      durationInImage: false,
      isMain: true,
    };
    contentItems[0].duration = '1:00';
    const wrapper = shallow(<ContentCard {...contentItems[0]} {...props} />);
    expect(wrapper.dive().find('DurationLabel').length).toBe(1);
  });
  it('should render duration', () => {
    const props = {
      showInPlaylist: true,
      durationInImage: true,
      isMain: true,
    };
    contentItems[0].duration = '1:00';
    const wrapper = shallow(<ContentCard {...contentItems[0]} {...props} />);
    expect(wrapper.dive().find('DurationLabel').length).toBe(1);
  });
  it('should pass author prop if authors array is defined using `title`', () => {
    const authors = [{
      title: 'Author Name',
    }];

    const content = {
      ...contentItems[0],
      authors,
    };

    const wrapper = shallow(<ContentCard {...content} />);
    expect(wrapper.dive().find('Author')).toHaveLength(1);
    expect(wrapper.props()).toHaveProperty('authors', authors);
  });
  it('should pass author prop if authors array is defined using `fullName`', () => {
    const authors = [{
      title: null,
      fullName: 'Author Name',
    }];

    const content = {
      ...contentItems[0],
      authors,
    };

    const wrapper = shallow(<ContentCard {...content} />);
    expect(wrapper.dive().find('Author')).toHaveLength(1);
    expect(wrapper.props()).toHaveProperty(`${authors[0].fullName}`, authors.fullName);
  });
  it('should render author', () => {
    const authors = [{
      title: null,
      fullName: null,
    }];

    const content = {
      ...contentItems[0],
      authors,
      author: 'Author Name',
    };

    const wrapper = shallow(<ContentCard {...content} />);
    expect(wrapper.dive().find('Author').props()).toHaveProperty('fullName', content.author);
  });
  it('should render a list number if `showNumberOnly` is true', () => {
    const content = {
      ...contentItems[0],
      showNumberOnly: true,
    };
    const wrapper = shallow(<ContentCard {...content} />);
    expect(wrapper.dive().find('.listNumber')).toHaveLength(1);
  });
  it('should render a Tag when `tag` exist and `showInPlaylist` is true', () => {
    const wrapper = shallow(<ContentCard tag="test" showInPlaylist />);
    expect(wrapper.dive().find('Tag')).toHaveLength(1);
    expect(wrapper.dive().find('Tag').props()).toHaveProperty('name', 'test');
  });

  it('should not display tag if no primary tag available', () => {
    const content = {
      ...contentItems[0],
      primaryTag: null,
    };
    const wrapper = shallow(<ContentCard {...content} />);
    expect(wrapper.dive().find('Label')).toHaveLength(0);
  });
  it('should not display tag if primary tag of the page is the same as the content but no secondary tags available', () => {
    const content = {
      ...contentItems[0],
    };
    storeHelpers.getPageData.mockReturnValueOnce(mockPageData);
    const wrapper = shallow(<ContentCard {...content} />);
    expect(wrapper.dive().find('Label')).toHaveLength(0);
  });
  it('should not display tag if type is soccermatch', () => {
    const content = {
      ...contentItems[0],
      type: 'soccermatch',
    };
    storeHelpers.getPageData.mockReturnValueOnce(mockPageData);
    const wrapper = shallow(<ContentCard {...content} />);
    expect(wrapper.dive().find('Label')).toHaveLength(0);
  });
  it('should display airTime if type is show', () => {
    const wrapper = shallow(<ContentCard {...contentItems[3]} />);
    expect(wrapper.prop('airTime')).toBe('PROXIMAMENTE');
    expect(wrapper.dive().find('.airTime')).toHaveLength(1);
  });
  it('should render a live label if contentPriority=breaking_news', () => {
    const content = {
      ...contentItems[1],
      contentPriority: 'breaking_news',
    };
    const wrapper = shallow(<ContentCard {...content} labelSize="small" />).dive();
    expect(wrapper.find(Label).exists()).toBe(true);
  });
  it('should not render a live label if contentPriority=breaking_news and it is a top lead', () => {
    const content = {
      ...contentItems[1],
      contentPriority: 'breaking_news',
      isLead: true,
    };
    const wrapper = shallow(<ContentCard {...content} />).dive();
    expect(wrapper.find(Label).exists()).toBe(true);
  });

  it('should have the color of the vertical if the user is in home', () => {
    const content = {
      ...contentItems[3],
      number: 1,
    };
    storeHelpers.getPageData.mockReturnValueOnce({
      data: {
        ...mockPageData,
        vertical: 'Global',
      },
    });
    const wrapper = shallow(<ContentCard {...content} />);
    expect(wrapper.dive().find('.cardNumber').first().prop('style').background).toEqual('#3a3a3a');
  });

  it('should have the color dark', () => {
    const content = {
      ...contentItems[3],
      number: 1,
      variant: 'dark',
    };
    features.shows.showsRedesign = jest.fn();
    features.shows.showsRedesign.mockReturnValueOnce(true);
    const wrapper = shallow(<ContentCard {...content} />);
    expect(wrapper.dive().find('.cardNumber').first().prop('style').background).toEqual('#808080');
  });

  it('should card width schedules', () => {
    const wrapper = shallow(<ContentCard {...contentItems[4]} />);
    expect(wrapper.dive().find('Picture').length).toBe(1);
  });
});

describe('With labels', () => {
  it('should render "PARTICIPA" label', () => {
    const content = {
      ...contentItems[0],
      feedConsumer: CONECTA,
    };
    features.shows.showsRedesign = jest.fn();
    features.shows.showsRedesign.mockReturnValueOnce(true);
    let wrapper = shallow(<ContentCard {...content} />).dive();
    expect(wrapper.find('.label').prop('label')).toBe(localization.get('vote'));
    wrapper = shallow(<ContentCard {...content} view="horizontal" />).dive();
    expect(wrapper.find('.label').prop('label')).toBe(localization.get('vote'));
  });

  it('should render "NUEVO" label in Playlist', () => {
    const content = {
      ...contentItems[0],
      longform: true,
      authRequired: true,
      hasNewLabel: true,
      showInPlaylist: true,
      variant: 'dark',
    };
    let wrapper = shallow(<ContentCard {...content} />).dive();
    expect(wrapper.find('.label').prop('label')).toBe('Nuevo');
    expect(wrapper.find('.longform')).toHaveLength(0);

    wrapper = shallow(<ContentCard {...content} view="horizontal" />).dive();
    expect(wrapper.find('.label').prop('label')).toBe('Nuevo');
    expect(wrapper.find('.longform')).toHaveLength(0);
  });

  it('should render "NUEVO" label', () => {
    const content = {
      ...contentItems[0],
      longform: true,
      authRequired: true,
      hasNewLabel: true,
    };
    let wrapper = shallow(<ContentCard {...content} />).dive();
    expect(wrapper.find('.label').prop('label')).toBe('Nuevo');
    expect(wrapper.find('.longform')).toHaveLength(1);

    wrapper = shallow(<ContentCard {...content} view="horizontal" />).dive();
    expect(wrapper.find('.label').prop('label')).toBe('Nuevo');
    expect(wrapper.find('.longform')).toHaveLength(1);
  });

  it('should not render any label for no new/auth required episode', () => {
    const content = {
      ...contentItems[0],
      longform: true,
      authRequired: true,
      hasNextEpisode: true,
    };
    const wrapper = shallow(<ContentCard {...content} />).dive();
    expect(wrapper.find('.label')).toHaveLength(0);
  });

  it('should render "GRATIS" label', () => {
    const content = {
      ...contentItems[0],
      longform: true,
      authRequired: false,
      hasNextEpisode: true,
    };
    let wrapper = shallow(<ContentCard {...content} />).dive();
    expect(wrapper.find('.label').prop('label')).toBe('Gratis');
    expect(wrapper.find('.longform')).toHaveLength(1);

    wrapper = shallow(<ContentCard {...content} view="horizontal" />).dive();
    expect(wrapper.find('.label').prop('label')).toBe('Gratis');
    expect(wrapper.find('.longform')).toHaveLength(1);
  });

  it('should render "GRATIS" label in Playlist', () => {
    const content = {
      ...contentItems[0],
      longform: true,
      authRequired: false,
      hasNextEpisode: true,
      showInPlaylist: true,
    };
    let wrapper = shallow(<ContentCard {...content} />).dive();
    expect(wrapper.find('.label').prop('label')).toBe('Gratis');
    expect(wrapper.find('.longform')).toHaveLength(0);

    wrapper = shallow(<ContentCard {...content} view="horizontal" />).dive();
    expect(wrapper.find('.label').prop('label')).toBe('Gratis');
    expect(wrapper.find('.longform')).toHaveLength(0);
  });

  it('should add the iconContent when it exists', () => {
    contentItems[0].type = 'reactionslideshow';
    const content = {
      ...contentItems[0],
      iconContent: '20',
    };
    const wrapper = mount(<ContentCard {...content} showIcon />);
    expect(wrapper.find('IconWrapper').at(0).props()).toHaveProperty('content', content.iconContent);
  });

  it('should render a live label if type=liveblog', () => {
    const content = {
      ...contentItems[0],
      type: 'liveblog',
    };
    let wrapper = shallow(<ContentCard {...content} />).dive();
    expect(wrapper.find(Label)).toHaveLength(1);

    wrapper = shallow(<ContentCard {...content} view="horizontal" />).dive();
    expect(wrapper.find(Label)).toHaveLength(1);
  });

  it('should render a live label and the play button if leadType=livestream', () => {
    const content = {
      ...contentItems[0],
      type: 'article',
      leadType: 'livestream',
    };
    let wrapper = shallow(<ContentCard {...content} />).dive();
    expect(wrapper.find(Label)).toHaveLength(1);

    wrapper = shallow(<ContentCard {...content} view="horizontal" />).dive();
    expect(wrapper.find(Label)).toHaveLength(1);
  });

  it('should render a live label if videoType=livestream', () => {
    const content = {
      ...contentItems[0],
      videoType: 'livestream',
    };
    let wrapper = shallow(<ContentCard {...content} />).dive();
    expect(wrapper.find(Label)).toHaveLength(1);

    wrapper = shallow(<ContentCard {...content} view="horizontal" />).dive();
    expect(wrapper.find(Label)).toHaveLength(1);
  });
});

describe('tracking', () => {
  it('should track clicks on the Content Card', () => {
    const wrapper = shallow(<ContentCard {...contentItems[0]} widgetContext={{ type: 'test' }} />);
    const expectedCall = {
      target: 'content',
      contentTitle: 'Así estuvo el detrás de cámaras del final de La Banda 2016',
      contentUid: '00000158-fa34-dc94-a979-fbfeab7f0000',
      widgetContext: { type: 'test' },
    };
    spyOn(WidgetTracker, 'track');
    wrapper.dive().find('.link').simulate('click');
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), expectedCall);
  });

  it('should track clicks and fire the callback, if any', () => {
    const onClick = jest.fn();
    const expectedCall = {
      target: 'content',
      contentTitle: 'Así estuvo el detrás de cámaras del final de La Banda 2016',
      contentUid: '00000158-fa34-dc94-a979-fbfeab7f0000',
      widgetContext: { type: 'test' },
    };
    const wrapper = shallow(<ContentCard {...contentItems[0]} widgetContext={{ type: 'test' }} onClick={onClick} />);
    spyOn(WidgetTracker, 'track');
    wrapper.dive().find('.link').simulate('click');
    expect(WidgetTracker.track).toHaveBeenLastCalledWith(expect.any(Function), expectedCall);
    expect(onClick).toHaveBeenCalled();
  });

  it('should not track VideoPlayer', () => {
    const wrapper = shallow(<ContentCard {...contentItems[0]} showPlayer widgetContext={{ name: 'Test' }} />);
    spyOn(WidgetTracker, 'track');
    wrapper.dive().find(VideoPlayer).simulate('click');
    expect(WidgetTracker.track).not.toHaveBeenCalled();
  });
});

describe('video progress bar', () => {
  it('should load the video history data', () => {
    features.video.enableResume = jest.fn(() => true);
    LocalStorage.setMultiObject('videoHistory', 123, {
      currentTime: 25,
      duration: 100,
    });
    contentItems[0].mcpid = 123;
    const wrapper = mount(<ContentCard {...contentItems[0]} />);
    expect(wrapper.find('ProgressBar')).toHaveLength(1);
  });
});
