const tabs = document.querySelector('.tabs');
const articles = document.querySelectorAll('.tabs-article');

const handleTabs = function (event) {
  const newArticles = Array.from(articles);
  for (const el of this.children) {
    el.classList.remove('active');
  }
  event.target.classList.toggle('active');
  newArticles.forEach(element => {
    element.classList.remove('active');
    if (element.dataset.id === event.target.dataset.id) {
      element.classList.add('active');
    }
  });
};

tabs.addEventListener('click', handleTabs);