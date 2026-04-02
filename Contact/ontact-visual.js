(function () {
  "use strict";

  function createContactSignalField(options) {
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

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 300);
    camera.position.set(0, 0, 22);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    const shaderGroup = new THREE.Group();
    const particleGroup = new THREE.Group();
    const ringGroup = new THREE.Group();
    const nodeGroup = new THREE.Group();

    masterGroup.add(shaderGroup);
    masterGroup.add(particleGroup);
    masterGroup.add(ringGroup);
    masterGroup.add(nodeGroup);

    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    let scrollOffset = 0;
    let currentMode = "overview";

    /* =========================
       SHADER PLANE
       ========================= */

    const shaderUniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uAccentMix: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: shaderUniforms,
      vertexShader: `
        varying vec2 vUv;

        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;

        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uAccentMix;
        uniform vec2 uResolution;

        float circle(vec2 uv, vec2 center, float radius, float blur) {
          float d = length(uv - center);
          return smoothstep(radius + blur, radius, d);
        }

        float ring(vec2 uv, vec2 center, float radius, float width) {
          float d = length(uv - center);
          return smoothstep(radius + width, radius, d) - smoothstep(radius, radius - width, d);
        }

        void main() {
          vec2 uv = vUv;
          vec2 centered = uv - 0.5;

          float t = uTime * 0.22;

          vec2 warped = centered;
          warped.x += sin((uv.y * 8.0) + t) * 0.03;
          warped.y += cos((uv.x * 7.0) - t * 1.2) * 0.03;

          float waveA = 0.0;
          waveA += ring(uv, vec2(0.5, 0.5), 0.16 + sin(t) * 0.01, 0.008);
          waveA += ring(uv, vec2(0.5, 0.5), 0.28 + cos(t * 0.9) * 0.01, 0.006);
          waveA += ring(uv, vec2(0.5, 0.5), 0.42 + sin(t * 0.7) * 0.01, 0.004);

          float mouseField = circle(uv, uMouse, 0.16, 0.24);
          float portal = circle(uv, vec2(0.5, 0.5), 0.20, 0.28);
          float plasma = 0.0;

          plasma += sin((warped.x * 12.0) + t * 1.4) * 0.5 + 0.5;
          plasma += cos((warped.y * 15.0) - t * 1.2) * 0.5 + 0.5;
          plasma += sin((length(centered) * 30.0) - t * 2.0) * 0.5 + 0.5;
          plasma /= 3.0;

          vec3 cyan = vec3(0.32, 0.92, 1.00);
          vec3 violet = vec3(0.44, 0.36, 1.00);
          vec3 amber = vec3(1.00, 0.64, 0.30);

          vec3 color = mix(cyan, violet, plasma * 0.6);
          color = mix(color, amber, uAccentMix * 0.55);

          float glow = portal * 0.42 + mouseField * 0.28 + waveA * 1.2;
          glow += plasma * 0.08;

          gl_FragColor = vec4(color * glow, glow * 0.38);
        }
      `
    });

    const shaderPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(42, 28, 1, 1),
      shaderMaterial
    );
    shaderPlane.position.z = -10;
    shaderGroup.add(shaderPlane);

    /* =========================
       PARTICLES
       ========================= */

    const POINT_COUNT = window.innerWidth <= 640 ? 240 : 520;
    const CONNECTION_LIMIT = POINT_COUNT * 6;
    const BOUNDS = { x: 26, y: 18, z: 16 };

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

      velocities[i3] = (Math.random() - 0.5) * 0.014;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.014;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.008;

      const mixMode = Math.random();

      if (mixMode < 0.5) {
        colors[i3] = 0.42;
        colors[i3 + 1] = 0.93;
        colors[i3 + 2] = 1.0;
      } else if (mixMode < 0.82) {
        colors[i3] = 0.44;
        colors[i3 + 1] = 0.36;
        colors[i3 + 2] = 1.0;
      } else {
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.66;
        colors[i3 + 2] = 0.32;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.13,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.86,
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
      opacity: 0.16,
      vertexColors: true,
      blending: THREE.AdditiveBlending
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    particleGroup.add(lines);

    /* =========================
       SIGNAL RINGS
       ========================= */

    const ringConfigs = [
      { radius: 3.6, color: 0x68e9ff, opacity: 0.22, speed: 0.006 },
      { radius: 5.4, color: 0x7157ff, opacity: 0.18, speed: -0.0044 },
      { radius: 7.8, color: 0xffa248, opacity: 0.10, speed: 0.0028 }
    ];

    const rings = ringConfigs.map(function (config) {
      const geometry = new THREE.TorusGeometry(config.radius, 0.04, 16, 160);
      const material = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: config.opacity,
        wireframe: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = 1.16;
      mesh.rotation.y = Math.random() * Math.PI;
      ringGroup.add(mesh);

      return {
        mesh: mesh,
        speed: config.speed
      };
    });

    /* =========================
       GLOW NODES
       ========================= */

    const nodeGeometry = new THREE.SphereGeometry(0.16, 10, 10);
    const nodeConfigs = [
      { x: -6.4, y: -2.2, z: 1, color: 0x68e9ff },
      { x: 0.0, y: 3.2, z: 0, color: 0x7157ff },
      { x: 6.8, y: -1.8, z: 1.4, color: 0xffa248 }
    ];

    const nodes = nodeConfigs.map(function (config) {
      const material = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.9
      });

      const node = new THREE.Mesh(nodeGeometry, material);
      node.position.set(config.x, config.y, config.z);
      nodeGroup.add(node);

      return node;
    });

    const clock = new THREE.Clock();
    let animationFrameId = null;

    const modeProfiles = {
      overview: {
        accentMix: 0.12,
        particleOpacity: 0.84,
        lineOpacity: 0.16,
        lineDistance: 2.6,
        ringScale: 1,
        ringOpacity: 0.18
      },
      email: {
        accentMix: 0.24,
        particleOpacity: 0.9,
        lineOpacity: 0.24,
        lineDistance: 3.0,
        ringScale: 1.06,
        ringOpacity: 0.22
      },
      linkedin: {
        accentMix: 0.05,
        particleOpacity: 0.88,
        lineOpacity: 0.20,
        lineDistance: 2.8,
        ringScale: 1.04,
        ringOpacity: 0.20
      },
      github: {
        accentMix: 0.18,
        particleOpacity: 0.94,
        lineOpacity: 0.26,
        lineDistance: 3.1,
        ringScale: 1.08,
        ringOpacity: 0.24
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

      shaderUniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    }

    function onMouseMove(event) {
      const width = window.innerWidth || 1;
      const height = window.innerHeight || 1;

      mouse.targetX = (event.clientX / width - 0.5) * 2;
      mouse.targetY = (event.clientY / height - 0.5) * 2;

      shaderUniforms.uMouse.value.set(
        event.clientX / width,
        1 - event.clientY / height
      );
    }

    function onMouseLeave() {
      mouse.targetX = 0;
      mouse.targetY = 0;
      shaderUniforms.uMouse.value.set(0.5, 0.5);
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

        const pulse = Math.sin(elapsed * 0.5 + i * 0.012) * 0.0024;
        arr[i3] += pulse;
        arr[i3 + 1] += pulse * 0.8;

        arr[i3] += (basePositions[i3] - arr[i3]) * 0.00036;
        arr[i3 + 1] += (basePositions[i3 + 1] - arr[i3 + 1]) * 0.00036;
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

          if (distance < modeTarget.lineDistance && lineCount < CONNECTION_LIMIT) {
            linePositions[writeIndex++] = ax;
            linePositions[writeIndex++] = ay;
            linePositions[writeIndex++] = az;
            linePositions[writeIndex++] = bx;
            linePositions[writeIndex++] = by;
            linePositions[writeIndex++] = bz;

            const strength = 1 - distance / modeTarget.lineDistance;

            lineColors[colorIndex++] = 0.42 * strength;
            lineColors[colorIndex++] = 0.93 * strength;
            lineColors[colorIndex++] = 1.0 * strength;

            lineColors[colorIndex++] = 0.44 * strength;
            lineColors[colorIndex++] = 0.36 * strength;
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

    function updateRings() {
      rings.forEach(function (ring) {
        ring.mesh.rotation.z += ring.speed;
        ring.mesh.scale.lerp(
          new THREE.Vector3(modeTarget.ringScale, modeTarget.ringScale, modeTarget.ringScale),
          0.05
        );
        ring.mesh.material.opacity += (modeTarget.ringOpacity - ring.mesh.material.opacity) * 0.05;
      });
    }

    function updateNodes(elapsed) {
      nodes.forEach(function (node, index) {
        node.position.z = Math.sin(elapsed * 1.4 + index * 0.8) * 0.8;
        node.scale.setScalar(1 + Math.sin(elapsed * 2.1 + index) * 0.14);
      });
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      shaderUniforms.uTime.value = elapsed;
      shaderUniforms.uAccentMix.value += (modeTarget.accentMix - shaderUniforms.uAccentMix.value) * 0.04;

      updateParticles(elapsed);
      updateConnections();
      updateRings();
      updateNodes(elapsed);

      const scrollShift = scrollOffset * -0.0004;
      camera.position.y += (scrollShift - camera.position.y) * 0.04;

      masterGroup.rotation.y += 0.00035;
      masterGroup.rotation.x += 0.00014;

      masterGroup.rotation.y += mouse.x * 0.0042;
      masterGroup.rotation.x += -mouse.y * 0.0032;

      masterGroup.position.x += ((mouse.x * 3.8) - masterGroup.position.x) * 0.04;
      masterGroup.position.y += (((-mouse.y * 2.8)) - masterGroup.position.y) * 0.04;

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

  window.createContactSignalField = createContactSignalField;
})();