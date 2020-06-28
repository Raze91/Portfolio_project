class Player {
    constructor(x_pos, player_number, rotate_key) {
        // Initialisation of variables
        this.player_pos = x_pos;
        this.player_number = player_number;
        this.rotate_key = game.input.keyboard.addKey(rotate_key);

        // Create player collision group
        this.player_collision_group = game.physics.p2.createCollisionGroup();

        // Create the base of the tower
        this.tower = game.add.sprite(this.player_pos, window.innerHeight - 89, 'house');
        game.physics.p2.enable(this.tower);
        this.tower.body.static = true;

        // Enable collisions on tower base
        this.bodyEnableCollisions(this.tower.body, 'physicsData', 'house', this.player_collision_group);

        // Creation of a light beam behind the piece
        this.light_beam = game.add.sprite(0, 0, 'light_beam');
        this.light_beam.anchor.set(0.5);

        // Spawn the first piece
        this.spawnPiece(this.player_pos - 55, 100, pieces[getRandomInt(pieces.length)], 'physicsData');
    }

    update() {
        if (this.rotate_key.isUp) this.current_piece.body.fixedRotation = false; // Avoid Multi-callback when rotate_key is pressed
        if (this.rotate_key.isDown) this.rotatePiece();

        // If the current piece drops out of the screen, delete it and create another piece
        if (this.current_piece.y > window.innerHeight + 50 && this.current_piece != undefined) {
            this.current_piece.removeChildren();
            this.current_piece.destroy();
            this.spawnPiece(this.player_pos - 55, 100, pieces[getRandomInt(pieces.length)], 'physicsData');
        }

        // Movements
        if (LEAP.connected) {
            this.current_piece.body.x = LEAP.players[this.player_number].x;
            if (this.player_number == 0) {
                this.P1MoveWithLeap();
            } else if (this.player_number == 1) {
                this.P2MoveWithLeap();
            }
        } else {
            if (this.player_number == 0) {
                this.P1MoveWithKeyboard();
            } else if (this.player_number == 1) {
                this.P2MoveWithKeyboard();
            }
        }
    }

    P1MoveWithLeap() {
        if (this.current_piece.body.x >= (window.innerWidth / 2) - this.light_beam.width / 2 - 10) {
            this.current_piece.body.x = (window.innerWidth / 2) - this.light_beam.width / 2 - 10;
        }
        if (this.current_piece.body.x <= 0 + this.light_beam.width / 2) {
            this.current_piece.body.x = 0 + this.light_beam.width / 2;
        }
    }
    P2MoveWithLeap() {
        if (this.current_piece.body.x <= (window.innerWidth / 2) + this.light_beam.width / 2 + 10) {
            this.current_piece.body.x = (window.innerWidth / 2) + this.light_beam.width / 2 + 10;
        }
        if (this.current_piece.body.x >= window.innerWidth - this.light_beam.width / 2) {
            this.current_piece.body.x = window.innerWidth - this.light_beam.width / 2;
        }
    }
    P1MoveWithKeyboard() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            this.current_piece.body.x -= 4;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.current_piece.body.x += 4;
        }
        if (this.current_piece.body.x >= (window.innerWidth / 2) - this.light_beam.width / 2 - 5) {
            this.current_piece.body.x = (window.innerWidth / 2) - this.light_beam.width / 2 - 5;
        }
    }
    P2MoveWithKeyboard() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.current_piece.body.x -= 4;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.current_piece.body.x += 4;
        }
        if (this.current_piece.body.x <= (window.innerWidth / 2) + this.light_beam.width / 2 + 5) {
            this.current_piece.body.x = (window.innerWidth / 2) + this.light_beam.width / 2 + 5;
        }
    }

    /**
     * Add a piece, place it and adjust parameters
     * @param {int} x position in x
     * @param {int} y position in x
     * @param {string} name name of the piece
     * @param {string} physics_data name of the file to load data
     * @param {Phaser.Physics.P2.CollisionGroup} collision_group collision group off this item
     */
    spawnPiece(x, y, name, physics_data) {
        this.current_piece = game.add.sprite(x, y, name);
        game.physics.p2.enable(this.current_piece);

        // Enable collisions
        this.bodyEnableCollisions(this.current_piece.body, physics_data, name, this.player_collision_group);

        this.current_piece.body.damping = 0.5;
        this.current_piece.body.mass = 0.1;

        // Create callback when piece will hit the tower
        this.current_piece.body.createGroupCallback(this.player_collision_group, this.onTowerHit.bind(this), game.context);

        // Set parameters of the light beam
        this.setLightBeam(false, this.current_piece.width);
    }

    /**
     * Load a custom shapes from json file, and enable collisions on this body
     * @param {Phaser.Physics.P2.Body} body 
     * @param {string} physics_data 
     * @param {string} key 
     * @param {Phaser.Physics.P2.CollisionGroup} collision_group 
     */
    bodyEnableCollisions(body, physics_data, key, collision_group) {
        // Load custom collisions
        body.clearShapes();
        body.loadPolygon(physics_data, key);

        // Enable collisions
        body.setCollisionGroup(collision_group);
        body.collides([collision_group]);
    }

    /**
     * Callback when the current piece hit the tower
     * Reset the initial callback. Will be recreated on spawnPiece
     */
    onTowerHit() {
        this.current_piece.body.createGroupCallback(this.player_collision_group, null, game.context); // reset callback
        this.current_piece.removeChildren();
        this.spawnPiece(this.player_pos - 55, 100, pieces[getRandomInt(pieces.length)], 'physicsData');
    }

    /**
     * Set width of light_beam, and add it in child of current_piece
     */
    setLightBeam() {
        this.light_beam.is_rotate = false;
        this.light_beam.width = this.current_piece.width;
        this.light_beam.angle = 0;
        this.current_piece.addChild(this.light_beam);
    }

    /**
     * Rotate piece, set width with current_piece, and say if it's rotate or nots
     * @param {boolean} is_rotate 
     * @param {int} width
     */
    rotateLighBeam(is_rotate, width) {
        this.light_beam.angle += 90;
        this.light_beam.is_rotate = is_rotate;
        this.light_beam.width = width;
    }

    /**
     * Rotate current_piece of player, and set light beam to avoid rotating
     * Change width of light beam to correspond with current_piece.
     * If the key is a cube, we don't rotate it, because it's useless.
     */
    rotatePiece() {
        if (this.current_piece.key != "piece_two") {
            if (this.current_piece.body.fixedRotation == false) {
                this.current_piece.body.angle += 90;

                // Adjust light beam
                if (this.light_beam.is_rotate) {
                    this.rotateLighBeam(false, this.current_piece.width);
                }
                else {
                    this.rotateLighBeam(true, this.current_piece.height);
                }
            }
            this.current_piece.body.fixedRotation = true;
        }
    }
}