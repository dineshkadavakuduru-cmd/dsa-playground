"use client";

import "../_lib/react-polyfill";
import { Canvas, useFrame } from "@react-three/fiber";
import { Grid, Html, Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { CameraPreset, SceneEdge, SceneNode, StepFrame, StructureKind, Vec3 } from "../_lib/structures";

type StageCanvasProps = {
  frame: StepFrame;
  kind: StructureKind;
};

type PositionMap = Record<string, Vec3>;

const NODE_ACTIVE = "#e4f222";
const NODE_PATH = "#02b8cc";
const NODE_VISITED = "#27a644";
const NODE_REST = "#d0d6e0";
const EDGE_REST = "#383b3f";
const EDGE_ACTIVE = "#e4f222";
const EDGE_PATH = "#02b8cc";

export function StageCanvas({ frame, kind }: StageCanvasProps) {
  return (
    <Canvas className="h-full w-full" frameloop="always" camera={{ position: [0, 2.2, 10.5], fov: 40 }}>
      <color attach="background" args={["#08090a"]} />
      <ambientLight intensity={0.72} />
      <directionalLight position={[5, 8, 6]} intensity={1.35} color="#ffffff" />
      <pointLight position={[-4, 3, 4]} intensity={0.65} color="#e4f222" distance={12} />
      <Grid
        infiniteGrid
        fadeDistance={24}
        sectionColor="#23252a"
        cellColor="#161718"
        sectionThickness={1.2}
        cellThickness={0.55}
      />
      <StageRig frame={frame} kind={kind} />
      <OrbitControls makeDefault enablePan={false} minDistance={6} maxDistance={16} dampingFactor={0.08} />
    </Canvas>
  );
}

function StageRig({ frame, kind }: { frame: StepFrame; kind: StructureKind }) {
  const group = useRef<THREE.Group>(null);
  const rotation = cameraRotation(frame.camera, kind);

  useFrame((_, delta) => {
    if (!group.current) return;
    const ease = 1 - Math.pow(0.001, delta);
    group.current.rotation.x += (rotation.x - group.current.rotation.x) * ease;
    group.current.rotation.y += (rotation.y - group.current.rotation.y) * ease;
    group.current.rotation.z += (rotation.z - group.current.rotation.z) * ease;
  });

  const positions = useMemo(
    () => Object.fromEntries(frame.nodes.map((node) => [node.id, node.position])),
    [frame.nodes],
  );

  return (
    <group ref={group}>
      {frame.edges.map((edge) => (
        <SceneEdge key={edge.id} edge={edge} positions={positions} />
      ))}
      {frame.nodes.map((node) => (
        <SceneNode key={node.id} node={node} />
      ))}
      {kind === "heap" && <StageAxisLabels />}
    </group>
  );
}

function cameraRotation(preset: CameraPreset | undefined, kind: StructureKind) {
  if (preset === "rotate-left") return { x: -0.08, y: -0.42, z: 0 };
  if (preset === "rotate-right") return { x: -0.08, y: 0.42, z: 0 };
  if (preset === "graph" || kind === "graph") return { x: -0.16, y: 0.18, z: 0 };
  return { x: -0.08, y: 0, z: 0 };
}

function SceneNode({ node }: { node: SceneNode }) {
  const group = useRef<THREE.Group>(null);
  const target = useMemo(() => new THREE.Vector3(node.position.x, node.position.y, node.position.z), [node.position]);
  const scale = useRef<THREE.Vector3>(new THREE.Vector3(1, 1, 1));
  const targetScale = useMemo(() => new THREE.Vector3(node.active ? 1.14 : 1, node.active ? 1.14 : 1, node.active ? 1.14 : 1), [node.active]);
  const color = node.active ? NODE_ACTIVE : node.path ? NODE_PATH : node.visited ? NODE_VISITED : NODE_REST;
  const emissive = node.active ? NODE_ACTIVE : "#000000";

  useFrame((_, delta) => {
    if (!group.current) return;
    const ease = 1 - Math.pow(0.001, delta);
    group.current.position.lerp(target, ease);
    scale.current.lerp(targetScale, ease);
    group.current.scale.copy(scale.current);
  });

  return (
    <group ref={group} position={target}>
      {node.shape === "box" ? (
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.18, 1.18, 1.18]} />
          <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={node.active ? 0.24 : 0} roughness={0.46} metalness={0.18} />
        </mesh>
      ) : (
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.68, 40, 40]} />
          <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={node.active ? 0.24 : 0} roughness={0.34} metalness={0.22} />
        </mesh>
      )}
      <Html center distanceFactor={10} style={{ pointerEvents: "none" }}>
        <div className={`node-label ${node.active ? "node-label-active" : ""}`}>
          <span>{node.label}</span>
          {node.detail && <small>{node.detail}</small>}
        </div>
      </Html>
    </group>
  );
}

function SceneEdge({ edge, positions }: { edge: SceneEdge; positions: PositionMap }) {
  const start = positions[edge.from] ?? { x: 0, y: 0, z: 0 };
  const end = positions[edge.to] ?? { x: 0, y: 0, z: 0 };
  const color = edge.active ? EDGE_ACTIVE : edge.path ? EDGE_PATH : EDGE_REST;
  return (
    <Line
      points={[
        [start.x, start.y, start.z],
        [end.x, end.y, end.z],
      ]}
      color={color}
      lineWidth={edge.active || edge.path ? 3 : 1.2}
      transparent
      opacity={edge.active || edge.path ? 0.96 : 0.58}
    />
  );
}

function StageAxisLabels() {
  return (
    <Html position={[0, -4.7, 0]} center distanceFactor={10} style={{ pointerEvents: "none" }}>
      <div className="axis-label">ARRAY INDEX →</div>
    </Html>
  );
}
