import BaseTetramino from "@/tetraminos/BaseTetramino";

let clevelandZ = class ClevelandZ extends BaseTetramino{
  shape = {
    color: '#fff618',
    structure: [
      [
        [1, 1, 0],
        [0, 1, 1]
      ],
      [
        [0, 1],
        [1, 1],
        [1, 0]
      ]
    ]
  }
}

export default clevelandZ;
