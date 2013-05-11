define(["kanfas","shape"],
function(Kanfas, Shape){

  function Rectangle(config){
    Shape.call(this, config);
  }

  Rectangle.prototype = Object.create(Shape.prototype);

  Rectangle.prototype.draw = function(){
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  };

  return Rectangle;
});