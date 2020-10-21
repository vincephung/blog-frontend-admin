const Logout = () => {
  localStorage.removeItem('user');
  window.location.reload();
  return JSON.parse(localStorage.getItem('user'));
};

export default Logout;
