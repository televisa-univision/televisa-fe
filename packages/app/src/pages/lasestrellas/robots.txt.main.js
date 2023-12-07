import robotsLasEstrellas from '../../assets/lasestrellas/robots.txt';
import Robots, { getRobotsServerSideProps } from '../../utils/server/robots.js';

export default Robots;
export const getServerSideProps = getRobotsServerSideProps(robotsLasEstrellas);
