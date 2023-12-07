import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import isValidEmail from '@univision/fe-utilities/helpers/url/isValidEmail';
import { BLACK_GREY } from '@univision/fe-utilities/styled/constants';
import jobQuickApply from '@univision/fe-graphql-services/dist/requests/mutations/jobQuickApply';
import fetchGraphQL from '@univision/fe-commons/dist/utils/api/graphql';
import InputField from '@univision/fe-components-base/dist/components/InputField';
import Clickable from '@univision/fe-components-base/dist/components/Clickable';
import Icon from '@univision/fe-icons/dist/components/Icon';
import LocalStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import {
  getApploiUser,
  getJobApplicationStatus,
} from '@univision/fe-graphql-services/dist/requests/queries/jobSearch';
import Loading from '@univision/fe-components-base/dist/components/Loading';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import { QUICK_APPLY_ERROR } from '@univision/fe-commons/dist/constants/messages';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Style from './style.scss';
import Styles from './QuickApply.styles';
import { theme } from '../constants';
import CheckboxComponent from './CheckboxComponent';
import PrintComponent from './PrintComponent';

const AttachResume = styled.div`${Styles.attachResume}`;
const Button = styled(Clickable)``;
const ClickHere = styled.span`${Styles.clickHere}`;
const Clear = styled.div.attrs({ role: 'button' })``;
const Close = styled(Icon).attrs({ name: 'close', size: 14 })`${Styles.closeIcon}`;
const Form = styled.form`${Styles.wrapper}`;
const PaperClip = styled(Icon).attrs({ fill: BLACK_GREY, name: 'paperClip', size: 13 })`${Styles.paperClip}`;
const Title = styled.span`${Styles.title}`;
const Text = styled.span`${Styles.text}`;
const TermsText = styled.label.attrs({ className: 'uvs-font-a-light' })`${Styles.termsText}`;
const Input = styled(InputField)`${Styles.input}`;
const InputFile = styled.input.attrs({ type: 'file', accept: 'application/pdf' })`${Styles.inputFile}`;

/**
 * Quick apply component
 * @param {string} id - job id
 * @param {Object} page - page information
 * @param {Object} partner - information about apploi partner/job
 * @param {string} utmSource - platform web or app
 * @param {string} label - apply button label
 * @param {string} language - language content is displayed spanish or english
 * @returns {JSX.Element}
 * @constructor
 */
const QuickApply = ({
  id, page, partner, utmSource, label, language, resumeRequired,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitActive, setSubmitActive] = useState(false);
  const [resumeFileName, setResumeFileName] = useState();
  const [resumeBase64, setResumeBase64] = useState();
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState({ email: null });

  const firstNameLabel = localization.get('firstName', { language });
  const lastNameLabel = localization.get('lastName', { language });
  const phoneNumberLabel = `${localization.get('phoneNumber', { language })} (${localization.get('optional', { language })})`;
  const attachLabel = resumeRequired
    ? `${localization.get('attachResume', { language })} (${localization.get('required', { language })})`
    : `${localization.get('attachResume', { language })} (${localization.get('optional', { language })})`;
  const inputRef = useRef();

  useEffect(() => {
    const token = LocalStorage.getObject('apploiToken');
    if (token) {
      (async () => {
        try {
          setFirstLoad(true);
          const response = await fetchGraphQL({
            query: getJobApplicationStatus,
            variables: {
              jobId: id,
              token,
            },
            serverUri: page?.config?.graphql,
          });
          const applied = response.getJobApplicationStatus.alreadyApplied;
          setAlreadyApplied(applied);
        } catch (err) {
          err.message = `${QUICK_APPLY_ERROR} getJobApplicationStatus rejected: ${err.message}`;
          clientLogging(err);
        }
        setFirstLoad(false);
      })();
    }
  }, [id, page]);

  useEffect(() => {
    const token = LocalStorage.getObject('apploiToken');
    if (token) {
      (async () => {
        try {
          setLoading(true);
          const response = await fetchGraphQL({
            query: getApploiUser,
            variables: { token },
            serverUri: page?.config?.graphql,
          });
          setFirstName(response.getApploiUser.firstName);
          setLastName(response.getApploiUser.lastName);
          setEmail(response.getApploiUser.email);
          setPhone(response.getApploiUser.phoneNumber);
          setResumeFileName(response.getApploiUser.resumeFileName);
        } catch (err) {
          err.message = `${QUICK_APPLY_ERROR} getApploiUser rejected: ${err.message}`;
          clientLogging(err);
        }
        setLoading(false);
      })();
    }
  }, [page]);

  useEffect(() => {
    const isFormValid = firstName
      && lastName
      && email
      && termsAccepted
      && (!resumeRequired || resumeBase64);
    setSubmitActive(isFormValid);
  }, [firstName, lastName, email, phone, termsAccepted, resumeBase64, resumeRequired]);

  /**
   * Handle search bar events
   * @param {Object} e - event submit
   */
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const {
      sponsored,
      source,
      redirectApply,
      utmMedium,
      utmCampaign,
      keyword,
      searchFetchId,
      order,
      cityCenter,
    } = partner;

    try {
      setLoading(true);
      const application = {
        utmSource,
        user: {
          firstName,
          lastName,
          email,
          phone,
        },
        job: {
          jobId: id,
          partner: {
            sponsored,
            source,
            redirectApply,
            utmMedium,
            utmCampaign,
            keyword,
            searchFetchId,
            page: partner.page,
            order,
            cityCenter,
            utmSource: partner.utmSource,
          },
        },
      };
      if (resumeBase64) {
        application.resume = {
          name: resumeFileName,
          data: resumeBase64,
        };
      }

      const response = await fetchGraphQL({
        query: jobQuickApply,
        variables: application,
        serverUri: page?.config?.graphql,
      });
      setAlreadyApplied(true);
      LocalStorage.setObject('apploiToken', response.quickApply.token);
    } catch (err) {
      err.message = `${QUICK_APPLY_ERROR} jobQuickApply rejected: ${err.message}`;
      clientLogging(err);
    }
    setLoading(false);
  }, [id, firstName, lastName, email, phone, resumeBase64, resumeFileName, partner, utmSource]);

  /**
   * Convert file to base64 string
   * @param {Object} file selected from the user
   * @returns {Promise<unknown>}
   */
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        return resolve(reader.result);
      };
    });
  };

  /**
   * Handle the upload of file
   * @param {Object} e target for the event
   * @returns {Promise<void>}
   */
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFileName(file.name);
      const resume = await getBase64(file);
      setResumeBase64(resume.replace('data:application/pdf;base64,', ''));
    }
  };

  /**
   * Clear Resume state
   */
  const clearResume = () => {
    setResumeFileName();
    setResumeBase64();
  };

  /**
   * Handle onBlur input event
   * @param {Object} e target for the event
   */
  const onBlur = (e) => {
    if (e.target.id === 'email' && !isValidEmail(email)) {
      setErrors(prevState => ({ ...prevState, email: 'Error: invalid email' }));
    }
  };

  /**
   * Handle onChange event
   * @param {Object} e - event object
   */
  const onChange = (e) => {
    switch (e.target.name) {
      case 'firstName':
        setFirstName(e?.target?.value);
        break;
      case 'lastName':
        setLastName(e?.target?.value);
        break;
      case 'email':
        setEmail(e?.target?.value);
        break;
      case 'phone':
        setPhone(e?.target?.value);
        break;
      case 'checkbox':
        setTermsAccepted(e?.target?.checked);
        break;
      default:
        break;
    }
  };

  /**
   * Set state to initial values
   */
  const resetState = () => {
    setAlreadyApplied(false);
    setTermsAccepted(false);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setResumeFileName('');
  };

  if (firstLoad) return <Loading theme={theme} size="medium" />;

  return (
    <Form noValidate>
      <Title>{alreadyApplied ? localization.get('applied', { language }) : label}</Title>
      {
        alreadyApplied
          ? (
            <PrintComponent
              firstName={firstName}
              lastName={lastName}
              email={email}
              phone={phone}
              resumeFileName={resumeFileName}
            />
          ) : (
            <>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                label={firstName && firstNameLabel}
                placeholder={firstNameLabel}
                onChange={onChange}
                onBlur={onBlur}
                value={firstName}
              />

              <Input
                id="lastName"
                name="lastName"
                type="text"
                label={lastName && lastNameLabel}
                placeholder={lastNameLabel}
                onChange={onChange}
                onBlur={onBlur}
                value={lastName}
              />

              <Input
                id="email"
                name="email"
                type="email"
                label={email && localization.get('email', { language })}
                placeholder={localization.get('placeholderEmail', { language })}
                onChange={onChange}
                error={error.email}
                onBlur={onBlur}
                value={email}
                onFocus={() => setErrors(prevState => ({ ...prevState, email: null }))}
              />

              <Input
                id="phone"
                name="phone"
                type="num"
                label={phone && phoneNumberLabel}
                placeholder={phoneNumberLabel}
                onChange={onChange}
                value={phone}
                onBlur={onBlur}
              />
            </>
          )
      }
      <InputFile ref={inputRef} onChange={uploadFile} />
      {alreadyApplied
      && (
        <TermsText>{`${localization.get('notYou', { language })} `}
          <ClickHere onClick={resetState}>{localization.get('clickHere', { language })}</ClickHere>
        </TermsText>
      )}
      {
        !alreadyApplied && (
          <>
            <AttachResume>
              <Text onClick={() => inputRef.current.click()}>
                <PaperClip />{resumeFileName || attachLabel}
              </Text>
              {resumeFileName && <Clear onClick={clearResume}><Close /></Clear>}
            </AttachResume>
            <Button
              label="Enviar"
              type="button"
              appearance="primary"
              active={submitActive}
              onClick={handleSubmit}
              className={Style.button}
              disabled={!submitActive}
            />
            <CheckboxComponent
              checked={termsAccepted}
              language={language}
              name="checkbox"
              onChange={onChange}
            />
          </>
        )
      }
      {loading && <Loading theme={theme} size="medium" />}
    </Form>
  );
};

/**
 * Maps redux state to component props.
 * @param {Object} state redux state
 * @returns {Object}
 */
export const mapStateToProps = (state) => {
  return {
    page: state.page,
  };
};

QuickApply.propTypes = {
  id: PropTypes.string.isRequired,
  partner: PropTypes.object.isRequired,
  page: PropTypes.shape({
    config: PropTypes.shape({
      graphql: PropTypes.string,
    }),
  }),
  utmSource: PropTypes.string,
  label: PropTypes.string,
  language: PropTypes.string.isRequired,
  resumeRequired: PropTypes.bool,
};

export default connect(mapStateToProps)(QuickApply);
