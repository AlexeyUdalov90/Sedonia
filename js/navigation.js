'use strict';

(function () {
  var navigation = document.querySelector('.main-nav');
  var navToggle = navigation.querySelector('.main-nav__toggle');

  navigation.classList.remove('main-nav--nojs');

  navToggle.addEventListener('click', function () {
    navigation.classList.toggle('main-nav--opened');
  });
})();
