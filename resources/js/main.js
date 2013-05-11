requirejs.config({
  baseUrl: "scripts"
});

requirejs(["kanfas", "modules/shapes/rectangle"],
function(Kanfas, Rectangle){
  var canvas = document.getElementById("paintarea");

  var k = new Kanfas(canvas),
      rect = new Rectangle({
        width: 50,
        height: 50,
        x: 50,
        y: 50
      });

  k.add(rect);
  k.draw();
});