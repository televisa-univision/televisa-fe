import robotsLosbingers from '../../assets/canal5/robots.txt';
import Robots, { getRobotsServerSideProps } from '../../utils/server/robots.js';

export default Robots;
export const getServerSideProps = getRobotsServerSideProps(robotsLosbingers);
