import React from 'react';
import ConnectedAddRecipePage, {
  AddRecipePage
} from '../../src/components/addRecipe/AddRecipePage';
import ConnectedAddRecipeForm, {
  AddRecipeForm
} from '../../src/components/addRecipe/AddRecipeForm';

const props = {
  loggedIn: true,
  error: {},
  history: {},
  addRecipeAction: jest.fn()
};

const event = {
  preventDefault: jest.fn(),
  target: {}
};

const recipe = {
  title: 'rice and beans',
  ingredients: 'rice and beans',
  direction: 'rice and beans',
  description: 'this is it',
  imageSrc: 'image/img.jpg',
  imageUrl: 'image/img.jpg',
}

describe('Add recipe page suit', () => {

  it('Should render add recipe page component without exploding', () => {
    const wrapper = shallow(<AddRecipePage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render add recipe connected component without exploding', () => {
    const wrapper = shallow(
      <ConnectedAddRecipePage store={store} {...props} />
    );
    expect(wrapper.length).toBe(1);
  });

});

describe('Add recipe form suit', () => {

  it('Should render add recipe page component without exploding', () => {
    const wrapper = shallow(<AddRecipeForm {...props} />);
    wrapper.instance().handleFieldChange(event);
    wrapper.instance().handleImageChange(event);
    wrapper.setState(
      recipe
    );
    wrapper.find('#formBtn').simulate('click', event);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toMatchSnapshot();
    expect(props.addRecipeAction.mock.calls.length).toBe(1)
  });

  it('Should render add recipe page component without exploding', () => {
    const wrapper = shallow(<AddRecipeForm {...props} />);
    wrapper.instance().handleFieldChange(event);
    wrapper.instance().handleImageChange(event);
    wrapper.find('#formBtn').simulate('click', event);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toMatchSnapshot();
    expect(props.addRecipeAction.mock.calls.length).toBe(1)
  });

  it('Should render component without exploding', () => {
    const wrapper = shallow(
      <ConnectedAddRecipeForm store={store} {...props} />
    );
    expect(wrapper.length).toBe(1);
  });

});

