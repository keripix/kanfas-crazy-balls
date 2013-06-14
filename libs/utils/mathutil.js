define(function(){
  return {
    getDistance: function(from, to){
      return Math.sqrt(Math.pow(from.x-to.x, 2)+Math.pow(from.y-to.y, 2));
    }
  };
});