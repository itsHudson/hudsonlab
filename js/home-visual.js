(function () {
  "use strict";

  function createHomeVisual(options) {
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

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.68);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x78ecff, 2.8, 260);
    cyanLight.position.set(18, 16, 34);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8f66ff, 2.6, 260);
    violetLight.position.set(-20, -8, 38);
    scene.add(violetLight);

    const limeLight = new THREE.PointLight(0xd4ff66, 1.2, 180);
    limeLight.position.set(0, 20, 18);
    scene.add(limeLight);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const starGroup = new THREE.Group();
    const beamGroup = new THREE.Group();
    const monolithGroup = new THREE.Group();
    const ringGroup = new THREE.Group();

    masterGroup.add(starGroup);
    masterGroup.add(beamGroup);
    masterGroup.add(monolithGroup);
    masterGroup.add(ringGroup);

    const isSmallScreen = window.innerWidth <= 720;
    const STAR_COUNT = isSmallScreen ? 300 : 720;
    const CONNECTION_LIMIT = STAR_COUNT * 6;
    const BOUNDS = { x: 34, y: 62, z: 22 };

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

      velocities[i3] = (Math.random() - 0.5) * 0.014;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.018;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.008;

      const mode = Math.random();

      if (mode < 0.48) {
        colors[i3] = 0.48;
        colors[i3 + 1] = 0.92;
        colors[i3 + 2] = 1.0;
      } else if (mode < 0.84) {
        colors[i3] = 0.58;
        colors[i3 + 1] = 0.42;
        colors[i3 + 2] = 1.0;
      } else {
        colors[i3] = 0.84;
        colors[i3 + 1] = 1.0;
        colors[i3 + 2] = 0.4;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    starGroup.add(particles);

    const linePositions = new Float32Array(CONNECTION_LIMIT * 6);
    const lineColors = new Float32Array(CONNECTION_LIMIT * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.18,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    starGroup.add(lineSegments);

    const beams = [];
    const beamGeometry = new THREE.CylinderGeometry(0.04, 0.04, 32, 10, 1, true);

    for (let i = 0; i < 7; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x78ecff : 0x8f66ff,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending
      });

      const beam = new THREE.Mesh(beamGeometry, material);
      beam.position.set(
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 10
      );
      beam.rotation.z = Math.random() * Math.PI;
      beam.rotation.x = Math.random() * 0.5;
      beamGroup.add(beam);
      beams.push(beam);
    }

    const monoliths = [];
    const monolithGeometry = new THREE.BoxGeometry(1.1, 8.5, 1.1);

    for (let i = 0; i < 5; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x78ecff : 0x8f66ff,
        wireframe: true,
        transparent: true,
        opacity: 0.16
      });

      const monolith = new THREE.Mesh(monolithGeometry, material);
      monolith.position.set(
        (i - 2) * 5.6,
        -4 + Math.random() * 5,
        (Math.random() - 0.5) * 8
      );
      monolith.rotation.y = Math.random() * Math.PI;
      monolith.rotation.x = Math.random() * 0.2;
      monolithGroup.add(monolith);

      monoliths.push(monolith);
    }

    const ringConfigs = [
      { radius: 8, color: 0x78ecff, speed: 0.0034, x: 1.0, y: 0.2, opacity: 0.16 },
      { radius: 13, color: 0x8f66ff, speed: -0.0026, x: 0.2, y: 1.0, opacity: 0.14 },
      { radius: 18, color: 0xd4ff66, speed: 0.0018, x: 1.18, y: 0.12, opacity: 0.08 }
    ];

    const rings = ringConfigs.map(function (config) {
      const geometry = new THREE.TorusGeometry(config.radius, 0.03, 12, 180);
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

        const swirl = 0.0024;
        const angle = elapsed * 0.16 + i * 0.012;

        arr[i3] += Math.cos(angle) * swirl;
        arr[i3 + 1] += Math.sin(angle) * swirl;

        arr[i3] += (basePositions[i3] - arr[i3]) * 0.00046;
        arr[i3 + 1] += (basePositions[i3 + 1] - arr[i3 + 1]) * 0.00046;
      }

      positionAttr.needsUpdate = true;
    }

    function updateConnections() {
      const particleArray = particleGeometry.getAttribute("position").array;
      let writeIndex = 0;
      let colorIndex = 0;
      let lineCount = 0;
      const maxDistance = 4.8;

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

          if (distance < maxDistance && lineCount < CONNECTION_LIMIT) {
            linePositions[writeIndex++] = ax;
            linePositions[writeIndex++] = ay;
            linePositions[writeIndex++] = az;
            linePositions[writeIndex++] = bx;
            linePositions[writeIndex++] = by;
            linePositions[writeIndex++] = bz;

            const strength = 1 - distance / maxDistance;

            lineColors[colorIndex++] = 0.48 * strength;
            lineColors[colorIndex++] = 0.92 * strength;
            lineColors[colorIndex++] = 1.0 * strength;

            lineColors[colorIndex++] = 0.58 * strength;
            lineColors[colorIndex++] = 0.42 * strength;
            lineColors[colorIndex++] = 1.0 * strength;

            lineCount += 2;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineCount);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
    }

    function updateBeams(elapsed) {
      beams.forEach(function (beam, index) {
        beam.position.y = Math.sin(elapsed * 0.8 + index * 0.9) * 7;
        beam.rotation.y += 0.003;
      });
    }

    function updateMonoliths(elapsed) {
      monoliths.forEach(function (monolith, index) {
        monolith.rotation.y += 0.0022 + index * 0.0002;
        monolith.position.y = Math.cos(elapsed * 0.7 + index) * 1.8;
      });
    }

    function updateRings() {
      rings.forEach(function (ring) {
        ring.mesh.rotation.z += ring.speed;
      });
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      updateParticles(elapsed);
      updateConnections();
      updateBeams(elapsed);
      updateMonoliths(elapsed);
      updateRings();

      const scrollShift = scrollOffset * -0.0008;
      camera.position.y += (scrollShift - camera.position.y) * 0.04;

      masterGroup.rotation.y += 0.0004;
      masterGroup.rotation.x += 0.0002;

      masterGroup.rotation.y += mouse.x * 0.0042;
      masterGroup.rotation.x += -mouse.y * 0.0032;

      masterGroup.position.x += ((mouse.x * 5.2) - masterGroup.position.x) * 0.04;
      masterGroup.position.y += (((-mouse.y * 4.2)) - masterGroup.position.y) * 0.04;

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

  window.createHomeVisual = createHomeVisual;
})();