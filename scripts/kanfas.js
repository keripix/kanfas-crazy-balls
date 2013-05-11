define(function(){
  function Kanfas(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
  }

  Kanfas.prototype = {
    getCanvas: function(){
      return this.canvas;
    },

    getContext: function(){
      return this.ctx;
    }
  };

  return Kanfas;
});