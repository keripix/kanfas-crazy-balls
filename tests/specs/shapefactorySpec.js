define([
  "shapes/shapefactory",
  "shapes/rectangle",
  "shapes/circle"
  ],
function(ShapeFactory, Rectangle, Circle) {

  var conf = {x:0,y:0};

  describe("ShapeFactory", function(){
    it("Should return a rectangle", function(){
      expect(ShapeFactory.create("Rectangle",conf) instanceof Rectangle).toBeTruthy();

      expect(ShapeFactory.create("rectangle",conf) instanceof Rectangle).toBeTruthy();
    });

    it("Should return a circle", function(){
      expect(ShapeFactory.create("Circle", conf) instanceof Circle).toBeTruthy();

      expect(ShapeFactory.create("circle", conf) instanceof Circle).toBeTruthy();
    });
  });
});