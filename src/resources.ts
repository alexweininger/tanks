import { ImageSource } from "excalibur";
import sword from "./images/sword.png"; // for parcelv2 this is configured in the .parcelrc
import tank from "./images/tankBody_green.png"; // for parcelv2 this is configured in the .parcelrc
import turret from "./images/tankGreen_barrel2.png"; // for parcelv2 this is configured in the .parcelrc
import terrainTiles from "./images/terrainTiles_default.png";

let Resources = {
  Sword: new ImageSource(sword),
  Tank: new ImageSource(tank),
  Turret: new ImageSource(turret),
  TerrainTiles: new ImageSource(terrainTiles),
};

export { Resources };