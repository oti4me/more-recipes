
const vailidator = {

  validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  },

  validatePassword(password) {
    const re = /^[a-zA-Z0-9!@#$%^&*()_\-.]{8,32}$/;
    return re.test(password);
  },

  validatePhoneNumber(phone) {
    const re = /^[0-9\-.]{9,15}$/;
    return re.test(phone);
  },

  validateSignup(userDetails) {

    const error = [];
    if (userDetails.firstName === '') {
      error.push({ message: 'First Name can\'t be empty!!' });
    } else if (userDetails.firstName && userDetails.firstName.length < 5) {
      error.push({ message: 'First Name can\'t be less than 2 characters!!' });
    }

    if (userDetails.lastName === '') {
      error.push({ message: 'Last Name can\'t be empty!!' });
    } else if (userDetails.lastName && userDetails.lastName.length < 5) {
      error.push({ message: 'Last Name can\'t be less than 2 characters!!' });
    }

    if (userDetails.email === '') {
      error.push({ message: 'Email can\'t be empty!!' });
    } else if (!this.validateEmail(userDetails.email)) {
      error.push({ message: 'Invalid email format!!' });
    }

    if (userDetails.phone === '') {
      error.push({ message: 'Phone number can\'t be empty!!' });
    } else if (!this.validatePhoneNumber(userDetails.phone)) {
      error.push({ message: 'Invalid mobile number!!' });
    }

    if (userDetails.password === '') {
      error.push({ message: 'Password can\'t be empty!!' });
    } else if (!this.validatePassword(userDetails.password)) {
      error.push({ message: 'Password can\'t be less than 8 characters, must contain Upper case, a number and a special character!!' });
    } else if (userDetails.password !== userDetails.confirmPassword) {
      error.push({ message: 'Passwords didnt match!!' });
    }

    return error;
  },

  validateSignin(userDetails) {
    const error = [];
    if (userDetails.email === '') {
      error.push({ message: 'Email can\'t be empty!!' });
    }
    if (userDetails.password === '') {
      error.push({ message: 'Phone number can\'t be empty!!' });
    }
    return error;
  },

  validateAddRecipe(recipeDetails) {
    const error = [];
    if (recipeDetails.title === '') {
      error.push({ message: 'Title can\'t be empty!!' });
    } else if (recipeDetails.title && recipeDetails.title.length < 5) {
      error.push({ message: 'Title can\'t be less than 5 characters!!' });
    }

    if (recipeDetails.ingredients === '') {
      error.push({ message: 'Ingredients can\'t be empty!!' });
    } else if (recipeDetails.ingredients && recipeDetails.ingredients.length < 5) {
      error.push({ message: 'Ingredients can\'t be less than 5 characters!!' });
    }

    if (recipeDetails.direction === '') {
      error.push({ message: 'Direction can\'t be empty!!' });
    } else if (recipeDetails.direction && recipeDetails.direction.length < 5) {
      error.push({ message: 'Direction can\'t be less than 5 characters!!' });
    }

    if (recipeDetails.description === '') {
      error.push({ message: 'Description can\'t be empty!!' });
    } else if (recipeDetails.description && recipeDetails.description.length < 5) {
      error.push({ message: 'Description can\'t be less than 5 characters!!' });
    }

    if (!recipeDetails.imageUrl) {
      error.push({ message: 'Image can\'t be empty!!' });
    }

    return error;
  },

  validateReviewRecipe(comment) {
    const error = [];
    if (comment === '') {
      error.push({ message: 'Review comment can\'t be empty!!' });
    }
    return error;
  },
}

export default vailidator;