(function () {
  "use strict";

  function createJourneyDetailVisual(options) {
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
    camera.position.set(0, 0, 40);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.54);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x7ef0ff, 2.2, 220);
    cyanLight.position.set(18, 14, 28);
    scene.add(cyanLight);

    const amberLight = new THREE.PointLight(0xffb063, 1.8, 220);
    amberLight.position.set(-18, -10, 28);
    scene.add(amberLight);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const particleGroup = new THREE.Group();
    const ringGroup = new THREE.Group();
    const shardGroup = new THREE.Group();

    masterGroup.add(particleGroup);
    masterGroup.add(ringGroup);
    masterGroup.add(shardGroup);

    const isSmallScreen = window.innerWidth <= 700;
    const POINT_COUNT = isSmallScreen ? 220 : 420;
    const CONNECTION_LIMIT = POINT_COUNT * 5;
    const BOUNDS = { x: 28, y: 56, z: 18 };

    const positions = new Float32Array(POINT_COUNT * 3);
    const basePositions = new Float32Array(POINT_COUNT * 3);
    const velocities = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);

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

      velocities[i3] = (Math.random() - 0.5) * 0.012;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.014;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.007;

      if (Math.random() < 0.56) {
        colors[i3] = 0.5;
        colors[i3 + 1] = 0.94;
        colors[i3 + 2] = 1.0;
      } else {
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.69;
        colors[i3 + 2] = 0.42;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.16,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.84,
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
      opacity: 0.14,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    particleGroup.add(lineSegments);

    const ringConfigs = [
      { radius: 8, color: 0x7ef0ff, opacity: 0.12, speed: 0.0032, x: 0.92, y: 0.18 },
      { radius: 13, color: 0xffb063, opacity: 0.1, speed: -0.0026, x: 0.22, y: 1.1 }
    ];

    const rings = ringConfigs.map(function (config) {
      const geometry = new THREE.TorusGeometry(config.radius, 0.03, 10, 140);
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

    const shards = [];
    const shardGeo = new THREE.BoxGeometry(0.7, 2.2, 0.04);

    for (let i = 0; i < 12; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x7ef0ff : 0xffb063,
        wireframe: true,
        transparent: true,
        opacity: 0.12
      });

      const mesh = new THREE.Mesh(shardGeo, material);
      mesh.position.set(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 24,
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
        driftX: (Math.random() - 0.5) * 0.008,
        driftY: (Math.random() - 0.5) * 0.008,
        driftZ: (Math.random() - 0.5) * 0.005,
        rotX: (Math.random() - 0.5) * 0.016,
        rotY: (Math.random() - 0.5) * 0.016,
        rotZ: (Math.random() - 0.5) * 0.016
      });
    }

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    const clock = new THREE.Clock();
    let scrollOffset = 0;
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
      const positionAttr = particleGeometry.getAttribute("position");
      const arr = positionAttr.array;

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

        const wave = Math.sin(elapsed * 0.42 + i * 0.013) * 0.0022;
        arr[i3] += wave;
        arr[i3 + 1] += wave * 0.8;

        arr[i3] += (basePositions[i3] - arr[i3]) * 0.00042;
        arr[i3 + 1] += (basePositions[i3 + 1] - arr[i3 + 1]) * 0.00042;
      }

      positionAttr.needsUpdate = true;
    }

    function updateConnections() {
      const particleArray = particleGeometry.getAttribute("position").array;
      let writeIndex = 0;
      let colorIndex = 0;
      let lineCount = 0;
      const maxDistance = 4.4;

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

          if (distance < maxDistance && lineCount < CONNECTION_LIMIT) {
            linePositions[writeIndex++] = ax;
            linePositions[writeIndex++] = ay;
            linePositions[writeIndex++] = az;
            linePositions[writeIndex++] = bx;
            linePositions[writeIndex++] = by;
            linePositions[writeIndex++] = bz;

            const strength = 1 - distance / maxDistance;

            lineColors[colorIndex++] = 0.5 * strength;
            lineColors[colorIndex++] = 0.94 * strength;
            lineColors[colorIndex++] = 1.0 * strength;

            lineColors[colorIndex++] = 1.0 * strength;
            lineColors[colorIndex++] = 0.69 * strength;
            lineColors[colorIndex++] = 0.42 * strength;

            lineCount += 2;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineCount);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
    }

    function updateRings() {
      rings.forEach(function (ring) {
        ring.mesh.rotation.z += ring.speed;
      });
    }

    function updateShards() {
      shards.forEach(function (item) {
        item.mesh.position.x += item.driftX;
        item.mesh.position.y += item.driftY;
        item.mesh.position.z += item.driftZ;

        item.mesh.rotation.x += item.rotX;
        item.mesh.rotation.y += item.rotY;
        item.mesh.rotation.z += item.rotZ;

        if (item.mesh.position.x > 12 || item.mesh.position.x < -12) {
          item.driftX *= -1;
        }

        if (item.mesh.position.y > 16 || item.mesh.position.y < -16) {
          item.driftY *= -1;
        }

        if (item.mesh.position.z > 12 || item.mesh.position.z < -12) {
          item.driftZ *= -1;
        }
      });
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      updateParticles(elapsed);
      updateConnections();
      updateRings();
      updateShards();

      const scrollShift = scrollOffset * -0.0007;
      camera.position.y += (scrollShift - camera.position.y) * 0.04;

      masterGroup.rotation.y += 0.00028;
      masterGroup.rotation.x += 0.00018;

      masterGroup.rotation.y += mouse.x * 0.0034;
      masterGroup.rotation.x += -mouse.y * 0.0024;

      masterGroup.position.x += ((mouse.x * 4.2) - masterGroup.position.x) * 0.04;
      masterGroup.position.y += (((-mouse.y * 3.2)) - masterGroup.position.y) * 0.04;

      renderer.render(scene, camera);
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
      destroy: destroy
    };
  }

  window.createJourneyDetailVisual = createJourneyDetailVisual;
})();