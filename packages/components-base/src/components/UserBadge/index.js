import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getFirstLetter from '@univision/fe-utilities/helpers/string/getFirstLetter';
import { isTudnSiteSelector, showPageSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import Icon from '@univision/fe-icons/dist/components/Icon';
import {
  BLACK,
  WHITE,
} from '@univision/fe-commons/dist/utils/styled/constants';
import { useSelector, useDispatch } from 'react-redux';
import { openRegistration, closeRegistration } from '@univision/fe-commons/dist/store/slices/registration/registrationSlice';
import isRegistrationOpenSelector from '@univision/fe-commons/dist/store/selectors/registration-selectors';
import Styles from './UserBadge.styles';

const CloseWrapper = styled.div`${Styles.closeWrapper}`;
const Wrapper = styled.div`${Styles.wrapper}`;
const UserLetter = styled.div`${Styles.userLetter}`;
/**
 * ActionBar Component
 * @param {Object} props - component props
 * @param {Object} isDark - to know if component have to be dark or light version
 * @param {Object} isLogguedIn - to know if user is logged in
 * @param {Object} nameUser - name of user to get first letter
 * @returns {JSX}
 */
const UserBadge = ({
  isDark,
  isLoggedIn,
  userName,
}) => {
  const dispatch = useDispatch();
  const isRegistrationOpen = useSelector(isRegistrationOpenSelector);
  const isShowPage = useSelector(showPageSelector);
  const isTUDN = useSelector(isTudnSiteSelector);
  const showDarkVersion = isDark
  || isShowPage || isTUDN;
  const colorFill = showDarkVersion ? WHITE : BLACK;

  /**
  * Handle click on icon user to dispath if is open or not
  */
  const handleOpenRegistration = () => {
    if (isRegistrationOpen) {
      dispatch(closeRegistration());
    } else {
      dispatch(openRegistration());
    }
  };
  let iconToShow = (
    <Icon
      name="userIcon"
      fill={colorFill}
      height={24}
      width={24}
    />
  );
  if (isRegistrationOpen) {
    iconToShow = (
      <CloseWrapper>
        <Icon
          name="close"
          fill={colorFill}
          height={20}
          width={20}
        />
      </CloseWrapper>
    );
  } else if (isLoggedIn) {
    iconToShow = <UserLetter className="uvs-font-c-regular" isDark={showDarkVersion}>{getFirstLetter(userName)}</UserLetter>;
  }

  return (
    <Wrapper onClick={handleOpenRegistration}>
      {iconToShow}
    </Wrapper>
  );
};

UserBadge.defaultProps = {
  userName: '',
};

UserBadge.propTypes = {
  isDark: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  userName: PropTypes.string,
};

export default UserBadge;
