/**
 * This is the base prototype for all shapes
 */
define(function(){
  function Shape(config){
    this.x = config.x || 0;
    this.y = config.y || 0;

    this.offsetX = 0;
    this.offsetY = 0;

    this.width = config.width || 10;
    this.height = config.height || 10;

    this.rotation = config.rotation || 0;

    this.fillStyle = config.fillStyle || "#FFFF00";

    this.alpha = config.alpha || 1;

    this.selectedStyle = config.selectedStyle || "#FF0000";
    this.normalStyle = this.fillStyle;
    this.strokeStyle = this.normalStyle;

    this.strokeWidth = 1;

    this.movable = true;

    this.selected = false;
    this.drag = false;
  }

  Shape.prototype = {
    getTopLeft: function(){
      return {x: this.x, y: this.y};
    },

    getTopRight: function(){
      return {x: this.x + this.width, y: this.y};
    },

    getBottomLeft: function(){
      return {x: this.x, y: this.y + this.height};
    },

    getBottomRight: function(){
      return {x: this.x + this.width, y: this.y + this.height};
    },

    select: function(ctx, x, y){
      this.offsetX = x - this.x;
      this.offsetY = y - this.y;
      // this.strokeStyle = this.selectedStyle;
      // this.selected = true;
      return this;
    },

    deselect: function(ctx){
      this.offsetX = 0;
      this.offsetY = 0;
      // this.strokeStyle = this.normalStyle;
      // this.selected = false;
      return this;
    },

    isSelected: function(){
      return this.selected;
    },

    disableMove: function(){
      this.movable = false;
      return this;
    },

    enableMove: function(){
      this.movable = true;
      return this;
    },

    setPosition: function(x, y){
      if (this.movable) {
        this.x = x - this.offsetX;
        this.y = y - this.offsetY;
        this.drag = true;
      }
      return this;
    },

    isMovable: function(){
      return this.movable;
    },

    isMoving: function(){
      return this.selected && this.drag;
    }
  };

  return Shape;
});