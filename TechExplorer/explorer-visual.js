(function () {
  "use strict";

  function createExplorerVisual(options) {
    if (!options || !options.canvas || typeof THREE === "undefined") {
      return null;
    }

    const canvas = options.canvas;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(56, window.innerWidth / window.innerHeight, 0.1, 420);
    camera.position.set(0, 0, 42);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.72);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x6ae8ff, 2.8, 260);
    cyanLight.position.set(20, 14, 36);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 2.6, 260);
    violetLight.position.set(-22, -10, 42);
    scene.add(violetLight);

    const limeLight = new THREE.PointLight(0xd2ff4d, 1.2, 180);
    limeLight.position.set(0, 18, 18);
    scene.add(limeLight);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const starGroup = new THREE.Group();
    const beamGroup = new THREE.Group();
    const ringGroup = new THREE.Group();
    const glyphGroup = new THREE.Group();
    const waveGroup = new THREE.Group();

    masterGroup.add(starGroup);
    masterGroup.add(beamGroup);
    masterGroup.add(ringGroup);
    masterGroup.add(glyphGroup);
    masterGroup.add(waveGroup);

    const isSmallScreen = window.innerWidth <= 720;
    const STAR_COUNT = isSmallScreen ? 420 : 980;
    const CONNECTION_LIMIT = STAR_COUNT * 7;
    const BOUNDS = { x: 36, y: 64, z: 24 };

    const positions = new Float32Array(STAR_COUNT * 3);
    const basePositions = new Float32Array(STAR_COUNT * 3);
    const velocities = new Float32Array(STAR_COUNT * 3);
    const colors = new Float32Array(STAR_COUNT * 3);

    for (let i = 0; i < STAR_COUNT; i++) {
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

      velocities[i3] = (Math.random() - 0.5) * 0.018;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.018;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

      const r = Math.random();
      if (r < 0.48) {
        colors[i3] = 0.42;
        colors[i3 + 1] = 0.93;
        colors[i3 + 2] = 1.0;
      } else if (r < 0.84) {
        colors[i3] = 0.55;
        colors[i3 + 1] = 0.36;
        colors[i3 + 2] = 0.96;
      } else {
        colors[i3] = 0.82;
        colors[i3 + 1] = 1.0;
        colors[i3 + 2] = 0.3;
      }
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.18,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    starGroup.add(starPoints);

    const linePositions = new Float32Array(CONNECTION_LIMIT * 6);
    const lineColors = new Float32Array(CONNECTION_LIMIT * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.24,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    starGroup.add(lineSegments);

    const radarPlaneGeometry = new THREE.CircleGeometry(14, 96);
    const radarPlaneMaterial = new THREE.MeshBasicMaterial({
      color: 0x6ae8ff,
      transparent: true,
      opacity: 0.045,
      side: THREE.DoubleSide
    });
    const radarPlane = new THREE.Mesh(radarPlaneGeometry, radarPlaneMaterial);
    radarPlane.rotation.x = Math.PI / 2;
    radarPlane.position.y = -12;
    waveGroup.add(radarPlane);

    const sweepGeometry = new THREE.CircleGeometry(18, 64, 0, Math.PI / 5);
    const sweepMaterial = new THREE.MeshBasicMaterial({
      color: 0x6ae8ff,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });
    const sweep = new THREE.Mesh(sweepGeometry, sweepMaterial);
    sweep.rotation.x = Math.PI / 2;
    sweep.position.y = -12;
    waveGroup.add(sweep);

    const ringConfigs = [
      { radius: 9, tube: 0.04, color: 0x6ae8ff, x: 0.9, y: 0.2, speed: 0.007 },
      { radius: 13, tube: 0.03, color: 0x8b5cf6, x: 0.25, y: 1.1, speed: -0.005 },
      { radius: 18, tube: 0.025, color: 0xd2ff4d, x: 1.18, y: 0.1, speed: 0.003 }
    ];

    const rings = ringConfigs.map(function (config) {
      const geometry = new THREE.TorusGeometry(config.radius, config.tube, 14, 180);
      const material = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.22,
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

    const glyphs = [];
    const glyphGeoA = new THREE.OctahedronGeometry(0.8, 0);
    const glyphGeoB = new THREE.IcosahedronGeometry(0.6, 0);

    for (let i = 0; i < 18; i++) {
      const geometry = i % 2 === 0 ? glyphGeoA : glyphGeoB;
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x8b5cf6 : 0x6ae8ff,
        wireframe: true,
        transparent: true,
        opacity: 0.22
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 18
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      mesh.scale.setScalar(0.9 + Math.random() * 1.6);
      glyphGroup.add(mesh);

      glyphs.push({
        mesh: mesh,
        driftX: (Math.random() - 0.5) * 0.012,
        driftY: (Math.random() - 0.5) * 0.012,
        driftZ: (Math.random() - 0.5) * 0.009,
        rotX: (Math.random() - 0.5) * 0.03,
        rotY: (Math.random() - 0.5) * 0.03,
        rotZ: (Math.random() - 0.5) * 0.03
      });
    }

    const beamGeometry = new THREE.CylinderGeometry(0.02, 0.02, 42, 8, 1, true);
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0x6ae8ff,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending
    });

    const beams = [];
    for (let i = 0; i < 6; i++) {
      const beam = new THREE.Mesh(beamGeometry, beamMaterial.clone());
      beam.position.set(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8
      );
      beam.rotation.z = Math.random() * Math.PI;
      beam.rotation.x = Math.random() * Math.PI * 0.4;
      beamGroup.add(beam);
      beams.push(beam);
    }

    const pulseGeometry = new THREE.RingGeometry(4.5, 4.8, 120);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });

    const pulseRing = new THREE.Mesh(pulseGeometry, pulseMaterial);
    pulseRing.rotation.x = Math.PI / 2;
    pulseRing.position.y = -12;
    waveGroup.add(pulseRing);

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    const clock = new THREE.Clock();
    let animationFrameId = null;
    let scrollOffset = 0;
    let currentMode = "overview";
    let lastPulseTime = 0;

    const modeProfiles = {
      overview: {
        starOpacity: 0.9,
        lineOpacity: 0.22,
        distance: 4.6,
        ringOpacity: 0.22,
        ringScale: 1,
        glyphOpacity: 0.22,
        beamOpacity: 0.12,
        sweepOpacity: 0.16,
        pulseColor: 0x8b5cf6,
        spin: 1
      },
      data: {
        starOpacity: 0.98,
        lineOpacity: 0.34,
        distance: 5.4,
        ringOpacity: 0.28,
        ringScale: 0.94,
        glyphOpacity: 0.14,
        beamOpacity: 0.08,
        sweepOpacity: 0.18,
        pulseColor: 0x6ae8ff,
        spin: 0.9
      },
      environment: {
        starOpacity: 0.88,
        lineOpacity: 0.18,
        distance: 4.1,
        ringOpacity: 0.18,
        ringScale: 1.04,
        glyphOpacity: 0.2,
        beamOpacity: 0.14,
        sweepOpacity: 0.1,
        pulseColor: 0xd2ff4d,
        spin: 0.72
      },
      workflow: {
        starOpacity: 0.96,
        lineOpacity: 0.28,
        distance: 5.0,
        ringOpacity: 0.3,
        ringScale: 1.08,
        glyphOpacity: 0.26,
        beamOpacity: 0.18,
        sweepOpacity: 0.16,
        pulseColor: 0x8b5cf6,
        spin: 1.2
      },
      language: {
        starOpacity: 1,
        lineOpacity: 0.36,
        distance: 5.8,
        ringOpacity: 0.34,
        ringScale: 1.12,
        glyphOpacity: 0.28,
        beamOpacity: 0.16,
        sweepOpacity: 0.2,
        pulseColor: 0x6ae8ff,
        spin: 1.3
      },
      drag: {
        starOpacity: 1,
        lineOpacity: 0.32,
        distance: 6.0,
        ringOpacity: 0.38,
        ringScale: 1.16,
        glyphOpacity: 0.32,
        beamOpacity: 0.2,
        sweepOpacity: 0.24,
        pulseColor: 0x6ae8ff,
        spin: 1.55
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

    function updateStars(elapsed) {
      const positionAttr = starGeometry.getAttribute("position");
      const arr = positionAttr.array;

      for (let i = 0; i < STAR_COUNT; i++) {
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

        const swirl = 0.002 * modeTarget.spin;
        const angle = elapsed * 0.18 + i * 0.011;

        arr[i3] += Math.cos(angle) * swirl;
        arr[i3 + 1] += Math.sin(angle) * swirl;

        arr[i3] += (basePositions[i3] - arr[i3]) * 0.00048;
        arr[i3 + 1] += (basePositions[i3 + 1] - arr[i3 + 1]) * 0.00048;
      }

      starMaterial.opacity += (modeTarget.starOpacity - starMaterial.opacity) * 0.04;
      positionAttr.needsUpdate = true;
    }

    function updateConnections() {
      const particleArray = starGeometry.getAttribute("position").array;
      let writeIndex = 0;
      let colorIndex = 0;
      let lineCount = 0;

      for (let i = 0; i < STAR_COUNT; i++) {
        const ax = particleArray[i * 3];
        const ay = particleArray[i * 3 + 1];
        const az = particleArray[i * 3 + 2];

        for (let j = i + 1; j < STAR_COUNT; j++) {
          const bx = particleArray[j * 3];
          const by = particleArray[j * 3 + 1];
          const bz = particleArray[j * 3 + 2];

          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < modeTarget.distance && lineCount < CONNECTION_LIMIT) {
            linePositions[writeIndex++] = ax;
            linePositions[writeIndex++] = ay;
            linePositions[writeIndex++] = az;
            linePositions[writeIndex++] = bx;
            linePositions[writeIndex++] = by;
            linePositions[writeIndex++] = bz;

            const strength = 1 - distance / modeTarget.distance;

            lineColors[colorIndex++] = 0.42 * strength;
            lineColors[colorIndex++] = 0.93 * strength;
            lineColors[colorIndex++] = 1.0 * strength;
            lineColors[colorIndex++] = 0.55 * strength;
            lineColors[colorIndex++] = 0.36 * strength;
            lineColors[colorIndex++] = 0.96 * strength;

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
          0.05
        );
        ring.mesh.rotation.z += ring.speed * modeTarget.spin;
      });
    }

    function updateGlyphs() {
      glyphs.forEach(function (item) {
        item.mesh.position.x += item.driftX * modeTarget.spin;
        item.mesh.position.y += item.driftY * modeTarget.spin;
        item.mesh.position.z += item.driftZ * modeTarget.spin;

        item.mesh.rotation.x += item.rotX * modeTarget.spin;
        item.mesh.rotation.y += item.rotY * modeTarget.spin;
        item.mesh.rotation.z += item.rotZ * modeTarget.spin;

        if (item.mesh.position.x > 16 || item.mesh.position.x < -16) {
          item.driftX *= -1;
        }

        if (item.mesh.position.y > 14 || item.mesh.position.y < -14) {
          item.driftY *= -1;
        }

        if (item.mesh.position.z > 14 || item.mesh.position.z < -14) {
          item.driftZ *= -1;
        }

        item.mesh.material.opacity += (modeTarget.glyphOpacity - item.mesh.material.opacity) * 0.05;
      });
    }

    function updateBeams(elapsed) {
      beams.forEach(function (beam, index) {
        beam.material.opacity += (modeTarget.beamOpacity - beam.material.opacity) * 0.05;
        beam.rotation.y += 0.003 * modeTarget.spin;
        beam.position.y = Math.sin(elapsed * 0.8 + index) * 6;
      });
    }

    function updateSweep(elapsed) {
      sweepMaterial.opacity += (modeTarget.sweepOpacity - sweepMaterial.opacity) * 0.05;
      sweep.rotation.z -= 0.018 * modeTarget.spin;
      radarPlaneMaterial.opacity += ((modeTarget.sweepOpacity * 0.28) - radarPlaneMaterial.opacity) * 0.05;

      const elapsedSincePulse = elapsed - lastPulseTime;
      if (elapsedSincePulse > 3.2) {
        lastPulseTime = elapsed;
        pulseMaterial.opacity = 0.42;
        pulseMaterial.color.setHex(modeTarget.pulseColor);
        pulseRing.scale.set(1, 1, 1);
      }

      pulseRing.scale.multiplyScalar(1.034);
      pulseMaterial.opacity *= 0.964;
      pulseRing.rotation.z += 0.012 * modeTarget.spin;
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      updateStars(elapsed);
      updateConnections();
      updateRings();
      updateGlyphs();
      updateBeams(elapsed);
      updateSweep(elapsed);

      const scrollShift = scrollOffset * -0.001;
      camera.position.y += (scrollShift - camera.position.y) * 0.04;

      masterGroup.rotation.y += 0.00055 * modeTarget.spin;
      masterGroup.rotation.x += 0.00028 * modeTarget.spin;

      masterGroup.rotation.y += mouse.x * 0.0048;
      masterGroup.rotation.x += -mouse.y * 0.0036;

      masterGroup.position.x += ((mouse.x * 5.2) - masterGroup.position.x) * 0.04;
      masterGroup.position.y += (((-mouse.y * 4.2)) - masterGroup.position.y) * 0.04;

      starGroup.rotation.z += 0.00042 * modeTarget.spin;
      beamGroup.rotation.x += 0.00028 * modeTarget.spin;
      glyphGroup.rotation.y -= 0.0011 * modeTarget.spin;

      renderer.render(scene, camera);
    }

    function setMode(modeName) {
      currentMode = modeName || "overview";
      modeTarget = modeProfiles[currentMode] || modeProfiles.overview;
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

  window.createExplorerVisual = createExplorerVisual;
})();