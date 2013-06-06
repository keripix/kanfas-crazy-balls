requirejs.config({
  baseUrl: "scripts"
});

requirejs(["kanfas",
          "state",
          "events",
          "shapes/shapefactory",
          "interactions/mouse",
          "interactions/boundaries"
          ],
function(Kanfas, State, Events, ShapeFactory, Mouse, Boundaries){
  var canvas = document.getElementById("paintarea"),
      events = Events.init(canvas),
      state = State.init(canvas, events),
      kanfas = Kanfas.create(canvas, state),
      mouse = Mouse.init(canvas, events),
      rect = ShapeFactory.create("Rectangle", {
        width: 50,
        height: 50,
        x: 50,
        y: 50
      }),
      rect2 = ShapeFactory.create("rectangle", {
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