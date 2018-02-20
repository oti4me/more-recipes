import React from 'react';
import ConnectedRecipeDetailPage, { RecipeDetailPage }
  from '../../src/components/recipeDetail/RecipeDetailPage';
import ConnectedTopRecipeListe, { TopRecipeList }
  from '../../src/components/recipeDetail/TopRecipeList';
import ConnectedReviewsList, { ReviewsList }
  from '../../src/components/recipeDetail/ReviewsList';
import ConnectedReviewModal, { ReviewModal }
  from '../../src/components/recipeDetail/ReviewModal';
import ConnectedReviewCommentBox, { ReviewCommentBox }
  from '../../src/components/recipeDetail/ReviewCommentBox';
import ConnectedRecipeDetail, { RecipeDetail }
  from '../../src/components/recipeDetail/RecipeDetail';

const props = {
  match: {
    params: {}
  },
  user: {
    userId: 1
  },
  getRecipe: jest.fn(),
  checkFavourite: jest.fn(),
  getReviews: jest.fn(),
  addReview: jest.fn(),
  upvoteRecipe: jest.fn(),
  downVoteRecipe: jest.fn(),
  addFavourite: jest.fn(),
  getMostUpvotedRecipes: jest.fn(),
  recipeDetails: jest.fn(),
  reviews: [{
    userId: 1,
    recipeId: 1,
    comment: 'this is a review comment',
    User: {
      firstName: 'Henry',
      lastNamr: 'Otighe'
    }
  }]
};

const state = {
  comment: '',
  recviews: []
};

const event = {
  preventDefault: jest.fn(),
  target: {}
}

describe('<RecipeDetail>', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <RecipeDetail {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render connected component correctly', () => {
    const wrapper = shallow(
      <ConnectedRecipeDetail store={store} {...props} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });
  it('should handle recipe favourites', () => {
    const wrapper = shallow(
      <RecipeDetail {...props} />
    );
    wrapper.instance().handleAddFavourite({
      preventDefault: () => { },
      target: {
        dataset: []
      }
    });
  });
  it('should handle recipe upvotes', () => {
    const wrapper = shallow(
      <RecipeDetail {...props} />
    );
    wrapper.instance().handleUpvote({
      preventDefault: () => { },
      target: {
        dataset: []
      }
    });
  });
  it('should handle recipe downvotes', () => {
    const wrapper = shallow(
      <RecipeDetail {...props} />
    );
    wrapper.instance().handleDonwvote({
      preventDefault: () => { },
      target: {
        dataset: []
      }
    });
  });

});

describe('<RecipeDetailPage>', () => {
  it('should render correctly wihtout exploding', () => {
    const wrapper = shallow(
      <RecipeDetailPage {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render connected component correctly', () => {
    const wrapper = shallow(
      <ConnectedRecipeDetailPage store={store} {...props} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });
});

describe('<ReviewCommentBox>', () => {
  it('should render connected correctly', () => {
    const wrapper = shallow(
      <ConnectedReviewCommentBox store={store} {...props} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <ReviewCommentBox {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('<ReviewCommentBox>', () => {
    const wrapper = shallow(
      <ReviewCommentBox {...props} {...state} />
    );
    const comment = 'nice one';
    wrapper.setState({ comment });
    wrapper.setProps({
      match: { params: { id: 1 } }
    });
    wrapper.instance().submitComment(event);

    wrapper.find('form').simulate('click', event);
    expect(wrapper.instance().props.addReview).toHaveBeenCalled();
  });
});

describe('<ReviewsList>', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <ConnectedReviewsList store={store} {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <ReviewsList {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<ReviewModal>', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <ConnectedReviewModal store={store} {...props} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });

  it('should render correctly', () => {
    const wrapper = shallow(<ReviewModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<ReviewCommentBox>', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <ConnectedReviewCommentBox store={store} {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <ConnectedReviewCommentBox store={store} {...props} />
    );
    expect(wrapper.length).toBe(1);
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <ReviewCommentBox {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<TopRecipeList>', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <TopRecipeList {...props} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly', () => {
    const wrapper = shallow(
      <ConnectedTopRecipeListe store={store} {...props} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });
});