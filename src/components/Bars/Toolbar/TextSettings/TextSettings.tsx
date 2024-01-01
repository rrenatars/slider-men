import styles from './TextSettings.module.css'
import React, { useEffect, useState } from 'react'
import { usePresentationDataContext } from '../../../PresentationDataContext'
import { ObjectType, TextBlock } from '../../../../types'
import dropDownListIcon from '../../../../images/toolbar/drop-down-list-icon.png'
import boldIcon from '../../../../images/toolbar/bold-icon.png'
import italicIcon from '../../../../images/toolbar/italic-text-icon.png'
import textColorIcon from '../../../../images/toolbar/text-color.png'
import underlineIcon from '../../../../images/toolbar/underline-icon.png'
import { TextContextMenu } from './TextContextMenu'
import { ColorPicker } from '../ColorPicker'
import { useAppActions, useAppSelector } from '../../../../redux/hooks'

interface TextSettingsProps {
    selectedObject: TextBlock
    contextMenuVisible: boolean
    setContextMenuVisible: React.Dispatch<React.SetStateAction<boolean>>
    contextMenuPosition: { top: number; left: number }
    setContextMenuPosition: React.Dispatch<
        React.SetStateAction<{ top: number; left: number }>
    >
    selectedSlideId: string
}

const TextSettings: React.FC<TextSettingsProps> = (props) => {
    const { presentationData, setPresentationData } =
        usePresentationDataContext()

    const initialFont = props.selectedObject.fontFamily
    const initialFontSize = props.selectedObject.fontSize
    const initialIsBold = props.selectedObject.bold
    const initialIsItalic = props.selectedObject.italic
    const initialIsUnderline = props.selectedObject.underline
    const initialColor = props.selectedObject.color.hex

    const [selectedFont, setSelectedFont] = useState(initialFont)
    const [selectedFontSize, setSelectedFontSize] = useState(initialFontSize)
    const [isBold, setIsBold] = useState(initialIsBold)
    const [isItalic, setIsItalic] = useState(initialIsItalic)
    const [isUnderline, setIsUnderline] = useState(initialIsUnderline)
    const [colorPickerVisible, setColorPickerVisible] = useState(false)
    const [colorPickerPosition, setColorPickerPosition] = useState({
        top: 0,
        left: 0,
    })
    const [selectedColor, setSelectedColor] = useState(initialColor)

    const selection = useAppSelector((state) => state.selection)
    const { createChangeObjectAction } = useAppActions()

    const handleFontChange = (font: string) => {
        setSelectedFont(font)
    }

    const handleFontSizeChange = (fontSize: number) => {
        setSelectedFontSize(fontSize)
    }

    const handleSetBold = () => {
        setIsBold(!isBold)
    }

    const handleSetItalic = () => {
        setIsItalic(!isItalic)
    }
    const handleSetUnderline = () => {
        setIsUnderline(!isUnderline)
    }

    const handleCustomFontSizeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newSize = parseInt(e.target.value)
        setSelectedFontSize(isNaN(newSize) ? initialFontSize : newSize)
    }
    const [textContextMenuVisible, setTextContextMenuVisible] = useState(false)

    const handleContextMenuClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setTextContextMenuVisible(!textContextMenuVisible)

        const clickedElement = e.currentTarget
        const rect = clickedElement.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const left = rect.left + window.scrollX

        props.setContextMenuPosition({ top: top + 30, left: left - 63 })
    }

    const handleColorIconClick = (e: React.MouseEvent) => {
        setColorPickerVisible(!colorPickerVisible)
        const clickedElement = e.currentTarget
        const rect = clickedElement.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const left = rect.left + window.scrollX

        setColorPickerPosition({ top: top + 30, left: left })
    }

    const handleColorSelection = (color: string) => {
        setSelectedColor(color)
        setColorPickerVisible(false)
    }

    useEffect(() => {
        const updatedSlides = presentationData.slides.map((slide) => {
            if (slide.id === props.selectedSlideId) {
                const updatedObjects = slide.objects.map((obj) => {
                    if (
                        obj.id === props.selectedObject.id &&
                        obj.type === ObjectType.TEXTBLOCK
                    ) {
                        return {
                            ...obj,
                            fontFamily: selectedFont,
                            fontSize: selectedFontSize,
                            bold: isBold,
                            italic: isItalic,
                            underline: isUnderline,
                            color: {
                                ...obj.color,
                                hex: selectedColor,
                            },
                        }
                    }
                    return obj
                })

                return {
                    ...slide,
                    objects: updatedObjects,
                }
            }
            return slide
        })

        if (selection.slideId && selection.objectId) {
            createChangeObjectAction(selection.slideId, selection.objectId, {
                fontFamily: selectedFont,
                fontSize: selectedFontSize,
                bold: isBold,
                italic: isItalic,
                underline: isUnderline,
                color: {
                    hex: selectedColor,
                },
            })
        }
    }, [
        selectedFont,
        selectedFontSize,
        isBold,
        isItalic,
        isUnderline,
        selectedColor,
    ])

    return (
        <div className={styles.textSettings}>
            <div className={styles.fontChange}>
                <select
                    className={styles.fontChangeSelect}
                    value={selectedFont}
                    onChange={(e) => handleFontChange(e.target.value)}
                >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Consolas">Consolas</option>
                </select>
                <div className={styles.fontSizeContainer}>
                    <input
                        type="text"
                        className={styles.entry}
                        placeholder="Font Size"
                        value={selectedFontSize}
                        onChange={handleCustomFontSizeChange}
                    />
                    <button
                        className={styles.button}
                        onClick={handleContextMenuClick}
                    >
                        <img
                            className={styles.icon}
                            src={dropDownListIcon}
                            style={{
                                transform: textContextMenuVisible
                                    ? 'rotate(180deg)'
                                    : 'none',
                            }}
                            alt=""
                        />
                    </button>
                </div>
                {textContextMenuVisible && (
                    <TextContextMenu
                        contextMenuPosition={props.contextMenuPosition}
                        setContextMenuVisible={setTextContextMenuVisible}
                        selectedSlideId={props.selectedSlideId}
                        handleFontSizeChange={handleFontSizeChange}
                        selectedFontSize={selectedFontSize}
                    />
                )}
            </div>
            <div
                className={styles.iconContainer}
                onClick={handleSetBold}
                style={{
                    ...(isBold && {
                        background: '#b4cfff',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                <img
                    className={styles.icon}
                    src={boldIcon}
                    alt="Полужирный текст"
                    title="Полужирный текст"
                />
            </div>
            <div
                className={styles.iconContainer}
                onClick={handleSetItalic}
                style={{
                    ...(isItalic && {
                        background: '#b4cfff',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                <img
                    className={styles.icon}
                    src={italicIcon}
                    alt="Итальянский текст"
                    title="Итальянский текст"
                />
            </div>
            <div
                className={styles.iconContainer}
                onClick={handleSetUnderline}
                style={{
                    ...(isUnderline && {
                        background: '#b4cfff',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                <img
                    className={styles.icon}
                    src={underlineIcon}
                    alt="Нижнее подчеркивание"
                    title="Нижнее подчеркивание"
                />
            </div>
            <div
                className={styles.iconContainer}
                onClick={handleColorIconClick}
                style={{
                    ...(colorPickerVisible && {
                        background: '#b4cfff',
                        borderRadius: '5px',
                        padding: '8px',
                    }),
                }}
            >
                <img
                    className={styles.icon}
                    src={textColorIcon}
                    alt="Цвет текста"
                    title="Цвет текста"
                />
            </div>
            {colorPickerVisible && (
                <ColorPicker
                    position={colorPickerPosition}
                    handleColorSelection={handleColorSelection}
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                ></ColorPicker>
            )}
        </div>
    )
}

export { TextSettings }