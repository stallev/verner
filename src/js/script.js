
(function(){
  window.onscroll = function() {stickyHeader()};
  let header = document.querySelector(".header__bottom");
  let sticky = header.offsetTop;
  let sidebar = document.querySelector(".sidebar");
  let mobileMenu = document.querySelector('.header__mobile-menu');
  document.querySelector('.header__menu-toggle-humburger').onclick = openMobileMenu;
  document.querySelector('.header__mobile-menu-close-button').onclick = closeMobileMenu;
  function openMobileMenu(){
    mobileMenu.style.display = "flex";
  };
  function closeMobileMenu(){
    mobileMenu.classList.add('header__mobile-menu--hide');
    setTimeout(function(){
      mobileMenu.classList.remove('header__mobile-menu--hide');
    },1100)
    mobileMenu.style.display = "none";
  };
  function stickyHeader() {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
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
    console.log('yes');
    closeSidebarBtn.onclick = hideSidebar;    
  }
  function displaySidebar(){
    sidebar.style.display = "flex";
   }
  function hideSidebar(){
    sidebar.classList.add('sidebar--hide');
    setTimeout(function(){
      console.log('hide');
      sidebar.classList.remove('sidebar--hide');
    },1100)
    sidebar.style.display = "none";
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
    basket.style.display = "block";
   }
  function closeBasket(){
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
        let productQuickview = document.querySelector('.product-modal');
        swal(productQuickview,{
          className: "product-modal-quick",
        });
      } )
    });
  }
})();

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
    vertical: true,
  });
})()
