const contributionData = {
  accounting: {
    number: "01",
    title: "Accounting & Financial Support",
    subtitle:
      "Supported daily bookkeeping and financial coordination while building practical awareness of accuracy and consistency in transaction-related work.",
    bullets: [
      "Assisted in daily bookkeeping and financial record management.",
      "Supported sales tracking and basic reporting processes.",
      "Gained hands-on exposure to multi-outlet financial operations.",
      "Learned to maintain accuracy and consistency in transaction handling."
    ],
    signal:
      "Demonstrates consistency, detail awareness, and the ability to support structured operational processes with care and accuracy.",
    note:
      "A support-focused contribution area centred on practical financial exposure rather than full ownership.",
    tags: ["Bookkeeping Support", "Sales Tracking", "Reporting", "Accuracy"]
  },

  hr: {
    number: "02",
    title: "Human Resources & Team Support",
    subtitle:
      "Participated in staff-related support activities and gained exposure to recruitment, onboarding, and team development processes.",
    bullets: [
      "Participated in recruitment and interview coordination.",
      "Contributed to improving basic interview and onboarding processes.",
      "Assisted in training new staff and supporting team development.",
      "Learned how people support aligns with operational needs."
    ],
    signal:
      "Reflects people support capability, coordination awareness, and practical involvement in team readiness and onboarding processes.",
    note:
      "This area reflects practical support within people-related operations and team readiness.",
    tags: ["Recruitment Support", "Interview Coordination", "Onboarding", "Team Support"]
  },

  operations: {
    number: "03",
    title: "Operations & SOP Development",
    subtitle:
      "Contributed to operational procedures that improved clarity, repeatability, and more consistent day-to-day execution.",
    bullets: [
      "Contributed to creating and refining Standard Operating Procedures (SOPs).",
      "Helped document workflows for daily operations, order processing, pricing structure, and customer service handling.",
      "Supported the development of structured operational guidelines.",
      "Learned the importance of process consistency and scalability."
    ],
    signal:
      "Shows strong process thinking, documentation ability, and a disciplined approach to operational clarity and repeatability.",
    note:
      "A strong indicator of process awareness, structure, and operational discipline.",
    tags: ["SOP Development", "Workflow Documentation", "Process Clarity", "Scalability"]
  },

  documentation: {
    number: "04",
    title: "Information Guide & Internal Documentation",
    subtitle:
      "Assisted in building internal reference materials that supported clarity, onboarding, and access to key operational information.",
    bullets: [
      "Assisted in developing an Information Guide SOP.",
      "Included company background and structure, communication channels, and fraud awareness guidelines.",
      "Helped ensure staff had clear and reliable reference materials.",
      "Improved internal information clarity and onboarding efficiency."
    ],
    signal:
      "Highlights clarity-building ability, internal communication support, and a structured approach to documentation that strengthens operational consistency.",
    note:
      "This category highlights the value of internal documentation as a support system for consistency.",
    tags: ["Internal Guide", "Reference Material", "Fraud Awareness", "Clarity"]
  },

  training: {
    number: "05",
    title: "Training & Knowledge Sharing",
    subtitle:
      "Supported staff learning by helping communicate operational knowledge in a clearer and more structured way.",
    bullets: [
      "Supported training for customer service standards.",
      "Supported training for product knowledge such as cakes and bakery items.",
      "Supported staff learning in POS system usage.",
      "Shared practical knowledge to help staff adapt more confidently to operations.",
      "Learned how to communicate complex processes in a simple and structured way."
    ],
    signal:
      "Demonstrates communication maturity, practical knowledge transfer, and the ability to make operational processes easier for others to adopt.",
    note:
      "A contribution area focused on enablement, clarity, and practical knowledge transfer.",
    tags: ["Staff Training", "Knowledge Sharing", "POS Usage", "Communication"]
  },

  customer: {
    number: "06",
    title: "Customer Experience & Communication",
    subtitle:
      "Handled customer-facing communication while supporting orders, inquiries, and service consistency under real operating conditions.",
    bullets: [
      "Managed customer interactions via WhatsApp and Facebook Messenger.",
      "Assisted in handling orders, inquiries, customer concerns, and complaints.",
      "Learned to maintain professional communication and service quality.",
      "Supported day-to-day customer experience through responsive communication."
    ],
    signal:
      "Reflects responsiveness, service awareness, and the ability to communicate clearly and professionally under day-to-day operational pressure.",
    note:
      "This reflects communication maturity, responsiveness, and service awareness.",
    tags: ["Customer Support", "WhatsApp", "Messenger", "Service Quality"]
  },

  marketing: {
    number: "07",
    title: "Marketing & Customer Engagement",
    subtitle:
      "Supported basic customer engagement efforts while gaining awareness of how operations influence reach, retention, and growth.",
    bullets: [
      "Supported execution of basic marketing and customer engagement strategies.",
      "Contributed ideas to improve customer reach and retention.",
      "Learned how operational decisions impact customer experience and business growth."
    ],
    signal:
      "Shows broader commercial awareness and the ability to connect day-to-day execution with customer engagement, retention, and business growth.",
    note:
      "A broader business-facing contribution area linked to customer engagement and commercial awareness.",
    tags: ["Customer Engagement", "Marketing Support", "Retention", "Business Growth"]
  },

  system: {
    number: "08",
    title: "System Implementation & Technical Support",
    subtitle:
      "Assisted in POS setup and troubleshooting while gaining exposure to standardization across outlets and store-level systems support.",
    bullets: [
      "Assisted in POS system setup and configuration.",
      "Supported troubleshooting of store-level technical issues.",
      "Gained exposure to system standardization across outlets.",
      "Learned how technology supports daily operational efficiency."
    ],
    signal:
      "Demonstrates systems readiness, practical troubleshooting awareness, and the ability to support technology use within live operational settings.",
    note:
      "This area connects operational understanding with systems readiness and technical support exposure.",
    tags: ["POS Setup", "Troubleshooting", "Standardization", "Efficiency"]
  },

  expansion: {
    number: "09",
    title: "Outlet Setup & Expansion Support",
    subtitle:
      "Participated in new outlet preparation by supporting staff readiness, system setup, and operational flow before launch.",
    bullets: [
      "Participated in new outlet setup and preparation.",
      "Supported staff readiness, system setup, and operational flow preparation.",
      "Contributed to multiple outlet openings including shopping malls.",
      "Learned how to support smoother operational launches."
    ],
    signal:
      "Highlights readiness planning, coordination ability, and practical support for structured rollout and launch preparation.",
    note:
      "A coordination-focused category connected to readiness, rollout support, and operational expansion.",
    tags: ["Outlet Setup", "Launch Support", "Readiness", "Expansion"]
  },

  problem: {
    number: "10",
    title: "Operational Problem-Solving",
    subtitle:
      "Assisted in handling store-level situations through structured support, calm responses, and practical judgement under pressure.",
    bullets: [
      "Assisted in handling customer complaints and service issues.",
      "Supported responses to equipment-related issues such as refrigeration problems.",
      "Assisted with unexpected store incidents when they arose.",
      "Followed and contributed to structured response procedures.",
      "Developed the ability to stay calm and solution-focused under pressure."
    ],
    signal:
      "Reflects composure, solution-focused judgement, and the ability to remain structured and supportive during real operational disruptions.",
    note:
      "This highlights resilience, composure, and consistent support in real-world operating conditions.",
    tags: ["Problem Handling", "Structured Response", "Store Incidents", "Pressure Management"]
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

renderContribution("accounting");

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