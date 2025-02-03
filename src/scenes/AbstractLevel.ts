import { Scene } from 'phaser';
import { Player } from '../objects/Player';
import { SceneTransitionData } from '../data/globalstate';

export class Level extends Scene
{
  sceneTransitionData: SceneTransitionData;
  camera: Phaser.Cameras.Scene2D.Camera;
  player: Player;
  worldBoundsGraphics: Phaser.GameObjects.Graphics;
  level: string;

  constructor (levelName: string, level: string)
  {
    super(levelName);
    this.level = level;
  }

  baseInit(data: SceneTransitionData) {
    // Default spawn position if no data is passed
    if (!data || !data.spawn) {
      data = new SceneTransitionData(100, 100, 100);
    }
    this.sceneTransitionData = data;
  }

  baseCreate ()
  {
    this.cameras.main.setBackgroundColor('#333333');

    // Create the level:
    const map = this.make.tilemap({ key: this.level });
    const tileset = map.addTilesetImage('world', 'world');
    if (tileset) {
      map.createLayer('background', tileset, 0, 0);
      map.createLayer('ground', tileset, 0, 0);
    }

    // Add player to the scene
    this.player = new Player(this, this.sceneTransitionData.spawn.spawnX, this.sceneTransitionData.spawn.spawnY, this.sceneTransitionData.health);
    this.physics.add.existing(this.player);
    this.cameras.main.startFollow(this.player, true);

    // Add collision between the player and the level tiles
    if (tileset) {
      const backgroundLayer = map.getLayer('background')?.tilemapLayer;
      const groundLayer = map.getLayer('ground')?.tilemapLayer;
      if (backgroundLayer) {
        backgroundLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, backgroundLayer);
      }
      if (groundLayer) {
        groundLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, groundLayer);
      }
    }
  } 

  baseUpdate() {
    this.player.update();
  }
}
