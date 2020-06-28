const LEAP = {
    position: {
        x: 0,
        y: 0
    },
    players: [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
    ],
    player_one: null,
    player_two: null,
    connected: false,
};

const controller = new Leap.Controller();

controller.connect();

controller.on('deviceStreaming', () => {
    LEAP.connected = true;
    console.log('✔ Leap is connected')
});

controller.on('deviceDisconnected', function () {
    LEAP.connected = false;
    console.log('❌ Leap disconnected');
});

controller.on('frame', function (frame) {
    if (game) {
        LEAP.player_one = player_one;
        LEAP.player_two = player_two;
    }
    let hand_one = frame.hands[0];
    let hand_two = frame.hands[1];

    if (!hand_one || !hand_two) return;

    const palm_one = get2dCoords(hand_one.stabilizedPalmPosition, frame);
    const palm_two = get2dCoords(hand_two.stabilizedPalmPosition, frame);

    if (palm_one.x <= 650 && palm_two.x >= 650) {
        LEAP.players[0].x = palm_one.x;
        LEAP.players[1].x = palm_two.x;
    } else {
        LEAP.players[0].x = palm_two.x;
        LEAP.players[1].x = palm_one.x;
    }

    // Détection des gestures
    frame.gestures.forEach(function (gesture) {
        switch (gesture.type) {
            case 'keyTap':
                let position = gesture.position;
                if (position[0] < -9) {
                    renderKeyTap(LEAP.player_one);
                } else if (position[0] > 9) {
                    renderKeyTap(LEAP.player_two);
                }
                break;
        }
    });
    ;
})

/**
 * Transforme les coordonnées 3D récupérée par le Leap en coordonnées 2D pour un <canvas> web
 * @param {Array} leapPosition Tableau de coordonnées 3d [x, y, z]
 * @param {Object} frame Objet "frame" transmit par le Leap Motion
 */
function get2dCoords(leapPosition, frame) {
    const interactionBox = frame.interactionBox;
    const normalizedPoint = interactionBox.normalizePoint(leapPosition, true);

    return {
        x: normalizedPoint[0] * window.innerWidth,
        y: (1 - normalizedPoint[1]) * window.innerHeight
    };
}

function rotatePiece() {
    Player.current_piece.body.angle += 90;
}

/**
 * Dessine un gesture "Tap" à l'écran
 * @param {Object} frame Objet "frame" transmit par le Leap Motion
 * @param {Object} gesture Objet "gesture" de type "keyTap" à dessiner
 */
function renderKeyTap(player) {
    player.rotatePiece();
}