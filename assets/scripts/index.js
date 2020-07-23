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
let position = 0;
const sliderContainer = document.querySelector('.slider-container');
const sliderTrack = document.querySelector('.slider-track');
const sliderItems = document.querySelectorAll('.slider-item');
const btnPrev = document.querySelector('.arrow-left');
const btnNext = document.querySelector('.arrow-right');
const sliderDot = document.querySelector('.slider-dots');
const itemWidth = document.querySelector('.slider-item').clientWidth;


const slideLeft = function(event){
  event.preventDefault();
  position += itemWidth;

  setPosition();
  checkBtn();
};

const slideRight = function(event){
  event.preventDefault();
  position -= itemWidth;

  setPosition();
  checkBtn();
};

const setPosition = () =>{
  sliderTrack.style.cssText = `transform: translateX(${position}px)`;
};

const checkBtn = () => {
  if(position === 0){
    btnPrev.disabled = true;
  } else{
    btnPrev.disabled = false;
  }
  
  console.log(position)
  if (position <= -(sliderItems.length -1) * itemWidth) {
    btnNext.disabled = true;
  } else {
    btnNext.disabled = false;
  }

};
checkBtn();

btnPrev.addEventListener('click', slideLeft);
btnNext.addEventListener('click', slideRight);



sliderDot.addEventListener('click', function (event) {
  event.preventDefault();
  for (const el of this.children) {
    el.classList.remove('active-dot');
  }
  event.target.classList.toggle('active-dot');
  const newArray = Array.from(sliderItems).map((e)=> e).filter((i)=> {
    if (i.dataset.slide === event.target.dataset.triger) {
      console.log(i.documentOffsetLeft)
      position -= i.offsetLeft;
      console.log(position)
      setPosition();
    }
  });


});
