import { SceneTransitionData } from '../data/globalstate';
import { Level } from './AbstractLevel';

export class Level1 extends Level
{
  level2TriggerArea: Phaser.GameObjects.Zone;

  constructor ()
  {
    const level = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1161, 1162, 0, 0, 0, 0, 0, 0, 0, 0],
      [1201, 1202, 0, 0, 0, 0, 0, 0, 0, 0],
      [1241, 1242, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 242, 243, 244, 0, 0, 0, 0, 0, 0],
      [0, 282, 283, 284, 0, 0, 0, 0, 0, 0],
      [0, 322, 323, 324, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    super('Level1', level);
  }

  init(data: SceneTransitionData) {
    this.baseInit(data);
  }

  create ()
  {
    this.baseCreate();

    // Define the trigger area for level 2
    this.level2TriggerArea = this.add.zone(0, 110, 32, 40);
    this.physics.world.enable(this.level2TriggerArea);
    (this.level2TriggerArea.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    (this.level2TriggerArea.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    this.physics.add.overlap(this.player, this.level2TriggerArea, this.enterLevel2, undefined, this);
  } 
   
  update() {
    this.baseUpdate();
  }

  private enterLevel2() {
    this.scene.start('Level2', new SceneTransitionData(280, this.player.y, this.player.health()));
  }
}
