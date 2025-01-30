import { Scene, GameObjects, Input } from 'phaser';
import { Healthbar } from '../ui/Healthbar';

export enum Direction {
  Up,
  Down,
  Left,
  Right
}

export class Player extends GameObjects.Sprite {
  private keyA: Input.Keyboard.Key;
  private keyD: Input.Keyboard.Key;
  private keyW: Input.Keyboard.Key;
  private keyS: Input.Keyboard.Key;
  private direction: Direction;
  private isMoving: boolean;
  // Player attributes
  private healthBar: Healthbar;
  // Attribute debugging: TODO: remove this
  private keyPlus: Input.Keyboard.Key;
  private keyMinus: Input.Keyboard.Key;

  constructor(scene: Scene, x: number, y: number, health: number) {
    super(scene, x, y,'playerDown');
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
  
    this.createAnimations();

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
      this.isMoving = false;
      if (this.keyW.isDown && !this.keyS.isDown) {
        this.body.setVelocityY(-1);
        if ((!this.keyA.isDown && !this.keyD.isDown) || (this.keyA.isDown && this.keyD.isDown))
          this.play('walkUp', true);
        this.direction = Direction.Up;
        this.isMoving = true;
      }
      if (this.keyS.isDown && !this.keyW.isDown) {
        this.body.setVelocityY(1);
        if ((!this.keyA.isDown && !this.keyD.isDown) || (this.keyA.isDown && this.keyD.isDown))
          this.play('walkDown', true);
        this.direction = Direction.Down;
        this.isMoving = true;
      }
      if (this.keyD.isDown && !this.keyA.isDown) {
        this.body.setVelocityX(1);
        this.play('walkRight', true);
        this.direction = Direction.Right;
        this.isMoving = true;
      }
      if (this.keyA.isDown && !this.keyD.isDown) {
        this.body.setVelocityX(-1);
        this.play('walkLeft', true);
        this.direction = Direction.Left;
        this.isMoving = true;
      }
      this.body.velocity.normalize().scale(100);

      if (!this.isMoving) {
        this.anims.stop();
        if (this.anims.currentAnim) {
          const firstFrame = this.anims.currentAnim.frames[0].frame.name;
          this.setFrame(firstFrame);
        }
      }
    }
  }

  createAnimations() {
    // Define the player walk animations
    if (!this.scene.anims.exists('walkDown')) {
      this.scene.anims.create({
        key: 'walkDown',
        frames: this.anims.generateFrameNumbers('playerWalk', { start: 0, end: 3 }),
        frameRate: 6,
        repeat: -1
      });
    }
    
    if (!this.scene.anims.exists('walkRight')) {
      this.scene.anims.create({
        key: 'walkRight',
        frames: this.anims.generateFrameNumbers('playerWalk', { start: 4, end: 7 }),
        frameRate: 6,
        repeat: -1
      });
    }
    
    if (!this.scene.anims.exists('walkUp')) {
      this.scene.anims.create({
        key: 'walkUp',
        frames: this.anims.generateFrameNumbers('playerWalk', { start: 8, end: 11 }),
        frameRate: 6,
        repeat: -1
      });
    }
  
    if (!this.scene.anims.exists('walkLeft')) {
      this.scene.anims.create({
        key: 'walkLeft',
        frames: this.anims.generateFrameNumbers('playerWalk', { start: 12, end: 15 }),
        frameRate: 6,
        repeat: -1
      });
    }
  }
}