define([
  "events"
  ],
function(Events){
  var e = new Events(),
      onSomething = function(){},
      onThis = function(){},
      onThat = function(){},
      fake = {
        getSubscriptions: function(){
          return {
            scope: this,
            "onSomething": onSomething,
            "onThis": onThis,
            "onThat": onThat
          };
        }
      },
      fake2 = {
        getSubscriptions: function(){
          return {
            "onSomething": onSomething,
            "onThis": onThis,
            "onThat": onThat
          };
        }
      };

  describe("Events", function(){
    describe("Subscriptions", function(){
      it("Should add event handlers properly", function(){
        e.addSubscriber(fake);

        expect(e.handlers.onSomething[0].fn).toEqual(onSomething);
        expect(e.handlers.onSomething[0].scope).toEqual(fake);
      });
    });
  });
});