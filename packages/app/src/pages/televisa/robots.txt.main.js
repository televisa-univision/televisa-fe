import robots from '../../assets/televisa/robots.txt';

import Robots, { getRobotsServerSideProps } from '../../utils/server/robots.js';

export default Robots;
export const getServerSideProps = getRobotsServerSideProps(robots);
