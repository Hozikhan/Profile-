import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';

interface CyberHeroCanvasProps {
  portraitUrl: string;
  circuitBgUrl: string;
  scrollY: number;
  playBlip?: () => void;
}

export const CyberHeroCanvas: React.FC<CyberHeroCanvasProps> = ({
  portraitUrl,
  scrollY,
  playBlip,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [glStatus, setGlStatus] = useState<string>('✦ 3D 360° SPIN READY');
  const [isCurrentlyDragging, setIsCurrentlyDragging] = useState<boolean>(false);
  const scrollYRef = useRef(scrollY);
  const spinTriggerRef = useRef<() => void>(() => {});

  useEffect(() => {
    scrollYRef.current = scrollY;
  }, [scrollY]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL to adapt frame pacing and effects
    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    setGlStatus(isSoftwareGl ? '✦ 3D BOX (SMOOTH)' : '✦ 360° SLIDE & ROTATE');

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 520;

    // Scene & Camera - positioned to give a grand, large presentation of the box
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    // Camera distance 5.4 makes the 2.7 size box look large, prominent, and commanding
    camera.position.set(0, 0, 5.4);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0); // fully transparent
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Controlled Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4d4d8, 1.0);
    fillLight.position.set(-3, -2, -2);
    scene.add(fillLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.3);
    frontLight.position.set(0, 0, 5);
    scene.add(frontLight);

    // Procedural Top/Bottom Cap Textures
    const createCapTexture = (title: string, sub: string, accentColor: string) => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d')!;

      ctx.fillStyle = '#0a0a0d';
      ctx.fillRect(0, 0, 512, 512);

      // Halftone pattern
      ctx.fillStyle = '#1c1c24';
      for (let x = 16; x < 512; x += 32) {
        for (let y = 16; y < 512; y += 32) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 14;
      ctx.strokeRect(18, 18, 476, 476);

      ctx.fillStyle = accentColor;
      ctx.fillRect(40, 44, 432, 60);

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MMANTC DIPLOMA CE', 256, 74);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(title, 256, 240);

      ctx.fillStyle = '#e4e4e7';
      ctx.font = '600 22px sans-serif';
      ctx.fillText(sub, 256, 290);

      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 4;
      ctx.strokeRect(80, 350, 352, 64);

      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('★ 360° SPIN MATRIX ★', 256, 382);

      const canvasTexture = new THREE.CanvasTexture(c);
      canvasTexture.colorSpace = THREE.SRGBColorSpace;
      return canvasTexture;
    };

    const capTopTex = createCapTexture('HUZAIFA HUSSAIN', 'COMPUTER ENGINEERING', '#facc15');
    const capBottomTex = createCapTexture('MADHUBANI, BIHAR', '1ST YEAR DIPLOMA', '#38bdf8');

    // Main 3D Comic Toy Group
    const toyGroup = new THREE.Group();
    toyGroup.name = 'CartoonHeroCluster';
    scene.add(toyGroup);

    // 1. INCREASED Core Rotating 3D Cartoon Photo Cube (Size 2.7 x 2.7 x 2.7)
    const cubeGeo = new THREE.BoxGeometry(2.7, 2.7, 2.7);

    const makeFaceMaterial = (map: THREE.Texture) =>
      new THREE.MeshStandardMaterial({
        map,
        roughness: 0.35,
        metalness: 0.05,
      });

    // Initial placeholder materials
    const cubeMaterials: THREE.MeshStandardMaterial[] = [
      makeFaceMaterial(capTopTex),    // +X (Right)
      makeFaceMaterial(capTopTex),    // -X (Left)
      makeFaceMaterial(capTopTex),    // +Y (Top)
      makeFaceMaterial(capBottomTex), // -Y (Bottom)
      makeFaceMaterial(capTopTex),    // +Z (Front)
      makeFaceMaterial(capTopTex),    // -Z (Back)
    ];

    const photoCube = new THREE.Mesh(cubeGeo, cubeMaterials);
    toyGroup.add(photoCube);

    // Add bold cartoon edges (Ink Outline)
    const edgesGeo = new THREE.EdgesGeometry(cubeGeo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 });
    const cubeEdges = new THREE.LineSegments(edgesGeo, edgesMat);
    photoCube.add(cubeEdges);

    // =========================================================================
    // COMPOSITED PHOTO TEXTURE: FITS 100% OF HUZAIFA'S PORTRAIT PERFECTLY
    // =========================================================================
    const loadAndCompositeFullPhoto = (url: string) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        canvas.height = 1024;
        const ctx = canvas.getContext('2d')!;

        // 1. Solid deep noir backing
        ctx.fillStyle = '#08080a';
        ctx.fillRect(0, 0, 1024, 1024);

        // 2. Comic halftone dot pattern
        ctx.fillStyle = '#181820';
        for (let x = 24; x < 1024; x += 48) {
          for (let y = 24; y < 1024; y += 48) {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // 3. Draw Huzaifa's photo with comfortable safe margins so 100% fits!
        // The image is a 1254x1254 circular portrait.
        // Margin of 48px ensures hair, ears, face, suit collar, and striped tie are completely visible!
        const photoSize = 928;
        const photoOffset = (1024 - photoSize) / 2; // 48px

        // Golden circular badge outline around the photo
        ctx.save();
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(512, 512, photoSize / 2 + 6, 0, Math.PI * 2);
        ctx.stroke();

        // Draw the full portrait image
        ctx.drawImage(img, photoOffset, photoOffset, photoSize, photoSize);
        ctx.restore();

        // 4. Bold White Comic Card Outer Border
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 14;
        ctx.strokeRect(14, 14, 996, 996);

        // 5. Cyan inner accent border
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.strokeRect(26, 26, 972, 972);

        // 6. Top Header Ribbon
        ctx.fillStyle = '#facc15';
        ctx.fillRect(36, 36, 952, 54);
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 26px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('★ 1ST YEAR DIPLOMA IN CE • MMANTC ★', 512, 63);

        // 7. Bottom Badge with Name
        ctx.fillStyle = '#000000';
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.roundRect(240, 920, 544, 68, 20);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText('★ HUZAIFA HUSSAIN ★', 512, 954);

        const canvasTexture = new THREE.CanvasTexture(canvas);
        canvasTexture.colorSpace = THREE.SRGBColorSpace;
        canvasTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

        // Apply complete photo texture to all 4 vertical faces!
        // As you rotate 360 degrees, Huzaifa's photo is visible on every side!
        cubeMaterials[0].map = canvasTexture; // +X (Right)
        cubeMaterials[1].map = canvasTexture; // -X (Left)
        cubeMaterials[4].map = canvasTexture; // +Z (Front)
        cubeMaterials[5].map = canvasTexture; // -Z (Back)
        cubeMaterials.forEach((m) => (m.needsUpdate = true));
      };
      img.src = url;
    };

    loadAndCompositeFullPhoto(portraitUrl);

    // 2. Playful Cartoon Orbiting Rings (Scaled up to match larger box)
    const ringGeo = new THREE.TorusGeometry(2.35, 0.05, 16, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      roughness: 0.3,
      metalness: 0.1,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3.2;
    ring1.rotation.y = Math.PI / 6;
    toyGroup.add(ring1);

    // Second cyan ring
    const ringGeo2 = new THREE.TorusGeometry(2.5, 0.04, 16, 48);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.3,
      metalness: 0.1,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.z = Math.PI / 4;
    toyGroup.add(ring2);

    // 3. Orbiting Cartoon Sparkle Stars
    const starGroup = new THREE.Group();
    toyGroup.add(starGroup);

    const starGeo = new THREE.OctahedronGeometry(0.2, 0);
    const starMatYellow = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.2 });
    const starMatCyan = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2 });
    const starMatGreen = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.2 });
    const starMats = [starMatYellow, starMatCyan, starMatGreen];

    const starMeshes: THREE.Mesh[] = [];
    const starCount = 10;
    for (let i = 0; i < starCount; i++) {
      const star = new THREE.Mesh(starGeo, starMats[i % starMats.length]);
      const angle = (i / starCount) * Math.PI * 2;
      const radius = 2.65 + (i % 2) * 0.4;
      const y = Math.sin(angle * 2) * 0.7;
      star.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      starGroup.add(star);
      starMeshes.push(star);
    }

    // 4. Contact ground shadow disc
    const shadowGeo = new THREE.CircleGeometry(1.9, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -2.35;
    toyGroup.add(contactShadow);

    // =========================================================================
    // SLIDE & ROTATE ANYWHERE 360° INTERACTIVE ENGINE
    // =========================================================================
    let spinVelocityY = 0;
    let spinVelocityX = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let pointerStartTime = 0;
    let totalMovedDist = 0;

    const triggerSpin = (boost = 3.6) => {
      spinVelocityY += (Math.random() > 0.5 ? 1 : -1) * (boost + Math.random() * 1.5);
      spinVelocityX += (Math.random() - 0.5) * 1.5;
      if (playBlip) playBlip();
    };

    spinTriggerRef.current = () => triggerSpin(4.2);

    // Unified Pointer Events - handles mouse, touch, and pen with setPointerCapture
    const handlePointerDown = (e: PointerEvent) => {
      // Capture pointer so dragging anywhere on screen remains attached
      try {
        container.setPointerCapture(e.pointerId);
      } catch {
        // Fallback if not supported
      }
      isDragging = true;
      setIsCurrentlyDragging(true);
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      pointerStartTime = performance.now();
      totalMovedDist = 0;
      spinVelocityY = 0;
      spinVelocityX = 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;

      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      totalMovedDist += Math.abs(deltaX) + Math.abs(deltaY);

      // Direct smooth rotation tracking across 360 degrees
      photoCube.rotation.y += deltaX * 0.012;
      photoCube.rotation.x += deltaY * 0.012;

      // Calculate inertia velocity
      spinVelocityY = deltaX * 0.085;
      spinVelocityX = deltaY * 0.085;

      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDragging) {
        try {
          if (container.hasPointerCapture(e.pointerId)) {
            container.releasePointerCapture(e.pointerId);
          }
        } catch {
          // Ignore
        }
        isDragging = false;
        setIsCurrentlyDragging(false);

        const duration = performance.now() - pointerStartTime;
        // If quick tap with small movement (< 12px), trigger exciting spin burst!
        if (duration < 220 && totalMovedDist < 12) {
          triggerSpin(3.8);
        }
      }
    };

    const handlePointerCancel = (e: PointerEvent) => {
      handlePointerUp(e);
    };

    // Attach Pointer events directly to container with setPointerCapture
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerCancel);

    // Animation Loop with delta timing & inertia friction
    let animId: number;
    let lastTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Base rotation & physics inertia
      if (!isDragging) {
        // Apply inertia physics
        photoCube.rotation.y += spinVelocityY * dt * 10;
        photoCube.rotation.x += spinVelocityX * dt * 10;

        // Inertia friction damping
        spinVelocityY *= 0.94;
        spinVelocityX *= 0.94;

        // Gentle base float rotation
        photoCube.rotation.y += dt * 0.35;
      }

      // Ring counter-rotations
      ring1.rotation.z += dt * 0.6;
      ring1.rotation.x = Math.PI / 3.2 + Math.sin(now * 0.001) * 0.12;

      ring2.rotation.z -= dt * 0.4;

      // Stars bobbing and twirling
      starGroup.rotation.y -= dt * 0.4;
      starMeshes.forEach((star, idx) => {
        star.rotation.x += dt * 1.5;
        star.rotation.y += dt * 2.0;
        star.position.y += Math.sin(now * 0.003 + idx) * 0.004;
      });

      // Scroll-driven perspective scaling (shrinking effect)
      const currentScroll = scrollYRef.current;
      const heroMaxScroll = 700;
      const scrollRatio = Math.min(Math.max(currentScroll / heroMaxScroll, 0), 1);

      // Smooth scroll shrinking
      const scrollScale = 1.0 - scrollRatio * 0.45;
      toyGroup.scale.set(scrollScale, scrollScale, scrollScale);
      toyGroup.position.y = Math.sin(now * 0.002) * 0.1 - scrollRatio * 1.2;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerCancel);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      cubeGeo.dispose();
      edgesGeo.dispose();
      edgesMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      starGeo.dispose();
      starMatYellow.dispose();
      starMatCyan.dispose();
      starMatGreen.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      capTopTex.dispose();
      capBottomTex.dispose();
    };
  }, [portraitUrl, playBlip]);

  const handleManualSpin = useCallback(() => {
    if (spinTriggerRef.current) {
      spinTriggerRef.current();
    }
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
      {/* 3D Canvas Mount - Covers 100% of the box, with grab/grabbing cursor and touchAction: none */}
      <div
        ref={mountRef}
        className={`w-full h-full min-h-[380px] flex items-center justify-center select-none ${
          isCurrentlyDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ touchAction: 'none' }}
        title="Click and drag anywhere to rotate the 3D box 360°"
      />

      {/* Interactive Touch To Spin Button in yellow comic pop style */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
        <button
          type="button"
          onClick={handleManualSpin}
          className="font-comic font-extrabold text-xs text-black bg-[#facc15] hover:bg-[#fde047] active:scale-95 px-4 py-1.5 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center gap-1.5 cursor-pointer transition-transform"
        >
          <span>👆 TOUCH TO SPIN! 🔄</span>
        </button>
      </div>

      {/* Top Left Cartoon Status Tag */}
      <div className="absolute top-2 left-2 z-20 pointer-events-none">
        <span className="font-comic text-[11px] font-bold tracking-wider text-black bg-[#38bdf8] px-2.5 py-0.5 rounded-full border border-black shadow-[2px_2px_0px_#000000]">
          {glStatus}
        </span>
      </div>

      {/* Top Right Sliding Instruction Tag */}
      <div className="absolute top-2 right-2 z-20 pointer-events-none">
        <span className="font-comic text-[10px] font-extrabold text-black bg-[#4ade80] px-2 py-0.5 rounded-full border border-black shadow-[1px_1px_0px_#000000] animate-pulse">
          🖐️ SLIDE 360°
        </span>
      </div>
    </div>
  );
};
