requirejs.config({
  baseUrl: "scripts"
});

requirejs(["kanfas",
          "state",
          "events",
          "shapes/rectangle",
          "interactions/mouse",
          "interactions/boundaries"
          ],
function(Kanfas, State, Events, Rectangle, Mouse, Boundaries){
  var canvas = document.getElementById("paintarea");

  var events = new Events(canvas),
      state = new State(canvas, events),
      kanfas = new Kanfas(canvas, state),
      mouse = new Mouse(canvas, events),
      rect = new Rectangle({
        width: 50,
        height: 50,
        x: 50,
        y: 50
      }),
      rect2 = new Rectangle({
        width: 100,
        height: 100,
        x: 110,
        y: 110
      }),
      boundaries = new Boundaries(canvas, events);

  events.addSubscriber(kanfas);

  kanfas.add(rect);
  kanfas.add(rect2);

  // add boundaries controllers to rect and rect2
  boundaries.addTo(rect, rect2);

  kanfas.draw();
});