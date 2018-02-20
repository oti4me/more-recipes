import React from 'react';
import Footer from '../../src/components/Footer';

describe('Routes', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).toMatchSnapshot();
  });
});