import React from 'react';
import * as types from '../actions/action-types';
import popupsReducer, { togglePopup } from './popups-reducer';

const popups = [
  {
    id: 'test',
    visible: true,
    content: () => <div>Simple popup with a sample</div>,
  },
  {
    id: 'alert',
    visible: true,
    useOverlay: true,
    closeWithClick: false,
    content: () => <div>Another pop up</div>,
  },
];

const initialState = {
  list: [],
};

const state = {
  list: popups,
};

describe('REGISTER_POPUPS action', () => {
  it('should return the state with array list', () => {
    expect(popupsReducer(initialState, {
      type: types.REGISTER_POPUPS,
      list: popups,
    })).toEqual(state);
  });
  it('should return the same state if not valid list', () => {
    expect(popupsReducer(state, {
      type: types.REGISTER_POPUPS,
      list: 'not and array',
    })).toEqual(state);
  });
  it('should not register a popup if same popup id is already register', () => {
    expect(popupsReducer(state, {
      type: types.REGISTER_POPUPS,
      list: [{
        id: 'test',
        visible: true,
        content: () => <div>Simple popup with a other sample</div>,
      }],
    })).toEqual(state);
  });
});

describe('REMOVE_POPUPS action', () => {
  it('should return empty list', () => {
    expect(popupsReducer(state, {
      type: types.REMOVE_POPUPS,
    }).list).toEqual([]);
  });
});

describe('CLOSE_POPUP action', () => {
  it('should return set visisble to false in particular popup', () => {
    expect(popupsReducer(state, {
      type: types.CLOSE_POPUP,
      id: 'alert',
    }).list[1].visible).toBe(false);
  });
});

describe('SHOW_POPUP action', () => {
  it('should return set visisble to true in particular popup', () => {
    expect(popupsReducer(state, {
      type: types.SHOW_POPUP,
      id: 'alert',
    }).list[1].visible).toBe(true);
  });
  it('should return set visisble to true in particular popup and update the props', () => {
    expect(popupsReducer(state, {
      type: types.SHOW_POPUP,
      id: 'alert',
      propsPopup: {
        title: 'title',
      },
    }).list[1].props.title).toBe('title');
  });
});

describe('togglePopup', () => {
  it('should return state if list is not a valid array', () => {
    expect(togglePopup({}, 'testID', true)).toEqual({});
  });
});
