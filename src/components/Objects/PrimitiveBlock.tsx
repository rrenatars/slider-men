import React from 'react'
import { Primitive } from '../../types'

function PrimitiveBlock(props: {
    primitiveBlockData: Primitive
    scale: number
    isSelected: boolean
    onClick?: React.MouseEventHandler<SVGSVGElement> | undefined
}) {
    const {
        primitiveType,
        outlineColor,
        fillColor,
        coordinates,
        width,
        height,
    } = props.primitiveBlockData

    const scalePercent = props.scale / 100

    let shapeElement = null

    if (primitiveType === 'circle') {
        shapeElement = (
            <circle
                cx={(width / 2) * scalePercent}
                cy={(height / 2) * scalePercent}
                r={(width / 2) * scalePercent}
                fill={fillColor.hex}
                stroke={outlineColor?.hex || 'transparent'}
                strokeWidth={2 * scalePercent}
            />
        )
    } else if (primitiveType === 'triangle') {
        shapeElement = (
            <polygon
                points={`0,${height * scalePercent} ${
                    (width / 2) * scalePercent
                },${0} ${width * scalePercent},${height * scalePercent}`}
                fill={fillColor.hex}
            />
        )
    } else if (primitiveType === 'rectangle') {
        shapeElement = (
            <rect
                width={width * scalePercent}
                height={height * scalePercent}
                fill={fillColor.hex}
                stroke={outlineColor?.hex || 'transparent'}
                strokeWidth={2 * scalePercent}
            />
        )
    }

    return (
        <svg
            onClick={props.onClick}
            style={{
                position: 'absolute',
                left: coordinates.x * scalePercent,
                top: coordinates.y * scalePercent,
                width: width * scalePercent,
                height: height * scalePercent,
                border: props.isSelected ? '2px solid blue' : 'none',
            }}
        >
            {shapeElement}
        </svg>
    )
}

export { PrimitiveBlock }