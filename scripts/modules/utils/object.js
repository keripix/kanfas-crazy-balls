define(function(){
  return {
    extend: function(target, source) {
      for (var prop in source) {
        target[prop] = source[prop];
      }

      return target;
    }
  };
});