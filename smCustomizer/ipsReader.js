export function toHex(d) {
    return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
}

export function ProcessIPS(ipsBytes){
    if (ipsBytes.constructor === Uint8Array){
        ipsBytes = Array.from(ipsBytes);
    }

    let fileHeader = String.fromCharCode(...ipsBytes.slice(0, 5));
    let fileEOF = String.fromCharCode(...ipsBytes.slice(-3));

    let patches = [];

    let fileContents = ipsBytes.slice(5, -3);

    let i = 0;

    while (i < fileContents.length){
        let offset = (fileContents[i] << 0x10) + (fileContents[i+1] << 0x8) + fileContents[i+2];
        i += 3;
        
        let size = (fileContents[i] << 0x8) + fileContents[i+1];
        i += 2;

        if (size == 0){
            i += 2;

            size = (fileContents[i] << 0x8) + fileContents[i+1];
            i += 2;
            
            let value = fileContents[i];
            i++;

            let bytes = [];

            for (let j = 0; j < size; j++){
                bytes.push(value);
            }
            
            patches.push({offset: offset, size: size, bytes: bytes, rle: true});
        } else {
            let bytes = fileContents.slice(i, i+size);
            i += size;

            patches.push({offset: offset, size: size, bytes: bytes, rle: false});
        }
    }

    return patches;
}