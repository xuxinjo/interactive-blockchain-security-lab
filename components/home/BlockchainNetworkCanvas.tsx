"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import {
  useRouteTransition,
  type PortalDestination
} from "@/components/layout/RouteTransitionProvider";
import {
  useMemo,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MutableRefObject,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent
} from "react";
import * as THREE from "three";

type VectorTuple = [number, number, number];
type NodeTone = "core" | "relay" | "edge";

interface NetworkNode {
  position: VectorTuple;
  size: number;
  tone: NodeTone;
  destination?: PortalDestination;
}

interface ViewControls {
  rotationX: number;
  rotationY: number;
  velocityX: number;
  velocityY: number;
  distance: number;
  dragging: boolean;
  lastInteraction: number;
  dragDistance: number;
  portalStartedAt: number | null;
  portalMode: boolean;
}

interface HoveredPortal {
  destination: PortalDestination;
  nodeIndex: number;
  x: number;
  y: number;
}

const INITIAL_VIEW = {
  rotationX: 0.22,
  rotationY: -0.48,
  distance: 11.5
} as const;

const portalDestinations = {
  framework: {
    title: "Framework",
    href: "/framework",
    description: "Layer × CIA security model",
    accent: "#22d3ee"
  },
  diagrams: {
    title: "Diagrams",
    href: "/diagrams",
    description: "Animated attack and defence flows",
    accent: "#2dd4bf"
  },
  cases: {
    title: "Cases",
    href: "/cases",
    description: "Six documented blockchain incidents",
    accent: "#38bdf8"
  },
  lab: {
    title: "Lab",
    href: "/lab",
    description: "Interactive vulnerable and guarded states",
    accent: "#a78bfa"
  },
  insights: {
    title: "Insights",
    href: "/insights",
    description: "Detection methods and their limits",
    accent: "#818cf8"
  },
  data: {
    title: "Data",
    href: "/data",
    description: "Incident charts and timeline",
    accent: "#34d399"
  },
  about: {
    title: "About",
    href: "/about",
    description: "Thesis context and research map",
    accent: "#cbd5e1"
  },
  feedback: {
    title: "Feedback",
    href: "/feedback",
    description: "Local review notes",
    accent: "#e879f9"
  }
} satisfies Record<string, PortalDestination>;

const nodes: NetworkNode[] = [
  { position: [0, 0, 0], size: 0.78, tone: "core", destination: portalDestinations.framework },
  { position: [-1.35, 0.72, 0.24], size: 0.58, tone: "core" },
  { position: [0, 1.32, -0.38], size: 0.62, tone: "core" },
  { position: [1.35, 0.72, 0.2], size: 0.58, tone: "core" },
  { position: [1.35, -0.72, -0.25], size: 0.62, tone: "core" },
  { position: [0, -1.32, 0.38], size: 0.66, tone: "core" },
  { position: [-1.35, -0.72, -0.28], size: 0.58, tone: "core" },
  { position: [-2.45, 1.38, -0.78], size: 0.52, tone: "relay" },
  { position: [-3.35, 2.12, 0.08], size: 0.7, tone: "relay" },
  { position: [-4.35, 1.42, 0.96], size: 0.86, tone: "edge", destination: portalDestinations.about },
  { position: [-3.32, 0.68, -0.28], size: 0.55, tone: "relay" },
  { position: [-4.32, 0.12, 0.68], size: 0.78, tone: "edge" },
  { position: [-2.52, -1.2, 0.82], size: 0.55, tone: "relay" },
  { position: [-3.42, -1.98, -0.15], size: 0.68, tone: "relay" },
  { position: [-4.32, -1.3, 0.96], size: 0.82, tone: "edge", destination: portalDestinations.data },
  { position: [-0.62, 2.46, 0.72], size: 0.55, tone: "relay" },
  { position: [0.42, 3.18, -0.28], size: 0.72, tone: "edge", destination: portalDestinations.diagrams },
  { position: [1.55, 2.58, 0.82], size: 0.62, tone: "relay" },
  { position: [2.5, 1.4, -0.72], size: 0.56, tone: "relay" },
  { position: [3.48, 2.08, 0.26], size: 0.72, tone: "relay" },
  { position: [4.38, 1.22, 1], size: 0.86, tone: "edge", destination: portalDestinations.cases },
  { position: [2.5, -1.12, 0.76], size: 0.56, tone: "relay" },
  { position: [3.48, -1.84, -0.12], size: 0.72, tone: "relay" },
  { position: [4.38, -1.04, 1.08], size: 0.86, tone: "edge", destination: portalDestinations.lab },
  { position: [-0.58, -2.48, 0.68], size: 0.54, tone: "relay" },
  { position: [0.34, -3.2, -0.34], size: 0.7, tone: "edge", destination: portalDestinations.insights },
  { position: [1.48, -2.58, 0.88], size: 0.64, tone: "relay", destination: portalDestinations.feedback }
];

const links: Array<[number, number]> = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
  [1, 7], [7, 8], [8, 9], [7, 10], [10, 11],
  [6, 12], [12, 13], [13, 14],
  [2, 15], [15, 16], [16, 17], [17, 18],
  [3, 18], [18, 19], [19, 20],
  [4, 21], [21, 22], [22, 23],
  [5, 24], [24, 25], [25, 26], [26, 21]
];

const pulseLinkIndexes = [1, 8, 13, 18, 21, 25, 29, 32];

const toneColors: Record<NodeTone, string> = {
  core: "#a5f3fc",
  relay: "#5eead4",
  edge: "#818cf8"
};

export function BlockchainNetworkCanvas() {
  const reduceMotion = Boolean(useReducedMotion());
  const { navigateWithPortal, prefetchPortal, isTransitioning } = useRouteTransition();
  const [isDragging, setIsDragging] = useState(false);
  const [isPortalMode, setIsPortalMode] = useState(false);
  const [zoomPercent, setZoomPercent] = useState(100);
  const [hoveredPortal, setHoveredPortal] = useState<HoveredPortal | null>(null);
  const [transitioningNode, setTransitioningNode] = useState<number | null>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const controls = useRef<ViewControls>({
    rotationX: INITIAL_VIEW.rotationX,
    rotationY: INITIAL_VIEW.rotationY,
    velocityX: 0,
    velocityY: 0,
    distance: INITIAL_VIEW.distance,
    dragging: false,
    lastInteraction: Date.now(),
    dragDistance: 0,
    portalStartedAt: null,
    portalMode: false
  });

  useEffect(() => {
    function enablePortalMode(event: globalThis.KeyboardEvent) {
      if (event.key !== "Control") {
        return;
      }

      controls.current.portalMode = true;
      controls.current.dragging = false;
      controls.current.dragDistance = 0;
      controls.current.velocityX = 0;
      controls.current.velocityY = 0;
      setIsDragging(false);
      setIsPortalMode(true);
    }

    function disablePortalMode(event: globalThis.KeyboardEvent) {
      if (event.key !== "Control") {
        return;
      }

      controls.current.portalMode = false;
      controls.current.lastInteraction = Date.now();
      setIsPortalMode(false);
    }

    function disablePortalModeOnBlur() {
      controls.current.portalMode = false;
      controls.current.lastInteraction = Date.now();
      setIsPortalMode(false);
    }

    window.addEventListener("keydown", enablePortalMode);
    window.addEventListener("keyup", disablePortalMode);
    window.addEventListener("blur", disablePortalModeOnBlur);

    return () => {
      window.removeEventListener("keydown", enablePortalMode);
      window.removeEventListener("keyup", disablePortalMode);
      window.removeEventListener("blur", disablePortalModeOnBlur);
    };
  }, []);

  function startDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    if (event.ctrlKey || controls.current.portalMode || isTransitioning) {
      controls.current.dragDistance = 0;
      return;
    }

    event.currentTarget.setPointerCapture?.(event.pointerId);
    pointer.current = { x: event.clientX, y: event.clientY };
    controls.current.dragging = true;
    controls.current.velocityX = 0;
    controls.current.velocityY = 0;
    controls.current.dragDistance = 0;
    controls.current.lastInteraction = Date.now();
    setIsDragging(true);
  }

  function moveDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (!controls.current.dragging || controls.current.portalMode) {
      return;
    }

    const deltaX = event.clientX - pointer.current.x;
    const deltaY = event.clientY - pointer.current.y;
    pointer.current = { x: event.clientX, y: event.clientY };

    controls.current.rotationY += deltaX * 0.007;
    controls.current.rotationX = clamp(controls.current.rotationX + deltaY * 0.007, -1.45, 1.45);
    controls.current.velocityY = deltaX * 0.0018;
    controls.current.velocityX = deltaY * 0.0018;
    controls.current.dragDistance += Math.abs(deltaX) + Math.abs(deltaY);
    controls.current.lastInteraction = Date.now();
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (!controls.current.dragging) {
      return;
    }

    if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    controls.current.dragging = false;
    controls.current.lastInteraction = Date.now();
    setIsDragging(false);
  }

  function updateHoveredPortal(destination: PortalDestination, nodeIndex: number, x: number, y: number) {
    if (isTransitioning || controls.current.dragging) {
      return;
    }

    setHoveredPortal({ destination, nodeIndex, x, y });
    prefetchPortal(destination.href);
  }

  function clearHoveredPortal(nodeIndex: number) {
    setHoveredPortal((current) => (current?.nodeIndex === nodeIndex ? null : current));
  }

  function activatePortal(destination: PortalDestination, nodeIndex: number, origin: { x: number; y: number }) {
    if (isTransitioning || controls.current.dragDistance > 8) {
      return;
    }

    controls.current.portalStartedAt = performance.now();
    controls.current.dragging = false;
    controls.current.velocityX = 0;
    controls.current.velocityY = 0;
    setIsDragging(false);
    setHoveredPortal(null);
    setTransitioningNode(nodeIndex);
    navigateWithPortal(destination, origin);
  }

  function rotateBy(x: number, y: number) {
    if (controls.current.portalMode || isTransitioning) {
      return;
    }

    controls.current.rotationX = clamp(controls.current.rotationX + x, -1.45, 1.45);
    controls.current.rotationY += y;
    controls.current.velocityX = 0;
    controls.current.velocityY = 0;
    controls.current.lastInteraction = Date.now();
  }

  function adjustZoom(delta: number) {
    if (controls.current.portalMode || isTransitioning) {
      return;
    }

    controls.current.distance = clamp(controls.current.distance + delta, 7.2, 14);
    controls.current.lastInteraction = Date.now();
    setZoomPercent(Math.round((INITIAL_VIEW.distance / controls.current.distance) * 100));
  }

  function resetView() {
    controls.current.rotationX = INITIAL_VIEW.rotationX;
    controls.current.rotationY = INITIAL_VIEW.rotationY;
    controls.current.distance = INITIAL_VIEW.distance;
    controls.current.velocityX = 0;
    controls.current.velocityY = 0;
    controls.current.lastInteraction = Date.now();
    setZoomPercent(100);
  }

  function handleKeyboard(event: KeyboardEvent<HTMLDivElement>) {
    if (controls.current.portalMode || isTransitioning) {
      return;
    }

    const rotations: Record<string, [number, number]> = {
      ArrowUp: [-0.16, 0],
      ArrowDown: [0.16, 0],
      ArrowLeft: [0, -0.18],
      ArrowRight: [0, 0.18]
    };

    if (rotations[event.key]) {
      event.preventDefault();
      rotateBy(...rotations[event.key]);
      return;
    }

    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      adjustZoom(-0.8);
    }

    if (event.key === "-") {
      event.preventDefault();
      adjustZoom(0.8);
    }

    if (event.key === "Home") {
      event.preventDefault();
      resetView();
    }
  }

  return (
    <div
      className={`hero-visual-stage${isDragging ? " is-dragging" : ""}${hoveredPortal ? " has-destination" : ""}${isPortalMode ? " is-portal-mode" : ""}`}
      role="region"
      tabIndex={0}
      aria-label="Interactive three-dimensional blockchain network"
      aria-describedby="network-interaction-help"
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={handleKeyboard}
      onContextMenu={(event) => event.preventDefault()}
    >
      <Canvas
        className="hero-three-canvas"
        camera={{ position: [0, 0, INITIAL_VIEW.distance], fov: 47, near: 0.1, far: 80 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onPointerMissed={() => setHoveredPortal(null)}
      >
        <BlockchainScene
          controls={controls}
          reduceMotion={reduceMotion}
          hoveredNode={hoveredPortal?.nodeIndex ?? null}
          transitioningNode={transitioningNode}
          portalMode={isPortalMode}
          onHoverPortal={updateHoveredPortal}
          onLeavePortal={clearHoveredPortal}
          onActivatePortal={activatePortal}
        />
      </Canvas>

      <div className="hero-three-vignette" aria-hidden="true" />
      <div className="hero-network-toolbar" aria-hidden="true">
        <span className="hero-network-live-dot" />
        {isPortalMode ? "Portal mode · select a block" : `3D view · ${zoomPercent}%`}
      </div>

      <p id="network-interaction-help" className="hero-network-help">
        <span className="sm:hidden">{isPortalMode ? "Tap a glowing block to open its destination." : "Swipe sideways to rotate. Tap Go to select a destination."}</span>
        <span className="hidden sm:inline">
        {isDragging
          ? "Release to keep the network spinning"
          : isPortalMode
            ? hoveredPortal
              ? `Click to enter ${hoveredPortal.destination.title}`
              : "Portal mode active · click a glowing destination block"
          : hoveredPortal
            ? `Hold Ctrl and click to open ${hoveredPortal.destination.title}`
            : "Drag to rotate · Hold Ctrl to activate portal mode"}
        </span>
      </p>

      {hoveredPortal && !isTransitioning && (
        <div
          className={`hero-network-tooltip${hoveredPortal.y < 28 ? " tooltip-below" : ""}`}
          style={{
            left: `${hoveredPortal.x}%`,
            top: `${hoveredPortal.y}%`,
            "--destination-accent": hoveredPortal.destination.accent
          } as CSSProperties}
          aria-hidden="true"
        >
          <span>Portal destination</span>
          <strong>{hoveredPortal.destination.title}</strong>
          <p>{hoveredPortal.destination.description}</p>
          <em>{isPortalMode ? "Click to enter" : "Hold Ctrl + click"}</em>
        </div>
      )}

      <div className="hero-network-controls" onPointerDown={(event) => event.stopPropagation()}>
        <button
          type="button"
          aria-label="Toggle destination selection"
          aria-pressed={isPortalMode}
          disabled={isTransitioning}
          onClick={() => {
            const enabled = !controls.current.portalMode;
            controls.current.portalMode = enabled;
            controls.current.dragging = false;
            controls.current.dragDistance = 0;
            controls.current.lastInteraction = Date.now();
            setIsDragging(false);
            setIsPortalMode(enabled);
          }}
        >
          Go
        </button>
        <button
          type="button"
          aria-label="Zoom out 3D network"
          onClick={() => adjustZoom(0.8)}
          disabled={isPortalMode || isTransitioning}
        >
          −
        </button>
        <button
          type="button"
          aria-label="Reset 3D network view"
          onClick={resetView}
          disabled={isPortalMode || isTransitioning}
        >
          <ResetIcon />
        </button>
        <button
          type="button"
          aria-label="Zoom in 3D network"
          onClick={() => adjustZoom(-0.8)}
          disabled={isPortalMode || isTransitioning}
        >
          +
        </button>
      </div>
    </div>
  );
}

function BlockchainScene({
  controls,
  reduceMotion,
  hoveredNode,
  transitioningNode,
  portalMode,
  onHoverPortal,
  onLeavePortal,
  onActivatePortal
}: {
  controls: MutableRefObject<ViewControls>;
  reduceMotion: boolean;
  hoveredNode: number | null;
  transitioningNode: number | null;
  portalMode: boolean;
  onHoverPortal: (destination: PortalDestination, nodeIndex: number, x: number, y: number) => void;
  onLeavePortal: (nodeIndex: number) => void;
  onActivatePortal: (
    destination: PortalDestination,
    nodeIndex: number,
    origin: { x: number; y: number }
  ) => void;
}) {
  const network = useRef<THREE.Group>(null);
  const floatingLayer = useRef<THREE.Group>(null);

  useFrame(({ camera, clock }, delta) => {
    const view = controls.current;
    const portraitScale = camera instanceof THREE.PerspectiveCamera ? Math.max(1, 1.15 / camera.aspect) : 1;

    if (view.portalStartedAt !== null && network.current) {
      const progress = clamp((performance.now() - view.portalStartedAt) / 920, 0, 1);
      const accelerated = progress * progress * progress;

      if (!reduceMotion) {
        network.current.rotation.y += delta * (1.2 + accelerated * 9.5);
        network.current.rotation.x += delta * (0.35 + accelerated * 2.4);
        network.current.scale.setScalar(1 + accelerated * 2.35);
      }

      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 7.3 * portraitScale, 1 - Math.pow(0.001, delta));
      return;
    }

    if (!view.dragging && !view.portalMode) {
      view.rotationX = clamp(view.rotationX + view.velocityX * delta * 60, -1.45, 1.45);
      view.rotationY += view.velocityY * delta * 60;
      const damping = Math.pow(0.055, delta);
      view.velocityX *= damping;
      view.velocityY *= damping;

      if (!reduceMotion && Date.now() - view.lastInteraction > 2600 && Math.abs(view.velocityY) < 0.0003) {
        view.rotationY += delta * 0.075;
      }
    }

    if (network.current) {
      const smooth = 1 - Math.pow(0.0008, delta);
      network.current.rotation.x = THREE.MathUtils.lerp(network.current.rotation.x, view.rotationX, smooth);
      network.current.rotation.y = THREE.MathUtils.lerp(network.current.rotation.y, view.rotationY, smooth);
    }

    if (floatingLayer.current && !reduceMotion) {
      floatingLayer.current.position.y = Math.sin(clock.elapsedTime * 0.42) * 0.06;
    }

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, view.distance * portraitScale, 1 - Math.pow(0.002, delta));
  });

  return (
    <>
      <ambientLight intensity={0.52} />
      <pointLight position={[4.5, 5.5, 7]} color="#67e8f9" intensity={26} distance={18} />
      <pointLight position={[-5, -3, 5]} color="#4f46e5" intensity={20} distance={17} />
      <pointLight position={[0, -4, -4]} color="#14b8a6" intensity={14} distance={14} />
      <StarField />

      <group ref={network} rotation={[INITIAL_VIEW.rotationX, INITIAL_VIEW.rotationY, 0]}>
        <group ref={floatingLayer}>
          {links.map(([fromIndex, toIndex], index) => (
            <Connector
              key={`${fromIndex}-${toIndex}`}
              from={nodes[fromIndex].position}
              to={nodes[toIndex].position}
              emphasis={index < 12}
              active={
                hoveredNode === fromIndex ||
                hoveredNode === toIndex ||
                transitioningNode === fromIndex ||
                transitioningNode === toIndex
              }
              accent={
                transitioningNode !== null
                  ? nodes[transitioningNode].destination?.accent
                  : hoveredNode !== null
                    ? nodes[hoveredNode].destination?.accent
                    : undefined
              }
            />
          ))}

          {nodes.map((node, index) => (
            <BlockNode
              key={index}
              node={node}
              index={index}
              reduceMotion={reduceMotion}
              hovered={hoveredNode === index}
              transitioning={transitioningNode === index}
              portalMode={portalMode}
              onHoverPortal={onHoverPortal}
              onLeavePortal={onLeavePortal}
              onActivatePortal={onActivatePortal}
            />
          ))}

          {!reduceMotion &&
            pulseLinkIndexes.map((linkIndex, index) => {
              const [fromIndex, toIndex] = links[linkIndex];
              return (
                <DataPulse
                  key={linkIndex}
                  from={nodes[fromIndex].position}
                  to={nodes[toIndex].position}
                  delay={index / pulseLinkIndexes.length}
                  color={toneColors[nodes[toIndex].tone]}
                />
              );
            })}
        </group>
      </group>
    </>
  );
}

function BlockNode({
  node,
  index,
  reduceMotion,
  hovered,
  transitioning,
  portalMode,
  onHoverPortal,
  onLeavePortal,
  onActivatePortal
}: {
  node: NetworkNode;
  index: number;
  reduceMotion: boolean;
  hovered: boolean;
  transitioning: boolean;
  portalMode: boolean;
  onHoverPortal: (destination: PortalDestination, nodeIndex: number, x: number, y: number) => void;
  onLeavePortal: (nodeIndex: number) => void;
  onActivatePortal: (
    destination: PortalDestination,
    nodeIndex: number,
    origin: { x: number; y: number }
  ) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(node.size, node.size, node.size), [node.size]);
  const edgeGeometry = useMemo(() => new THREE.EdgesGeometry(boxGeometry, 18), [boxGeometry]);
  const color = toneColors[node.tone];

  useFrame(({ clock }) => {
    if (!group.current) {
      return;
    }

    if (!reduceMotion) {
      const phase = clock.elapsedTime * 0.48 + index * 0.43;
      group.current.position.y = node.position[1] + Math.sin(phase) * 0.035;
      group.current.rotation.x = Math.sin(phase * 0.72) * 0.055;
      group.current.rotation.y = Math.cos(phase * 0.58) * 0.075;
    }

    const targetScale = transitioning ? 1.55 : hovered ? 1.22 : portalMode && node.destination ? 1.06 : 1;
    const currentScale = group.current.scale.x;
    group.current.scale.setScalar(reduceMotion ? targetScale : THREE.MathUtils.lerp(currentScale, targetScale, 0.13));
  });

  function updatePortalHover(event: ThreeEvent<globalThis.PointerEvent>) {
    if (!node.destination) {
      return;
    }

    event.stopPropagation();
    onHoverPortal(
      node.destination,
      index,
      clamp((event.pointer.x + 1) * 50, 4, 96),
      clamp((1 - event.pointer.y) * 50, 5, 95)
    );
  }

  function activateNode(event: ThreeEvent<MouseEvent>) {
    if (!node.destination || event.delta > 8 || (!event.ctrlKey && !portalMode)) {
      return;
    }

    event.stopPropagation();
    onActivatePortal(node.destination, index, {
      x: event.nativeEvent.clientX,
      y: event.nativeEvent.clientY
    });
  }

  return (
    <group ref={group} position={node.position}>
      <mesh
        geometry={boxGeometry}
        onPointerOver={updatePortalHover}
        onPointerMove={updatePortalHover}
        onPointerOut={() => onLeavePortal(index)}
        onClick={activateNode}
      >
        <meshPhysicalMaterial
          color="#07111f"
          emissive={color}
          emissiveIntensity={
            transitioning
              ? 1.35
              : hovered
                ? 0.86
                : portalMode && node.destination
                  ? 0.48
                  : node.tone === "core"
                    ? 0.23
                    : 0.15
          }
          metalness={0.28}
          roughness={0.16}
          transmission={0.24}
          thickness={0.65}
          transparent
          opacity={0.82}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>
      <lineSegments geometry={edgeGeometry} scale={1.015}>
        <lineBasicMaterial color={color} transparent opacity={0.94} toneMapped={false} />
      </lineSegments>
      <lineSegments geometry={edgeGeometry} position={[-0.013, 0, 0]} scale={1.021}>
        <lineBasicMaterial color="#ef4444" transparent opacity={0.18} depthWrite={false} toneMapped={false} />
      </lineSegments>
      <lineSegments geometry={edgeGeometry} position={[0.013, 0, 0]} scale={1.024}>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.28} depthWrite={false} toneMapped={false} />
      </lineSegments>
      <pointLight color={color} intensity={node.tone === "edge" ? 2.4 : 1.5} distance={2.2} />
      {node.destination && (
        <mesh
          rotation={[Math.PI / 2, 0, 0]}
          scale={transitioning ? 1.45 : hovered ? 1.18 : portalMode ? 1.04 : 0.88}
        >
          <torusGeometry args={[node.size * 0.82, 0.018, 8, 52]} />
          <meshBasicMaterial
            color={node.destination.accent}
            transparent
            opacity={transitioning ? 0.95 : hovered ? 0.76 : portalMode ? 0.48 : 0.18}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
}

function Connector({
  from,
  to,
  emphasis,
  active,
  accent
}: {
  from: VectorTuple;
  to: VectorTuple;
  emphasis: boolean;
  active: boolean;
  accent?: string;
}) {
  const metrics = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const direction = end.clone().sub(start);
    const midpoint = start.clone().add(end).multiplyScalar(0.5);
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize()
    );

    return { midpoint, quaternion, length: direction.length() };
  }, [from, to]);

  return (
    <group position={metrics.midpoint} quaternion={metrics.quaternion}>
      <mesh>
        <cylinderGeometry
          args={[
            active ? 0.034 : emphasis ? 0.018 : 0.014,
            active ? 0.034 : emphasis ? 0.018 : 0.014,
            metrics.length,
            8
          ]}
        />
        <meshBasicMaterial
          color={active && accent ? accent : emphasis ? "#a5f3fc" : "#2dd4bf"}
          transparent
          opacity={active ? 0.98 : emphasis ? 0.64 : 0.4}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.055, 0.055, metrics.length, 8]} />
        <meshBasicMaterial color="#0891b2" transparent opacity={0.045} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function DataPulse({ from, to, delay, color }: { from: VectorTuple; to: VectorTuple; delay: number; color: string }) {
  const pulse = useRef<THREE.Mesh>(null);
  const start = useMemo(() => new THREE.Vector3(...from), [from]);
  const end = useMemo(() => new THREE.Vector3(...to), [to]);

  useFrame(({ clock }) => {
    if (!pulse.current) {
      return;
    }

    const progress = (clock.elapsedTime * 0.16 + delay) % 1;
    pulse.current.position.lerpVectors(start, end, progress);
    const visibility = Math.sin(progress * Math.PI);
    pulse.current.scale.setScalar(0.72 + visibility * 0.42);
  });

  return (
    <mesh ref={pulse}>
      <sphereGeometry args={[0.075, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function StarField() {
  const positions = useMemo(() => {
    const values = new Float32Array(320 * 3);
    let seed = 9137;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    for (let index = 0; index < values.length; index += 3) {
      values[index] = (random() - 0.5) * 18;
      values[index + 1] = (random() - 0.5) * 12;
      values[index + 2] = (random() - 0.5) * 12 - 1;
    }

    return values;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#67e8f9" size={0.018} transparent opacity={0.32} depthWrite={false} />
    </points>
  );
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
      <path
        d="M5.5 8.2A7 7 0 1 1 5 15m.5-6.8V4.5m0 3.7h3.7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}
