const GetUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  //checks if user is logged in and gives them access to stuff
  return user;
};

export default GetUser;
