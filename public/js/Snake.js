const SQUARE_SIZE = 16;

export default class Snake {
    constructor(scene) {
        this.scene = scene;
        this.lastMoveTime = 0;
        this.moveInterval = 100;
        this.direction = Phaser.Math.Vector2.DOWN;
        this.body = [];
        this.body.push(
            this.scene.add.rectangle(
                this.scene.game.config.width / 2,
                this.scene.game.config.height / 2,
                SQUARE_SIZE,
                SQUARE_SIZE,
                0xff0000).setOrigin(0)); // head

        this.apple = this.scene.add.rectangle(0, 0, SQUARE_SIZE, SQUARE_SIZE, 0x00ff00).setOrigin(0);

        this.positionApple();

        scene.input.keyboard.on('keydown', e => { this.keydown(e) })
    }

    positionApple() {
        this.apple.x = Math.floor(Math.random() * this.scene.game.config.width / SQUARE_SIZE) * SQUARE_SIZE;
        this.apple.y = Math.floor(Math.random() * this.scene.game.config.height / SQUARE_SIZE) * SQUARE_SIZE;
    }

    keydown(event) {
        console.log(event);
        switch (event.keyCode) {
            case 37: // left
                if (this.direction !== Phaser.Math.Vector2.RIGHT)
                    this.direction = Phaser.Math.Vector2.LEFT;
                break;

            case 38: // up
                if (this.direction !== Phaser.Math.Vector2.DOWN)
                    this.direction = Phaser.Math.Vector2.UP;
                break;

            case 39: // right
                if (this.direction !== Phaser.Math.Vector2.LEFT)
                    this.direction = Phaser.Math.Vector2.RIGHT;
                break;

            case 40: // down
                if (this.direction !== Phaser.Math.Vector2.UP)
                    this.direction = Phaser.Math.Vector2.DOWN;
                break;

            default:
                break;

        }
    }

    update(time) {
        if (time >= this.lastMoveTime + this.moveInterval) {
            this.lastMoveTime = time;
            this.move()
        }
    }

    isSnakeDead() {
        var head = this.body[0];
        // go off screen
        if (head.x < 0 || // off to the left
            head.x >= this.scene.game.config.width || // off to the right
            this.body[0].y < 0 || // off top
            this.body[0].y >= this.scene.game.config.height) // off bottom
        {
            return true;
        }

        // eat own tail
        var tail = this.body.slice(1);
        // if (tail.filter(s => s.x === head.x && s.y === head.y).length > 0)
        if (tail.some(s => s.x === head.x && s.y === head.y)){
            return true;
        }
        return false;
    }

    move() {

        let x = this.body[0].x + this.direction.x * SQUARE_SIZE;
        let y = this.body[0].y + this.direction.y * SQUARE_SIZE;

        if (this.apple.x === x && this.apple.y === y) {
            this.body.push(this.scene.add.rectangle(0, 0, SQUARE_SIZE, SQUARE_SIZE, 0xffffff).setOrigin(0))
            this.positionApple();
        }

        for (let index = this.body.length - 1; index > 0; index--) {
            this.body[index].x = this.body[index - 1].x;
            this.body[index].y = this.body[index - 1].y;
        }

        this.body[0].x = x;
        this.body[0].y = y;

        if (this.isSnakeDead()) {
            this.scene.scene.restart();
        }
    }
}