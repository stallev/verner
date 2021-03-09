/* для добавления модальности окну */

const body = document.querySelector('body');
function existVerticalScroll() {
  return document.body.offsetHeight > window.innerHeight
}

function getBodyScrollTop() {
   return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
 }
function blockOther(){
  console.log('no');
  body.dataset.scrollY = getBodyScrollTop(); // сохраним значение скролла
  if(existVerticalScroll()) {
    body.classList.add('body-lock');
    body.style.top = `-${body.dataset.scrollY}px`;
  }
}
function unblockOther(){
  if(existVerticalScroll()) {
    body.classList.remove('body-lock');
    window.scrollTo(0,body.dataset.scrollY);    
  }
}
/* для добавления модальности окну - конец*/


/* липкий header*/
(function(){
  window.onscroll = function() {stickyHeader()};
  let header = document.querySelector(".header__bottom");
  let sticky;
  let mobileMenu = document.querySelector('.header__mobile-menu');
  if(header){
    sticky = header.offsetTop;
    document.querySelector('.header__menu-toggle-humburger').onclick = openMobileMenu;
    document.querySelector('.header__mobile-menu-close-button').onclick = closeMobileMenu;
  }

  function openMobileMenu(){
    mobileMenu.style.display = "flex";
    blockOther();
    mobileMenu.style.top = '0px';
  };

  function closeMobileMenu(){
    unblockOther();
    mobileMenu.classList.add('header__mobile-menu--hide');
    setTimeout(function(){
      mobileMenu.classList.remove('header__mobile-menu--hide');
    },1100)
    mobileMenu.style.display = "none";
  };
  function stickyHeader() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky-header");
    } else {
      header.classList.remove("sticky-header");
    }
  }
})();


//display sidebar
(function(){
  let displaySidebarFiltersBtn = document.querySelector('.products-section__filters');
  let sidebar = document.querySelector('.sidebar');
  
  let closeSidebarBtn = document.querySelector('.sidebar__close-button');
  if(displaySidebarFiltersBtn){
    displaySidebarFiltersBtn.onclick = displaySidebar;    
  }
  if(closeSidebarBtn){
    closeSidebarBtn.onclick = hideSidebar;    
  }
  function displaySidebar(){
    document.querySelector('body').classList.add('body-lock');
    sidebar.style.display = "flex";
    sidebar.style.top = "0px";
   }
  function hideSidebar(){
    sidebar.classList.add('sidebar--hide');
    setTimeout(function(){
      console.log('hide');
      sidebar.classList.remove('sidebar--hide');
    },1100)
    sidebar.style.display = "none";
    document.querySelector('body').classList.remove('body-lock');
  };
})();

//display basket
(function(){
  let openbasketBtn = document.querySelector('.header__bottom-cart-wdg-mobile-link');
  let basket = document.querySelector('.cart-goods--main');
  
  let closeBasketBtn = document.querySelector('.cart-goods__close-button');
  if(openbasketBtn){
    openbasketBtn.onclick = openBasket;    
  }
  if(closeBasketBtn){
    closeBasketBtn.onclick = closeBasket;    
  }
  function openBasket(){
    blockOther();
    basket.style.display = "block";
    basket.style.top = "0px";
   }
  function closeBasket(){
    unblockOther();
    basket.classList.add('cart-goods--hide');
    setTimeout(function(){
      console.log('hide');
      basket.classList.remove('cart-goods--hide');
    },1100)
    basket.style.display = "none";
  };
})();

(function () {
  //for sidebar
  let categorySidebarControl = document.querySelector('.sidebar__group__chck-category');
  let vendorSidebarControl = document.querySelector('.sidebar__group__chck-vendor');
  if(categorySidebarControl){
    categorySidebarControl.onclick = openCloseCategoryList;
  }
  if(vendorSidebarControl){
    vendorSidebarControl.onclick = openCloseVendorList;
  }
  function openCloseCategoryList() {
    if (categorySidebarControl.checked != true) {
      document.querySelector('.sidebar__items-list--category').classList.add('sidebar__list--is-close');
    }
    else {
      document.querySelector('.sidebar__items-list--category').classList.remove('sidebar__list--is-close');
    }
  }
  function openCloseVendorList() {
    if (vendorSidebarControl.checked != true) {
      document.querySelector('.sidebar__items-list--vendor').classList.add('sidebar__list--is-close');
    }
    else {
      document.querySelector('.sidebar__items-list--vendor').classList.remove('sidebar__list--is-close');
    }
  }
})();

//display search form
(function(){
  let openSearchFormBtnMob = document.querySelector('.header__search-btn--out-form-right');
  let openSearchFormBtn = document.querySelector('.header__search-btn-left');
  let closeSearchFormBtn = document.querySelector('.header__seach-menu-close-button');
  if(openSearchFormBtn){
    openSearchFormBtn.onclick = displaySearchForm;
  }
  if(openSearchFormBtnMob){
    openSearchFormBtnMob.onclick = displaySearchForm;
  }
  function displaySearchForm(){
    console.log('del');
    document.querySelector('.header__bottom-wdg-wrap').style.display = 'none';
    document.querySelector('.header__bottom-srch-form-out-wrap').style.display = 'block';
  }
  if(closeSearchFormBtn){
    closeSearchFormBtn.onclick = closeSearchForm;
  }
  function closeSearchForm(){
    document.querySelector('.header__bottom-wdg-wrap').style.display = 'flex';
    document.querySelector('.header__bottom-srch-form-out-wrap').style.display = 'none';
  }
})();

//quickview modal

(function(){
  let quickviewArray = document.querySelectorAll('.product-card__quickview');
  if(quickviewArray){
    quickviewArray.forEach(element => {
      element.addEventListener('click', function(event){
        event.preventDefault();
        //blockOther();
        document.querySelector('.container--hide').style.display = "block";
        let productQuickview = document.querySelector('.product-modal');
        swal(productQuickview,{
          className: "product-modal-quick",
        });
      } )
    });
  }
})();

//open-close goods list on checkout page
(function(){
  let openCloseGoodsListBtn = document.querySelector('.checkout__toggle-block');
  function openCloseGoodsList(){
    let openCloseWrap = document.querySelector('.container--checkout-toggle');
    let checkoutGoodsList = document.querySelector('.cart-goods__outer-wrap');
    if(openCloseWrap&&checkoutGoodsList){
      openCloseWrap.classList.toggle('container--checkout-toggle-close');
      checkoutGoodsList.classList.toggle('cart-goods__outer-wrap--open');
    }
  }
  if((openCloseGoodsListBtn)&&(window.innerWidth<1000)){
    openCloseGoodsListBtn.onclick = openCloseGoodsList;
  }
})();

//open-close footer menu
(function(){
  let footerMenuTitle = document.querySelector('.footer__menu-title');
  function toggleFooterTitleClass(){
    footerMenuTitle.classList.toggle('footer__menu-title-open');
  }
  if((footerMenuTitle)&&(window.innerWidth<769)){
    footerMenuTitle.onclick = toggleFooterTitleClass;
  }
})();


//added zoom effect

$('#zoom1').elevateZoom();
$('#zoom2').elevateZoom();
$('#zoom3').elevateZoom();

// $(document).ready(function(){
//   $('#zoom1').zoom({url: '../img/content/product/item1/zoom_1800x1800.jpg'});
// });
// $(document).ready(function(){
//   $('#zoom2').zoom({url: '../img/content/product/item1/zoom_1800x1800.jpg'});
// });
// $(document).ready(function(){
//   $('#zoom3').zoom({url: '../img/content/product/item1/zoom_1800x1800.jpg'});
// });

// (function(){
//   let zoomImages = document.querySelectorAll('.zoom-effect');
//   if(zoomImages){
//     zoomImages.forEach(element => {
//       element.elevateZoom();
//     });
//   }
// })();


//slider on product-page
(function(){
  $('.product-main-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,               
    dots: false,
    arrows:false,
    infinite: true,
    asNavFor: '.product-thumb-slider',
    responsive:[
      {
        breakpoint: 765,
        settings:{
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
          dotsClass: 'main-slider-slick-dots',
        }
      }
    ]
  });  
  
  $('.product-thumb-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,               
    dots: false,
    infinite: true,
    prevArrow:'<button class="slick-prev"></button>',
    nextArrow:'<button class="slick-next"></button>',
    asNavFor: '.product-main-slider',
    focusOnSelect: true,
    centerMode: false,
    //vertical: true,
  });
})();

(function(){
  $(document).ready(function(){
    $('.sale-slider__main').slick({
      lazyLoad: false,
      arrows: true,
      dots: true,
      adaptiveHeight: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      speed: 500,
      easing: 'ease',
      infinite: true,
      asNavFor: '.sale-slider__sec',
      initialSlide: 0,
      autoplay: false,
      autoplaySpeed: 500,
      pauseOnFocus: true,
      pauseOnHover: true,
    });
    $('.sale-slider__sec').slick({
      lazyLoad: false,
      arrows: true,
      slidesToShow: 3,
      slidesToScroll: 1,               
      dots: false,
      infinite: true,
      asNavFor: '.sale-slider__main',
      focusOnSelect: true,
      //centerMode: true,
      prevArrow:'<button class="sale-slider__sec-prev"></button>',
      nextArrow:'<button class="sale-slider__sec-next"></button>',
    });
  });  
})();

(function(){
  var galleryThumbs = new Swiper('.com-slider__sec', {
    spaceBetween: 10,
    slidesPerView: 4,
    loop: true,
    freeMode: true,
    loopedSlides: 5, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  var galleryTop = new Swiper('.com-slider__main', {
    hashNavigation: {
      watchState: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    spaceBetween: 10,
    loop: true,
    loopedSlides: 5, //looped slides should be the same
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    thumbs: {
      swiper: galleryThumbs,
    },
  });
})();


