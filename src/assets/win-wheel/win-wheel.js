
let theWheel;
function createWheel() {

    // Get canvas and span objects.
    let canvas = document.getElementById('wheel_canvas');

    let ctx = canvas.getContext('2d');
    let canvasCenter = canvas.height / 2;
    let redGradient = ctx.createRadialGradient(canvasCenter, canvasCenter, 50, canvasCenter, canvasCenter, 250);
    let gradient2 = ctx.createRadialGradient(canvasCenter, canvasCenter, 50, canvasCenter, canvasCenter, 250);
    // Add the colour stops - 0.0 should be the first, 1.0 the last, others in between.
    //  redGradient.addColorStop(0, "#84240c");
    //  redGradient.addColorStop(0.4, "#eec134");
    // redGradient.addColorStop(1, "#FF2400");

    redGradient.addColorStop(0, "rgb(35,21,21)");
    redGradient.addColorStop(0.4, "rgb(222,136,136)");
    redGradient.addColorStop(1, "rgb(45,29,7)");

    gradient2.addColorStop(0, "#ffc18c");
    gradient2.addColorStop(0.4, "#84240c");
    gradient2.addColorStop(1, "#84240c");

    let color_violet = '#9c27b0'
    let color_green = '#1ae021'
    let color_red = '#FF2400'

    theWheel = new Winwheel({
        'canvasId': 'wheel_canvas',
        'numSegments': 10,
        'outerRadius': 212,
        'textFontSize': 55,
        'lineWidth': 3,
        'textOrientation': 'vertical',
        'textFontFamily': 'Comic Sans MS',
        'textFillStyle': '#ffc18c',
        'innerRadius': 30,
        'responsive': true,
        'segments':
            [
                { 'fillStyle': redGradient, 'text': '0' },
                { 'fillStyle': gradient2, 'text': '1' },
                { 'fillStyle': redGradient, 'text': '2' },
                { 'fillStyle': gradient2, 'text': '3' },
                { 'fillStyle': redGradient, 'text': '4' },
                { 'fillStyle': gradient2, 'text': '5' },
                { 'fillStyle': redGradient, 'text': '6' },
                { 'fillStyle': gradient2, 'text': '7' },
                { 'fillStyle': redGradient, 'text': '8' },
                { 'fillStyle': gradient2, 'text': '9' }
            ],
        'animation':
        {
            'type': 'spinToStop',
            'callbackSound': playSound,
            'soundTrigger': 'segment',
            'callbackFinished': onSpinCompleted
        },

    });

    let audio = new Audio('assets/win-wheel/tick.mp3');

    function playSound() {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
    }

    function onSpinCompleted(indicatedSegment) {
        window.spinWheelComponentReference.zone.run(() => { window.spinWheelComponentReference.onSpinCompleted(); });
    }


    // Specify click handler for canvas.
    canvas.onclick = function (e) {

        theWheel.segments.forEach((s) => {
            if (s) {
                s.lineWidth = 0.1;
                s.strokeStyle = null;
                s.textFontSize = 40;
                s.textFontWeight = null
                s.textLineWidth = null
                s.textFillStyle = null
                s.textStrokeStyle = null
            }

        });
        // reset the segment colours.
        theWheel.segments[1].fillStyle = redGradient;
        theWheel.segments[2].fillStyle = gradient2;
        theWheel.segments[3].fillStyle = redGradient;


        theWheel.segments[4].fillStyle = gradient2;
        theWheel.segments[5].fillStyle = redGradient;
        theWheel.segments[6].fillStyle = gradient2;
        theWheel.segments[7].fillStyle = redGradient;
        theWheel.segments[8].fillStyle = gradient2;
        theWheel.segments[9].fillStyle = redGradient;
        theWheel.segments[10].fillStyle = gradient2;

        theWheel.draw();

        // Call the getSegmentAt function passing the mouse x and y from the event.
        let clickedSegment = theWheel.getSegmentAt(e.clientX, e.clientY);

        // A pointer to the segment clicked is returned if the user clicked inside the wheel.
        if (clickedSegment) {
            let selectedColor = ''
            if (clickedSegment.fillStyle == color_violet) {
                selectedColor = 'violet'
            }
            else if (clickedSegment.fillStyle == color_green) {
                selectedColor = 'green'

            } else if (clickedSegment.fillStyle == color_red) {
                selectedColor = 'red'
            }

            let item = { number: parseInt(clickedSegment.text), color: selectedColor, fillStyle: clickedSegment.fillStyle }
            window.spinWheelComponentReference.zone.run(() => { window.spinWheelComponentReference.onSelectItem(item); });

            // Change background colour of the segment and update the wheel.
            clickedSegment.fillStyle = '#e0ff0c';
            clickedSegment.lineWidth = 3;
            clickedSegment.strokeStyle = '#fff';

            clickedSegment.textFontSize = 50;
            clickedSegment.textFontWeight = 'bold'
            clickedSegment.textLineWidth = 1.5
            clickedSegment.textFillStyle = '#e0ff0c'
            clickedSegment.textStrokeStyle = '#333'

            theWheel.draw();
        }
    }

}

function startWheel(stopAngle) {
    createWheel();
    theWheel.reset
    theWheel.animation.spins = 15;
    theWheel.animation.duration = 15;
    theWheel.animation.stopAngle = stopAngle;
    theWheel.startAnimation();
}
