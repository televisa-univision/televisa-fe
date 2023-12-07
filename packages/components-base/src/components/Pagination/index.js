import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { isValidFunction } from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Styles from './Pagination.scss';

/**
 * Pagination button component
 * @returns {JSX}
 */
export const PaginationButton = ({ children, updateNumber, onUpdate }) => (
  <button
    className={Styles.button}
    onClick={() => {
      if (isValidFunction(onUpdate)) {
        onUpdate(updateNumber);
      }
    }}
  >
    {children}
  </button>
);

PaginationButton.propTypes = {
  children: PropTypes.node.isRequired,
  onUpdate: PropTypes.func,
  updateNumber: PropTypes.number.isRequired,
};

/**
 * Pagination component for liveblog
 * @returns {JSX}
 */
const Pagination = ({
  activePageNumber,
  className,
  onUpdate,
  totalPages,
}) => {
  const prevOnUpdateProp = (activePageNumber > 1) ? { onUpdate } : null;
  const nextOnUpdateProp = (activePageNumber < totalPages) ? { onUpdate } : null;

  return (
    <div className={classnames(Styles.container, className)} data-component-name="pagination">
      <div className={classnames(Styles.start, { [Styles.hidden]: !(activePageNumber > 1) })}>
        <PaginationButton updateNumber={1} {...prevOnUpdateProp}>
          <Icon name="liveblogPageAll" size={16} />
        </PaginationButton>
      </div>
      <div className={classnames(Styles.prev, { [Styles.hidden]: !(activePageNumber > 1) })}>
        <PaginationButton updateNumber={activePageNumber - 1} {...prevOnUpdateProp}>
          <Icon name="liveblogPage" size={13} />
        </PaginationButton>
      </div>
      <div className={Styles.count}>
        {activePageNumber} {localization.get('of')} {totalPages}
      </div>
      <div
        className={classnames(Styles.next, { [Styles.hidden]: !(activePageNumber < totalPages) })}
      >
        <PaginationButton updateNumber={activePageNumber + 1} {...nextOnUpdateProp}>
          <Icon name="liveblogPage" size={13} />
        </PaginationButton>
      </div>
      <div
        className={classnames(Styles.end, { [Styles.hidden]: !(activePageNumber < totalPages) })}
      >
        <PaginationButton updateNumber={totalPages} {...nextOnUpdateProp}>
          <Icon name="liveblogPageAll" size={16} />
        </PaginationButton>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  activePageNumber: PropTypes.number.isRequired,
  className: PropTypes.string,
  onUpdate: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
