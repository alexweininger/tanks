import { Actor, clamp, Color, DebugText, Engine, Input, LogLevel, Ray, Rectangle, ScreenElement, Text, vec, Vector } from "excalibur";
import { Resources } from "./resources";
import { Turret } from "./turret";
import { debugValues } from "./utils/debugValues";
import { getMousePos } from "./utils/mouseUtils";

export class Player extends Actor {

  private tankRotation: number = -0.5 * Math.PI;
  private tankThrottle: number = 0;

  public turret: Turret = new Turret(this);

  constructor() {
    super({
      pos: vec(400, 300),
      // width: 100,
      // height: 100,
      // scale: vec(2, 2)
    });
  }

  onInitialize() {
    const tankSprite = Resources.Tank.toSprite();
    tankSprite.rotation = Math.PI  / 2;
    this.graphics.add('tank', tankSprite);
    this.graphics.show('tank');
    this.addChild(this.turret);
  }

  public update(engine: Engine, delta: number): void {

    // throttle

    if (
      engine.input.keyboard.isHeld(Input.Keys.W) ||
      engine.input.keyboard.isHeld(Input.Keys.Up)
    ) {
      this.tankThrottle += 1;
    } else if (
      engine.input.keyboard.isHeld(Input.Keys.S) ||
      engine.input.keyboard.isHeld(Input.Keys.Down)
    ) {
      this.tankThrottle -= 1;
    } else {
      this.tankThrottle += this.tankThrottle * -0.05;
    }

    this.tankThrottle = clamp(this.tankThrottle, -50, 100);

    // rotation

    if (
      engine.input.keyboard.isHeld(Input.Keys.A) ||
      engine.input.keyboard.isHeld(Input.Keys.Left)
    ) {
      this.tankRotation -= 0.015;
    }

    if (
      engine.input.keyboard.isHeld(Input.Keys.D) ||
      engine.input.keyboard.isHeld(Input.Keys.Right)
    ) {
      this.tankRotation += 0.015;
    }

    let vector1 = new Vector(this.tankThrottle / 100, 0);
    vector1 = vector1.rotate(this.tankRotation);


    const newPos = this.pos.clone().add(vector1)

    this.rotation = this.tankRotation;
    this.pos = newPos;

      debugValues['mouse'] = getMousePos(engine).toString(1);
      debugValues['pos'] = newPos.toString(1);
  }
}
