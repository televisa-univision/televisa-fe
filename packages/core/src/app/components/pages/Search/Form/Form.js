import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { isValidArray, isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import Dropdown from '@univision/fe-components-base/dist/components/Dropdown';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Loader from '../Loader/Loader';

import Styles from './Form.scss';

/**
 * Search Form
 */
class Form extends React.PureComponent {
  /**
   * Convert the options data
   * @param {Object} data options to be mapped
   * @returns {Object} new options with the correct values (name, value)
   */
  static optionsMapping(data) {
    let dataMapped = [];
    if (isValidArray(data)) {
      dataMapped = data
        .map((item) => {
          const {
            code,
            label,
          } = item;
          return {
            name: label,
            value: code,
          };
        });
    }
    return dataMapped;
  }

  /**
   * Main constructor
   * @param {Object} props React Props for this component
   */
  constructor(props) {
    super(props);

    const { optionsMapping } = this.constructor;
    const { query } = props;

    this.filterTypeOptions = optionsMapping(props.page.typeFilters);
    this.filterDateOptions = optionsMapping(props.page.dateFilters);
    this.filterTypeOptions.unshift({ name: localization.get('all'), value: 'all' });

    this.textInput = React.createRef();
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchValue: query || '',
    };
  }

  /**
   * Assigning input value on first load
   */
  componentDidMount() {
    const {
      query,
    } = this.props;
    this.textInput.current.value = query;
  }

  /**
   * Update the displayed query
   * @param {Object} prevProps Prev props
   */
  componentDidUpdate(prevProps) {
    const {
      query,
    } = this.props;
    if (query !== prevProps.query) {
      this.textInput.current.value = query;
    }
  }

  /**
   * handle search input on blur event
   * @param {Object} event the event
   */
  handleInputBlur(event) {
    const {
      props: { handleInputBlur, query },
      state: { searchValue },
    } = this;

    if (event.target.value === '' && searchValue !== '') {
      this.setState({ searchValue: query });
    } else if (isValidFunction(handleInputBlur)) {
      handleInputBlur(event);
    }
  }

  /**
   * OnChange handler
   * @param {Object} event the event received
   */
  handleChange(event) {
    const { target: { value } } = event;
    this.setState({ searchValue: value });
  }

  /**
   * Render a Search Sidebar
   * @returns {JSX}
   */
  render() {
    const {
      props: {
        dateFilter,
        placeholder,
        resultSize,
        results,
        loading,
        onChangeFilterByType,
        onChangeFilterByDate,
        handleSubmitForm,
      },
    } = this;

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <form onSubmit={handleSubmitForm} id="search-form" className={Styles.form}>
        <div className={Styles.field}>
          <input
            className={classnames(Styles.input, 'uvs-font-a-bold')}
            type="text"
            ref={this.textInput}
            placeholder={placeholder}
            onBlur={this.handleInputBlur}
            name="search-box"
            onChange={this.handleChange}
          />
          <button type="submit" className={Styles.submit}>
            <Icon name="search" size="xsmall" fill="#333333" />
          </button>
        </div>
        {results.length > 0
          && <p className={Styles.resultText}>{resultSize} {localization.get('results')}</p>
        }
        <div className={Styles.filters}>
          <div className="row">
            <div
              className={classnames('col-6 col-md-4', Styles.offset)}
            >
              <div className={Styles.filterField}>
                <label htmlFor="select-type">
                  <span>{localization.get('contentType')}:</span>
                  <Dropdown
                    className={classnames(Styles.select, Styles.selectType)}
                    name="select-type"
                    onChange={onChangeFilterByType}
                    options={this.filterTypeOptions}
                    placeholder={localization.get('contentType')}
                  />
                </label>
              </div>
            </div>
            <div className="col-6 col-md-4">
              <div className={Styles.filterField}>
                <label htmlFor="select-date">
                  <span>{localization.get('date')}:</span>
                  <Dropdown
                    className={classnames(Styles.select, Styles.selectDate)}
                    name="select-date"
                    onChange={onChangeFilterByDate}
                    options={this.filterDateOptions}
                    placeholder={localization.get('date')}
                    value={dateFilter}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <Loader loading={loading} />
      </form>
    );
  }
}

/**
 * propTypes
 * @property {string} dateFilter - the date filter to filter results by
 */
Form.propTypes = {
  dateFilter: PropTypes.string,
  page: PropTypes.object,
  query: PropTypes.string,
  placeholder: PropTypes.string,
  resultSize: PropTypes.number,
  results: PropTypes.array,
  loading: PropTypes.bool,
  onChangeFilterByType: PropTypes.func,
  onChangeFilterByDate: PropTypes.func,
  handleInputBlur: PropTypes.func,
  handleSubmitForm: PropTypes.func,
};

export default Form;
