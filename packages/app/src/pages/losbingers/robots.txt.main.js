import robotsLosBingers from '../../assets/losbingers/robots.txt';
import Robots, { getRobotsServerSideProps } from '../../utils/server/robots.js';

export default Robots;
export const getServerSideProps = getRobotsServerSideProps(robotsLosBingers);
