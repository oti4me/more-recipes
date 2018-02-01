
const vailidator = {

  validateSigin(userDetails) {
    const error = [];
    if (userDetails.firstName === '') {
      error.push({ message: 'First Name can\'t be empty!!' });
    }
    if (userDetails.lastName === '') {
      error.push({ message: 'Last Name can\'t be empty!!' });
    }
    if (userDetails.email === '') {
      error.push({ message: 'Email can\'t be empty!!' });
    }
    if (userDetails.phone === '') {
      error.push({ message: 'Phone number can\'t be empty!!' });
    }
    return error;
  },

  validateAddRecipe(recipeDetails) {
    const error = [];
    if (recipeDetails.title === '') {
      error.push({ message: 'Title can\'t be empty!!' });
    }
    if (recipeDetails.ingredients === '') {
      error.push({ message: 'Ingredients can\'t be empty!!' });
    }
    if (recipeDetails.direction === '') {
      error.push({ message: 'Direction can\'t be empty!!' });
    }
    if (recipeDetails.description === '') {
      error.push({ message: 'Description can\'t be empty!!' });
    }
    if (!recipeDetails.imageUrl) {
      error.push({ message: 'Image can\'t be empty!!' });
    }
    return error;
  }
}

export default vailidator;