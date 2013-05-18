requirejs.config({
  baseUrl: "scripts"
});

requirejs(["kanfas",
          "state",
          "events",
          "modules/shapes/rectangle",
          "modules/interactions/mouse"],
function(Kanfas, State, Events, Rectangle, Mouse){
  var canvas = document.getElementById("paintarea");

  var kanfas = new Kanfas(canvas),
      events = new Events(canvas),
      state = new State(canvas, events),
      mouse = new Mouse(canvas, events),
      rect = new Rectangle({
        width: 50,
        height: 50,
        x: 50,
        y: 50
      });

  // K subscribes to e events
  events.addSubscriber(kanfas);

  kanfas.add(rect);
  kanfas.draw();
});