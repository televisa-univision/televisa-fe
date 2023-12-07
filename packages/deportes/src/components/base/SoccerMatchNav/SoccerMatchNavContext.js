import React from 'react';

const MatchCenterNavContext = React.createContext({
  items: [],
  setNavigationItem: () => {},
});
MatchCenterNavContext.displayName = 'MatchCenterNavContext';

export default MatchCenterNavContext;
