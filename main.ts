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
let prevButton = 0
let currentButton = 0
let notes = [
262,
294,
330,
349,
392,
440,
494,
523
]
basic.forever(function () {
    currentButton = determineButton(pins.analogReadPin(AnalogPin.P0))
    serial.writeLine("" + (currentButton))
    if (currentButton < 0) {
        music.stopAllSounds()
        turnOffLed(prevButton)
    } else {
        music.ringTone(notes[currentButton])
        prevButton = currentButton
        lightLed(currentButton)
    }
})
