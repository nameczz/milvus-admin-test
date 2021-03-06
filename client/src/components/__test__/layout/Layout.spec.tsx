import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Layout from '../../layout/Layout';

let container: any = null;

jest.mock('../../layout/GlobalEffect', () => {
  return () => {
    return <div id="global">{}</div>;
  };
});

describe('Test Layout', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('Test Render', () => {
    act(() => {
      render(<Layout />, container);
    });

    expect(container.querySelectorAll('#global').length).toEqual(1);
  });
});
