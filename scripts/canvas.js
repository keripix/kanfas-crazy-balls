requirejs.config({
  baseUrl: "scripts/modules"
});

requirejs(["shape"],
function(Shape){
  var canvas = document.getElementById("paintarea"),
      ctx = canvas.getContext('2d'),
      s = new Shape(ctx),
      rectangle = s.Rectangle({
        x: 50,
        y: 50,
        width: 50,
        height: 100
      });
  rectangle.draw();
});