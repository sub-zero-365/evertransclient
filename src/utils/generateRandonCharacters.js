const CHARACTERS = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const generateRandonNumber = () => {
    let text = ""
    for (let i = 0; i < 10; ++i) {
        const number = Math.floor(Math.random() * CHARACTERS.length)
        text += CHARACTERS[number]
    }
    return text
}
export default generateRandonNumber