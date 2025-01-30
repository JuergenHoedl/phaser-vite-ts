import { Scene, GameObjects } from 'phaser';

export class Healthbar {
  scene: Scene;
  bar: GameObjects.Graphics;
  value: number;
  maxValue: number;
  container: GameObjects.Container;
  text: GameObjects.Text;

  constructor(scene: Scene, maxValue: number, value: number) {
    this.scene = scene;
    this.value = value;
    this.maxValue = maxValue;
    this.bar = this.scene.add.graphics();
    this.text = this.scene.add.text(62, 16, `${this.value}/${this.maxValue}`, {
        fontSize: '12px',
        color: '#ffffff',
        align: 'center'
      }).setOrigin(0.5);
    
    // Create a container to hold the health bar
    this.container = this.scene.add.container(10, 10, [this.bar]);
    this.container.add(this.text);
    this.container.setScrollFactor(0); // Make it fixed on the screen

    this.draw();
  }  
  decrease(amount: number) {
    this.value = Math.max(0, this.value - amount);
    this.draw();
  }  
  increase(amount: number) {
    this.value = Math.min(this.maxValue, this.value + amount);
    this.draw();
  }  
  draw() {
    this.bar.clear();
    // Background
    this.bar.fillStyle(0x000000);
    this.bar.fillRect(10, 10, 104, 16);
    // Health bar
    this.bar.fillStyle(0xff0000);
    this.bar.fillRect(12, 12, 100 * (this.value / this.maxValue), 12);
    // Update the text
    this.text.setText(`${this.value}/${this.maxValue}`);
  }  
  setHealth(value: number) {
    this.value = value;
    this.draw();
  }
}