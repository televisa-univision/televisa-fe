import React from 'react';
import { shallow } from 'enzyme';
import Nielsen from './Nielsen';

describe('Comscore', () => {
  const expected = {
    vars: {
      apid: 'DB44FE12-8611-4D9B-8C88-18023F94B474',
      apv: '1.0',
      apn: 'univision',
      section: 'article',
      segA: '',
      segB: 'noticias',
      segC: 'Google AMP',
    },
  };

  it('should render the tracking for nielsen', () => {
    const page = {
      data: {
        analyticsData: {
          web: {
            nielsen: {
              common: {
                assetid: '00000176-24a6-d081-a17e-3faeed6b0002',
                section: 'article',
                segB: 'noticias',
                type: 'static',
                vcid: 'c02',
              },
              contentSpecific: {
                segB: 'noticias',
              },
            },
          },
        },
        tracking: {
          nielsen: {
            appId: 'PDB44FE12-8611-4D9B-8C88-18023F94B474',
            environment: 'prod',
            primaryTopic: 'Noticias Univision',
            vcid: 'c02',
          },
        },
      },
      site: 'univision',
    };

    const wrapper = shallow(<Nielsen page={page} />);
    // eslint-disable-next-line no-underscore-dangle
    const tracking = JSON.parse(wrapper.children().prop('dangerouslySetInnerHTML').__html);
    expect(tracking).toEqual(expected);
  });

  it('should not crash when skipping page data', () => {
    const wrapper = shallow(<Nielsen />);
    // eslint-disable-next-line no-underscore-dangle
    const tracking = JSON.parse(wrapper.children().prop('dangerouslySetInnerHTML').__html);
    expect(tracking).toEqual({
      vars: {
        apid: '',
        apv: '1.0',
        segA: '',
        segB: '',
        segC: 'Google AMP',
      },
    });
  });
});
