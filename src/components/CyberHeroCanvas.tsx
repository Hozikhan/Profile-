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
  const [glStatus, setGlStatus] = useState<string>('✦ 3D TOY BOX READY');
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

    setGlStatus(isSoftwareGl ? '✦ 3D BOX (SMOOTH)' : '✦ TOUCH TO SPIN READY');

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    // Scene & Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0); // fully transparent
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // Keep exposure balanced so image is not washed out / too light
    renderer.toneMappingExposure = 0.95;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Controlled, deep studio lighting (NOT overexposed / washed out)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4d4d8, 0.9);
    fillLight.position.set(-3, -2, -2);
    scene.add(fillLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.2);
    frontLight.position.set(0, 0, 5);
    scene.add(frontLight);

    // Procedural Cartoon Comic Textures for Cube Faces with deep contrast
    const createCartoonTexture = (title: string, sub: string, badge: string, accentColor: string) => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d')!;

      // Deep dark comic background
      ctx.fillStyle = '#0f0f10';
      ctx.fillRect(0, 0, 512, 512);

      // Comic Halftone dots on texture
      ctx.fillStyle = '#1e1e24';
      for (let x = 16; x < 512; x += 32) {
        for (let y = 16; y < 512; y += 32) {
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Bold Comic Frame border with pop color accent
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 14;
      ctx.strokeRect(18, 18, 476, 476);

      // Inner thin border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.strokeRect(32, 32, 448, 448);

      // Cartoon Badge Header
      ctx.fillStyle = accentColor;
      ctx.fillRect(40, 44, 432, 60);

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(badge, 256, 74);

      // Main Comic Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText(title, 256, 230);

      // Subtitle
      ctx.fillStyle = '#e4e4e7';
      ctx.font = '600 22px sans-serif';
      ctx.fillText(sub, 256, 280);

      // Comic Speech Bubble in center
      ctx.strokeStyle = '#facc15';
      ctx.lineWidth = 4;
      ctx.strokeRect(80, 340, 352, 70);

      ctx.fillStyle = '#facc15';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('★ DIPLOMA IN CE ★', 256, 375);

      const canvasTexture = new THREE.CanvasTexture(c);
      canvasTexture.colorSpace = THREE.SRGBColorSpace;
      return canvasTexture;
    };

    const fallbackPortraitTex = createCartoonTexture('HUZAIFA HUSSAIN', 'COMPUTER ENGINEERING', '★ STUDENT DEV ★', '#facc15');
    const fallbackSideTex = createCartoonTexture('MMANTC CAMPUS', 'MADHUBANI, BIHAR', '★ 1ST YEAR DIPLOMA ★', '#38bdf8');

    // Main 3D Comic Toy Group
    const toyGroup = new THREE.Group();
    toyGroup.name = 'CartoonHeroCluster';
    scene.add(toyGroup);

    // 1. Core Rotating Cartoon Photo Cube
    const cubeGeo = new THREE.BoxGeometry(2.35, 2.35, 2.35);

    const makeFaceMaterial = (map: THREE.Texture) =>
      new THREE.MeshStandardMaterial({
        map,
        roughness: 0.35, // less glare so photo stays deep & contrasted
        metalness: 0.05,
      });

    const cubeMaterials: THREE.MeshStandardMaterial[] = [
      makeFaceMaterial(fallbackSideTex),     // +X
      makeFaceMaterial(fallbackSideTex),     // -X
      makeFaceMaterial(fallbackSideTex),     // +Y
      makeFaceMaterial(fallbackSideTex),     // -Y
      makeFaceMaterial(fallbackPortraitTex), // +Z (Front)
      makeFaceMaterial(fallbackPortraitTex), // -Z (Back)
    ];

    const photoCube = new THREE.Mesh(cubeGeo, cubeMaterials);
    toyGroup.add(photoCube);

    // Add bold cartoon edges (Ink Outline) to the cube
    const edgesGeo = new THREE.EdgesGeometry(cubeGeo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 3 });
    const cubeEdges = new THREE.LineSegments(edgesGeo, edgesMat);
    photoCube.add(cubeEdges);

    // Texture Loader for the user's B&W reference portrait
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      portraitUrl,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        cubeMaterials[0].map = tex;
        cubeMaterials[1].map = tex;
        cubeMaterials[4].map = tex; // front
        cubeMaterials[5].map = tex; // back
        cubeMaterials.forEach((m) => (m.needsUpdate = true));
      },
      undefined,
      () => {}
    );

    // 2. Playful Cartoon Orbiting Ring (Sunny Yellow comic accent)
    const ringGeo = new THREE.TorusGeometry(1.95, 0.045, 16, 48);
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
    const ringGeo2 = new THREE.TorusGeometry(2.1, 0.035, 16, 48);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.3,
      metalness: 0.1,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.z = Math.PI / 4;
    toyGroup.add(ring2);

    // 3. Orbiting Cartoon Sparkle Stars (Octahedrons in Yellow & Mint)
    const starGroup = new THREE.Group();
    toyGroup.add(starGroup);

    const starGeo = new THREE.OctahedronGeometry(0.18, 0);
    const starMatYellow = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.2 });
    const starMatCyan = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2 });
    const starMatGreen = new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.2 });
    const starMats = [starMatYellow, starMatCyan, starMatGreen];

    const starMeshes: THREE.Mesh[] = [];
    const starCount = 9;
    for (let i = 0; i < starCount; i++) {
      const star = new THREE.Mesh(starGeo, starMats[i % starMats.length]);
      const angle = (i / starCount) * Math.PI * 2;
      const radius = 2.15 + (i % 2) * 0.35;
      const y = Math.sin(angle * 2) * 0.6;
      star.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      starGroup.add(star);
      starMeshes.push(star);
    }

    // 4. Contact ground shadow disc
    const shadowGeo = new THREE.CircleGeometry(1.6, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
    });
    const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -2.1;
    toyGroup.add(contactShadow);

    // Touch to Spin Physics state
    let spinVelocityY = 0;
    let spinVelocityX = 0;
    let isDragging = false;
    let prevTouchX = 0;
    let prevTouchY = 0;
    let touchStartTime = 0;

    // Trigger explosive spin function (can be called by tap/click or button)
    const triggerSpin = (boost = 3.5) => {
      spinVelocityY += (Math.random() > 0.5 ? 1 : -1) * (boost + Math.random() * 1.5);
      spinVelocityX += (Math.random() - 0.5) * 1.5;
      if (playBlip) playBlip();
    };

    spinTriggerRef.current = () => triggerSpin(4.0);

    // Pointer & Touch Handlers
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevTouchX = clientX;
      prevTouchY = clientY;
      touchStartTime = performance.now();
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - prevTouchX;
        const deltaY = clientY - prevTouchY;
        photoCube.rotation.y += deltaX * 0.015;
        photoCube.rotation.x += deltaY * 0.015;

        // Track velocity
        spinVelocityY = deltaX * 0.08;
        spinVelocityX = deltaY * 0.08;

        prevTouchX = clientX;
        prevTouchY = clientY;
      }
    };

    const onPointerUp = () => {
      const duration = performance.now() - touchStartTime;
      // If quick tap/touch (less than 200ms) with small movement -> Trigger Touch Spin!
      if (duration < 220 && Math.abs(spinVelocityY) < 0.2) {
        triggerSpin(3.8);
      }
      isDragging = false;
    };

    // Attach mouse and touch events directly to container
    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);

    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    // Animation Loop with delta timing & inertia friction
    let animId: number;
    let lastTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Base gentle idle rotation if not spinning fast
      if (!isDragging) {
        // Apply spinning inertia
        photoCube.rotation.y += spinVelocityY * dt * 10;
        photoCube.rotation.x += spinVelocityX * dt * 10;

        // Friction damping
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
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
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
      fallbackPortraitTex.dispose();
      fallbackSideTex.dispose();
    };
  }, [portraitUrl, playBlip]);

  const handleManualSpin = useCallback(() => {
    if (spinTriggerRef.current) {
      spinTriggerRef.current();
    }
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none">
      <div
        ref={mountRef}
        className="w-full h-full min-h-[340px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        style={{ touchAction: 'none' }}
      />

      {/* Interactive Touch To Spin Button in yellow comic pop style */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30">
        <button
          type="button"
          onClick={handleManualSpin}
          className="font-comic font-extrabold text-xs text-black bg-[#facc15] hover:bg-[#fde047] active:scale-95 px-4 py-1.5 rounded-full border-2 border-black shadow-[3px_3px_0px_#000000] flex items-center gap-1.5 cursor-pointer transition-transform"
        >
          <span>👆 TOUCH TO SPIN! 🔄</span>
        </button>
      </div>

      {/* Cartoon Helper Tag */}
      <div className="absolute top-2 left-2 z-20 pointer-events-none">
        <span className="font-comic text-[11px] font-bold tracking-wider text-black bg-[#38bdf8] px-2.5 py-0.5 rounded-full border border-black shadow-[2px_2px_0px_#000000]">
          {glStatus}
        </span>
      </div>
    </div>
  );
};
