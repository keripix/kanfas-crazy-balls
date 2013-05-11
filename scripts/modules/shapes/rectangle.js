define(["modules/shapes/basic"],
function(Basic){

  function Rectangle(config){
    //basic.call(this);
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 50;
    this.height = config.height || 50;
  }

  Rectangle.prototype.draw = function() {
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  };

  return Rectangle;
});