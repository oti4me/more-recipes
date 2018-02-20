import React from 'react';
import ConnectedHomePage, {
  HomePage
} from '../../src/components/home/HomePage';
import HomeBanner from '../../src/components/home/HomeBanner';
import ConnectedSearchRecipe, {
  SearchRecipe
} from '../../src/components/home/SearchRecipe';
import ConnetedMostFavouritedRecipes, {
  MostFavouritedRecipes
} from '../../src/components/home/MostFavouritedRecipes';
import ConnetedMostUpvotedRecipes, {
  MostVotedRecipes
} from '../../src/components/home/MostUpvotedRecipes';
import ConnetedRecipeList, {
  RecipeList
} from '../../src/components/home/RecipeList';

const recipes = [
  {
    title: 'rice and beans',
    description: 'rice and beans',
    direction: 'rice and beans',
    ingredients: 'rice and beans',
    imageUrl: 'image/image.jpg'
  },
  {
    title: 'rice and yam',
    description: 'rice and beans',
    direction: 'rice and beans',
    ingredients: 'rice and beans',
    imageUrl: 'image/image.jpg'
  }
]

const props = {
  getAllRecipes: jest
    .fn()
    .mockImplementation(() => Promise.resolve()),
  getFavouritedRecipes: jest
    .fn()
    .mockImplementation(() => Promise.resolve()),
  getMostUpvotedRecipes: jest
    .fn()
    .mockImplementation(() => Promise.resolve())
}
describe('Home Page', () => {
  it('should render unconnected <HomePage> correctly', () => {
    const wrapper = shallow(<HomePage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render connected <HomePage> correctly', () => {
    const wrapper = shallow(<ConnectedHomePage store={store} {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });

  it('should render <HomeBanner> correctly', () => {
    const wrapper = shallow(
      <HomeBanner {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render <SearchRecipe> correctly', () => {
    const wrapper = shallow(
      <SearchRecipe {...props} store={store} />
    );
    wrapper.setState({
      recipes
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render  connected <SearchRecipe> correctly', () => {
    const wrapper = shallow(
      <ConnectedSearchRecipe {...props} store={store} />
    );
    wrapper.setState({
      recipes
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <ConnectedSearchRecipe {...props} store={store} />
    );
    wrapper.setState({
      recipes
    });
    expect(wrapper.length).toBe(1);
  });

  // most favourited recipe 

  it('Most favourited recipes', () => {
    const wrapper = shallow(
      <ConnetedMostFavouritedRecipes {...props} store={store} />
    );
    wrapper.setState({
      recipes
    });
    expect(wrapper.length).toBe(1);
  });

  it('Most favourited recipes', () => {
    const wrapper = shallow(
      <ConnetedMostFavouritedRecipes {...props} store={store} />
    );
    wrapper.setState({
      recipes
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('Most favourited recipes', () => {
    const wrapper = shallow(
      <MostFavouritedRecipes {...props} />
    );
    wrapper.setState({
      recipes
    });
    expect(wrapper).toMatchSnapshot();
  });

  describe('<MostFavouritedRecipes>', () => {
    it('Most favourited recipes', () => {
      const wrapper = shallow(
        <ConnetedMostUpvotedRecipes {...props} store={store} />
      );
      wrapper.setState({
        recipes
      });
      expect(wrapper.length).toBe(1);
    });

    it('Most favourited recipes', () => {
      const wrapper = shallow(
        <ConnetedMostUpvotedRecipes {...props} store={store} />
      );
      wrapper.setState({
        recipes
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('Most favourited recipes', () => {
      const wrapper = shallow(
        <MostVotedRecipes {...props} />
      );
      wrapper.setState({
        recipes
      });
      expect(wrapper).toMatchSnapshot();
    });
  })

  describe('<MostFavouritedRecipes>', () => {
    it('Most favourited recipes', () => {
      const wrapper = shallow(
        <ConnetedRecipeList {...props} store={store} />
      );
      wrapper.setState({
        recipes
      });
      expect(wrapper.length).toBe(1);
    });

    it('Most favourited recipes', () => {
      const wrapper = shallow(
        <ConnetedRecipeList {...props} store={store} />
      );
      wrapper.setState({
        recipes
      });
      expect(wrapper).toMatchSnapshot();
    });

    it('Most favourited recipes', () => {
      const wrapper = shallow(
        <RecipeList {...props} />
      );
      wrapper.setState({
        recipes
      });
      expect(wrapper).toMatchSnapshot();
    });
  })
});
