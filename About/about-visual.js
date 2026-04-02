(function () {
  "use strict";

  function createAboutSystemField(options) {
    if (!options || !options.canvas || typeof THREE === "undefined") {
      return null;
    }

    const canvas = options.canvas;
    const textTargetSelectors = Array.isArray(options.textTargets) ? options.textTargets : [];
    const isSmallScreen = window.innerWidth <= 640;
    const isMediumScreen = window.innerWidth <= 1024;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 220);
    camera.position.set(0, 0, 28);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.92);
    scene.add(ambientLight);

    const warmLight = new THREE.PointLight(0xff8a2a, 0.92, 130);
    warmLight.position.set(12, 10, 18);
    scene.add(warmLight);

    const sideLight = new THREE.PointLight(0xffc471, 0.56, 120);
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

    let POINT_COUNT = 120;

    if (isMediumScreen) {
      POINT_COUNT = 90;
    }

    if (isSmallScreen) {
      POINT_COUNT = 60;
    }

    if (reduceMotion) {
      POINT_COUNT = 44;
    }

    const bounds = { x: 18, y: 30, z: 10 };

    const positions = [];
    const basePositions = [];
    const velocities = [];

    for (let i = 0; i < POINT_COUNT; i++) {
      const px = (Math.random() - 0.5) * bounds.x * 2;
      const py = (Math.random() - 0.5) * bounds.y * 2;
      const pz = (Math.random() - 0.5) * bounds.z * 2;

      positions.push(px, py, pz);
      basePositions.push(px, py, pz);

      velocities.push(
        (Math.random() - 0.5) * (reduceMotion ? 0.0022 : 0.0048),
        (Math.random() - 0.5) * (reduceMotion ? 0.0022 : 0.0048),
        (Math.random() - 0.5) * (reduceMotion ? 0.001 : 0.002)
      );
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions.slice(), 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff922c,
      size: isSmallScreen ? 0.18 : 0.14,
      transparent: true,
      opacity: reduceMotion ? 0.28 : 0.42,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    const maxLineSegments = POINT_COUNT * 5;
    const linePositions = new Float32Array(maxLineSegments * 3 * 2);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffb347,
      transparent: true,
      opacity: reduceMotion ? 0.04 : 0.065
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lineSegments);

    let animationFrameId = null;

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll);

    animationFrameId = requestAnimationFrame(animate);

    function onMouseMove(event) {
      if (reduceMotion) {
        return;
      }

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
          array[idx] += dx * (reduceMotion ? 0.0004 : 0.0009);
          array[idx + 1] += dy * (reduceMotion ? 0.0004 : 0.0009);
        }

        const baseX = basePositions[idx];
        const baseY = basePositions[idx + 1];
        array[idx] += (baseX - array[idx]) * (reduceMotion ? 0.00045 : 0.0008);
        array[idx + 1] += (baseY - array[idx + 1]) * (reduceMotion ? 0.00045 : 0.0008);
      }

      attr.needsUpdate = true;
    }

    function updateConnections() {
      const particleArray = particleGeometry.getAttribute("position").array;
      let writeIndex = 0;
      let lineCount = 0;
      const maxDistance = reduceMotion ? 3.4 : 4.15;

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

          if (distance < maxDistance && lineCount < maxLineSegments) {
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

      mouse.x += (mouse.targetX - mouse.x) * (reduceMotion ? 0.015 : 0.03);
      mouse.y += (mouse.targetY - mouse.y) * (reduceMotion ? 0.015 : 0.03);

      updateParticles();
      updateConnections();

      const scrollShift = scrollOffset * (reduceMotion ? -0.00036 : -0.00078);
      camera.position.y += (scrollShift - camera.position.y) * 0.04;

      group.rotation.y += reduceMotion ? 0.00003 : 0.00009;
      group.rotation.x += reduceMotion ? 0.00002 : 0.00005;

      if (!reduceMotion) {
        group.rotation.y += mouse.x * 0.0009;
        group.rotation.x += -mouse.y * 0.0007;
      }

      group.position.x += ((mouse.x * 0.8) + heroDecompose * 0.6 - group.position.x) * 0.02;
      group.position.y += (((-mouse.y * 0.5) + heroScrollProgress * 0.8) - group.position.y) * 0.02;

      particles.rotation.z += reduceMotion ? 0.00003 : 0.00008;
      particles.position.x = mouse.x * (reduceMotion ? 0.18 : 0.38);
      particles.position.y += ((-mouse.y * (reduceMotion ? 0.12 : 0.24)) - particles.position.y) * 0.03;

      lineSegments.rotation.z -= reduceMotion ? 0.00002 : 0.00004;
      lineSegments.position.x += ((mouse.x * (reduceMotion ? 0.08 : 0.20)) - lineSegments.position.x) * 0.03;
      lineSegments.position.y += ((-mouse.y * (reduceMotion ? 0.06 : 0.14)) - lineSegments.position.y) * 0.03;

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