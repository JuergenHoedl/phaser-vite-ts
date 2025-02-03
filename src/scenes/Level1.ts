import { SceneTransitionData } from '../data/globalstate';
import { Level } from './AbstractLevel';

export class Level1 extends Level
{
  level2TriggerArea: Phaser.GameObjects.Zone;

  constructor ()
  {
    super('Level1', 'level1');
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
    this.scene.start('Level2', new SceneTransitionData(690, this.player.y, this.player.health()));
  }
}
