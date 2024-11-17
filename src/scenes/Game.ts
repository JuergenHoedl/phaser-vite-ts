import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    player: Phaser.GameObjects.Image;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    keyA: Phaser.Input.Keyboard.Key;
    keyD: Phaser.Input.Keyboard.Key;
    keyW: Phaser.Input.Keyboard.Key;
    keyS: Phaser.Input.Keyboard.Key;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor('#32a852');

        
        this.player = this.add.image(400, 300, 'PlayerRight'); // Initial image
        this.player.setScale(2);

        if (this.input.keyboard) {
            this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

            this.cursors = this.input.keyboard.createCursorKeys();
            this.input.keyboard.on('keydown-A', () => {
                this.player.setTexture('PlayerLeft');
            });
            this.input.keyboard.on('keydown-D', () => {
                this.player.setTexture('PlayerRight');
            });
            this.input.keyboard.on('keydown-W', () => {
                this.player.setTexture('PlayerUp');
            });
            this.input.keyboard.on('keydown-S', () => {
                this.player.setTexture('PlayerDown');
            });
        }
    }

    update() {
        if (this.keyD.isDown) {
            this.player.x += 5; // Move the player to the right
        }
        if (this.keyA.isDown) {
            this.player.x -= 5; // Move the player to the left
        }
        if (this.keyW.isDown) {
            this.player.y -= 5; // Move the player up
        }
        if (this.keyS.isDown) {
            this.player.y += 5; // Move the player down
        }
    }
}
