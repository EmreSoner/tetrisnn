import BaseTetramino from "@/tetraminos/BaseTetramino";

let blueRicky = class BlueRicky extends BaseTetramino{
  shape =  {
    color: '#30b2ff',
    structure: [
      [
        [1, 0, 0],
        [1, 1, 1]
      ],
      [
        [1, 1],
        [1, 0],
        [1, 0]
      ],
      [
        [1, 1, 1],
        [0, 0, 1]
      ],
      [
        [0, 1],
        [0, 1],
        [1, 1]
      ],
    ]
  }
}

export default blueRicky;
