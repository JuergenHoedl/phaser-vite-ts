import { Scene } from 'phaser';
import { Player } from '../Player';
import { SceneTransitionData } from '../data/globalstate';

export class Level2 extends Scene
{
  sceneTransitionData: SceneTransitionData;
  camera: Phaser.Cameras.Scene2D.Camera;
  player: Player;
  worldBoundsGraphics: Phaser.GameObjects.Graphics;
  level1TriggerArea: Phaser.GameObjects.Zone;
  worldWidth = 320;
  worldHeight = 320;

  constructor ()
  {
    super('Level2');
  }

  init(data: SceneTransitionData) {
    // Default spawn position if no data is passed
    if (!data || !data.spawn) {
      data = new SceneTransitionData(this.worldWidth / 2, this.worldHeight / 2, 100);
    }
    this.sceneTransitionData = data;
  }

  create ()
  {
    this.cameras.main.setBackgroundColor('#333333');
    // Create the background world
    const level = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 1160, 1161],
        [0, 0, 0, 0, 0, 0, 0, 0, 1200, 1201],
        [0, 0, 0, 0, 0, 0, 0, 0, 1240, 1241],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 120, 121, 122, 0, 0, 0, 0, 0, 0],
        [0, 160, 161, 162, 0, 0, 0, 0, 0, 0],
        [0, 200, 201, 202, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      const tilemap = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
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

    // Define the trigger area for level 1
    this.level1TriggerArea = this.add.zone(this.worldWidth, 110, 32, 40);
    this.physics.world.enable(this.level1TriggerArea);
    (this.level1TriggerArea.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    (this.level1TriggerArea.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    this.physics.add.overlap(this.player, this.level1TriggerArea, this.enterLevel1, undefined, this);

    // Set and visualize world bounds
    this.physics.world.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.worldBoundsGraphics = this.add.graphics();
    this.worldBoundsGraphics.lineStyle(2, 0xff0000, 1);
    this.worldBoundsGraphics.strokeRect(0, 0, this.worldWidth, this.worldHeight);
  } 
   
  update() {
    this.player.update();
  }

  enterLevel1() {
    this.scene.start('Level1', new SceneTransitionData(40, this.player.y, this.player.health()));
  }
}
