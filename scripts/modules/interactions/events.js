define(function(){
  function Events(canvas){
    this.canvas = canvas;
    this.down = false;
    this.init();
  }

  Events.prototype = {
    init: function(){
      this.canvas.addEventListener('mousedown', this.onMouseDown, false);
      this.canvas.addEventListener('mouseup', this.onMouseUp, false);
    },

    addSubscriber: function(obj){

    },

    on: function(eventName, callback, scope){

    },

    onMouseDown: function(e){
      this.down = true;
      console.log("mouse down");
    },

    onMouseUp: function(e){
      console.log("mouse up");
    }
  };

  return Events;
});