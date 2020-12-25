import BaseTetramino from "@/tetraminos/BaseTetramino";

let rhodeIslandZ = class RhodeIslandZ extends BaseTetramino{
  shape = {
    color: '#d520ff',
    structure: [
      [
        [0, 1, 1],
        [1, 1, 0]
      ],
      [
        [1, 0],
        [1, 1],
        [0, 1]
      ]
    ]
  }
}

export default rhodeIslandZ;
