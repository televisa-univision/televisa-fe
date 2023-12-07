const signs = [{
  name: 'Aries',
  value: 'aries',
}, {
  name: 'Tauro',
  value: 'tauro',
}, {
  name: 'Géminis',
  value: 'geminis',
}, {
  name: 'Cáncer',
  value: 'cancer',
}, {
  name: 'Leo',
  value: 'leo',
}, {
  name: 'Virgo',
  value: 'virgo',
}, {
  name: 'Libra',
  value: 'libra',
}, {
  name: 'Escorpión',
  value: 'escorpion',
}, {
  name: 'Sagitario',
  value: 'sagitario',
}, {
  name: 'Capricornio',
  value: 'capricornio',
}, {
  name: 'Acuario',
  value: 'acuario',
}, {
  name: 'Piscis',
  value: 'Piscis',
}];

const pairings = {
  'acuario:acuario': '/entretenimiento/horoscopos/acuario-con-acuario-relacion-alocada-e-imprevisible',
  'acuario:aries': '/entretenimiento/horoscopos/aries-con-acuario-relacion-imprevisible-e-insolita',
  'acuario:cancer': '/entretenimiento/horoscopos/cancer-con-acuario-relacion-tensa',
  'acuario:capricornio': '/entretenimiento/horoscopos/capricornio-con-acuario-relacion-de-conflictos-constantes',
  'acuario:escorpion': '/entretenimiento/horoscopos/escorpion-con-acuario-relacion-agitada',
  'acuario:geminis': '/entretenimiento/horoscopos/geminis-con-acuario-relacion-divertida',
  'acuario:leo': '/entretenimiento/horoscopos/leo-con-acuario-una-relacion-de-signos-opuestos-explosiva-y-divertida',
  'acuario:libra': '/entretenimiento/horoscopos/libra-con-acuario-relacion-dinamica',
  'acuario:piscis': '/entretenimiento/horoscopos/acuario-con-piscis-relacion-de-conceptos-diferentes',
  'acuario:tauro': '/entretenimiento/horoscopos/tauro-con-acuario-una-relacion-con-inquietudes',
  'acuario:sagitario': '/entretenimiento/horoscopos/sagitario-con-acuario-relacion-divertida-y-espontanea',
  'acuario:virgo': '/entretenimiento/horoscopos/virgo-con-acuario-una-relacion-complicada',

  'aries:aries': '/entretenimiento/aries/aries-vs-aries',
  'aries:cancer': '/entretenimiento/horoscopos/aries-con-cancer-relacion-de-choques-de-personalidad',
  'aries:capricornio': '/entretenimiento/horoscopos/aries-con-capricornio-relacion-muy-densa',
  'aries:escorpion': '/entretenimiento/horoscopos/aries-con-escorpion-relacion-de-muchos-celos-y-sentimientos-posesivos',
  'aries:geminis': '/entretenimiento/predicciones-horoscopos/aries-con-geminis-relacion-comunicativa',
  'aries:leo': '/entretenimiento/horoscopos/aries-con-leo-relacion-con-temperamentos-afines',
  'aries:libra': '/entretenimiento/horoscopos/aries-con-libra-tienen-una-relacion-de-intereses-comunes',
  'aries:piscis': '/entretenimiento/horoscopos/aries-con-piscis-una-relacion-con-muchas-dificultades',
  'aries:sagitario': '/entretenimiento/horoscopos/aries-con-sagitario-relacion-divertida',
  'aries:tauro': '/entretenimiento/horoscopos/aries-con-tauro-relacion-amigable',
  'aries:virgo': '/entretenimiento/horoscopos/aries-con-virgo-relacion-con-personalidades-disimiles',

  'cancer:cancer': '/entretenimiento/horoscopos/cancer-con-cancer-se-entienden-mutuamente-abunda-la',
  'cancer:capricornio': '/entretenimiento/horoscopos/cancer-con-capricornio-relacion-de-signos-opuestos-pero-afines',
  'cancer:escorpion': '/entretenimiento/horoscopos/cancer-con-escorpion-relacion-intensa-posesiva-y-dominante',
  'cancer:geminis': '/entretenimiento/horoscopos/geminis-con-cancer-relacion-con-personalidades-diferentes',
  'cancer:leo': '/entretenimiento/horoscopos/cancer-con-leo-relacion-de-admiracion-mutua',
  'cancer:libra': '/entretenimiento/horoscopos/cancer-con-libra-una-relacion-inestable-de-intereses-dierentes',
  'cancer:piscis': '/entretenimiento/horoscopos/cancer-con-piscis-relacion-de-empatia-y-entendimiento',
  'cancer:sagitario': '/entretenimiento/horoscopos/cancer-con-sagitario-relacion-de-personalidades-disimeles',
  'cancer:tauro': '/entretenimiento/horoscopos/tauro-con-cancer-una-relacion-de-intereses-afines',
  'cancer:virgo': '/entretenimiento/horoscopos/cancer-con-virgo-relacion-de-afinidad-de-ideas-y-empatia',

  'capricornio:capricornio': '/entretenimiento/horoscopos/capricornio-con-capricornio-relacion-monotona-demasiado-seria',
  'capricornio:escorpion': '/entretenimiento/horoscopos/escorpion-con-capricornio-una-relacion-estable',
  'capricornio:geminis': '/entretenimiento/horoscopos/geminis-con-capricornio-una-relacion-rutinaria',
  'capricornio:leo': '/entretenimiento/horoscopos/leo-con-capricornio-una-relacion-con-conflictos-de-intereses',
  'capricornio:libra': '/entretenimiento/horoscopos/libra-con-capricornio-relacion-rutinaria',
  'capricornio:piscis': '/entretenimiento/horoscopos/capricornio-con-piscis-relacion-con-intereses-afines',
  'capricornio:tauro': '/entretenimiento/horoscopos/tauro-con-capricornio-una-relacion-demasiado-seria',
  'capricornio:sagitario': '/entretenimiento/horoscopos/sagitario-con-capricornio-relacion-compleja-y-cuestionable',
  'capricornio:virgo': '/entretenimiento/horoscopos/virgo-con-capricornio-una-relacion-solida',

  'escorpion:escorpion': '/entretenimiento/horoscopos/escorpion-con-escorpion-relacion-explosiva-fuerte',
  'escorpion:geminis': '/entretenimiento/horoscopos/geminis-con-escorpion-una-relacion-de-celos-y-conflictos',
  'escorpion:leo': '/entretenimiento/horoscopos/leo-con-escorpion-una-relacion-con-tendencia-a-dominar',
  'escorpion:libra': '/entretenimiento/horoscopos/libra-con-escorpion-problemas-de-comunicacion',
  'escorpion:piscis': '/entretenimiento/horoscopos/escorpion-con-piscis-relacion-empatica',
  'escorpion:sagitario': '/entretenimiento/horoscopos/escorpion-con-sagitario-temperamentos-opuestos',
  'escorpion:tauro': '/entretenimiento/horoscopos/tauro-con-escorpion-una-relacion-llena-de-intensidad-sexual',
  'escorpion:virgo': '/entretenimiento/horoscopos/virgo-con-escorpion-una-relacion-intensa-dificil',

  'geminis:geminis': '/entretenimiento/horoscopos/geminis-con-geminis-relacion-ingeniosa-y-compatible',
  'geminis:leo': '/entretenimiento/horoscopos/geminis-con-leo-una-relacion-de-atraccion-mutua',
  'geminis:libra': '/entretenimiento/horoscopos/geminis-con-libra-relacion-excelente',
  'geminis:piscis': '/entretenimiento/horoscopos/geminis-con-piscis-relacion-de-choques-temperamentales',
  'geminis:sagitario': '/entretenimiento/horoscopos/geminis-con-sagitario-relacion-abierta-y-espontanea',
  'geminis:tauro': '/entretenimiento/horoscopos/tauro-con-geminis-relacion-comunicativa',
  'geminis:virgo': '/entretenimiento/horoscopos/geminis-con-virgo-relacion-excelente',

  'leo:leo': '/entretenimiento/horoscopos/leo-con-leo-una-relacion-que-lucha-por-el-dominio',
  'leo:libra': '/entretenimiento/horoscopos/leo-con-libra-una-relacion-con-intereses-afines',
  'leo:sagitario': '/entretenimiento/horoscopos/leo-con-sagitario-una-relacion-casual-espontanea',
  'leo:tauro': '/entretenimiento/horoscopos/tauro-con-leo-una-relacion-con-quimica-sexual',
  'leo:virgo': '/entretenimiento/horoscopos/leo-con-virgo-una-relacion-con-tensiones',
  'leo:piscis': '/entretenimiento/horoscopos/leo-con-piscis-una-relacion-con-sentimientos-de-culpa',

  'libra:libra': '/entretenimiento/horoscopos/libra-con-libra-relacion-armponica',
  'libra:piscis': '/entretenimiento/horoscopos/libra-con-piscis-relacion-de-resistencia-mutua',
  'libra:tauro': '/entretenimiento/horoscopos/tauro-con-libra-una-relacion-elegante-con-clase',
  'libra:sagitario': '/entretenimiento/horoscopos/cancer-y-sagitario-relacion-creativa-y-constructiva',
  'libra:virgo': '/entretenimiento/horoscopos/virgo-con-libra-una-relacion-complicada',

  'piscis:piscis': '/entretenimiento/horoscopos/piscis-con-piscis-relacion-intrincada-y-algo-depresiva',
  'piscis:sagitario': '/entretenimiento/horoscopos/sagitario-con-piscis-una-relacion-de-visiones-opuestas',
  'piscis:tauro': '/entretenimiento/horoscopos/tauro-con-piscis-una-relacion-empatica',
  'piscis:virgo': '/entretenimiento/horoscopos/virgo-con-piscis-una-relacion-de-signos-opuestos-con-atraccion',

  'tauro:sagitario': '/entretenimiento/horoscopos/tauro-con-sagitario-relacion-aventurera',
  'tauro:tauro': '/entretenimiento/horoscopos/tauro-con-tauro-una-relacion-sensual',
  'tauro:virgo': '/entretenimiento/horoscopos/tauro-con-virgo-una-relacion-solida-de-pareja',

  'sagitario:sagitario': '/entretenimiento/horoscopos/sagitario-con-sagitario-relacion-relajada',
  'sagitario:virgo': '/entretenimiento/horoscopos/virgo-con-sagitario-una-relacion-con-discusiones',

  'virgo:virgo': '/entretenimiento/horoscopos/virgo-con-virgo-una-relacion-con-conflictos-de-intereses-y-criticas-constantes',
};

const settings = {
  title: 'Calculadora Del Amor',
  description: 'Dejarte guiar por los astros, descubre si tu relación podría florecer, con la calculadora del amor.',
};

export default {
  settings,
  pairings,
  signs,
};
