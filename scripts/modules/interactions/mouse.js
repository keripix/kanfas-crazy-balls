define(function(){
  function Mouse(canvas, events){
    this.canvas = canvas;
    this.events = events;
    this.drag = false;
    this.pressed = false;
    this.init();
  }

  Mouse.prototype = {
    init: function(){
      this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this), false);
      this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this), false);
      this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    },

    onMouseDown: function(e){
      this.down = true;
      this.events.fireEvent('canvas.pressed', e);
    },

    onMouseUp: function(e){
      this.down = false;
      this.events.fireEvent('canvas.released', e);

      if (this.drag) {
        this.drag = false;
        this.events.fireEvent('canvas.dragged', e);
      }
    },

    onMouseMove: function(e){
      if (this.down) {
        this.drag = true;
        this.events.fireEvent('canvas.dragging');
      }
    }
  };

  return Mouse;
});