/**
 * @module PrendeTV Download Asset Promo Card
 */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { deburrToLowerCase } from '@univision/fe-commons/dist/utils/helpers';

import Styles from './DownloadAsset.styles';
import localization from '../../../constants/localization';

const ContainerLogoDevice = styled.div`${Styles.containerLogoDevice}`;
const HeadLine = styled.h2`${Styles.headLine}`;
const Image = styled.img`${Styles.image}`;
const Info = styled.div`${Styles.info}`;
const InnerWrapper = styled.div`${Styles.innerWrapper}`;
const Item = styled.li`${Styles.item}`;
const Link = styled.a`${Styles.link}`;
const List = styled.ul`${Styles.list}`;
const SubHeadLine = styled.h2`${Styles.subHeadLine}`;
const Wrapper = styled.section`${Styles.wrapper}`;

/**
 * PrendeTV Download Asset Promo Card
 * @param {Object} props - initial props
 * @property {array} props.contents - Assets
 * @property {string} props.headLine - Head line for the promo card
 * @returns {JSX.Element}
 */
const DownloadAsset = ({ contents, headLine }) => {
  const track = useCallback((eventName) => {
    window.dataLayer.push({
      event: `section_download_${deburrToLowerCase(eventName)}`,
    });
  }, []);

  return (
    <Wrapper>
      <InnerWrapper>
        <HeadLine>{headLine}</HeadLine>
        <SubHeadLine>{localization.get('prendeTVAssetsSubTitle')}</SubHeadLine>

        <List>
          {contents.map(({
            file, image, uid, title,
          }) => (
            <Item key={`asset-${uid}`}>
              <Link href={file.url} onClick={() => track(title)} target="_blank">
                <ContainerLogoDevice>
                  <Image src={image.renditions?.original?.href} />
                </ContainerLogoDevice>

                <Info>{title}</Info>
              </Link>
            </Item>
          ))}
        </List>
      </InnerWrapper>
    </Wrapper>
  );
};

DownloadAsset.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      file: PropTypes.object,
      image: PropTypes.object,
      uid: PropTypes.string,
      title: PropTypes.string,
    }).isRequired,
  ),
  headLine: PropTypes.string.isRequired,
};

export default DownloadAsset;
