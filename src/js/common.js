/**
 * !Resize only width
 * */
var resizeByWidth = true;

var prevWidth = -1;
$(window).resize(function () {
  var currentWidth = $('body').outerWidth();
  resizeByWidth = prevWidth !== currentWidth;
  if (resizeByWidth) {
    $(window).trigger('resizeByWidth');
    prevWidth = currentWidth;
  }
});

/**
 * !Detected touchscreen devices
 * */
var TOUCH = Modernizr.touchevents;
var DESKTOP = !TOUCH;

/**
 * !Add placeholder for old browsers
 * */
function placeholderInit() {
  $('[placeholder]').placeholder();
}

/**
 * !Show print page by click on the button
 * */
function printShow() {
  $('.view-print').on('click', function (e) {
    e.preventDefault();
    window.print();
  })
}

/**
 * !Show elements on scroll
 */
function showOnScroll() {
  var $topicItem = $('.topics__item');

  if ($topicItem.length) {
    ScrollReveal().reveal($topicItem, {
      scale: 0.85,
      interval: 50
    });
  }

  var $quickLinksItem = $('.quick-links__item');

  if ($quickLinksItem.length) {
    ScrollReveal().reveal($quickLinksItem, {
      scale: 0.85,
      interval: 50
    });
  }

  var $gameZoneItem = $('.game-zone__item');

  if ($gameZoneItem.length) {
    ScrollReveal().reveal($gameZoneItem, {
      scale: 0.85,
      interval: 50
    });
  }
}

/**
 * !Expand navigation
 */
function navExpander() {
  var $nav = $('.add-menu');

  if ($nav.length) {
    // var label = $nav.attr('data-btn-more') || "More...";
    // priorityNav.init({
    //   mainNavWrapper: '.add-menu',
    //   mainNav: '.add-menu__list',
    //   // navDropdownClassName: 'nav__dropdown',
    //   // navDropdownToggleClassName: 'nav__dropdown-toggle',
    //   navDropdownLabel: label,
    //   navDropdownBreakpointLabel: 'Меню',
    //   throttleDelay: 200,
    //   breakPoint: 768
    // });

    var navigation = $nav.okayNav();
  }

  // var $page = $('html');
  // var classResize = 'window-is-resize';
  // var timeout;

  // $(window).on('resizeByWidth', function () {
  //   $page.addClass(classResize);
  // }).on('debouncedresize', function () {
  //   clearTimeout(timeout);
  //
  //   timeout = setTimeout(function () {
  //     $page.removeClass(classResize);
  //   }, 300);
  // });
}

/**
 * !Toggle class on a form elements on focus
 * */
function inputFocusClass() {
  var $inputs = $('.field-js');

  if ($inputs.length) {
    var $fieldWrap = $('.input-wrap');
    var $selectWrap = $('.select');
    var classFocus = 'input--focus';

    $inputs.focus(function () {
      var $currentField = $(this);
      var $currentFieldWrap = $currentField.closest($fieldWrap);

      $currentField.addClass(classFocus);
      $currentField.prev('label').addClass(classFocus);
      $currentField.closest($selectWrap).prev('label').addClass(classFocus);
      $currentFieldWrap.addClass(classFocus);
      $currentFieldWrap.find('label').addClass(classFocus);

    }).blur(function () {
      var $currentField = $(this);
      var $currentFieldWrap = $currentField.closest($fieldWrap);

      $currentField.removeClass(classFocus);
      $currentField.prev('label').removeClass(classFocus);
      $currentField.closest($selectWrap).prev('label').removeClass(classFocus);
      $currentFieldWrap.removeClass(classFocus);
      $currentFieldWrap.find('label').removeClass(classFocus);

    });
  }
}

/**
 * !Toggle class on a form elements if this one has a value
 * */
function inputHasValueClass() {
  var $inputs = $('.field-js');

  if ($inputs.length) {
    var $fieldWrap = $('.input-wrap');
    var $selectWrap = $('.select');
    var classHasValue = 'input--has-value';

    $.each($inputs, function () {
      switchHasValue.call(this);
    });

    $inputs.on('keyup change', function () {
      switchHasValue.call(this);
    });

    function switchHasValue() {
      var $currentField = $(this);
      var $currentFieldWrap = $currentField.closest($fieldWrap);

      //first element of the select must have a value empty ("")
      if ($currentField.val().length === 0) {
        $currentField.removeClass(classHasValue);
        $currentField.prev('label').removeClass(classHasValue);
        $currentField.closest($selectWrap).prev('label').removeClass(classHasValue);
        $currentFieldWrap.removeClass(classHasValue);
        $currentFieldWrap.find('label').removeClass(classHasValue);
      } else if (!$currentField.hasClass(classHasValue)) {
        $currentField.addClass(classHasValue);
        $currentField.prev('label').addClass(classHasValue);
        $currentField.closest($selectWrap).prev('label').addClass(classHasValue);
        $currentFieldWrap.addClass(classHasValue);
        $currentFieldWrap.find('label').addClass(classHasValue);
      }
    }
  }
}

/**
 * !Initial custom select for cross-browser styling
 * */
function customSelect(select) {
  $.each(select, function () {
    var $thisSelect = $(this);
    // var placeholder = $thisSelect.attr('data-placeholder') || '';
    $thisSelect.select2({
      language: "ru",
      width: '100%',
      containerCssClass: 'cselect-head',
      dropdownCssClass: 'cselect-drop'
      // , placeholder: placeholder
    });
  })
}

/**
 * !Initial sliders on the project
 * */
function slidersInit() {
  //images carousel
  var $imagesCarousel = $('.images-slider-js');

  if ($imagesCarousel.length) {
    var slideCounterTpl = '' +
        '<div class="slider-counter">' +
        '<span class="slide-curr">0</span>/<span class="slide-total">0</span>' +
        '</div>';

    var titleListTpl = $('<div class="flashes"></div>');

    $imagesCarousel.each(function () {
      var $curSlider = $(this);
      var $imgList = $curSlider.find('.images-slider__list');
      var $imgListItem = $imgList.find('.images-slider__item');
      var dur = 200;

      // create titles
      $imgList.after(titleListTpl.clone());
      var $titleList = $curSlider.find('.flashes');
      $.each($imgListItem, function () {
        var $this = $(this);
        $titleList.append($('<div class="flashes__item">' + $this.find('.caption').html() + '</div>'));
      });

      // initialized slider of titles
      $titleList.slick({
        fade: true,
        speed: dur,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        asNavFor: $imgList,
        dots: false,
        arrows: false,

        swipe: false,
        touchMove: false,
        draggable: false
      });

      // initialized slider of images
      $imgList.on('init', function (event, slick) {
        $(slick.$slider).append($(slideCounterTpl).clone());

        $('.slide-total', $(slick.$slider)).text(slick.$slides.length);
        $('.slide-curr', $(slick.$slider)).text(slick.currentSlide + 1);
      }).slick({
        fade: false,
        speed: dur,
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: $titleList,
        lazyLoad: 'ondemand',
        infinite: true,
        dots: true,
        arrows: true
      }).on('beforeChange', function (event, slick, currentSlide, nextSlider) {
        $('.slide-curr', $(slick.$slider)).text(nextSlider + 1);
      });

    });
  }

  /*promo slider*/
  var $promoSlider = $('.promo-slider-js');
  if ($promoSlider.length) {
    $promoSlider.each(function () {
      var $thisSlider = $(this),
          $thisBtnNext = $('.slider-arrow_next-js', $thisSlider),
          $thisBtnPrev = $('.slider-arrow_prev-js', $thisSlider),
          $thisPag = $('.swiper-pagination', $thisSlider);
      var time = 8;
      var $bar,
          slider,
          isPause,
          tick,
          percentTime;

      slider = new Swiper($thisSlider, {
        // Optional parameters
        loop: true,
        // Keyboard
        keyboardControl: true,
        // Parallax
        parallax: true,

        // Navigation arrows
        nextButton: $thisBtnNext,
        prevButton: $thisBtnPrev,

        // Pagination
        pagination: $thisPag,
        paginationType: 'bullets',
        paginationClickable: true,
        breakpoints: {
          768: {
            parallax: false
          }
        },
        // events
        onInit: function (swiper) {
          $(swiper.container).closest($thisSlider).addClass('is-loaded');
        }
      });

      // slider.on('slideChangeStart', function () {
      // 	startProgressbar();
      // 	isPause = true;
      // });

      // $bar = $('.slider-progress .progress');
      //
      // $('.main-enter').on({
      // 	mouseenter: function() {
      // 		isPause = true;
      // 	},
      // 	mouseleave: function() {
      // 		isPause = false;
      // 	}
      // });
      //
      // function startProgressbar() {
      // 	resetProgressbar();
      // 	percentTime = 0;
      // 	isPause = false;
      // 	tick = setInterval(interval, 10);
      // }
      //
      // function interval() {
      // 	if(isPause === false) {
      // 		percentTime += 1 / (time+0.1);
      // 		$bar.css({
      // 			// width: percentTime+"%",
      // 			'-ms-transform'     : 'translateX(' + percentTime + '%)',
      // 			'transform'         : 'translateX(' + percentTime + '%)'
      // 		});
      // 		if(percentTime >= 100) {
      // 			slider.slideNext();
      // 			startProgressbar();
      // 		}
      // 	}
      // }
      //
      // function resetProgressbar() {
      // 	$bar.css({
      // 		// width: 0+'%',
      // 		'-ms-transform'     : 'translateX(0%)',
      // 		'transform'         : 'translateX(0%)'
      // 	});
      // 	clearTimeout(tick);
      // }
      //
      // startProgressbar();
    });

  }
}

/**
 * !Grid layout
 */
function gridLayout() {
  $.each($('.grid-js'), function () {
    var $thisGrids = $(this);
    var $grid = $thisGrids.imagesLoaded( function() {
      // init Isotope after all images have loaded
      $grid.isotope({
        layoutMode: 'packery',
        itemSelector: '.grid-item-js',
        percentPosition: true
      });
    });

    $grid.on( 'arrangeComplete', function( event, filteredItems ) {
      $(event.target).addClass('grid-completed');
    });
  });

}

/**! jquery.ms-tabs.js
 * Version: 2018.1.0
 * Author: Astronim*
 * Description: Extended toggle class
 */

(function($){
  'use strict';

  var MsTabs = function(element, config){
    var self,
        $element = $(element),
        $anchor = $element.find(config.anchor),
        $panels = $element.find(config.panels),
        $panel = $element.find(config.panel),
        isAnimated = false,
        activeId,
        isOpen = false,
        collapsed = $element.data('tabs-collapsed') || config.collapsed;

    var callbacks = function () {
      /** track events */
      $.each(config, function (key, value) {
        if (typeof value === 'function') {
          $element.on('msTabs.' + key, function (e, param) {
            return value(e, $element, param);
          });
        }
      });
    }, show = function () {
      // Определяем текущий таб
      var $activePanel = $panel.filter('[id="' + activeId + '"]'),
          $otherPanel = $panel.not('[id="' + activeId + '"]'),
          $activeAnchor = $anchor.filter('[href="#' + activeId + '"]');

      if (!isAnimated) {
        // console.log('Показать таб:', activeId);
        isAnimated = true;

        // Удалить активный класс со всех элементов
        toggleClass([$panel, $anchor], false);

        // Добавить класс на каждый активный элемент
        toggleClass([$activePanel, $activeAnchor], true);

        // Анимирование высоты табов
        $panels.animate({
          'height': $activePanel.outerHeight()
        }, config.animationSpeed);

        // Скрыть все табы, кроме активного
        hideTab($otherPanel);

        // Показать активный таб
        $activePanel
            .css({
              'z-index': 2,
              'visibility': 'visible'
            })
            .animate({
              'opacity': 1
            }, config.animationSpeed, function () {
              $activePanel.css({
                'position': 'relative',
                'left': 'auto',
                'top': 'auto'
              }).attr('tabindex', 0);

              $panels.css({
                'height': ''
              });

              // Анимация полностью завершена
              isOpen = true;
              isAnimated = false;
            });
      }

      // callback after showed tab
      $element.trigger('msTabs.afterShowed');
    }, hide = function () {
      // Определить текущий таб
      var $activePanel = $panel.filter('[id="' + activeId + '"]');

      if (!isAnimated) {
        // console.log("Скрыть таб: ", activeId);

        isAnimated = true;

        // Удалить активный класс со всех элементов
        toggleClass([$panel, $anchor], false);

        // Анимирование высоты табов
        $panels.animate({
          'height': 0
        }, config.animationSpeed);

        hideTab($activePanel, function () {
          $panels.css({
            'height': ''
          });

          isOpen = false;
          isAnimated = false;
        });
      }

      // callback after tab hidden
      $element.trigger('msTabs.afterHidden');
    }, hideTab = function (tab) {
      var callback = arguments[1];
      tab
          .css({
            'z-index': -1
          })
          .attr('tabindex', -1)
          .animate({
            'opacity': 0
          }, config.animationSpeed, function () {
            tab.css({
              'position': 'absolute',
              'left': 0,
              'top': 0,
              'visibility': 'hidden'
            });

            // Анимация полностью завершена
            if (typeof callback === "function") {
              callback();
            }
          });
    }, toggleClass = function (arr) {
      var remove = arguments[1] === false;
      $.each(arr, function () {
        var iElem = this;
        // если массив, то устанавливаем класс на каждый из элемент этого массива
        if ($.isArray(iElem)) {
          $.each(iElem, function () {
            var $curElem = $(this);
            if ($curElem.length) {
              // Если второй аргумент false, то удаляем класс
              if (remove) {
                $curElem.removeClass(config.modifiers.activeClass);
              } else {
                // Если второй аргумент не false, то добавляем класс
                $curElem.addClass(config.modifiers.activeClass);
              }
            } else {
              // В консоль вывести предупреждение,
              // если указанного элемента не существует.
              console.warn('Element "' + this + '" does not exist!')
            }
          });
        } else {
          // Если второй аргумент false, то удаляем класс
          if (remove) {
            $(iElem).removeClass(config.modifiers.activeClass);
          } else {
            // Если второй аргумент не false, то добавляем класс
            $(iElem).addClass(config.modifiers.activeClass);
          }
        }
      });
    }, events = function () {
      $element.on('click', config.anchor, function (event) {
        event.preventDefault();

        var curId = $(this).attr('href').substring(1);
        // console.log("Таб анимируется?: ", isAnimated);
        // console.log("Текущий таб открыт?: ", isOpen);
        // console.log("Таб нужно закрывать, если открыт?: ", collapsed);
        // console.log("activeId (Предыдущий): ", activeId);

        if (isAnimated || !collapsed && curId === activeId) {
          return false;
        }

        if (collapsed && isOpen && curId === activeId) {
          hide();
        } else {
          activeId = curId;
          // console.log("activeId (Текущий): ", activeId);
          show();
        }
      });
    }, init = function () {
      activeId = $anchor.filter('.' + config.modifiers.activeClass).length && $anchor.filter('.' + config.modifiers.activeClass).attr('href').substring(1);

      // console.log("activeId (сразу после инициализации): ", !!activeId);

      $panels.css({
        'display': 'block',
        'position': 'relative',
        'overflow': 'hidden'
      });

      $panel.css({
        'position': 'absolute',
        'left': 0,
        'top': 0,
        'opacity': 0,
        'width': '100%',
        'visibility': 'hidden',
        'z-index': -1
      }).attr('tabindex', -1);

      if (activeId) {
        var $activePanel = $panel.filter('[id="' + activeId + '"]');

        // Добавить класс на каждый элемен
        toggleClass([$activePanel], true);

        // Показать активный таб
        $activePanel
            .css({
              'position': 'relative',
              'left': 'auto',
              'top': 'auto',
              'opacity': 1,
              'visibility': 'visible',
              'z-index': 2
            })
            .attr('tabindex', 0);

        isOpen = true;
      }

      $element.addClass(config.modifiers.init);

      $element.trigger('msTabs.afterInit');
    };

    self = {
      callbacks: callbacks,
      events: events,
      init: init
    };

    return self;
  };

  $.fn.msTabs = function () {
    var _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i,
        ret;
    for (i = 0; i < l; i++) {
      if (typeof opt === 'object' || typeof opt === 'undefined') {
        _[i].msTabs = new MsTabs(_[i], $.extend(true, {}, $.fn.msTabs.defaultOptions, opt));
        _[i].msTabs.init();
        _[i].msTabs.callbacks();
        _[i].msTabs.events();
      }
      else {
        ret = _[i].msTabs[opt].apply(_[i].msTabs, args);
      }
      if (typeof ret !== 'undefined') {
        return ret;
      }
    }
    return _;
  };

  $.fn.msTabs.defaultOptions = {
    anchor: '.tabs__anchor-js',
    panels: '.tabs__panels-js',
    panel: '.tabs__panel-js',
    animationSpeed: 300,
    collapsed: false,
    modifiers: {
      init: 'tabs-initialized',
      activeClass: 'tabs-active'
    }
  };

})(jQuery);

/**
 * !Tabs
 */
function tabs() {
  var $tabs = $('.tabs-js');

  if ($tabs.length) {
    $tabs.msTabs();
  }
}


/**
 * !Form validation
 * */
function formValidation() {
  $('.user-form form').validate({
    errorClass: "error",
    validClass: "success",
    errorElement: false,
    errorPlacement: function (error, element) {
      return true;
    },
    highlight: function (element, errorClass, successClass) {
      $(element)
          .removeClass(successClass)
          .addClass(errorClass)
          .closest('form').find('label[for="' + $(element).attr('id') + '"]')
          .removeClass(successClass)
          .addClass(errorClass);
    },
    unhighlight: function (element, errorClass, successClass) {
      $(element)
          .removeClass(errorClass)
          .addClass(successClass)
          .closest('form').find('label[for="' + $(element).attr('id') + '"]')
          .removeClass(errorClass)
          .addClass(successClass);
    }
  });
}

/**
 * =========== !ready document, load/resize window ===========
 */

$(window).on('load', function () {
  // add functions
});

$(window).on('debouncedresize', function () {
  // $(document.body).trigger("sticky_kit:recalc");
});

$(document).ready(function () {
  // showOnScroll();
  placeholderInit();
  navExpander();
  printShow();
  inputFocusClass();
  inputHasValueClass();
  customSelect($('select.cselect'));
  slidersInit();
  gridLayout();
  tabs();
  objectFitImages(); // object-fit-images initial

  formValidation();
});
