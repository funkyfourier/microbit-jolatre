function turnOffLed (num: number) {
    if (num == 0) {
        pins.analogWritePin(AnalogPin.P9, 0)
    }
    if (num == 1) {
        pins.analogWritePin(AnalogPin.P16, 0)
    }
    if (num == 2) {
        pins.analogWritePin(AnalogPin.P2, 0)
    }
    if (num == 3) {
        pins.analogWritePin(AnalogPin.P14, 0)
    }
    if (num == 4) {
        pins.analogWritePin(AnalogPin.P13, 0)
    }
    if (num == 5) {
        pins.analogWritePin(AnalogPin.P15, 0)
    }
    if (num == 6) {
        pins.analogWritePin(AnalogPin.P8, 0)
    }
    if (num == 7) {
        pins.analogWritePin(AnalogPin.P1, 0)
    }
}
function onButtonPressed (button: number) {
    serial.writeLine("Pressed " + convertToText(button))
    music.ringTone(notes[button])
    if (button == song[songIndex]) {
        turnOffLed(song[songIndex])
    }
}
function determineButton (num: number) {
    if (num > 960 && num < 1000) {
        return 7
    }
    if (num > 1005) {
        return 6
    }
    if (num > 910 && num < 950) {
        return 5
    }
    if (num > 840 && num < 880) {
        return 4
    }
    if (num > 4 && num < 15) {
        return 3
    }
    if (num > 650 && num < 690) {
        return 2
    }
    if (num > 500 && num < 530) {
        return 1
    }
    if (num > 88 && num < 98) {
        return 0
    }
    return -1
}
function onButtonReleased (button: number) {
    serial.writeLine("Released " + convertToText(button))
    music.ringTone(0)
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
        pins.analogWritePin(AnalogPin.P9, 1023)
    }
    if (num == 1) {
        pins.analogWritePin(AnalogPin.P16, 1023)
    }
    if (num == 2) {
        pins.analogWritePin(AnalogPin.P2, 1023)
    }
    if (num == 3) {
        pins.analogWritePin(AnalogPin.P14, 1023)
    }
    if (num == 4) {
        pins.analogWritePin(AnalogPin.P13, 1023)
    }
    if (num == 5) {
        pins.analogWritePin(AnalogPin.P15, 1023)
    }
    if (num == 6) {
        pins.analogWritePin(AnalogPin.P8, 1023)
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
music.setBuiltInSpeakerEnabled(true)
music.setVolume(255)
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
    serial.writeLine("" + (pins.analogReadPin(AnalogPin.P0)))
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
