var patterns = [];
var patternRunning = false;
var track = undefined;

function initFlashlight() {
    return new Promise ((resolve, reject) => {
        navigator.mediaDevices.getUserMedia({
            video: {facingMode: 'environment', width: 320}
        }).then(stream => {
            track = stream.getVideoTracks()[0];
            const imageCapture = new ImageCapture(track)
            const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {
                resolve();
            });
        });
    });
}

function setFlashlight(state) {
    let constraintString = '{"advanced": [{"torch": ' + state + '}]}';
    let constraint = JSON.parse(constraintString);
    console.log(constraint)
    if(track == undefined) {
        initFlashlight().then(() => {
            track.applyConstraints(constraint);
        });
    } else {
        track.applyConstraints(constraint);
    }
}

function runPattern(pattern) {
    console.log(pattern)
    return new Promise ((resolve, reject) => {
        setFlashlight(pattern[0].isOn);
        length = pattern[0].length;
        pattern.shift()
        if(pattern.length == 0) {
            resolve();
        } else {
            setTimeout(function() {
                runPattern(pattern).then(() => {resolve()})
            }, length)
        }
    })
}

function runPatterns() {
    patternRunning = true;
    if(patterns.length != 0) {
        runPattern(patterns[0]).then(() => {
            patterns.shift();
            runPatterns();
        })
    }
    patternRunning = false;
}

export function addPattern(pattern) {
    patterns.push(pattern);
    if (!patternRunning) {
        runPatterns();
    }
}