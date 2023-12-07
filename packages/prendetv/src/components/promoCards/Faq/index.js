/**
 * @module PrendeTV FAQ
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import RichText from '@univision/fe-components-base/dist/components/RichText';

import localization from '../../../constants/localization';
import Styles from './faq.styles';
import {
  PRENDE_TV_CONTACT,
  PRENDETV_BACK_TO_TOP_SVG,
} from '../../../constants';

const Answer = styled.div`${Styles.answer}`;
const Answers = styled.section`${Styles.answers}`;
const AnswerSubTitle = styled.h3`${Styles.answerSubTitle}`;
const AnswerTitle = styled.h2`${Styles.answerTitle}`;
const AnswerTopic = styled.div`${Styles.answerTopic}`;
const BackToTop = styled.button`${Styles.backToTop}`;
const Header = styled.header`${Styles.header}`;
const HeaderContactUs = styled.a`${Styles.headerContactUs}`;
const HeaderContactUsContainer = styled.div`${Styles.headerContactUsContainer}`;
const Question = styled.button`${Styles.question}`;
const Questions = styled.section`${Styles.questions}`;
const QuestionsContainer = styled.section`${Styles.questionsContainer}`;
const QuestionSubTitle = styled.h2`${Styles.questionSubTitle}`;
const QuestionTitle = styled.h1`${Styles.questionTitle}`;
const TrendingTopic = styled.button`${Styles.trendingTopic}`;
const TrendingTopicsTitle = styled.h2`${Styles.trendingTopicsTitle}`;
const TrendingTopicTitle = styled.div`${Styles.trendingTopicTitle}`;

/**
 * PrendeTV FAQ promo card type
 * @param {Object} props - Promo card props
 * @param {array} props.contents - FAQ Items
 * @param {string} props.headLine - Headline of the FAQ page
 * @returns {JSX.Element}
 */
const Faq = ({ contents, headLine }) => {
  /**
   * Scroll the viewport to element
   * @param {string} el - Element to scroll to
   */
  const scrollTo = (el) => {
    window.scrollTo({
      top: document.getElementById(el)?.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Header>
        <HeaderContactUsContainer>
          <HeaderContactUs href={PRENDE_TV_CONTACT}>
            {localization.get('contactUs')}
          </HeaderContactUs>
        </HeaderContactUsContainer>

        {headLine}
      </Header>

      <QuestionsContainer id="questions">
        <Questions>
          {contents.map(val => (
            <Question
              key={`faq_question_${val.uid}`}
              onClick={() => scrollTo(`faq_answer_${val.uid}`)}
            >
              <QuestionTitle>{val.headLine}</QuestionTitle>
              <QuestionSubTitle>{val.subHeadLine}</QuestionSubTitle>
            </Question>
          ))}
        </Questions>

        <TrendingTopicsTitle>{localization.get('trendingTopics')}</TrendingTopicsTitle>

        <Questions>
          {contents
            .map(val => val.contents.filter(topic => topic.trendingTopic)
              .map(trendingTopic => (
                <TrendingTopic
                  key={`faq_trendingTopic_${trendingTopic.uid}`}
                  onClick={() => scrollTo(`faq_topic_${trendingTopic.uid}`)}
                >
                  <TrendingTopicTitle>{trendingTopic.question}</TrendingTopicTitle>
                </TrendingTopic>
              )))}
        </Questions>
      </QuestionsContainer>

      <Answers id="answers">
        {contents.map(val => (
          <Answer id={`faq_answer_${val.uid}`} key={`faq_answer_${val.uid}`}>
            <AnswerTitle>{val.headLine}</AnswerTitle>
            {val?.contents?.map(topic => (
              <AnswerTopic key={`faq_topic_${topic.uid}`}>
                <AnswerSubTitle id={`faq_topic_${topic.uid}`}>{topic.question}</AnswerSubTitle>
                <RichText html={topic.answer} />
              </AnswerTopic>
            ))}
          </Answer>
        ))}

        <BackToTop onClick={() => scrollTo('questions')}>
          <img src={PRENDETV_BACK_TO_TOP_SVG} alt={localization.get('backToTop')} />
          <span>{localization.get('backToTop')}</span>
        </BackToTop>
      </Answers>
    </>
  );
};

Faq.propTypes = {
  contents: PropTypes.array,
  headLine: PropTypes.string,
};

export default Faq;
