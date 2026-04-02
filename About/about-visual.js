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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 240);
    camera.position.set(0, 0, 28);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.94);
    scene.add(ambientLight);

    const warmLight = new THREE.PointLight(0xff8a2a, 1.02, 140);
    warmLight.position.set(12, 10, 18);
    scene.add(warmLight);

    const sideLight = new THREE.PointLight(0xffc471, 0.64, 120);
    sideLight.position.set(-14, -8, 14);
    scene.add(sideLight);

    const group = new THREE.Group();
    scene.add(group);

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    let scrollOffset = 0;
    let heroScrollProgress = 0;
    let heroDecompose = 0;

    const POINT_COUNT = 170;
    const bounds = { x: 20, y: 34, z: 10 };

    const positions = [];
    const basePositions = [];
    const velocities = [];
    const driftOffsets = [];

    for (let i = 0; i < POINT_COUNT; i++) {
      const px = (Math.random() - 0.5) * bounds.x * 2;
      const py = (Math.random() - 0.5) * bounds.y * 2;
      const pz = (Math.random() - 0.5) * bounds.z * 2;

      positions.push(px, py, pz);
      basePositions.push(px, py, pz);

      velocities.push(
        (Math.random() - 0.5) * 0.0072,
        (Math.random() - 0.5) * 0.0072,
        (Math.random() - 0.5) * 0.0026
      );

      driftOffsets.push(Math.random() * Math.PI * 2);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions.slice(), 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff922c,
      size: 0.17,
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    const maxLineSegments = POINT_COUNT * 7;
    const linePositions = new Float32Array(maxLineSegments * 3 * 2);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffb347,
      transparent: true,
      opacity: 0.08
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lineSegments);

    let animationFrameId = null;
    let time = 0;

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll);

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

          const centerX = ((rect.left + rect.width / 2) / width - 0.5) * bounds.x * 2;
          const centerY = -((rect.top + rect.height / 2) / height - 0.5) * bounds.y * 2;

          points.push({
            x: centerX,
            y: centerY
          });
        });
      });

      return points;
    }

    function updateParticles() {
      const attr = particleGeometry.getAttribute("position");
      const array = attr.array;
      const textPoints = getTextInfluencePoints();

      for (let i = 0; i < POINT_COUNT; i++) {
        const idx = i * 3;

        array[idx] += velocities[idx];
        array[idx + 1] += velocities[idx + 1];
        array[idx + 2] += velocities[idx + 2];

        const drift = Math.sin(time * 0.7 + driftOffsets[i]) * 0.016;
        const swirl = Math.cos(time * 0.55 + driftOffsets[i]) * 0.014;

        array[idx] += drift;
        array[idx + 1] += swirl;

        if (array[idx] > bounds.x || array[idx] < -bounds.x) {
          velocities[idx] *= -1;
        }

        if (array[idx + 1] > bounds.y || array[idx + 1] < -bounds.y) {
          velocities[idx + 1] *= -1;
        }

        if (array[idx + 2] > bounds.z || array[idx + 2] < -bounds.z) {
          velocities[idx + 2] *= -1;
        }

        if (textPoints.length) {
          const point = textPoints[i % textPoints.length];
          const dx = point.x - array[idx];
          const dy = point.y - array[idx + 1];
          array[idx] += dx * 0.0011;
          array[idx + 1] += dy * 0.0011;
        }

        const baseX = basePositions[idx];
        const baseY = basePositions[idx + 1];
        array[idx] += (baseX - array[idx]) * 0.0006;
        array[idx + 1] += (baseY - array[idx + 1]) * 0.0006;
      }

      attr.needsUpdate = true;
    }

    function updateConnections() {
      const particleArray = particleGeometry.getAttribute("position").array;
      let writeIndex = 0;
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

          if (distance < 4.7 && lineCount < maxLineSegments) {
            linePositions[writeIndex++] = ax;
            linePositions[writeIndex++] = ay;
            linePositions[writeIndex++] = az;
            linePositions[writeIndex++] = bx;
            linePositions[writeIndex++] = by;
            linePositions[writeIndex++] = bz;
            lineCount += 2;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineCount);
      lineGeometry.attributes.position.needsUpdate = true;
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.01;

      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      updateParticles();
      updateConnections();

      const scrollShift = scrollOffset * -0.0009;
      camera.position.y += (scrollShift - camera.position.y) * 0.04;

      group.rotation.y += 0.00014;
      group.rotation.x += 0.00008;

      group.rotation.y += mouse.x * 0.0012;
      group.rotation.x += -mouse.y * 0.00085;

      group.position.x += ((mouse.x * 1.05) + heroDecompose * 0.85 - group.position.x) * 0.025;
      group.position.y += (((-mouse.y * 0.7) + heroScrollProgress * 1.05) - group.position.y) * 0.025;

      particles.rotation.z += 0.00012;
      particles.position.x = mouse.x * 0.5;
      particles.position.y += ((-mouse.y * 0.34) - particles.position.y) * 0.03;

      lineSegments.rotation.z -= 0.00006;
      lineSegments.position.x += ((mouse.x * 0.30) - lineSegments.position.x) * 0.03;
      lineSegments.position.y += ((-mouse.y * 0.22) - lineSegments.position.y) * 0.03;

      renderer.render(scene, camera);
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
      setScrollProgress: setScrollProgress
    };
  }

  window.createAboutSystemField = createAboutSystemField;
})();