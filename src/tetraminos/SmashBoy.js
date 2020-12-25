import BaseTetramino from "@/tetraminos/BaseTetramino";

let smashBoy = class SmashBoy extends BaseTetramino{
  shape = {
    color: '#217bff',
    structure: [
      [
        [1, 1],
        [1, 1]
      ]
    ]
  }
}

export default smashBoy;
