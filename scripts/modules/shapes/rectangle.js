define(["kanfas","shape"],
function(Kanfas, Shape){

  function Rectangle(kanfas, config){
    this.canvas = kanfas.getCanvas();
    this.ctx = kanfas.getContext();

    Shape.call(this, config);
  }

  Rectangle.prototype = Object.create(Shape.prototype);

  Rectangle.prototype.draw = function() {
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  };

  return Rectangle;
});