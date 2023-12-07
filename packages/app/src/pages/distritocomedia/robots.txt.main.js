import robotsDistritocomedia from '../../assets/distritocomedia/robots.txt';
import Robots, { getRobotsServerSideProps } from '../../utils/server/robots.js';

export default Robots;
export const getServerSideProps = getRobotsServerSideProps(robotsDistritocomedia);
