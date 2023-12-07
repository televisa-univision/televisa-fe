export default {
  openRegistration: (
    state,
  ) => {
    if ('document' in global) {
      /**
       * WARNING: DO NOT MANIPULATE THE DOM DIRECTLY IF YOU ARE TARGETING AN
       * ELEMENT THAT'S INSIDE THE REACT TREE.
       *
       * The only reason we do it here is because this is an edge case. For the
       * scrolling on the mega menu to correctly work, we need to hide the
       * overflow-y of the body element, which lives outside of the react tree. If
       * not, the user would weirdly start scrolling the main page when having
       * finished scrolling on the mega menu.
       */
      global.document.body.classList.add('sections-mobile-open');
    }
    const newState = state;
    newState.isRegistrationOpen = true;
  },
  closeRegistration: (
    state,
  ) => {
    if ('document' in global) {
      global.document.body.classList.remove('sections-mobile-open');
    }
    const newState = state;
    newState.isRegistrationOpen = false;
  },
};
