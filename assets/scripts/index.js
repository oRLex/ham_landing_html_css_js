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

// 
// Slider
// 
const slider = document.querySelector('.slider-track');
const btnPrev = document.querySelector('.arrow-left');
const btnNext = document.querySelector('.arrow-right');
const dots = document.querySelector('.slider-dots');
const slides = document.querySelectorAll('.slider-item');

let position = 0;
let index = 0;
let dot_index = 0;
let size = slides[index].clientWidth;


const updateSlide = function () {
  slider.style.transform = `translateX(${(-size * index)}px)`;
  Array.from(dots.children).forEach(element => element.classList.remove('active-dot'));
  if (dots.children[dot_index].tagName === 'A') {
    dots.children[dot_index].classList.add('active-dot');
  }
  if (dot_index === slides.length - 1) {
    btnNext.setAttribute('disabled', 'true');
  } else {
    btnNext.removeAttribute('disabled');
  }
  if (dot_index === 0) {
    btnPrev.setAttribute('disabled', 'true');

  } else {
    btnPrev.removeAttribute('disabled');
  }
};

const slide = function () {
  slider.style.transition = 'transform .5s easy-in-out';
  updateSlide();
};

const checkBtn = function () {
  if (position === 0) {
    btnPrev.setAttribute('disabled', 'true');
  } else {
    btnPrev.removeAttribute('disabled');
  }
  if (position === -(slides.length - 1) * slides[0].clientWidth) {
    btnNext.setAttribute('disabled', 'true');
  } else {
    btnNext.removeAttribute('disabled');
  }
};

const setPosition = function () {
  if (this.classList.contains('arrow-left')) {
    index--;
    position += size;
    if (dot_index === 0) {
      dot_index = 4;
    } else {
      dot_index--;
    }
  } else if (this.classList.contains('arrow-right')) {
    index++;
    position -= size;
    if (dot_index === 4) {
      dot_index = 0;
    } else {
      dot_index++;
    }
  }
  checkBtn();
  slide();

};

const dotFunc = function (event) {
  event.preventDefault();
  if (event.target.parentElement.tagName === 'A') {
    let i = parseInt(event.target.parentElement.dataset.triger);
    index = i;
    dot_index = i;

    slide();
  }
};

updateSlide();
checkBtn();

btnNext.addEventListener('click', setPosition);
btnPrev.addEventListener('click', setPosition);
dots.addEventListener('click', dotFunc);


/*
GALLARY
*/

var gallary = document.querySelector('#Gallary');

var msnry = new Masonry(gallary, {
  // options
  itemSelector: '.grid-item',
  columnWidth: 378,
  gutter: 10,
  stagger: 30,
  transitionDuration: '0.2s'
});


/*
WORK FILTER
*/
const filterTrigger = document.querySelector('.trigger-list');
const filterList = document.querySelector('.filter-list');
const addItem = document.querySelector('#addItem');
const work = document.querySelector('.work');

const filterCards = [

  {
    img: './assets/img/graphic_design/graphic-design5.jpg',
    dataItem: 'graphicDesing',
    filterValue: 'creative design',
    filterSubtext: 'Web Design'
  },
  {
    img: './assets/img/graphic_design/graphic-design7.jpg',
    dataItem: 'graphicDesing',
    filterValue: 'creative design',
    filterSubtext: 'Web Design'
  },
  {
    img: './assets/img/graphic_design/graphic-design9.jpg',
    dataItem: 'graphicDesing',
    filterValue: 'creative design',
    filterSubtext: 'Web Design'
  },
  {
    img: './assets/img/landing_page/landing-page1.jpg',
    dataItem: 'landingPages',
    filterValue: 'creative design',
    filterSubtext: 'Landing Page'
  },
  {
    img: './assets/img/landing_page/landing-page2.jpg',
    dataItem: 'landingPages',
    filterValue: 'creative design',
    filterSubtext: 'Landing Page'
  },
  {
    img: './assets/img/landing_page/landing-page3.jpg',
    dataItem: 'landingPages',
    filterValue: 'creative design',
    filterSubtext: 'Landing Page'
  },
  {
    img: './assets/img/landing_page/landing-page4.jpg',
    dataItem: 'landingPages',
    filterValue: 'creative design',
    filterSubtext: 'Landing Page'
  },
  {
    img: './assets/img/landing_page/landing-page7.jpg',
    dataItem: 'landingPages',
    filterValue: 'creative design',
    filterSubtext: 'Landing Page'
  },
  {
    img: './assets/img/wordpress/wordpress4.jpg',
    dataItem: 'wordpress',
    filterValue: 'creative design',
    filterSubtext: 'wordpress'
  },
  {
    img: './assets/img/wordpress/wordpress5.jpg',
    dataItem: 'wordpress',
    filterValue: 'creative design',
    filterSubtext: 'wordpress'
  },
  {
    img: './assets/img/wordpress/wordpress6.jpg',
    dataItem: 'wordpress',
    filterValue: 'creative design',
    filterSubtext: 'wordpress'
  },
  {
    img: './assets/img/wordpress/wordpress8.jpg',
    dataItem: 'wordpress',
    filterValue: 'creative design',
    filterSubtext: 'wordpress'
  },
];



const addItems = function (list) {
  addItem.remove();

  const loader = document.createElement('div');
  const gif = document.createElement('img');
  gif.src = './assets/icons/Pulse-1s-200px.gif';
  loader.classList.add('loader');
  loader.prepend(gif);
  work.append(loader);

  setTimeout(function () {
    loader.remove();
    list.forEach(element => {
      filterList.insertAdjacentHTML('beforeend', element);
    });
    doFilter();
  }, 2500);

};

const createFilterCard = function (event) {
  event.preventDefault();
  const li = filterCards.map(element => {
    let card = `
    <li class="filter-item" data-item="${element.dataItem}">
      <img src="${element.img}" alt="" class="filter-img">
      <div class="filter-desc">
        <div class="filter-action">
          <a href="#" class="filter-link"><i class="icon-link"></i></a>
          <a href="#" class="filter-link"><i class="icon-square"></i></a>
        </div>
        <h3 class="h3 filter-value">${element.filterValue}</h3>
        <p class="p filter-subtext">${element.filterSubtext}</p>
      </div>
    </li>
    `;
    return card;
  });

  addItems(li);
};

const doFilter = function () {
  const triggerElement = Array.from(filterTrigger.children).filter(element => element.classList.contains('active'));
  const listArray = Array.from(filterList.children);

  if (triggerElement[0].dataset.filter === 'all') {
    listArray.forEach(element => {
      element.style.cssText = 'display:list-item';
    });
  } else {
    listArray.forEach(element => element.style.cssText = 'display:list-item');
    listArray.filter(item => {
      if (item.dataset.item !== triggerElement[0].dataset.filter) {
        return item.style.cssText = 'display: none';
      }
    });

  }
};

const handleTriger = function (event) {
  event.preventDefault();
  for (const el of this.children) {
    el.classList.remove('active');
  }
  event.target.classList.toggle('active');
  doFilter();
};



addItem.addEventListener('click', createFilterCard);
filterTrigger.addEventListener('click', handleTriger);