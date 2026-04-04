const contributionData = {
  communication: {
    number: "01",
    title: "Customer Support & Communication",
    subtitle:
      "Handled customer interactions across multiple communication channels while maintaining clarity, professionalism, and service focus in real-time support situations.",
    bullets: [
      "Handled customer inquiries through live chat, email, and calls.",
      "Assisted customers with order-related issues and service concerns.",
      "Maintained clear, professional, and customer-focused communication.",
      "Built confidence in responding to real customer needs across different support channels."
    ],
    signal:
      "Demonstrates communication clarity, service professionalism, and the ability to support customers effectively across fast-moving support environments.",
    note:
      "A customer-facing contribution area centred on service communication, responsiveness, and practical support delivery.",
    tags: ["Live Chat", "Email Support", "Calls", "Customer Communication"]
  },

  volume: {
    number: "02",
    title: "High-Volume Case Handling",
    subtitle:
      "Worked in a fast-paced support environment that required handling multiple active cases while staying organized, responsive, and efficient during peak periods.",
    bullets: [
      "Managed multiple live chat sessions at the same time.",
      "Handled up to 5 concurrent chats during active support periods.",
      "Worked efficiently during peak-hour demand and higher case volume.",
      "Improved prioritization, time management, and response discipline under pressure."
    ],
    signal:
      "Reflects strong adaptability, prioritization ability, and practical confidence in handling fast-paced workloads without losing service focus.",
    note:
      "This area highlights the ability to remain structured and efficient even when support demand increases significantly.",
    tags: ["Concurrent Chats", "Peak Hours", "Prioritization", "Time Management"]
  },

  compliance: {
    number: "03",
    title: "SOP Compliance & Process Accuracy",
    subtitle:
      "Worked within strict operational guidelines and service procedures while strengthening discipline in compliance, consistency, and response accuracy.",
    bullets: [
      "Followed strict company SOP and service guidelines in daily work.",
      "Ensured customer responses aligned with standardized procedures.",
      "Built stronger discipline in working within structured operating environments.",
      "Improved consistency and accuracy through rule-based service execution."
    ],
    signal:
      "Shows process discipline, accuracy awareness, and the ability to perform reliably within standardized operational systems.",
    note:
      "A strong indicator of consistency, compliance readiness, and respect for structured service processes.",
    tags: ["SOP Compliance", "Process Accuracy", "Consistency", "Structured Work"]
  },

  learning: {
    number: "04",
    title: "Self-Learning & Process Familiarity",
    subtitle:
      "Continuously improved workflow familiarity through repetition, observation, and active learning in order to respond faster and more accurately over time.",
    bullets: [
      "Continuously improved familiarity with internal workflows and SOPs.",
      "Learned to respond faster through experience and repeated case exposure.",
      "Strengthened accuracy by becoming more familiar with structured support processes.",
      "Built adaptability in a fast-paced and process-driven environment."
    ],
    signal:
      "Highlights self-learning ability, adaptability, and the habit of improving performance through experience and continuous familiarity-building.",
    note:
      "This contribution area reflects learning discipline and steady improvement through real operational exposure.",
    tags: ["Self-Learning", "Adaptability", "Workflow Familiarity", "Continuous Improvement"]
  },

  quality: {
    number: "05",
    title: "Quality Awareness & Performance Standards",
    subtitle:
      "Worked within a quality-assured support environment and developed stronger awareness of how accuracy, consistency, and compliance affect service standards.",
    bullets: [
      "Worked under a quality assurance evaluation system.",
      "Learned the importance of accuracy in customer response handling.",
      "Built awareness of consistency and compliance as part of performance quality.",
      "Developed stronger understanding of service quality standards in customer support."
    ],
    signal:
      "Demonstrates quality awareness, performance discipline, and growing understanding of how structured standards support reliable service delivery.",
    note:
      "This area connects service work with measurable standards, evaluation, and consistency in execution.",
    tags: ["QA Awareness", "Accuracy", "Compliance", "Service Standards"]
  },

  flow: {
    number: "06",
    title: "Process Understanding & Flow Thinking",
    subtitle:
      "Gained exposure to flowchart-based SOP systems and developed stronger appreciation for how structured processes improve clarity, speed, and decision-making.",
    bullets: [
      "Gained exposure to flowchart-based SOP systems.",
      "Learned how structured processes can simplify complex customer issues.",
      "Understood how clearer process flow supports faster decision-making.",
      "Developed stronger interest in process design, clarity, and structured problem handling."
    ],
    signal:
      "Reflects process-thinking ability, structured reasoning, and growing interest in how clearer systems improve execution and support decision quality.",
    note:
      "A broader thinking-oriented category that connects customer support work with structured process design and clarity.",
    tags: ["Flow Thinking", "Process Design", "Decision Support", "Clarity"]
  }
};

const detailPanel = document.getElementById("detailPanel");
const archiveButtons = document.querySelectorAll(".archive-button");
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("main section[id]");

function renderContribution(key) {
  const item = contributionData[key];
  if (!item || !detailPanel) return;

  const bulletsHtml = item.bullets.map((point) => `<li>${point}</li>`).join("");
  const tagsHtml = item.tags.map((tag) => `<span class="detail-tag">${tag}</span>`).join("");

  detailPanel.classList.remove("panel-transition");
  void detailPanel.offsetWidth;
  detailPanel.classList.add("panel-transition");

  detailPanel.innerHTML = `
    <div class="detail-top">
      <span class="detail-kicker">${item.number} / Contribution Area</span>
      <h3 class="detail-title">${item.title}</h3>
      <p class="detail-subtitle">${item.subtitle}</p>
    </div>

    <div class="detail-grid">
      <div class="detail-card">
        <h4>Contribution Highlights</h4>
        <ul class="detail-list">${bulletsHtml}</ul>
      </div>

      <div class="detail-card emphasis">
        <h4>Capability Signal</h4>
        <p class="detail-emphasis">${item.signal}</p>
      </div>
    </div>

    <div class="detail-card">
      <h4>Operational Lens</h4>
      <div class="detail-bottom">
        <p class="detail-note">${item.note}</p>
        <div class="detail-tags">${tagsHtml}</div>
      </div>
    </div>
  `;
}

archiveButtons.forEach((button) => {
  button.addEventListener("click", () => {
    archiveButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    renderContribution(button.dataset.key);
    button.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  });
});

renderContribution("communication");

const fadeItems = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.12 }
);

fadeItems.forEach((item) => observer.observe(item));

function updateActiveNav() {
  let currentId = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140 && rect.bottom >= 140) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active-link", link.getAttribute("href") === `#${currentId}`);
  });
}

function updateScrolledState() {
  document.body.classList.toggle("nav-scrolled", window.scrollY > 18);
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("scroll", updateScrolledState);

updateActiveNav();
updateScrolledState();

function initWholePageBackground() {
  if (typeof THREE === "undefined") return;

  const canvas = document.getElementById("pageSystemCanvas");
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 240);
  camera.position.set(0, 0, 36);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.42);
  scene.add(ambientLight);

  const orangeLight = new THREE.PointLight(0xff7a18, 1.4, 160);
  orangeLight.position.set(16, 12, 26);
  scene.add(orangeLight);

  const amberLight = new THREE.PointLight(0xffb347, 1.0, 140);
  amberLight.position.set(-14, -10, 22);
  scene.add(amberLight);

  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  const particleGroup = new THREE.Group();
  const arcGroup = new THREE.Group();
  masterGroup.add(particleGroup);
  masterGroup.add(arcGroup);

  const isSmallScreen = window.innerWidth <= 720;
  const POINT_COUNT = isSmallScreen ? 180 : 420;
  const CONNECTION_LIMIT = POINT_COUNT * 4;
  const BOUNDS = { x: 28, y: 48, z: 18 };

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
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.012;
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.006;

    const bias = Math.random();
    if (bias < 0.58) {
      colors[i3] = 1.0;
      colors[i3 + 1] = 0.54 + Math.random() * 0.12;
      colors[i3 + 2] = 0.16;
    } else if (bias < 0.88) {
      colors[i3] = 1.0;
      colors[i3 + 1] = 0.72 + Math.random() * 0.10;
      colors[i3 + 2] = 0.34;
    } else {
      colors[i3] = 1.0;
      colors[i3 + 1] = 0.84 + Math.random() * 0.08;
      colors[i3 + 2] = 0.60;
    }
  }

  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.18,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.78,
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
    opacity: 0.08,
    vertexColors: true,
    blending: THREE.AdditiveBlending
  });

  const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
  particleGroup.add(lineSegments);

  const arcConfigs = [
    { radius: 9, tube: 0.02, color: 0xff7a18, opacity: 0.08, x: 1.08, y: 0.24, z: 0.00, speed: 0.0018 },
    { radius: 13, tube: 0.018, color: 0xffb347, opacity: 0.06, x: 0.22, y: 1.14, z: 0.00, speed: -0.0012 },
    { radius: 18, tube: 0.014, color: 0xffd59d, opacity: 0.05, x: 1.24, y: 0.42, z: 0.00, speed: 0.0008 }
  ];

  const arcs = arcConfigs.map((config) => {
    const geometry = new THREE.TorusGeometry(config.radius, config.tube, 10, 180);
    const material = new THREE.MeshBasicMaterial({
      color: config.color,
      transparent: true,
      opacity: config.opacity,
      wireframe: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = config.x;
    mesh.rotation.y = config.y;
    mesh.rotation.z = config.z;
    arcGroup.add(mesh);

    return {
      mesh,
      speed: config.speed
    };
  });

  const mouse = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0
  };

  let scrollOffset = 0;
  const clock = new THREE.Clock();

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseleave", onMouseLeave);
  window.addEventListener("scroll", onScroll);

  resize();
  animate();

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

  function updateParticles(elapsed) {
    const positionAttr = particleGeometry.getAttribute("position");
    const arr = positionAttr.array;

    for (let i = 0; i < POINT_COUNT; i++) {
      const i3 = i * 3;

      arr[i3] += velocities[i3];
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2];

      if (arr[i3] > BOUNDS.x || arr[i3] < -BOUNDS.x) velocities[i3] *= -1;
      if (arr[i3 + 1] > BOUNDS.y || arr[i3 + 1] < -BOUNDS.y) velocities[i3 + 1] *= -1;
      if (arr[i3 + 2] > BOUNDS.z || arr[i3 + 2] < -BOUNDS.z) velocities[i3 + 2] *= -1;

      const drift = Math.sin(elapsed * 0.4 + i * 0.02) * 0.0026;
      arr[i3] += drift;
      arr[i3 + 1] += drift * 0.8;

      arr[i3] += (basePositions[i3] - arr[i3]) * 0.00032;
      arr[i3 + 1] += (basePositions[i3 + 1] - arr[i3 + 1]) * 0.00032;
    }

    positionAttr.needsUpdate = true;
  }

  function updateConnections() {
    const particleArray = particleGeometry.getAttribute("position").array;
    let writeIndex = 0;
    let colorIndex = 0;
    let lineCount = 0;
    const maxDistance = 4.6;

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

          const strength = (1 - distance / maxDistance) * 0.85;

          lineColors[colorIndex++] = 1.0 * strength;
          lineColors[colorIndex++] = 0.50 * strength;
          lineColors[colorIndex++] = 0.14 * strength;

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

  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    mouse.x += (mouse.targetX - mouse.x) * 0.03;
    mouse.y += (mouse.targetY - mouse.y) * 0.03;

    updateParticles(elapsed);
    updateConnections();

    arcs.forEach((arc) => {
      arc.mesh.rotation.z += arc.speed;
    });

    const scrollShift = scrollOffset * -0.00055;
    camera.position.y += (scrollShift - camera.position.y) * 0.03;

    masterGroup.rotation.y += 0.00024 + mouse.x * 0.0012;
    masterGroup.rotation.x += 0.00010 - mouse.y * 0.0007;

    masterGroup.position.x += ((mouse.x * 2.8) - masterGroup.position.x) * 0.022;
    masterGroup.position.y += (((-mouse.y * 2.4)) - masterGroup.position.y) * 0.022;

    particleGroup.rotation.z += 0.00016;
    arcGroup.rotation.y += 0.00012;

    renderer.render(scene, camera);
  }
}

initWholePageBackground();