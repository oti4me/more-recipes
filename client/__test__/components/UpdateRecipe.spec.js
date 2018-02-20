import React from 'react';
import ConnectedUpdateRecipeForm, {
  UpdateRecipeForm
} from '../../src/components/updateRecipe/UpdateRecipeForm';
import ConnectedUpdateRecipePage, {
  UpdateRecipePage
} from '../../src/components/updateRecipe/UpdateRecipePage';

const props = {
  loggedIn: true,
  error: {},
  history: {},
  updateRecipe: jest.fn(),
  recipeDetails: jest.fn(),
  getRecipe: jest.fn(),
  match: {
    params: {
      id: 1
    }
  }
};

const event = {
  preventDefault: jest.fn(),
  target: {}
}

describe('Update recipe page suit', () => {

  it('Should render update recipe page component without exploding', () => {
    const wrapper = shallow(<UpdateRecipeForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should render update recipe component without exploding', () => {
    const wrapper = shallow(
      <ConnectedUpdateRecipeForm store={store} {...props} />
    );
    expect(wrapper.length).toBe(1);
  });

  it('Should render update recipe component without exploding', () => {
    const wrapper = shallow(
      <ConnectedUpdateRecipeForm store={store} {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('Should handle field change', () => {
    const wrapper = shallow(<UpdateRecipeForm {...props} />);
    wrapper.instance().handleChange(event);
    wrapper.instance().handleUpdateRecipe(event);
    wrapper.instance().handleImageChange(event);
    wrapper.find('#update').simulate('submit', event);
    expect(props.updateRecipe.mock.calls.length).toBe(2)
  });

});

describe('Update recipe form suit', () => {

  it('Should render Update recipe page component without exploding',
    () => {
      const wrapper = shallow(<UpdateRecipePage {...props} />);
      expect(wrapper).toMatchSnapshot();
    });

  it('Should render component without exploding', () => {
    const wrapper = shallow(
      <ConnectedUpdateRecipePage store={store} {...props} />
    );
    expect(wrapper.length).toBe(1);
  });

});

