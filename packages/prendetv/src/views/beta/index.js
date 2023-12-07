/**
 * @module PrendeTV Beta view
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PrendeTVLayout from '../../layout';
import Styles from './beta.styles';
import OpeningPartners from '../../components/Opening/Partners';
import { PRENDE_TV_BETA, PRENDE_TV_SUPPORT_EMAIL } from '../../constants';

const Button = styled.a`${Styles.button}`;
const ButtonWrapper = styled.div`${Styles.buttonWrapper}`;
const ContentWrapper = styled.div`${Styles.contentWrapper}`;
const Disclaimer = styled.p`${Styles.disclaimer}`;
const Header = styled.header`${Styles.header}`;
const IntroOutro = styled.div`${Styles.introOutro}`;
const MainContent = styled.div`${Styles.mainContent}`;
const Title = styled.h2`${Styles.title}`;
const Wrapper = styled.section`${Styles.wrapper}`;

/**
 * PrendeTV Beta view
 * @property {Object} props - View props
 * @property {string} props.device - Device this view is opened with
 * @returns {JSX.Element}
 */
const Beta = ({ device }) => (
  <PrendeTVLayout>
    <Wrapper>
      <OpeningPartners device={device} page={PRENDE_TV_BETA} />

      <Header>
        <h1>Welcome to the Beta Program</h1>
      </Header>

      <ContentWrapper>
        <IntroOutro>
          <p>
            The program will run from February 17th to February 28th.
          </p>
          <p>
            The goal of the program is to collect feedback around
            key areas of the PrendeTV experience.
          </p>
        </IntroOutro>

        <Title>Join The Program</Title>

        <MainContent>
          <p>
            Register using the sign-up form below. You will need to
            enter your first and last name, mobile phone model,
            and&nbsp;
            <strong>
              the e-mail account associated with with your iTunes
              or Google Play account (the app store)
            </strong>.
          </p>
          <p>
            The submission form will include instructions on how to
            obtain your iTunes/Google Play email.
          </p>
          <Disclaimer>
            None of the information collected will be shared or used
            for any other purpose than this beta program.
          </Disclaimer>
        </MainContent>

        <ButtonWrapper>
          <Button href="#">Sign-up Now</Button>
        </ButtonWrapper>

        <Title>Participating in the Program</Title>

        <MainContent>
          <p>
            On February 17th, an e-mail will be sent to your
            iTunes / Google Play account. The e-mail will contain
            instructions to download and install the PrendeTV app.
          </p>
          <p>
            Please use the feedback link below to submit feedback
            based on your experience.
          </p>
        </MainContent>

        <ButtonWrapper>
          <Button href="#">Submit Feedback</Button>
        </ButtonWrapper>

        <IntroOutro>
          <p>
            Thank you for participating, your feedback is invaluable.
          </p>
          <p>
            If you have any questions, please email us
            at <a href={`mailto:${PRENDE_TV_SUPPORT_EMAIL}`}>{PRENDE_TV_SUPPORT_EMAIL}</a>
          </p>
        </IntroOutro>
      </ContentWrapper>
    </Wrapper>
  </PrendeTVLayout>
);

Beta.propTypes = {
  device: PropTypes.string,
};

export default Beta;
