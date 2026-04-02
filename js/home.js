document.addEventListener("DOMContentLoaded", function () {
  initRevealSystem();
  initMagneticButtons();
  initHomeVisualTilt();
  initHomeThreeBackground();
});

function initRevealSystem() {
  const revealItems = document.querySelectorAll(".reveal, .reveal-delay, .reveal-delay-2");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
}

function initMagneticButtons() {
  const buttons = document.querySelectorAll(".magnetic-button");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!canHover) {
    return;
  }

  buttons.forEach(function (button) {
    button.addEventListener("mousemove", function (event) {
      const rect = button.getBoundingClientRect();
      const offsetX = event.clientX - rect.left - rect.width / 2;
      const offsetY = event.clientY - rect.top - rect.height / 2;

      const moveX = offsetX * 0.14;
      const moveY = offsetY * 0.14;

      button.style.transform = "translate(" + moveX + "px, " + moveY + "px)";
    });

    button.addEventListener("mouseleave", function () {
      button.style.transform = "translate(0, 0)";
    });
  });
}

function initHomeVisualTilt() {
  const shell = document.querySelector(".home-visual-shell");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (!shell || !canHover) {
    return;
  }

  shell.addEventListener("mousemove", function (event) {
    const rect = shell.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 8;
    const rotateX = ((centerY - y) / centerY) * 8;

    shell.style.transform =
      "perspective(1200px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
  });

  shell.addEventListener("mouseleave", function () {
    shell.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)";
  });
}

function initHomeThreeBackground() {
  if (typeof THREE === "undefined") {
    return;
  }

  const canvas = document.getElementById("homeSystemCanvas");
  if (!canvas) {
    return;
  }

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

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.54);
  scene.add(ambientLight);

  const warmLight = new THREE.PointLight(0xff7a18, 2.8, 260);
  warmLight.position.set(18, 14, 34);
  scene.add(warmLight);

  const amberLight = new THREE.PointLight(0xffb347, 2.0, 220);
  amberLight.position.set(-18, -10, 28);
  scene.add(amberLight);

  const goldLight = new THREE.PointLight(0xffd59d, 1.3, 180);
  goldLight.position.set(0, 22, 20);
  scene.add(goldLight);

  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  const emberGroup = new THREE.Group();
  const ringGroup = new THREE.Group();
  const shardGroup = new THREE.Group();
  const waveGroup = new THREE.Group();

  masterGroup.add(emberGroup);
  masterGroup.add(ringGroup);
  masterGroup.add(shardGroup);
  masterGroup.add(waveGroup);

  const isSmallScreen = window.innerWidth <= 720;
  const POINT_COUNT = isSmallScreen ? 340 : 820;
  const CONNECTION_LIMIT = POINT_COUNT * 6;
  const BOUNDS = { x: 34, y: 64, z: 22 };

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

    velocities[i3] = (Math.random() - 0.5) * 0.02;
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.01;

    const orangeBias = Math.random();

    if (orangeBias < 0.56) {
      colors[i3] = 1.0;
      colors[i3 + 1] = 0.48 + Math.random() * 0.18;
      colors[i3 + 2] = 0.08;
    } else if (orangeBias < 0.86) {
      colors[i3] = 1.0;
      colors[i3 + 1] = 0.70 + Math.random() * 0.14;
      colors[i3 + 2] = 0.28;
    } else {
      colors[i3] = 1.0;
      colors[i3 + 1] = 0.84 + Math.random() * 0.12;
      colors[i3 + 2] = 0.62;
    }
  }

  const emberGeometry = new THREE.BufferGeometry();
  emberGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  emberGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const emberMaterial = new THREE.PointsMaterial({
    size: 0.22,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.96,
    depthWrite: false,
    vertexColors: true,
    blending: THREE.AdditiveBlending
  });

  const embers = new THREE.Points(emberGeometry, emberMaterial);
  emberGroup.add(embers);

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
  emberGroup.add(lineSegments);

  const ringConfigs = [
    { radius: 10, tube: 0.04, color: 0xff7a18, x: 0.88, y: 0.18, speed: 0.0072 },
    { radius: 15, tube: 0.03, color: 0xffb347, x: 0.24, y: 1.1, speed: -0.0058 },
    { radius: 20, tube: 0.025, color: 0xffd59d, x: 1.18, y: 0.1, speed: 0.0034 }
  ];

  const rings = ringConfigs.map(function (config) {
    const geometry = new THREE.TorusGeometry(config.radius, config.tube, 14, 180);
    const material = new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: 0.2,
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

  const shardGeo = new THREE.BoxGeometry(0.8, 3.4, 0.05);
  const shards = [];

  for (let i = 0; i < 20; i++) {
    const material = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? 0xff7a18 : 0xffc57a,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });

    const shard = new THREE.Mesh(shardGeo, material);
    shard.position.set(
      (Math.random() - 0.5) * 24,
      (Math.random() - 0.5) * 28,
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
      driftZ: (Math.random() - 0.5) * 0.007,
      rotX: (Math.random() - 0.5) * 0.024,
      rotY: (Math.random() - 0.5) * 0.024,
      rotZ: (Math.random() - 0.5) * 0.024
    });
  }

  const shockwaveGeometry = new THREE.RingGeometry(4.2, 4.6, 120);
  const shockwaveMaterial = new THREE.MeshBasicMaterial({
    color: 0xffb347,
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending
  });

  const shockwave = new THREE.Mesh(shockwaveGeometry, shockwaveMaterial);
  shockwave.rotation.x = Math.PI / 2;
  waveGroup.add(shockwave);

  const mouse = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  };

  let scrollOffset = 0;
  let animationFrameId = null;
  let lastPulseTime = 0;

  const clock = new THREE.Clock();

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
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  function updateEmbers(elapsed) {
    const positionAttr = emberGeometry.getAttribute("position");
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

      const heatWave = Math.sin(elapsed * 0.7 + i * 0.012) * 0.0036;
      arr[i3] += heatWave;
      arr[i3 + 1] += heatWave * 0.9;

      arr[i3] += (basePositions[i3] - arr[i3]) * 0.00048;
      arr[i3 + 1] += (basePositions[i3 + 1] - arr[i3 + 1]) * 0.00048;
    }

    positionAttr.needsUpdate = true;
  }

  function updateConnections() {
    const particleArray = emberGeometry.getAttribute("position").array;
    let writeIndex = 0;
    let colorIndex = 0;
    let lineCount = 0;
    const maxDistance = 4.8;

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

          lineColors[colorIndex++] = 1.0 * strength;
          lineColors[colorIndex++] = 0.48 * strength;
          lineColors[colorIndex++] = 0.08 * strength;

          lineColors[colorIndex++] = 1.0 * strength;
          lineColors[colorIndex++] = 0.72 * strength;
          lineColors[colorIndex++] = 0.32 * strength;

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

      if (item.mesh.position.x > 16 || item.mesh.position.x < -16) {
        item.driftX *= -1;
      }

      if (item.mesh.position.y > 18 || item.mesh.position.y < -18) {
        item.driftY *= -1;
      }

      if (item.mesh.position.z > 14 || item.mesh.position.z < -14) {
        item.driftZ *= -1;
      }
    });
  }

  function updateShockwave(elapsed) {
    if (elapsed - lastPulseTime > 3.1) {
      lastPulseTime = elapsed;
      shockwave.scale.set(1, 1, 1);
      shockwaveMaterial.opacity = 0.46;
    }

    shockwave.scale.multiplyScalar(1.034);
    shockwaveMaterial.opacity *= 0.966;
    shockwave.rotation.z += 0.01;
  }

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    mouse.x += (mouse.targetX - mouse.x) * 0.045;
    mouse.y += (mouse.targetY - mouse.y) * 0.045;

    updateEmbers(elapsed);
    updateConnections();
    updateRings();
    updateShards();
    updateShockwave(elapsed);

    const scrollShift = scrollOffset * -0.001;
    camera.position.y += (scrollShift - camera.position.y) * 0.04;

    masterGroup.rotation.y += 0.0008;
    masterGroup.rotation.x += 0.0004;

    masterGroup.rotation.y += mouse.x * 0.0052;
    masterGroup.rotation.x += -mouse.y * 0.0038;

    masterGroup.position.x += ((mouse.x * 5.4) - masterGroup.position.x) * 0.04;
    masterGroup.position.y += (((-mouse.y * 4.2)) - masterGroup.position.y) * 0.04;

    emberGroup.rotation.z += 0.00046;
    shardGroup.rotation.y -= 0.0011;
    ringGroup.rotation.x += 0.00034;

    renderer.render(scene, camera);
  }
}