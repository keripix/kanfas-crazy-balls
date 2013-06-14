# Kanfas

This is an **experimental library**. I created Kanfas in order to take a dive into HTML5 Canvas. Along the way, I'm also aiming at learning how to build a modular library.

Once again, this is **experimental**. Meaning, I don't recommend anyone to use this in production. There are other, and definitely better, canvas libraries, such as [FabricJs](http://fabricjs.com/).

But if you've decided to try this library, please run `bower install` first.

## Target

Priorities:

1. Modular (I've chosen AMD style with the help of RequireJS)
2. Learning how to create better API.
3. Unit tested (I'm using phantomjs, jasmine, and karma)
4. Animations
5. Physics Animations
6. Brush

Later target:

1. Interactive resizing (boundingbox not working at the moment)
2. Interactive rotation (boundingbox not working at the moment)
3. Learning Performance
4. Foundation for games

## Demo

TODO

## Testing

Make sure you have these installed:

+ [phantomjs](http://phantomjs.org/)
+ [karma](http://karma-runner.github.io/)

Also, please install the components needed by this library:

> $ bower install

And then, to run the test, just run:

> $ karma start

## Learning References:

1. [FabricJs](http://fabricjs.com/)
2. [Making Canvas Useful](http://simonsarris.com/blog/510-making-html5-canvas-useful)
3. [VerletJs](http://subprotocol.com/verlet-js/)
4. [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/)