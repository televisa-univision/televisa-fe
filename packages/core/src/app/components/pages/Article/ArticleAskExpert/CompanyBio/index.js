import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Picture from '@univision/fe-components-base/dist/components/Picture';
import CallButton from '@univision/fe-components-base/dist/components/CallButton';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { ASTRONAUT } from '@univision/fe-commons/dist/utils/styled/constants';
import Styles from './CompanyBio.styles';

const Address = styled.div`${Styles.address}`;
const AddressIcon = styled(Icon).attrs({
  name: 'address',
  size: 20,
  fill: ASTRONAUT,
})`${Styles.addressIcon}`;
const CallExpertButton = styled(CallButton)`${Styles.callExpertButton}`;
const Company = styled.div.attrs({
  className: 'uvs-font-a-bold',
})`${Styles.company}`;
const CompanyBioWrapper = styled.article`${Styles.companyBioWrapper}`;
const Description = styled.span.attrs({
  className: 'uvs-font-a-bold',
})`${Styles.description}`;
const Header = styled.div`${Styles.header}`;
const Image = styled(Picture)`${Styles.image}`;
const Info = styled.aside`${Styles.info}`;
const Lead = styled.div`${Styles.lead}`;
const Name = styled.div.attrs({
  className: 'uvs-font-c-regular',
})`${Styles.name}`;
const Separator = styled.hr`${Styles.separator}`;
const Value = styled.div`${Styles.value}`;
const Website = styled.div`${Styles.website}`;
const WebsiteIcon = styled(Icon).attrs({
  name: 'webLink',
  size: 16,
  fill: ASTRONAUT,
})`${Styles.addressIcon}`;

/**
 * Company Bio component for Ask the Expert
 * @param {Object} props - component props
 * @param {string} props.address - Company's address
 * @param {function} Props.callBtnTracking - Company's call button tracking
 * @param {string} props.description - Company's short description
 * @param {Object} props.image - Company's logo
 * @param {string} props.name - Company's name
 * @param {string} props.phone - Company's phone
 * @param {string} props.website - Company's website
 * @returns {JSX}
 */
const CompanyBio = ({
  address,
  callBtnTracking,
  description,
  image,
  name,
  phone,
  website,
}) => (
  <CompanyBioWrapper>
    <Lead>
      {localization.get('contactTheExpert')}
      <Separator />
    </Lead>

    <Header>
      <Company>{name}</Company>
      <Description>{description}</Description>
    </Header>

    <Image image={image} />

    <Info>
      {address && (
        <Address>
          <Name>{localization.get('address')}</Name>
          <Value>{address}</Value>
          <AddressIcon />
        </Address>
      )}
      {website && (
        <Website>
          <Name>{localization.get('website')}</Name>
          <Value>{website}</Value>
          <WebsiteIcon />
        </Website>
      )}

      <CallExpertButton callNumber={phone} callBtnTracking={callBtnTracking} />
    </Info>
  </CompanyBioWrapper>
);

CompanyBio.propTypes = {
  address: PropTypes.string,
  callBtnTracking: PropTypes.func,
  description: PropTypes.string,
  image: PropTypes.object,
  name: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
};

export default CompanyBio;
