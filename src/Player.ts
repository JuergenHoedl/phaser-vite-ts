import { Scene, GameObjects, Input } from 'phaser';
import { Healthbar } from './ui/Healthbar';

export enum Direction {
  Up,
  Down,
  Left,
  Right
}

export class Player extends GameObjects.Image {
  private keyA: Input.Keyboard.Key;
  private keyD: Input.Keyboard.Key;
  private keyW: Input.Keyboard.Key;
  private keyS: Input.Keyboard.Key;
  private direction: Direction;
  // Player attributes
  private healthBar: Healthbar;
  // Attribute debugging: TODO: remove this
  private keyPlus: Input.Keyboard.Key;
  private keyMinus: Input.Keyboard.Key;

  constructor(scene: Scene, x: number, y: number, health: number) {
    super(scene, x, y, 'PlayerDown');
    scene.add.existing(this);
    this.setScale(2);
    this.direction = Direction.Down;
    if (scene.input.keyboard) {
      this.keyA = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.A);
      this.keyD = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.D);
      this.keyW = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W);
      this.keyS = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.S);
      // Attribute debugging: TODO: remove this
      this.keyPlus = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.M);
      this.keyMinus = scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.N);
      this.keyPlus.on('down', () => {
        this.heal(10);
      });
      this.keyMinus.on('down', () => {
        this.takeDamage(10);
      });
    }
    // Player attributes
    this.healthBar = new Healthbar(scene, 100, health);
  }

  takeDamage(amount: number) {
    this.healthBar.setHealth(Math.max(0, this.healthBar.value - amount));
  }

  heal(amount: number) {
    this.healthBar.setHealth(Math.min(this.healthBar.maxValue, this.healthBar.value + amount));
  }

  health() : number {
    return this.healthBar.value;
  }

  maxHealth() : number {
    return this.healthBar.maxValue;
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