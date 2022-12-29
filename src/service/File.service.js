export const fileUpload = async (e) => {
    let data = {
        extensions: '',
        files: ''
    }

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            if (typeof reader.result == "string") {
                resolve(reader.result)
            }
            reader.onerror = error => reject(error)
        }
    })

    await toBase64(e.target.files[0]).then(result => {
        const resultStr = result.substring(result.indexOf(",") + 1, result.length)
        const resultExtensions = result.split(";")[0].split("/")[1]
        data = {
            extensions: resultExtensions,
            files: resultStr
        }
    })
    return data
}