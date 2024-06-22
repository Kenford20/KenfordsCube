import { useEffect, useState, useMemo } from "react";
import "./App.css";
import Cube from "cubejs/lib/cube";

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

function App() {
  const [cubeState, setCubeState] = useState(defaultCubeState ?? []);
  const cube = useMemo(() => new Cube(), []);

  useEffect(() => {
    updateCube();
  }, []);

  const randomizeCube = () => {
    cube.randomize();
    updateCube();
  };

  // cubeAsString ex: UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB
  const updateCube = () => {
    const state = [...cubeState];
    // process string by 9s aka a face on the cube
    for (let i = 0; i <= 54; i += 9) {
      const face = cube
        .asString()
        .slice(i, i + 9)
        .split("")
        .map((char, i) => `${char}${i + 1}`);

      if (i === 0) state[0][1] = face; // top face
      if (i === 9) state[1][2] = face; // right face
      if (i === 18) state[1][1] = face; // front face
      if (i === 27) state[2][1] = face; // down face
      if (i === 36) state[1][0] = face; // left face
      if (i === 45) state[1][3] = face; // back face
    }
    setCubeState(state);
  };

  // type direction = U | D | L | R | F | B | [direction]' = reverse
  const rotateCube = (direction) => {
    cube.move(direction);
    updateCube();
  };

  return (
    <main id="app">
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div>
          <h1>Front View</h1>
          <img
            src={`https://cube.rider.biz/visualcube.php?fmt=svg&size=300&view=trans&fd=${cube
              .asString()
              .toLowerCase()}`}
          />
        </div>
        <CubeActions rotateCube={rotateCube} />
        <div>
          <h1>Flipped View</h1>
          <img
            src={`https://cube.rider.biz/visualcube.php?fmt=svg&size=300&view=trans&r=y45x-215&fd=${cube
              .asString()
              .toLowerCase()}`}
          />
        </div>
      </div>
      <button onClick={randomizeCube}>Shuffle Cube</button>
      <CubeState cubeState={cubeState} />
    </main>
  );
}

function CubeActions({ rotateCube }) {
  return (
    <div>
      <div>
        <button onClick={() => rotateCube("U'")}>{"<-"}</button>
        <span>Rotate Top</span>
        <button onClick={() => rotateCube("U")}>{"->"}</button>
      </div>
      <div>
        <button onClick={() => rotateCube("D'")}>{"<-"}</button>
        <span>Rotate Bottom</span>
        <button onClick={() => rotateCube("D")}>{"->"}</button>
      </div>
      <div>
        <button onClick={() => rotateCube("L'")}>{"<-"}</button>
        <span>Rotate Left</span>
        <button onClick={() => rotateCube("L")}>{"->"}</button>
      </div>
      <div>
        <button onClick={() => rotateCube("R'")}>{"<-"}</button>
        <span>Rotate Right</span>
        <button onClick={() => rotateCube("R")}>{"->"}</button>
      </div>
      <div>
        <button onClick={() => rotateCube("F'")}>{"<-"}</button>
        <span>Rotate Front</span>
        <button onClick={() => rotateCube("F")}>{"->"}</button>
      </div>
      <div>
        <button onClick={() => rotateCube("B'")}>{"<-"}</button>
        <span>Rotate Back</span>
        <button onClick={() => rotateCube("B")}>{"->"}</button>
      </div>
    </div>
  );
}

// type cubeState = defaultCubeState ie [][][string | null]
function CubeState({ cubeState }) {
  return (
    <>
      <h1>Cube State</h1>
      <div id="cube-state">
        {cubeState.map((rows) =>
          rows.map((face, i) => {
            return <CubeRow key={`row${i + 1}`} cubeFace={face} i={i} />;
          })
        )}
      </div>
    </>
  );
}

// type cubeFace = 'U[1-9]' | 'D[1-9]' | 'L[1-9]' | 'R[1-9]' | 'F[1-9]' | 'B[1-9]'
function CubeRow({ cubeFace, i }) {
  const getFaceClass = (face) => {
    switch (face[0]) {
      case "U":
        return "top";
      case "L":
        return "left";
      case "C":
        return "center";
      case "R":
        return "right";
      case "B":
        return "back";
      case "D":
        return "down";
      default:
        return "";
    }
  };

  return (
    <section
      key={`row${i + 1}`}
      className={`cube-face ${
        cubeFace[0] ? getFaceClass(cubeFace[0]) : "empty-face"
      }`}
    >
      {cubeFace.map((cell, j) => (
        <span key={`cell${j + 1}`} className="cube-cell">
          {cell ?? ""}
        </span>
      ))}
    </section>
  );
}

export default App;
