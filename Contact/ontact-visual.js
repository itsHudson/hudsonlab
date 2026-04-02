(function () {
  "use strict";

  function createContactQuantumRelay(options) {
    if (!options || !options.canvas || typeof THREE === "undefined") {
      return null;
    }

    const canvas = options.canvas;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 400);
    camera.position.set(0, 0, 24);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.46);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x6ceaff, 2.4, 220);
    cyanLight.position.set(16, 10, 30);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8f68ff, 2.0, 220);
    violetLight.position.set(-18, -10, 24);
    scene.add(violetLight);

    const amberLight = new THREE.PointLight(0xffa248, 1.5, 180);
    amberLight.position.set(0, 14, 18);
    scene.add(amberLight);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const coreGroup = new THREE.Group();
    const particleGroup = new THREE.Group();
    const lineGroup = new THREE.Group();
    const shardGroup = new THREE.Group();
    const beaconGroup = new THREE.Group();

    masterGroup.add(coreGroup);
    masterGroup.add(particleGroup);
    masterGroup.add(lineGroup);
    masterGroup.add(shardGroup);
    masterGroup.add(beaconGroup);

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    let scrollOffset = 0;
    let currentMode = "overview";

    /* =========================
       QUANTUM CORE
       ========================= */

    const coreSphereGeometry = new THREE.IcosahedronGeometry(1.65, 1);
    const coreSphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x6ceaff,
      wireframe: true,
      transparent: true,
      opacity: 0.34
    });

    const coreSphere = new THREE.Mesh(coreSphereGeometry, coreSphereMaterial);
    coreGroup.add(coreSphere);

    const innerSphereGeometry = new THREE.SphereGeometry(0.72, 24, 24);
    const innerSphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2
    });

    const innerSphere = new THREE.Mesh(innerSphereGeometry, innerSphereMaterial);
    coreGroup.add(innerSphere);

    const torusA = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.06, 18, 200),
      new THREE.MeshBasicMaterial({
        color: 0x6ceaff,
        wireframe: true,
        transparent: true,
        opacity: 0.22
      })
    );
    torusA.rotation.x = 1.18;
    coreGroup.add(torusA);

    const torusB = new THREE.Mesh(
      new THREE.TorusGeometry(4.9, 0.05, 18, 200),
      new THREE.MeshBasicMaterial({
        color: 0x8f68ff,
        wireframe: true,
        transparent: true,
        opacity: 0.18
      })
    );
    torusB.rotation.y = 0.9;
    torusB.rotation.x = 0.38;
    coreGroup.add(torusB);

    const torusC = new THREE.Mesh(
      new THREE.TorusGeometry(6.8, 0.04, 18, 200),
      new THREE.MeshBasicMaterial({
        color: 0xffa248,
        wireframe: true,
        transparent: true,
        opacity: 0.10
      })
    );
    torusC.rotation.x = 1.36;
    torusC.rotation.z = 0.6;
    coreGroup.add(torusC);

    /* =========================
       RECEIVER BEACONS
       ========================= */

    const beaconPositions = [
      new THREE.Vector3(-8.6, -2.2, 1.4),
      new THREE.Vector3(0, 5.4, -1.0),
      new THREE.Vector3(8.8, -2.1, 1.6)
    ];

    const beaconColors = [0x6ceaff, 0x8f68ff, 0xffa248];
    const beacons = [];

    beaconPositions.forEach(function (position, index) {
      const orb = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 14, 14),
        new THREE.MeshBasicMaterial({
          color: beaconColors[index],
          transparent: true,
          opacity: 0.95
        })
      );
      orb.position.copy(position);
      beaconGroup.add(orb);

      const halo = new THREE.Mesh(
        new THREE.RingGeometry(0.42, 0.52, 48),
        new THREE.MeshBasicMaterial({
          color: beaconColors[index],
          transparent: true,
          opacity: 0.26,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending
        })
      );
      halo.position.copy(position);
      halo.lookAt(camera.position);
      beaconGroup.add(halo);

      beacons.push({
        orb: orb,
        halo: halo
      });
    });

    /* =========================
       PARTICLES
       ========================= */

    const POINT_COUNT = window.innerWidth <= 640 ? 280 : 620;
    const CONNECTION_LIMIT = POINT_COUNT * 6;
    const BOUNDS = { x: 22, y: 15, z: 16 };

    const positions = new Float32Array(POINT_COUNT * 3);
    const basePositions = new Float32Array(POINT_COUNT * 3);
    const velocities = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);

    for (let i = 0; i < POINT_COUNT; i++) {
      const i3 = i * 3;

      const radius = 6 + Math.random() * 13;
      const angle = Math.random() * Math.PI * 2;
      const spreadY = (Math.random() - 0.5) * 22;
      const depth = (Math.random() - 0.5) * BOUNDS.z * 2;

      const px = Math.cos(angle) * radius + (Math.random() - 0.5) * 6;
      const py = spreadY;
      const pz = depth;

      positions[i3] = px;
      positions[i3 + 1] = py;
      positions[i3 + 2] = pz;

      basePositions[i3] = px;
      basePositions[i3 + 1] = py;
      basePositions[i3 + 2] = pz;

      velocities[i3] = (Math.random() - 0.5) * 0.016;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.016;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.008;

      const mixMode = Math.random();
      if (mixMode < 0.48) {
        colors[i3] = 0.42;
        colors[i3 + 1] = 0.92;
        colors[i3 + 2] = 1.0;
      } else if (mixMode < 0.82) {
        colors[i3] = 0.56;
        colors[i3 + 1] = 0.41;
        colors[i3 + 2] = 1.0;
      } else {
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.66;
        colors[i3 + 2] = 0.34;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.13,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
    particleGroup.add(particlePoints);

    const linePositions = new Float32Array(CONNECTION_LIMIT * 6);
    const lineColors = new Float32Array(CONNECTION_LIMIT * 6);

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

    /* =========================
       SHARDS
       ========================= */

    const shards = [];
    const shardGeometries = [
      new THREE.BoxGeometry(0.05, 1.9, 0.72),
      new THREE.BoxGeometry(0.72, 0.05, 1.9),
      new THREE.OctahedronGeometry(0.36, 0)
    ];

    for (let i = 0; i < 18; i++) {
      const geometry = shardGeometries[i % shardGeometries.length];
      const material = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0x6ceaff : i % 3 === 1 ? 0x8f68ff : 0xffa248,
        wireframe: true,
        transparent: true,
        opacity: 0.16
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 16
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      shardGroup.add(mesh);

      shards.push({
        mesh: mesh,
        driftX: (Math.random() - 0.5) * 0.009,
        driftY: (Math.random() - 0.5) * 0.009,
        driftZ: (Math.random() - 0.5) * 0.006,
        rotX: (Math.random() - 0.5) * 0.018,
        rotY: (Math.random() - 0.5) * 0.018,
        rotZ: (Math.random() - 0.5) * 0.018
      });
    }

    /* =========================
       MODES
       ========================= */

    const modeProfiles = {
      overview: {
        connectionDistance: 2.8,
        lineOpacity: 0.18,
        particleOpacity: 0.86,
        ringScale: 1,
        ringOpacityA: 0.22,
        ringOpacityB: 0.18,
        ringOpacityC: 0.10,
        shardOpacity: 0.16,
        coreGlow: 0.20,
        activeBeacon: -1
      },
      email: {
        connectionDistance: 3.2,
        lineOpacity: 0.24,
        particleOpacity: 0.94,
        ringScale: 1.05,
        ringOpacityA: 0.28,
        ringOpacityB: 0.18,
        ringOpacityC: 0.10,
        shardOpacity: 0.20,
        coreGlow: 0.26,
        activeBeacon: 0
      },
      linkedin: {
        connectionDistance: 3.0,
        lineOpacity: 0.22,
        particleOpacity: 0.90,
        ringScale: 1.04,
        ringOpacityA: 0.20,
        ringOpacityB: 0.26,
        ringOpacityC: 0.12,
        shardOpacity: 0.18,
        coreGlow: 0.23,
        activeBeacon: 1
      },
      github: {
        connectionDistance: 3.35,
        lineOpacity: 0.26,
        particleOpacity: 0.96,
        ringScale: 1.08,
        ringOpacityA: 0.20,
        ringOpacityB: 0.16,
        ringOpacityC: 0.22,
        shardOpacity: 0.22,
        coreGlow: 0.28,
        activeBeacon: 2
      }
    };

    let modeTarget = modeProfiles.overview;

    const clock = new THREE.Clock();
    let animationFrameId = null;

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

    function updateParticles(elapsed) {
      const attr = particleGeometry.getAttribute("position");
      const arr = attr.array;

      for (let i = 0; i < POINT_COUNT; i++) {
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

        const swirl = Math.sin(elapsed * 0.42 + i * 0.011) * 0.0024;
        arr[i3] += swirl;
        arr[i3 + 1] += swirl * 0.7;

        arr[i3] += (basePositions[i3] - arr[i3]) * 0.00032;
        arr[i3 + 1] += (basePositions[i3 + 1] - arr[i3 + 1]) * 0.00032;
      }

      particleMaterial.opacity += (modeTarget.particleOpacity - particleMaterial.opacity) * 0.05;
      attr.needsUpdate = true;
    }

    function updateConnections() {
      const particleArray = particleGeometry.getAttribute("position").array;
      let writeIndex = 0;
      let colorIndex = 0;
      let lineCount = 0;

      for (let i = 0; i < POINT_COUNT; i++) {
        const ax = particleArray[i * 3];
        const ay = particleArray[i * 3 + 1];
        const az = particleArray[i * 3 + 2];

        for (let j = i + 1; j < POINT_COUNT; j++) {
          const bx = particleArray[j * 3];
          const by = particleArray[j * 3 + 1];
          const bz = particleArray[j * 3 + 2];

          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < modeTarget.connectionDistance && lineCount < CONNECTION_LIMIT) {
            linePositions[writeIndex++] = ax;
            linePositions[writeIndex++] = ay;
            linePositions[writeIndex++] = az;
            linePositions[writeIndex++] = bx;
            linePositions[writeIndex++] = by;
            linePositions[writeIndex++] = bz;

            const strength = 1 - distance / modeTarget.connectionDistance;

            lineColors[colorIndex++] = 0.42 * strength;
            lineColors[colorIndex++] = 0.92 * strength;
            lineColors[colorIndex++] = 1.0 * strength;

            lineColors[colorIndex++] = 0.56 * strength;
            lineColors[colorIndex++] = 0.41 * strength;
            lineColors[colorIndex++] = 1.0 * strength;

            lineCount += 2;
          }
        }
      }

      lineMaterial.opacity += (modeTarget.lineOpacity - lineMaterial.opacity) * 0.05;
      lineGeometry.setDrawRange(0, lineCount);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
    }

    function updateCore(elapsed) {
      coreSphere.rotation.x += 0.0042;
      coreSphere.rotation.y += 0.0056;
      coreSphere.rotation.z += 0.0034;

      innerSphere.scale.setScalar(1 + Math.sin(elapsed * 2.2) * 0.08);
      innerSphereMaterial.opacity += (modeTarget.coreGlow - innerSphereMaterial.opacity) * 0.05;

      const ringScale = modeTarget.ringScale;
      torusA.scale.lerp(new THREE.Vector3(ringScale, ringScale, ringScale), 0.05);
      torusB.scale.lerp(new THREE.Vector3(ringScale, ringScale, ringScale), 0.05);
      torusC.scale.lerp(new THREE.Vector3(ringScale, ringScale, ringScale), 0.05);

      torusA.material.opacity += (modeTarget.ringOpacityA - torusA.material.opacity) * 0.05;
      torusB.material.opacity += (modeTarget.ringOpacityB - torusB.material.opacity) * 0.05;
      torusC.material.opacity += (modeTarget.ringOpacityC - torusC.material.opacity) * 0.05;

      torusA.rotation.z += 0.0052;
      torusB.rotation.y -= 0.0042;
      torusC.rotation.x += 0.0026;
    }

    function updateShards() {
      shards.forEach(function (item) {
        item.mesh.position.x += item.driftX;
        item.mesh.position.y += item.driftY;
        item.mesh.position.z += item.driftZ;

        item.mesh.rotation.x += item.rotX;
        item.mesh.rotation.y += item.rotY;
        item.mesh.rotation.z += item.rotZ;

        if (item.mesh.position.x > 13 || item.mesh.position.x < -13) {
          item.driftX *= -1;
        }

        if (item.mesh.position.y > 10 || item.mesh.position.y < -10) {
          item.driftY *= -1;
        }

        if (item.mesh.position.z > 12 || item.mesh.position.z < -12) {
          item.driftZ *= -1;
        }

        item.mesh.material.opacity += (modeTarget.shardOpacity - item.mesh.material.opacity) * 0.05;
      });
    }

    function updateBeacons(elapsed) {
      beacons.forEach(function (beacon, index) {
        const isActive = index === modeTarget.activeBeacon;
        const pulse = 1 + Math.sin(elapsed * 3.0 + index) * 0.12;

        beacon.orb.scale.setScalar(isActive ? pulse * 1.4 : pulse * 0.92);
        beacon.halo.scale.setScalar(isActive ? 1.22 : 1.0);
        beacon.halo.lookAt(camera.position);

        beacon.orb.material.opacity += ((isActive ? 1.0 : 0.62) - beacon.orb.material.opacity) * 0.08;
        beacon.halo.material.opacity += ((isActive ? 0.44 : 0.18) - beacon.halo.material.opacity) * 0.08;
      });
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      updateParticles(elapsed);
      updateConnections();
      updateCore(elapsed);
      updateShards();
      updateBeacons(elapsed);

      const scrollShift = scrollOffset * -0.00035;
      camera.position.y += (scrollShift - camera.position.y) * 0.04;

      masterGroup.rotation.y += 0.00042;
      masterGroup.rotation.x += 0.00018;

      masterGroup.rotation.y += mouse.x * 0.0044;
      masterGroup.rotation.x += -mouse.y * 0.0034;

      masterGroup.position.x += ((mouse.x * 3.4) - masterGroup.position.x) * 0.04;
      masterGroup.position.y += (((-mouse.y * 2.6)) - masterGroup.position.y) * 0.04;

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

  window.createContactQuantumRelay = createContactQuantumRelay;
})();