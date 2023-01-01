import { Actor, ActorArgs, Circle, Color, Engine, Rectangle, vec } from "excalibur";

export class Projectile extends Actor {

  constructor(config: ActorArgs) {
    super({
      pos: vec(150, 400),
      width: 100,
      height: 100,
      ...config,
    });
  }

  onInitialize() {
    this.graphics.add(new Circle({
        radius: 5,
        color: Color.DarkGray,
    }));
    // this.vel = vec(500, 0)
  }

  public update(engine: Engine, delta: number): void {
    //
  }
}
