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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 420);
    camera.position.set(0, 0, 42);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.58);
    scene.add(ambientLight);

    const warmLight = new THREE.PointLight(0xffa35c, 2.4, 240);
    warmLight.position.set(18, 14, 30);
    scene.add(warmLight);

    const goldLight = new THREE.PointLight(0xffd8a8, 1.6, 220);
    goldLight.position.set(-18, -10, 28);
    scene.add(goldLight);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const shardGroup = new THREE.Group();
    const lineGroup = new THREE.Group();
    const ringGroup = new THREE.Group();
    const dustGroup = new THREE.Group();
    const pulseGroup = new THREE.Group();

    masterGroup.add(shardGroup);
    masterGroup.add(lineGroup);
    masterGroup.add(ringGroup);
    masterGroup.add(dustGroup);
    masterGroup.add(pulseGroup);

    const isSmallScreen = window.innerWidth <= 700;
    const DUST_COUNT = isSmallScreen ? 220 : 460;
    const LINE_LIMIT = DUST_COUNT * 5;
    const BOUNDS = { x: 30, y: 60, z: 18 };

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

      velocities[i3] = (Math.random() - 0.5) * 0.012;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.016;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.008;

      colors[i3] = 1.0;
      colors[i3 + 1] = 0.73 + Math.random() * 0.12;
      colors[i3 + 2] = 0.5 + Math.random() * 0.08;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    dustGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.16,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.92,
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
      opacity: 0.16,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    lineGroup.add(lineSegments);

    const ringConfigs = [
      { radius: 8, color: 0xffa35c, opacity: 0.14, speed: 0.0038, x: 1.0, y: 0.2 },
      { radius: 12, color: 0xffd8a8, opacity: 0.12, speed: -0.003, x: 0.24, y: 1.2 },
      { radius: 18, color: 0xffb264, opacity: 0.08, speed: 0.0022, x: 1.2, y: 0.1 }
    ];

    const rings = ringConfigs.map(function (config) {
      const geometry = new THREE.TorusGeometry(config.radius, 0.03, 10, 160);
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

    const shardGeoA = new THREE.BoxGeometry(0.8, 2.6, 0.04);
    const shardGeoB = new THREE.BoxGeometry(0.04, 2.8, 0.8);
    const shards = [];

    for (let i = 0; i < 16; i++) {
      const geometry = i % 2 === 0 ? shardGeoA : shardGeoB;
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xffd8a8 : 0xffa35c,
        wireframe: true,
        transparent: true,
        opacity: 0.12
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 18
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      shardGroup.add(mesh);

      shards.push({
        mesh: mesh,
        driftX: (Math.random() - 0.5) * 0.008,
        driftY: (Math.random() - 0.5) * 0.008,
        driftZ: (Math.random() - 0.5) * 0.006,
        rotX: (Math.random() - 0.5) * 0.02,
        rotY: (Math.random() - 0.5) * 0.02,
        rotZ: (Math.random() - 0.5) * 0.02
      });
    }

    const pulseGeo = new THREE.RingGeometry(4.5, 4.8, 96);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xffb264,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });

    const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
    pulseRing.rotation.x = Math.PI / 2;
    pulseRing.position.y = -12;
    pulseGroup.add(pulseRing);

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    const clock = new THREE.Clock();
    let scrollOffset = 0;
    let animationFrameId = null;
    let currentMode = "overview";
    let activeNodeNumber = 1;
    let lastPulseTime = 0;

    const modeProfiles = {
      overview: {
        dustOpacity: 0.72,
        lineOpacity: 0.12,
        lineDistance: 4.2,
        ringOpacity: 0.12,
        ringScale: 1,
        shardOpacity: 0.12,
        pulseStrength: 0.32,
        pulseColor: 0xffb264,
        spin: 0.8
      },
      hover: {
        dustOpacity: 0.88,
        lineOpacity: 0.18,
        lineDistance: 4.8,
        ringOpacity: 0.16,
        ringScale: 1.04,
        shardOpacity: 0.16,
        pulseStrength: 0.42,
        pulseColor: 0xffd8a8,
        spin: 1.02
      },
      machine_tilt: {
        dustOpacity: 0.94,
        lineOpacity: 0.2,
        lineDistance: 5.0,
        ringOpacity: 0.18,
        ringScale: 1.08,
        shardOpacity: 0.18,
        pulseStrength: 0.48,
        pulseColor: 0xffb264,
        spin: 1.12
      },
      node_active: {
        dustOpacity: 1,
        lineOpacity: 0.26,
        lineDistance: 5.6,
        ringOpacity: 0.22,
        ringScale: 1.12,
        shardOpacity: 0.22,
        pulseStrength: 0.6,
        pulseColor: 0xffd8a8,
        spin: 1.26
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

        const wave = Math.sin(elapsed * 0.4 + i * 0.014) * 0.0024 * modeTarget.spin;
        arr[i3] += wave;
        arr[i3 + 1] += wave * 0.8;

        arr[i3] += (basePositions[i3] - arr[i3]) * 0.00042;
        arr[i3 + 1] += (basePositions[i3 + 1] - arr[i3 + 1]) * 0.00042;
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
            lineColors[colorIndex++] = 0.5 * strength;

            lineColors[colorIndex++] = 1.0 * strength;
            lineColors[colorIndex++] = 0.84 * strength;
            lineColors[colorIndex++] = 0.68 * strength;

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

    function updateShards() {
      shards.forEach(function (item) {
        item.mesh.position.x += item.driftX * modeTarget.spin;
        item.mesh.position.y += item.driftY * modeTarget.spin;
        item.mesh.position.z += item.driftZ * modeTarget.spin;

        item.mesh.rotation.x += item.rotX * modeTarget.spin;
        item.mesh.rotation.y += item.rotY * modeTarget.spin;
        item.mesh.rotation.z += item.rotZ * modeTarget.spin;

        if (item.mesh.position.x > 14 || item.mesh.position.x < -14) {
          item.driftX *= -1;
        }

        if (item.mesh.position.y > 18 || item.mesh.position.y < -18) {
          item.driftY *= -1;
        }

        if (item.mesh.position.z > 12 || item.mesh.position.z < -12) {
          item.driftZ *= -1;
        }

        item.mesh.material.opacity += (modeTarget.shardOpacity - item.mesh.material.opacity) * 0.05;
      });
    }

    function updatePulse(elapsed) {
      const interval = Math.max(1.8, 4.2 - activeNodeNumber * 0.22);

      if (elapsed - lastPulseTime > interval) {
        lastPulseTime = elapsed;
        pulseMat.opacity = modeTarget.pulseStrength;
        pulseMat.color.setHex(modeTarget.pulseColor);
        pulseRing.scale.set(1, 1, 1);
      }

      pulseRing.scale.multiplyScalar(1.03);
      pulseMat.opacity *= 0.965;
      pulseRing.rotation.z += 0.008 * modeTarget.spin;
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      updateDust(elapsed);
      updateConnections();
      updateRings();
      updateShards();
      updatePulse(elapsed);

      const scrollShift = scrollOffset * -0.0008;
      camera.position.y += (scrollShift - camera.position.y) * 0.04;

      masterGroup.rotation.y += 0.00042 * modeTarget.spin;
      masterGroup.rotation.x += 0.00022 * modeTarget.spin;

      masterGroup.rotation.y += mouse.x * 0.0038;
      masterGroup.rotation.x += -mouse.y * 0.0028;

      masterGroup.position.x += ((mouse.x * 4.4) - masterGroup.position.x) * 0.04;
      masterGroup.position.y += (((-mouse.y * 3.6)) - masterGroup.position.y) * 0.04;

      shardGroup.rotation.y -= 0.0008 * modeTarget.spin;
      ringGroup.rotation.x += 0.00032 * modeTarget.spin;
      dustGroup.rotation.z += 0.00018 * modeTarget.spin;

      renderer.render(scene, camera);
    }

    function setMode(modeName, extra) {
      currentMode = modeName || "overview";
      modeTarget = modeProfiles[currentMode] || modeProfiles.overview;

      if (extra && extra.node) {
        activeNodeNumber = Number(extra.node) || 1;
      }
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