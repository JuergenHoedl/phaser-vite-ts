import { Scene, GameObjects, Input } from 'phaser';

export enum Direction {
  Up,
  Down,
  Left,
  Right
}

export class Player extends GameObjects.Image {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    keyA: Input.Keyboard.Key;
    keyD: Input.Keyboard.Key;
    keyW: Input.Keyboard.Key;
    keyS: Input.Keyboard.Key;
    direction: Direction;

    constructor(scene: Scene, x: number, y: number) {
      super(scene, x, y, 'PlayerDown');
      scene.add.existing(this);
      this.setScale(2);
      this.direction = Direction.Down;

      if (scene.input.keyboard) {
        this.keyA = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.A);
        this.keyD = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.D);
        this.keyW = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W);
        this.keyS = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.S);
      }
    }

    update() {
      if(this.body != null && 'setVelocity' in this.body){
        this.body.setVelocity(0);
        if (this.keyW.isDown && !this.keyS.isDown) {
          this.body.setVelocityY(-1);
          this.setTexture('PlayerUp');
          this.direction = Direction.Up;
        }
        if (this.keyS.isDown && !this.keyW.isDown) {
          this.body.setVelocityY(1);
          this.setTexture('PlayerDown');
          this.direction = Direction.Down;
        }
        if (this.keyD.isDown && !this.keyA.isDown) {
          this.body.setVelocityX(1);
          this.setTexture('PlayerRight');
          this.direction = Direction.Right;
        }
        if (this.keyA.isDown && !this.keyD.isDown) {
          this.body.setVelocityX(-1);
          this.setTexture('PlayerLeft');
          this.direction = Direction.Left;
        }
        this.body.velocity.normalize().scale(100);
      }
    }
}