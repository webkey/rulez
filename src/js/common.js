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
 * !Equal height of blocks by maximum height of them
 */
function equalHeight() {
  // equal height of elements
  var $equalHeight = $('.equal-height-js');

  if($equalHeight.length) {
    $equalHeight.children().matchHeight({
      byRow: true, property: 'height', target: null, remove: false
    });
  }
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
  var $nav = $('.nav');

  if ($nav.length) {
    var label = $nav.attr('data-btn-more') || 'More...';

    var navigation = $nav.okayNav({
      // align_right: true
      // toggle_icon_content: '<span /><span /><span />'
      toggle_icon_content: '<span>' + label + '</span><i>&nbsp;</i>',
      // swipe_enabled: true
      itemHidden : function() {
        $nav.addClass('after-hidden')
      }
    });
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
 * !Tooltip
 * */
function initTooltip() {
  var $elements = $('.user-options__item a, .cart-link');
  $.each($elements, function () {
    var $curElem = $(this);
    $curElem.attr('data-title', $curElem.attr('title')).attr('title','');
  })
}

/**
 * !Detect scroll page
 */
function detectScroll() {
  // external js:
  // 1) resizeByWidth (resize only width);

  var $page = $('html'),
      // $fixedElement = $('.main-nav'),
      // var minScrollTop = $fixedElement.offset().top,
      minScrollTop = 100,
      currentScrollTop = $(window).scrollTop();

  $page.toggleClass('page-scrolled', (currentScrollTop > minScrollTop));

  $(window).on('load resizeByWidth scroll', function () {

    // minScrollTop = $fixedElement.offset().top;
    currentScrollTop = $(window).scrollTop();
    $page.toggleClass('page-scrolled', (currentScrollTop > minScrollTop));
  })
}
/**
 * !Toggle class on a form elements on focus
 * */
function inputFocusClass() {
  var $inputs = $('.field-js');

  if ($inputs.length) {
    var $fieldWrap = $('.input-wrap'),
        $selectWrap = $('.select'),
        classFocus = 'input--focus';

    $inputs.focus(function () {
      var $currentField = $(this),
          $currentFieldWrap = $currentField.closest($fieldWrap);

      $currentField.addClass(classFocus);
      $currentField.prev('label').addClass(classFocus);
      $currentField.closest($selectWrap).prev('label').addClass(classFocus);
      $currentFieldWrap.addClass(classFocus);
      $currentFieldWrap.find('label').addClass(classFocus);
    }).blur(function () {
      var $currentField = $(this),
          $currentFieldWrap = $currentField.closest($fieldWrap);

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
      var slider;

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

        longSwipesRatio: 0.05,
        longSwipesMs: 200,

        breakpoints: {
          768: {
            parallax: false
          }
        },
        // events
        onInit: function (swiper) {
          $(swiper.container).closest($thisSlider).addClass('is-loaded');
          changeBgColor(swiper);
        }
      });

      slider.on('slideChangeStart', function (swiper) {
        changeBgColor(swiper);
      });

      function changeBgColor(swiper) {
        var bgColor = $(swiper.slides).eq(swiper.activeIndex).css('background-color');
        $('.header-bg').css('background-color', bgColor);
      }
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

/**! jquery.ms-drop.js
 * Version: 2018.1.0
 * Author: Astronim*
 * Description: Toggle a drop menu
 */

(function($){
  var defaults = {
    // container: '.ms-drop__container-js', // is element
    opener: '.ms-drop__opener-js',
    openerText: 'span',
    drop: '.ms-drop__drop-js',
    dropOption: '.ms-drop__drop-js a',
    dropOptionText: 'span',
    initClass: 'ms-drop--initialized',
    closeOutsideClick: true, // Close all if outside click
    closeEscClick: true, // Close all if click on escape key
    closeAfterSelect: true, // Close drop after selected option
    preventOption: false, // Add preventDefault on click to option
    selectValue: true, // Display the selected value in the opener
    modifiers: {
      isOpen: 'is-open',
      activeItem: 'active-item'
    }

    // Callback functions
    // afterInit: function () {} // Fire immediately after initialized
    // afterChange: function () {} // Fire immediately after added or removed an open-class
  };

  function MsDrop(element, options) {
    var self = this;

    self.config = $.extend(true, {}, defaults, options);

    self.element = element;

    self.callbacks();
    self.event();
    // close drop if clicked outside active element
    if (self.config.closeOutsideClick) {
      self.closeOnClickOutside();
    }
    // close drop if clicked escape key
    if (self.config.closeEscClick) {
      self.closeOnClickEsc();
    }
    self.eventDropItems();
    self.init();
  }

  /** track events */
  MsDrop.prototype.callbacks = function () {
    var self = this;
    $.each(self.config, function (key, value) {
      if(typeof value === 'function') {
        self.element.on(key + '.msDrop', function (e, param) {
          return value(e, self.element, param);
        });
      }
    });
  };

  MsDrop.prototype.event = function () {
    var self = this;
    self.element.on('click', self.config.opener, function (event) {
      event.preventDefault();
      var curContainer = $(this).closest(self.element);

      if (curContainer.hasClass(self.config.modifiers.isOpen)) {

        curContainer.removeClass(self.config.modifiers.isOpen);

        // callback afterChange
        self.element.trigger('afterChange.msDrop');
        return;
      }

      self.element.removeClass(self.config.modifiers.isOpen);

      curContainer.addClass(self.config.modifiers.isOpen);

      // callback afterChange
      self.element.trigger('afterChange.msDrop');
    });
  };

  MsDrop.prototype.closeOnClickOutside = function () {

    var self = this;
    $(document).on('click', function(event){
      if( $(event.target).closest(self.element).length ) {
        return;
      }

      self.closeDrop();
      event.stopPropagation();
    });

  };

  MsDrop.prototype.closeOnClickEsc = function () {

    var self = this;
    $(document).keyup(function(e) {
      if (e.keyCode === 27) {
        self.closeDrop();
      }
    });

  };

  MsDrop.prototype.closeDrop = function (container) {

    var self = this,
        $element = $(container || self.element);

    if ($element.hasClass(self.config.modifiers.isOpen)) {
      $element.removeClass(self.config.modifiers.isOpen);
    }

  };

  MsDrop.prototype.eventDropItems = function () {

    var self = this;

    self.element.on('click', self.config.dropOption, function (e) {
      var cur = $(this);
      var curParent = cur.parent();

      if(curParent.hasClass(self.config.modifiers.activeItem)){
        e.preventDefault();
        return;
      }
      if(self.config.preventOption){
        e.preventDefault();
      }

      var curContainer = cur.closest(self.element);

      curContainer.find(self.config.dropOption).parent().removeClass(self.config.modifiers.activeItem);

      curParent
          .addClass(self.config.modifiers.activeItem);

      if(self.config.selectValue){
        curContainer
            .find(self.config.opener).find(self.config.openerText)
            .html(cur.find(self.config.dropOptionText).html());
      }

      if(self.config.closeAfterSelect) {
        self.closeDrop();
      }

    });

  };

  MsDrop.prototype.init = function () {

    this.element.addClass(this.config.initClass);

    this.element.trigger('afterInit.msDrop');

  };

  $.fn.msDrop = function (options) {
    'use strict';

    return this.each(function(){
      new MsDrop($(this), options);
    });

  };
})(jQuery);

/**!
 * Toggle dropdown menu
 */
function toggleDropMenu() {
  var $phones = $('.phones-js');

  if ($phones.length) {
    $phones.msDrop({
      opener: '.phones-opener-js',
      drop: '.phones-drop-js',
      preventOption: true,
      selectValue: false,
      modifiers: {
        isOpen: 'is-open',
        activeItem: 'active-item'
      }
    })
  }
}

/**! jquery.ms-switch-class.js
 * Version: 2018.1.0
 * Author: *
 * Description: Extended toggle class
 */

(function ($) {
  'use strict';

  var countFixedScroll = 0;
  // Нужно для корректной работы с доп. классом фиксирования скролла

  var SwitchClass = function (element, config) {
    var self,
        $element = $(element),
        $html = $('html'),
        pref = 'jq-switch-class',
        pluginClasses = {
          initClass: pref + '_initialized'
        },
        mod = {
          scrollFixedClass: 'css-scroll-fixed'
        },
        $switchClassTo = $element.add(config.switcher).add(config.adder).add(config.remover).add(config.switchClassTo),
        classIsAdded = false; //Флаг отвечающий на вопрос: класс добавлен?

    var callbacks = function () {
          /** track events */
          $.each(config, function (key, value) {
            if (typeof value === 'function') {
              $element.on('switchClass.' + key, function (e, param) {
                return value(e, $element, param);
              });
            }
          });
        },
        prevent = function (event) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        },
        toggleFixedScroll = function () {
          $html.toggleClass(mod.scrollFixedClass, !!countFixedScroll);
        },
        add = function () {
          if (classIsAdded) return;

          // Callback before added class
          $element.trigger('switchClass.beforeAdded');

          // Добавить активный класс на:
          // 1) Основной элемент
          // 2) Дополнительный переключатель
          // 3) Элементы указанные в настройках экземпляра плагина
          $switchClassTo.addClass(config.modifiers.activeClass);

          classIsAdded = true;

          if (config.cssScrollFixed) {
            // Если в настойках указано, что нужно добавлять класс фиксации скролла,
            // То каждый раз вызывая ДОБАВЛЕНИЕ активного класса, увеличивается счетчик количества этих вызовов
            ++countFixedScroll;
            toggleFixedScroll();
          }

          // callback after added class
          $element.trigger('switchClass.afterAdded');
        },
        remove = function () {
          if (!classIsAdded) return;

          // callback beforeRemoved
          $element.trigger('switchClass.beforeRemoved');

          // Удалять активный класс с:
          // 1) Основной элемент
          // 2) Дополнительный переключатель
          // 3) Элементы указанные в настройках экземпляра плагина
          $switchClassTo.removeClass(config.modifiers.activeClass);

          classIsAdded = false;

          if (config.cssScrollFixed) {
            // Если в настойках указано, что нужно добавлять класс фиксации скролла,
            // То каждый раз вызывая УДАЛЕНИЕ активного класса, уменьшается счетчик количества этих вызовов
            --countFixedScroll;
            toggleFixedScroll();
          }

          // callback afterRemoved
          $element.trigger('switchClass.afterRemoved');
        },
        events = function () {
          $element.on('click', function (event) {
            if (classIsAdded) {
              remove();

              event.preventDefault();
              return false;
            }

            add();

            prevent(event);
          });

          $(config.switcher).on('click', function (event) {
            $element.click();
            prevent(event);
          });

          $(config.adder).on('click', function (event) {
            add();
            prevent(event);
          });

          $(config.remover).on('click', function (event) {
            remove();
            prevent(event);
          })

        },
        removeByClickOutside = function () {
          $html.on('click', function (event) {
            if (classIsAdded && config.removeOutsideClick && !$(event.target).closest('.' + config.modifiers.stopRemoveClass).length) {
              remove();
              // event.stopPropagation();
            }
          });
        },
        removeByClickEsc = function () {
          $html.keyup(function (event) {
            if (classIsAdded && config.removeEscClick && event.keyCode === 27) {
              remove();
            }
          });
        },
        init = function () {
          $element.addClass(pluginClasses.initClass).addClass(config.modifiers.initClass);
          $element.trigger('switchClass.afterInit');
        };

    self = {
      callbacks: callbacks,
      remove: remove,
      events: events,
      removeByClickOutside: removeByClickOutside,
      removeByClickEsc: removeByClickEsc,
      init: init
    };

    return self;
  };

  // $.fn.switchClass = function (options, params) {
  $.fn.switchClass = function () {
    var _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i,
        ret;
    for (i = 0; i < l; i++) {
      if (typeof opt === 'object' || typeof opt === 'undefined') {
        _[i].switchClass = new SwitchClass(_[i], $.extend(true, {}, $.fn.switchClass.defaultOptions, opt));
        _[i].switchClass.callbacks();
        _[i].switchClass.events();
        _[i].switchClass.removeByClickOutside();
        _[i].switchClass.removeByClickEsc();
        _[i].switchClass.init();
      }
      else {
        ret = _[i].switchClass[opt].apply(_[i].switchClass, args);
      }
      if (typeof ret !== 'undefined') {
        return ret;
      }
    }
    return _;
  };

  $.fn.switchClass.defaultOptions = {
    switcher: null,
    /**
     * @description - Дополнительный элемент, которым можно ДОБАВЛЯТЬ/УДАЛЯТЬ класс
     * @example {String}{JQ Object} null - '.switcher-js', или $('.switcher-js')
     */
    adder: null,
    /**
     * @description - Дополнительный элемент, которым можно ДОБАВЛЯТЬ класс
     * @example {String}{JQ Object} null - '.adder-js', или $('.adder-js')
     */
    remover: null,
    /**
     * @description - Дополнительный элемент, которым можно УДАЛЯТЬ класс
     * @example {String}{JQ Object} null - '.remover-js', или $('.remover-js')
     */
    switchClassTo: null,
    /**
     * @description - Один или несколько эелментов, на которые будет добавляться/удаляться активный класс (modifiers.activeClass)
     * @example {JQ Object} null - 1) $('html, .popup-js, .overlay-js')
     * @example {JQ Object} null - 2) $('html').add('.popup-js').add('.overlay-js')
     */
    removeOutsideClick: true,
    /**
     * @description - Удалать класс по клику по пустому месту на странице? Если по клику на определенный элемент удалять класс не нужно, то на этот элемент нужно добавить дата-антрибут [data-tc-stop]
     * @param {boolean} true - или false
     */
    removeEscClick: true,
    /**
     * @description - Удалять класс по клику на клавишу Esc?
     * @param {boolean} true - или false
     */
    cssScrollFixed: false,
    /**
     * @description - Добавлять на html дополнительный класс 'css-scroll-fixed'? Через этот класс можно фиксировать скролл методами css
     * @see - _mixins.sass =scroll-blocked()
     * @param {boolean} true - или false.
     */
    modifiers: {
      initClass: null,
      activeClass: 'active',
      stopRemoveClass: 'stop-remove-class' // Если кликнуть по елементу с этим классам, то событие удаления активного класса не будет вызвано
    }
    /**
     * @description - Список классов-модификаторов
     */
  };

})(jQuery);

/**
 * !Toggle shutters panel, like a search panel, a catalog shutter etc.
 */
function toggleShutters() {
  // Toggle a search panel
  var $searchSwitcher = $('.toggle-search-js'), searchPanel;
  if ($searchSwitcher.length) {
    searchPanel = $searchSwitcher.switchClass({
      switcher: '.tc__switcher-js'
      , adder: '.tc__opener-js'
      , remover: '.tc__remover-js'
      , switchClassTo: $('.site-nav')
      , modifiers: {
        activeClass: 'search-is-open'
      }
      , cssScrollFixed: false
      , removeOutsideClick: true
      , afterAdded: function () {
        setTimeout(function () {
          $('.search-form__input').focus();
        }, 50);
      }
      , afterRemoved: function () {
        setTimeout(function () {
          $('.search-form__input').blur();
        }, 50);
      }
    });
  }

  // Toggle a catalog shutter
  var $catalogSwitcher = $('.catalog-opener-js'), catalogShutter;
  if ($catalogSwitcher.length) {
    catalogShutter = $catalogSwitcher.switchClass({
      switchClassTo: $('.catalog-shutter-js').add('.catalog-overlay-js').add('body')
      , modifiers: {
        activeClass: 'catalog-is-open'
      }
      , cssScrollFixed: false
    });
  }


  // При добавлении классов одним экземпляром плагина,
  // вызывать метод удаления классов другими
  searchPanel.on('switchClass.beforeAdded', function () {
    catalogShutter.switchClass('remove');
  });
  catalogShutter.on('switchClass.beforeAdded', function () {
    searchPanel.switchClass('remove');
  });
}

/**
 * !Product liked
 * */
function productLiked() {
  $('.like-js').on('click', function (e) {
    var $btn = $(this),
        classActive = 'added',
        activeText = $btn.data('active-text'),
        inactiveText = $btn.data('inactive-text');

    $btn.toggleClass(classActive);

    if($btn.hasClass(classActive)) {
      $('span', $btn).text(activeText);
      // if($btn.attr('title') !== undefined){
      //   $btn.attr('title', activeText);
      // }
      if($btn.attr('data-title') !== undefined){
        $btn.attr('data-title', activeText);
      }
    } else {
      $('span', $btn).text(inactiveText);
      // if($btn.attr('title') !== undefined){
      //   $btn.attr('title', inactiveText);
      // }
      if($btn.attr('data-title') !== undefined){
        $btn.attr('data-title', inactiveText);
      }
    }

    e.preventDefault();
  })
}

/**
 * Add to car animation
 */
function addToCarAnimation() {
  var $btn = $('.add-to-cart-js'),
      $cartKeeper = $('.cart-keeper-js'),
      $cartCounter = $('.counter-js', $cartKeeper),
      addedClass = 'added',
      pushClass = 'push',
      pickClass = 'pick',
      activeText = $btn.data('active-text'),
      inactiveText = $btn.data('inactive-text'),
      timeoutPush, timeoutPick
  ;

  $btn.on('click', function (event) {
    event.preventDefault();

    var $cutBtn = $(this),
        countLength = +$cartCounter.text();

    $cartKeeper.removeClass(pushClass).removeClass(pickClass);

    if (!$cutBtn.hasClass(addedClass)) {
      // Change a button
      $cutBtn.addClass(addedClass);
      $('span', $cutBtn).text(activeText);
      if($cutBtn.attr('data-title') !== undefined){
        $cutBtn.attr('data-title', inactiveText);
      }

      // Remove a copy of product image
      $('#figureCopy').remove();
      // Animate a product added to a cart
      var $figure = $cutBtn.closest('.product-item-js').find('.product-figure-js');
      $figure.clone()
          .addClass('product-figure_copy-js').attr('id', 'figureCopy')
          // .removeClass('product-figure-js')
          .offset({top:$figure.offset().top, left:$figure.offset().left})
          .css({
            width: $figure.outerWidth(),
            height: $figure.outerHeight()
          })
          .appendTo('body');

      // Animate a cart keeper (+ css styles)
      clearTimeout(timeoutPush);
      timeoutPush = setTimeout(function () {
        $cartCounter.removeClass('hide').text(++countLength);
        $cartKeeper.addClass(pushClass);
      }, 30)
    } else {
      // Change a button
      $cutBtn.removeClass(addedClass);
      $('span', $cutBtn).text(inactiveText);

      // Remove a copy of product image
      // $('#figureCopy').remove();

      // Animate a cart keeper (+ css styles)
      clearTimeout(timeoutPick);
      timeoutPick = setTimeout(function () {
        $cartCounter.text(--countLength);
        if (!countLength) {
          $cartCounter.addClass('hide');
        }
        $cartKeeper.addClass(pickClass);
        // clearTimeout(timeout);
      }, 30);
    }
  })
}

/**! jquery.ms-rolls.js
 * Version: 2019.1.0
 * Author: Astronim*
 * Description: Extended toggle class
 */

(function ($) {
  'use strict';

  var MsRolls = function (element, config) {
    var self,
        $element = $(element),
        $panel = $(config.panel, $element),
        isAnimated = false,
        pref = 'ms-rolls',
        pluginClasses = {
          initClass: pref + '_initialized'
        },
        focusElements = 'input, a, [tabindex], area, select, textarea, button, [contentEditable=true]' + config.hand,
        $panelWrap,
        relativeStyles = {
          position: '',
          left: '',
          top: '',
          width: ''
        },
        showStyles = {
          opacity: '',
          'user-select': '',
          'pointer-event': '',
          'z-index': ''
        },
        absoluteStyles = {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%'
        },
        hideStyles = {
          opacity: 0,
          'user-select': 'none',
          'pointer-event': 'none',
          'z-index': -1
        };

    var dataClpsd = $element.attr('data-rolls-collapsed');
    var collapsed = (dataClpsd === "true" || dataClpsd === "false") ? dataClpsd === "true" : config.collapsed;

    var callbacks = function () {
          /** track events */
          $.each(config, function (key, value) {
            if (typeof value === 'function') {
              $element.on('msRolls.' + key, function (e, param) {
                return value(e, $element, param);
              });
            }
          });
        },
        tabindexOn = function (_element) {
          // Все элементы _element поставить в фокус-очередь
          _element.attr('tabindex', '0');
        },
        tabindexOff = function (_element) {
          // Все элементы _element убрать с фокус-очереди
          _element.attr('tabindex', '-1');
        },
        open = function ($_panel) {
          if (!$_panel.length) {
            return false;
          }

          var $activePanelWrap = $_panel.parent(), // Ближайшая родительская обертка активной Панели
              $activeParentsPanels = $_panel.parentsUntil(element, config.panel), // Все родительские Панели активной Панели
              $otherActivePanelsWrap = $activeParentsPanels.parent(), // Все родительские Обертка активной Панели не включая ближайшую
              $otherActiveHeader = $otherActivePanelsWrap.prev(config.header), // Все родительские Обертка активной Панели не включая ближайшую
              $otherActiveParentsItems = $activeParentsPanels.parentsUntil(element, config.item) // Все родительские Элементы активной Панели
          ;

          // 1) Открыть все родительские Панели (без анимации)
          // Добавить класс на активные родительские (не ближайшие) элементы
          $activeParentsPanels.add($otherActiveParentsItems).add($otherActiveHeader).add($(config.hand, $otherActiveHeader)).addClass(config.modifiers.activeClass);

          // Открывать родительские Панели необходимо, если, например, открывается вложенная Панель методом "open"
          $activeParentsPanels
              .css(relativeStyles)
              .css(showStyles)
              .data('active', true).attr('data-active', true); // Указать в data-атрибуте, что Панель открыта;

          // 2) Открыть текущую панель (с анимацией)
          $element.trigger('msRolls.beforeOpen');// Вызов события перед открытием текущей панели

          var $activeItems = $_panel.closest(config.item), // Родительский Элемент активной Панели
              $activeHeader = $activePanelWrap.prev(config.header); // Шапка активной Панели

          // Добавить класс на активные элементы
          $_panel.add($activeItems).add($activeHeader).add($(config.hand, $activeHeader)).addClass(config.modifiers.activeClass);

          var callback = arguments[1];

          $_panel.css(showStyles); // Панель делаем видимой до начала анимации

          changeHeight($activePanelWrap, $_panel.outerHeight(), function () {
            $_panel
                .css(relativeStyles)
                .data('active', true).attr('data-active', true); // Указать в data-атрибуте, что Панель открыта

            $activePanelWrap.css({
              position: '',
              overflow: '',
              'height': ''
            });

            if (config.accessibility) {
              // Поставить в фокус-очередь все элементы с фокусировкой внутри активной Панели
              tabindexOn($(focusElements, $_panel));

              // В неактивных Панелях все элементы с фокусировкой убрать с фокус-очереди
              tabindexOff($(focusElements, $_panel.find(config.panel).filter(function () {
                return !$(this).data('active');
              })));
            }

            // Вызов события после открытия текущей панели
            $element.trigger('msRolls.afterOpen');

            // Вызов callback функции после открытия панели
            if (typeof callback === "function") {
              callback();
            }
          });

          if (collapsed) {
            // Проверить у соседей всех родительских Элементов наличие активных Панелей
            // Закрыть эти Панели
            var $siblingsPanel = $_panel.parentsUntil($element, config.item).siblings().find(config.panel).filter(function () {
              return $(this).data('active');
            });

            closePanel($siblingsPanel, function () {
              isAnimated = false; // Анимация завершена
            });
          }
        },
        close = function ($_panel) {
          if (!$_panel.length) {
            return false;
          }
          // Закрыть отдельно все вложенные активные панели,
          // И отдельно текущую панель.
          // Это сделано с целью определения события закрытия текущей панели отдельно.

          if (collapsed) {
            // Закрыть активные панели внутри текущей
            var $childrenOpenedPanel = $(config.panel, $_panel).filter(function () {
              return $(this).data('active');
            });

            closePanel($childrenOpenedPanel);
          }

          // Закрыть текущую панель
          $element.trigger('msRolls.beforeClose'); // Вызов события перед закрытием текущей панели
          var callback = arguments[1];

          closePanel($_panel, function () {
            $element.trigger('msRolls.afterClose'); // Вызов события после закрытия текущей панели

            // Вызов callback функции после закрытия панели
            if (typeof callback === "function") {
              callback();
            }
          });
        },
        closePanel = function ($_panel) {
          if (!$_panel.length) {
            return false;
          }

          var callback = arguments[1],
              $curPanelWrap = $_panel.parent(); // родительская обертка активной Панели

          var $curItems = $_panel.closest(config.item), // родительский Элемент активной Панели
              $curHeader = $curPanelWrap.prev(config.header); // Шапка активной Панели

          // Удалить активный класс со всех элементов
          $_panel.add($curItems).add($curHeader).add($(config.hand, $curHeader)).removeClass(config.modifiers.activeClass);

          // Закрыть панель
          changeHeight($curPanelWrap, 0, function () {
            $_panel
                .css(absoluteStyles)
                .css(hideStyles)
                .data('active', false).attr('data-active', false); // Указать в data-атрибуте, что панель закрыта

            $curPanelWrap.css('height', '');

            // Web accessibility
            if (config.accessibility) {
              // Убрать с фокус-очереди все элементы с фокусировкой внутри текущей Панели
              tabindexOff($(focusElements, $_panel));
            }

            // Вызов callback функции после закрытия панели
            if (typeof callback === "function") {
              callback();
            }
          });
        },
        changeHeight = function ($_wrap, _val) {
          var callback = arguments[2];

          $_wrap.css({
            position: 'relative',
            overflow: 'hidden'
          }).animate({
            'height': _val
          }, config.animationSpeed, function () {

            if (typeof callback === "function") {
              callback();
            }

            isAnimated = false;
          });
        },
        events = function () {
          $element.on(config.event, config.hand, function (event) {
            // Если панель во время клика находится в процессе анимации, то выполнение функции прекратится
            if (isAnimated) {
              event.preventDefault();
              return false;
            }

            var $currentHand = $(this);
            // Если текущий пункт не содержит панелей,
            // то выполнение функции прекратится
            if (!$currentHand.closest(config.item).has(config.panel).length) {
              console.log(1);
              return false;
            }

            // Начало анимирования панели
            // Включить флаг анимации
            isAnimated = true;

            event.preventDefault();

            var $currentPanel = $currentHand.closest(config.header).next().children(config.panel);

            if ($currentPanel.data('active')) {
              // Закрыть текущую панель
              close($currentPanel, function () {
                isAnimated = false; // Анимация завершина
              });
            } else {
              // Открыть текущую панель
              open($currentPanel, function () {
                isAnimated = false; // Анимация завершина
              });
            }
          });
        },
        init = function () {
          $panelWrap = $('<div/>', {
            class: 'rolls-panel-wrap-js',
            css: {
              position: 'relative',
              overflow: 'hidden'
            }
          });

          $panel.wrap($panelWrap);

          $panel
              .css(absoluteStyles)
              .css(hideStyles);

          var $activePanels = $panel.filter('.' + config.modifiers.activeClass);

          // Добавить класс на активные элементы
          var $activeItems = $activePanels.parents(config.item), // Все родительские Элементы активной Панели
              $activeHeaders = $activePanels.parentsUntil(element).prev(config.header), // Все Шапки в родительских Элементах
              $allActivePanels = $activeHeaders.next().children(config.panel); // Все родительские Панели

          $activePanels.add($activeItems).add($activeHeaders).add($allActivePanels).add($(config.hand, $activeHeaders)).addClass(config.modifiers.activeClass);

          // Открыть все родительские панели
          $activePanels.add($allActivePanels).css(relativeStyles).css(showStyles);

          // Удалить лишние внутренние стили у оберток активных Панелей
          $activePanels.add($allActivePanels).parent().css({
            // position: '',
            overflow: ''
          });

          // На активные панели установить дата-атрибут active сo заначением true
          $activePanels.add($allActivePanels).data('active', true).attr('data-active', true);

          // Web accessibility
          if (config.accessibility) {
            // Переключатель поставить в фокус-очередь
            tabindexOn($(config.hand, $element));
            // Все элементы с фокусировкой внутри панелей убрать с фокус-очереди
            tabindexOff($(focusElements, $panel));
            // Все элементы с фокусировкой внутри активных панелей поставить в фокус-очередь
            tabindexOn($(focusElements, $allActivePanels));
          }

          $element.addClass(pluginClasses.initClass);
          $element.trigger('msRolls.afterInit');
        };

    self = {
      callbacks: callbacks,
      open: open,
      close: close,
      events: events,
      init: init
    };

    return self;
  };

  $.fn.msRolls = function () {
    var _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i,
        ret;
    for (i = 0; i < l; i++) {
      if (typeof opt === 'object' || typeof opt === 'undefined') {
        _[i].msRolls = new MsRolls(_[i], $.extend(true, {}, $.fn.msRolls.defaultOptions, opt));
        _[i].msRolls.init();
        _[i].msRolls.callbacks();
        _[i].msRolls.events();
      } else {
        ret = _[i].msRolls[opt].apply(_[i].msRolls, args);
      }
      if (typeof ret !== 'undefined') {
        return ret;
      }
    }
    return _;
  };

  $.fn.msRolls.defaultOptions = {
    item: '.rolls__item-js', // Общий ближайший родитель (Элемент) для переключателя и разворачивающейся панели (Далее Панель)
    header: '.rolls__header-js', // Обертка для переключателя (Шапка)
    hand: '.rolls__hand-js', // Переключатель
    panel: '.rolls__panel-js', // Панель
    event: 'click', // Событие, которое разворачивает/сворачивает Панель
    animationSpeed: 300, // Скорость анимации Панели
    collapsed: true, // Параметр, указывающий на необходимось сворачивать ранее открытые Панели
    accessibility: false, // Опримизировать переключение фокуса по табу (снижает скорость выполнения скрипта)
    modifiers: {
      activeClass: 'rolls-active' // Класс, который добавляется, на активный элементы
    }
  };

})(jQuery);

/**
 * Rolls
 */
function rollsInit() {
  var $catalogLinks = $('.catalog-links-js');

  if ($catalogLinks.length) {
    $catalogLinks.msRolls({
      item: 'li',
      header: 'li > em',
      hand: 'li > em',
      panel: 'ul',
      animationSpeed: 200,
      collapsed: false,
      modifiers: {
        activeClass: 'active'
      }
    })
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

$(document).ready(function () {
  // showOnScroll();
  objectFitImages(); // object-fit-images initial
  placeholderInit();
  navExpander();
  initTooltip();
  detectScroll();
  printShow();
  equalHeight();
  inputFocusClass();
  inputHasValueClass();
  customSelect($('select.cselect'));
  slidersInit();
  gridLayout();
  tabs();
  toggleDropMenu();
  toggleShutters();
  productLiked();
  addToCarAnimation();
  rollsInit();

  formValidation();
});
