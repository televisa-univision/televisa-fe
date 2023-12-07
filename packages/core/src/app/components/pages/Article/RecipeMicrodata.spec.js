import React from 'react';
import { shallow } from 'enzyme';
// import { cloneDeep } from '@univision/fe-commons/dist/utils/helpers';
import RecipeMicrodata from './RecipeMicrodata';

let props;
beforeEach(() => {
  props = {
    data: {
      articleType: 'Standard',
      title: 'Title',
      description: 'Description',
      datePublished: '2018-07-09T20:37:07-04:00',
      image: {
        renditions: {
          original: {
            href: 'https://cdn1.uvnimg.com/0b/5f/eca68786466d9bca246d51c64d8b/7bea356aa55c436f96db7537865b21d5',
          }
        }
      },
      authors: [
        {
          type: 'person',
          title: 'Azul Alvarez',
        }
      ],
      lead: {
        title: 'Title',
        description: 'Description',
        uploadDate: '2018-07-09T20:37:07-04:00',
        expires: '2018-07-09T20:37:07-04:00',
        duration: '0:56',
        renditions: {
          original: {
            href: 'https://cdn3.uvnimg.com/dims4/default/1bdc0e0/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fcdn2.uvnimg.com%2F52%2F9e%2Fb3c59cc947dfba1afc559c027752%2Fgettyimages-803446228.jpg'
          }
        }
      },
      leadType: 'video',
      recipeData: {
        ingredients: ['With avocado', 'With pasta', 'With cheese'],
        cuisines: ['Mexican', 'Colombian', 'Venezuelian'],
        mealTypes: ['Salads', 'Soups', 'Snack'],
        yield: '10',
        preparationMinutes: 20,
        cookMinutes: 30,
        totalMinutes: 50,
        calories: 10,
        steps: [
          'Coloque las papas y el bacalao en una sartén con s…ción y cocinar a fuego medio por unos 10 minutos.',
          'Retire suavemente el bacalao, colóquelo sobre una …mpia o toallas de papel para absorber su humedad.',
          'Continúe cocinando las papas por otros 10 minutos …asa las papas por un triturador de papa. Reservar',
          'Desmenuce el bacalao en pedacitos pequeños con un … de alimentos hasta que quede escamoso y liviano.',
          'En un tazón agregue el bacalao, la cebolla, el ajo…porar los ingredientes. Ajuste la sal y pimienta.',
          'Su masa debe ser lo suficientemente gruesa como pa…o suave, simplemente agregue más bacalao o papas.',
          'Arma las croquetas y pásalas por el pan rallado.',
          'Fríe en abundante aceite hasta que estén doradas.'
        ],
        sections: [
          {
            name: 'Section 1',
            steps: ['Paso 1', 'Paso 2', 'Paso 3']
          },
          {
            name: 'Section 2',
            steps: []
          }
        ]
      },
      seo: {
        keywords: ['recetas', 'comida portuguesa', 'recetas fáciles', 'croquetas de bacalao'],
      }
    }
  };
});

describe('RecipeMicrodata', () => {
  it('should not render in client side', () => {
    const wrapper = shallow(<RecipeMicrodata {...props} />);
    expect(wrapper.find('script')).toHaveLength(0);
  });

  it('should render correctly is SSR', () => {
    delete global.window;
    const wrapper = shallow(<RecipeMicrodata {...props} />);
    expect(wrapper.find('script')).toHaveLength(1);
  });

  it('should not render in SSR if have empty page data', () => {
    delete global.window;
    const emptyData = {};
    const wrapper = shallow(<RecipeMicrodata data={emptyData} />);
    expect(wrapper.find('script')).toHaveLength(0);
  });

  it('should not render in SSR if have empty recipe data', () => {
    delete global.window;
    delete props.data.recipeData;
    const wrapper = shallow(<RecipeMicrodata {...props} />);
    expect(wrapper.find('script')).toHaveLength(0);
  });

  it('should render the available data', () => {
    delete global.window;
    props.data.recipeData.ingredients = [];
    props.data.recipeData.cuisines = [];
    props.data.recipeData.mealTypes = [];
    props.data.recipeData.yield = null;
    props.data.recipeData.preparationTime = null;
    props.data.recipeData.cookTime = null;
    props.data.recipeData.totalTime = null;
    props.data.recipeData.calories = null;
    props.data.recipeData.sections = [];
    props.data.recipeData.steps = [];
    let wrapper = shallow(<RecipeMicrodata {...props} />);
    expect(wrapper.find('script')).toHaveLength(1);

    delete props.data.authors;
    delete props.data.seo;
    delete props.data.lead;
    wrapper = shallow(<RecipeMicrodata {...props} />);
    expect(wrapper.find('script')).toHaveLength(1);
  });
});
