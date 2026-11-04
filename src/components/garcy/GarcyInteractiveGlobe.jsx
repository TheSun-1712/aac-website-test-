import React, { useRef, useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as THREE from "three";

// Dynamically import Three.js Canvas with SSR turned off
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

// 5 Geographic Domain Beacon Hubs
export const DOMAIN_LOCATIONS = [
  {
    domainIndex: 0,
    name: "Hyderabad (AAC GRIET HQ)",
    city: "HYDERABAD",
    lat: 17.52,
    lon: 78.36,
    domainCode: "01",
    label: "WEB DEVELOPMENT",
    accent: "#10B981", // Emerald
  },
  {
    domainIndex: 1,
    name: "Tokyo Mobile Innovation Hub",
    city: "TOKYO",
    lat: 35.67,
    lon: 139.65,
    domainCode: "02",
    label: "APP ARCHITECTURES",
    accent: "#06B6D4", // Cyan
  },
  {
    domainIndex: 2,
    name: "Silicon Valley AI Center",
    city: "SAN FRANCISCO",
    lat: 37.77,
    lon: -122.41,
    domainCode: "03",
    label: "DEEP LEARNING",
    accent: "#E5A93C", // Amber
  },
  {
    domainIndex: 3,
    name: "Zurich Robotics & Sensor Lab",
    city: "ZURICH",
    lat: 47.37,
    lon: 8.54,
    domainCode: "04",
    label: "INTERNET OF THINGS",
    accent: "#F97316", // Orange
  },
  {
    domainIndex: 4,
    name: "Singapore Cloud Infrastructure",
    city: "SINGAPORE",
    lat: 1.35,
    lon: 103.81,
    domainCode: "05",
    label: "MACHINE LEARNING OPS",
    accent: "#8B5CF6", // Violet
  },
];

// Convert spherical (lat, lon) to 3D Cartesian coordinates (x, y, z)
function latLonToVector3(lat, lon, radius = 2.0) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Concentric animated radar ping rings on active beacon pin
function RadarPingRings({ position, color }) {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const { useFrame } = require("@react-three/fiber");

  // Orient ring tangent to sphere surface
  const normal = useMemo(() => position.clone().normalize(), [position]);
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [normal]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p1 = (t * 0.9) % 1;
    const p2 = ((t * 0.9) + 0.5) % 1;

    if (ring1Ref.current) {
      ring1Ref.current.scale.setScalar(1 + p1 * 3.2);
      ring1Ref.current.material.opacity = Math.max(0, 1 - p1);
    }
    if (ring2Ref.current) {
      ring2Ref.current.scale.setScalar(1 + p2 * 3.2);
      ring2Ref.current.material.opacity = Math.max(0, 1 - p2);
    }
  });

  return (
    <group position={position} quaternion={quaternion}>
      {/* Central Beacon Bead */}
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      {/* Radar Ring 1 */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[0.07, 0.09, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
      {/* Radar Ring 2 */}
      <mesh ref={ring2Ref}>
        <ringGeometry args={[0.07, 0.09, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Inner 3D Globe with Earth Map and Beacons
function GlobeScene({
  activeDomain = 0,
  isDragging,
  dragOffset,
  onPinClick,
}) {
  const globeGroupRef = useRef();
  const { useFrame, useLoader } = require("@react-three/fiber");
  const { TextureLoader } = THREE;

  // Load continent texture map
  const earthTexture = useLoader(TextureLoader, "/images/globe_stylized_map.png");
  earthTexture.colorSpace = THREE.SRGBColorSpace;

  const activeHub = DOMAIN_LOCATIONS[activeDomain % DOMAIN_LOCATIONS.length];

  // Calculate target rotation to face active pin directly forward
  const targetAngles = useMemo(() => {
    const targetY = -((activeHub.lon * Math.PI) / 180) - Math.PI / 2;
    const targetX = ((activeHub.lat * Math.PI) / 180) * 0.35;
    return { x: targetX, y: targetY };
  }, [activeHub]);

  const currentRot = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!globeGroupRef.current) return;

    if (!isDragging) {
      // Smooth spherical damping slerp toward active hub
      const diffY = targetAngles.y - currentRot.current.y;
      const diffX = targetAngles.x - currentRot.current.x;

      // Wrap-around shortest arc for Y
      const shortestDiffY = Math.atan2(Math.sin(diffY), Math.cos(diffY));

      currentRot.current.y += shortestDiffY * Math.min(1, delta * 3.6);
      currentRot.current.x += diffX * Math.min(1, delta * 3.6);
    } else {
      currentRot.current.y += dragOffset.current.x * 0.008;
      currentRot.current.x += dragOffset.current.y * 0.005;
      dragOffset.current = { x: 0, y: 0 };
    }

    globeGroupRef.current.rotation.y = currentRot.current.y;
    globeGroupRef.current.rotation.x = currentRot.current.x;
  });

  return (
    <group ref={globeGroupRef}>
      {/* 1. Main Globe Sphere */}
      <mesh>
        <sphereGeometry args={[2.0, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.65}
          metalness={0.15}
          color="#FAF6ED"
        />
      </mesh>

      {/* 2. Soft Outer Atmospheric Halo Mesh */}
      <mesh>
        <sphereGeometry args={[2.05, 48, 48]} />
        <meshBasicMaterial
          color={activeHub.accent}
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* 3. Domain Beacon Hubs */}
      {DOMAIN_LOCATIONS.map((loc, idx) => {
        const isActive = activeDomain === idx;
        const pos = latLonToVector3(loc.lat, loc.lon, 2.01);

        if (isActive) {
          return (
            <RadarPingRings
              key={loc.domainCode}
              position={pos}
              color={loc.accent}
            />
          );
        }

        return (
          <mesh
            key={loc.domainCode}
            position={pos}
            onClick={(e) => {
              e.stopPropagation();
              if (onPinClick) onPinClick(idx);
            }}
          >
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshBasicMaterial color="#9E988A" transparent opacity={0.7} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function GarcyInteractiveGlobe({
  activeDomain = 0,
  onSelectDomain,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });

  const activeHub = DOMAIN_LOCATIONS[activeDomain % DOMAIN_LOCATIONS.length];

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragOffset.current = { x: dx, y: dy };
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* Background Volumetric Halo behind the Globe */}
      <div
        className="absolute w-[360px] h-[360px] sm:w-[440px] sm:h-[440px] rounded-full pointer-events-none transition-colors duration-700 blur-3xl opacity-35"
        style={{
          background: `radial-gradient(circle, ${activeHub.accent} 0%, transparent 70%)`,
        }}
      />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0.4, 5.0], fov: 46 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "auto" }}
      >
        <ambientLight intensity={1.3} />
        <directionalLight position={[4, 5, 4]} intensity={1.7} color="#FFFFFF" />
        <directionalLight
          position={[-4, -3, -3]}
          intensity={1.0}
          color={activeHub.accent}
        />
        <pointLight position={[0, 3, 2]} intensity={0.8} color="#FFFFFF" />

        <GlobeScene
          activeDomain={activeDomain}
          isDragging={isDragging}
          dragOffset={dragOffset}
          onPinClick={onSelectDomain}
        />
      </Canvas>
    </div>
  );
}

