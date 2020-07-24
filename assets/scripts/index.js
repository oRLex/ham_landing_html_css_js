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
const slides =document.querySelectorAll('.slider-item');

let position = 0;
let index = 0;
let dot_index = 0;
let size = slides[index].clientWidth;


const updateSlide = function(){
  slider.style.transform = `translateX(${(-size * index)}px)`;
  Array.from(dots.children).forEach( element => element.classList.remove('active-dot'));
  if (dots.children[dot_index].tagName === 'A') {
    dots.children[dot_index].classList.add('active-dot'); 
  }
  if (dot_index === slides.length -1) {
    btnNext.setAttribute('disabled', 'true');
  }else{
    btnNext.removeAttribute('disabled');
  }
  if (dot_index === 0) {
    btnPrev.setAttribute('disabled', 'true');

  }else{
    btnPrev.removeAttribute('disabled');
  }
};

const slide = function(){
    slider.style.transition = 'transform .5s easy-in-out';
    updateSlide();
};

const checkBtn = function(){
  if (position === 0) {
   btnPrev.setAttribute('disabled', 'true');
  } else {
    btnPrev.removeAttribute('disabled');
  }
  if(position === -(slides.length -1) * slides[0].clientWidth){
    btnNext.setAttribute('disabled', 'true');
  } else{
    btnNext.removeAttribute('disabled');
  }
};

const setPosition = function(){
  if (this.classList.contains('arrow-left')) {
    index--;
    position += size;
    if(dot_index === 0){
      dot_index = 4;
    } else{
      dot_index--;
    }
  } else if(this.classList.contains('arrow-right')){
    index++;
    position -= size;
    if(dot_index === 4){
      dot_index = 0;
    } else{
      dot_index++;
    }
  }
  checkBtn();
  slide();
  
};

const dotFunc = function(event){
  event.preventDefault(); 
  if (event.target.tagName === 'A') {
    let i = parseInt(event.target.dataset.triger);
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