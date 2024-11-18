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
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.keyA = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.A);
        this.keyD = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.D);
        this.keyW = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W);
        this.keyS = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.S);
        scene.input.keyboard.on('keydown-A', () => {
          this.setTexture('PlayerLeft');
          this.direction = Direction.Left;
        });
        scene.input.keyboard.on('keydown-D', () => {
          this.setTexture('PlayerRight');
          this.direction = Direction.Right;
        });
        scene.input.keyboard.on('keydown-W', () => {
          this.setTexture('PlayerUp');
          this.direction = Direction.Up;
        });
        scene.input.keyboard.on('keydown-S', () => {
          this.setTexture('PlayerDown');
          this.direction = Direction.Down;
        });
      }
    }

    update() {
      if (this.keyD.isDown) {
        this.x += 2; // Move the player to the right
      }
      if (this.keyA.isDown) {
        this.x -= 2; // Move the player to the left
      }
      if (this.keyW.isDown) {
        this.y -= 2; // Move the player up
      }
      if (this.keyS.isDown) {
        this.y += 2; // Move the player down
      }
    }
}