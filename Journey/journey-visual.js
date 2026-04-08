(function () {
  "use strict";

  function createJourneyVisual(options) {
    if (!options || !options.canvas || typeof THREE === "undefined") {
      return null;
    }

    const canvas = options.canvas;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      260
    );
    camera.position.set(0, 0, 34);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.42);
    scene.add(ambientLight);

    const warmLight = new THREE.PointLight(0xffa35c, 1.2, 180);
    warmLight.position.set(14, 12, 24);
    scene.add(warmLight);

    const softLight = new THREE.PointLight(0xffd8a8, 0.7, 160);
    softLight.position.set(-16, -8, 20);
    scene.add(softLight);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const dustGroup = new THREE.Group();
    const lineGroup = new THREE.Group();
    const ringGroup = new THREE.Group();

    masterGroup.add(dustGroup);
    masterGroup.add(lineGroup);
    masterGroup.add(ringGroup);

    const isSmallScreen = window.innerWidth <= 700;
    const DUST_COUNT = isSmallScreen ? 90 : 160;
    const LINE_LIMIT = DUST_COUNT * 3;
    const BOUNDS = { x: 24, y: 34, z: 10 };

    const positions = new Float32Array(DUST_COUNT * 3);
    const basePositions = new Float32Array(DUST_COUNT * 3);
    const velocities = new Float32Array(DUST_COUNT * 3);
    const colors = new Float32Array(DUST_COUNT * 3);

    for (let i = 0; i < DUST_COUNT; i++) {
      const i3 = i * 3;

      const px = (Math.random() - 0.5) * BOUNDS.x * 2;
      const py = (Math.random() - 0.5) * BOUNDS.y * 2;
      const pz = (Math.random() - 0.5) * BOUNDS.z * 2;

      positions[i3] = px;
      positions[i3 + 1] = py;
      positions[i3 + 2] = pz;

      basePositions[i3] = px;
      basePositions[i3 + 1] = py;
      basePositions[i3 + 2] = pz;

      velocities[i3] = (Math.random() - 0.5) * 0.004;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.006;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.003;

      colors[i3] = 1.0;
      colors[i3 + 1] = 0.76 + Math.random() * 0.08;
      colors[i3 + 2] = 0.56 + Math.random() * 0.05;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.11,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const dustPoints = new THREE.Points(dustGeometry, dustMaterial);
    dustGroup.add(dustPoints);

    const linePositions = new Float32Array(LINE_LIMIT * 6);
    const lineColors = new Float32Array(LINE_LIMIT * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.06,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    lineGroup.add(lineSegments);

    const ringConfigs = [
      { radius: 8.5, color: 0xffa35c, opacity: 0.055, speed: 0.0015, x: 1.0, y: 0.12 },
      { radius: 13.5, color: 0xffd8a8, opacity: 0.045, speed: -0.0012, x: 0.34, y: 1.0 }
    ];

    const rings = ringConfigs.map(function (config) {
      const geometry = new THREE.TorusGeometry(config.radius, 0.02, 8, 120);
      const material = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: config.opacity,
        wireframe: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = config.x;
      mesh.rotation.y = config.y;
      ringGroup.add(mesh);

      return {
        mesh: mesh,
        speed: config.speed
      };
    });

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    const clock = new THREE.Clock();
    let animationFrameId = null;
    let scrollOffset = 0;

    const modeProfiles = {
      overview: {
        dustOpacity: 0.34,
        lineOpacity: 0.06,
        lineDistance: 3.8,
        ringOpacity: 0.05,
        ringScale: 1,
        spin: 0.55
      },
      hover: {
        dustOpacity: 0.42,
        lineOpacity: 0.085,
        lineDistance: 4.3,
        ringOpacity: 0.07,
        ringScale: 1.03,
        spin: 0.72
      }
    };

    let modeTarget = modeProfiles.overview;

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll);

    resize();
    animationFrameId = requestAnimationFrame(animate);

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    function onMouseMove(event) {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;

      mouse.targetX = (event.clientX / width - 0.5) * 2;
      mouse.targetY = (event.clientY / height - 0.5) * 2;
    }

    function onMouseLeave() {
      mouse.targetX = 0;
      mouse.targetY = 0;
    }

    function onScroll() {
      scrollOffset = window.scrollY || 0;
    }

    function updateDust(elapsed) {
      const positionAttr = dustGeometry.getAttribute("position");
      const arr = positionAttr.array;

      for (let i = 0; i < DUST_COUNT; i++) {
        const i3 = i * 3;

        arr[i3] += velocities[i3];
        arr[i3 + 1] += velocities[i3 + 1];
        arr[i3 + 2] += velocities[i3 + 2];

        if (arr[i3] > BOUNDS.x || arr[i3] < -BOUNDS.x) {
          velocities[i3] *= -1;
        }

        if (arr[i3 + 1] > BOUNDS.y || arr[i3 + 1] < -BOUNDS.y) {
          velocities[i3 + 1] *= -1;
        }

        if (arr[i3 + 2] > BOUNDS.z || arr[i3 + 2] < -BOUNDS.z) {
          velocities[i3 + 2] *= -1;
        }

        const wave = Math.sin(elapsed * 0.24 + i * 0.02) * 0.0014 * modeTarget.spin;
        arr[i3] += wave;
        arr[i3 + 1] += wave * 0.6;

        arr[i3] += (basePositions[i3] - arr[i3]) * 0.00055;
        arr[i3 + 1] += (basePositions[i3 + 1] - arr[i3 + 1]) * 0.00055;
      }

      dustMaterial.opacity += (modeTarget.dustOpacity - dustMaterial.opacity) * 0.05;
      positionAttr.needsUpdate = true;
    }

    function updateConnections() {
      const particleArray = dustGeometry.getAttribute("position").array;
      let writeIndex = 0;
      let colorIndex = 0;
      let lineCount = 0;

      for (let i = 0; i < DUST_COUNT; i++) {
        const ax = particleArray[i * 3];
        const ay = particleArray[i * 3 + 1];
        const az = particleArray[i * 3 + 2];

        for (let j = i + 1; j < DUST_COUNT; j++) {
          const bx = particleArray[j * 3];
          const by = particleArray[j * 3 + 1];
          const bz = particleArray[j * 3 + 2];

          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < modeTarget.lineDistance && lineCount < LINE_LIMIT) {
            linePositions[writeIndex++] = ax;
            linePositions[writeIndex++] = ay;
            linePositions[writeIndex++] = az;
            linePositions[writeIndex++] = bx;
            linePositions[writeIndex++] = by;
            linePositions[writeIndex++] = bz;

            const strength = 1 - distance / modeTarget.lineDistance;

            lineColors[colorIndex++] = 1.0 * strength;
            lineColors[colorIndex++] = 0.72 * strength;
            lineColors[colorIndex++] = 0.52 * strength;

            lineColors[colorIndex++] = 1.0 * strength;
            lineColors[colorIndex++] = 0.84 * strength;
            lineColors[colorIndex++] = 0.70 * strength;

            lineCount += 2;
          }
        }
      }

      lineMaterial.opacity += (modeTarget.lineOpacity - lineMaterial.opacity) * 0.05;
      lineGeometry.setDrawRange(0, lineCount);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
    }

    function updateRings() {
      rings.forEach(function (ring) {
        ring.mesh.material.opacity += (modeTarget.ringOpacity - ring.mesh.material.opacity) * 0.05;
        ring.mesh.scale.lerp(
          new THREE.Vector3(modeTarget.ringScale, modeTarget.ringScale, modeTarget.ringScale),
          0.04
        );
        ring.mesh.rotation.z += ring.speed * modeTarget.spin;
      });
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;

      updateDust(elapsed);
      updateConnections();
      updateRings();

      const scrollShift = scrollOffset * -0.00035;
      camera.position.y += (scrollShift - camera.position.y) * 0.04;

      masterGroup.rotation.y += 0.00018 * modeTarget.spin;
      masterGroup.rotation.x += 0.00008 * modeTarget.spin;

      masterGroup.rotation.y += mouse.x * 0.0016;
      masterGroup.rotation.x += -mouse.y * 0.0012;

      masterGroup.position.x += ((mouse.x * 2.4) - masterGroup.position.x) * 0.03;
      masterGroup.position.y += (((-mouse.y * 1.8)) - masterGroup.position.y) * 0.03;

      dustGroup.rotation.z += 0.00006 * modeTarget.spin;
      ringGroup.rotation.x += 0.00008 * modeTarget.spin;

      renderer.render(scene, camera);
    }

    function setMode(modeName) {
      modeTarget = modeProfiles[modeName] || modeProfiles.overview;
    }

    function destroy() {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);

      scene.traverse(function (object) {
        if (object.geometry) {
          object.geometry.dispose();
        }

        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(function (material) {
              material.dispose();
            });
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
    }

    return {
      destroy: destroy,
      setMode: setMode
    };
  }

  window.createJourneyVisual = createJourneyVisual;
})();