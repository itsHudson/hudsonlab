(function () {
  "use strict";

  function createAboutSystemField(options) {
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
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
    camera.position.z = 28;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffa24c, 0.9, 120);
    pointLight.position.set(10, 12, 18);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    const clock = new THREE.Clock();

    const pointCount = 110;
    const positions = [];
    const velocities = [];
    const bounds = {
      x: 18,
      y: 26,
      z: 8
    };

    for (let i = 0; i < pointCount; i++) {
      positions.push(
        (Math.random() - 0.5) * bounds.x * 2,
        (Math.random() - 0.5) * bounds.y * 2,
        (Math.random() - 0.5) * bounds.z * 2
      );

      velocities.push(
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.003
      );
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions.slice(), 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xff9e47,
      size: 0.12,
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    const maxLineSegments = pointCount * 7;
    const linePositions = new Float32Array(maxLineSegments * 3 * 2);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffba74,
      transparent: true,
      opacity: 0.08
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lineSegments);

    const guideGeometry = new THREE.BufferGeometry();
    const guidePositions = new Float32Array([
      -10, 14, -2,
      -4, 6, -1,
      0, -2, 0,
      7, -10, 1,
      10, -18, 2
    ]);
    guideGeometry.setAttribute("position", new THREE.BufferAttribute(guidePositions, 3));

    const guideMaterial = new THREE.LineBasicMaterial({
      color: 0xff9a3d,
      transparent: true,
      opacity: 0.05
    });

    const guideLine = new THREE.Line(guideGeometry, guideMaterial);
    guideLine.rotation.z = -0.1;
    group.add(guideLine);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    let animationFrameId = requestAnimationFrame(animate);

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

    function resize() {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function updateParticles() {
      const positionAttr = particleGeometry.getAttribute("position");
      const array = positionAttr.array;

      for (let i = 0; i < pointCount; i++) {
        const index = i * 3;

        array[index] += velocities[index];
        array[index + 1] += velocities[index + 1];
        array[index + 2] += velocities[index + 2];

        if (array[index] > bounds.x || array[index] < -bounds.x) {
          velocities[index] *= -1;
        }

        if (array[index + 1] > bounds.y || array[index + 1] < -bounds.y) {
          velocities[index + 1] *= -1;
        }

        if (array[index + 2] > bounds.z || array[index + 2] < -bounds.z) {
          velocities[index + 2] *= -1;
        }
      }

      positionAttr.needsUpdate = true;
    }

    function updateConnections() {
      const particleArray = particleGeometry.getAttribute("position").array;
      let writeIndex = 0;
      let lineCount = 0;

      for (let i = 0; i < pointCount; i++) {
        const ax = particleArray[i * 3];
        const ay = particleArray[i * 3 + 1];
        const az = particleArray[i * 3 + 2];

        for (let j = i + 1; j < pointCount; j++) {
          const bx = particleArray[j * 3];
          const by = particleArray[j * 3 + 1];
          const bz = particleArray[j * 3 + 2];

          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 4.9 && lineCount < maxLineSegments) {
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

      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      updateParticles();
      updateConnections();

      group.rotation.y = mouse.x * 0.08;
      group.rotation.x = -mouse.y * 0.05;

      particles.rotation.z += 0.00035;
      particles.position.y = Math.sin(elapsed * 0.35) * 0.25;

      lineSegments.rotation.z -= 0.00022;
      lineSegments.position.x = mouse.x * 0.8;
      lineSegments.position.y = -mouse.y * 0.55;

      guideLine.position.x = mouse.x * 0.5;
      guideLine.position.y = -mouse.y * 0.35;
      guideLine.rotation.z = -0.1 + Math.sin(elapsed * 0.2) * 0.02;

      renderer.render(scene, camera);
    }

    function destroy() {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);

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

  window.createAboutSystemField = createAboutSystemField;
})();