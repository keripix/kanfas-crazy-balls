define(["shape", "utils/object", "utils/math"],
function(Shape, ObjectUtil, MathUtil){

  function Circle(config){
    Shape.call(this, config);
    this.radius = config.radius || 25;
    this.height = this.width = this.radius * 2;
  }

  Circle.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.fillStyle;
    ctx.fill();

    return this;
  };

  Circle.prototype.clear = function(ctx, offsetX, offsetY) {
    offsetX = offsetX || 8;
    offsetY = offsetY || 8;
    ctx.clearRect(this.x - this.radius - 2, this.y - this.radius - 2, this.width + offsetX, this.height + offsetY);
    return this;
  };

  Circle.prototype.setDimension = function(radius) {
    this.radius = radius;
    this.width = this.height = this.radius*2;
    return this;
  };

  /**
   * We need to calculate the distance between x,y to the center
   * of the circle. If this distance is smaller than the size of the
   * circle's radius, then we are inside this circle
   */
  Circle.prototype.isPointInsideMe = function(x, y) {
    return MathUtil.getDistance({x: x,y: y}, {x: this.x, y: this.y}) <= this.radius;
  };

  Circle.prototype.getRadius = function() {
    return this.radius;
  };

  ObjectUtil.inherits(Circle, Shape);

  return {
    create: function(config){
      return new Circle(config);
    }
  }
});