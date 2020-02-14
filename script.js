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
        // console.log(gameSize);

        const titleSpace = $("#space-layer")
            // all bodies in game

        this.bodies = createInvaders(this).concat(new Player(this, gameSize));

        const self = this;

        const shootSound = document.getElementById('#shoot-sound');
        // Game.shootSound.load();



        const tick = function() {
            self.update();
            self.draw(screen, gameSize);
            requestAnimationFrame(tick);
            // console.log('tick')

        };
        tick();
    };

    Game.prototype = {
        update: function() {
            var bodies = this.bodies;
            var notCollidingWithAnything = function(body1) {
                return (
                    bodies.filter(function(body2) {
                        return colliding(body1, body2);
                    }).length === 0
                );
            };

            this.bodies = this.bodies.filter(notCollidingWithAnything);

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
        },

        invadersBelow: function(invader) {
            return (
                this.bodies.filter(function(body) {
                    return (
                        body instanceof Invader &&
                        body.center.y > invader.center.y &&
                        body.center.x - invader.center.x < invader.size.x
                    );
                }).length > 0
            );
        }
    };

    var Bullet = function(center, velocity) {
        this.size = { x: 5, y: 5 };
        this.center = center;
        this.velocity = velocity;
    };

    // Prototype  = It is responsible for creating new instances and for defining the behaviour of instances.


    Bullet.prototype = {
        update: function() {
            this.center.x += this.velocity.x;
            this.center.y += this.velocity.y;
        }
    };

    var Invader = function(game, center) {
        this.game = game;
        this.size = { x: 25, y: 25 };
        this.center = center;
        this.patrolX = 0;
        this.speedX = 0.9;
    };
    //removed 'prototype'

    Invader.prototype = {
        update: function() {
            if (this.patrolX < 0 || this.patrolX > 40) {
                this.speedX = -this.speedX;
            }
            this.center.x += this.speedX;
            this.patrolX += this.speedX;

            if (Math.random() > 0.992 && !this.game.invadersBelow(this)) {
                var bullet = new Bullet({ x: this.center.x, y: this.center.y + this.size.y / 2 + 4 },

                    { x: Math.random() - 0.5, y: 2 }
                );
                this.game.addBody(bullet);
            }
        }
    };

    var createInvaders = function(game) {
        var invaders = [];
        for (var i = 0; i < 24; i++) {
            var x = 30 + (i % 8) * 42;
            var y = 30 + (i % 3) * 42;
            invaders.push(new Invader(game, { x: x, y: y }));
        }
        return invaders;
    };

    var printMessages = function(array) {
        if (array.length == 0) {
            let title = document.createElement('div');
            title.classList.add('title')

        }

    }

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

            //left /rightmovement 
            if (this.keyboarder.isDown(this.keyboarder.KEYS.LEFT)) {
                if (this.center.x >= 16) {
                    this.center.x -= 4
                }

            } else if (this.keyboarder.isDown(this.keyboarder.KEYS.RIGHT)) {
                if (this.center.x <= 400 - 16) {
                    this.center.x += 4
                }

            }

            if (this.keyboarder.isDown(this.keyboarder.KEYS.UP)) {
                if (this.center.y >= 216) {
                    this.center.y -= 4
                }
            } else if (this.keyboarder.isDown(this.keyboarder.KEYS.DOWN)) {
                if (this.center.y <= 400 - 16) {
                    this.center.y += 4
                    console.log(this.center.y)
                }
            }


            if (this.keyboarder.isDown(this.keyboarder.KEYS.SPACE)) {
                var bullet = new Bullet({ x: this.center.x, y: this.center.y - this.size.x / 2 },

                    { x: 0, y: -6 }
                );
                this.game.addBody(bullet);
                // this.game.shootSound.play()

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

        this.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, SPACE: 32 };

    };



    var colliding = function(body1, body2) {
        return !(
            body1 === body2 ||
            body1.center.x + body1.size.y / 2 < body2.center.x - body2.size.x / 2 ||
            body1.center.y + body1.size.y / 2 < body2.center.y - body2.size.y / 2 ||
            body1.center.x - body1.size.y / 2 > body2.center.x + body2.size.x / 2 ||
            body1.center.y - body1.size.y / 2 > body2.center.y + body2.size.y / 2
        );
    };


    window.onload = function() {
        new Game("screen");
    };
})();