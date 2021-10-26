import {
    Projectile,
    Rect
} from "./Objects.js";

const paddle = new Image();
paddle.src = "../res/paddle.png";
const brick_img = new Image();
brick_img.src = "../res/box.jpg";
const sky = new Image();
sky.src = "../res/sky.jpg";

let Game = {
    width: 350,
    height: 400,
    bricks: [],
    cols: 3,
    rows: 4,
    brick_width: 0,
    brick_height: 0,
    c: null,
    breaker: null,
    ball: null,
    mouse_control: {
        x: undefined,
        y: undefined
    },
    buffer: null,
    init: function (_el) {
        this.c = document.querySelector(_el);
        this.buffer = this.c.getContext("2d");
        this.c.width = this.width;
        this.c.height = this.height;
        this.brick_width = this.width / this.rows - 14;
        this.brick_height = 32;
        this.bricks = [];
        this.breaker = new Rect({
            x: Game.width / 2 - 45,
            y: Game.height - 40,
            w: 90,
            h: 20,
            color: "white",
            type: "sprite",
            image: paddle
        });
        this.ball = new Projectile({
            x: Game.width / 2 - 45,
            y: Game.height - 50,
            r: 10,
            color: "blue"
        });
        for (var col = 0; col < this.cols; col++) {
            this.bricks[col] = [];
            for (var row = 0; row < this.rows; row++) {
                const brick = new Rect({
                    x: 14 + row * (Game.brick_width + 10),
                    y: 15 + col * (Game.brick_height + 5),
                    w: Game.brick_width,
                    h: Game.brick_height,
                    color: "white",
                    type: "sprite",
                    image: brick_img
                });
                this.bricks[col][row] = brick;
            }
        }
        return this.bricks;
    },
    clear: function () {
        this.buffer.drawImage(sky, 0, 0, this.width, this.height);
    },
    animation_start: function () {
        this.clear();
        this.update_frame();
        window.requestAnimationFrame(this.animation_start.bind(this));
    },
    update_frame: function () {

        this.bricks.forEach((cols, cind) => {
            cols.forEach((brick, ind) => {
                brick.draw(Game.buffer);
                // Bricks
                if (this.ball.collideWith(brick, 5)) {
                    
                    Game.bricks[cind].splice(ind, 1);
                    this.ball.vy = -this.ball.vy;
                }
            });
        });
        this.breaker.x = this.mouse_control.x - this.breaker.w / 2;
        this.breaker.draw(Game.buffer);
        
        this.buffer.shadowColor = "rgba(0, 5, 0, 0.5)";
        this.buffer.shadowBlur = 12;
        this.ball.draw(Game.buffer);
        this.buffer.shadowBlur = 0;

        // Wall
        if (this.ball.x - this.ball.r <= 0 || this.ball.x + this.ball.r >= this.width) {
            this.ball.vx = -this.ball.vx;
        }
        if (this.ball.y - this.ball.r <= 0) {
            this.ball.vy = -this.ball.vy;
        }
        if(this.ball.y >= this.height + 20) {
            Game = null;
            document.location.reload();
        }

        // Player
        if (
            this.ball.x + this.ball.r >= this.breaker.x &&
            this.ball.x <= this.breaker.x + this.breaker.w &&
            this.ball.y + this.ball.r >= this.breaker.y &&
            this.ball.y <= this.breaker.y + this.breaker.h
        ) {

            this.ball.vy = -this.ball.vy;

        }

    },
    updateMouse: function (_e) {
        Game.mouse_control.x = _e.clientX - _e.target.getBoundingClientRect().left;
        Game.mouse_control.y = _e.clientY - _e.target.getBoundingClientRect().top;
    },
    updateMobMouse: function (_e) {
        Game.mouse_control.x = _e.touches[0].clientX - _e.target.getBoundingClientRect().left;
        Game.mouse_control.y = _e.touches[0].clientY - _e.target.getBoundingClientRect().top;
    }
};

const bricks = Game.init("#game_scene");
Game.animation_start();
Game.c.addEventListener("mousemove", Game.updateMouse);
Game.c.addEventListener("touchmove", Game.updateMobMouse);