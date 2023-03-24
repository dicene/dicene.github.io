// import constants from "./constants.js";
console.clear();

const CONSTANTS = await import(`./constants.js`);
const IPSReader = await import('./ipsReader.js');

class SpriteSheet {
    path = '';
    pixels = [];
    static SpriteSheets = [];

    static async Get(path) {
        let spriteSheet = new SpriteSheet();

        spriteSheet.path = path;
        if (SpriteSheet.SpriteSheets[path] != null) {
            return SpriteSheets[path];
        }

        spriteSheet.pixels = await ReadSpriteSheet(path);
        SpriteSheet.SpriteSheets[path] = spriteSheet;
        return SpriteSheet.SpriteSheets[path];
    }
}

var CustomControls =
{
    ["Shot"]: "Y",
    ["Jump"]: "B",
    ["Dash"]: "A",
    ["ItemSelect"]: "X",
    ["ItemCancel"]: "Select"
};

var baseRomFilePicker = document.getElementById('baseRomFilePicker');

var customizationOptionsDisplayList = document.getElementById('customizationOptionsList');
var customizationOptions = [];
var customizationOptionValues = {};

// var oldCustomizationOptionsList = document.getElementById('oldCustomizationOptionsList');
// oldCustomizationOptionsList.classList.add('d-none');

// var patchControlsEnabledButton = document.getElementById('patchControlsEnabled');
// var patchControlsDisabledButton = document.getElementById('patchControlsDisabled');
// var patchMoonwalkEnabledButton = document.getElementById('patchMoonwalkEnabled');
// var patchMoonwalkDisabledButton = document.getElementById('patchMoonwalkDisabled');
// var patchSamusPalettesEnabledButton = document.getElementById('patchSamusPalettesEnabled');
// var patchSamusPalettesDisabledButton = document.getElementById('patchSamusPalettesDisabled');
// var patchBeamPalettesEnabledButton = document.getElementById('patchBeamPalettesEnabled');
// var patchBeamPalettesDisabledButton = document.getElementById('patchBeamPalettesDisabled');
// var patchEnemyPalettesEnabledButton = document.getElementById('patchEnemyPalettesEnabled');
// var patchEnemyPalettesDisabledButton = document.getElementById('patchEnemyPalettesDisabled');
// var patchBossPalettesEnabledButton = document.getElementById('patchBossPalettesEnabled');
// var patchBossPalettesDisabledButton = document.getElementById('patchBossPalettesDisabled');

const runCustomizationsButton = document.getElementById('runCustomizationsButton');
const downloadRomButton = document.getElementById('downloadRomButton');

const validateRomStatusList = document.getElementById('validateRomStatusList');
const validateRomStatus = document.getElementById('validateRomStatus');

const paletteDisplayCanvas = document.getElementById("paletteDisplayCanvas");

const patchRomStatusList = document.getElementById('patchRomStatusList');
// const patchControlsStatus = document.getElementById('patchControlsStatus');
// const patchMoonwalkStatus = document.getElementById('patchMoonwalkStatus');
// const patchPalettesStatus = document.getElementById('patchPalettesStatus');
// const patchSamusPalettesStatus = document.getElementById('patchSamusPalettesStatus');
// const patchBeamPalettesStatus = document.getElementById('patchBeamPalettesStatus');
// const patchEnemyPalettesStatus = document.getElementById('patchEnemyPalettesStatus');
// const patchBossPalettesStatus = document.getElementById('patchBossPalettesStatus');

var romBytes;
var romFileName;
var spriteSheetImageData;
var samusSpriteSheet;

var originalPowerSuitPalette;
var originalVariaSuitPalette;
var originalGravitySuitPalette;

var newPowerSuitPalette;
var newVariaSuitPalette;
var newGravitySuitPalette;

var newPaletteListItems = [];

var samusPowerSuitElevatorSpriteMap;
var samusVariaSuitElevatorSpriteMap;

function createCustomizationToggle(name, label, customizeAction, parent) {
    let newOption = { name: name, label: label, type: 'toggle', enabled: false, customizeAction: customizeAction };

    let newOptionDisplayListItem = GenerateNewListItem(parent);

    let optionLabel = document.createElement('label');
    optionLabel.innerHTML = label;
    optionLabel.classList.add('col-sm-3', 'col-form-label');
    optionLabel.htmlFor = 'preset';

    newOptionDisplayListItem.appendChild(optionLabel);

    let toggleDiv = document.createElement('div');
    toggleDiv.classList.add('col-sm-3', 'btn-group');
    toggleDiv.setAttribute("role", 'group');
    // newOptionDisplay.id = `${name}ToggleDiv`;

    newOptionDisplayListItem.appendChild(toggleDiv);

    let disabledButton = document.createElement('input');
    disabledButton.type = 'radio';
    disabledButton.classList.add('btn-check', 'my-2');
    disabledButton.name = `${name}Toggle`;
    disabledButton.id = `${name}ToggleDisabled`;
    disabledButton.value = 'Disabled';
    disabledButton.autocomplete = 'off';
    disabledButton.checked = true;

    toggleDiv.appendChild(disabledButton);

    let disabledButtonLabel = document.createElement('label');
    disabledButtonLabel.textContent = 'Disabled';
    disabledButtonLabel.classList.add('btn', 'btn-outline-primary');
    disabledButtonLabel.htmlFor = disabledButton.id;

    toggleDiv.appendChild(disabledButtonLabel);

    let enabledButton = document.createElement('input');
    enabledButton.type = 'radio';
    enabledButton.classList.add('btn-check', 'my-2');
    enabledButton.name = `${name}Toggle`;
    enabledButton.id = `${name}ToggleEnabled`;
    enabledButton.value = 'Enabled';
    enabledButton.autocomplete = 'off';

    toggleDiv.appendChild(enabledButton);

    let enabledButtonLabel = document.createElement('label');
    enabledButtonLabel.textContent = 'Enabled';
    enabledButtonLabel.classList.add('btn', 'btn-outline-primary');
    enabledButtonLabel.htmlFor = enabledButton.id;

    toggleDiv.appendChild(enabledButtonLabel);

    // newOption.enabled = () => customizationOptionValues[name] == true;

    if (customizationOptionValues[name]) {
        enabledButton.checked = true;
        disabledButton.checked = false;
        newOption.enabled = true;
    } else {
        enabledButton.checked = false;
        disabledButton.checked = true;
        newOption.enabled = false;
    }

    enabledButton.onclick = () => {
        newOption.enabled = true;
        customizationOptionValues[name] = true;
        UpdateStoredCustomizationSettings();
    };

    disabledButton.onclick = () => {
        newOption.enabled = false;
        customizationOptionValues[name] = false;
        UpdateStoredCustomizationSettings();
    };

    // newOptionDisplayListItem.appendChild(newOptionDisplay);

    // return listItem;

    //
    // customizationOptionsDisplayList
    // <li class="list-group-item">
    //     <label class="col-sm-3 col-form-label" for="preset">Patch Controls<sup>1</sup></label>
    //     <div class="col-sm-3 btn-group" role="group">
    //         <input type="radio" class="btn-check my-2" name="patchControls"
    //             id="patchControlsDisabled" value="Disabled" autocomplete="off" checked="">
    //         <label class="btn btn-outline-primary" for="patchControlsDisabled">Disabled</label>

    //         <input type="radio" class="btn-check my-2" name="patchControls"
    //             id="patchControlsEnabled" value="Enabled" autocomplete="off">
    //         <label class="btn btn-outline-primary" for="patchControlsEnabled">Enabled</label>
    //     </div>
    // </li>
    customizationOptions.push(newOption);
}

function UpdateStoredCustomizationSettings() {
    if (supportsHtml5Storage) {
        window.localStorage.setItem("customizationSettings", JSON.stringify(customizationOptionValues));
    } else {
        DebugMessage("This browser doesn't seem to support HTML5 LocalStorage. User Preferences won't be saved between sessions.");
    }
}

function createCustomizationRadio(label, name, optionList) {
    let newOption = { label: label, name: name, type: 'radio' };

    // customizationOptionsDisplayList

    customizationOptions.push(newOption);
}

function removeElement(array, remIdx) {
    return array.map(function (arr) {
        return arr.filter(function (el, idx) {
            return idx !== remIdx
        });
    });
};

function supportsHtml5Storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function PatchControls() {
    let patchControlsStatus = GenerateNewListItem("Patching controls...", patchRomStatusList);

    for (let controlName in CustomControls) {
        let controlAddresses = CONSTANTS.CONTROLS[controlName];
        let buttonBytes = CONSTANTS.BUTTONS[CustomControls[controlName]];

        WriteBytes(controlAddresses[0], buttonBytes);
        WriteBytes(controlAddresses[1], buttonBytes);
        // console.log(`Control ${controlName} ${controlAddresses} changed to ${buttonBytes}`);
    }

    patchControlsStatus.classList.add('list-group-item-success');
    patchControlsStatus.childNodes[0].replaceWith(patchControlsStatus.childNodes[0].textContent + 'success!');
}

function PatchMoonwalk() {
    let patchMoonwalkStatus = GenerateNewListItem("Patching moonwalk...", patchRomStatusList);

    WriteBytes(CONSTANTS.moonwalkOffset, CONSTANTS.moonwalkNewInstruction)

    patchMoonwalkStatus.classList.add('list-group-item-success');
    patchMoonwalkStatus.childNodes[0].replaceWith(patchMoonwalkStatus.childNodes[0].textContent + 'success!');
}

function PatchEasySpaceJump() {
    // <li class="list-group-item d-none" id="patchControlsStatus">Patching Controls...</li>
    let patchEasySpaceJumpStatus = GenerateNewListItem("Applying Easy Space Jump Patch...", patchRomStatusList);

    ApplyPatches(CONSTANTS.easySpaceJumpPatch);

    patchEasySpaceJumpStatus.classList.add('list-group-item-success');
    patchEasySpaceJumpStatus.childNodes[0].replaceWith(patchEasySpaceJumpStatus.childNodes[0].textContent + 'success!');
}

async function PatchRespin() {
    let patchRespinStatus = GenerateNewListItem("Applying Respin Patch...", patchRomStatusList);

    let bytes = await LoadFileBytes("./ipsPatches/maprando respin.ips");
    let respinPatchList = IPSReader.ProcessIPS(bytes);
    ApplyPatches(respinPatchList);

    patchRespinStatus.classList.add('list-group-item-success');
    patchRespinStatus.childNodes[0].replaceWith(patchRespinStatus.childNodes[0].textContent + 'success!');
}

async function PatchMSU1() {
    let msuPatchStatus = GenerateNewListItem("Applying MSU-1 Patch...", patchRomStatusList);

    let bytes = await LoadFileBytes("./ipsPatches/supermetroid_msu1.ips");
    let msuPatchList = IPSReader.ProcessIPS(bytes);
    ApplyPatches(msuPatchList);

    msuPatchStatus.classList.add('list-group-item-success');
    msuPatchStatus.childNodes[0].replaceWith(msuPatchStatus.childNodes[0].textContent + 'success!');
}

function RandomizeSamusPalettes() {
    let patchSamusPalettesStatus = GenerateNewListItem("Randomizing Samus palettes...", patchRomStatusList);

    // 20-340 on a scale of 0-360
    let hueShift = 20 + Math.floor(Math.random() * 320);
    patchSamusPalettesStatus.childNodes[0].replaceWith(patchSamusPalettesStatus.childNodes[0].textContent + `shifting hues by ${hueShift}...`);
    newPowerSuitPalette = HueShiftPalettes(CONSTANTS.powerSuitPaletteOffsets, 0x10, hueShift);
    newPowerSuitPalette[0] = { r: 0, g: 0, b: 0 };
    HueShiftPalettes(CONSTANTS.shipPaletteOffsets, 0x10, hueShift);

    hueShift = 20 + Math.floor(Math.random() * 320);
    newVariaSuitPalette = HueShiftPalettes(CONSTANTS.variaSuitPaletteOffsets, 0x10, hueShift);
    newVariaSuitPalette[0] = { r: 0, g: 0, b: 0 };

    hueShift = 20 + Math.floor(Math.random() * 320);
    newGravitySuitPalette = HueShiftPalettes(CONSTANTS.gravitySuitPaletteOffsets, 0x10, hueShift);
    newGravitySuitPalette[0] = { r: 0, g: 0, b: 0 };

    patchSamusPalettesStatus.classList.add('list-group-item-success');
    patchSamusPalettesStatus.childNodes[0].replaceWith(patchSamusPalettesStatus.childNodes[0].textContent + 'success!');

    for (let listItem of newPaletteListItems) {
        listItem.remove();
    }

    newPaletteListItems = [];

    let powerSuitPaletteListItem = GenerateNewListItem('Power Suit Palette', patchRomStatusList);
    let powerSuitPaletteDisplay = GeneratePaletteDisplay(newPowerSuitPalette, 16, powerSuitPaletteListItem);

    let variaSuitPaletteListItem = GenerateNewListItem('Varia Suit Palette', patchRomStatusList);
    let variaSuitPaletteDisplay = GeneratePaletteDisplay(newVariaSuitPalette, 16, variaSuitPaletteListItem);

    let gravitySuitPaletteListItem = GenerateNewListItem('Gravity Suit Palette', patchRomStatusList);
    let gravitySuitPaletteDisplay = GeneratePaletteDisplay(newGravitySuitPalette, 16, gravitySuitPaletteListItem);

    let pixelSize = 2;

    let suitDisplaysListItem = GenerateNewListItem('Updated Suits', patchRomStatusList);
    let powerSuitSpriteDisplay = GenerateSpriteDisplay(samusPowerSuitElevatorSpriteMap, newPowerSuitPalette, pixelSize, suitDisplaysListItem);
    let variaSuitSpriteDisplay = GenerateSpriteDisplay(samusVariaSuitElevatorSpriteMap, newVariaSuitPalette, pixelSize, suitDisplaysListItem);
    let gravitySuitSpriteDisplay = GenerateSpriteDisplay(samusVariaSuitElevatorSpriteMap, newGravitySuitPalette, pixelSize, suitDisplaysListItem);

    newPaletteListItems.push(suitDisplaysListItem, powerSuitPaletteListItem, variaSuitPaletteListItem, gravitySuitPaletteListItem,
        powerSuitSpriteDisplay, variaSuitSpriteDisplay, gravitySuitSpriteDisplay);
}

function RandomizeBeamPalettes() {
    let patchBeamPalettesStatus = GenerateNewListItem("Randomizing beam palettes...", patchRomStatusList);

    let hueShift = 20 + Math.floor(Math.random() * 320);
    patchBeamPalettesStatus.childNodes[0].replaceWith(patchBeamPalettesStatus.childNodes[0].textContent + `shifting hues by ${hueShift}...`);
    HueShiftPalettes(CONSTANTS.beamPaletteOffsets, 0x4F, hueShift);
    HueShiftPalettes(CONSTANTS.waveBeamTrailPalettes, 0x02, hueShift);
    HueShiftPalettes(CONSTANTS.superMissilePalettes, 0x02, hueShift);

    patchBeamPalettesStatus.classList.add('list-group-item-success');
    patchBeamPalettesStatus.childNodes[0].replaceWith(patchBeamPalettesStatus.childNodes[0].textContent + 'success!');
}

function RandomizeEnemyPalettes() {
    let patchEnemyPalettesStatus = GenerateNewListItem("Randomizing enemy palettes...", patchRomStatusList);

    let hueShift = 20 + Math.floor(Math.random() * 320);
    patchEnemyPalettesStatus.childNodes[0].replaceWith(patchEnemyPalettesStatus.childNodes[0].textContent + `shifting hues by ${hueShift}...`);
    HueShiftPalettes(CONSTANTS.normalEnemyPaletteOffsets.concat(CONSTANTS.animalPaletteOffsets)
        .concat(CONSTANTS.sideHopperPaletteOffsets).concat(CONSTANTS.desgeegaPaletteOffsets)
        .concat(CONSTANTS.lavaEnemyPaletteOffsets).concat(CONSTANTS.metroidPaletteOffsets)
        .concat(CONSTANTS.crateriaSpecialEnemyPaletteOffsets).concat(CONSTANTS.reckedShipSpecialEnemyPaletteOffsets)
        .concat(CONSTANTS.tourianSpecialEnemyPaletteOffsets), 0x10, hueShift);

    patchEnemyPalettesStatus.classList.add('list-group-item-success');
    patchEnemyPalettesStatus.childNodes[0].replaceWith(patchEnemyPalettesStatus.childNodes[0].textContent + 'success!');
}

function RandomizeBossPalettes() {
    let patchBossPalettesStatus = GenerateNewListItem("Randomizing boss palettes...", patchRomStatusList);

    let hueShift = 20 + Math.floor(Math.random() * 320);
    patchBossPalettesStatus.childNodes[0].replaceWith(patchBossPalettesStatus.childNodes[0].textContent + `shifting hues by ${hueShift}...`);
    HueShiftPalettes(CONSTANTS.sporeSpawnPaletteOffsets, 0x3F, hueShift);

    patchBossPalettesStatus.classList.add('list-group-item-success');
    patchBossPalettesStatus.childNodes[0].replaceWith(patchBossPalettesStatus.childNodes[0].textContent + 'success!');
}

function HueShiftPalettes(offsets, paletteLength, hueShift) {
    let newPalette = [];

    for (let paletteOffset of offsets) {
        for (let i = 0; i < paletteLength; i++) {
            let location = paletteOffset + (i * 2);
            let paletteColor = ReadU16LE(location);

            let paletteRGB = PaletteToRGB(paletteColor);
            let hsv = colorsys.rgb2Hsv(paletteRGB.r, paletteRGB.g, paletteRGB.b);
            let newHsv = { h: (hsv.h + hueShift) % 360, s: hsv.s, v: hsv.v };
            let newRGB = colorsys.hsv2Rgb(newHsv.h, newHsv.s, newHsv.v);
            newRGB.r = Math.floor(newRGB.r);
            newRGB.g = Math.floor(newRGB.g);
            newRGB.b = Math.floor(newRGB.b);
            newPalette.push(newRGB);
            let newPaletteColor = RGBToPalette(newRGB.r, newRGB.g, newRGB.b);
            let highByte = newPaletteColor >> 8;
            let lowByte = newPaletteColor - (highByte << 8);
            var newPaletteBytes = [lowByte, highByte];

            // DebugMessage(`0x${decToHex(location, 4)}` + 
            // `   0x${decToHex(romBytes[location+1], 2)}${decToHex(romBytes[location], 2)} => ` + 
            // `${paletteColor}(0x${decToHex(paletteColor)}) rgb(${paletteRGB.r},${paletteRGB.g},${paletteRGB.b}) hsv(${hsv.h},${hsv.s},${hsv.v}) ` + 
            // `shifted by ${hueShift} => ` + 
            // `${newPaletteColor}(0x${decToHex(newPaletteColor, 4)}) bytes(0x${decToHex(lowByte, 2)}${decToHex(highByte, 2)}) rgb(${newRGB.r},${newRGB.g},${newRGB.b}) hsv(${newHsv.h},${newHsv.s},${newHsv.v})`);

            WriteBytes(location, newPaletteBytes);
        }
    }

    return newPalette;
}

function DecToHex(d, padding) {
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

function ReadU16LE(address) {
    return (romBytes[address + 1] << 8) + romBytes[address];
}

function ValidateRom() {
    validateRomStatusList.classList.remove('d-none');

    validateRomStatus.classList.remove('d-none');
    validateRomStatus.childNodes[0].replaceWith('Validating rom...');

    for (let i = 0; i < CONSTANTS.SM_ROM_BEGINNING_BYTES.length; i++) {
        if (romBytes[i] != CONSTANTS.SM_ROM_BEGINNING_BYTES[i]) {
            validateRomStatus.classList.add('list-group-item-danger');
            return;
        }
    }

    validateRomStatus.classList.add('list-group-item-success');
    validateRomStatus.childNodes[0].replaceWith('Validating rom...success!');

    runCustomizationsButton.classList.remove('disabled', 'd-none');

    let palette1 = GetPalette(CONSTANTS.powerSuitPaletteOffsets[0], 0x10);
    // console.log(palette1);
}

function RunCustomizations() {
    patchRomStatusList.classList.remove('d-none');

    while (patchRomStatusList.firstChild) {
        patchRomStatusList.removeChild(patchRomStatusList.lastChild);
    }

    for (let option of customizationOptions) {
        console.log(`Checking option ${option.name}...`);
        if (option.type == 'toggle' && option.enabled && option.customizeAction != null) {
            console.log(`...running ${option.name}`);
            option.customizeAction();
        } else {
            console.log(`...skipping ${option.name}`);
        }
    }

    // if (patchControlsEnabledButton.checked)
    //     PatchControls();
    // // if (patchMoonwalkEnabledButton.checked)
    // //     PatchMoonwalk();
    // if (patchSamusPalettesEnabledButton.checked) {
    //     RandomizeSamusPalettes();        
    // }

    // if (patchBeamPalettesEnabledButton.checked)
    //     RandomizeBeamPalettes();
    // if (patchEnemyPalettesEnabledButton.checked)
    //     RandomizeEnemyPalettes();
    // if (patchBossPalettesEnabledButton.checked)
    //     RandomizeBossPalettes();

    SaveRom();
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
    let newName = romName + " (customized)" + romExtension;

    saveByteArray(romBytes, newName);
}

function GetPalette(location, size) {
    let colors = [];
    for (let i = 0; i < size; i++) {
        let paletteColor = ReadU16LE(location + i);
        let rgb = PaletteToRGB(paletteColor);
        colors.push(rgb);
    }

    return colors;
}

function WriteBytes(address, newBytes) {
    for (let i = 0; i < newBytes.length; i++) {
        romBytes[address + i] = newBytes[i];
    }
}

function ApplyPatches(patchList) {
    for (let patch of patchList) {
        let { offset, bytes } = patch;

        for (let i = 0; i < bytes.length; i++) {
            romBytes[offset + i] = bytes[i];
        }
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
        let storedCustomizationOptionValues = window.localStorage.getItem("customizationSettings");

        if (storedCustomizationOptionValues)
            customizationOptionValues = JSON.parse(storedCustomizationOptionValues);

        // let patchControlsEnabledSetting = window.localStorage.getItem("patchControlsEnabled");
        // if (patchControlsEnabledSetting && patchControlsEnabledSetting == 'true') {
        //     patchControlsEnabledButton.checked = true;
        // } else {
        //     patchControlsDisabledButton.checked = true;
        // }

        // let patchMoonwalkEnabledSetting = window.localStorage.getItem("patchMoonwalkEnabled");
        // if (patchMoonwalkEnabledSetting && patchMoonwalkEnabledSetting == 'true') {
        //     patchMoonwalkEnabledButton.checked = true;
        // } else {
        //     patchMoonwalkDisabledButton.checked = true;
        // }

        // let patchSamusPalettesEnabledSetting = window.localStorage.getItem("patchSamusPalettesEnabled");
        // if (patchSamusPalettesEnabledSetting && patchSamusPalettesEnabledSetting == 'true') {
        //     patchSamusPalettesEnabledButton.checked = true;
        // } else {
        //     patchSamusPalettesDisabledButton.checked = true;
        // }

        // let patchBeamPalettesEnabledSetting = window.localStorage.getItem("patchBeamPalettesEnabled");
        // if (patchBeamPalettesEnabledSetting && patchBeamPalettesEnabledSetting == 'true') {
        //     patchBeamPalettesEnabledButton.checked = true;
        // } else {
        //     patchBeamPalettesDisabledButton.checked = true;
        // }

        // let patchEnemyPalettesEnabledSetting = window.localStorage.getItem("patchEnemyPalettesEnabled");
        // if (patchEnemyPalettesEnabledSetting && patchEnemyPalettesEnabledSetting == 'true') {
        //     patchEnemyPalettesEnabledButton.checked = true;
        // } else {
        //     patchEnemyPalettesDisabledButton.checked = true;
        // }

        // let patchBossPalettesEnabledSetting = window.localStorage.getItem("patchBossPalettesEnabled");
        // if (patchBossPalettesEnabledSetting && patchBossPalettesEnabledSetting == 'true') {
        //     patchBossPalettesEnabledButton.checked = true;
        // } else {
        //     patchBossPalettesDisabledButton.checked = true;
        // }
    } else {
        DebugMessage("This browser doesn't seem to support HTML5 LocalStorage. User Preferences won't be saved between sessions.");
    }
}

function SetupListeners() {
    baseRomFilePicker.onchange = OnFileSelected;
    runCustomizationsButton.onclick = RunCustomizations;
    // patchControlsEnabledButton.onclick = () => {
    //     window.localStorage.setItem("patchControlsEnabled", 'true');
    // };
    // patchControlsDisabledButton.onclick = () => {
    //     window.localStorage.setItem("patchControlsEnabled", 'false');
    // };
    // patchMoonwalkEnabledButton.onclick = () => {
    //     window.localStorage.setItem("patchMoonwalkEnabled", 'true');
    // };
    // patchMoonwalkDisabledButton.onclick = () => {
    //     window.localStorage.setItem("patchMoonwalkEnabled", 'false');
    // };
    // patchSamusPalettesEnabledButton.onclick = () => {
    //     window.localStorage.setItem("patchSamusPalettesEnabled", 'true');
    // };
    // patchSamusPalettesDisabledButton.onclick = () => {
    //     window.localStorage.setItem("patchSamusPalettesEnabled", 'false');
    // };
    // patchBeamPalettesEnabledButton.onclick = () => {
    //     window.localStorage.setItem("patchBeamPalettesEnabled", 'true');
    // };
    // patchBeamPalettesDisabledButton.onclick = () => {
    //     window.localStorage.setItem("patchBeamPalettesEnabled", 'false');
    // };
    // patchEnemyPalettesEnabledButton.onclick = () => {
    //     window.localStorage.setItem("patchEnemyPalettesEnabled", 'true');
    // };
    // patchEnemyPalettesDisabledButton.onclick = () => {
    //     window.localStorage.setItem("patchEnemyPalettesEnabled", 'false');
    // };
    // patchBossPalettesEnabledButton.onclick = () => {
    //     window.localStorage.setItem("patchBossPalettesEnabled", 'true');
    // };
    // patchBossPalettesDisabledButton.onclick = () => {
    //     window.localStorage.setItem("patchBossPalettesEnabled", 'false');
    // };
}

function DebugMessage(text) {
    var element = document.createElement('h3');
    element.appendChild(document.createTextNode(text));
    document.body.appendChild(element);

    console.log(text);
}

function GetImageFromSpriteSheet(spriteSheet, xStart, yStart, width, height, pixelWidth, pixelHeight) {
    //xStart = 378, yStart = 1, width = 15, height = 3, pixelWidth = 8, pixelHeight = 8
    let pixels = [];

    for (let y = yStart; y < yStart + (height * pixelHeight); y += pixelHeight) {
        let rowPixels = [];

        for (let x = xStart; x < xStart + (width * pixelWidth); x += pixelWidth) {
            // let { r, g, b } = spriteSheet[y][x];
            rowPixels.push(spriteSheet.pixels[y][x]);
            // if (y == 0) {
            //     powerSuitPalette.push({ r: r, g: g, b: b });
            // } else if (y == 1) {
            //     variaSuitPalette.push({ r: r, g: g, b: b })
            // } else {
            //     gravitySuitPalette.push({ r: r, g: g, b: b })
            // }
        }

        pixels.push(rowPixels);
    }
    return pixels;
}

function isEmptyArray(array) {
    return Array.isArray(array) && array.length == 0;
}

function isPopulatedArray(array) {
    return Array.isArray(array) && array.length > 0;
}

async function ReadSpriteSheet(imagePath) {
    return new Promise((resolve, reject) => {
        var spriteSheetImage = new Image();

        spriteSheetImage.onerror = reject;
        spriteSheetImage.onload = function () {
            var height = spriteSheetImage.height;
            var width = spriteSheetImage.width;
            var spriteSheetCanvas = document.getElementById("spriteSheetCanvas");
            if (spriteSheetCanvas == null) {

                spriteSheetCanvas = document.createElement('canvas');
                document.body.appendChild(spriteSheetCanvas);
            }

            var context = spriteSheetCanvas.getContext("2d");
            spriteSheetCanvas.height = height;
            spriteSheetCanvas.width = width;
            context.drawImage(spriteSheetImage, 0, 0);

            let pixelArray = [];
            let spriteSheetImageData = context.getImageData(0, 0, width, height).data;

            for (let y = 0; y < height; y++) {
                let rowPixels = [];
                for (let x = 0; x < width; x++) {
                    let i = (y * width * 4) + (x * 4);
                    rowPixels.push({
                        r: spriteSheetImageData[i],
                        g: spriteSheetImageData[i + 1],
                        b: spriteSheetImageData[i + 2],
                        a: spriteSheetImageData[i + 3]
                    });
                }
                pixelArray.push(rowPixels);
            }

            spriteSheetCanvas.remove();

            resolve(pixelArray);
        }

        spriteSheetImage.src = imagePath;
    });
}

function GenerateSpriteMap(spriteSheet, palette, x, y, width, height) {
    var spriteMap = [];

    for (let row = 0; row < height; row++) {
        let blankRow = true;
        let rowColors = [];
        for (let col = 0; col < width; col++) {
            let pixel = spriteSheet.pixels[y + row][x + col];

            let paletteColor = palette.findIndex(function (paletteColor) {
                return paletteColor.r == pixel.r && paletteColor.g == pixel.g && paletteColor.b == pixel.b;
            });

            rowColors.push(paletteColor);

            if (pixel.r > 0 || pixel.g > 0 || pixel.b > 0) {
                blankRow = false;
            }
        }
        if (!blankRow) {
            spriteMap.push(rowColors);
        }
    }

    let blankColumns = [];

    for (let col = 0; col < spriteMap[0].length; col++) {
        let blankColumn = true;

        for (let row = 0; row < spriteMap.length; row++) {
            let pixel = spriteMap[row][col];
            if (pixel > 0)
                blankColumn = false;
        }

        if (blankColumn) {
            blankColumns.push(col);
        }
    }

    for (let col of blankColumns.reverse()) {
        spriteMap = removeElement(spriteMap, col);
    }

    // console.log(JSON.stringify(spriteMap));
    return spriteMap;
}

async function Initialize() {
    samusSpriteSheet = await SpriteSheet.Get('samusSpriteSheet.png');

    originalPowerSuitPalette = [{ r: 0, g: 0, b: 0 }];
    originalVariaSuitPalette = [{ r: 0, g: 0, b: 0 }];
    originalGravitySuitPalette = [{ r: 0, g: 0, b: 0 }];

    originalPowerSuitPalette.push(...GetImageFromSpriteSheet(samusSpriteSheet, 378, 1, 15, 1, 8, 8).flat());
    originalVariaSuitPalette.push(...GetImageFromSpriteSheet(samusSpriteSheet, 378, 1 + 8, 15, 1, 8, 8).flat());
    originalGravitySuitPalette.push(...GetImageFromSpriteSheet(samusSpriteSheet, 378, 1 + 8 + 8, 15, 1, 8, 8).flat());

    samusPowerSuitElevatorSpriteMap = GenerateSpriteMap(samusSpriteSheet, originalPowerSuitPalette, 405, 143, 32, 56);
    samusVariaSuitElevatorSpriteMap = GenerateSpriteMap(samusSpriteSheet, originalPowerSuitPalette, 439, 143, 32, 56);

    // let powerSuitPaletteListItem = GenerateNewListItem('Power Suit Palette', validateRomStatusList);
    // let powerSuitPaletteDisplay = GeneratePaletteDisplay(originalPowerSuitPalette, 16, powerSuitPaletteListItem);

    // let variaSuitPaletteListItem = GenerateNewListItem('Varia Suit Palette', validateRomStatusList);
    // let variaSuitPaletteDisplay = GeneratePaletteDisplay(originalVariaSuitPalette, 16, variaSuitPaletteListItem);

    // let gravitySuitPaletteListItem = GenerateNewListItem('Gravity Suit Palette', validateRomStatusList);
    // let gravitySuitPaletteDisplay = GeneratePaletteDisplay(originalGravitySuitPalette, 16, gravitySuitPaletteListItem);

    // let pixelSize = 2;

    // let suitDisplaysListItem = GenerateNewListItem('Suits', validateRomStatusList);

    // let spriteDisplay = GenerateSpriteDisplay(samusPowerSuitElevatorSpriteMap, originalPowerSuitPalette, pixelSize, suitDisplaysListItem);
    // spriteDisplay = GenerateSpriteDisplay(samusVariaSuitElevatorSpriteMap, originalVariaSuitPalette, pixelSize, suitDisplaysListItem);
    // spriteDisplay = GenerateSpriteDisplay(samusVariaSuitElevatorSpriteMap, originalGravitySuitPalette, pixelSize, suitDisplaysListItem);

    createCustomizationToggle("patchControls", "Patch Controls<sup>1</sup>", PatchControls, customizationOptionsDisplayList);
    createCustomizationToggle("patchMoonwalk", "Moonwalk Defaults To On", PatchMoonwalk, customizationOptionsDisplayList);
    createCustomizationToggle("patchEasySpaceJump", "Easier Space Jump Timing", PatchEasySpaceJump, customizationOptionsDisplayList);
    createCustomizationToggle("patchRespin", "Respin<sup>2</sup>", PatchRespin, customizationOptionsDisplayList);
    createCustomizationToggle("patchMSU1", "MSU-1 Patch<sup>3</sup>", PatchMSU1, customizationOptionsDisplayList);
    createCustomizationToggle("randomizeSamusPalettes", "Patch Samus Palettes<sup>4</sup>", RandomizeSamusPalettes, customizationOptionsDisplayList);
    createCustomizationToggle("randomizeBeamPalettes", "Patch Beam Palettes<sup>5</sup>", RandomizeBeamPalettes, customizationOptionsDisplayList);
    createCustomizationToggle("randomizeEnemyPalettes", "Patch Enemy Palettes<sup>6</sup>", RandomizeEnemyPalettes, customizationOptionsDisplayList);
    createCustomizationToggle("randomizeBossPalettes", "Patch Boss Palettes<sup>7</sup>", RandomizeBossPalettes, customizationOptionsDisplayList);
}

function LoadFileBytes(fileName) {
    return new Promise((resolve, reject) => {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", fileName, true);
        oReq.responseType = "arraybuffer";
    
        oReq.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                var arrayBuffer = oReq.response;
                var bytes = Array.from(new Uint8Array(arrayBuffer));
                resolve(bytes);
            } else {
                reject({
                    status: this.status,
                    statusText: oReq.statusText
                });
            }
        };

        oReq.onerror = function () {
            reject({
                status: this.status,
                statusText: oReq.statusText
            });
        };
    
        oReq.send();
    });
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
        label.classList.add('col-sm-3');

        listItem.appendChild(label);
    }

    parent.appendChild(listItem);

    return listItem;
}

function GenerateToggle(name, label, enableAction, disableAction) {
    //     <label class="col-sm-3 col-form-label" for="preset">Patch Controls<sup>1</sup></label>
    //     <div class="col-sm-3 btn-group" role="group">
    //         <input type="radio" class="btn-check my-2" name="patchControls"
    //             id="patchControlsDisabled" value="Disabled" autocomplete="off" checked="">
    //         <label class="btn btn-outline-primary" for="patchControlsDisabled">Disabled</label>

    //         <input type="radio" class="btn-check my-2" name="patchControls"
    //             id="patchControlsEnabled" value="Enabled" autocomplete="off">
    //         <label class="btn btn-outline-primary" for="patchControlsEnabled">Enabled</label>
    //     </div>

    let newToggle = document.createElement('');
    newToggle.height = '10';
    newToggle.width = colorCount * 20;

    if (newToggle.getContext) {
        const paletteDisplayCtx = newToggle.getContext("2d");

        let x = 0;
        let width = 20;

        for (let i = 0; i < 16; i++) {
            let color = palette[i];
            paletteDisplayCtx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
            paletteDisplayCtx.fillRect(x, 0, width, 10);
            x += width;
        }
    }

    parent.appendChild(newToggle);
    return newToggle;
}

function GeneratePaletteDisplay(palette, colorCount, parent) {
    let newCanvas = document.createElement('canvas');
    newCanvas.height = '10';
    newCanvas.width = colorCount * 20;

    if (newCanvas.getContext) {
        const paletteDisplayCtx = newCanvas.getContext("2d");

        let x = 0;
        let width = 20;

        for (let i = 0; i < 16; i++) {
            let color = palette[i];
            paletteDisplayCtx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
            paletteDisplayCtx.fillRect(x, 0, width, 10);
            x += width;
        }
    }

    parent.appendChild(newCanvas);
    return newCanvas;
}

function GenerateSpriteDisplay(spriteMap, palette, pixelSize, parent) {
    let width = spriteMap[0].length;
    let height = spriteMap.length;
    let newCanvas = document.createElement('canvas');
    newCanvas.height = height * pixelSize;
    newCanvas.width = width * pixelSize;
    newCanvas.classList.add('mx-1');

    if (newCanvas.getContext) {
        newCanvas.style['background'] = '#444444';
        const spriteDisplayContext = newCanvas.getContext("2d");

        for (let row = 0; row < spriteMap.length; row++) {
            for (let col = 0; col < spriteMap[row].length; col++) {
                let color = palette[spriteMap[row][col]];
                spriteDisplayContext.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
                spriteDisplayContext.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
            }
        }
    }

    parent.appendChild(newCanvas);
    return newCanvas;
}

LoadPreviousSettings();
SetupListeners();

Initialize();