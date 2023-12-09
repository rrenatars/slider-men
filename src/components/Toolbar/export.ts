import { Presentation } from '../../types'

function useExportPresentationToJson(presentationData: Presentation) {
    const text = JSON.stringify(presentationData)
    const name = presentationData.name + '.json'
    const type = 'text/plain'

    const a = document.createElement('a')
    const file = new Blob([text], { type: type })
    a.href = URL.createObjectURL(file)
    a.download = name
    document.body.appendChild(a)
    a.click()
    a.remove()
}

export { useExportPresentationToJson }
