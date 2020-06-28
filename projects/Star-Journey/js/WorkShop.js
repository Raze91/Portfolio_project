const WorkShop = {
  pause: true,
  GameOver: false,
  configuration: {},

  start: function (config) {
    // debug mode
    if (config.debug_mode == false) {
      console.log = function () { };
    }

    this.configuration = config;
    this.blocker = document.getElementById('blocker');
    this.instructions = document.getElementById('instructions');

    WorkShop.gfx_engine.init(config.gfx_engine);

    WorkShop.game.init(config.game);

    WorkShop.update();

    console.log('WorkShop is started!');

    //const instructions_2 = document.getElementById('instructions_2')



  },

  setPause: function () {
    if (this.pause) {
      this.pause = false;

      this.instructions.style.display = 'none';
      this.blocker.style.display = 'none';
    }
    else {
      this.pause = true;

      this.blocker.style.display = 'block';
      this.instructions.style.display = '';
    }
  },
  IsGameOver: function () {
    if (this.GameOver == true) {
      this.pause = true;
      this.blocker.style.display = '';
    }
  },
  update: function () {
    requestAnimFrame(WorkShop.update);

    if (WorkShop.configuration.debug_mode) WorkShop.gfx_engine.stats.begin();

    if (WorkShop.pause == false) {
      WorkShop.game.update();
      WorkShop.gfx_engine.update();
    }

    if (WorkShop.configuration.debug_mode) WorkShop.gfx_engine.stats.end();
  }

};
