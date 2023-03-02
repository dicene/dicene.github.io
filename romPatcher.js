const BUTTONS = {
    ["Select"]: [0x00, 0x20],
    ["A"]: [0x80, 0x00],
    ["B"]: [0x00, 0x80],
    ["X"]: [0x40, 0x00],
    ["Y"]: [0x00, 0x40],
    ["L"]: [0x20, 0x00],
    ["R"]: [0x10, 0x00],
    ["None"]: [0x00, 0x00],
};

const CONTROLS = {
    ["Shot"]: [0xb331, 0x1722d],
    ["Jump"]: [0xb325, 0x17233],
    ["Dash"]: [0xb32b, 0x17239],
    ["ItemSelect"]: [0xb33d, 0x17245],
    ["ItemCancel"]: [0xb337, 0x1723f],
    ["AngleUp"]: [0xb343, 0x1724b],
    ["AngleDown"]: [0xb349, 0x17251]
};

var CustomControls =
{
    ["Shot"]: "Y",
    ["Jump"]: "B",
    ["Dash"]: "A",
    ["ItemSelect"]: "X",
    ["ItemCancel"]: "Select"
};

const SM_ROM_BEGINNING_BYTES = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xA3, 0x02, 0x85, 0x04, 0xA3, 0x01,
    0x85, 0x03, 0x18, 0x69, 0x03, 0x00, 0x83, 0x01, 0xA0, 0x01, 0x00, 0xB7, 0x03, 0x85, 0x00, 0xC8,
    0xB7, 0x03, 0x85, 0x01, 0x20, 0x28, 0x80, 0x6B, 0xAF, 0x08, 0x80, 0x80, 0xF0, 0x01, 0x60, 0x08];

var powerSuitPaletteOffsets = [0x0D9400, 0x0D9820, 0x0D9840, 0x0D9860, 0x0D9880, 0x0D98A0, 0x0D98C0, 0x0D98E0, 0x0D9900, 0x0D9B20, 0x0D9B40, 0x0D9B60, 0x0D9B80, 0x0D9BA0, 0x0D9BC0, 0x0D9BE0, 0x0D9C00, 0x0D9C20, 0x0D9C40, 0x0D9C60, 0x0D9C80, 0x0D9CA0, 0x0D9CC0, 0x0D9CE0, 0x0D9D00, 0x6DB6B, 0x6DBBA, 0x6DC09, 0x6DC58, 0x6DCA4, 0x6E466, 0x6E488, 0x6E4AA, 0x6E4CC, 0x6E4EE, 0x6E510, 0x6E532, 0x6E554, 0x6E576, 0x6E598, 0x6E5BA, 0x6E5DC, 0x6E5FE, 0x6E620, 0x6E642, 0x6E664, 0x6DB8F, 0x6DC2D, 0x6DC7C, 0x6DBDE];
var variaSuitPaletteOffsets = [0x0D9520, 0x0D9920, 0x0D9940, 0x0D9960, 0x0D9980, 0x0D99A0, 0x0D99C0, 0x0D99E0, 0x0D9A00, 0x0D9D20, 0x0D9D40, 0x0D9D60, 0x0D9D80, 0x0D9DA0, 0x0D9DC0, 0x0D9DE0, 0x0D9E00, 0x0D9E20, 0x0D9E40, 0x0D9E60, 0x0D9E80, 0x0D9EA0, 0x0D9EC0, 0x0D9EE0, 0x0D9F00, 0x6DCD1, 0x6DD20, 0x6DD6F, 0x6DDBE, 0x6DE0A, 0x6E692, 0x6E6B4, 0x6E6D6, 0x6E6F8, 0x6E71A, 0x6E73C, 0x6E75E, 0x6E780, 0x6E7A2, 0x6E7C4, 0x6E7E6, 0x6E808, 0x6E82A, 0x6E84C, 0x6E86E, 0x6E890, 0x6DCF5, 0x6DD44, 0x6DD93, 0x6DDE2];
var gravitySuitPaletteOffsets = [0x0D9540, 0x0D9560, 0x0D9580, 0x0D95A0, 0x0D95C0, 0x0D95E0, 0x0D9600, 0x0D9620, 0x0D9640, 0x0D9660, 0x0D9680, 0x0D96A0, 0x0D9780, 0x0D97A0, 0x0D97C0, 0x0D97E0, 0x0D9800, 0x0D9A20, 0x0D9A40, 0x0D9A60, 0x0D9A80, 0x0D9AA0, 0x0D9AC0, 0x0D9AE0, 0x0D9B00, 0x0D9F20, 0x0D9F40, 0x0D9F60, 0x0D9F80, 0x0D9FA0, 0x0D9FC0, 0x0D9FE0, 0x0DA000, 0x0DA020, 0x0DA040, 0x0DA060, 0x0DA080, 0x0DA0A0, 0x0DA0C0, 0x0DA0E0, 0x0DA100, 0x6DE37, 0x6DE86, 0x6DED5, 0x6DF24, 0x6DF70, 0x6E8BE, 0x6E8E0, 0x6E902, 0x6E924, 0x6E946, 0x6E968, 0x6E98A, 0x6E9AC, 0x6E9CE, 0x6E9F0, 0x6EA12, 0x6EA34, 0x6EA56, 0x6EA78, 0x6EA9A, 0x6EABC, 0x6DE5B, 0x6DEAA, 0x6DEF9, 0x6DF48];

var normalEnemyPaletteOffsets = [0x110687, 0x110B60, 0x11198D, 0x111E6A, 0x11238B, 0x112FF3, 0x11320C, 0x113264, 0x1132BC, 0x113A7B, 0x113E1C, 0x1140D1, 0x1145FA, 0x114A2B, 0x11580C, 0x11617B, 0x1162C0, 0x116457, 0x11657B, 0x116978, 0x116DC7, 0x118687, 0x1188F0, 0x118C0F, 0x11900A, 0x11965B, 0x11980B, 0x119B7B, 0x119B9B, 0x11A051, 0x11B0A5, 0x11B3A1, 0x11B5B3, 0x11C63E, 0x11C8A6, 0x11DFA2, 0x11E23C, 0x11E57C, 0x11E5B0, 0x11E5D0, 0x130687, 0x140687, 0x141379, 0x14159D, 0x1419AC, 0x141F4F, 0x142AFE, 0x14365E, 0x144143, 0x1446B3, 0x145821, 0x145BC7, 0x146230, 0x14699A, 0x1469BA, 0x1469DA, 0x155911, 0x19878B, 0x1989FD, 0x198AC1, 0x198EDC, 0x190687, 0x1906A7, 0x1906E7, 0x190727, 0x1906C7, 0x190707];
var animalPaletteOffsets = [0x13E7FE, 0x13F225, 0x19E525, 0x19E944];
var sideHopperPaletteOffsets = [0x11AA48, 0x11B085];
var desgeegaPaletteOffsets = [0x11AF85, 0x11B217];
var lavaEnemyPaletteOffsets = [0x130CFB, 0x131470, 0x142C1C];
var metroidPaletteOffsets = [0x11A725, 0x11E9AF, 0x14F8E6, 0x1494D2];
var crateriaSpecialEnemyPaletteOffsets = [0x140F8C, 0x1467AC];
var wreckedShipSpecialEnemyPaletteOffsets = [0x146587];
var tourianSpecialEnemyPaletteOffsets = [0x113A5B, 0x137D87];
var shipPaletteOffsets = [0x11259E];

var sporeSpawnPaletteOffsets = [0x12E359];
var kraidPaletteOffsets = [0x138687, 0x13B3F3, 0x13B533, 0x13AAB0, 0x1386C7];
var phantoonPaletteOffsets = [0x13CA01, 0x13CB41];
var botwoonPaletteOffsets = [0x199319, 0x19971B];

var beamPaletteOffsets = [0x843E1];
var waveBeamTrailPalettes = [0xD01AA];
var superMissilePalettes = [0xD01B0];
var grappleBeamPalettes = [0xDC687];

var moonwalkOffset = 0xB35D;
var moonwalkNewInstruction = [0x8D];

var baseRomFilePicker = document.getElementById('baseRomFilePicker');

var patchControlsEnabledButton = document.getElementById('patchControlsEnabled');
var patchControlsDisabledButton = document.getElementById('patchControlsDisabled');
var patchMoonwalkEnabledButton = document.getElementById('patchMoonwalkEnabled');
var patchMoonwalkDisabledButton = document.getElementById('patchMoonwalkDisabled');
var patchSamusPalettesEnabledButton = document.getElementById('patchSamusPalettesEnabled');
var patchSamusPalettesDisabledButton = document.getElementById('patchSamusPalettesDisabled');
var patchBeamPalettesEnabledButton = document.getElementById('patchBeamPalettesEnabled');
var patchBeamPalettesDisabledButton = document.getElementById('patchBeamPalettesDisabled');
var patchEnemyPalettesEnabledButton = document.getElementById('patchEnemyPalettesEnabled');
var patchEnemyPalettesDisabledButton = document.getElementById('patchEnemyPalettesDisabled');
var patchBossPalettesEnabledButton = document.getElementById('patchBossPalettesEnabled');
var patchBossPalettesDisabledButton = document.getElementById('patchBossPalettesDisabled');

var runCustomisationsButton = document.getElementById('runCustomisationsButton');
var downloadRomButton = document.getElementById('downloadRomButton');

var validateRomStatusList = document.getElementById('validateRomStatusList');
var validateRomStatus = document.getElementById('validateRomStatus');

var patchRomStatusList = document.getElementById('patchRomStatusList');
var patchControlsStatus = document.getElementById('patchControlsStatus');
var patchMoonwalkStatus = document.getElementById('patchMoonwalkStatus');
var patchPalettesStatus = document.getElementById('patchPalettesStatus');
var patchSamusPalettesStatus = document.getElementById('patchSamusPalettesStatus');
var patchBeamPalettesStatus = document.getElementById('patchBeamPalettesStatus');
var patchEnemyPalettesStatus = document.getElementById('patchEnemyPalettesStatus');
var patchBossPalettesStatus = document.getElementById('patchBossPalettesStatus');

var romBytes;
var romFileName;

function supportsHtml5Storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function PatchControls() {
    patchControlsStatus.classList.remove('d-none');
    patchControlsStatus.childNodes[0].replaceWith('Patching controls...');

    for (let controlName in CustomControls) {
        let controlAddresses = CONTROLS[controlName];
        let buttonBytes = BUTTONS[CustomControls[controlName]];

        WriteBytes(controlAddresses[0], buttonBytes);
        WriteBytes(controlAddresses[1], buttonBytes);
        console.log(`Control ${controlName} ${controlAddresses} changed to ${buttonBytes}`);
    }

    patchControlsStatus.classList.add('list-group-item-success');
    patchControlsStatus.childNodes[0].replaceWith(patchControlsStatus.childNodes[0].textContent + '...success!');
}

function PatchMoonwalk() {
    patchMoonwalkStatus.classList.remove('d-none');
    patchMoonwalkStatus.childNodes[0].replaceWith('Patching moonwalk...');

    WriteBytes(moonwalkOffset, moonwalkNewInstruction)

    patchMoonwalkStatus.classList.add('list-group-item-success');
    patchMoonwalkStatus.childNodes[0].replaceWith('Patching moonwalk...success!');
}

function HueShiftPalettes(offsets, paletteLength, hueShift) {
    for (let paletteOffset of offsets) {
        for (let i = 0; i < paletteLength; i++) {
            let location = paletteOffset + (i * 2);
            let paletteColor = ReadU16LE(location);

            let paletteRGB = PaletteToRGB(paletteColor);//{ r: 0, g: 0, b: 0 };
            let hsv = colorsys.rgb2Hsv(paletteRGB.r, paletteRGB.g, paletteRGB.b);//RGBToHSV(r, g, b);//{ h: 0, s: 0, v: 0 };
            let newHsv = {h: (hsv.h + hueShift) % 360, s: hsv.s, v: hsv.v};
            let newRGB = colorsys.hsv2Rgb(newHsv.h, newHsv.s, newHsv.v);//HSVToRGB(hsv)//{ r: 0, g: 0, b: 0 };
            newRGB.r = Math.floor(newRGB.r);
            newRGB.g = Math.floor(newRGB.g);
            newRGB.b = Math.floor(newRGB.b);
            // newRGB = {r: 0, g: 100, b: 200};
            let newPaletteColor = RGBToPalette(newRGB.r, newRGB.g, newRGB.b);//*/35000;
            let highByte = newPaletteColor >> 8;
            let lowByte = newPaletteColor - (highByte << 8);
            var newPaletteBytes = [lowByte, highByte];

            DebugMessage(`0x${decToHex(location, 4)}` + 
            `   0x${decToHex(romBytes[location+1], 2)}${decToHex(romBytes[location], 2)} => ` + 
            `${paletteColor}(0x${decToHex(paletteColor)}) rgb(${paletteRGB.r},${paletteRGB.g},${paletteRGB.b}) hsv(${hsv.h},${hsv.s},${hsv.v}) ` + 
            `shifted by ${hueShift} => ` + 
            `${newPaletteColor}(0x${decToHex(newPaletteColor, 4)}) bytes(0x${decToHex(lowByte, 2)}${decToHex(highByte, 2)}) rgb(${newRGB.r},${newRGB.g},${newRGB.b}) hsv(${newHsv.h},${newHsv.s},${newHsv.v})`);

            WriteBytes(location, newPaletteBytes);
        }
    }
}

function decToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}

function PaletteToRGB(color) {
    let r = Math.floor(color % 32 * 8);
    let g = Math.floor((color / 32 % 32) * 8);
    let b = Math.floor((color / 1024 % 32) * 8);
    return { r, g, b };
}

function RGBToPalette(r, g, b) {
    return (Math.floor(b / 8) * 1024) + (Math.floor(g / 8) * 32) + Math.floor(r / 8);
}

function RGBToHSV(rgb) {
    return colorsys.rgb_to_hsv({r: 255, g: 255, b: 255 })
    colorsys.stringify(hsv) // 'hsv(0, 0%, 100%)'
    // Parsing an hex string will result in a RGB object!
    colorsys.parseCss('#ff00ff') // { r: 255, g: 0, b: 255 }
}

function HSVToRGB(hsv) {

}

function ReadU16LE(address) {
    return (romBytes[address + 1] << 8) + romBytes[address];
}

function PatchSamusPalettes() {
    patchSamusPalettesStatus.classList.remove('d-none');
    patchSamusPalettesStatus.childNodes[0].replaceWith('Patching Samus palettes...');

    // 20-340 on a scale of 0-360
    let hueShift = 20 + Math.floor(Math.random() * 320);
    HueShiftPalettes(powerSuitPaletteOffsets, 0x10, 119);

    patchSamusPalettesStatus.classList.add('list-group-item-success');
    patchSamusPalettesStatus.childNodes[0].replaceWith('Patching Samus palettes...shifting ${hueShift} hues...success!');
}

function PatchBeamPalettes() {
    patchBeamPalettesStatus.classList.remove('d-none');
    patchBeamPalettesStatus.childNodes[0].replaceWith('Patching beam palettes...');



    patchBeamPalettesStatus.classList.add('list-group-item-success');
    patchBeamPalettesStatus.childNodes[0].replaceWith('Patching beam palettes...success!');
}

function PatchEnemyPalettes() {
    patchEnemyPalettesStatus.classList.remove('d-none');
    patchEnemyPalettesStatus.childNodes[0].replaceWith('Patching enemy palettes...');



    patchEnemyPalettesStatus.classList.add('list-group-item-success');
    patchEnemyPalettesStatus.childNodes[0].replaceWith('Patching enemy palettes...success!');
}

function PatchBossPalettes() {
    patchBossPalettesStatus.classList.remove('d-none');
    patchBossPalettesStatus.childNodes[0].replaceWith('Patching boss palettes...');



    patchBossPalettesStatus.classList.add('list-group-item-success');
    patchBossPalettesStatus.childNodes[0].replaceWith('Patching boss palettes...success!');
}

function RunCustomisations() {
    patchRomStatusList.classList.remove('d-none');

    if (patchControlsEnabledButton.checked)
        PatchControls();
    if (patchMoonwalkEnabledButton.checked)
        PatchMoonwalk();
    if (patchSamusPalettesEnabledButton.checked)
        PatchSamusPalettes();
    if (patchBeamPalettesEnabledButton.checked)
        PatchBeamPalettes();
    if (patchEnemyPalettesEnabledButton.checked)
        PatchEnemyPalettes();
    if (patchBossPalettesEnabledButton.checked)
        PatchBossPalettes();

    SaveRom();
}

function TestRom() {
    let testFileName = 'sm map rando 11 - 95FqtcuX0Th1xfEQ-CL8Zw.smc';
    const arrayBuffer = Uint8Array.from(window.atob(romData), c => c.charCodeAt(0));
    romBytes = arrayBuffer;
    romFileName = testFileName;

    ValidateRom();
}

function SaveRom() {
    var saveByteArray = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, name) {
            var blob = new Blob([data], { type: "application/octet-stream" }),
                url = window.URL.createObjectURL(blob);
            downloadRomButton.onclick = () => {
                a.click();
                // window.URL.revokeObjectURL(url);
            };
            downloadRomButton.classList.remove('d-none', 'disabled');
            a.href = url;
            a.download = name;
        };
    }());

    let romName = romFileName.substring(0, romFileName.lastIndexOf('.'));
    let romExtension = romFileName.substring(romFileName.lastIndexOf('.'));
    let newName = romName + " (customised)" + romExtension;

    saveByteArray(romBytes, newName);
}

function ValidateRom() {
    validateRomStatusList.classList.remove('d-none');

    validateRomStatus.classList.remove('d-none');
    validateRomStatus.childNodes[0].replaceWith('Validating rom...');

    for (let i = 0; i < SM_ROM_BEGINNING_BYTES.length; i++) {
        if (romBytes[i] != SM_ROM_BEGINNING_BYTES[i]) {
            validateRomStatus.classList.add('list-group-item-danger');
            return;
        }
    }

    validateRomStatus.classList.add('list-group-item-success');
    validateRomStatus.childNodes[0].replaceWith('Validating rom...success!');

    runCustomisationsButton.classList.remove('disabled', 'd-none');
}

function WriteBytes(address, newBytes) {
    for (let i = 0; i < newBytes.length; i++) {
        romBytes[address + i] = newBytes[i];
    }
}

function OnFileSelected(e) {
    var file = e.target.files[0];

    var reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (readerEvent) => FileReaderOnLoad(readerEvent, file.name);
}

function FileReaderOnLoad(readerEvent, fileName) {
    let content = readerEvent.target.result;
    let bytes = new Uint8Array(content);
    romBytes = bytes;
    romFileName = fileName;
    ValidateRom();
}

function LoadPreviousSettings() {
    if (supportsHtml5Storage()) {
        let patchControlsEnabledSetting = window.localStorage.getItem("patchControlsEnabled");
        if (patchControlsEnabledSetting && patchControlsEnabledSetting == 'true') {
            patchControlsEnabledButton.checked = true;
        } else {
            patchControlsDisabledButton.checked = true;
        }

        let patchMoonwalkEnabledSetting = window.localStorage.getItem("patchMoonwalkEnabled");
        if (patchMoonwalkEnabledSetting && patchMoonwalkEnabledSetting == 'true') {
            patchMoonwalkEnabledButton.checked = true;
        } else {
            patchMoonwalkDisabledButton.checked = true;
        }

        let patchSamusPalettesEnabledSetting = window.localStorage.getItem("patchSamusPalettesEnabled");
        if (patchSamusPalettesEnabledSetting && patchSamusPalettesEnabledSetting == 'true') {
            patchSamusPalettesEnabledButton.checked = true;
        } else {
            patchSamusPalettesDisabledButton.checked = true;
        }

        let patchBeamPalettesEnabledSetting = window.localStorage.getItem("patchBeamPalettesEnabled");
        if (patchBeamPalettesEnabledSetting && patchBeamPalettesEnabledSetting == 'true') {
            patchBeamPalettesEnabledButton.checked = true;
        } else {
            patchBeamPalettesDisabledButton.checked = true;
        }

        let patchEnemyPalettesEnabledSetting = window.localStorage.getItem("patchEnemyPalettesEnabled");
        if (patchEnemyPalettesEnabledSetting && patchEnemyPalettesEnabledSetting == 'true') {
            patchEnemyPalettesEnabledButton.checked = true;
        } else {
            patchEnemyPalettesDisabledButton.checked = true;
        }

        let patchBossPalettesEnabledSetting = window.localStorage.getItem("patchBossPalettesEnabled");
        if (patchBossPalettesEnabledSetting && patchBossPalettesEnabledSetting == 'true') {
            patchBossPalettesEnabledButton.checked = true;
        } else {
            patchBossPalettesDisabledButton.checked = true;
        }
    } else {
        DebugMessage("This browser doesn't seem to support HTML5 LocalStorage. User Preferences won't be saved between sessions.");
    }
}

function SetupListeners() {
    baseRomFilePicker.onchange = OnFileSelected;
    runCustomisationsButton.onclick = RunCustomisations;
    patchControlsEnabledButton.onclick = () => {
        window.localStorage.setItem("patchControlsEnabled", 'true');
    };
    patchControlsDisabledButton.onclick = () => {
        window.localStorage.setItem("patchControlsEnabled", 'false');
    };
    patchMoonwalkEnabledButton.onclick = () => {
        window.localStorage.setItem("patchMoonwalkEnabled", 'true');
    };
    patchMoonwalkDisabledButton.onclick = () => {
        window.localStorage.setItem("patchMoonwalkEnabled", 'false');
    };
    patchSamusPalettesEnabledButton.onclick = () => {
        window.localStorage.setItem("patchSamusPalettesEnabled", 'true');
    };
    patchSamusPalettesDisabledButton.onclick = () => {
        window.localStorage.setItem("patchSamusPalettesEnabled", 'false');
    };
    patchBeamPalettesEnabledButton.onclick = () => {
        window.localStorage.setItem("patchBeamPalettesEnabled", 'true');
    };
    patchBeamPalettesDisabledButton.onclick = () => {
        window.localStorage.setItem("patchBeamPalettesEnabled", 'false');
    };
    patchEnemyPalettesEnabledButton.onclick = () => {
        window.localStorage.setItem("patchEnemyPalettesEnabled", 'true');
    };
    patchEnemyPalettesDisabledButton.onclick = () => {
        window.localStorage.setItem("patchEnemyPalettesEnabled", 'false');
    };
    patchBossPalettesEnabledButton.onclick = () => {
        window.localStorage.setItem("patchBossPalettesEnabled", 'true');
    };
    patchBossPalettesDisabledButton.onclick = () => {
        window.localStorage.setItem("patchBossPalettesEnabled", 'false');
    };
}

function DebugMessage(text) {
    var element = document.createElement('h3');
    element.appendChild(document.createTextNode(text));
    document.body.appendChild(element);

    console.log(text);
}

LoadPreviousSettings();
SetupListeners();

// TestRom();