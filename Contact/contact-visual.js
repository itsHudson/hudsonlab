(function () {
  "use strict";

  function createContactGalaxyBackground(options) {
    if (typeof THREE === "undefined") {
      return null;
    }

    if (!options || !options.containerId) {
      return null;
    }

    const container = document.getElementById(options.containerId);

    if (!container) {
      return null;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.set(0, 0, 26);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const galaxyGroup = new THREE.Group();
    galaxyGroup.position.set(6.1, 0.6, -10.5);
    scene.add(galaxyGroup);

    const parameters = {
      count: 7600,
      size: 0.046,
      radius: 13.5,
      branches: 4,
      spin: 1.42,
      randomness: 0.52,
      randomnessPower: 2.7,
      verticalThickness: 0.24,
      innerColor: new THREE.Color("#ffd7ad"),
      midColor: new THREE.Color("#ff9a39"),
      outerColor: new THREE.Color("#ffffff")
    };

    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * parameters.radius;
      const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;
      const spinAngle = radius * parameters.spin;

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius *
        0.17;

      const randomY =
        Math.pow(Math.random(), 1.8) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.verticalThickness *
        (0.4 + radius * 0.08);

      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius *
        0.17;

      positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = parameters.innerColor.clone();

      if (radius < parameters.radius * 0.45) {
        mixedColor.lerp(parameters.midColor, radius / (parameters.radius * 0.45));
      } else {
        mixedColor.copy(parameters.midColor).lerp(
          parameters.outerColor,
          (radius - parameters.radius * 0.45) / (parameters.radius * 0.55)
        );
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    const galaxyGeometry = new THREE.BufferGeometry();
    galaxyGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const galaxyMaterial = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.92,
      vertexColors: true
    });

    const galaxyPoints = new THREE.Points(galaxyGeometry, galaxyMaterial);
    galaxyGroup.add(galaxyPoints);

    const coreGeometry = new THREE.SphereGeometry(0.92, 32, 32);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xffc27a,
      transparent: true,
      opacity: 0.18
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    galaxyGroup.add(core);

    const haloGeometry = new THREE.SphereGeometry(2.2, 32, 32);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8c2b,
      transparent: true,
      opacity: 0.055
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    galaxyGroup.add(halo);

    const dustCount = 900;
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      dustPositions[i3] = (Math.random() - 0.5) * 68;
      dustPositions[i3 + 1] = (Math.random() - 0.5) * 24;
      dustPositions[i3 + 2] = (Math.random() - 0.5) * 54;
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));

    const dustMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.028,
      transparent: true,
      opacity: 0.08,
      depthWrite: false
    });

    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    const mouse = { x: 0, y: 0 };
    let animationFrameId = null;

    function handleMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();

    function animate() {
      const elapsed = clock.getElapsedTime();

      galaxyGroup.rotation.x = 1.02 + Math.sin(elapsed * 0.22) * 0.035 + mouse.y * 0.035;
      galaxyGroup.rotation.y = -0.52 + Math.sin(elapsed * 0.18) * 0.04 + mouse.x * 0.055;
      galaxyGroup.rotation.z = 0.42 + Math.sin(elapsed * 0.26) * 0.018 + mouse.x * 0.01;

      galaxyGroup.position.x = 6.1 + mouse.x * 0.42;
      galaxyGroup.position.y = 0.6 + mouse.y * 0.22 + Math.sin(elapsed * 0.30) * 0.12;

      core.scale.setScalar(1 + Math.sin(elapsed * 1.05) * 0.035);
      halo.scale.setScalar(1 + Math.sin(elapsed * 0.72) * 0.045);

      dust.rotation.y = elapsed * 0.004;
      dust.rotation.x = Math.sin(elapsed * 0.03) * 0.015;

      camera.position.x += ((mouse.x * 0.18) - camera.position.x) * 0.02;
      camera.position.y += ((mouse.y * 0.08) - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    function destroy() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

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

      if (renderer.domElement && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    }

    return {
      destroy: destroy
    };
  }

  window.createContactGalaxyBackground = createContactGalaxyBackground;
})();