import {resolution, square} from "./sizes.js"

export default class FloorSprite {
  constructor({ position, speed, image, ctx }) {
    this.position = position;
    this.image = image;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      square * this.position.x,
      square * this.position.y
    );
  }
}
