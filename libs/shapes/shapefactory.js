define([
  "shapes/rectangle",
  "shapes/circle"
  ],
function(Rectangle, Circle){

  return {
    create: function (type, config) {
      type = type.toLowerCase();

      if (type === "rectangle") {
        return new Rectangle(config);
      } else if (type === "circle") {
        return new Circle(config);
      } else if (type === "image") {
        console.log("image");
      }
    }
  };
});