import { Scene } from 'phaser';
import { Player } from '../Player';

export class Game extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  player: Player;
     
  constructor ()
  {
    super('Game');
  }    
  create ()
  {
    this.cameras.main.setBackgroundColor('#32a852');
    this.player = new Player(this, 400, 300);
  }    
  update() {
    this.player.update();
  }
}
