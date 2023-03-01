const BUTTONS = {
    ["Select"]: [ 0x00, 0x20 ],
    ["A"]: [ 0x80, 0x00 ],
    ["B"]: [ 0x00, 0x80 ],
    ["X"]: [ 0x40, 0x00 ],
    ["Y"]: [ 0x00, 0x40 ],
    ["L"]: [ 0x20, 0x00 ],
    ["R"]: [ 0x10, 0x00 ],
    ["None"]: [ 0x00, 0x00 ],
};

const CONTROLS = {
    ["Shot"]: [ 0xb331, 0x1722d ],
    ["Jump"]: [ 0xb325, 0x17233 ],
    ["Dash"]: [ 0xb32b, 0x17239 ],
    ["ItemSelect"]: [ 0xb33d, 0x17245 ],
    ["ItemCancel"]: [ 0xb337, 0x1723f ],
    ["AngleUp"]: [ 0xb343, 0x1724b ],
    ["AngleDown"]: [ 0xb349, 0x17251 ]
};

var CustomControls = 
{
    ["Shot"]: "Y",
    ["Jump"]: "B",
    ["Dash"]: "A",
    ["ItemSelect"]: "X",
    ["ItemCancel"]: "Select"
};

const SM_ROM_BEGINNING_BYTES = [ 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xA3, 0x02, 0x85, 0x04, 0xA3, 0x01,
                                 0x85, 0x03, 0x18, 0x69, 0x03, 0x00, 0x83, 0x01, 0xA0, 0x01, 0x00, 0xB7, 0x03, 0x85, 0x00, 0xC8,
                                 0xB7, 0x03, 0x85, 0x01, 0x20, 0x28, 0x80, 0x6B, 0xAF, 0x08, 0x80, 0x80, 0xF0, 0x01, 0x60, 0x08 ];

var powerSuitPaletteOffsets = [ 0x0D9400, 0x0D9820, 0x0D9840, 0x0D9860, 0x0D9880, 0x0D98A0, 0x0D98C0, 0x0D98E0, 0x0D9900, 0x0D9B20, 0x0D9B40, 0x0D9B60, 0x0D9B80, 0x0D9BA0, 0x0D9BC0, 0x0D9BE0, 0x0D9C00, 0x0D9C20, 0x0D9C40, 0x0D9C60, 0x0D9C80, 0x0D9CA0, 0x0D9CC0, 0x0D9CE0, 0x0D9D00, 0x6DB6B, 0x6DBBA, 0x6DC09, 0x6DC58, 0x6DCA4, 0x6E466, 0x6E488, 0x6E4AA, 0x6E4CC, 0x6E4EE, 0x6E510, 0x6E532, 0x6E554, 0x6E576, 0x6E598, 0x6E5BA, 0x6E5DC, 0x6E5FE, 0x6E620, 0x6E642, 0x6E664, 0x6DB8F, 0x6DC2D, 0x6DC7C, 0x6DBDE ];
var variaSuitPaletteOffsets = [ 0x0D9520, 0x0D9920, 0x0D9940, 0x0D9960, 0x0D9980, 0x0D99A0, 0x0D99C0, 0x0D99E0, 0x0D9A00, 0x0D9D20, 0x0D9D40, 0x0D9D60, 0x0D9D80, 0x0D9DA0, 0x0D9DC0, 0x0D9DE0, 0x0D9E00, 0x0D9E20, 0x0D9E40, 0x0D9E60, 0x0D9E80, 0x0D9EA0, 0x0D9EC0, 0x0D9EE0, 0x0D9F00, 0x6DCD1, 0x6DD20, 0x6DD6F, 0x6DDBE, 0x6DE0A, 0x6E692, 0x6E6B4, 0x6E6D6, 0x6E6F8, 0x6E71A, 0x6E73C, 0x6E75E, 0x6E780, 0x6E7A2, 0x6E7C4, 0x6E7E6, 0x6E808, 0x6E82A, 0x6E84C, 0x6E86E, 0x6E890, 0x6DCF5, 0x6DD44, 0x6DD93, 0x6DDE2 ];
var gravitySuitPaletteOffsets = [ 0x0D9540, 0x0D9560, 0x0D9580, 0x0D95A0, 0x0D95C0, 0x0D95E0, 0x0D9600, 0x0D9620, 0x0D9640, 0x0D9660, 0x0D9680, 0x0D96A0, 0x0D9780, 0x0D97A0, 0x0D97C0, 0x0D97E0, 0x0D9800, 0x0D9A20, 0x0D9A40, 0x0D9A60, 0x0D9A80, 0x0D9AA0, 0x0D9AC0, 0x0D9AE0, 0x0D9B00, 0x0D9F20, 0x0D9F40, 0x0D9F60, 0x0D9F80, 0x0D9FA0, 0x0D9FC0, 0x0D9FE0, 0x0DA000, 0x0DA020, 0x0DA040, 0x0DA060, 0x0DA080, 0x0DA0A0, 0x0DA0C0, 0x0DA0E0, 0x0DA100, 0x6DE37, 0x6DE86, 0x6DED5, 0x6DF24, 0x6DF70, 0x6E8BE, 0x6E8E0, 0x6E902, 0x6E924, 0x6E946, 0x6E968, 0x6E98A, 0x6E9AC, 0x6E9CE, 0x6E9F0, 0x6EA12, 0x6EA34, 0x6EA56, 0x6EA78, 0x6EA9A, 0x6EABC, 0x6DE5B, 0x6DEAA, 0x6DEF9, 0x6DF48 ];

var normalEnemyPaletteOffsets = [ 0x110687, 0x110B60, 0x11198D, 0x111E6A, 0x11238B, 0x112FF3, 0x11320C, 0x113264, 0x1132BC, 0x113A7B, 0x113E1C, 0x1140D1, 0x1145FA, 0x114A2B, 0x11580C, 0x11617B, 0x1162C0, 0x116457, 0x11657B, 0x116978, 0x116DC7, 0x118687, 0x1188F0, 0x118C0F, 0x11900A, 0x11965B, 0x11980B, 0x119B7B, 0x119B9B, 0x11A051, 0x11B0A5, 0x11B3A1, 0x11B5B3, 0x11C63E, 0x11C8A6, 0x11DFA2, 0x11E23C, 0x11E57C, 0x11E5B0, 0x11E5D0, 0x130687, 0x140687, 0x141379, 0x14159D, 0x1419AC, 0x141F4F, 0x142AFE, 0x14365E, 0x144143, 0x1446B3, 0x145821, 0x145BC7, 0x146230, 0x14699A, 0x1469BA, 0x1469DA, 0x155911, 0x19878B, 0x1989FD, 0x198AC1, 0x198EDC, 0x190687, 0x1906A7, 0x1906E7, 0x190727, 0x1906C7, 0x190707 ];
var animalPaletteOffsets = [ 0x13E7FE, 0x13F225, 0x19E525, 0x19E944 ];
var sideHopperPaletteOffsets = [ 0x11AA48, 0x11B085 ];
var desgeegaPaletteOffsets = [ 0x11AF85, 0x11B217 ];
var lavaEnemyPaletteOffsets = [ 0x130CFB, 0x131470, 0x142C1C ];
var metroidPaletteOffsets = [ 0x11A725, 0x11E9AF, 0x14F8E6, 0x1494D2 ];
var crateriaSpecialEnemyPaletteOffsets = [ 0x140F8C, 0x1467AC ];
var wreckedShipSpecialEnemyPaletteOffsets = [ 0x146587 ];
var tourianSpecialEnemyPaletteOffsets = [ 0x113A5B, 0x137D87 ];
var shipPaletteOffsets = [ 0x11259E ];

var sporeSpawnPaletteOffsets = [ 0x12E359 ];
var kraidPaletteOffsets = [ 0x138687, 0x13B3F3, 0x13B533, 0x13AAB0, 0x1386C7 ];
var phantoonPaletteOffsets = [ 0x13CA01, 0x13CB41 ];
var botwoonPaletteOffsets = [ 0x199319, 0x19971B ];

var beamPaletteOffsets = [ 0x843E1 ];
var waveBeamTrailPalettes = [ 0xD01AA ];
var superMissilePalettes = [ 0xD01B0 ];
var grappleBeamPalettes = [ 0xDC687 ];

var romBytes = [];
var romFileName = "";

function PatchControls()
{
    for (let controlName in CustomControls)
    {
        let controlAddresses = CONTROLS[controlName];
        var buttonBytes = BUTTONS[CustomControls[controlName]];

        WriteBytes(controlAddresses[0], buttonBytes);
        WriteBytes(controlAddresses[1], buttonBytes);
        console.log(`Control ${controlName} ${controlAddresses} changed to ${buttonBytes}`);
    }
}

function LoadRom(bytes)
{
    romBytes = bytes;
    ValidateRom();
    PatchControls();
    SaveRom();    
}

function SaveRom()
{
    var saveByteArray = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, name) {
            var blob = new Blob([data], {type: "application/octet-stream"}),
            url = window.URL.createObjectURL(blob);
            console.log(`Bytes: ${data}`);
            a.href = url;
            a.download = name;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());

    var success = document.createElement('h1');
    success.appendChild(document.createTextNode(`Writing ${romBytes.length / 1024} bytes to file...`));
    document.body.appendChild(success);

    saveByteArray(romBytes, 'sm rando.smc');
}

function ValidateRom()
{
    for (let i = 0; i < SM_ROM_BEGINNING_BYTES.length; i++) {
        if (romBytes[i] != SM_ROM_BEGINNING_BYTES[i]) {
            var warning = document.createElement('h1');
            warning.appendChild(document.createTextNode('Invalid rom!'));
            document.body.appendChild(warning);
            return;
        }
    }

    var success = document.createElement('h1');
    success.appendChild(document.createTextNode('Valid rom!'));
    document.body.appendChild(success);
}

function WriteBytes(address, bytes)
{
    for (let i = 0; i < bytes.length; i++)
    {
        romBytes[address + i] = bytes[i];
    }
}

var input = document.createElement('input');
input.type = 'file';

input.onchange = e =>
{ 
    // getting a hold of the file reference
    var file = e.target.files[0]; 

    // setting up the reader
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);

    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
        let content = readerEvent.target.result;
        let bytes = new Uint8Array(content);
        LoadRom(bytes);
   }
}

document.body.appendChild(input);

input.click();