define([
  "shapes/rectangle",
  "shapes/circle"
  ],
function(Rectangle, Circle){

  function create(type, config, events) {
    type = type.toLowerCase();

    if (type === "rectangle") {
      return Rectangle.create(config);
    } else if (type === "circle") {
      return Circle.create(config);
    } else if (type === "image") {
      console.log("image");
    }
  }

  return {
    create: create
  };
});