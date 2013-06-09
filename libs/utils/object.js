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

  function inherits(target, source){
    var proxy = Object.create(source.prototype);

    mixin(proxy, target.prototype);

    target.prototype = proxy;

    return target;
  }

  function addMethods(constructor, methods){
    var i;
    for (i in methods){
      constructor.prototype[i] = methods[i];
    }

    return constructor;
  }

  return {
    extend: mixin,
    mixin: mixin,
    inherits: inherits,
    addMethods: addMethods
  };
});