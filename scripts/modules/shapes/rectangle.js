define(["shapes/basic"],
function(Basic){

  function Rectangle(config, ctx){
    //basic.call(this);
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 50;
    this.height = config.height || 50;

    this.ctx = ctx;
    console.log(ctx);
  }

  //Rectangle.prototype = Object.create(basic.prototype);

  Rectangle.prototype.draw = function() {
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  };

  //Rectangle.name = "rectangle";

  return Rectangle;
});