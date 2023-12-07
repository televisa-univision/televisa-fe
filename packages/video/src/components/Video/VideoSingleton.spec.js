import ReactDOM from 'react-dom';

jest.mock('@univision/fe-commons/dist/config/features', () => ({
  video: {
    isSingleVideoInstance: jest.fn(() => true),
  },
}));

const { VideoComponent } = require('.');

describe('Video singleton instance', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(VideoComponent, div);
  });
});
