import * as categories from '../../../constants/pageCategories';
// eslint-disable-next-line import/no-cycle
import { matchTagUri, matchPageUri, matchExactPageUri } from './matchers';

export default {
  [categories.MUSIC]: [matchTagUri('/musica'), matchExactPageUri('/uforia/podcasts')],
  [categories.TURNO7]: [matchTagUri('/temas/turno7'), matchTagUri('/turno7')],
  [categories.RADIO_NACIONAL]: [matchPageUri('/radio/radio-nacional')],
  [categories.PODCAST]: [matchPageUri('/radio/podcasts')],
  [categories.RADIO]: [matchPageUri('/radio')],
  [categories.HOROSCOPE]: [matchTagUri('/temas/horoscopos'), matchTagUri('/temas/artes-esotericas'), matchTagUri('/entretenimiento/horoscopos'), matchTagUri('/horoscopos')],
  [categories.ESTILO_DE_VIDA]: [matchTagUri('/temas/estilo-de-vida'), matchTagUri('/estilo-de-vida')],
  [categories.BODAS]: [matchPageUri('/estilo-de-vida/bodas/boda-real-principe-harry-meghan-markle-19-de-mayo-en-windsor-reino-unido')],
  [categories.LONGFORMAT]: [
    matchTagUri('/temas/longform'),
    matchTagUri('/programas/shows/shows-programas-y-noticiero'),
    matchPageUri('/capitulos-de-television'),
  ],
  [categories.GASTRONOMY]: [matchTagUri('/temas/delicioso'), matchTagUri('/delicioso')],
  [categories.POSIBLE]: [matchTagUri('/temas/posible'), matchTagUri('/posible')],
  [categories.FAMOSOS]: [matchTagUri('/famosos'), matchPageUri('/famosos')],
  [categories.WOMEN_DAY]: [matchTagUri('/supermujeres'), matchTagUri('/mujeres')],
  [categories.CONECTA]: [matchPageUri('/conecta'), matchPageUri('/conecta-west'), matchPageUri('/conecta-east')],
  [categories.EL_DRAGON]: [matchPageUri('/shows/el-dragon/juego-el-dragon')],
  [categories.MIRA_QUIEN_BAILA]: [
    matchExactPageUri('/shows/mira-quien-baila/performances'),
    matchExactPageUri('/shows/mira-quien-baila/jueces'),
    matchExactPageUri('/shows/mira-quien-baila/conductores'),
    matchExactPageUri('/shows/mira-quien-baila/participantes'),
    matchExactPageUri('/shows/mira-quien-baila/vota'),
    matchExactPageUri('/shows/mira-quien-baila/vota-west'),
  ],
  [categories.PREMIOS_JUVENTUD]: [
    matchExactPageUri('/especiales/premios-juventud/performances'),
    matchExactPageUri('/especiales/premios-juventud/pj-fotos'),
  ],
  [categories.LATIN_GRAMMY_CELEBRA_ELLAS]: [
    matchExactPageUri('/shows/latin-grammy-celebra-ellas-y-su-musica/performances'),
    matchExactPageUri('/shows/latin-grammy-celebra-ellas-y-su-musica/fotos'),
  ],
  [categories.UFORIA_HANGOUT]: [
    matchExactPageUri('/musica/uforia-hangout-sessions'),
  ],
  [categories.NUESTRA_BELLEZA_LATINA]: [
    matchExactPageUri('/shows/nuestra-belleza-latina/vota'),
    matchExactPageUri('/shows/nuestra-belleza-latina/vota-west'),
    matchExactPageUri('/shows/nuestra-belleza-latina/nbl-videos'),
    matchExactPageUri('/shows/nuestra-belleza-latina/nbl-fotos'),
  ],
  [categories.LATIN_GRAMMY]: [
    matchExactPageUri('/shows/latin-grammy/video'),
    matchExactPageUri('/shows/latin-grammy/fotos'),
  ],
  [categories.GANGAS_AND_DEALS]: [
    matchExactPageUri('/estilo-de-vida/gangas-and-deals'),
  ],
  [categories.PREMIO_LO_NUESTRO]: [
    matchPageUri('/en-vivo-premio-lo-nuestro-febrero-21-2019-american-airlines-arena-musica-latina-regional-mexicano-musica-tropical-musica-urbana'),
    matchExactPageUri('/shows/premio-lo-nuestro/fotos'),
    matchExactPageUri('/shows/premio-lo-nuestro/videos'),
  ],
  [categories.LATIN_AMERICAN_MUSIC_AWARDS]: [
    matchExactPageUri('/shows/latin-american-music-awards/fotos'),
    matchExactPageUri('/shows/latin-american-music-awards/video'),
  ],
};
