import Breakpoint from './breakPointMediator';
import Store from '../../store/store';
import { setCurrentBreakPoint } from '../../store/actions/page-actions';

/*
 xs: 480px,
 sm: 768px,
 md: 1024px,
 lg: 1280px,
 xl: 1440px
 */
Store.dispatch(setCurrentBreakPoint(['xl', 1440, 'desktop']));

describe('breakpoint getDevice', () => {
  it('should be desktop', () => {
    Breakpoint.value = 'xl';
    expect(Breakpoint.getDevice()).toBe('desktop');
  });

  it('should be desktop', () => {
    Breakpoint.value = 'lg';
    expect(Breakpoint.getDevice()).toBe('desktop');
  });

  it('should be tablet', () => {
    Breakpoint.value = 'md';
    expect(Breakpoint.getDevice()).toBe('tablet');
  });

  it('should be tablet', () => {
    Breakpoint.value = 'sm';
    expect(Breakpoint.getDevice()).toBe('tablet');
  });

  it('should be mobile', () => {
    Breakpoint.value = 'xs';
    expect(Breakpoint.getDevice()).toBe('mobile');
  });

  it('should be device stored value', () => {
    Breakpoint.value = '';
    expect(Breakpoint.getDevice()).toBe('desktop');
  });
});

describe('breakpoint getValue', () => {
  it('should be desktop', () => {
    Breakpoint.value = 'xl';
    expect(Breakpoint.getValue()).toBe('xl');
  });
  it('should be size stored value', () => {
    Breakpoint.value = '';
    expect(Breakpoint.getValue()).toBe('xl');
  });
});

describe('breakpoint getWidth', () => {
  it('should be desktop', () => {
    Breakpoint.value = 'xl';
    expect(Breakpoint.getWidth()).toBe(1440);
  });
  it('should be width stored value', () => {
    Breakpoint.value = '';
    expect(Breakpoint.getWidth()).toBe(1440);
  });
});
