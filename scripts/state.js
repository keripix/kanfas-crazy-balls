/**
 * This module is responsible for holding the current
 * canvas' state.
 *
 * The state includes:
 *
 * 1. The objects on the canvas
 * 2. The selected objects
 * 3. Wether a dragging action is being performed
 * 4. What to draw when the canvas request for a redraw
 */
define(function(){
  function State(canvas, events){
    this.objects = []; // Objects on the canvas
    this.dragging = false; // Am I in dragging mode at the moment?
    this.drawAllObjects = true;
    this.selections = []; // The selected objects
  }

  State.prototype.getObjects = function(){
    return this.objects;
  };

  State.prototype.getSelected = function(){
    return this.selections;
  };

  State.prototype.addObject = function(obj){
    this.objects.push(obj);
    return this;
  };

  State.prototype.addSelected = function(obj){
    if (this.findObject(obj, this.selections) === -1) {
      this.drawAllObjects = false;
      this.selections.push(obj);
    }
    return this;
  };

  State.prototype.removeObject = function(obj){

  };

  State.prototype.removeSelected = function(obj){
    var index = this.findObject(obj, this.selections);

    if (index === -1) {
      return;
    }

    this.selections.splice(index, 1);
    return this;
  };

  State.prototype.findObject = function(obj, data){
    var length = data.length,
        index = -1;

    for(var i = length;i >= 0; i--) {
      if (data[i] === obj) {
        index = i;
        break;
      }
    }

    return index;
  };

  return {
    init: function(canvas, events){
      return new State(canvas, events);
    }
  };
});