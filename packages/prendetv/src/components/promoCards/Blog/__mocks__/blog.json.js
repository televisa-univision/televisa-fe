/**
 * @module PrendeTV Blog Promo Card mocks data
 */
const blog = {
  uid: '1',
  type: 'blogpromocardtype',
  headLine: null,
  contents: [
    {
      uid: '1',
      authors: [
        {
          fullName: 'author\'s name',
        },
      ],
      featuredTags: [
        {
          title: 'some tag',
        },
      ],
      publishDate: '2021-02-10T08:12:47-05:00',
      image: {
        renditions: {
          original: {
            href: 'href": "https://st1.uvnimg.com/3a/60/ff8a1c114b0cb94b76cf39d1fdaa/newversion.jpg',
          },
        },
      },
      title: 'Title of the article',
      description: 'Description of the article',
      uri: 'https://dev.prende.tv/noticias/heres-the-on-page-title',
    },
    {
      uid: '2',
      publishDate: '2021-02-10T08:12:47-05:00',
      image: {
        renditions: {
          original: {
            href: 'href": "https://st1.uvnimg.com/3a/60/ff8a1c114b0cb94b76cf39d1fdaa/newversion.jpg',
          },
        },
      },
      title: 'Another article',
      description: 'Description of this article',
      uri: 'https://dev.prende.tv/noticias/heres-the-on-page-title',
    },
  ],
};

export default blog;
