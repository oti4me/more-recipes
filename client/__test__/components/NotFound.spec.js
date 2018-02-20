import React from 'react';
import NotFound from '../../src/components/NotFound';

describe('Routes', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper).toMatchSnapshot();
  });
});