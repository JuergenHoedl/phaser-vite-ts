export class SceneTransitionData {
  spawn: {spawnX: number, spawnY: number};
  health: number; 

  constructor(spawnX: number, spawnY: number, health: number) {
    this.spawn = {spawnX, spawnY};
    this.health = health;
  }
}