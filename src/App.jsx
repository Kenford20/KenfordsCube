import "./App.css";
import { useCube } from "./useCube";

function App() {
  const { cubeState, cubeStringified, rotateCube, randomizeCube } = useCube();

  return (
    <main id="app">
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div>
          <h1>Front View</h1>
          {/* pass in stringified cube state to query params of this url for image of cube */}
          <img
            src={`https://cube.rider.biz/visualcube.php?fmt=svg&size=300&view=trans&fd=${cubeStringified.toLowerCase()}`}
          />
        </div>
        <CubeActions rotateCube={rotateCube} />
        <div>
          <h1>Flipped View</h1>
          <img
            src={`https://cube.rider.biz/visualcube.php?fmt=svg&size=300&view=trans&r=y45x-215z180&fd=${cubeStringified.toLowerCase()}`}
          />
        </div>
      </div>
      <button onClick={randomizeCube}>Shuffle Cube</button>
      <CubeState cubeState={cubeState} />
    </main>
  );
}

// type cubeState = defaultCubeState ie [][][string | null]
function CubeState({ cubeState }) {
  return (
    <>
      <h1>Cube State</h1>
      <div id="cube-state">
        {cubeState.map((rows) =>
          rows.map((face, i) => <CubeRow key={`row${i + 1}`} cubeFace={face} />)
        )}
      </div>
    </>
  );
}

// type cubeFace = 'U[1-9]' | 'D[1-9]' | 'L[1-9]' | 'R[1-9]' | 'F[1-9]' | 'B[1-9]'
function CubeRow({ cubeFace }) {
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
      className={`cube-face ${
        cubeFace[0] ? getFaceClass(cubeFace[0]) : "empty-face"
      }`}
    >
      {cubeFace.map((cell, i) => (
        <span key={`cell${i + 1}`} className="cube-cell">
          {cell ?? ""}
        </span>
      ))}
    </section>
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

export default App;
