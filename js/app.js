/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sectionHeaderPrefix = 'Section';
const sectionBodyPrefix = `On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized
by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that
are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will,
which is the same as saying through shrinking from toil and pain. These cases are perfectly 
simple and easy to distinguish. In a free hour, when our power of choice is untrammelled
and when nothing prevents our being able to do what we like best, 
every pleasure is to be welcomed and every pain avoided.
But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur 
that pleasures have to be repudiated and annoyances accepted.`
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const options = {
    root: null,
    threshold: 0.9,
    rootMargin: '100px'
}

const observer = new IntersectionObserver(callback, options);

function callback(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting)
            toggleActiveClasses(entry.target);
    });
}
/**
* @description Generate A Random Number Between Minimum number and maximum number
* @param {number} min - The minmum value that generated number won't be lower than it
* @param {number} max - The maxmum value that generated number won't be greater than it
* @returns {number} number gt or eq min and lt or eq max
*/
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
/**
* @description Generate Section HTML
* @param {number} order - order of section which Declare its id and nav
* @returns {HTMLElement} Section Html Element
*/
function generateSection(order) {
    var section = document.createElement('section');
    section.setAttribute('id', `${sectionHeaderPrefix.toLowerCase()}${order}`);
    section.setAttribute('data-nav', `${sectionHeaderPrefix}  ${order}`);
    if (order === 1) {
        section.classList.add('your-active-class');
    }
    const sectionContent = `
        <div class="landing__container">
        <h2>${sectionHeaderPrefix}  ${order}</h2>
          <p>${sectionBodyPrefix}</p>
       </div>`
    section.innerHTML = sectionContent;
    return section;
}

// Build menu 
/**
* @description Generate Section HTML
* @param {number} order - order of section which Declare its id and nav
* @returns {HTMLElement} Nav Html Element
*/
function generateNavElement(order) {
    const navEl = document.createElement('li');
    const anchorEl = document.createElement('a');
    if (order === 1) {
        anchorEl.classList.add('active');
    }
    anchorEl.classList.add('menu__link');
    anchorEl.setAttribute('data-scroll', `${sectionHeaderPrefix.toLowerCase()}${order}`);
    anchorEl.addEventListener('click', handleNavLinkClick);
    anchorEl.textContent = `${sectionHeaderPrefix}  ${order}`;
    navEl.appendChild(anchorEl);
    return navEl;
}

/**
* @description Build Navs and Sections HTML
*/
function generateSectionsAndNav() {
    const numberOfSections = getRandomInt(4, 9);
    const sectionsFragment = document.createDocumentFragment();
    const navElementsFragment = document.createDocumentFragment();
    const main = document.getElementsByTagName('main')[0];
    const nav = document.getElementById('navbar__list');

    for (let index = 1; index <= numberOfSections; index++) {
        sectionsFragment.appendChild(generateSection(index));
        navElementsFragment.appendChild(generateNavElement(index));
    }
    main.appendChild(sectionsFragment);
    nav.append(navElementsFragment);
}
/**
* @description Remove Active Class From section and Nav items
*/
function clearActiveClass() {
    const activeNavEl = document.querySelector('.active');
    activeNavEl.classList.remove('active');
    const activeSection = document.querySelector('.your-active-class');
    activeSection.classList.remove('your-active-class');
}

/**
* @description Scroll To The Top Of Window
*/
function scrollToTop() {
    window.scrollTo(
        {
            top: 0,
            behavior: 'smooth'
        }
    );
}

/**
* @description Clear Active Classes From Page and Add them to target Section and nav
* @param {HTMLElement} section
*/
function toggleActiveClasses(section) {
    clearActiveClass();
    section.classList.add('your-active-class');
    document.querySelector(`[data-scroll="${section.getAttribute('id')}"]`).classList.add('active');
}

/**
* @description Show Hide Scroll To Top Button
*/
function showHideScrollToTop() {
    const nav = document.getElementById('navbar__list');
    const topBtn = document.getElementById('topBtn');
    if (document.body.scrollTop > nav.offsetHeight || document.documentElement.scrollTop > nav.offsetHeight) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
}

/**
* @description Set The Intersection Inspector To Inspect Sections
*/
function observeSections() {
    const sectionEls = document.querySelectorAll('section');
    Array.from(sectionEls).forEach(sectionEl => {
        observer.observe(sectionEl);
    })
}

/**
* @description Open Close Collpase Paragraphes
* @param {Event} $event
*/

function toggleCollapse($event){
    const header = $event.target;
    const container = header.parentElement;
    const paragraph = container.children[1];
    paragraph.classList.toggle('show');
}

// Add class 'active' to section when near top of viewport
// Scroll to anchor ID using scrollTO event
// Set sections as active

/**
* @description Scroll Page To Specified Section on Nav Link Click And Change Classess
* @param {Event} $event
*/
function handleNavLinkClick($event) {
    clearActiveClass();
    const navLink = $event.target;
    navLink.classList.add('active')
    const section = document.getElementById(navLink.getAttribute('data-scroll'));
    section.classList.add('your-active-class');
    window.scrollTo(
        {
            top: section.offsetTop,
            behavior: 'smooth'
        }
    );
}

/**
* @description Handle Window Scroll Event
*/
function handleWindowScroll() {
    window.addEventListener('scroll', showHideScrollToTop)
}

/**
* @description Handle Back To Top Btn Click Event
*/
function handleTopBtnClick() {
    const topBtn = document.getElementById('topBtn');
    topBtn.addEventListener('click', scrollToTop);
}
/**
* @description Toggle Paragraphes on It's Header Click
*/
function handleCollapsablesClick(){
    const headers = document.querySelectorAll('.landing__container>h2');
    Array.from(headers).forEach(header => {
        header.addEventListener('click',toggleCollapse)
    });
}

/**
 * End Main Functions
 * Begin Events
 *
*/

/**
* @description Wait Untill Load
*/
window.addEventListener('DOMContentLoaded', (event) => {
    generateSectionsAndNav();
    handleTopBtnClick();
    handleWindowScroll();
    observeSections();
    handleCollapsablesClick();
    scrollToTop();
});


// Scroll to section on link click



