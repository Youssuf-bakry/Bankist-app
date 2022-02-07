'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//**********SCROLLING WITH JS COORDINATES */
// const btnScrollTo = document.querySelector('.btn--scrolll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click',function(e){
//   const s1coords = section1.getBoundingClientRect();

// })
/////////////////////////
//removing eventlistener
/////////////////////////
// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('this is H1 alert');
//   h1.removeEventListener('mouseenter', alertH1); //عشلان ميقعدش يتكرر معي
// };
// h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => { دي طريقة تانية حلوة لإزالة الevent list بمعهنى إنه ميتكررش
//   h1.removeEventListener('mouseenter', alertH1);
// }, 5000);

//Building the tapped component
//لا تنس أن لو عايز تلوب على حاجة لازم تكون array like structure فلازم يكون queryAll
const tabsContainer = document.querySelector('.operations__tab-container');
const operationtabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
// console.log(operationBtnContainer, operationtabs);
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  //this is called GUARD CLAUSE it protect from returning null error when unneeded clicks happen
  if (!clicked) return;
  //actice tab
  operationtabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  //activate content
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// tabs fading effect
const nav = document.querySelector('.nav');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(s => (s !== link ? (s.style.opacity = this) : null));
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// intersection observer API
// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => console.log(entry));
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.5,
// };
// const section1 = document.querySelector('#section--1');
// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(section1);

// sticky nav
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
  // rootMargin: '-90px',
});

headerObserver.observe(header);

// revealing elemnts on scroll

const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
///////////////////
//lazy img loading

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //this is to load before thresold reached so the user won't notice any delay in loading imgs
});

imgTargets.forEach(img => imgObserver.observe(img));

/////////////////////
// Slider component

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
//for trial purpose 😊
// slider.style.transform = 'scale(0.4)';
slides.forEach(function (s, i) {
  s.style.transform = ` translateX(${i * 100}%)`;
  // s.style.backgroundColor = 'red';
});

const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let curSlide = 0;
const maxSlide = slides.length;
const goToSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};
goToSlide(0);
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};
const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};
btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);
