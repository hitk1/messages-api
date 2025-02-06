import { uuidv7 } from 'uuidv7'

function idStringToBinary(id?: string): Buffer {
    const uuid = id || uuidv7()
    const buffer = Buffer.from(uuid.replace(/-/g, ''), 'hex')
    return buffer
}

function idBinaryToString(id: Buffer): string {
    const hexString = id.toString('hex')
    console.log(hexString)
    return [
        hexString.slice(0, 8),
        hexString.slice(8, 12),
        hexString.slice(12, 16),
        hexString.slice(16, 20),
        hexString.slice(20),
    ].join('-')
}

export {
    idStringToBinary,
    idBinaryToString
}