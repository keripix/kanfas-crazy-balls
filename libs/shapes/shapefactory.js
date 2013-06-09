define([
  "shapes/rectangle",
  "shapes/circle"
  ],
function(Rectangle, Circle){

  return {
    create: function (type, config) {
      type = type.toLowerCase();

      if (type === "rectangle") {
        return Rectangle.create(config);
      } else if (type === "circle") {
        return Circle.create(config);
      } else if (type === "image") {
        console.log("image");
      }
    }
  };
});