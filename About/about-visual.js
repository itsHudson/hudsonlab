(function () {
  "use strict";

  function createAboutThreeVisual(options) {
    if (!options || !options.container || !options.canvas || typeof THREE === "undefined") {
      return null;
    }

    const container = options.container;
    const canvas = options.canvas;
    const type = options.type || "warm-field";

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 18;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffa24c, 1.15, 100);
    pointLight.position.set(6, 7, 10);
    scene.add(pointLight);

    const group = new THREE.Group();
    scene.add(group);

    let particles = null;
    let lineSegments = null;
    let wireSphere = null;

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    const clock = new THREE.Clock();

    setupSceneByType();
    resize();

    const resizeObserver = new ResizeObserver(function () {
      resize();
    });

    resizeObserver.observe(container);

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    let animationFrameId = requestAnimationFrame(animate);

    function setupSceneByType() {
      if (type === "warm-field") {
        buildWarmField();
      } else if (type === "node-network") {
        buildNodeNetwork();
      } else {
        buildWarmField();
      }
    }

    function buildWarmField() {
      const particleCount = 170;
      const positions = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const radius = 4.7 + Math.random() * 2.8;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 5.6;

        positions[i * 3] = Math.cos(angle) * radius * (0.7 + Math.random() * 0.4);
        positions[i * 3 + 1] = height;
        positions[i * 3 + 2] = Math.sin(angle) * radius * (0.6 + Math.random() * 0.4);

        sizes[i] = 1 + Math.random() * 1.8;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        color: 0xff9d45,
        size: 0.12,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      particles = new THREE.Points(geometry, material);
      group.add(particles);

      const sphereGeometry = new THREE.SphereGeometry(4.6, 22, 22);
      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xffbf7a,
        wireframe: true,
        transparent: true,
        opacity: 0.12
      });

      wireSphere = new THREE.Mesh(sphereGeometry, wireMaterial);
      wireSphere.scale.set(1.15, 0.82, 1.05);
      group.add(wireSphere);
    }

    function buildNodeNetwork() {
      const particleCount = 72;
      const positions = [];
      const connectionPositions = [];

      for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 4.5 + Math.random() * 1.8;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi) * 0.82;
        const z = radius * Math.sin(phi) * Math.sin(theta);

        positions.push(x, y, z);
      }

      for (let i = 0; i < particleCount; i++) {
        const ax = positions[i * 3];
        const ay = positions[i * 3 + 1];
        const az = positions[i * 3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const bx = positions[j * 3];
          const by = positions[j * 3 + 1];
          const bz = positions[j * 3 + 2];

          const dx = ax - bx;
          const dy = ay - by;
          const dz = az - bz;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 2.55) {
            connectionPositions.push(ax, ay, az, bx, by, bz);
          }
        }
      }

      const pointsGeometry = new THREE.BufferGeometry();
      pointsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

      const pointsMaterial = new THREE.PointsMaterial({
        color: 0xff8a2d,
        size: 0.16,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      particles = new THREE.Points(pointsGeometry, pointsMaterial);
      group.add(particles);

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(connectionPositions, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffbb73,
        transparent: true,
        opacity: 0.18
      });

      lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      group.add(lineSegments);

      const sphereGeometry = new THREE.SphereGeometry(4.9, 24, 24);
      const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0xffa24c,
        wireframe: true,
        transparent: true,
        opacity: 0.10
      });

      wireSphere = new THREE.Mesh(sphereGeometry, wireMaterial);
      wireSphere.scale.set(1.08, 0.94, 1.08);
      group.add(wireSphere);
    }

    function onMouseMove(event) {
      const rect = container.getBoundingClientRect();
      mouse.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    function onMouseLeave() {
      mouse.targetX = 0;
      mouse.targetY = 0;
    }

    function resize() {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      group.rotation.y += 0.0028;
      group.rotation.x += 0.0012;

      group.rotation.y += mouse.x * 0.012;
      group.rotation.x += -mouse.y * 0.008;

      if (particles) {
        particles.rotation.y += type === "warm-field" ? 0.0018 : 0.0012;
        particles.rotation.x += type === "warm-field" ? 0.0009 : 0.0006;

        if (type === "warm-field") {
          particles.position.y = Math.sin(elapsed * 0.9) * 0.12;
        }
      }

      if (wireSphere) {
        wireSphere.rotation.x += 0.002;
        wireSphere.rotation.z += 0.0013;
        wireSphere.position.x = mouse.x * 0.35;
        wireSphere.position.y = -mouse.y * 0.28;
      }

      if (lineSegments && type === "node-network") {
        lineSegments.rotation.y -= 0.0011;
        lineSegments.rotation.x += 0.0008;
        lineSegments.position.x = mouse.x * 0.25;
        lineSegments.position.y = -mouse.y * 0.18;
      }

      renderer.render(scene, camera);
    }

    function destroy() {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);

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

  window.createAboutThreeVisual = createAboutThreeVisual;
})();