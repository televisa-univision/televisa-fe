import robotsCanal5 from '../../assets/canal5/robots.txt';
import Robots, { getRobotsServerSideProps } from '../../utils/server/robots.js';

export default Robots;
export const getServerSideProps = getRobotsServerSideProps(robotsCanal5);
