export const iFrameId = 'sso-iframe';

export const iFrameAncestorsRegex = [
  /.*localhost:.*/,
  /.*\.dev-univision\.com/,
  /.*\.univision\.com/,
  /.*\.tudn\.com/,
  /.*\.mulher\.com\.br/,
  /.*\.delicioso\.com\.br/,
  /.*\.zappeando\.com\.br/,
  /.*\.tasaudavel\.com\.br/,
  /.*\.lasestrellas\.tv/,
  /.*ydzgd0hy3d.execute-api.us-east-1.amazonaws.com/, // Integration tudn nextjs
  /.*\.canal5\.com/,
  /.*\.elnu9ve\.com/,
  /.*\.distritocomedia\.com/,
  /.*\.televisa\.com/,
  /.*\.unicable\.tv/,
  /.*\.telehit\.com/,
  /.*\.losbingers\.com/,
  /.*\.bandamax\.tv/,
  /.*\.lacasadelosfamososmexico\.tv/,
];

export const iFrameAncestors = [
  'http://localhost:*',
  'https://*.dev-univision.com',
  'https://*.univision.com',
  'https://*.tudn.com',
  'https://*.mulher.com.br',
  'https://*.delicioso.com.br',
  'https://*.zappeando.com.br',
  'https://*.tasaudavel.com.br',
  'https://*.lasestrellas.tv',
  'https://ydzgd0hy3d.execute-api.us-east-1.amazonaws.com', // Integration tudn nextjs
  'https://*.canal5.com',
  'https://*.elnu9ve.com',
  'https://*.distritocomedia.com',
  'https://*.televisa.com',
  'https://*.unicable.com',
  'https://*.telehit.com',
  'https://*.losbingers.com',
  'https://*.bandamax.tv',
  'https://*.lacasadelosfamososmexico.tv',
];
