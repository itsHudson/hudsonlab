(function () {
  "use strict";

  function createAboutSystemField(options) {
    if (!options || !options.canvas || typeof THREE === "undefined") return null;

    /* ─── skip canvas on touch-only devices (no hover = no point) ─── */
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return null;

    const canvas = options.canvas;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);
    camera.position.set(0, 0, 26);

    /* ─── lights ─── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.88));
    const warmLight = new THREE.PointLight(0xa06337, 0.92, 120);
    warmLight.position.set(12, 10, 18);
    scene.add(warmLight);
    const sideLight = new THREE.PointLight(0xcf9a67, 0.58, 120);
    sideLight.position.set(-14, -8, 14);
    scene.add(sideLight);

    const group = new THREE.Group();
    scene.add(group);

    /* ─── mouse state ─── */
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    /* ─── particles ─── */
    const POINT_COUNT = 205;
    const bounds = { x: 18, y: 28, z: 10 };
    const positions = new Float32Array(POINT_COUNT * 3);
    const velocities = new Float32Array(POINT_COUNT * 3);

    for (let i = 0; i < POINT_COUNT; i++) {
      const idx = i * 3;
      positions[idx]     = (Math.random() - 0.5) * bounds.x * 2;
      positions[idx + 1] = (Math.random() - 0.5) * bounds.y * 2;
      positions[idx + 2] = (Math.random() - 0.5) * bounds.z * 2;
      velocities[idx]     = (Math.random() - 0.5) * 0.0078;
      velocities[idx + 1] = (Math.random() - 0.5) * 0.0078;
      velocities[idx + 2] = (Math.random() - 0.5) * 0.0032;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xc78d57, size: 0.15, transparent: true,
      opacity: 0.62, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    /* ─── connection lines ─── */
    const CONN_THRESHOLD = 5.45;
    const CONN_THRESHOLD_SQ = CONN_THRESHOLD * CONN_THRESHOLD; /* avoid sqrt */
    const maxLineSegments = POINT_COUNT * 10;
    const linePositions = new Float32Array(maxLineSegments * 3 * 2);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setDrawRange(0, 0);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x94603c, transparent: true, opacity: 0.14
    });
    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lineSegments);

    /* ─── spatial grid for O(n) neighbour bucketing ─── */
    const CELL_SIZE = CONN_THRESHOLD;
    const gridMap = new Map();

    function cellKey(cx, cy, cz) {
      return cx + "," + cy + "," + cz;
    }

    function buildGrid(arr) {
      gridMap.clear();
      for (let i = 0; i < POINT_COUNT; i++) {
        const idx = i * 3;
        const cx = Math.floor(arr[idx]     / CELL_SIZE);
        const cy = Math.floor(arr[idx + 1] / CELL_SIZE);
        const cz = Math.floor(arr[idx + 2] / CELL_SIZE);
        const key = cellKey(cx, cy, cz);
        if (!gridMap.has(key)) gridMap.set(key, []);
        gridMap.get(key).push(i);
      }
    }

    /* ─── guide line + glow ─── */
    const guideCurve = new THREE.BufferGeometry();
    guideCurve.setAttribute("position", new THREE.Float32BufferAttribute(
      [-14,16,-2, -7,8,-1, -1,1,0, 6,-8,1, 11,-18,2], 3
    ));
    const guideLine = new THREE.Line(guideCurve, new THREE.LineBasicMaterial({
      color: 0x8d5a38, transparent: true, opacity: 0.065
    }));
    guideLine.rotation.z = -0.12;
    group.add(guideLine);

    const glowOrb = new THREE.Mesh(
      new THREE.SphereGeometry(4.2, 20, 20),
      new THREE.MeshBasicMaterial({ color: 0xd4a170, transparent: true, opacity: 0.045 })
    );
    glowOrb.position.set(8, -4, -1);
    group.add(glowOrb);

    /* ─── scroll / camera target ─── */
    let scrollTarget = 0;
    let cameraYTarget = 0;

    /* ─── rAF state ─── */
    let animationFrameId = null;
    let isRunning = false;

    function start() {
      if (isRunning) return;
      isRunning = true;
      animationFrameId = requestAnimationFrame(animate);
    }

    function stop() {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    /* ─── event handlers ─── */
    function onMouseMove(event) {
      mouse.targetX = (event.clientX / (window.innerWidth  || 1) - 0.5) * 2;
      mouse.targetY = (event.clientY / (window.innerHeight || 1) - 0.5) * 2;
    }

    function onMouseLeave() { mouse.targetX = 0; mouse.targetY = 0; }

    function onScroll() {
      scrollTarget = window.scrollY || 0;
      /* derive a bounded camera-Y target so it never drifts unboundedly */
      cameraYTarget = scrollTarget * -0.00115;
    }

    function onVisibilityChange() {
      document.hidden ? stop() : start();
    }

    function resize() {
      const w = window.innerWidth  || 1;
      const h = window.innerHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    resize();
    window.addEventListener("resize",           resize,            { passive: true });
    window.addEventListener("mousemove",        onMouseMove,       { passive: true });
    window.addEventListener("mouseleave",       onMouseLeave);
    window.addEventListener("scroll",           onScroll,          { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    /* ─── particle update ─── */
    function updateParticles() {
      const attr  = particleGeometry.getAttribute("position");
      const array = attr.array;

      for (let i = 0; i < POINT_COUNT; i++) {
        const idx = i * 3;
        array[idx]     += velocities[idx];
        array[idx + 1] += velocities[idx + 1];
        array[idx + 2] += velocities[idx + 2];

        if (array[idx]     >  bounds.x || array[idx]     < -bounds.x) velocities[idx]     *= -1;
        if (array[idx + 1] >  bounds.y || array[idx + 1] < -bounds.y) velocities[idx + 1] *= -1;
        if (array[idx + 2] >  bounds.z || array[idx + 2] < -bounds.z) velocities[idx + 2] *= -1;
      }
      attr.needsUpdate = true;
    }

    /* ─── connection update — spatial grid, squared distance ─── */
    function updateConnections() {
      const pArr = particleGeometry.getAttribute("position").array;

      buildGrid(pArr);

      let writeIndex = 0;
      let lineCount  = 0;

      for (let i = 0; i < POINT_COUNT; i++) {
        const ax = pArr[i * 3];
        const ay = pArr[i * 3 + 1];
        const az = pArr[i * 3 + 2];

        const cx = Math.floor(ax / CELL_SIZE);
        const cy = Math.floor(ay / CELL_SIZE);
        const cz = Math.floor(az / CELL_SIZE);

        /* check 3×3×3 neighbourhood */
        for (let nx = cx - 1; nx <= cx + 1; nx++) {
          for (let ny = cy - 1; ny <= cy + 1; ny++) {
            for (let nz = cz - 1; nz <= cz + 1; nz++) {
              const bucket = gridMap.get(cellKey(nx, ny, nz));
              if (!bucket) continue;

              for (let k = 0; k < bucket.length; k++) {
                const j = bucket[k];
                if (j <= i) continue; /* avoid duplicates */
                if (lineCount >= maxLineSegments) break;

                const dx = ax - pArr[j * 3];
                const dy = ay - pArr[j * 3 + 1];
                const dz = az - pArr[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < CONN_THRESHOLD_SQ) {
                  linePositions[writeIndex++] = ax;
                  linePositions[writeIndex++] = ay;
                  linePositions[writeIndex++] = az;
                  linePositions[writeIndex++] = pArr[j * 3];
                  linePositions[writeIndex++] = pArr[j * 3 + 1];
                  linePositions[writeIndex++] = pArr[j * 3 + 2];
                  lineCount += 2;
                }
              }
            }
          }
        }
      }

      lineGeometry.setDrawRange(0, lineCount);
      lineGeometry.attributes.position.needsUpdate = true;
    }

    /* ─── main loop ─── */
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      /* smooth mouse */
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      updateParticles();
      updateConnections();

      /* camera Y — lerp toward scroll target (no accumulation) */
      camera.position.y += (cameraYTarget - camera.position.y) * 0.04;

      /* group drift */
      group.rotation.y += 0.0002 + mouse.x * 0.0017;
      group.rotation.x += 0.00011 + (-mouse.y * 0.0012);

      /* layer parallax */
      particles.rotation.z       += 0.00017;
      particles.position.x        = mouse.x * 0.62;
      particles.position.y       += ((-mouse.y * 0.44) - particles.position.y) * 0.03;

      lineSegments.rotation.z    -= 0.0001;
      lineSegments.position.x   += ((mouse.x * 0.42) - lineSegments.position.x) * 0.03;
      lineSegments.position.y   += ((-mouse.y * 0.3)  - lineSegments.position.y) * 0.03;

      guideLine.position.x       += ((mouse.x * 0.24) - guideLine.position.x) * 0.03;
      guideLine.position.y       += ((-mouse.y * 0.18) - guideLine.position.y) * 0.03;

      glowOrb.position.x         += ((8 + mouse.x * 0.9)  - glowOrb.position.x) * 0.02;
      glowOrb.position.y         += ((-4 - mouse.y * 0.72) - glowOrb.position.y) * 0.02;

      renderer.render(scene, camera);
    }

    /* ─── destroy ─── */
    function destroy() {
      stop();
      window.removeEventListener("resize",            resize);
      window.removeEventListener("mousemove",         onMouseMove);
      window.removeEventListener("mouseleave",        onMouseLeave);
      window.removeEventListener("scroll",            onScroll);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      scene.traverse(function (object) {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          Array.isArray(object.material)
            ? object.material.forEach(function (m) { m.dispose(); })
            : object.material.dispose();
        }
      });
      renderer.dispose();
    }

    start();
    return { destroy };
  }

  window.createAboutSystemField = createAboutSystemField;
})();
