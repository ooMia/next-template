"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useReducer, useRef, useState } from "react";

// ------------------------------ Case A ------------------------------

export function ClientComponentA() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <div>
        <h1>Hello!</h1>
        <span>Count: {count}</span>
        <br />
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </main>
  );
}

export const srcCaseA = `"use client";

import { useState } from "react";

export function ClientComponentA() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <div>
        <h1>Hello!</h1>
        <span>Count: {count}</span>
        <br />
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </main>
  );
}`;

export const treeCaseA = `{
  '$$typeof': Symbol(react.transitional.element),
  type: 'main',
  key: null,
  props: {
    children: {
      '$$typeof': Symbol(react.transitional.element),
      type: 'div',
      key: null,
      props: [Object],
      _owner: [Object],
      _store: {}
    }
  },
  _owner: {
    parent: { parent: [Object], type: 'div', owner: [Object], stack: null },
    type: {
      '$$typeof': Symbol(react.lazy),
      _payload: [Promise],
      _init: [Function: readChunk],
      _debugInfo: []
    },
    owner: {
      name: 'Chapter4_reconciliation',
      env: 'Server',
      key: null,
      owner: null,
      props: [Object]
    },
    stack: null
  },
  _store: {}
}`;

// ------------------------------ Case B ------------------------------

export function ClientComponentB() {
  const [count, setCount] = useState(0);

  console.log("[ClientComponentB] Render");

  useEffect(() => {
    console.log("[ClientComponentB] Mount");
    return () => console.log("[ClientComponentB] Unmount");
  }, []);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    console.log("[ClientComponentB] Increment");
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

export const srcCaseB = `"use client";

import { useState } from "react";

export function ClientComponentB() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}`;

// ------------------------------ Case C ------------------------------

function ExpensiveComponent() {
  const [isRendering, setIsRendering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current || !isRendering) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // core logic rendering 3D cube
    const updateRotationAndProjection = () => {
      type Vec3 = [number, number, number];
      type Vec3Index = number;
      type Face = [Vec3Index, Vec3Index, Vec3Index, Vec3Index];

      const vertices: Vec3[] = [
        [-1, -1, -1],
        [1, -1, -1],
        [1, 1, -1],
        [-1, 1, -1],
        [-1, -1, 1],
        [1, -1, 1],
        [1, 1, 1],
        [-1, 1, 1],
      ];

      const faces: Face[] = [
        [0, 1, 2, 3],
        [1, 5, 6, 2],
        [5, 4, 7, 6],
        [4, 0, 3, 7],
        [3, 2, 6, 7],
        [0, 4, 5, 1],
      ];

      const colors = [
        "#D32F2F",
        "#388E3C",
        "#1976D2",
        "#FBC02D",
        "#7B1FA2",
        "#0097A7",
      ];

      angle += 0.005;
      const sin = Math.sin(angle);
      const cos = Math.cos(angle);

      const projected = vertices.map(([x, y, z]) => {
        // rotate on x-axis
        const [x1, y1, z1] = [x, y * cos - z * sin, y * sin + z * cos];

        // rotate on y-axis
        const [x2, y2, z2] = [x1 * cos + z1 * sin, y1, -x1 * sin + z1 * cos];

        // scale and project
        const scale = 80;
        const projX = x2 * scale + canvas.width / 2;
        const projY = y2 * scale + canvas.height / 2;

        return { x: projX, y: projY, z: z2 };
      });

      // sort faces by average z of vertices
      const sortedFacesByDepth = [...faces].sort((faceA, faceB) => {
        const averageDepth = (face: Face) => {
          const totalDepth = face.reduce(
            (sum, vec3Index) => sum + projected[vec3Index].z,
            0,
          );
          return totalDepth / 4;
        };

        // ascending order: deep to shallow
        return averageDepth(faceA) - averageDepth(faceB);
      });

      // 면 그리기
      sortedFacesByDepth.forEach((face) => {
        ctx.beginPath();
        const firstVertex = projected[face[0]];
        ctx.moveTo(firstVertex.x, firstVertex.y);

        // route all vertices of the face from the 2nd vertex
        face.slice(1).forEach((vertexIndex) => {
          const { x, y } = projected[vertexIndex];
          ctx.lineTo(x, y);
        });

        ctx.closePath();
        ctx.fillStyle = colors[faces.indexOf(face)];
        ctx.strokeStyle = "#bfbbbb";
        ctx.lineWidth = 0;
        ctx.stroke();
        ctx.fill();
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateRotationAndProjection();
      animationRef.current = requestAnimationFrame(render);
    };

    // render changes angle of the cube
    let angle = 0;
    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRendering]);

  console.log("[ExpensiveComponent] Render");

  useEffect(() => {
    console.log("[ExpensiveComponent] Mount");

    if (canvasRef.current) {
      canvasRef.current.width = 300;
      canvasRef.current.height = 300;
    }
    setIsRendering(true);
    return () => {
      console.log("[ExpensiveComponent] Unmount");
      setIsRendering(false);
    };
  }, []);

  return (
    <div className="flex flex-col items-center m-4">
      <div className="mb-4">
        <canvas
          ref={canvasRef}
          className="bg-gray-100 border border-gray-300 rounded shadow-md"
        />
      </div>

      <p className="mt-4 text-gray-600 text-sm max-w-md text-center">
        Rotating a cube using 2D canvas
        <br />
        <Link
          href="https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Creating_3D_objects_using_WebGL"
          className="text-blue-500 underline"
        >
          can be done more efficiently with WebGL
        </Link>
      </p>
    </div>
  );
}

function reducer(
  state: {
    text: string;
    isValid: boolean;
  },
  action: { type: string; payload: string },
) {
  switch (action.type) {
    case "handleInput":
      return {
        text: action.payload,
        isValid: action.payload.length > 0,
      };
    default:
      throw new Error();
  }
}
const initialState = { text: "", isValid: false };

export function ClientComponentC() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "handleInput", payload: e.target.value });
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <ExpensiveComponent />
      <input
        value={state.text}
        onChange={handleChange}
        className="text-black"
      />
      <button disabled={!state.isValid}>Submit</button>
    </div>
  );
}

export const srcCaseC = `"use client";

import { ChangeEvent, useReducer } from "react";

function reducer(
  state: {
    text: string;
    isValid: boolean;
  },
  action: { type: string; payload: string },
) {
  switch (action.type) {
    case "handleInput":
      return {
        text: action.payload,
        isValid: action.payload.length > 0,
      };
    default:
      throw new Error();
  }
}
const initialState = { text: "", isValid: false };

export function ClientComponentC() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "handleInput", payload: e.target.value });
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <ExpensiveComponent />
      <input
        value={state.text}
        onChange={handleChange}
        className="text-black"
      />
      <button disabled={!state.isValid}>Submit</button>
    </div>
  );
}`;
