import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Store from '@univision/fe-commons/dist/store/store';
import { removePopups, registerPopups } from '@univision/fe-commons/dist/store/actions/popups-actions';
import PopupsConnector from './PopupsConnector';
import { closeCallback } from './PopupsWrapper';

const popups = [
  {
    id: 'test',
    visible: true,
    useOverlay: false,
    content: () => <div className="samplePopup">Simple popup with a sample</div>,
  },
  {
    id: 'test1',
    visible: true,
    useOverlay: true,
    closeWithClick: true,
    content: () => <div className="samplePopup">Simple popup with a other sample</div>,
  },
  {
    id: 'fakePopupWithNoContent',
    visible: true,
    useOverlay: true,
    closeWithClick: true,
  },
];
beforeEach(() => {
  Store.dispatch(removePopups());
});
describe('PopupsConnector', () => {
  it('should render two popups inside PopupsWrapper', () => {
    Store.dispatch(registerPopups(popups));
    const wrapper = mount(<Provider store={Store}><PopupsConnector /></Provider>);
    expect(wrapper.find('PopupsWrapper content').length).toBe(2);
  });
  it('should render null if not valid popup list in store', () => {
    const wrapper = mount(<Provider store={Store}><PopupsConnector /></Provider>);
    expect(wrapper.find('PopupsWrapper content').length).toBe(0);
  });
  it('should call closePopup function when close button clicked', () => {
    Store.dispatch(registerPopups([{
      id: 'test',
      visible: true,
      useOverlay: true,
      closeWithClick: true,
      content: () => <div className="samplePopup">Simple popup with a sample</div>,
    }]));
    const wrapper = mount(<Provider store={Store}><PopupsConnector /></Provider>);
    wrapper.find('Overlay').simulate('click');
    expect(Store.getState().popups.list[0].visible).toBe(false);
  });
  it('should render popup overlay correctly', () => {
    Store.dispatch(registerPopups([{
      id: 'test',
      visible: true,
      useOverlay: true,
      closeWithClick: true,
      content: () => <div className="samplePopup">Simple popup with a sample</div>,
    }]));
    const wrapper = mount(<Provider store={Store}><PopupsConnector /></Provider>);
    expect(wrapper.find('Overlay')).toHaveLength(1);
    expect(wrapper.find('Overlay')).toHaveStyleRule('background', 'rgba(0,0,0,0.5)');
    expect(wrapper.find('Overlay')).toHaveStyleRule('z-index', '121130');
  });

  it('should not render popup overlay correctly', () => {
    Store.dispatch(registerPopups([{
      id: 'test',
      visible: true,
      useOverlay: false,
      closeWithClick: true,
      content: () => <div className="samplePopup">Simple popup with a sample</div>,
    }]));
    const wrapper = mount(<Provider store={Store}><PopupsConnector /></Provider>);
    expect(wrapper.find('Overlay')).toHaveLength(0);
  });
  it('should call closePopup and onCLose function when close button clicked', () => {
    const onCloseSpy = jest.fn();
    Store.dispatch(registerPopups([{
      id: 'test',
      visible: true,
      useOverlay: true,
      closeWithClick: true,
      onClose: onCloseSpy,
      content: () => <div className="samplePopup">Simple popup with a sample</div>,
    }]));
    const wrapper = mount(<Provider store={Store}><PopupsConnector /></Provider>);
    wrapper.find('Overlay').simulate('click');
    expect(onCloseSpy).toHaveBeenCalledWith('test');
  });
  it('should not call close popup if dispatch is not a function', () => {
    Store.dispatch(registerPopups([{
      id: 'test',
      visible: true,
      useOverlay: true,
      closeWithClick: false,
      content: () => <div className="samplePopup">Simple popup with a sample</div>,
    }]));
    closeCallback('test', 'not a function');
    expect(Store.getState().popups.list[0].visible).toBe(true);
  });
});
