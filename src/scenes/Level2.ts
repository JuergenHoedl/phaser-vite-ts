import { SceneTransitionData } from '../data/globalstate';
import { Level } from './AbstractLevel';

export class Level2 extends Level
{
  level1TriggerArea: Phaser.GameObjects.Zone;

  constructor ()
  {
    super('Level2', 'level2');
  }

  init(data: SceneTransitionData) {
    this.baseInit(data);
  }

  create ()
  {
    this.baseCreate();

    // Define the trigger area for level 1
    this.level1TriggerArea = this.add.zone(736, 110, 32, 40);
    this.physics.world.enable(this.level1TriggerArea);
    (this.level1TriggerArea.body as Phaser.Physics.Arcade.Body).setAllowGravity(false);
    (this.level1TriggerArea.body as Phaser.Physics.Arcade.Body).setImmovable(true);
    this.physics.add.overlap(this.player, this.level1TriggerArea, this.enterLevel1, undefined, this);
  } 
   
  update() {
    this.baseUpdate();
  }

  enterLevel1() {
    this.scene.start('Level1', new SceneTransitionData(40, this.player.y, this.player.health()));
  }
}
