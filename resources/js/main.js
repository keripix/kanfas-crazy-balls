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

  var events = Events.init(canvas),
      state = State.init(canvas, events),
      kanfas = Kanfas.create(canvas, state),
      mouse = Mouse.init(canvas, events),
      rect = Rectangle.create({
        width: 50,
        height: 50,
        x: 50,
        y: 50
      }),
      rect2 = Rectangle.create({
        width: 100,
        height: 100,
        x: 110,
        y: 110
      }),
      boundaries = Boundaries.init(canvas, events);

  events.addSubscriber(kanfas);

  kanfas.add(rect);
  kanfas.add(rect2);

  // add boundaries controllers to rect and rect2
  boundaries.addTo(rect, rect2);

  kanfas.draw();
});