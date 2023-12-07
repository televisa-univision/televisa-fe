export default {
  LeaguesAndTournaments: () => import(/* webpackChunkName: "leaguesAndTournaments" */ '@univision/fe-deportes/dist/components/widgets/LeaguesAndTournaments'),
  LotteryWebView: () => import(/* webpackChunkName: "lotteryWebView" */ '@univision/fe-local/dist/components/widgets/Lottery/LotteryWebView/LotteryWebView'),
  Header: () => import(/* webpackChunkName: "wrappersHeader" */ 'app/utils/factories/components/wrappers/Header'),
  Footer: () => import(/* webpackChunkName: "componentsFooter" */ '@univision/fe-components-base/dist/components/Footer/FooterLazyWrapper'),
  PreMatchWebView: () => import(/* webpackChunkName: "preMatchWebView" */ '@univision/fe-deportes/dist/components/widgets/PreMatch/PreMatchWebView'),
};
