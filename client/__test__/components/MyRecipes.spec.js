import React from 'react';
import ConnectedMyRecipesPage, {
  MyRecipesPage
} from '../../src/components/myRecipes/MyRecipesPage';
import ConnectedMyRecipesList, {
  MyRecipesList
} from '../../src/components/myRecipes/MyRecipesList';

const state = {
  auth: {
    user: {
      userId: 1
    }
  },
  recipes: {}
}
const props = {
  getMyRecipes: jest.fn().mockImplementation(() => Promise.resolve()),
  deleteRecipe: jest.fn().mockImplementation(() => Promise.resolve()),
  user: {
    userId: 1
  }
}

const myRecipes = [
  {
    title: 'rice and beans',
    ingredients: 'rice and beans',
    direction: 'rice and beans',
    description: 'this is it',
    imageSrc: 'image/img.jpg',
    imageUrl: 'image/img.jpg',
  },
  {
    title: 'rice and beans',
    ingredients: 'rice and beans',
    direction: 'rice and beans',
    description: 'this is it',
    imageSrc: 'image/img.jpg',
    imageUrl: 'image/img.jpg',
  }
]

const event = {
  preventDefault: jest.fn(),
  target: {
    dataset: {

    }
  }
}
describe('Routes', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <MyRecipesPage store={store} {...props} />)
      ;
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <ConnectedMyRecipesPage store={store} {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

});

describe('Routes', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <MyRecipesList store={store} {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <ConnectedMyRecipesList store={store} {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Should handle field change', () => {
    const wrapper = shallow(<MyRecipesList {...props} {...state} />);
    wrapper.setState({
      myRecipes
    });
    wrapper.instance().handleDelete(event);
    wrapper.find('#delete').simulate('click', event);
    expect(props.deleteRecipe.mock.calls.length).toBe(1)
  });

});
