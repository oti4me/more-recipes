const header = () => ({
  headers: {
    'x-access-token': window.localStorage.userToken,
    authorization: window.localStorage.userToken
  }
});

export default header;
