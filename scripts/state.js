define(function(){
  function State(canvas, events){
    this.objects = []; // Objects on the canvas
    this.dragging = false; // Am I in dragging mode at the moment?
    this.drawAll = true;
    this.selections = []; // The selected objects
  }

  State.prototype = {
    onMouseDown: function(){

    },
    onMouseUp: function(){

    },
    onMouseMove: function(){

    },
    onMouseMoved: function(){

    },
    getSubscriptions: function(){
      return {
        'mouse.down': {
        },
        'mouse.up': {
        },
        'mouse.move': {
        },
        'mouse.moved': {
        }
      }
    }
  };

  return State;
});