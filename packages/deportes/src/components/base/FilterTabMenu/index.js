import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TabName from '@univision/shared-components/dist/components/v2/TabName';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Styles from './FilterTabMenu.scss';

/**
 * Filter Tab Menu wrapper
 * @param {Object} props wrapper props
 * @returns {?JSX}
 */
const FilterTabMenu = (props) => {
  const {
    filterTypes,
    className,
    activeFilter,
    onChange,
  } = props;
  if (!isValidArray(filterTypes)) {
    return null;
  }
  const active = filterTypes.find(content => content.id === `${activeFilter}`) || {
    name: localization.get('all'),
    id: '0',
  };
  const mobileContent = [];
  const desktopContent = [];

  // Filter content by platform
  filterTypes.forEach((content) => {
    mobileContent.push(
      <option
        value={content.id}
        key={`mobile${content.id}`}
        name={content.name}
      >
        {content.name}
      </option>
    );
    desktopContent.push(
      <TabName
        className={classnames(Styles.filter,
          `key${content.id}`,
          {
            [Styles.active]: content.id === active.id,
          })}
        key={`desk${content.id}`}
        onPress={event => onChange(event, content)}
        content={content.name}
      />
    );
  });

  return (
    <div className={classnames(className, Styles.container)}>
      <div className={Styles.filterDesktop}>
        <div className={Styles.filterList}>
          {desktopContent}
        </div>
      </div>
      <div className={Styles.selectMobile}>
        <select
          value={active.id}
          onChange={event => onChange(event.nativeEvent, filterTypes.find(content => content.id === `${event.target.value}`))}
        >
          {mobileContent}
        </select>
        <Icon name="arrowDown" size="small" className={Styles.downArrow} />
      </div>
    </div>
  );
};

/**
 * propTypes
 * @property {Object} filterTypes - the filter types
 * @property {string} filterTypes.name - the league name
 * @property {string} filterTypes.id - the league ID
 * @property {string} [currentFilter] the ID of current filter
 * @property {string} [className] - a custom class name
 * @property {Function} [onChange] - the callback when change of filter type
 */
FilterTabMenu.propTypes = {
  filterTypes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    })
  ),
  activeFilter: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

/**
 * Default Prop Values
 */
FilterTabMenu.defaultProps = {
  filterTypes: [],
  onChange: () => {},
  activeFilter: '0',
};

export default FilterTabMenu;
