// import constants from "./constants.js";
console.clear();

const CONSTANTS = await import('./constants.js');
const IPSReader = await import('./ipsReader.js');

var ipsBytes = [];
var ipsFileName;

var ipsFilePicker = document.getElementById('ipsFilePicker');
var ipsReaderStatusList = document.getElementById('ipsReaderStatusList');
var pageContainer = document.getElementById('pageContainer');

function toHex(d) {
    return ("0" + (Number(d).toString(16))).slice(-2).toUpperCase()
}

function OnFileSelected(e) {
    if (document.getElementById('loadingPatchStatusItem') != null)
        document.getElementById('loadingPatchStatusItem').remove();

    ipsReaderStatusList.classList.remove('d-none');
    ClearStatusList();
    let loadingStatus = GenerateNewListItem('Loading...', ipsReaderStatusList);
    loadingStatus.id = 'loadingPatchStatusItem';

    var file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (readerEvent) => FileReaderOnLoad(readerEvent, file.name);
}

function FileReaderOnLoad(readerEvent, fileName) {
    let content = readerEvent.target.result;
    let bytes = new Uint8Array(content);
    ipsBytes = bytes;
    ipsFileName = fileName;

    let loadingPatchStatusItem = document.getElementById('loadingPatchStatusItem');
    loadingPatchStatusItem.classList.add('list-group-item-success');
    loadingPatchStatusItem.childNodes[0].replaceWith(loadingPatchStatusItem.childNodes[0].textContent + 'success!');

    ReadIPSFile();
}

function GenerateNewListItem(text, parent) {
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item')

    if (parent == null || parent == undefined) {
        parent = text;
        text = null;
    } else {
        let label = document.createElement('label');
        label.textContent = text;
        // label.classList.add('col-sm-5');

        listItem.appendChild(label);
    }

    parent.appendChild(listItem);

    return listItem;
}

function SetupListeners() {
    ipsFilePicker.onchange = OnFileSelected;
}

function ReadIPSFile() {
    let readingStatus = GenerateNewListItem('Reading...', ipsReaderStatusList);

    let fileHeader = String.fromCharCode(...ipsBytes.slice(0, 5));
    let fileEOF = String.fromCharCode(...ipsBytes.slice(-3));

    let patches = IPSReader.ProcessIPS(ipsBytes);
    let patchStrings = [];
    let totalBytes = 0;

    for (let i = 0; i < patches.length; i++) {
        let patch = patches[i];
        if (patch.rle) {
            let bytesString = `${toHex(patch.bytes[0])} x ${patch.size}`;
            patchStrings.push(`Patch ${i}: (HLE) Offset: 0x${patch.offset.toString(16)}, Size: (${patch.size}), Bytes: ${bytesString}`);
            totalBytes += patch.size;
        } else {
            let bytesString = patch.bytes.slice(0, 5).map(b => toHex(b)).join(', ') + (patch.bytes.length > 5 ? '...' : '');
            patchStrings.push(`Patch ${i}: Offset: 0x${patch.offset.toString(16)}, Size: (${patch.size}), Bytes: ${bytesString}`);
            totalBytes += patch.size;
        }
    }

    readingStatus.innerHTML += `successful. Valid Header Found: ${fileHeader}...${fileEOF} Patch Count(${patches.length}) Total Bytes(${totalBytes})<br/>`;
    readingStatus.innerHTML += patchStrings.join('<br/>');
    readingStatus.classList.add('list-group-item-success');
}

function ClearStatusList() {
    while (ipsReaderStatusList.firstChild) {
        ipsReaderStatusList.removeChild(ipsReaderStatusList.lastChild);
    }
}

function Initialize() {
    ipsReaderStatusList.classList.remove('d-none');
}

function DebugMessage(text) {
    var element = document.createElement('h4');
    element.appendChild(document.createTextNode(text));
    document.body.appendChild(element);

    console.log(text);
}

SetupListeners();

let testButton = document.createElement('BUTTON');
testButton.classList.add('my-2', 'btn', 'btn-primary');
testButton.innerText = 'RUN TEST DATA';
testButton.onclick = () => {
    ipsReaderStatusList.classList.remove('d-none');
    ClearStatusList();

    if (ipsBytes.length == 0)
        ipsBytes = [0x50, 0x41, 0x54, 0x43, 0x48, 0x08, 0x24, 0x93, 0x00, 0x02, 0x80, 0x0D, 0x45, 0x4F, 0x46];

    let loadingStatus = GenerateNewListItem('Loading test data...success!', ipsReaderStatusList);
    loadingStatus.classList.add('list-group-item-success');
    ReadIPSFile();
};

pageContainer.appendChild(testButton);

testButton.click();
// Initialize();