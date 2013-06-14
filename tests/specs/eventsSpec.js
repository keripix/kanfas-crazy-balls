define([
  "events"
  ],
function(Events){
  var e = new Events(),
      countOnSomething = 0,
      countOnThis = 0,
      countOnThat = 0,
      handlers = {
        onSomething: function(){countOnSomething++;},
        onThis: function(){countOnThis++;},
        onThat: function(){countOnThat++;}
      },
      fake = {
        getSubscriptions: function(){
          return {
            scope: this,
            "onSomething": handlers.onSomething,
            "onThis": handlers.onThis,
            "onThat": handlers.onThat
          };
        }
      },
      fake2 = {
        getSubscriptions: function(){
          return {
            "onSomething": handlers.onSomething,
            "onThis": handlers.onThis,
            "onThat": handlers.onThat
          };
        }
      };

  describe("Events", function(){
    describe("Subscriptions", function(){
      it("Should add event handlers properly", function(){
        e.addSubscriber(fake);

        expect(e.handlers.onSomething[0].fn).toEqual(handlers.onSomething);
        expect(e.handlers.onSomething[0].scope).toEqual(fake);
        expect(e.handlers.onSomething.length).toEqual(1);

        expect(e.handlers.hasOwnProperty("onThis")).toBeTruthy();
        expect(e.handlers.hasOwnProperty("onThat")).toBeTruthy();
      });

      it("Should add another event handlers properly", function(){
        e.addSubscriber(fake2);

        expect(e.handlers.onSomething.length).toEqual(2);
        expect(e.handlers.onSomething[1].fn).toEqual(handlers.onSomething);
        expect(e.handlers.onSomething[1].scope).toEqual(e);
      });
    });

    describe("Firing Events", function(){
      beforeEach(function(){
        e.handlers = {};
      });

      it("Should call the correct handlers", function(){
        e.addSubscriber(fake);
        e.fireEvent("onSomething", {});
        expect(countOnSomething).toEqual(1);

        e.addSubscriber(fake2);
        e.fireEvent("onSomething", {});
        expect(countOnSomething).toEqual(3);

        e.fireEvent("onThat");
        expect(countOnThat).toEqual(2);
      });
    });

    describe("Removing Event Handlers", function(){
      beforeEach(function(){
        e.handlers = {};
        countOnThat = 0;
        countOnSomething = 0;
        countOnThis = 0;
      });

      it("Should remove the handler", function(){
        e.addSubscriber(fake);
        e.addSubscriber(fake2);

        e.off("onSomething", handlers.onSomething);
        expect(e.handlers.onSomething.length).toEqual(0);
      });

      it("Should not have any removed handlers called", function(){
        e.addSubscriber(fake);
        e.addSubscriber(fake2);
        e.off("onSomething", handlers.onSomething);

        e.fireEvent("onSomething");
        expect(countOnSomething).toEqual(0);

        e.fireEvent("onThat");
        expect(countOnThat).toEqual(2);
        e.fireEvent("onThis");
        expect(countOnThis).toEqual(2);
      });
    });
  });
});