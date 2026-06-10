let pages = [];

const setPages = (newPages) => {
  pages = newPages;
};

const getPages = () => {
  return pages;
};

module.exports = {
  setPages,
  getPages,
};