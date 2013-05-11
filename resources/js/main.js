requirejs.config({
  baseUrl: "scripts"
});

requirejs(["kanfas", "modules/shapes/rectangle"],
function(Kanfas, Rectangle){
  var canvas = document.getElementById("paintarea"),
      ctx = canvas.getContext("2d");

  var k = new Kanfas(ctx),
      rect = new Rectangle(k, {
        width: 50,
        height: 50,
        x: 50,
        y: 50
      });

  rect.draw();
});