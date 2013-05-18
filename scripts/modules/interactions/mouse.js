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

      this.calculateCanvasPosition();
    },

    calculateCanvasPosition: function(){
      if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['paddingLeft'], 10) || 0;
        this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['paddingTop'], 10) || 0;
        this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['borderLeftWidth'], 10) || 0;
        this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(this.canvas, null)['borderTopWidth'], 10) || 0;
      }

      var html = document.body.parentNode;

      this.htmlTop = html.offsetTop;
      this.htmlLeft = html.offsetLeft;
    },

    getMousePosition: function(e){
      var offsetX = 0,
          offsetY = 0,
          mx,
          my,
          element = this.canvas;

      if (element.offsetParent !== undefined) {
        do {
          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
      }

      // Add padding and border style widths to offset
      // Also add the <html> offsets in case there's a position:fixed bar
      offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
      offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

      mx = e.pageX - offsetX;
      my = e.pageY - offsetY;

      // We return a simple javascript object (a hash) with x and y defined
      return {x: mx, y: my};
    },

    onMouseDown: function(e){
      this.down = true;
      this.events.fireEvent('mouse.down', this.getMousePosition(e));
    },

    onMouseUp: function(e){
      this.down = false;
      this.events.fireEvent('mouse.up', this.getMousePosition(e));

      if (this.drag) {
        this.drag = false;
        this.events.fireEvent('mouse.moved', this.getMousePosition(e));
      }
    },

    onMouseMove: function(e){
      if (this.down) {
        this.drag = true;
        this.events.fireEvent('mouse.move', this.getMousePosition(e));
      }
    }
  };

  return Mouse;
});