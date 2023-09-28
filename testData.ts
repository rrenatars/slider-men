import {TextBlock, Image, ObjectType, Primitive, SlideObject, Presentation} from "./types"

const textBlock: TextBlock = {
    coordinates: {
        x: 12,
        y: 12,
    },
    width: 12,
    height: 12,
    type: 'text',
    value: 'привет',
    color: {
        hex: '12',
        opacity: 1.0,
    },
    fontSize: 12,
    fontFamily: 'Roboto',
}

const shape: Primitive = {
    coordinates: {
        x: 12,
        y: 12,
    },
    width: 12,
    height: 12,
    type: 'primitive',
    figure: 'triangle',
    outlineColor: {
        hex: '12',
        opacity: 1,
    },
    fillColor: {
        hex: 'FF',
        opacity: 5.0,
    }
}

const objectType: ObjectType = 'image'

const slideObject: SlideObject = {
    coordinates: {
        x: 12,
        y: 13,
    },
    width: 300,
    height: 100,
    type: 'image',
}

const presentation: Presentation = {
    name: 'pres',
}

console.log("TextBlock: ", textBlock)
console.log("Primitive: ", shape)
console.log("SlideObject: ", slideObject)
console.log("ObjectType: ", objectType)
console.log("Presentation: ", presentation)