import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PORTFOLIO_DATA } from '../config/portfolioData';
import { X, Box, Eye, Sparkles } from 'lucide-react';

interface PhotoInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  playBlip: () => void;
}

export const PhotoInspectionModal: React.FC<PhotoInspectionModalProps> = ({
  isOpen,
  onClose,
  playBlip,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const profile = PORTFOLIO_DATA.profile;

  useEffect(() => {
    if (!isOpen) return;

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Controlled Studio Lights (rich contrast, not washed out)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(4, 4, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4d4d8, 1.0);
    rimLight.position.set(-4, -3, -4);
    scene.add(rimLight);

    // Texture loading
    const textureLoader = new THREE.TextureLoader();
    const portraitTex = textureLoader.load(profile.portraitImage);
    portraitTex.colorSpace = THREE.SRGBColorSpace;

    const makeMat = (tex: THREE.Texture) =>
      new THREE.MeshStandardMaterial({
        map: tex,
        roughness: 0.2,
        metalness: 0.1,
        wireframe: wireframeMode,
      });

    const cubeGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    const materials = [
      makeMat(portraitTex),
      makeMat(portraitTex),
      makeMat(portraitTex),
      makeMat(portraitTex),
      makeMat(portraitTex),
      makeMat(portraitTex),
    ];

    const mesh = new THREE.Mesh(cubeGeo, materials);
    scene.add(mesh);

    // Bold Outline Edges
    const edgesGeo = new THREE.EdgesGeometry(cubeGeo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
    const edges = new THREE.LineSegments(edgesGeo, edgesMat);
    mesh.add(edges);

    // Halo ring
    const ringGeo = new THREE.TorusGeometry(1.9, 0.04, 16, 48);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 4;
    scene.add(ring);

    // Interactive Drag & Touch Spin
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let spinVelocity = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const dx = clientX - prevX;
      const dy = clientY - prevY;
      mesh.rotation.y += dx * 0.015;
      mesh.rotation.x += dy * 0.015;
      spinVelocity = dx * 0.05;
      prevX = clientX;
      prevY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        mesh.rotation.y += 0.008 + spinVelocity;
        spinVelocity *= 0.94;
      }
      ring.rotation.z += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cubeGeo.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
    };
  }, [isOpen, wireframeMode, profile.portraitImage]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#121212] border-[3px] border-white rounded-3xl p-6 sm:p-7 comic-shadow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-zinc-800 pb-3 mb-4">
          <div>
            <div className="font-comic text-xs text-zinc-400 uppercase font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-white" />
              <span>3D CHARACTER TOY BOX</span>
            </div>
            <h3 className="font-comic font-bold text-2xl text-white">
              {profile.fullName} ✦ 3D Photo View
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white text-black font-comic font-bold text-xs border border-black cursor-pointer shadow-[2px_2px_0px_#ffffff]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3D Canvas Viewport */}
        <div
          ref={mountRef}
          className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-black border-2 border-white overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
        >
          <div className="absolute top-3 left-3 font-comic text-xs text-black font-bold bg-white px-3 py-1 rounded-full border border-black shadow-[2px_2px_0px_#000000] pointer-events-none">
            DRAG TO ROTATE 360° 🔄
          </div>
        </div>

        {/* Footer Controls */}
        <div className="mt-4 pt-4 border-t-2 border-zinc-800 flex flex-wrap items-center justify-between gap-3 font-comic text-xs">
          <button
            type="button"
            onClick={() => {
              playBlip();
              setWireframeMode(!wireframeMode);
            }}
            className={`px-4 py-2 rounded-xl border-2 flex items-center gap-1.5 transition-all cursor-pointer font-bold ${
              wireframeMode
                ? 'bg-white text-black border-black shadow-[2px_2px_0px_#ffffff]'
                : 'bg-black text-white border-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>{wireframeMode ? 'PHOTO TEXTURES' : 'OUTLINE / WIREFRAME'}</span>
          </button>

          <div className="text-zinc-300 text-xs font-bold flex items-center gap-2">
            <span>DIPLOMA IN CE</span>
            <span>•</span>
            <span className="text-white">MMANTC CAMPUS</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white text-black font-bold text-xs border-2 border-black shadow-[2px_2px_0px_#ffffff] cursor-pointer"
          >
            DONE ✨
          </button>
        </div>
      </div>
    </div>
  );
};
