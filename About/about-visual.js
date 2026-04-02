(function () {
  "use strict";

  function createAboutSystemField(options) {
    if (!options || !options.canvas || typeof THREE === "undefined") {
      return null;
    }

    const canvas = options.canvas;
    const textTargetSelectors = Array.isArray(options.textTargets) ? options.textTargets : [];

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

    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 400);
    camera.position.set(0, 0, 40);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const orangeLight = new THREE.PointLight(0xff7a00, 2.8, 240);
    orangeLight.position.set(24, 16, 40);
    scene.add(orangeLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 2.6, 240);
    cyanLight.position.set(-24, -10, 36);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(0xffc400, 1.8, 220);
    goldLight.position.set(0, 24, 26);
    scene.add(goldLight);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const particleGroup = new THREE.Group();
    const ringGroup = new THREE.Group();
    const shardGroup = new THREE.Group();
    const burstGroup = new THREE.Group();

    masterGroup.add(particleGroup);
    masterGroup.add(ringGroup);
    masterGroup.add(shardGroup);
    masterGroup.add(burstGroup);

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    let scrollOffset = 0;
    let heroScrollProgress = 0;
    let heroDecompose = 0;
    let currentScene = "hero";
    let lastBurstTime = 0;

    const POINT_COUNT = window.innerWidth <= 640 ? 320 : 780;
    const BOUNDS = { x: 34, y: 60, z: 20 };
    const CONNECTION_LIMIT = POINT_COUNT * 8;

    const positions = new Float32Array(POINT_COUNT * 3);
    const basePositions = new Float32Array(POINT_COUNT * 3);
    const velocities = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);
    const sizes = new Float32Array(POINT_COUNT);

    for (let i = 0; i < POINT_COUNT; i++) {
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

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.009;

      const colorMode = Math.random();
      if (colorMode < 0.46) {
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.48 + Math.random() * 0.24;
        colors[i3 + 2] = 0.0;
      } else if (colorMode < 0.82) {
        colors[i3] = 0.04;
        colors[i3 + 1] = 0.88 + Math.random() * 0.12;
        colors[i3 + 2] = 1.0;
      } else {
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.82 + Math.random() * 0.12;
        colors[i3 + 2] = 0.16;
      }

      sizes[i] = 0.6 + Math.random() * 1.8;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.26,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particleGroup.add(particles);

    const linePositions = new Float32Array(CONNECTION_LIMIT * 6);
    const lineColors = new Float32Array(CONNECTION_LIMIT * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.42,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    particleGroup.add(lineSegments);

    const ringConfigs = [
      { radius: 11, tube: 0.05, color: 0x00e5ff, rotationSpeed: 0.008, tiltX: 0.85, tiltY: 0.2 },
      { radius: 15, tube: 0.05, color: 0xff7a00, rotationSpeed: -0.006, tiltX: 0.28, tiltY: 1.1 },
      { radius: 19, tube: 0.03, color: 0xffd54f, rotationSpeed: 0.004, tiltX: 1.2, tiltY: 0.1 }
    ];

    const rings = ringConfigs.map(function (config) {
      const geometry = new THREE.TorusGeometry(config.radius, config.tube, 14, 180);
      const material = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.35,
        wireframe: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = config.tiltX;
      mesh.rotation.y = config.tiltY;
      ringGroup.add(mesh);

      return {
        mesh: mesh,
        speed: config.rotationSpeed
      };
    });

    const shardGeometry = new THREE.TetrahedronGeometry(0.75, 0);
    const shards = [];

    for (let i = 0; i < 26; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00e5ff : 0xff8a00,
        wireframe: true,
        transparent: true,
        opacity: 0.38
      });

      const shard = new THREE.Mesh(shardGeometry, material);
      shard.position.set(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 18
      );
      shard.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      shard.scale.setScalar(0.8 + Math.random() * 1.8);
      shardGroup.add(shard);

      shards.push({
        mesh: shard,
        driftX: (Math.random() - 0.5) * 0.01,
        driftY: (Math.random() - 0.5) * 0.01,
        driftZ: (Math.random() - 0.5) * 0.008,
        rotX: (Math.random() - 0.5) * 0.03,
        rotY: (Math.random() - 0.5) * 0.03,
        rotZ: (Math.random() - 0.5) * 0.03
      });
    }

    const burstRingGeometry = new THREE.RingGeometry(3.2, 3.5, 128);
    const burstMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });

    const burstMesh = new THREE.Mesh(burstRingGeometry, burstMaterial);
    burstMesh.rotation.x = Math.PI / 2;
    burstGroup.add(burstMesh);

    const clock = new THREE.Clock();
    let animationFrameId = null;

    const sceneProfiles = {
      hero: {
        particleOpacity: 0.98,
        connectionDistance: 6.2,
        connectionOpacity: 0.46,
        ringScale: 1.06,
        ringOpacity: 0.4,
        shardOpacity: 0.42,
        burstColor: 0x00e5ff,
        burstStrength: 1.15,
        groupZ: 0,
        spinBoost: 1.2,
        colorMix: 1
      },
      think: {
        particleOpacity: 0.9,
        connectionDistance: 4.8,
        connectionOpacity: 0.3,
        ringScale: 0.94,
        ringOpacity: 0.22,
        shardOpacity: 0.2,
        burstColor: 0xffa000,
        burstStrength: 0.82,
        groupZ: -2,
        spinBoost: 0.85,
        colorMix: 0.7
      },
      work: {
        particleOpacity: 0.94,
        connectionDistance: 5.5,
        connectionOpacity: 0.38,
        ringScale: 1.02,
        ringOpacity: 0.34,
        shardOpacity: 0.3,
        burstColor: 0x00e5ff,
        burstStrength: 0.95,
        groupZ: -1,
        spinBoost: 1.02,
        colorMix: 0.86
      },
      build: {
        particleOpacity: 1,
        connectionDistance: 6.8,
        connectionOpacity: 0.52,
        ringScale: 1.16,
        ringOpacity: 0.46,
        shardOpacity: 0.42,
        burstColor: 0xffc400,
        burstStrength: 1.32,
        groupZ: 1.5,
        spinBoost: 1.36,
        colorMix: 1.08
      },
      closing: {
        particleOpacity: 0.8,
        connectionDistance: 4.1,
        connectionOpacity: 0.22,
        ringScale: 0.84,
        ringOpacity: 0.16,
        shardOpacity: 0.14,
        burstColor: 0x00e5ff,
        burstStrength: 0.72,
        groupZ: -3,
        spinBoost: 0.6,
        colorMix: 0.55
      }
    };

    let sceneTarget = sceneProfiles.hero;

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll);

    resize();
    animationFrameId = requestAnimationFrame(animate);

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

    function resize() {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function getTextInfluencePoints() {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;
      const points = [];

      textTargetSelectors.forEach(function (selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(function (element) {
          const rect = element.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > height) {
            return;
          }

          const centerX = ((rect.left + rect.width / 2) / width - 0.5) * BOUNDS.x * 2;
          const centerY = -((rect.top + rect.height / 2) / height - 0.5) * BOUNDS.y * 2;

          points.push({
            x: centerX,
            y: centerY
          });
        });
      });

      return points;
    }

    function updateParticles(elapsed) {
      const positionAttr = particleGeometry.getAttribute("position");
      const arr = positionAttr.array;
      const textPoints = getTextInfluencePoints();

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

        const swirl = 0.0024 * sceneTarget.spinBoost;
        const angle = elapsed * 0.22 + i * 0.016;

        arr[i3] += Math.cos(angle) * swirl;
        arr[i3 + 1] += Math.sin(angle) * swirl;

        if (textPoints.length) {
          const point = textPoints[i % textPoints.length];
          const dx = point.x - arr[i3];
          const dy = point.y - arr[i3 + 1];
          arr[i3] += dx * 0.0011;
          arr[i3 + 1] += dy * 0.0011;
        }

        const baseX = basePositions[i3];
        const baseY = basePositions[i3 + 1];

        arr[i3] += (baseX - arr[i3]) * 0.00052;
        arr[i3 + 1] += (baseY - arr[i3 + 1]) * 0.00052;
      }

      particleMaterial.opacity += (sceneTarget.particleOpacity - particleMaterial.opacity) * 0.04;
      positionAttr.needsUpdate = true;
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

          if (distance < sceneTarget.connectionDistance && lineCount < CONNECTION_LIMIT) {
            linePositions[writeIndex++] = ax;
            linePositions[writeIndex++] = ay;
            linePositions[writeIndex++] = az;
            linePositions[writeIndex++] = bx;
            linePositions[writeIndex++] = by;
            linePositions[writeIndex++] = bz;

            const colorStrength = 1 - distance / sceneTarget.connectionDistance;
            const c1r = 1.0 * colorStrength;
            const c1g = 0.56 * colorStrength;
            const c1b = 0.08 * colorStrength;

            const c2r = 0.08 * colorStrength;
            const c2g = 0.88 * colorStrength;
            const c2b = 1.0 * colorStrength;

            lineColors[colorIndex++] = c1r;
            lineColors[colorIndex++] = c1g;
            lineColors[colorIndex++] = c1b;
            lineColors[colorIndex++] = c2r;
            lineColors[colorIndex++] = c2g;
            lineColors[colorIndex++] = c2b;

            lineCount += 2;
          }
        }
      }

      lineMaterial.opacity += (sceneTarget.connectionOpacity - lineMaterial.opacity) * 0.06;
      lineGeometry.setDrawRange(0, lineCount);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
    }

    function updateRings() {
      rings.forEach(function (ring) {
        ring.mesh.scale.lerp(
          new THREE.Vector3(sceneTarget.ringScale, sceneTarget.ringScale, sceneTarget.ringScale),
          0.045
        );

        ring.mesh.material.opacity += (sceneTarget.ringOpacity - ring.mesh.material.opacity) * 0.06;
        ring.mesh.rotation.z += ring.speed * sceneTarget.spinBoost;
      });
    }

    function updateShards() {
      shards.forEach(function (item) {
        item.mesh.position.x += item.driftX * sceneTarget.spinBoost;
        item.mesh.position.y += item.driftY * sceneTarget.spinBoost;
        item.mesh.position.z += item.driftZ * sceneTarget.spinBoost;

        item.mesh.rotation.x += item.rotX * sceneTarget.spinBoost;
        item.mesh.rotation.y += item.rotY * sceneTarget.spinBoost;
        item.mesh.rotation.z += item.rotZ * sceneTarget.spinBoost;

        if (item.mesh.position.x > 16 || item.mesh.position.x < -16) {
          item.driftX *= -1;
        }

        if (item.mesh.position.y > 18 || item.mesh.position.y < -18) {
          item.driftY *= -1;
        }

        if (item.mesh.position.z > 14 || item.mesh.position.z < -14) {
          item.driftZ *= -1;
        }

        item.mesh.material.opacity += (sceneTarget.shardOpacity - item.mesh.material.opacity) * 0.06;
      });
    }

    function updateBurst(elapsed) {
      const timeSinceBurst = elapsed - lastBurstTime;

      if (timeSinceBurst > 3.8) {
        lastBurstTime = elapsed;
        burstMesh.scale.set(1, 1, 1);
        burstMesh.material.opacity = 0.66 * sceneTarget.burstStrength;
        burstMesh.material.color.setHex(sceneTarget.burstColor);
      }

      burstMesh.scale.multiplyScalar(1.038);
      burstMesh.material.opacity *= 0.962;
      burstMesh.rotation.z += 0.018 * sceneTarget.spinBoost;
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      updateParticles(elapsed);
      updateConnections();
      updateRings();
      updateShards();
      updateBurst(elapsed);

      const scrollShift = scrollOffset * -0.0012;
      camera.position.y += (scrollShift - camera.position.y) * 0.04;

      masterGroup.rotation.y += 0.0008 * sceneTarget.spinBoost;
      masterGroup.rotation.x += 0.00045 * sceneTarget.spinBoost;

      masterGroup.rotation.y += mouse.x * 0.006;
      masterGroup.rotation.x += -mouse.y * 0.005;

      masterGroup.position.x += (((mouse.x * 5.8) + heroDecompose * 4.2) - masterGroup.position.x) * 0.04;
      masterGroup.position.y += (((-mouse.y * 4.1) + heroScrollProgress * 3.2) - masterGroup.position.y) * 0.04;
      masterGroup.position.z += (sceneTarget.groupZ - masterGroup.position.z) * 0.04;

      particleGroup.rotation.z += 0.0007 * sceneTarget.spinBoost;
      shardGroup.rotation.y -= 0.0016 * sceneTarget.spinBoost;
      ringGroup.rotation.x += 0.00085 * sceneTarget.spinBoost;

      renderer.render(scene, camera);
    }

    function setScene(sceneName) {
      currentScene = sceneName || "hero";
      sceneTarget = sceneProfiles[currentScene] || sceneProfiles.hero;
    }

    function setScrollProgress(progress, decompose) {
      heroScrollProgress = progress || 0;
      heroDecompose = decompose || 0;
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
      setScrollProgress: setScrollProgress,
      setScene: setScene
    };
  }

  window.createAboutSystemField = createAboutSystemField;
})();