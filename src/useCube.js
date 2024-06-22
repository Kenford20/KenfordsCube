import { useEffect, useState, useMemo } from "react";
import Cube from "cubejs/lib/cube"; // https://github.com/ldez/cubejs

// this array structure is for rendering the cube state as a grid layout
const defaultCubeState = [
  [
    [null, null, null, null, null, null, null, null, null],
    ["U1", "U2", "U3", "U4", "U5", "U6", "U7", "U8", "U9"],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ],
  [
    ["L1", "L2", "L3", "L4", "L5", "L6", "L7", "L8", "L9"],
    ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"],
    ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9"],
    ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
  ],
  [
    [null, null, null, null, null, null, null, null, null],
    ["D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ],
];

const useCube = () => {
  const [cubeState, setCubeState] = useState(defaultCubeState ?? []);
  const cube = useMemo(() => new Cube(), []);

  useEffect(() => {
    updateCube();
  }, []);

  const randomizeCube = () => {
    cube.randomize();
    updateCube();
  };

  const updateCube = () => {
    const updatedCube = [...cubeState];
    // process 6 faces of cube
    for (let i = 0; i <= 54; i += 9) {
      // stringified cube state ex: UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB
      const face = cube
        .asString()
        .slice(i, i + 9) // each face has the 9 cells, represented by a substring of above
        .split("")
        .map((char, i) => `${char}${i + 1}`);

      if (i === 0) updatedCube[0][1] = face; // top face
      if (i === 9) updatedCube[1][2] = face; // right face
      if (i === 18) updatedCube[1][1] = face; // front face
      if (i === 27) updatedCube[2][1] = face; // down face
      if (i === 36) updatedCube[1][0] = face; // left face
      if (i === 45) updatedCube[1][3] = face; // back face
    }
    setCubeState(updatedCube);
  };

  // type direction = U | D | L | R | F | B | [direction]' = reverse
  const rotateCube = (direction) => {
    cube.move(direction);
    updateCube();
  };

  return {
    cube,
    cubeState,
    cubeStringified: cube.asString(),
    rotateCube,
    randomizeCube,
  };
};

export { useCube };
