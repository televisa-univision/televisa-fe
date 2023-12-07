import React from 'react';
import styled from 'styled-components';

import Styles from './List.styles';

const Card = styled.div`
  ${Styles.card}
`;
const Aside = styled.aside`
  ${Styles.aside}
`;
const TitleContainer = styled.div`
  ${Styles.titleContainer}
`;
const Button = styled.div`
  ${Styles.button}
`;
const AdBackground = styled.div`
  ${Styles.adBackground}
`;
const cards = [0, 1, 2, 3, 4, 5];

/**
 * List Placeholder component for widgets
 * @param {Object} props - Props object containing data
 * @returns {JSX}
 * @constructor
 */
const List = () => {
  return (
    <div className="row">
      <div className="col-12">
        <TitleContainer />
        <div className="row">
          <div className="col-12 col-md-8">
            <div className="row">
              {
                cards.map(card => (
                  <div key={card} className="col-12 col-sm-6">
                    <Card index={card} />
                  </div>
                ))
              }
              <div className="col-12">
                <Button />
              </div>
            </div>
          </div>
          <Aside className="col-md-4">
            <AdBackground />
          </Aside>
        </div>
      </div>
    </div>
  );
};

export default List;
