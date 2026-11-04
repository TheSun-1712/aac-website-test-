import React, { useRef, useMemo, Suspense } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

// Dynamically import Three.js Canvas and OrbitControls with SSR turned off
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

// Individual model specs mapping with hero scale and orientation
const DOMAIN_MODELS = [
  {
    type: "glb",
    path: "/models/domains/web/laptop.glb",
    targetSize: 3.4,
    baseRot: [0.35, -0.4, 0],
  },
  {
    type: "glb",
    path: "/models/domains/app/iphone.glb",
    targetSize: 3.4,
    baseRot: [0.15, 0.45, 0],
  },
  {
    type: "fbx",
    path: "/models/domains/dl/neural.fbx",
    targetSize: 3.4,
    baseRot: [0.2, 0.4, 0],
  },
  {
    type: "fbx",
    path: "/models/domains/iot/moon_rover.fbx",
    targetSize: 3.4,
    baseRot: [0.25, -0.6, 0],
  },
  {
    type: "fbx",
    path: "/models/domains/mlops/CHATGPT.fbx",
    targetSize: 3.4,
    baseRot: [0.2, 0.35, 0],
  },
];

// Inner loader component for GLB models
function GLBModel({ path, targetSize, baseRot }) {
  const { useGLTF } = require("@react-three/drei");
  const { useFrame } = require("@react-three/fiber");
  const { scene } = useGLTF(path);
  const groupRef = useRef();

  const cloned = useMemo(() => {
    if (!scene) return null;
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = targetSize / maxDim;

    c.position.x = -center.x * scale;
    c.position.y = -center.y * scale;
    c.position.z = -center.z * scale;
    c.scale.setScalar(scale);
    return c;
  }, [scene, targetSize]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    }
  });

  if (!cloned) return null;

  return (
    <group ref={groupRef} rotation={baseRot}>
      <primitive object={cloned} />
    </group>
  );
}

// Inner loader component for FBX models
function FBXModel({ path, targetSize, baseRot }) {
  const { useFBX } = require("@react-three/drei");
  const { useFrame } = require("@react-three/fiber");
  const fbx = useFBX(path);
  const groupRef = useRef();

  const cloned = useMemo(() => {
    if (!fbx) return null;
    const c = fbx.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = targetSize / maxDim;

    c.position.x = -center.x * scale;
    c.position.y = -center.y * scale;
    c.position.z = -center.z * scale;
    c.scale.setScalar(scale);

    // Ensure materials respond to lighting
    c.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return c;
  }, [fbx, targetSize]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.08;
    }
  });

  if (!cloned) return null;

  return (
    <group ref={groupRef} rotation={baseRot}>
      <primitive object={cloned} />
    </group>
  );
}

// Fallback tech hologram while loading
function FallbackHologram({ color = "#E5A93C" }) {
  const meshRef = useRef();
  const { useFrame } = require("@react-three/fiber");

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.6;
      meshRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1.2, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.6}
      />
    </mesh>
  );
}

export default function GarcyDomainModel3D({
  domainIndex = 0,
  accentColor = "#E5A93C",
}) {
  const modelSpec = DOMAIN_MODELS[domainIndex % DOMAIN_MODELS.length];
  const { OrbitControls } = require("@react-three/drei");

  return (
    <div className="relative w-full h-full min-h-[340px] sm:min-h-[420px] flex items-center justify-center cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.3, 4.6], fov: 44 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "auto" }}
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[4, 6, 4]} intensity={2.0} color="#FFFFFF" />
        <directionalLight
          position={[-5, -2, -4]}
          intensity={1.4}
          color={accentColor}
        />
        <pointLight position={[0, 3, 3]} intensity={1.1} color="#FFFFFF" />

        <Suspense fallback={<FallbackHologram color={accentColor} />}>
          {modelSpec.type === "glb" ? (
            <GLBModel
              key={modelSpec.path}
              path={modelSpec.path}
              targetSize={modelSpec.targetSize}
              baseRot={modelSpec.baseRot}
            />
          ) : (
            <FBXModel
              key={modelSpec.path}
              path={modelSpec.path}
              targetSize={modelSpec.targetSize}
              baseRot={modelSpec.baseRot}
            />
          )}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

