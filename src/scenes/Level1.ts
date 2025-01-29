import { Scene } from 'phaser';
import { Player } from '../Player';

export class Level1 extends Scene
{
  camera: Phaser.Cameras.Scene2D.Camera;
  player: Player;
  worldBoundsGraphics: Phaser.GameObjects.Graphics;

  constructor ()
  {
    super('Level1');
  }

  create ()
  {
    const worldWidth = 320;
    const worldHeight = 320;
    // this.cameras.main.setBackgroundColor('#333333');
    // Create the background world
    const level = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 242, 243, 244, 0, 0, 0, 0, 0, 0],
        [0, 282, 283, 284, 0, 0, 0, 0, 0, 0],
        [0, 322, 323, 324, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      const tilemap = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
      const tiles = tilemap.addTilesetImage('world');
      if(tiles){
        tilemap.createLayer(0, tiles, 0, 0);
      }
    // Create player
    this.player = new Player(this, worldWidth/2, worldHeight/2);
    this.physics.add.existing(this.player);
    if(this.player.body != null && 'setCollideWorldBounds' in this.player.body){
        this.player.body.setCollideWorldBounds(true);
    }
    this.cameras.main.startFollow(this.player, true);

    // Set and visualize world bounds
    this.physics.world.setBounds(0, 0, worldWidth, worldHeight);
    this.worldBoundsGraphics = this.add.graphics();
    this.worldBoundsGraphics.lineStyle(2, 0xff0000, 1);
    this.worldBoundsGraphics.strokeRect(0, 0, worldWidth, worldHeight);
  } 
   
  update() {
    this.player.update();
  }
}
