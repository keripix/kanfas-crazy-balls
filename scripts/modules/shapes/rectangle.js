define(["kanfas","modules/shapes/basic"],
function(Kanfas, Basic){

  function Rectangle(kanfas, config){
    if (!kanfas instanceof Kanfas) {
      console.log("Fails");
    }

    this.ctx = kanfas.getContext();

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