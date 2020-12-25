import BaseTetramino from "@/tetraminos/BaseTetramino";

let hero = class Hero extends BaseTetramino{
  shape = {
    color: '#ffffff',
    structure: [
      [
        [1, 1, 1, 1]
      ],
      [
        [1], [1], [1], [1]
      ]
    ]
  }
}

export default hero;
