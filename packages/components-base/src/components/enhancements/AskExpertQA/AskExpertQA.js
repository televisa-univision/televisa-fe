import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isValidArray, getKey } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';

import Styles from './AskExpertQA.styles';
import QavContainer from './QuesAnsVideoContainer/QuesAnsVideoContainer';

const QuesAnsContainer = styled.div`${Styles.quesAnsContainer}`;
const QuesAnsLabelText = styled.p`${Styles.quesAnsLabelText}`;
const QuesAnsLabel = styled.div`${Styles.quesAnsLabel}`;
const QuestionListContainer = styled.div`${Styles.questionListContainer}`;

/**
 * AskExpert Question/Answer component
 * @param {Object} props - component props
 * @param {Object} props.askExpertData - AskExpertData contains QA info
 * @param {string} props.className - custom styling for QuesAnsWrapper
 * @returns {JSX}
 */
const AskTheExpertQA = ({
  askExpertData,
  className,
}) => {
  const [currentPosition, setCurrentPosition] = useState(null);

  /**
  * ExpandClickHandler
  * @param {Object} event - event on the selected element
  */
  const expandClickHandler = (event) => {
    setCurrentPosition(event.currentTarget.dataset.id);
  };

  const qavArray = getKey(askExpertData, 'questions');
  if (!isValidArray(qavArray)) return null;

  const QuestionList = qavArray.map((qav, idx) => {
    const question = getKey(qav, 'question');

    return (
      <QavContainer
        question={question}
        idx={idx}
        key={question}
        isOnlyQues
      />
    );
  });

  const QuesAnsVideoList = qavArray.map((qav, idx) => {
    const isExpand = currentPosition === idx.toString();
    const answer = getKey(qav, 'answer');
    const question = getKey(qav, 'question');
    const video = getKey(qav, 'video');

    return (
      <QavContainer
        key={question}
        question={question}
        answer={answer}
        video={video}
        idx={idx}
        isExpandText={isExpand}
        expandClickHandler={expandClickHandler}
      />
    );
  });

  return (
    <QuesAnsContainer className={className}>
      <QuesAnsLabel>
        <QuesAnsLabelText>{localization.get('content')}</QuesAnsLabelText>
      </QuesAnsLabel>
      <QuestionListContainer>{QuestionList}</QuestionListContainer>
      {QuesAnsVideoList}
    </QuesAnsContainer>
  );
};

AskTheExpertQA.propTypes = {
  askExpertData: PropTypes.object,
  className: PropTypes.string,
};

export default AskTheExpertQA;
