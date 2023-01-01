import { DisplayMode, Engine, ExcaliburGraphicsContext, Font, FontUnit, ImageSource, Label, Loader, SpriteSheet, TileMap, vec, Vector } from "excalibur";
import { Player } from "./player";
import { Projectile } from "./projectile";
import { Resources } from "./resources";
import { debugValues } from "./utils/debugValues";
import './style.css';

class Game extends Engine {
  constructor() {
    super({ width: 1280, height: 720, canvasElementId: 'game', displayMode: DisplayMode.FitContainer });
  }

  private readonly player = new Player();
  public readonly label = new Label({
    text: '',
    pos: vec(10, 50),
    font: new Font({
      family: 'impact',
      size: 24,
      unit: FontUnit.Px
    })
  });

  initialize() {
    game.currentScene.camera.strategy.lockToActor(this.player);

    // Create a sprite sheet
    const rougeLikeSpriteSheet = SpriteSheet.fromImageSource({
      image: Resources.TerrainTiles,
      grid: {
        rows: 4,
        columns: 10,
        spriteHeight: 64,
        spriteWidth: 64
      },
      spacing: {
        margin: {
          x: 0,
          y: 0
        }
      }
    });

    // Create a tilemap
    const tilemap = new TileMap({
      rows: 100,
      columns: 100,
      tileWidth: 64,
      tileHeight: 64,
      pos: vec(-400, -600)
    });

    tilemap.z = -1;

    // loop through tilemap cells
    for (let cell of tilemap.tiles) {
      const sprite = rougeLikeSpriteSheet.getSprite(0, 3);
      if (sprite) {
        cell.addGraphic(sprite);
      }
    }

    this.currentScene.add(tilemap);

    this.add(this.player);
    this.add(this.label);

    const loader = new Loader([Resources.Sword, Resources.Tank, Resources.Turret, Resources.TerrainTiles]);
    this.start(loader);

    this.input.pointers.on('down', () => {
      this.add(new Projectile({ pos: this.player.turret.getGlobalPos(), vel: Vector.fromAngle(this.player.turret.getGlobalRotation()).scale(500) }));
    });
  }

  onPostDraw(_ctx: ExcaliburGraphicsContext, _delta: number): void {
    document.getElementById('debug')!.innerText = JSON.stringify(debugValues, undefined, 4);
    debugValues['camera pos (screen)'] = this.worldToScreenCoordinates(this.currentScene.camera.pos).toString(1);
    debugValues['camera pos (world)'] = this.currentScene.camera.pos.toString(1);
  }
}

export const game = new Game();
game.initialize();