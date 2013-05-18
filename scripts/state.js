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

  State.prototype = {
    getObjects: function(){
      return this.objects;
    },

    getSelected: function(){
      return this.selections;
    },

    addObject: function(obj){
      this.objects.push(obj);
    },

    addSelected: function(obj){
      this.drawAllObjects = false;
      this.selections.push(obj);
    },

    removeObject: function(obj){

    },

    removeSelected: function(obj){

    },

    drawAll: function(){
      return this.drawAllObjects;
    },

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