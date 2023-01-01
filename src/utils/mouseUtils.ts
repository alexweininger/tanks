import { Engine, Vector } from "excalibur";

export function getMousePos(engine: Engine): Vector {
    return engine.screenToWorldCoordinates(engine.input.pointers.primary.lastScreenPos);
}