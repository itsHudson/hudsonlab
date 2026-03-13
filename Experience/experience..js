console.log("Experience page loaded.");

document.addEventListener("DOMContentLoaded", function () {
  initializeRevealMotion();
  initializeJourneyPath();
  initializeMetricCountUp();
});

function initializeRevealMotion() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-delay, .reveal-delay-2");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        let delay = "0s";

        if (entry.target.classList.contains("reveal-delay")) {
          delay = "0.12s";
        }

        if (entry.target.classList.contains("reveal-delay-2")) {
          delay = "0.22s";
        }

        entry.target.style.transition =
          "opacity 0.8s ease " + delay + ", transform 0.8s ease " + delay;

        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(function (element) {
    observer.observe(element);
  });
}

function initializeJourneyPath() {
  const pathCanvas = document.getElementById("journeyPathCanvas");
  const detailPanel = document.getElementById("journeyDetailPanel");
  const nodes = document.querySelectorAll(".journey-node");

  const detailStatus = document.getElementById("detailStatus");
  const detailImage = document.getElementById("detailImage");
  const detailTitle = document.getElementById("detailTitle");
  const detailSubtitle = document.getElementById("detailSubtitle");
  const detailFocus = document.getElementById("detailFocus");
  const detailValue = document.getElementById("detailValue");
  const detailDescription = document.getElementById("detailDescription");
  const detailChips = document.getElementById("detailChips");

  const stageData = {
    retail: {
      status: "Retail Foundation",
      image: "../Images/Work_ACCakeHouse.png",
      imageAlt: "AC Cake House",
      title: "AC Cake House",
      subtitle: "2017 · Retail and Customer Service Foundation",
      focus: "Customer service, financial handling, POS workflow, and daily business rhythm",
      value: "This stage built the first real exposure to how businesses operate in practice.",
      description:
        "My professional journey began in 2017 in the retail and food service industry, where I started as a Cashier Customer Service staff at AC Cake House in Kuala Lumpur. This stage built my foundation in customer interaction, financial handling, point-of-sale operations, and day-to-day business workflow.",
      chips: [
        "Customer service",
        "POS operations",
        "Cash handling",
        "Business awareness"
      ]
    },

    ucsi: {
      status: "Business Education Phase",
      image: "../Images/Edu_UCSI.png",
      imageAlt: "UCSI University",
      title: "UCSI University",
      subtitle: "2018–2020 · Diploma in Business Administration and Management",
      focus: "Business operations, finance, marketing, and applied management understanding",
      value: "This stage connected academic business learning with real workplace experience.",
      description:
        "While working part-time, I pursued my Diploma in Business Administration and Management at UCSI University. This period allowed me to connect academic knowledge in business operations, finance, and marketing with real-world retail experience, giving me a stronger understanding of how customer experience, operations, and financial performance are interconnected.",
      chips: [
        "Business operations",
        "Finance",
        "Marketing",
        "Applied business thinking"
      ]
    },

    management: {
      status: "Leadership and Operations Phase",
      image: "../Images/Work_ACCakeHouse.png",
      imageAlt: "AC Cake House leadership journey",
      title: "AC Cake House Leadership Journey",
      subtitle: "2020–2023 · Operations, Administration, and Outlet Management",
      focus: "Leadership, team management, hiring, training, inventory, and KPI-driven operations",
      value: "This stage developed ownership, discipline, and stronger data-aware decision making.",
      description:
        "Over the following years, I progressed into larger operational roles, including Customer Service Specialist, Administrative & Operations Manager, and eventually Outlet Manager. In these roles, I managed teams of up to 10–15 staff members, oversaw hiring, training, inventory, workflow coordination, and customer experience improvements.",
      chips: [
        "Leadership",
        "Team management",
        "Inventory control",
        "KPI awareness",
        "Operational execution"
      ]
    },

    webhelp: {
      status: "Global Support Phase",
      image: "../Images/Work_Webhelp.png",
      imageAlt: "Webhelp",
      title: "Webhelp",
      subtitle: "2023 · Customer Service Executive",
      focus: "SLA discipline, high-volume support, structured communication, and issue handling",
      value: "This stage strengthened consistency, responsiveness, and professional support under pressure.",
      description:
        "In 2023, I transitioned to Webhelp, where I supported Taiwan Foodpanda users in a high-volume, fast-paced environment. This role strengthened my communication under pressure, problem-solving ability, SLA awareness, and professional consistency while working within global customer support expectations.",
      chips: [
        "High-volume support",
        "SLA management",
        "Problem solving",
        "Global communication"
      ]
    },

    apu: {
      status: "Technology Transition Phase",
      image: "../Images/Edu_APU.png",
      imageAlt: "Asia Pacific University",
      title: "Asia Pacific University",
      subtitle: "2024–Present · Bachelor of Computer Science (Data Analytics)",
      focus: "Programming, analytics, software systems, and technical problem solving",
      value: "This stage transforms business experience into a stronger systems and data-driven direction.",
      description:
        "Recognising my growing interest in technology and analytics, I decided to continue my education and transition into the Bachelor of Computer Science (Data Analytics) program at APU in 2024. This marked the point where my business and operational background started connecting directly with technical systems, programming, and analytical thinking.",
      chips: [
        "Python, C, C++, Java",
        "SAS and R",
        "System design",
        "DBMS",
        "Concurrent programming"
      ]
    }
  };

  function renderStage(stageKey) {
    const data = stageData[stageKey];

    if (!data) {
      return;
    }

    detailPanel.classList.add("is-switching");

    setTimeout(function () {
      detailStatus.textContent = data.status;
      detailImage.src = data.image;
      detailImage.alt = data.imageAlt;
      detailTitle.textContent = data.title;
      detailSubtitle.textContent = data.subtitle;
      detailFocus.textContent = data.focus;
      detailValue.textContent = data.value;
      detailDescription.textContent = data.description;

      detailChips.innerHTML = "";

      data.chips.forEach(function (chipText) {
        const chip = document.createElement("span");
        chip.className = "journey-chip";
        chip.textContent = chipText;
        detailChips.appendChild(chip);
      });

      nodes.forEach(function (node) {
        node.classList.toggle("active", node.dataset.stage === stageKey);
      });

      detailPanel.classList.remove("is-switching");
    }, 160);
  }

  nodes.forEach(function (node) {
    node.addEventListener("click", function () {
      renderStage(node.dataset.stage);
    });
  });

  if (pathCanvas) {
    const pathObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            pathCanvas.classList.add("path-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    pathObserver.observe(pathCanvas);
  }

  renderStage("retail");
}

function initializeMetricCountUp() {
  const metrics = document.querySelectorAll(".impact-metric-box strong");

  const observer = new IntersectionObserver(
    function (entries, metricObserver) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        const element = entry.target;
        const target = Number(element.getAttribute("data-target"));

        animateMetric(element, target);
        metricObserver.unobserve(element);
      });
    },
    { threshold: 0.45 }
  );

  metrics.forEach(function (metric) {
    observer.observe(metric);
  });
}

function animateMetric(element, target) {
  const duration = 1400;
  const startTime = performance.now();
  const isNegative = target < 0;
  const absoluteTarget = Math.abs(target);

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(absoluteTarget * eased);

    element.textContent = (isNegative ? "-" : "+") + currentValue + "%";

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = (isNegative ? "-" : "+") + absoluteTarget + "%";
    }
  }

  requestAnimationFrame(update);
}