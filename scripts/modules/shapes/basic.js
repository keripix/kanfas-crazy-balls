define(["kanfas"],
function(Kanfas){
  function Basic () {
    this.width = 0;
    this.height = 0;
    this.fillColor = "white";
    this.strokeColor = "black";
  }

  Basic.prototype = Object.create(Kanfas.prototype);

  return Basic;
});