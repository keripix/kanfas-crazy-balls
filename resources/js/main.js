requirejs.config({
  baseUrl: "scripts"
});

requirejs(["kanfas",
          "modules/shapes/rectangle",
          "modules/interactions/events",
          "modules/interactions/mouse"],
function(Kanfas, Rectangle, Events, Mouse){
  var canvas = document.getElementById("paintarea");

  var k = new Kanfas(canvas),
      e = new Events(canvas),
      m = new Mouse(canvas, e),
      rect = new Rectangle({
        width: 50,
        height: 50,
        x: 50,
        y: 50
      });

  // K subscribes to e events
  e.addSubscriber(k);

  k.add(rect);
  k.draw();
});