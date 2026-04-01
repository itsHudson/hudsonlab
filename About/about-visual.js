(function () {
  "use strict";

  function createAboutSystemField(options) {
    if (!options || !options.canvas || typeof THREE === "undefined") {
      return null;
    }

    var canvas = options.canvas;

    var renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);
    camera.position.set(0, 0, 26);

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.88);
    scene.add(ambientLight);

    var warmLight = new THREE.PointLight(0xa06337, 0.92, 120);
    warmLight.position.set(12, 10, 18);
    scene.add(warmLight);

    var sideLight = new THREE.PointLight(0xcf9a67, 0.58, 120);
    sideLight.position.set(-14, -8, 14);
    scene.add(sideLight);

    var group = new THREE.Group();
    scene.add(group);

    var mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    var POINT_COUNT = 205;
    var bounds = { x: 18, y: 28, z: 10 };

    var positions = [];
    var velocities = [];

    for (var i = 0; i < POINT_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * bounds.x * 2,
        (Math.random() - 0.5) * bounds.y * 2,
        (Math.random() - 0.5) * bounds.z * 2
      );

      velocities.push(
        (Math.random() - 0.5) * 0.0078,
        (Math.random() - 0.5) * 0.0078,
        (Math.random() - 0.5) * 0.0032
      );
    }

    var particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions.slice(), 3)
    );

    var particleMaterial = new THREE.PointsMaterial({
      color: 0xc78d57,
      size: 0.15,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    var particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    var maxLineSegments = POINT_COUNT * 10;
    var linePositions = new Float32Array(maxLineSegments * 3 * 2);

    var lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setDrawRange(0, 0);

    var lineMaterial = new THREE.LineBasicMaterial({
      color: 0x94603c,
      transparent: true,
      opacity: 0.14
    });

    var lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lineSegments);

    var guideCurve = new THREE.BufferGeometry();
    guideCurve.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        [
          -14, 16, -2,
          -7, 8, -1,
          -1, 1, 0,
           6, -8, 1,
          11, -18, 2
        ],
        3
      )
    );

    var guideMaterial = new THREE.LineBasicMaterial({
      color: 0x8d5a38,
      transparent: true,
      opacity: 0.065
    });

    var guideLine = new THREE.Line(guideCurve, guideMaterial);
    guideLine.rotation.z = -0.12;
    group.add(guideLine);

    var glowGeometry = new THREE.SphereGeometry(4.2, 20, 20);
    var glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4a170,
      transparent: true,
      opacity: 0.045
    });

    var glowOrb = new THREE.Mesh(glowGeometry, glowMaterial);
    glowOrb.position.set(8, -4, -1);
    group.add(glowOrb);

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("scroll", onScroll);

    var scrollOffset = 0;
    var animationFrameId = requestAnimationFrame(animate);

    function onMouseMove(event) {
      var width = window.innerWidth || 1;
      var height = window.innerHeight || 1;

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
      var width = window.innerWidth || 1;
      var height = window.innerHeight || 1;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    function updateParticles() {
      var attr = particleGeometry.getAttribute("position");
      var array = attr.array;

      for (var i = 0; i < POINT_COUNT; i++) {
        var idx = i * 3;

        array[idx] += velocities[idx];
        array[idx + 1] += velocities[idx + 1];
        array[idx + 2] += velocities[idx + 2];

        if (array[idx] > bounds.x || array[idx] < -bounds.x) {
          velocities[idx] *= -1;
        }
        if (array[idx + 1] > bounds.y || array[idx + 1] < -bounds.y) {
          velocities[idx + 1] *= -1;
        }
        if (array[idx + 2] > bounds.z || array[idx + 2] < -bounds.z) {
          velocities[idx + 2] *= -1;
        }
      }

      attr.needsUpdate = true;
    }

    function updateConnections() {
      var particleArray = particleGeometry.getAttribute("position").array;
      var writeIndex = 0;
      var lineCount = 0;

      for (var i = 0; i < POINT_COUNT; i++) {
        var ax = particleArray[i * 3];
        var ay = particleArray[i * 3 + 1];
        var az = particleArray[i * 3 + 2];

        for (var j = i + 1; j < POINT_COUNT; j++) {
          var bx = particleArray[j * 3];
          var by = particleArray[j * 3 + 1];
          var bz = particleArray[j * 3 + 2];

          var dx = ax - bx;
          var dy = ay - by;
          var dz = az - bz;
          var distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 5.45 && lineCount < maxLineSegments) {
            linePositions[writeIndex++] = ax;
            linePositions[writeIndex++] = ay;
            linePositions[writeIndex++] = az;
            linePositions[writeIndex++] = bx;
            linePositions[writeIndex++] = by;
            linePositions[writeIndex++] = bz;
            lineCount += 2;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineCount);
      lineGeometry.attributes.position.needsUpdate = true;
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      updateParticles();
      updateConnections();

      var scrollShift = scrollOffset * -0.00115;
      camera.position.y += (scrollShift - camera.position.y) * 0.04;

      group.rotation.y += 0.0002;
      group.rotation.x += 0.00011;

      group.rotation.y += mouse.x * 0.0017;
      group.rotation.x += -mouse.y * 0.0012;

      particles.rotation.z += 0.00017;
      particles.position.x = mouse.x * 0.62;
      particles.position.y += ((-mouse.y * 0.44) - particles.position.y) * 0.03;

      lineSegments.rotation.z -= 0.0001;
      lineSegments.position.x += ((mouse.x * 0.42) - lineSegments.position.x) * 0.03;
      lineSegments.position.y += ((-mouse.y * 0.3) - lineSegments.position.y) * 0.03;

      guideLine.position.x += ((mouse.x * 0.24) - guideLine.position.x) * 0.03;
      guideLine.position.y += ((-mouse.y * 0.18) - guideLine.position.y) * 0.03;

      glowOrb.position.x += ((8 + mouse.x * 0.9) - glowOrb.position.x) * 0.02;
      glowOrb.position.y += ((-4 - mouse.y * 0.72) - glowOrb.position.y) * 0.02;

      renderer.render(scene, camera);
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
      destroy: destroy
    };
  }

  window.createAboutSystemField = createAboutSystemField;
})();