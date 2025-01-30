import { Scene } from 'phaser';
import { Player } from '../objects/Player';
import { SceneTransitionData } from '../data/globalstate';

export class Level extends Scene
{
  sceneTransitionData: SceneTransitionData;
  camera: Phaser.Cameras.Scene2D.Camera;
  player: Player;
  worldBoundsGraphics: Phaser.GameObjects.Graphics;
  level: number[][];
  worldWidth: number;
  worldHeight: number;
  private tileWidth = 32;

  constructor (levelName: string, level: number[][])
  {
    super(levelName);
    this.worldWidth = level[0].length * this.tileWidth;
    this.worldHeight = level.length * this.tileWidth;
    this.level = level;
  }

  baseInit(data: SceneTransitionData) {
    // Default spawn position if no data is passed
    if (!data || !data.spawn) {
      data = new SceneTransitionData(this.worldWidth / 2, this.worldHeight / 2, 100);
    }
    this.sceneTransitionData = data;
  }

  baseCreate ()
  {
    this.cameras.main.setBackgroundColor('#333333');
    // Create the background world
    const tilemap = this.make.tilemap({ data: this.level, tileWidth: this.tileWidth, tileHeight: this.tileWidth });
    const tiles = tilemap.addTilesetImage('world');
    if(tiles){
      tilemap.createLayer(0, tiles, 0, 0);
    }
    // Add player to the scene
    this.player = new Player(this, this.sceneTransitionData.spawn.spawnX, this.sceneTransitionData.spawn.spawnY, this.sceneTransitionData.health);
    this.physics.add.existing(this.player);
    if(this.player.body != null && 'setCollideWorldBounds' in this.player.body){
        this.player.body.setCollideWorldBounds(true);
    }
    this.cameras.main.startFollow(this.player, true);

    // Set and visualize world bounds
    this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.worldBoundsGraphics = this.add.graphics();
    this.worldBoundsGraphics.lineStyle(2, 0xff0000, 1);
    this.worldBoundsGraphics.strokeRect(0, 0, this.worldWidth, this.worldHeight);
  } 
   
  baseUpdate() {
    this.player.update();
  }
}
