/**
 * Simple module for some object oriented programming
 */
define(function(){
  function mixin(target, source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }

    return target;
  }

  return {
    extend: mixin,

    mixin: mixin
  };
});