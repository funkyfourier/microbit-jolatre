function turnOffLed (num: number) {
    if (num == 0) {
        pins.analogWritePin(AnalogPin.P16, 0)
    }
    if (num == 1) {
        pins.analogWritePin(AnalogPin.P15, 0)
    }
    if (num == 2) {
        pins.analogWritePin(AnalogPin.P14, 0)
    }
    if (num == 3) {
        pins.analogWritePin(AnalogPin.P13, 0)
    }
    if (num == 4) {
        pins.analogWritePin(AnalogPin.P9, 0)
    }
    if (num == 5) {
        pins.analogWritePin(AnalogPin.P8, 0)
    }
    if (num == 6) {
        pins.analogWritePin(AnalogPin.P2, 0)
    }
    if (num == 7) {
        pins.analogWritePin(AnalogPin.P1, 0)
    }
}
function onButtonPressed (button: number) {
    serial.writeLine("Pressed " + convertToText(button))
    music.stopAllSounds()
    music.setBuiltInSpeakerEnabled(true)
    music.ringTone(notes[button])
    if (button == song[songIndex]) {
        turnOffLed(song[songIndex])
    }
}
function determineButton (num: number) {
    if (num > 40 && num < 80) {
        return 7
    }
    if (num > 90 && num < 105) {
        return 6
    }
    if (num > 120 && num < 140) {
        return 5
    }
    if (num > 150 && num < 180) {
        return 4
    }
    if (num > 190 && num < 220) {
        return 3
    }
    if (num > 260 && num < 320) {
        return 2
    }
    if (num > 380 && num < 500) {
        return 1
    }
    if (num > 800) {
        return 0
    }
    return -1
}
function onButtonReleased (button: number) {
    serial.writeLine("Released " + convertToText(button))
    music.stopAllSounds()
    if (button == song[songIndex]) {
        songIndex += 1
        if (songIndex >= song.length - 0) {
            songIndex = 0
        }
        lightLed(song[songIndex])
    }
}
function lightLed (num: number) {
    if (num == 0) {
        pins.analogWritePin(AnalogPin.P16, 1023)
    }
    if (num == 1) {
        pins.analogWritePin(AnalogPin.P15, 1023)
    }
    if (num == 2) {
        pins.analogWritePin(AnalogPin.P14, 1023)
    }
    if (num == 3) {
        pins.analogWritePin(AnalogPin.P13, 1023)
    }
    if (num == 4) {
        pins.analogWritePin(AnalogPin.P9, 1023)
    }
    if (num == 5) {
        pins.analogWritePin(AnalogPin.P8, 1023)
    }
    if (num == 6) {
        pins.analogWritePin(AnalogPin.P2, 1023)
    }
    if (num == 7) {
        pins.analogWritePin(AnalogPin.P1, 1023)
    }
}
let currentButton = 0
let song: number[] = []
let notes: number[] = []
let songIndex = 0
serial.writeLine("---------------------")
songIndex = 0
let prevButton = -1
notes = [
262,
294,
330,
349,
392,
440,
494,
523
]
song = [
0,
1,
2,
3,
4,
4,
5,
5,
5,
5,
4,
3,
3,
3,
3,
2,
2,
1,
1,
1,
1,
0
]
lightLed(song[songIndex])
basic.forever(function () {
    currentButton = determineButton(pins.analogReadPin(AnalogPin.P0))
    if (currentButton >= 0) {
        if (prevButton == -1) {
            onButtonPressed(currentButton)
            prevButton = currentButton
        }
    } else {
        if (prevButton > -1) {
            onButtonReleased(prevButton)
            prevButton = currentButton
        }
    }
})
