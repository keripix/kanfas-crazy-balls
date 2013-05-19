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

    this.fillStyle = "#CCCC00";

    this.selectedStyle = "#CC0000";
    this.normalStyle = this.fillStyle;
    this.strokeStyle = this.normalStyle;

    this.strokeWidth = 1;
  }

  return Shape;
});