class GameObject {
    constructor(_x = 0, _y = 0, _w = 10, _h = 10) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
        this.r = 10;
        this.velocity = {
            x: 9,
            y: 9
        };
    }

    getWidth() {
        return this.w;
    }

    getHeight() {
        return this.h;
    }

    getCentreX() {
        return this.x + (this.getWidth() * 0.5);
    }

    getCentreY() {
        return this.y + (this.h * 0.5);
    }

    getRight() {
        return this.x + this.w;
    }

    getLeft() {
        return this.x;
    }

    getTop() {
        return this.y;
    }

    getBottom() {
        return this.y + this.h;
    }

    getDistX(_obj) {
        return Math.abs(this.x - _obj.x);
    }

    getDistY(_obj) {
        return Math.abs(this.y - _obj.y);
    }

    getAbsDistX(_obj) {
        return this.x - _obj.x;
    }

    getAbsDistY(_obj) {
        return this.y - _obj.y;
    }

    getAbsDistSimX(_x) {
        return this.x - _x;
    }

    getAbsDistSimY(_y) {
        return this.y - _y;
    }

    getDist(_obj) {
        return Math.sqrt(Math.pow(_obj.x - this.x, 2) + Math.pow(_obj.y - this.y, 2));
    }

    setPos(_x, _y) {
        this.x = _x,
            this.y = _y;
    }

    setDim(_w, _h) {
        this.w = _w,
            this.h = _h;
    }

    collideWith(_obj, _add = 0) {
        if (
            (this.getRight() - _add >= _obj.getLeft() &&
                this.getLeft() + _add <= _obj.getRight() &&
                this.getTop() - _add <= _obj.getBottom() &&
                this.getBottom() - _add >= _obj.getTop()
            )) {
            return true;
        }
        return false;
    }

    circCollideWith(_obj, _add = 0) {
        return this.getDist(_obj) <= _obj.r + this.r;
    }
}

class Rect extends GameObject {
    constructor(_opt) {
        super();
        this.color = _opt.color;
        this.sprite = _opt.image;
        this.health = 100;
        this.preferredType = _opt.type || "simple";
        this.x = _opt.x;
        this.y = _opt.y;
        
        this.h = _opt.h;
        this.w = _opt.w;

    }

    draw(_ctx) {
        if (this.preferredType === "sprite") {
            _ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
        } else {
            _ctx.fillStyle = this.color;
            _ctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }
}

class Projectile extends GameObject {
    constructor(_opt = {}) {
        super();
        this.color = _opt.color;
        this.r = _opt.r;
        this.x = _opt.x;
        this.y = _opt.y;
        this.sprite = _opt.image;
        this.vx = 2;
        this.vy = 2;
        this.preferredType = _opt.type || "simple";
    }

    draw(_ctx) {
        if (this.preferredType === "sprite") {
            _ctx.drawImage(this.sprite, this.x, this.y, this.r, this.r);
        } else {
            _ctx.fillStyle = this.color;
            _ctx.beginPath();
            _ctx.arc(this.x, this.y, this.r, Math.PI * 2, 0, false);
            _ctx.closePath();
            _ctx.fill();
        }

        this.x += this.vx;
        this.y -= this.vy;

        
    }
}


export {
    GameObject,
    Projectile,
    Rect
};