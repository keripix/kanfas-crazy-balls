define([
  "shapes/rectangle"
  ],
function(Rectangle){

  function create(type, config) {
    type = type.toLowerCase();

    if (type === "rectangle") {
      return Rectangle.create(config);
    } else if (type === "circle") {
      console.log("circle");
    } else if (type === "image") {
      console.log("image");
    }
  }

  return {
    create: create
  };
});