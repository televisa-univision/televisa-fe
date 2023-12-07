// these filters are used in 404 page where used to extend page data
// in order to populate the search dropdowns.
// TODO: use syndicator to populate this data in the backend
export const dateFilters = [
  {
    code: 'today',
    label: 'Hoy',
  },
  {
    code: 'week',
    label: 'Esta Semana',
  },
  {
    code: 'month',
    label: 'Este Mes',
  },
  {
    code: 'year',
    label: 'Este Año',
  },
  {
    code: 'all',
    label: 'Cualquier Fecha',
  },
];

export const typeFilters = [
  {
    code: 'slideshow',
    label: 'Foto',
  },
  {
    code: 'video',
    label: 'Video',
  },
  {
    code: 'article',
    label: 'Artículo',
  },
];
