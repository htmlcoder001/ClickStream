/* @author web@2dsd.ru | webtitov.ru */
'use strict';

document.addEventListener("DOMContentLoaded", () => {
  const WebT = {};

  WebT.settings = {
    nav_active_class: '--nav-active',
    modal_active_class: '--modal-show'
  };

  WebT.elements = {
    nav_toggle: document.getElementById('nav_toggle'),
    scroll_links: document.querySelectorAll('a[href^="#"]'),
    modal_toggle: document.querySelectorAll('[data-modal-toggle]'),
    modal_box: document.querySelectorAll('[data-modal]'),
    overlay: document.getElementById('overlay'),
    nav_menu: document.querySelector('.header-wrapper__nav'),
    close_modal: document.querySelectorAll('[data-modal-close]')
  };

  /* Check if click outside target element */
  const isClickOutside = ($target, $class) => {
    const closeTarget = (e) => {
      if (!e.target.classList.contains($class)) {
        $target.classList.remove($class);
      }
    };
    if ($target === 0) {
      document.body.removeEventListener('click', closeTarget);
    } else {
      document.body.addEventListener('click', closeTarget);
    }
  };

  /* Close all modals */
  const closeModals = () => {
    // close all modals
    for (let i=0; i < WebT.elements.modal_box.length; i++) {
      WebT.elements.modal_box[i].classList.remove(WebT.settings.modal_active_class);
    }
    // remove active classes from modal toggle buttons
    for (let i=0; i < WebT.elements.modal_toggle.length; i++) {
      WebT.elements.modal_toggle[i].classList.remove(WebT.settings.modal_active_class);
    }
    // close overlay
    WebT.elements.overlay.classList.remove(WebT.settings.modal_active_class);
  }

  /* Nav toggle */
  (() => {
      WebT.elements.nav_toggle.addEventListener('click', (e) => {
        let target_toggle = e.target,
            isTargetActive = false;
        document.body.classList[document.body.classList.contains(WebT.settings.nav_active_class) ? 'remove' : 'add'](WebT.settings.nav_active_class);
        if (isTargetActive === false) {
          //closeModals();
          /*if (WebT.elements.overlay.classList.contains('--nav-opened')) {
            WebT.elements.overlay.classList.remove('--nav-opened');
          }*/
          isClickOutside(WebT.elements.nav_menu, WebT.settings.nav_active_class);
          isTargetActive = true;
        } else {
          isClickOutside(0);
          isTargetActive = false;
        }
      });

    WebT.elements.overlay.addEventListener('click', (e) => {
      document.body.classList.remove(WebT.settings.nav_active_class)
    });
  })();

  /* Channels item open */
  (() => {
    let channels_items = document.querySelectorAll('.channels-col__item');
    let item_active_class = '--channels-item-active';

    function close_all_items() {
      for (let i=0; i < channels_items.length; i++) {
        channels_items[i].classList.remove(item_active_class);
      }
    }

    for (let i=0; i < channels_items.length; i++) {
      channels_items[i].addEventListener('click', () => {
        if (channels_items[i].classList.contains(item_active_class)) {
          channels_items[i].classList.remove(item_active_class);
          return false;
        } else {
          close_all_items();
          channels_items[i].classList.add(item_active_class);
          setTimeout(() => {if(channels_items[i].classList.contains(item_active_class)) {channels_items[i].classList.remove(item_active_class);}}, 4500)
        }
      })
    }
  })();

  /* Anchor smooth scroll */
  (() => {
    WebT.elements.scroll_links.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.remove(WebT.settings.nav_active_class)
        const offset = -30,
              element = document.querySelector(this.getAttribute('href')),
              target = element.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({top: target, behavior: 'smooth'});
      });
    });
  })();

  /* Modals */
  (() => {
    // Add click event to close modals
    for (let i=0; i < WebT.elements.close_modal.length; i++) {
      WebT.elements.close_modal[i].addEventListener('click', () => {
        closeModals();
      });
    }
    // Add click event to open target modal
    for (let i=0; i < WebT.elements.modal_toggle.length; i++) {
      WebT.elements.modal_toggle[i].addEventListener('click', () => {
        let this_toggle = WebT.elements.modal_toggle[i],
            target_modal = this_toggle.getAttribute('data-modal-toggle');
        if (target_modal === 'nav') {
          WebT.elements.overlay.classList[WebT.elements.overlay.classList.contains('--nav-opened') ? 'remove' : 'add']('--nav-opened');
        }
        // if nav modal opened
        if (target_modal === 'nav' && this_toggle.classList.contains(WebT.settings.modal_active_class)) {
          closeModals();
          WebT.elements.modal_toggle[i].classList.remove(WebT.settings.modal_active_class);
        } else {
          closeModals();
          document.querySelector(`[data-modal='${target_modal}']`).classList.add(WebT.settings.modal_active_class);
          WebT.elements.overlay.classList.add(WebT.settings.modal_active_class);
          WebT.elements.modal_toggle[i].classList.add(WebT.settings.modal_active_class);
        }
      });
    }
  })();

  /* Change header on scroll */
  (() => {
    const changeHeaderClass = () => {
      let scrollPosY = window.pageYOffset | document.body.scrollTop,
          header = document.getElementsByTagName('header')[0];
      if(scrollPosY > 100) {
        header.classList.add('--header-fixed');
      } else if(scrollPosY <= 100) {
        header.classList.remove('--header-fixed');
      }
    };
    window.addEventListener('scroll', changeHeaderClass);
  })();

});