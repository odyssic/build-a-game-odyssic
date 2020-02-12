(function() {
    function $(selector) {
        return document.querySelector(selector);
    }

    const Game = function(CanvasId) {
        CanvasId = $("#space");
        console.log("hi!");

        const backgroundSpace = $("#space");
        let screen = backgroundSpace.getContext("2d");
        const gameSize = { x: backgroundSpace.width, y: backgroundSpace.height };

        // all bodies in game

        this.bodies = [new Player(this, gameSize)];

        const self = this;

        const tick = function() {
            self.update();
            self.draw(screen, gameSize);
            requestAnimationFrame(tick);
        };
        tick();

        // screen background details
        // const my_gradient = screen.createLinearGradient(0, 0, 0, 170);
        // my_gradient.addColorStop(0, "blue");
        // my_gradient.addColorStop(1, "blue");
        // screen.fillStyle = my_gradient;
        // screen.fillRect(0, 0, 400, 400)
    };

    Game.prototype = {
        update: function() {
            for (var i = 0; i < this.bodies.length; i++) this.bodies[i].update();
            // console.log('hi')
        },
        draw: function(screen, gameSize) {
            screen.clearRect(0, 0, gameSize.x, gameSize.y);
            for (var i = 0; i < this.bodies.length; i++) {
                drawRect(screen, this.bodies[i]);
            }
        },
        addBody: function(body) {
            this.bodies.push(body);
        }
    };

    var Bullet = function(center, velocity) {
        this.size = { x: 5, y: 5 };
        this.center = center;
        this.velocity = velocity;
    };
    //removed 'prototype'

    Bullet.prototype = {
        update: function() {
            this.center.x += this.velocity.x;
            this.center.y += this.velocity.y;
        }
    };

    var Invader = function(game, center) {
        this.game = game;
        this.size = { x: 15, y: 15 };
        this.center = center;
        this.patrolX = 0;
        this.speedX = 0.3;
    };
    //removed 'prototype'

    Invader.prototype = {
        update: function() {
            if (this.patrolX < 0 || this.patrolX > 40) {
                this.speedX = -this.speedX;
            }
            this.center.x += this.speedX;
            this.patrolX += this.speedX;
        }
    };

    // var createInvaders = function()

    // tells game where playeris at moment
    var Player = function(game, gameSize) {
        this.game = game;
        this.size = { x: 25, y: 25 };
        this.center = { x: gameSize.x / 2, y: gameSize.y - this.size.x };
        this.keyboarder = new keyboarder();
    };
    //removed 'prototype'

    Player.prototype = {
        update: function() {
            if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
                this.center.x -= 2;
            } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
                this.center.x += 2;
            }
            if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
                var bullet = new Bullet({ x: this.center.x, y: this.center.y - this.size.x / 2 },

                    { x: 0, y: -6 }
                );
                this.game.addBody(bullet);
            }
        }
    };

    var drawRect = function(screen, body) {
        screen.fillRect(
            body.center.x - body.size.x / 2,
            body.center.y - body.size.y / 2,
            body.size.x,
            body.size.y
        );
        screen.fillStyle = "#ff99cc";
    };

    var keyboarder = function() {
        var keyState = {};
        window.onkeydown = function(e) {
            keyState[e.keyCode] = true;
        };

        window.onkeyup = function(e) {
            keyState[e.keyCode] = false;
        };
        this.isDown = function(keyCode) {
            return keyState[keyCode] === true;
        };
        this.KEYS = { LEFT: 37, RIGHT: 39, SPACE: 32 };
    };

    window.onload = function() {
        new Game("screen");
    };
})();

// //create an empty array for bodies
// this.bodies = [];

// this.bodies = this.bodies.concat(createBees(this));

// //.concat merges two arrays into a new array

// this.bodies = this.bodies.concat(new Player(this, gameSize));

// const self = this;
// // main game tick

// // function.Loops forever, running 60 times a SecurityPolicyViolationEvent.

// self.update();

// // Draw game bodies.

// self.draw(screen, gameSize);
// // queue up next call to tick with browswer.

// requesetAnimationFrame(tick)

// };

// { "modelVersion": 2, "piskel": { "name": "New Piskel", "description": "", "fps": 12, "height": 5, "width": 5, "layers": ["{\"name\":\"Layer 1\",\"opacity\":1,\"frameCount\":1,\"chunks\":[{\"layout\":[[0]],\"base64PNG\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAATElEQVQYV2NkgAIHK6v/B44dYwRxwcSxqqr/cUuXMiyKjmawamtjZISqYHCwsmI4cOwYmGZcsv/Q/zWbNjPsnjmVwTU9myHEzxe7IADAGSUB87UdmAAAAABJRU5ErkJggg==\"}]}"], "hiddenFrames": [""] }