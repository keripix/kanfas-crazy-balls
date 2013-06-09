requirejs.config({
  baseUrl: "libs"
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
        y: 110,
        fillStyle: "red"
      }),
      rect3 = ShapeFactory.create("rectangle", {
        width: 200,
        height: 50,
        x: 300,
        y: 100,
        fillStyle: "#00C0C0"
      }),
      circle = ShapeFactory.create("circle", {
        radius: 30,
        x: 250,
        y: 250,
        fillStyle: "#004040"
      }),
      circle2 = ShapeFactory.create("circle", {
        radius: 50,
        x: 300,
        y: 250,
        fillStyle: "#00C0C0"
      }),
      boundaries = Boundaries.init(canvas, events);

  events.addSubscriber(kanfas);

  kanfas.add(rect, rect2, rect3, circle, circle2);

  kanfas.draw();

  // Polyfill untuk requestAnimation
  (function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
  }());


  var xOrientation = 5,
      yOrientation = 4,
      offsetX = xOrientation*2 + 1,
      offsetY = yOrientation*2 + 1,
      ctx = kanfas.ctx;

  function animate(){
    circle2.clear(ctx, offsetX, offsetY)
      .setPosition(circle2.x+xOrientation, circle2.y+yOrientation);

    if (circle2.x - circle2.radius <= 0 || circle2.x + circle2.radius >= canvas.width){
      xOrientation *= -1;
    }

    if (circle2.y - circle2.radius <= 0 || circle2.y + circle2.radius >= canvas.height){
      yOrientation *= -1;
    }

    kanfas.draw();
    requestAnimationFrame(animate);
  }

  // animate();
});