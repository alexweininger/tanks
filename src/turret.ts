import { Actor, clamp, Color, DebugText, Engine, ExcaliburGraphicsContext, Font, FontUnit, Input, Label, Line, LineSegment, Ray, RotationType, toDegrees, toRadians, vec, Vector } from "excalibur";
import { Player } from "./player";
import { Resources } from "./resources";
import { debugValues } from "./utils/debugValues";
import { getMousePos } from "./utils/mouseUtils";

interface TurretStats {
    angularAcceleration: number;
    maxAngularVelocity: number;
}

export class Turret extends Actor {
  constructor(private readonly tank: Player) {
    super({
      pos: vec(7, 0),
      anchor: vec(0, 0.5),
      // width: 100,
      // height: 100,
    });
  }

  stats: TurretStats = {
    angularAcceleration: 0.02,
    maxAngularVelocity: 1
  }

  onInitialize() {
    const turretSprite = Resources.Turret.toSprite();
    turretSprite.rotation = Math.PI / 2;
    this.graphics.add('turret', turretSprite);
    this.graphics.show('turret', {
      offset: vec(this.anchor.x + 5, this.anchor.y),
    });
  }

  public update(engine: Engine, delta: number): void {
    const globalRotation = this.getGlobalRotation();
    debugValues['cur angle'] = (toDegrees(globalRotation)).toFixed();

    const line = new LineSegment(getMousePos(engine), this.getGlobalPos());
    const targetAngle = line.dir().toAngle() + Math.PI;
    debugValues['targetAngle'] = toDegrees(targetAngle).toFixed();
    engine.graphicsContext.drawLine(engine.worldToScreenCoordinates(line.begin), engine.worldToScreenCoordinates(line.end), Color.LightGray, 2);

    const rotationVector = Vector.fromAngle(this.getGlobalRotation()).scale(50);
    
    let rotDiff = targetAngle - globalRotation;
    
    if (rotDiff > Math.PI) {
        rotDiff = rotDiff - 2 * Math.PI;
    } else if (rotDiff < -Math.PI) {
        rotDiff = rotDiff + 2 * Math.PI;
    }

    debugValues['target rotation delta'] = toDegrees(rotDiff).toFixed();

    // engine.graphicsContext.z = 1;
    engine.graphicsContext.drawLine(engine.worldToScreenCoordinates(this.center), rotationVector.add(engine.worldToScreenCoordinates(this.getGlobalPos())), Color.Green, 2);

    debugValues['turret pos'] = this.pos.toString(1);
    debugValues['tank pos'] = this.tank.pos.toString(1);
    debugValues['turret center'] = this.center.toString(1);


    // this.graphics.add.drawCircle(this.center, 50, Color.Rose);

    if (Math.abs(toDegrees(rotDiff)) > 1) { 
        if (rotDiff > 0) {
            this.angularVelocity += this.stats.angularAcceleration;
        }  else {
            this.angularVelocity -= this.stats.angularAcceleration;
        }
    } else {
        if (rotDiff > 0) {
            this.angularVelocity = this.stats.angularAcceleration;
        }  else {
            this.angularVelocity = -this.stats.angularAcceleration;
        }
        if (Math.abs(toDegrees(rotDiff)) < 1) {
            this.angularVelocity = 0;
        } 
    }



    this.angularVelocity = clamp(this.angularVelocity, -this.stats.maxAngularVelocity, this.stats.maxAngularVelocity);

    // works
    // this.rotation += rotDiff * 0.01;

    // this.actions.rotateTo(this.rotation + rotDiff, 50);
  }
}
