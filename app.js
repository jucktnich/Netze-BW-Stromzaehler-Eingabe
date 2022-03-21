import * as flashlight from "./flashlight.js"

setTimeout(function() {flashlight.addPattern([
    {
        isOn: true,
        length: 1000
    },
    {
        isOn: false,
        length: 1000
    },
    {
        isOn: true,
        length: 1000
    }
])}, 1000)
