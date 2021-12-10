function doSomething (num: number) {
	
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
