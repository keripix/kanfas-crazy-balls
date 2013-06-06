define([
  "shapes/rectangle"
  ],
function(Rectangle){

  function create(type, config) {
    if (type.toLowerCase() === "rectangle") {
      return Rectangle.create(config);
    }
  }

  return {
    create: create
  };
});