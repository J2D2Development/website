function init() {
  //grab header and wrapper for dynamic offset and shrink on scroll effect
  const header = document.querySelector('.header-sticky');
  const headerWrapper = document.querySelector('.header-sticky--wrapper');
  const heroImg = document.querySelector('.bg-img');

  //grab mobile menu to show/hide on click/tap
  const menuBars = document.querySelector('#menu-show');

  //grab header two for zoom in text animation
  const headerTwo = document.querySelector('#header-two');
  const headerTwoText = headerTwo.querySelector('#header-two-text');

  //grab first row of featured divs for animating on scroll
  const featuredTopRow = document.querySelector('#featured-row-one');
  const featuredTopRowLeft = document.querySelector('#featured-col-one--left');
  const featuredTopRowCenter = document.querySelector('#featured-col-one--center');
  const featuredTopRowRight = document.querySelector('#featured-col-one--right');

  //grab bounding rect for any element to be animated
  let headerTwoRect = headerTwo.getBoundingClientRect();
  let topRowRect = featuredTopRow.getBoundingClientRect();

  //set y height where menu should shrink 'up'
  let breakPoint = header.offsetHeight + heroImg.offsetHeight;

  //set header offset (for static header)
  heroImg.style.marginTop = (header.offsetHeight - 4) + 'px';

  function mobileMenuShow() {
    //set bool show.  if true, add listener to menu items- onclick, close menu.  then, remove listeners from menu items (will be re-added if menu show again)
    document.querySelector('.mobile-menu').classList.toggle('mobile-menu-hide');
  }

  //if element is in viewport, perform proper animation
  function animateElementInViewport(indicatorElement, elementToAnimate, animationEffect, offset) {
    offset = offset || 0;
    if (isInView(indicatorElement, offset)) {
      elementToAnimate.classList.remove(animationEffect);
    } else {
      elementToAnimate.classList.add(animationEffect);
    }
  }

  //utility function to calculate position
  function isInView(element, offset) {
    offset = offset || 0;
    return window.scrollY > element.top - offset;
  }

  //shrink header if page scrolls past breakpoint
  function headerShrink() {
    if (window.scrollY > breakPoint) {
      header.classList.add('header-sticky--shrink');
    } else {
      header.classList.remove('header-sticky--shrink');
    }
  }

  //event listener adding
  menuBars.addEventListener('click', mobileMenuShow, false);
  window.addEventListener('scroll', headerShrink, false);
  window.addEventListener('scroll', function() {
    animateElementInViewport(headerTwoRect, headerTwoText, 'hidden-scale', 200);
  }, false);
  window.addEventListener('scroll', function() {
    animateElementInViewport(topRowRect, featuredTopRowLeft, 'featured-col--left', 375);
    animateElementInViewport(topRowRect, featuredTopRowCenter, 'featured-col--center', 375);
    animateElementInViewport(topRowRect, featuredTopRowRight, 'featured-col--right', 375);
  })
}

//kick it all off on load
window.addEventListener('DOMContentLoaded', init, false);

//react contact form (needs work)
// class ContactForm extends React.Component {
//   render() {
//     return (
//       <div>
//         <form>
//           <input type="text" placeholder="Your Name" /><br />
//           <input type="text" placeholder="Your Email" /><br />
//           <textarea placeholder="Questions?"></textarea><br />
//           <input type="submit" value="Submit" />
//         </form>
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <ContactForm />,
//   document.getElementById('contact-form')
// );