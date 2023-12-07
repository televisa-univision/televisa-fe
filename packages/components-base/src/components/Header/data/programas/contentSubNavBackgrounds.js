import themes from '@univision/fe-commons/dist/utils/themes/themes.json';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import * as styled from '@univision/fe-utilities/styled/constants';

import { getSubNavObject } from './subNavBackgrounds';

/**
 * The `dynamicContentImage` is being evaluated here because before,
 * he way to set the subNavBackgrounds was manually.
 * Now in BEX, in the main section of the SHOW configuration, there are 4 new keys:
 * Header Desktop Image, Header Mobile Image, Content Desktop Image and Content Mobile Image.
 * Which in the JSON response you can find as `headerImages` and `contentImages`
 * within the key named `show` of the response.
 * The hardcoded piece of code after dynamicContentImage `|| (isDesktop ? desktopImg : mobileImg)`
 * could be remove for every show once we are sure that all of the shows have
 * its content and header images set up in BEX. This is done like that to accomplish
 * backwards compatibility.*
 * Get all subNavBackgrounds objects
 * @param {string} dynamicContentImage is the desktopImage/mobileImage header image
 * @returns {Object}
 */
export function getContentSubNavBackgrounds(dynamicContentImage) {
  const isDesktop = getDevice(Store) === 'desktop';

  return {
    '40 y 20': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/63/3a/e1e9de0e4580b7874557dd6b8ffa/40y20desktopcontent.jpeg' : 'https://st1.uvnimg.com/03/c1/2fe95aa04bc782f745a39701f34c/40y20mobilecontent.jpeg')),
    accion: getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/88/e9/fbca23dc46489dac2e996abbf339/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f8/15/5663de6d496789c99e20d9216012/contentheader-mobile-2x.jpg')),
    alborada: getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/c1/f9/6b68fab8425ebaa8ad3d3b8b4471/alborada-ch-desktop.jpg' : 'https://st1.uvnimg.com/c0/23/5b04e78e4398b416ca622eb17a7e/alborada-ch-mobile.jpg')),
    'al punto': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/89/e8/52b9d265404a9605699b01721fd4/contentheader-desktop.jpg' : 'https://st1.uvnimg.com/b5/0a/0e334fed4833a9412d9f94df3c19/contentheader-mobile.jpg')),
    'al punto florida': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/97/9d/cadc194c46cdb1c082807c9691a3/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/46/a4/b7582cb140ef901fdb002cf30535/contentheader-mobile-2x.jpg')),
    'amar a muerte': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/d2/42/b1c346a7481893be54ccb3ff8215/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/aa/d8/28ac38b3481eb6341e86fd0d3c8d/contentheader-mobile-2x.jpg')),
    'amor eterno': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/d1/ea/c22927294bc8a90d76f91bade79e/content-header-desktop.jpg' : 'https://st1.uvnimg.com/ee/9c/c6d314604154a648384da0b70266/content-header-mobile.jpg')),
    apocalipsis: getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/32/4e/da116fdb4423b0671a45834e27d2/apocalipsis-desktop.jpg' : 'https://st1.uvnimg.com/85/3e/c989b3aa4677a519173fba7b46a0/apocalipsis-mobile.jpg')),
    'aqui y ahora': getSubNavObject('#23A2EE', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/63/a2/60ff136d4711a76e203661f04a42/contentheader-desktop.jpg' : 'https://st1.uvnimg.com/a0/03/f556a4c249b49a7e824bab20a30a/contentheader-mobile.jpg')),
    atrapada: getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/ff/6d/cbf8e9aa4080b8c43e5c345f47cb/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/e7/c3/ca76e03f4a0daa5db5ca4d12aa66/contentheader-mobile-2x.jpg')),
    'carita de angel': getSubNavObject('#000000', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/04/a8/78e489bd41a59062a436766c0ca1/contentheader-desktop.jpg' : 'https://st1.uvnimg.com/7a/f7/c2b456b14882bdadfda6fe4f02d8/contentheader-mobile.jpg')),
    'cita a ciegas: 258 dias para encontrar el amor': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/81/67/563ee1604b3cb8475a42ace4afed/citas-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/6f/c2/d3a73fea4309b15a5e403a1f946d/citas-contentheader-mobile.jpg')),
    'como dice el dicho': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/c4/2d/90bc856d4f80acef5a4c9ef0b7e7/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/76/94/170844644c74863335f4e61d7e24/contentheader-mobile-2x.jpg')),
    'contacto deportivo': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/88/e9/fbca23dc46489dac2e996abbf339/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f8/15/5663de6d496789c99e20d9216012/contentheader-mobile-2x.jpg')),
    cronicas: getSubNavObject('#333333', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/34/f6/bbca3393491184e9defaa719a10b/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/2d/c0/9b26e73d4c0483d1d1e299fba157/contentheader-mobile-2x.jpg')),
    'desafio super regiones': getSubNavObject('#ff7800', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/8b/6c/042e10324baeb7864503e07a4f48/desafio-content-subnav-desktop.jpg' : 'https://st1.uvnimg.com/56/b5/4498341e49ae92e7d64547e47d84/desafio-content-subnav-mobile.jpg')),
    'desafio the box': getSubNavObject('#ff7800', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/b9/70/2a983b21451b8f148869ffb99615/contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/a9/76/54226fb2490398242af3dfd14267/contentheader-mobile.jpg')),
    'despierta america': getSubNavObject('#ff7800', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/22/1d/c43281ff4097957caf9e7bc8e597/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/6b/58/7c92c13648c9913c4a9a1f020019/contentheader-mobile-2x.jpg')),
    'disenando tu amor': getSubNavObject('#000000', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/b3/71/31b290504f24b06657268fc4c7f9/disenando-tu-amor-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/4b/d4/be2b1b524d62aaa610816c5c8c26/disenando-tu-amor-contentheader-mobile.jpg')),
    'destilando amor': getSubNavObject('#000000', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/17/22/76e5fa09439c858542b075bd994d/contentheader-desktop.jpg' : 'https://st1.uvnimg.com/f0/1f/308e67ef4293b7546cf644173479/contentheader-mobile.jpg')),
    'dona flor y sus dos maridos': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/ed/d7/9926ec1649d3bfbb47270df6532f/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f4/12/354f1c9847ffbc61de6c2dbe1e9c/contentheader-mobile-2x.jpg')),
    'el break de las 7': getSubNavObject('#3173a7', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/a4/61/1313d93c4a4080054717911bfe9e/desktop-2x.jpg' : 'https://st1.uvnimg.com/47/87/b34e9d384443857f3285b32c28ac/mobile-2x.jpg')),
    'el corazon nunca se equivoca': getSubNavObject('#3173a7', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/12/04/94cd611d459ab3ab21c042a35168/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/2b/68/c485e2c44a8d8520e50a874b1634/contentheader-mobile-2x.jpg')),
    'el dragon': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/ad/5f/4927fff24cf799a8d847f499b233/content-header-desktop-2x.png' : 'https://st1.uvnimg.com/e7/05/922c9dfc452eb756b84fa7d09d3c/contentheader-mobile-2x.jpg')),
    'el gordo y la flaca': getSubNavObject('#5D2B78', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/1d/56/7685629042fb86b7c2ab9fb6b76b/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/eb/cb/abef94fa4e31a57bfc509d5be8c2/contentheader-mobile-2x.jpg')),
    'el inframundo': getSubNavObject('#5D2B78', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/b8/82/af35f92342c19d63e00670e130a9/inframundo-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/bc/5a/e769de72461d8ef61b9699c24d33/inframundo-contentheader-mobile.jpg')),
    'el retador': getSubNavObject('#5D2B78', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/8b/14/1ac3075745febbdff2c1f4ec3b10/contentheader-desktop-retador.jpg' : 'https://st1.uvnimg.com/c9/f9/7fef256b41f3aa8afb083fcb302a/contentheader-mobile-retador.jpg')),
    'el ultimo rey': getSubNavObject('#5D2B78', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/b4/e5/f3a5e7b44898892beea54536c59f/contentheader-desktop.jpg' : 'https://st1.uvnimg.com/f2/de/6d6ba28c4f0da36e6c24b804d4d0/contentheader-mobile.jpg')),
    enamorandonos: getSubNavObject('#5D2B78', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/00/bd/ca4df2a842ad90de9e870b8dd35a/enamorandonos-contentpage-desktop.jpg' : 'https://st1.uvnimg.com/f7/4d/f03ca72b489992707f248cafdff7/enamorandonos-contentpage-mobile.jpg')),
    'en tierras salvajes': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/ef/14/710a4daa43ca9b72e81472936ff7/contentheader-desktop.jpg' : 'https://st1.uvnimg.com/9e/e5/96d9ca994371b41197a02c45f076/contentheader-mobile.jpg')),
    'esta historia me suena': getSubNavObject('#000000', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/73/15/c5677c9643839dea0e80b3bb1979/ehms-content-header-desktop.jpg' : 'https://st1.uvnimg.com/1c/d3/c6cc4ff24d44abee83ba0d6fd3b7/ehms-content-header-mobile.jpg')),
    'familias frente al fuego': getSubNavObject('#000000', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/6f/e5/d960b5c741c5bb6e6d37f0f2da91/familias-frente-al-fuego-content-header-desktop.jpg' : 'https://st1.uvnimg.com/c4/ac/6183636e40e6a5cb251da692d5ac/familias-frente-al-fuego-content-header-mobile.jpg')),
    'faisy nights con michelle rodriguez': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/15/a3/ab4bb734438ab2888430acd78fa1/resizes/500/faisy-nights-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/f7/1d/299616034b6587c200ef129a5111/resizes/500/contentheader-mobile.jpg')),
    'futbol central': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/88/e9/fbca23dc46489dac2e996abbf339/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f8/15/5663de6d496789c99e20d9216012/contentheader-mobile-2x.jpg')),
    'futbol club': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/88/e9/fbca23dc46489dac2e996abbf339/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f8/15/5663de6d496789c99e20d9216012/contentheader-mobile-2x.jpg')),
    'guerreros 2020': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/3a/a3/efef933c45da8f9a28a2abf5a3ca/guerreros-2020-content-page-desktop.jpg' : 'https://st1.uvnimg.com/f9/84/b9107c534f20a1d3b09f4d782da4/guerreros-2020-content-page-mobile.jpg')),
    hoy: getSubNavObject(themes.themes.sapphire.primary, dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/18/10/caa6daa444be810419b99e544d58/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/2b/bd/68c9f66b4f16ad606edcb795e4dc/contentheader-mobile-2x.jpg')),
    'huerfanos de su tierra': getSubNavObject(themes.themes.sapphire.primary, dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/83/92/5939c3ef4dd395ab903c3ac18bd5/huerfanos-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/ba/1a/94816d4c42389fea011ffabb0257/huerfanos-contentheader-mobile.jpg')),
    'imperio de mentiras': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/b9/8a/7fc5f02246548a3651dd07ce1be0/desktop.jpg' : 'https://st1.uvnimg.com/6f/8d/71b586e945d99442d7e63097a1e2/mobile.jpg')),
    inseparables: getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/cf/f5/ae9e63814b739144c4da7626c187/contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/70/58/179c34ac4a96be00e33e9833a605/contentheader-mobile.jpg')),
    jesus: getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/67/54/2e0974aa4fd5bd14e8feb3b2c989/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/05/50/0c017c1545d5ab56f9fcddce0359/contentheader-mobile-2x.jpg')),
    laura: getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/5d/a5/bdd050844e0d801c20353e497619/lauradesktopcontent.jpeg' : 'https://st1.uvnimg.com/e7/a3/9ee9da854c1987587bb4cfd74c75/lauramobilecontent.jpeg')),
    'la banda': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/20/2c/6c35d93f46e990b072092800e818/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/56/d6/ae51a9da438c816c1930617861a4/contentheader-mobile-2x.jpg')),
    'la desalmada': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/ea/37/66b355744623a29e11641df5c3d4/la-desalmada-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/af/8b/e9842d4b4a3b9b75b9f94b417057/la-desalmada-contentheader-mobile.jpg')),
    'la herencia': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/ba/ad/0399cc9940608969aad923888a12/la-herencia-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/37/70/f85ea553421c87c8a9453f94d6da/la-herencia-contentheader-mobile.jpg')),
    'la hija del embajador': getSubNavObject('#000000', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/c4/e7/cad0b68b4d798ce4b1aa86bc9143/contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/7b/8f/4dab763546c1b228540251f1d9cd/contentheader-mobile.jpg')),
    'la jefa del campeon': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/9e/82/7a0d741f4a34bed25e6ee091f111/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/74/1a/6abdba3c42c094a472e7351fb0db/contentheader-mobile-2x.jpg')),
    'la jugada': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/88/e9/fbca23dc46489dac2e996abbf339/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f8/15/5663de6d496789c99e20d9216012/contentheader-mobile-2x.jpg')),
    'la piloto': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/b0/d3/b18b69c140608fae0b2fdd5953ba/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/28/57/dd00f5524b41823942abba12d484/contentheader-mobile-2x.jpg')),
    'la que no podia amar': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/87/18/1eeeca7845c59cff3c02e343a7c0/content-header-desktop.jpg' : 'https://st1.uvnimg.com/31/98/a92b0c1a475fa8195c95488f4fe4/content-header-mobile.jpg')),
    'la reina de la cancion': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/1d/bb/10efe71b41b1baaf1e23d7e7bd1a/contentheader-desktop.jpg' : 'https://st1.uvnimg.com/c6/93/28fe01bf44c4bd6d7d88bd42d14a/contentheader-mobile.jpg')),
    'la reina soy yo': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/11/02/359f46114ae2aaf26a65be355a3e/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/fd/a1/689fcb8d4327a66fb802fc81fccd/contentheader-mobile-2x.jpg')),
    'la reina del flow': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/0a/d8/21d7ad8340e791d3c7b96d32ca9c/la-reina-del-flow-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/c9/7c/77c69d30419785b216a94f1a9047/la-reina-del-flow-contentheader-mobile.jpg')),
    'la rosa de guadalupe': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/8d/be/e208983e437183b4601eaa1a2ef8/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/aa/d5/f566977a4142885d64313017e1a6/contentheader-mobile-2x.jpg')),
    'la usurpadora original': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://uvn-brightspot-performance.s3.amazonaws.com/72/2d/0e7e8ea747d48644a20850550901/la-usurpadora-contentheader-desktop.jpg' : 'https://uvn-brightspot-performance.s3.amazonaws.com/f1/7f/f23b24714a7f9b5fae3ed204bc30/la-usurpadora-content-header-mobile.jpg')),
    'la usurpadora': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/1e/30/11384d014a15a6f52e87c4a2a384/la-usurpadora-content-header-desktop.png' : 'https://st1.uvnimg.com/fd/a9/72d16d514e64b9346ed18375a312/la-usurpadora-new-content-header-mobile.jpg')),
    'la voz de la manana': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/35/5e/747ce8f34532b8be28082561a03f/contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/33/9b/9239888c4855b64a1329ea550ea5/contentheader-mobile.jpg')),
    'latin grammy': getSubNavObject('#000000', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/f3/a0/20834bfd479e9b8700115d1a1f5f/contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/ef/33/b4567b424824a44d41a30d8c01b4/contentheader-mobile.jpg')),
    'latin grammy celebra ellas y su musica': getSubNavObject('#7bc026', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/43/b5/4f0dd64648cc8f704e6b9c49ebd1/grammy-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/a6/c3/918152ce49bda8232f068443d1b8/grammy-contentheader-mobile.jpg')),
    'laura sin censura': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/ef/ec/9ee89ac9488ab4ac1f80b6ddd4d1/laura-sin-censura-content-header-desktop.jpg' : 'https://st1.uvnimg.com/2f/ac/d5016a0f4785addeac1a2dbb77ac/laura-sin-censura-content-header-mobile.jpg')),
    'like, la leyenda': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/e5/4f/164eedba4839ac4bb76e45987841/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f2/c9/cdaa1c2542ac8267c327f2bb7685/contentheader-mobile-2x.jpg')),
    'linea de cuatro': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/88/e9/fbca23dc46489dac2e996abbf339/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f8/15/5663de6d496789c99e20d9216012/contentheader-mobile-2x.jpg')),
    'linea de fuego': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/fe/69/831ad16f4df5a6afc7d47218c277/linea-de-fuego-content-header-mobile.png' : 'https://st1.uvnimg.com/28/b2/5c10588840e6b5a9763ef391880f/linea-de-fuego-content-header-desktop.png')),
    'locura deportiva': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/88/e9/fbca23dc46489dac2e996abbf339/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f8/15/5663de6d496789c99e20d9216012/contentheader-mobile-2x.jpg')),
    'los cousins': getSubNavObject('#FEB532', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/52/69/ec2364304dfcbbb0fc8e76a34f3e/loscousinheaderdesktop.jpeg' : 'https://st1.uvnimg.com/d9/7d/001f0d144982b17fe7b59ce3b876/loscousinheadermobile.jpeg')),
    'los 10 videos mas divertidos': getSubNavObject('#0a06a3', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/e4/eb/2b03319f433bbe7eb78fbd577ca7/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f2/60/bdb6171d4aefb8395f296dc481f9/contentheader-mobile-2x.jpg')),
    'los ricos tambien lloran': getSubNavObject('#0a06a3', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/e5/19/b11d6c324be2a1c422198b19afbc/contentheader-desktop-ricos.jpg' : 'https://st1.uvnimg.com/b8/3d/7bae385a42f992f39a1e63ac980d/contentheader-mobile-ricos.jpg')),
    madre: getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/7e/0f/27a86061467c91ba9a52e5356cd5/contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/ca/29/b01b28a147fea4b73a070461c21b/contentheader-mobile.jpg')),
    'mas deporte': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/88/e9/fbca23dc46489dac2e996abbf339/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f8/15/5663de6d496789c99e20d9216012/contentheader-mobile-2x.jpg')),
    'me caigo de risa': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/e7/d8/8c16258742dc85b0e96e43e68494/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/10/1d/58874e7a417a99565e3a2e8a8819/contentheader-mobile-2x.jpg')),
    'medicos linea de vida': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/8b/d5/57af736c41858e1463dd748f7a51/medicos-linea-de-vida-contentpage-desktop.jpg' : 'https://st1.uvnimg.com/91/ff/0cc10f964c1dbbfe8f6dc0198765/medicos-linea-de-vida-contentpage-mobile.jpg')),
    'mi fortuna es amarte': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/a6/bb/b8827c034c90a06ce1c209ea64a4/mifortuna-contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/46/7c/2f9ad9364fc7b16ef0acdcab349f/mifortuna-contentheader-mobile.jpg')),
    'mi lista de exes': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/e0/36/50b02ada423b9e5b59a9ffb64097/contentheader-desktop.jpg' : 'https://st1.uvnimg.com/4d/b1/32cec825450faae0a992ca340562/contentheader-mobile.jpg')),
    'mi marido tiene mas familia': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/d6/c0/3201bac345d68556f97274f7d8e2/contentheader-desktop.jpg' : 'https://st1.uvnimg.com/b9/00/86678238424da0fd041f63da7fb2/contentheader-mobile.jpg')),
    'mira quien baila': getSubNavObject('#100937', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/13/5e/c9d29ca64eeb86ef8d3db9f81431/mqb-show-header-desktop.jpg' : 'https://st1.uvnimg.com/d1/31/4a42ef164cea802a5b8a140ffc8e/mqb-show-header-mobile.jpg')),
    'mision europa': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/88/e9/fbca23dc46489dac2e996abbf339/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f8/15/5663de6d496789c99e20d9216012/contentheader-mobile-2x.jpg')),
    'mujer de nadie': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/c6/44/e05f13514436b1b8be751bd10c50/mujer-de-nadie-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/a7/f4/05df91b34ec8b3552521a46cafa0/mujer-de-nadie-contentheader-mobile.jpg')),
    'noticiero univision': getSubNavObject('#333333', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/8b/0b/e4ff1bd84b4493d0028cb15c2dd7/noticiero-univision-contentpage-desktop.jpg' : 'https://st1.uvnimg.com/5d/6d/616959914e95a980994cf4bb8495/noticiero-univision-contentpage-mobile.jpg')),
    'nuestra belleza latina': getSubNavObject('#000000', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/9b/6e/f8c0898948a3a15f53cefe42e6b4/nbl-content-header-desktop-new.jpg' : 'https://st1.uvnimg.com/39/d0/600156ff4ae7b23badb75d6888d5/nbl-content-header-mobile-new.jpg')),
    'pajaro sonador': getSubNavObject('#000000', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/42/32/ce5ee9b5471ead02b62028a6bcbd/pajaro-sonador-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/55/6b/2070bc0e4402a5a60c6332e6959f/pajaro-sonador-contentheader-mobile.jpg')),
    'pequenos gigantes': getSubNavObject('#000000', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/6d/35/4503abc6444e9cc16e3fcc4023ed/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/10/f0/3af62f404d63b739ea669ae5865b/contentheader-mobile-2x.jpg')),
    'por amar sin ley': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/e3/6f/23fdab534bbb9e169ec0872a0c70/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/15/7d/22d0424149e8bd8a5a0676695918/contentheader-mobile-2x.jpg')),
    'ponte fit': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/88/e9/fbca23dc46489dac2e996abbf339/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f8/15/5663de6d496789c99e20d9216012/contentheader-mobile-2x.jpg')),
    'premio lo nuestro': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/b8/32/078b91fb446cb373f197f4beb1ff/pln-contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/94/d9/9f17f17944918d22d9f7939eaa05/pln-contentheader-mobile.jpg')),
    'premios juventud': getSubNavObject('#041537', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/e4/08/41a7cb5d461389eaaeefb9c3fb41/contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/42/95/eb0a65394fa7b1c076d23d1ad3dd/contentheader-mobile.jpg')),
    'primer impacto': getSubNavObject('#003D7C', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/e7/34/86aa72c74d0c9da572c5188b7cf1/contentheader-desktop-2x-copy-2.jpg' : 'https://st1.uvnimg.com/59/02/5eca08364a50a9708eaa4e39d3b0/contentheader-mobile-2x-copy-2.jpg')),
    'que le pasa a mi familia?': getSubNavObject('#003D7C', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/c4/c0/038dfc06406a9dd4c185aff91285/mi-familia-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/d0/d8/a2c0d2e24b02a87d47ac347d69a4/mi-familia-contentheader-mobile.jpg')),
    'quererlo todo': getSubNavObject('#003D7C', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/e0/af/7eb399e748b8873a5c7083723ec3/desktop-2x.jpg' : 'https://st1.uvnimg.com/bf/be/c3b0f77144d7843f1c4e440b1b25/mobile-2x.jpg')),
    'quien es la mascara?': getSubNavObject('#003D7C', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/34/62/d6406fa249e397d49f9baf407aa2/quien-es-la-mascara-content-header-desktop.jpg' : 'https://st1.uvnimg.com/f7/07/92d3bdae42f58c74be17fcc934c6/quien-es-la-mascara-content-header-mobile.jpg')),
    'real america with jorge ramos': getSubNavObject('#7bc026', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/26/8c/8084500d488ea6ac273023e0117d/real-america-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/2d/a9/2a53158b47ccb80ef13cf039b695/real-america-contentheader-mobile.jpg')),
    'republica deportiva': getSubNavObject('#118925', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/88/e9/fbca23dc46489dac2e996abbf339/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f8/15/5663de6d496789c99e20d9216012/contentheader-mobile-2x.jpg')),
    'reto 4 elementos': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/0f/ca/9693384a4cada82ff2cd3ebffced/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/09/52/9ddf02e0469f9cb6bf417cdeead1/contentheader-mobile-2x.jpg')),
    'rosario tijeras': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/aa/fe/5ada3f9d46d9886d54b6842180fe/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/99/ef/2e430e844a2ea4a0bc4f2ccad065/contentheader-mobile-2x.jpg')),
    'sabado futbolero': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/88/e9/fbca23dc46489dac2e996abbf339/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/f8/15/5663de6d496789c99e20d9216012/contentheader-mobile-2x.jpg')),
    'si nos dejan': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/7a/8c/37c090864b4792e9b5c6a3b82b25/si-nos-dejan-content-header-desktop.jpg' : 'https://st1.uvnimg.com/92/84/51c3b6004d4f8a8a1e724fda3530/si-nos-dejan-content-header-mobile.jpg')),
    'silvia pinal, frente a ti': getSubNavObject('#e4dcc5', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/24/bf/5c2824a74a8f8025cbb969eafccf/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/19/a2/3f071f9f4d9c863ea5ab2b135788/contentheader-mobile-2x.jpg')),
    'simon dice': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/3c/f3/28fb2cb5436fa92cc4da0d7a573a/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/9e/51/e4e24b674b45b8d0a2d89e9764f5/contentheader-mobile-2x.jpg')),
    'sin miedo a la verdad': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/5d/2f/44a1350b44a893b6a580126fc383/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/6e/b1/5c25d3f84c5d822a35a156ff1267/contentheader-mobile-2x.jpg')),
    'sin tu mirada': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/42/9c/bae48eec445c8a6705efab5216d0/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/90/30/befec9e44c579a6633691d481bff/contentheader-mobile-2x.jpg')),
    'te acuerdas de mi': getSubNavObject('#fcbc04', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/cd/82/358e56814777adb0838c33a5151b/desktop-2x.jpg' : 'https://st1.uvnimg.com/ff/68/98c9d65645c9879fc4132b77b384/mobile-2x.jpg')),
    'teleton usa': getSubNavObject('#2f1d4e', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/77/76/3ff590344c63b62f48c3344ae0e6/teleton-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/a2/1f/5a5e64c842d7bad46d91b7c11706/teleton-contentheader-mobile.jpg')),
    'tenias que ser tu': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/ac/a6/c90a1c064aa2b3a2566a984a5e4a/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/12/4e/2b08040147f5ab5f99b6318d1003/contentheader-mobile-2x.jpg')),
    'tres milagros': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/cf/8f/7e89f2de48c692ea9ab5a3c23480/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/27/93/3b72be91401ca8b4592e73c93d94/contentheader-mobile-2x.jpg')),
    'tu cara me suena': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/20/b3/c6251a5f4c099b5f481b6ced9fb1/contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/6d/e9/5f0021614f07b7c01d46d8b77a40/contentheader-mobile.jpg')),
    vecinos: getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/b0/07/6c786444440d92e7a922788b0827/contentheader-desktop-2x.jpg' : 'https://st1.uvnimg.com/ca/0e/88036f1c4fbb9cb2aae9b6644978/contentheader-mobile-2x.jpg')),
    'vencer el desamor': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/a3/76/c26964ba471eb76dcd6292271cd2/vencer-el-desamor-contentheader-desktop.jpg' : 'https://st1.uvnimg.com/1e/6e/c76b115249e88451c809ed336f33/vencer-el-desamor-contentheader-mobile.jpg')),
    'vencer el miedo': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/9f/95/9effed0142efaccdbbce107e1041/vencer-el-miedo-contentpage-desktop.jpg' : 'https://st1.uvnimg.com/13/45/c0e907ec4631a04baf00b7cd6653/vencer-el-miedo-contentpage-mobile.jpg')),
    'vencer el pasado': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/0b/6b/8f6f435a45b1a4cfa354a3ea95dc/contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/10/a5/1385cb6044cebfb873474a93f927/contentheader-mobile.jpg')),
    'vina 2019': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/8d/55/ae6e122f4e20b35a96040302cb5e/contentheader-desktop.jpg' : 'https://st1.uvnimg.com/cb/6b/659bc17640b5b87aff1ec755f153/contentheader-mobile.jpg')),
    'soltero con hijas': getSubNavObject('#000000', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/b9/34/e0e8ba774358b36047315879c121/solteroconhijas-showpagehero-desktop.jpg' : 'https://st1.uvnimg.com/96/38/3a73be9845f9b8ec44ad4be165be/solteroconhijas-showpagehero-mobile.jpg')),
    'sin rollo extra': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/03/c4/d5e0f4094865a4df073f6a317133/contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/01/35/0322ff71411dbaa4ac9e7a347097/contentheader-mobile.jpg')),
    'algo personal con jorge ramos': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/9d/51/c2318ab540af97ee7b0230e0e329/contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/58/4f/b624bff74281b3521507013f7e4a/contentheader-mobile.jpg')),
    'la mexicana y el guero': getSubNavObject('#4E4E4E', dynamicContentImage || (isDesktop ? 'https://st1.uvnimg.com/19/95/36534fbc4e7281a2f9f413feac3f/contentheader-deskopt.jpg' : 'https://st1.uvnimg.com/c3/e5/82d528d14955b1f60f8a882445e8/contentheader-mobile.jpg')),
  };
}

/**
 * Get a contentSubNavBackground by type,
 * whether the type is undefined returns the default value
 * @param {string} type type
 * @param {string} dynamicContentImage is the desktopImage/mobileImage header image
 * @returns {Object}
 */
export function getContentSubNavBackgroundByType(type, dynamicContentImage) {
  return !type
    ? getSubNavObject(styled.BLACK, dynamicContentImage)
    : getContentSubNavBackgrounds(dynamicContentImage)[type]
    || getSubNavObject(dynamicContentImage);
}
