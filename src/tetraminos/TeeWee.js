import BaseTetramino from "@/tetraminos/BaseTetramino";

let teeWee = class TeeWee extends BaseTetramino{
  shape = {
    color: '#ff4141',
    structure: [
      [
        [0, 1, 0],
        [1, 1, 1]
      ],
      [
        [1, 0],
        [1, 1],
        [1, 0]
      ],
      [
        [1, 1, 1],
        [0, 1, 0]
      ],
      [
        [0, 1],
        [1, 1],
        [0, 1]
      ],
    ]
  }
}

export default teeWee;
