import * as Actions from './popups-actions';
import * as types from './action-types';

describe('Popups Actions tests', () => {
  it('registerPopups returns expected action type', () => {
    expect(Actions.registerPopups([]))
      .toEqual({
        type: types.REGISTER_POPUPS,
        list: [],
      });
  });
  it('RemovePopups returns expected action type', () => {
    expect(Actions.removePopups('test'))
      .toEqual({
        type: types.REMOVE_POPUPS,
      });
  });
  it('showPopup returns expected action type', () => {
    expect(Actions.showPopup('test'))
      .toEqual({
        type: types.SHOW_POPUP,
        id: 'test',
      });
  });
  it('showPopup with props returns expected action type', () => {
    expect(Actions.showPopup('test', {}))
      .toEqual({
        type: types.SHOW_POPUP,
        id: 'test',
        propsPopup: {},
      });
  });
  it('closePopup returns expected action type', () => {
    expect(Actions.closePopup('abc'))
      .toEqual({
        type: types.CLOSE_POPUP,
        id: 'abc',
      });
  });
});
