const contributionData = {
  subjects: {
    number: "01",
    title: "Academic Exposure",
    subtitle:
      "Completed a range of computing and data-related subjects that built a broad introduction to technical, analytical, and system-focused learning.",
    bullets: [
      "Studied programming through Python, C, Java, and C++.",
      "Learned database fundamentals through SQL and introduction to database subjects.",
      "Gained exposure to data-related subjects such as Data Management and Data Mining & Predictive Modelling using SAS tools.",
      "Completed mathematics, artificial intelligence, data structures, web development, system development, networking, Linux administration, and assembly-related subjects."
    ],
    signal:
      "Demonstrates broad academic exposure, foundational technical understanding, and readiness to learn across multiple computing and data-related areas.",
    note:
      "A foundation-focused category that reflects structured academic exposure rather than deep specialization in only one area.",
    tags: ["Programming", "Database", "Analytics", "Systems"]
  },

  projects: {
    number: "02",
    title: "Academic Projects",
    subtitle:
      "Applied academic concepts through coursework and hands-on projects across web, system, programming, and data-related contexts.",
    bullets: [
      "Developed a web-based learning system for a web application module.",
      "Built a medical system as a Java OOP project.",
      "Implemented a flight-related system using concurrent programming in Java.",
      "Created a library-related system through low-level and structured programming.",
      "Practiced stack, queue, and linked list implementations and applied data analysis techniques using SAS tools."
    ],
    signal:
      "Reflects project-based learning, practical implementation ability, and growing confidence in turning academic concepts into working systems and exercises.",
    note:
      "This area highlights practical learning and the ability to connect classroom knowledge with implementation work.",
    tags: ["Web System", "Java Project", "Concurrent Programming", "Data Structures"]
  },

  data: {
    number: "03",
    title: "Data & Analytical Understanding",
    subtitle:
      "Built a basic understanding of how data can be structured, processed, and analyzed through academic learning and analytical subject exposure.",
    bullets: [
      "Developed a basic understanding of how data can be organized and managed.",
      "Learned how data can be processed and analyzed in more structured ways.",
      "Built awareness of analytical tools and techniques through coursework.",
      "Strengthened interest in how data can support clearer understanding and decision making."
    ],
    signal:
      "Shows the early development of data-oriented thinking and a growing analytical mindset supported by foundational academic exposure.",
    note:
      "A learning-focused category centred on understanding data as a structured and meaningful part of technical problem solving.",
    tags: ["Data Thinking", "Analytics", "Structured Data", "Understanding"]
  },

  thinking: {
    number: "04",
    title: "Logical Thinking & System Perspective",
    subtitle:
      "Improved the ability to approach problems in a more logical, step-by-step, and system-oriented way through technical learning across different subjects.",
    bullets: [
      "Learned to approach problems using logical and step-by-step thinking.",
      "Gained exposure to different programming paradigms and system design approaches.",
      "Improved understanding of how systems are built from both technical and operational perspectives.",
      "Built stronger awareness of how data and systems support real-world processes and decisions."
    ],
    signal:
      "Highlights structured reasoning, systems awareness, and the ability to understand technical work beyond only writing code.",
    note:
      "This area reflects broader thinking development across logic, systems, and practical technical understanding.",
    tags: ["Logical Thinking", "System Design", "Technical Perspective", "Decision Support"]
  },

  transition: {
    number: "05",
    title: "Transition & Learning Motivation",
    subtitle:
      "This academic journey was shaped by a personal transition from an operations background into a more technical and analytical direction.",
    bullets: [
      "Previously built several years of working experience in operations before pursuing the degree.",
      "Was frequently exposed to data in daily work processes before entering academic study.",
      "Developed interest in understanding data in a more structured and meaningful way.",
      "Pursued Data Analytics studies to build stronger technical foundations and a more analytical approach to problem solving."
    ],
    signal:
      "Demonstrates clear learning motivation, intentional growth, and a purposeful transition from practical operations into structured technical development.",
    note:
      "A transition-focused category that connects past work experience with current academic direction and long-term learning growth.",
    tags: ["Learning Motivation", "Transition", "Operations Background", "Growth"]
  },

  reflection: {
    number: "06",
    title: "Learning Reflection",
    subtitle:
      "The overall learning experience supported a gradual shift from an operational background toward a more structured, technical, and data-oriented mindset.",
    bullets: [
      "Provided an introduction to technical and analytical concepts across multiple areas.",
      "Helped build a more structured and data-oriented way of thinking.",
      "Encouraged continuous learning when approaching unfamiliar technical challenges.",
      "Strengthened adaptability while learning new concepts and technical approaches."
    ],
    signal:
      "Reflects adaptability, continuous learning, and steady growth in confidence when moving into unfamiliar technical and analytical areas.",
    note:
      "This area captures the broader meaning of the academic phase as a foundation for long-term technical development.",
    tags: ["Reflection", "Adaptability", "Continuous Learning", "Technical Growth"]
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
      <span class="detail-kicker">${item.number} / Learning Area</span>
      <h3 class="detail-title">${item.title}</h3>
      <p class="detail-subtitle">${item.subtitle}</p>
    </div>

    <div class="detail-grid">
      <div class="detail-card">
        <h4>Learning Highlights</h4>
        <ul class="detail-list">${bulletsHtml}</ul>
      </div>

      <div class="detail-card emphasis">
        <h4>Capability Signal</h4>
        <p class="detail-emphasis">${item.signal}</p>
      </div>
    </div>

    <div class="detail-card">
      <h4>Academic Lens</h4>
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

renderContribution("subjects");

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