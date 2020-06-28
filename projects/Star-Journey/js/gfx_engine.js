WorkShop.gfx_engine = {

  init: function (config) {

    // --- scene
    this.scene = new THREE.Scene();

    config = config || {};
    const fov = config.camera_fov || 75;
    const far_plane = config.far_plane || 5000;

    // --- camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, 1, far_plane);
    this.camera.position.set(0, 0, 100)
    this.scene.add(this.camera);

    const perf = WorkShop.configuration.high_performance || true;


    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 0, 10);
    WorkShop.gfx_engine.scene.add(light);

    // --- renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: perf });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    if (perf) {
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    document.body.appendChild(this.renderer.domElement);

    // debug mode
    if (WorkShop.configuration.debug_mode && Stats) {
      this.stats = new Stats();
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      document.body.appendChild(this.stats.dom);
    }

    window.requestAnimFrame = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        }
      );
    })();

    console.log('gfx engine ready');
  },
  update() {

    this.renderer.render(this.scene, this.camera);
  }
};
