import { lazy } from 'react';
import withSuspense from '@univision/fe-commons/dist/components/hocs/withSuspense';
import Loading from '../Loading';

const lazyRegistation = withSuspense(lazy(() => import(/* webpackChunkName: "registration-cpm" */ '.')), Loading);
export default lazyRegistation;
