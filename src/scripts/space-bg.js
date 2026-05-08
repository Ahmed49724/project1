/* ============================================================
   SPACE BACKGROUND v3 — Three.js Particle System
   Uses PointsMaterial + canvas glow textures (no custom GLSL)
   Layers: twinkling stars (5 groups) · super-stars · giant
           pulsing beacons · warp hyperspace · nebula clouds ·
           shooting stars · mouse parallax
   ============================================================ */
(function () {
  'use strict';

  function init() {
    if (typeof THREE === 'undefined') { setTimeout(init, 100); return; }

    const canvas = document.getElementById('space-canvas');
    if (!canvas) return;

    /* ── Renderer ──────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 4000
    );
    camera.position.z = 400;

    /* ══════════════════════════════════════════════════════════
       GLOW TEXTURES  (canvas radial-gradient → CanvasTexture)
    ══════════════════════════════════════════════════════════ */
    function makeGlow(px, stops) {
      const c   = document.createElement('canvas');
      c.width   = c.height = px;
      const ctx = c.getContext('2d');
      const h   = px / 2;
      const g   = ctx.createRadialGradient(h, h, 0, h, h, h);
      stops.forEach(function (s) { g.addColorStop(s[0], s[1]); });
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, px, px);
      return new THREE.CanvasTexture(c);
    }

    var texStar = makeGlow(64, [
      [0.00, 'rgba(255,255,255,1.0)'],
      [0.10, 'rgba(210,235,255,0.90)'],
      [0.28, 'rgba(160,205,255,0.55)'],
      [0.55, 'rgba( 90,150,255,0.18)'],
      [1.00, 'rgba(  0,  0,  0,0.0)'],
    ]);

    var texGiant = makeGlow(128, [
      [0.00, 'rgba(255,255,255,1.0)'],
      [0.07, 'rgba(255,225,140,0.95)'],
      [0.22, 'rgba(255,155, 50,0.65)'],
      [0.50, 'rgba(255, 70, 10,0.20)'],
      [1.00, 'rgba(  0,  0,  0,0.0)'],
    ]);

    var texWarp = makeGlow(64, [
      [0.00, 'rgba(255,255,255,1.0)'],
      [0.09, 'rgba(175,220,255,0.92)'],
      [0.32, 'rgba( 70,155,255,0.42)'],
      [0.65, 'rgba( 35, 75,255,0.10)'],
      [1.00, 'rgba(  0,  0,  0,0.0)'],
    ]);

    /* ══════════════════════════════════════════════════════════
       HELPER — build a geometry with random spherical positions
    ══════════════════════════════════════════════════════════ */
    var VIVID_PALETTE = [
      [1.00, 1.00, 1.00],   // white  ×4 (most common)
      [1.00, 1.00, 1.00],
      [1.00, 1.00, 1.00],
      [1.00, 1.00, 1.00],
      [0.68, 0.88, 1.00],   // ice-blue
      [0.52, 0.74, 1.00],   // deep blue
      [1.00, 0.92, 0.50],   // warm gold
      [1.00, 0.78, 0.28],   // amber
      [1.00, 0.50, 0.34],   // red-orange
      [0.30, 1.00, 0.95],   // cyan
      [0.88, 0.50, 1.00],   // violet
    ];

    function buildGeo(count, rMin, rMax, palette) {
      var pos = new Float32Array(count * 3);
      var col = new Float32Array(count * 3);
      for (var i = 0; i < count; i++) {
        var i3    = i * 3;
        var theta = Math.random() * Math.PI * 2;
        var phi   = Math.acos(2 * Math.random() - 1);
        var r     = rMin + Math.random() * (rMax - rMin);
        pos[i3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i3 + 2] = r * Math.cos(phi);
        var c = palette[Math.floor(Math.random() * palette.length)];
        col[i3]     = c[0];
        col[i3 + 1] = c[1];
        col[i3 + 2] = c[2];
      }
      var geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
      return geo;
    }

    /* ══════════════════════════════════════════════════════════
       LAYER 1 — 6 TWINKLING STAR GROUPS  (7 200 total)
       Each group gets a different opacity phase → stars appear
       to twinkle independently even though it's per-group.
    ══════════════════════════════════════════════════════════ */
    var twinkleGroups = [];
    for (var g = 0; g < 6; g++) {
      var geo = buildGeo(1200, 560, 1900, VIVID_PALETTE);
      var mat = new THREE.PointsMaterial({
        size:            4.8,
        map:             texStar,
        vertexColors:    true,
        transparent:     true,
        opacity:         1,
        sizeAttenuation: true,
        blending:        THREE.AdditiveBlending,
        depthWrite:      false,
        alphaTest:       0.004,
      });
      var pts = new THREE.Points(geo, mat);
      scene.add(pts);
      twinkleGroups.push({ pts: pts, mat: mat, phase: (g / 6) * Math.PI * 2 });
    }

    /* ══════════════════════════════════════════════════════════
       LAYER 2 — SUPER-STARS  (100 brighter, larger)
    ══════════════════════════════════════════════════════════ */
    var superGeo = buildGeo(160, 420, 1300, VIVID_PALETTE);
    var superMat = new THREE.PointsMaterial({
      size:            8.5,
      map:             texStar,
      vertexColors:    true,
      transparent:     true,
      opacity:         0.95,
      sizeAttenuation: true,
      blending:        THREE.AdditiveBlending,
      depthWrite:      false,
      alphaTest:       0.004,
    });
    var superStars = new THREE.Points(superGeo, superMat);
    scene.add(superStars);

    /* ══════════════════════════════════════════════════════════
       LAYER 3 — GIANT PULSING BEACONS  (24 focal stars)
    ══════════════════════════════════════════════════════════ */
    var GIANT_PAL = [
      [1.00, 0.90, 0.45],   // warm yellow
      [0.58, 0.88, 1.00],   // blue-white
      [1.00, 0.50, 0.30],   // red supergiant
      [0.35, 1.00, 0.92],   // cyan
      [0.92, 0.55, 1.00],   // violet
      [1.00, 1.00, 0.82],   // pale white-gold
    ];
    var giantGeo = buildGeo(24, 380, 950, GIANT_PAL);
    var giantMat = new THREE.PointsMaterial({
      size:            16,
      map:             texGiant,
      vertexColors:    true,
      transparent:     true,
      opacity:         0.90,
      sizeAttenuation: true,
      blending:        THREE.AdditiveBlending,
      depthWrite:      false,
      alphaTest:       0.004,
    });
    var giantStars = new THREE.Points(giantGeo, giantMat);
    scene.add(giantStars);

    /* ══════════════════════════════════════════════════════════
       LAYER 4 — WARP / HYPERSPACE  (650 stars rushing toward you)
       They fly along +z; perspective makes them grow naturally.
    ══════════════════════════════════════════════════════════ */
    var WARP_N     = 650;
    var warpPos    = new Float32Array(WARP_N * 3);
    var warpSpeeds = new Float32Array(WARP_N);
    for (var w = 0; w < WARP_N; w++) {
      var w3 = w * 3;
      warpPos[w3]     = (Math.random() - 0.5) * 2800;
      warpPos[w3 + 1] = (Math.random() - 0.5) * 2800;
      warpPos[w3 + 2] = -2200 + Math.random() * 2750;
      warpSpeeds[w] = 3.5 + Math.random() * 10.5;
    }
    var warpGeo = new THREE.BufferGeometry();
    warpGeo.setAttribute('position', new THREE.BufferAttribute(warpPos, 3));
    var warpMat = new THREE.PointsMaterial({
      size:            3.5,
      map:             texWarp,
      color:           0x99ccff,
      transparent:     true,
      opacity:         0.80,
      sizeAttenuation: true,
      blending:        THREE.AdditiveBlending,
      depthWrite:      false,
      alphaTest:       0.004,
    });
    var warpPoints = new THREE.Points(warpGeo, warpMat);
    scene.add(warpPoints);

    /* ══════════════════════════════════════════════════════════
       LAYER 5 — NEBULA CLOUDS  (3 vivid clusters)
    ══════════════════════════════════════════════════════════ */
    (function () {
      var PER = 500;
      var N   = PER * 3;
      var pos = new Float32Array(N * 3);
      var col = new Float32Array(N * 3);
      var clusters = [
        { cx: -400, cy:  260, cz: -320, s: 360, pal: [[0.62,0.14,1],[0.78,0.20,1],[0.48,0.10,0.90]] },
        { cx:  380, cy: -220, cz: -180, s: 310, pal: [[0.00,0.90,0.88],[0.16,0.74,1],[0.00,0.80,0.95]] },
        { cx:   55, cy:  130, cz: -520, s: 400, pal: [[0.96,0.18,0.62],[0.88,0.12,0.50],[1.00,0.38,0.72]] },
      ];
      for (var ci = 0; ci < clusters.length; ci++) {
        var cl = clusters[ci];
        for (var j = 0; j < PER; j++) {
          var idx = (ci * PER + j) * 3;
          pos[idx]     = cl.cx + (Math.random() - 0.5) * cl.s;
          pos[idx + 1] = cl.cy + (Math.random() - 0.5) * cl.s;
          pos[idx + 2] = cl.cz + (Math.random() - 0.5) * cl.s * 0.45;
          var nc       = cl.pal[Math.floor(Math.random() * cl.pal.length)];
          col[idx]     = nc[0];
          col[idx + 1] = nc[1];
          col[idx + 2] = nc[2];
        }
      }
      var geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
      var mat = new THREE.PointsMaterial({
        size:            36,
        vertexColors:    true,
        transparent:     true,
        opacity:         0.32,
        sizeAttenuation: true,
        blending:        THREE.AdditiveBlending,
        depthWrite:      false,
      });
      var nebula = new THREE.Points(geo, mat);
      scene.add(nebula);
      scene.userData.nebula = nebula;
    }());

    /* ══════════════════════════════════════════════════════════
       LAYER 6 — SHOOTING STARS  (pool of 8)
    ══════════════════════════════════════════════════════════ */
    var shootPool = [];

    function spawnShootingStar() {
      var ox   = (Math.random() - 0.5) * 1900;
      var oy   = 400 + Math.random() * 540;
      var oz   = -40 + Math.random() * 80;
      var side = Math.random() > 0.5 ? 1 : -1;
      var vx   = side * (0.38 + Math.random() * 0.85);
      var vy   = -(1.02 + Math.random() * 0.95);
      var vlen = Math.hypot(vx, vy);
      var ss   = {
        ox: ox, oy: oy, oz: oz,
        vx: vx / vlen, vy: vy / vlen,
        progress:    0,
        trailLen:    95 + Math.random() * 135,
        speed:       9 + Math.random() * 11,
        maxProgress: 560 + Math.random() * 360,
        geo: null, mat: null, line: null, _pending: false,
      };
      var geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(
        new Float32Array([ox, oy, oz, ox, oy, oz]), 3
      ));
      var mat = new THREE.LineBasicMaterial({
        color:       Math.random() > 0.45 ? 0xaaddff : 0xffffff,
        transparent: true,
        opacity:     0,
        blending:    THREE.AdditiveBlending,
        depthWrite:  false,
      });
      var line = new THREE.Line(geo, mat);
      scene.add(line);
      ss.geo = geo; ss.mat = mat; ss.line = line;
      return ss;
    }

    function destroyShootingStar(ss) {
      scene.remove(ss.line);
      ss.geo.dispose();
      ss.mat.dispose();
    }

    function updateShootingStars() {
      for (var i = 0; i < shootPool.length; i++) {
        var ss = shootPool[i];
        if (!ss || ss._pending) continue;
        ss.progress += ss.speed;
        var headX = ss.ox + ss.vx * ss.progress;
        var headY = ss.oy + ss.vy * ss.progress;
        var td    = Math.max(0, ss.progress - ss.trailLen);
        var p     = ss.geo.attributes.position;
        p.setXYZ(0, ss.ox + ss.vx * td, ss.oy + ss.vy * td, ss.oz);
        p.setXYZ(1, headX, headY, ss.oz);
        p.needsUpdate   = true;
        var t           = ss.progress / ss.maxProgress;
        ss.mat.opacity  = (t < 0.08 ? t / 0.08 : t > 0.72 ? (1 - t) / 0.28 : 1.0) * 0.92;
        if (ss.progress >= ss.maxProgress) {
          destroyShootingStar(ss);
          shootPool[i] = { _pending: true };
          (function (idx) {
            setTimeout(function () {
              if (shootPool[idx] && shootPool[idx]._pending) {
                shootPool[idx] = spawnShootingStar();
              }
            }, 1000 + Math.random() * 3000);
          }(i));
        }
      }
    }

    for (var si = 0; si < 8; si++) {
      var ss    = spawnShootingStar();
      ss.progress = si * (ss.maxProgress / 8);
      shootPool.push(ss);
    }

    /* ══════════════════════════════════════════════════════════
       MOUSE PARALLAX
    ══════════════════════════════════════════════════════════ */
    var mouse     = { nx: 0, ny: 0 };
    var camTarget = { x: 0, y: 0 };
    window.addEventListener('mousemove', function (e) {
      mouse.nx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ny = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    /* ══════════════════════════════════════════════════════════
       ANIMATION LOOP
    ══════════════════════════════════════════════════════════ */
    var clock = 0;

    function animate() {
      requestAnimationFrame(animate);
      if (document.body.getAttribute('data-theme') !== 'space') return;

      clock += 0.009;

      /* --- Per-group twinkling (5 independent phases) --- */
      for (var gi = 0; gi < twinkleGroups.length; gi++) {
        twinkleGroups[gi].mat.opacity =
          0.52 + 0.48 * Math.sin(clock * 1.85 + twinkleGroups[gi].phase);
      }

      /* --- Super-stars subtle shimmer --- */
      superMat.opacity = 0.72 + 0.28 * Math.sin(clock * 2.3 + 1.1);

      /* --- Giants: dramatic slow pulse --- */
      giantMat.opacity = 0.30 + 0.70 * Math.abs(Math.sin(clock * 0.72 + 0.45));

      /* --- Slow rotation of star sphere --- */
      for (var ri = 0; ri < twinkleGroups.length; ri++) {
        twinkleGroups[ri].pts.rotation.y = clock * 0.038;
        twinkleGroups[ri].pts.rotation.x = clock * 0.011;
      }
      superStars.rotation.y = clock * 0.038;
      superStars.rotation.x = clock * 0.011;
      giantStars.rotation.y = clock * 0.038;
      giantStars.rotation.x = clock * 0.011;

      /* --- Nebula counter-drift --- */
      var neb = scene.userData.nebula;
      if (neb) { neb.rotation.y = -clock * 0.020; neb.rotation.z = clock * 0.007; }

      /* --- Warp: advance each star toward camera along z --- */
      var wp = warpGeo.attributes.position;
      for (var wi = 0; wi < WARP_N; wi++) {
        var wi3 = wi * 3;
        wp.array[wi3 + 2] += warpSpeeds[wi];
        if (wp.array[wi3 + 2] > 480) {
          wp.array[wi3]     = (Math.random() - 0.5) * 2800;
          wp.array[wi3 + 1] = (Math.random() - 0.5) * 2800;
          wp.array[wi3 + 2] = -2200;
        }
      }
      wp.needsUpdate = true;

      /* --- Camera parallax --- */
      camTarget.x += (mouse.nx * 28 - camTarget.x) * 0.025;
      camTarget.y += (-mouse.ny * 20 - camTarget.y) * 0.025;
      camera.position.x = camTarget.x;
      camera.position.y = camTarget.y;
      camera.lookAt(scene.position);

      updateShootingStars();
      renderer.render(scene, camera);
    }

    animate();

    /* ══════════════════════════════════════════════════════════
       RESIZE
    ══════════════════════════════════════════════════════════ */
    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window._spaceBg = { renderer, scene, camera };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
