function determineButton (num: number) {
    if (num > 40 && num < 80) {
        return 8
    }
    if (num > 90 && num < 105) {
        return 7
    }
    if (num > 120 && num < 140) {
        return 6
    }
    if (num > 150 && num < 180) {
        return 5
    }
    if (num > 190 && num < 220) {
        return 4
    }
    if (num > 260 && num < 320) {
        return 3
    }
    if (num > 380 && num < 500) {
        return 2
    }
    if (num > 800) {
        return 1
    }
    return -1
}
basic.forever(function () {
    serial.writeLine("" + (pins.analogReadPin(AnalogPin.P0)))
    if (pins.analogReadPin(AnalogPin.P0) > 500) {
        pins.analogWritePin(AnalogPin.P16, 1023)
        music.ringTone(262)
    } else {
        music.stopAllSounds()
        pins.analogWritePin(AnalogPin.P16, 0)
    }
})
