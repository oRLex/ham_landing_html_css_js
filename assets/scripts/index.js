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

const pictureAction = document.querySelector('#addPicture');
const gallarySection = document.querySelector('.gallary');

const gallaryList = [{
    img: './assets/img/gallary/7.jpg'
  },
  {
    img: './assets/img/gallary/2.jpg'
  },
  {
    img: './assets/img/gallary/3.jpg'
  },
  {
    img: './assets/img/gallary/4.jpg'
  },
  {
    img: './assets/img/gallary/5.jpg'
  },
  {
    img: './assets/img/gallary/IA-Hourses-6 1.jpg'
  },
  {
    img: './assets/img/gallary/IA-billionares-6 1.jpg'
  },
  {
    img: './assets/img/gallary/9.jpg'
  },
]

const createGalleryItem = function (event) {
  event.preventDefault();
  const gridList = gallaryList.map(element => {
    let gridItem = `
        <div class="gallary-content">
          <img class="gallary-img" src="${element.img}" alt=""/>
          <div class="gallary-action">
            <a href="#" class="gallary-link"><i class="icon-gallary-seach"></i></a>
            <a href="#" class="gallary-link"><i class="icon-gallary-expand"></i></a>
          </div>
        </div>
    `
    return gridItem;
  })
  addGallery(gridList);

};

const addGallery = function (items) {
  const elems = [];
  const fragment = document.createDocumentFragment();

  pictureAction.remove();
  const loader = document.createElement('div');
  const gif = document.createElement('img');
  gif.src = './assets/icons/Pulse-1s-200px.gif';
  loader.classList.add('loader');
  loader.prepend(gif);
  gallarySection.append(loader);
  setTimeout(function () {
    loader.remove();
    items.forEach(item => {
      const gridWrap = document.createElement('div');
      gridWrap.classList.add('grid-item');
      gridWrap.innerHTML = item;
      fragment.appendChild(gridWrap)
      elems.push(gridWrap);
    });
    // append elements to container
    gallary.appendChild(fragment);
    // add and lay out newly appended elements
    msnry.appended(elems);
    msnry.layout();
    imagesLoaded(gallary).on('progress', function () {
      // layout Masonry after each image loads
      msnry.layout();
    });
  }, 2500);
};


pictureAction.addEventListener('click', createGalleryItem)


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