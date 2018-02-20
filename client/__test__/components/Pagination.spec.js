import React from 'react';
import ConnectedPagination, {
  Pagination
} from '../../src/components/Pagination';

describe('Routes', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Pagination />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(<ConnectedPagination store={store} />);
    expect(wrapper).toMatchSnapshot();
  });
});