import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';

import AmpRawHtml from '../../AmpRawHtml';
import Article from '.';

const store = configureStore();

jest.mock('./ArticleBody', () => () => <div />);
jest.mock('../../Header', () => () => <div>header</div>);
jest.mock('../../ShareBar', () => () => <div>ShareBar</div>);
jest.mock('../../../contentTypes/Article/ArticleMetadata.js', () => () => <div />);

describe('Article test', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Article pageData={{ theme: {} }} /></Provider>, div);
  });

  it('renders an AmpRawHtml', () => {
    const body = [{
      type: 'text',
      value: '<p><b>Botafogo</b> anunció la contratación del marfileño de 34 años, <b>Salomon Kalou</b>, quien llega procedente del <b>Hertha Berlín</b> de Alemania.</p>',
    }];
    const props = { pageData: { requestParams: { articleRawHtml: '0' }, data: { body } } };
    const wrapper = shallow(<Article {...props} />);
    expect(wrapper.find(AmpRawHtml)).toHaveLength(1);
  });

  it('should render RecipeMicrodata if the articleType is Recipe', () => {
    const props = { pageData: { theme: {}, data: { articleType: 'recipe', recipeData: { steps: [] } } } };
    const wrapper = shallow(<Article {...props} />).dive();
    expect(wrapper.find('RecipeMicrodata')).toHaveLength(1);
  });
});
