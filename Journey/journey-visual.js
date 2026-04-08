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

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      240
    );
    camera.position.set(0, 0, 32);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.36);
    scene.add(ambientLight);

    const warmLight = new THREE.PointLight(0xffa35c, 1.08, 170);
    warmLight.position.set(12, 10, 18);
    scene.add(warmLight);

    const softLight = new THREE.PointLight(0xffd8a8, 0.55, 160);
    softLight.position.set(-14, -6, 16);
    scene.add(softLight);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const particleGroup = new THREE.Group();
    const squareGroup = new THREE.Group();
    const lineGroup = new THREE.Group();

    masterGroup.add(particleGroup);
    masterGroup.add(squareGroup);
    masterGroup.add(lineGroup);

    const isSmallScreen = window.innerWidth <= 700;
    const DOT_COUNT = isSmallScreen ? 115 : 190;
    const SQUARE_COUNT = isSmallScreen ? 15 : 24;
    const LINE_LIMIT = isSmallScreen ? 320 : 520;
    const BOUNDS = { x: 24, y: 26, z: 8 };

    const dotPositions = new Float32Array(DOT_COUNT * 3);
    const dotBasePositions = new Float32Array(DOT_COUNT * 3);
    const dotVelocities = new Float32Array(DOT_COUNT * 3);
    const dotColors = new Float32Array(DOT_COUNT * 3);

    for (let i = 0; i < DOT_COUNT; i++) {
      const i3 = i * 3;

      const px = (Math.random() - 0.5) * BOUNDS.x * 2;
      const py = (Math.random() - 0.5) * BOUNDS.y * 2;
      const pz = (Math.random() - 0.5) * BOUNDS.z * 2;

      dotPositions[i3] = px;
      dotPositions[i3 + 1] = py;
      dotPositions[i3 + 2] = pz;

      dotBasePositions[i3] = px;
      dotBasePositions[i3 + 1] = py;
      dotBasePositions[i3 + 2] = pz;

      dotVelocities[i3] = (Math.random() - 0.5) * 0.0048;
      dotVelocities[i3 + 1] = (Math.random() - 0.5) * 0.0062;
      dotVelocities[i3 + 2] = (Math.random() - 0.5) * 0.0028;

      dotColors[i3] = 1.0;
      dotColors[i3 + 1] = 0.77 + Math.random() * 0.08;
      dotColors[i3 + 2] = 0.52 + Math.random() * 0.05;
    }

    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    dotGeometry.setAttribute("color", new THREE.BufferAttribute(dotColors, 3));

    const dotMaterial = new THREE.PointsMaterial({
      size: 0.11,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const dots = new THREE.Points(dotGeometry, dotMaterial);
    particleGroup.add(dots);

    const linePositions = new Float32Array(LINE_LIMIT * 6);
    const lineColors = new Float32Array(LINE_LIMIT * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.055,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    lineGroup.add(lineSegments);

    const squareMeshes = [];
    const squareGeo = new THREE.PlaneGeometry(0.34, 0.34);

    for (let i = 0; i < SQUARE_COUNT; i++) {
      const material = new THREE.MeshBasicMaterial({
        color: i % 4 === 0 ? 0xfff0b3 : 0xffcf63,
        transparent: true,
        opacity: 0.88
      });

      const mesh = new THREE.Mesh(squareGeo, material);
      mesh.position.set(
        (Math.random() - 0.5) * BOUNDS.x * 2,
        (Math.random() - 0.5) * BOUNDS.y * 2,
        (Math.random() - 0.5) * BOUNDS.z * 2
      );

      const scale = 0.45 + Math.random() * 1.15;
      mesh.scale.set(scale, scale, scale);

      squareGroup.add(mesh);

      squareMeshes.push({
        mesh: mesh,
        driftX: (Math.random() - 0.5) * 0.009,
        driftY: (Math.random() - 0.5) * 0.011,
        driftZ: (Math.random() - 0.5) * 0.0035,
        pulseSeed: Math.random() * Math.PI * 2
      });
    }

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
        dotOpacity: 0.42,
        lineOpacity: 0.055,
        lineDistance: 4.7,
        squareOpacity: 0.88,
        spin: 0.54
      },
      hover: {
        dotOpacity: 0.56,
        lineOpacity: 0.085,
        lineDistance: 5.35,
        squareOpacity: 1,
        spin: 0.76
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

    function updateDots(elapsed) {
      const positionAttr = dotGeometry.getAttribute("position");
      const arr = positionAttr.array;

      for (let i = 0; i < DOT_COUNT; i++) {
        const i3 = i * 3;

        arr[i3] += dotVelocities[i3];
        arr[i3 + 1] += dotVelocities[i3 + 1];
        arr[i3 + 2] += dotVelocities[i3 + 2];

        if (arr[i3] > BOUNDS.x || arr[i3] < -BOUNDS.x) {
          dotVelocities[i3] *= -1;
        }

        if (arr[i3 + 1] > BOUNDS.y || arr[i3 + 1] < -BOUNDS.y) {
          dotVelocities[i3 + 1] *= -1;
        }

        if (arr[i3 + 2] > BOUNDS.z || arr[i3 + 2] < -BOUNDS.z) {
          dotVelocities[i3 + 2] *= -1;
        }

        const wave = Math.sin(elapsed * 0.32 + i * 0.18) * 0.00135 * modeTarget.spin;
        arr[i3] += wave;
        arr[i3 + 1] += wave * 0.72;

        arr[i3] += (dotBasePositions[i3] - arr[i3]) * 0.00055;
        arr[i3 + 1] += (dotBasePositions[i3 + 1] - arr[i3 + 1]) * 0.00055;
      }

      dotMaterial.opacity += (modeTarget.dotOpacity - dotMaterial.opacity) * 0.05;
      positionAttr.needsUpdate = true;
    }

    function updateConnections() {
      const particleArray = dotGeometry.getAttribute("position").array;
      let writeIndex = 0;
      let colorIndex = 0;
      let lineCount = 0;

      for (let i = 0; i < DOT_COUNT; i++) {
        const ax = particleArray[i * 3];
        const ay = particleArray[i * 3 + 1];
        const az = particleArray[i * 3 + 2];

        for (let j = i + 1; j < DOT_COUNT; j++) {
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

            lineColors[colorIndex++] = 0.95 * strength;
            lineColors[colorIndex++] = 0.66 * strength;
            lineColors[colorIndex++] = 0.42 * strength;

            lineColors[colorIndex++] = 0.95 * strength;
            lineColors[colorIndex++] = 0.74 * strength;
            lineColors[colorIndex++] = 0.50 * strength;

            lineCount += 2;
          }
        }
      }

      lineMaterial.opacity += (modeTarget.lineOpacity - lineMaterial.opacity) * 0.05;
      lineGeometry.setDrawRange(0, lineCount);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
    }

    function updateSquares(elapsed) {
      squareMeshes.forEach(function (item, index) {
        const pulse = 0.82 + Math.sin(elapsed * 0.92 + item.pulseSeed) * 0.18;

        item.mesh.position.x += item.driftX * modeTarget.spin;
        item.mesh.position.y += item.driftY * modeTarget.spin;
        item.mesh.position.z += item.driftZ * modeTarget.spin;

        if (item.mesh.position.x > BOUNDS.x || item.mesh.position.x < -BOUNDS.x) {
          item.driftX *= -1;
        }

        if (item.mesh.position.y > BOUNDS.y || item.mesh.position.y < -BOUNDS.y) {
          item.driftY *= -1;
        }

        if (item.mesh.position.z > BOUNDS.z || item.mesh.position.z < -BOUNDS.z) {
          item.driftZ *= -1;
        }

        item.mesh.rotation.z += 0.00115 + index * 0.000028;
        item.mesh.material.opacity += ((modeTarget.squareOpacity * pulse) - item.mesh.material.opacity) * 0.05;
      });
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;

      updateDots(elapsed);
      updateConnections();
      updateSquares(elapsed);

      const scrollShift = scrollOffset * -0.00028;
      camera.position.y += (scrollShift - camera.position.y) * 0.04;

      masterGroup.rotation.y += 0.00016 * modeTarget.spin;
      masterGroup.rotation.x += 0.00007 * modeTarget.spin;

      masterGroup.rotation.y += mouse.x * 0.00145;
      masterGroup.rotation.x += -mouse.y * 0.0011;

      masterGroup.position.x += ((mouse.x * 1.95) - masterGroup.position.x) * 0.03;
      masterGroup.position.y += (((-mouse.y * 1.35)) - masterGroup.position.y) * 0.03;

      particleGroup.rotation.z += 0.00005 * modeTarget.spin;
      squareGroup.rotation.z -= 0.00004 * modeTarget.spin;

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