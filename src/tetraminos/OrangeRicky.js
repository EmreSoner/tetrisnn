import BaseTetramino from "@/tetraminos/BaseTetramino";

let orangeRicky = class OrangeRicky extends BaseTetramino{
  shape =  {
    color: '#e97514',
    structure: [
      [
        [0, 0, 1],
        [1, 1, 1]
      ],
      [
        [1, 0],
        [1, 0],
        [1, 1]
      ],
      [
        [1, 1, 1],
        [1, 0, 0]
      ],
      [
        [1, 1],
        [0, 1],
        [0, 1]
      ],
    ]
  }

}

export default orangeRicky;
