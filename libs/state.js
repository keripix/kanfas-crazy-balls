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
  function State(){
    this.objects = []; // Objects on the canvas
    this.dragging = false; // Am I in dragging mode at the moment?
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
    if (this.findObjectPos(obj, this.selections) === -1) {
      this.selections.push(obj);
    }
    return this;
  };

  State.prototype.removeObject = function(obj){
    var index = this.findObjectPos(obj, this.objects);

    if (index === -1){
      return;
    }

    return this.objects.splice(index, 1)[0];
  };

  State.prototype.removeSelected = function(obj){
    var index = this.findObjectPos(obj, this.selections);

    if (index === -1) {
      return;
    }

    return this.selections.splice(index, 1)[0];
  };

  State.prototype.findObjectPos = function(obj, data){
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
    init: function(){
      return new State();
    }
  };
});