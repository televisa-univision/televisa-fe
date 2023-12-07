import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Video from '@univision/fe-video/dist/components/Video';
import Store from '@univision/fe-commons/dist/store/store';

import Styles from './QuesAnsVideoContainer.styles';
import ReadMoreBtn from '../ReadMoreBtn/ReadMoreBtn';

const Answer = styled.p`${Styles.answer}`;
const QuesAnsIdx = styled.h1`${Styles.quesAnsIdx}`;
const QuesAnsVideoWrapper = styled.div`${Styles.questionAnsVideoWrapper}`;
const QuesContainer = styled.div`${Styles.quesContainer}`;
const QuestionHeading = styled.h1`${Styles.questionHeading}`;
const QuestionLink = styled.a`${Styles.questionLink}`;

/**
 * QavContainer Question/Answer/Video Container
 * @param {Object} props - component props
 * @param {string} props.answer - AskExpertData Answer
 * @param {function} props.expandClickHandler - AskExpertData Expand text Handler
 * @param {number} props.idx - AskExpertData Index
 * @param {boolean} props.isExpandText - AskExpertData isExpandText is a flag of Expand Text
 * @param {boolean} props.isOnlyQues - AskExpertData isOnlyQues is for Question Section Only
 * @param {string} props.question - AskExpertData Question
 * @param {Object} props.video - AskExpertData video
 * @returns {JSX}
 */
const QavContainer = ({
  answer,
  question,
  video,
  idx,
  isExpandText,
  isOnlyQues,
  expandClickHandler,
}) => {
  const VideoProps = {
    autoplay: false,
    store: Store,
    ...video,
  };
  const Question = isOnlyQues
    ? <QuestionLink href={`#wrapper${idx + 1}`}>{question}</QuestionLink>
    : <QuestionHeading>{question}</QuestionHeading>;
  const AteVideoBody = !isOnlyQues && <Video {...VideoProps} />;
  const AnswerReadMoreBtn = !isOnlyQues && (
    <>
      <Answer hasElipsis={isExpandText}>{answer}</Answer>
      {!isExpandText && (
      <ReadMoreBtn
        expandClickHandler={expandClickHandler}
        idx={idx}
      />
      )}
    </>
  );

  return (
    <QuesAnsVideoWrapper id={!isOnlyQues && `wrapper${idx + 1}`} isOnlyQues={isOnlyQues}>
      {AteVideoBody}
      <QuesContainer isOnlyQues={isOnlyQues}>
        <QuesAnsIdx className="uvs-font-b-bold" isOnlyQues={isOnlyQues}>{idx + 1}.</QuesAnsIdx>
        {Question}
        {AnswerReadMoreBtn}
      </QuesContainer>
    </QuesAnsVideoWrapper>

  );
};

QavContainer.propTypes = {
  answer: PropTypes.string,
  expandClickHandler: PropTypes.func,
  idx: PropTypes.number,
  isExpandText: PropTypes.bool,
  isOnlyQues: PropTypes.bool,
  question: PropTypes.string,
  video: PropTypes.object,
};

QavContainer.defaultProps = {
  isOnlyQues: false,
};

export default QavContainer;
