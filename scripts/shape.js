define(["kanfas"],
function(Kanfas){
  function Shape(config){
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 10;
    this.height = config.height || 10;
  }

  Shape.prototype = {
    setContext: function(ctx){
      this.ctx = ctx;
    }
  };

  return Shape;
});