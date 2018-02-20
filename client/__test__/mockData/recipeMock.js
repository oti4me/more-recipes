export default {
  recipe: {
    title: 'rice and yam',
    description: 'this is a simple meal made with rice and yam',
    direction: 'all the direction you can give rice and yam',
    ingredients: 'all the ingredients required to make this meal',
    image: 'image/image.jpg'
  },

  updatedRecipe: {
    title: 'rice and yam',
    description: 'this is a simple meal made with rice and yam',
    direction: 'all the direction you can give rice and yam',
    ingredients: 'all the ingredients required to make this meal',
    image: 'image/image.jpg'
  },

  review: {
    userId: 1,
    recipeId: 1,
    comment: 'all the direction you can give rice and yam',
  },

  myRecipes: [
    {
      id: 1,
      title: 'rice and yam',
      description: 'this is a simple meal',
      direction: 'all the direction you can give rice and yam',
      ingredients: 'all the ingredients required to make this meal',
      image: 'image/otighe.jpg'
    },
    {
      id: 2,
      title: 'beans and yam',
      description: 'this is a simple meal made with rice and yam',
      direction: 'all the direction you can give rice and yam',
      ingredients: 'all the ingredients required to make this meal',
      image: 'image/henry.jpg'
    }
  ],
  favoriteRecipeMock: {
    title: 'Fried Rice',
    description: 'Just the way you like it',
    ingredients: 'salt;;water;;sugar',
    imageUrl: 'img.jpg',
    direction: 'Put the rice on the water and start cooking yourself',
    viewCount: 0,
    upvotes: 0,
    downvotes: 0,
    userId: 1,
  },
  requesting: {
    isRequesting: false
  }
}
