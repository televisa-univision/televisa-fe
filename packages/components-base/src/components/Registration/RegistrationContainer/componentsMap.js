import {
  REGISTRATION_FORM,
  LANDING,
  MVPD,
  WELCOME,
  GEOLOCATION,
  LOGIN_WITH_EMAIL,
  FORGOT_PASSWORD,
  RECOVERY_PASSWORD,
} from '../RegistrationConfiguration';
import Landing from './Landing';
import Welcome from './Welcome';
import RegistrationForm from './RegistrationForm';
import Mvpd from './Mvpd';
import Geolocation from './Geolocation';
import LoginWithEmail from './LoginWithEmail';
import ForgotPassword from './ForgotPassword';
import RecoveryPassword from './RecoveryPassword';

const components = Object.freeze({
  [LANDING]: Landing,
  [REGISTRATION_FORM]: RegistrationForm,
  [WELCOME]: Welcome,
  [MVPD]: Mvpd,
  [GEOLOCATION]: Geolocation,
  [LOGIN_WITH_EMAIL]: LoginWithEmail,
  [FORGOT_PASSWORD]: ForgotPassword,
  [RECOVERY_PASSWORD]: RecoveryPassword,
});

export default components;
