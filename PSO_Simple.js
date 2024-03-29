// ==UserScript==
// @name         PSO command addition
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Catch em' all!(see, it's a pokemon joke, but we're actually catching PSOs)
// @author       Sara597
// @include      /^https:\/\/(www\.)?bondage(?:projects\.elementfx|-europe)\.com\/R\d+\/(BondageClub|\d+)(\/)?(((index|\d+)\.html)?)?$/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=elementfx.com
// @grant        unsafeWindow
// ==/UserScript==

CommandCombine([
    {
        Tag: 'pso',
        Description: ": Turns target into a PSO(color based on hair color).",

        Action: args => {
            setTimeout(function() {
            if (CurrentCharacter == null){
                fbcChatNotify("No target found");
                return;
            }
            PSOTarget(CurrentCharacter);
        }, 5*500);
        }
    }
]);

CommandCombine([
    {
        Tag: 'pso2',
        Description: ": Turns target into a PSO(old petsuit, no LSCG respirator).",

        Action: args => {
            setTimeout(function() {
            if (CurrentCharacter == null){
                fbcChatNotify("No target found");
                return;
            }
            PSOTarget2(CurrentCharacter);
        }, 5*500);
        }
    }
]);

function PSOTarget2(target){
    if(target == null){
        fbcChatNotify("No target found");
        return;
    }

    if(target.MemberNumber == 52711){
        fbcChatNotify("ERROR, MISTRESS JUDITH TARGETED, CHANGING TARGET TO USER.");
        target = Player;
    }

    let color = InventoryGet(target, "HairFront").Color;
    if(Array.isArray(color)){
        color = color[0];
    }
    let ItemGroupList = ["ItemTorso", "ItemTorso2", "ItemVulva", "ItemVulvaPiercings", "ItemEars", "ItemPelvis", "ItemNeck", "ItemNipplesPiercings", "ItemNeckAccessories", "ItemNeckRestraints", "ItemMouth", "ItemMouth2", "ItemMouth3", "ItemArms", "ItemAddon", "ItemHead", "ItemHood"];
    //let ItemList = ["HeavyLatexCorset", "FuturisticHarness", "FuturisticVibrator", "VibeHeartClitPiercing", "FuturisticEarphones", "SciFiPleasurePanties", "BonedNeckCorset", "RoundPiercing", "CollarAutoShockUnit", "CollarChainShort", "LargeDildo", "LatexBallMuzzleGag", "FuturisticMuzzle", "StrictLeatherPetCrawler", "CeilingChain", "InteractiveVRHeadset", "DroneMask"];
    let ItemListColors = ["Default", [color,color,color, "#000000"], [color, "Default", "#000"], "Default", ["#222", color, "Default"], [color, "Default", color, "Default", color, color, "#000000"], "Default", ["#000000", color, color], "Default", color, "Default", "Default", [color, color, color, "#111"], "Default", color, [color, "#000"], ["Default", "Default", "Default", color, "Default"]];
    let ClothesGroupList = ["Cloth", "Suit", "ClothLower", "Bra", "Panties", "Socks", "Shoes", "Gloves", "Mask", "ClothAccessory"];

    for(let I = 0; I < ClothesGroupList.length; I++) {
    InventoryRemove(target, ClothesGroupList[I]);
    }

    InventoryWear(target, "ReverseBunnySuit", "Suit", color);
    InventoryWear(target, "SeamlessCatsuit", "SuitLower", color);
    InventoryWear(target, "FaceVeil", "Mask", ["#202020", color]);

    for(let I = 0; I < AssetGroup.length; I++){
        if(AssetGroup[I].Category === "Item"){
            InventoryRemove(target, AssetGroup[I].Name);
        }
    }

    InventoryWear(target, "InteractiveVRHeadset", "ItemHead", [color, color], 13);
    InventoryWear(target, "StrictLeatherPetCrawler", "ItemArms", "Default");
    InventoryWear(target, "HeavyLatexCorset", "ItemTorso", "Default");
    InventoryWear(target, "FuturisticHarness", "ItemTorso2", [color,color,color, "#000000"]);
    InventoryWear(target, "BonedNeckCorset", "ItemNeck", "Default");
    InventoryWear(target, "RoundPiercing", "ItemNipplesPiercings", ["#000000", color, color]);
    InventoryWear(target, "CollarAutoShockUnit", "ItemNeckAccessories", "Default");
    InventoryWear(target, "CollarChainShort", "ItemNeckRestraints", color);
    InventoryWear(target, "CeilingChain", "ItemAddon", color);
    InventoryWear(target, "LargeDildo", "ItemMouth", "Default");
    InventoryWear(target, "LatexBallMuzzleGag", "ItemMouth2", "Default");
    InventoryWear(target, "FuturisticMuzzle", "ItemMouth3", [""]);
    InventoryWear(target, "SciFiPleasurePanties", "ItemPelvis", [color, "Default", color, "Default", color, color, "#000000"]);
    InventoryWear(target, "FuturisticEarphones", "ItemEars", ["#222", color, "Default"]);
    InventoryWear(target, "DroneMask", "ItemHood", ["Default", "Default", color, "Default", "Default"]);
    InventoryWear(target, "FuturisticVibrator", "ItemVulva", [color, "Default", "#000"]);
    InventoryWear(target, "VibeHeartClitPiercing", "ItemVulvaPiercings", "Default");


    InventoryGet(target, "ItemHead").Property = {"Type":"b3f3g0","Difficulty":0,"CustomBlindBackground":"SciFiCell","Block":[],"Effect":["VR","BlindTotal","VRAvatars","HideRestraints"]};
    InventoryGet(target, "ItemNipplesPiercings").Property = {"Type": "Chain", "Difficulty": 0, "Block": ["ItemNeck"], "AllowActivityOn": ["ItemNeck"]};
    InventoryGet(target, "ItemNeckRestraints").Property = {"OverridePriority": 7};
    InventoryGet(target, "ItemPelvis").Property = {"ShowText": true, "Type": "c3i4o1s0", "Difficulty": 0, "Block": ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], "Effect": ["Chaste", "UseRemote", "Egged", "Vibrating", "DenialMode"], "HideItem": ["ItemButtAnalBeads2", "ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup","ItemVulvaInflatableVibeDildo","ItemVulvaHeavyWeightClamp","ItemVulvaPenisDildo","ItemVulvaShockDildo","ItemVulvaPiercingsVibeHeartClitPiercing","ItemVulvaPiercingsClitRing"], "Intensity": 3};
    InventoryGet(target, "ItemMouth3").Property = {"Type": "n1h1s3", "Difficulty": 2, "Block": ["ItemMouth", "ItemMouth2"], "Effect": ["BlockMouth"],"Hide": ["Mouth"], "HideItem": ["ItemNoseNoseRing"], "AllowActivity": [], "Attribute": []};
    InventoryGet(target, "ItemHood").Property = {"Type": "m0e0p1g0s0h2j0", "Block": ["ItemNose", "ItemMouth", "ItemMouth2", "ItemMouth3", "ItemHead"],"Effect": ["BlockMouth", "BlindLight", "BlindHeavy", "Prone"] ,"Hide": ["Glasses","Blush","HairFront","HairBack","Hat","HairAccessory1","HairAccessory2","HairAccessory3","ItemMouth","ItemMouth2","ItemMouth3","ItemHead"], "HideItem": ["HatFacePaint","MaskFacePaint","ClothAccessoryFacePaint","MaskFuturisticVisor","MaskShinobiMask"]};
    InventoryGet(target, "ItemVulvaPiercings"). Property = {"Mode": "Edge", "Effect": ["Egged", "Vibrating", "Edged"], "Intensity": 0};
    InventoryGet(target, "ItemTorso2").Property = {"OverridePriority": 24};


    for(let I=0; I <= 14; I++){
        InventoryLock(target, ItemGroupList[I], "MistressPadlock", Player.MemberNumber);
    }

    ChatRoomCharacterUpdate(target);
}

function PSOTarget(target){
    if(target == null){
        fbcChatNotify("No target found");
        return;
    }

    if(target.MemberNumber == 52711){
        fbcChatNotify("ERROR, MISTRESS JUDITH TARGETED, CHANGING TARGET TO USER.");
        target = Player;
    }

    let color = InventoryGet(target, "HairFront").Color;
    if(Array.isArray(color)){
        color = color[0];
    }
    let ItemGroupList = ["ItemTorso", "ItemTorso2", "ItemVulva", "ItemVulvaPiercings", "ItemEars", "ItemPelvis", "ItemNeck", "ItemNipplesPiercings", "ItemNeckAccessories" , "ItemMouth", "ItemMouth2", "ItemMouth3", "ItemArms", "ItemAddon", "ItemHead", "ItemHood"];
    //let ItemList = ["HeavyLatexCorset", "FuturisticHarness", "FuturisticVibrator", "VibeHeartClitPiercing", "FuturisticEarphones", "SciFiPleasurePanties", "BonedNeckCorset", "RoundPiercing", "CollarAutoShockUnit", "LargeDildo", "LatexBallMuzzleGag", "FuturisticMuzzle", "StrictLeatherPetCrawler", "CeilingChain", "InteractiveVRHeadset", "DroneMask"];
    let ItemListColors = ["Default", [color,color,color, "#000000"], [color, "Default", "#000"], "Default", ["#222", color, "Default"], [color, "Default", color, "Default", color, color, "#000000"], "Default", ["#000000", color, color], "Default", color, "Default", "Default", [color, color, color, "#111"], "Default", color, [color, "#000"], ["Default", "Default", "Default", color, "Default"]];
    let ClothesGroupList = ["Cloth", "Suit", "ClothLower", "Bra", "Panties", "Socks", "Shoes", "Gloves", "Mask", "ClothAccessory"];

    for(let I = 0; I < ClothesGroupList.length; I++) {
      InventoryRemove(target, ClothesGroupList[I]);
    }

    InventoryWear(target, "ReverseBunnySuit", "Suit", "#111");
    InventoryWear(target, "SeamlessCatsuit", "SuitLower", "#111");
    InventoryWear(target, "FaceVeil", "Mask", ["#202020", color]);

    for(let I = 0; I < AssetGroup.length; I++){
        if(AssetGroup[I].Category === "Item"){
            InventoryRemove(target, AssetGroup[I].Name);
        }
    }

    InventoryWear(target, "InteractiveVRHeadset", "ItemHead", [color, color], 13);
    InventoryWear(target, "ShinyPetSuit", "ItemArms", ["#222", color, color, color, color]);
    InventoryWear(target, "HeavyLatexCorset", "ItemTorso", "#222");
    InventoryWear(target, "FuturisticHarness", "ItemTorso2", ["#222", color, color, color]);
    InventoryWear(target, "BonedNeckCorset", "ItemNeck", ["#222", "#888", color, color, "#888"]);
    InventoryWear(target, "RoundPiercing", "ItemNipplesPiercings", ["#000000", color, color]);
    InventoryWear(target, "CollarAutoShockUnit", "ItemNeckAccessories", "Default");
    InventoryWear(target, "CeilingChain", "ItemAddon", color);
    InventoryWear(target, "LargeDildo", "ItemMouth", "Default");
    InventoryWear(target, "LatexBallMuzzleGag", "ItemMouth2", "Default");
    InventoryWear(target, "FuturisticMuzzle", "ItemMouth3", [""]);
    InventoryWear(target, "SciFiPleasurePanties", "ItemPelvis", ["#222", "Default", color, "Default", color, color, color]);
    InventoryWear(target, "FuturisticEarphones", "ItemEars", ["#222", color, "Default"]);
    InventoryWear(target, "DroneMask", "ItemHood", ["Default", "Default", color, "Default", "Default"]);
    InventoryWear(target, "FuturisticVibrator", "ItemVulva", ["#222", color, color]);
    InventoryWear(target, "VibeHeartClitPiercing", "ItemVulvaPiercings", "Default");


    InventoryGet(target, "ItemHead").Property = {"Type":"b3f3g0","CustomBlindBackground":"SciFiCell","Effect":["VR","BlindTotal","VRAvatars","HideRestraints"]};
    InventoryGet(target, "ItemNipplesPiercings").Property = {"Type": "Chain"};
    InventoryGet(target, "ItemPelvis").Property = {"ShowText": true, "Type": "c3i4o1s0", "Difficulty": 0, "Block": ["ItemVulva", "ItemVulvaPiercings", "ItemButt"], "Effect": ["Chaste", "UseRemote", "Egged", "Vibrating", "DenialMode"], "HideItem": ["ItemButtAnalBeads2", "ItemVulvaVibratingDildo", "ItemVulvaClitSuctionCup","ItemVulvaInflatableVibeDildo","ItemVulvaHeavyWeightClamp","ItemVulvaPenisDildo","ItemVulvaShockDildo","ItemVulvaPiercingsVibeHeartClitPiercing","ItemVulvaPiercingsClitRing"], "Intensity": 3};
    InventoryGet(target, "ItemMouth3").Property = {"Type": "n1h1s3", "Difficulty": 2, "Block": ["ItemMouth", "ItemMouth2"], "Effect": ["BlockMouth"],"Hide": ["Mouth"], "HideItem": ["ItemNoseNoseRing"], "AllowActivity": [], "Attribute": []};
    InventoryGet(target, "ItemHood").Property = { "Block": [ "ItemNose", "ItemMouth", "ItemMouth2", "ItemHead" ], "Effect": [ "BlockMouth", "BlindLight", "BlindHeavy", "Prone" ], "Hide": [ "Blush", "ItemMouth", "ItemMouth2", "ItemMouth3","ItemHead", "Glasses" ], "HideItem": [ "HatFacePaint", "MaskFacePaint", "ClothAccessoryFacePaint" ], "AllowActivity": [], "Attribute": [], "Type": "m0e0p1g0s0h0j0", "Difficulty": 0, "OverridePriority": 12 }
    InventoryGet(target, "ItemVulvaPiercings"). Property = {"Mode": "Edge", "Effect": ["Egged", "Vibrating", "Edged"], "Intensity": 0};
    InventoryGet(target, "ItemTorso2").Property.OverridePriority = 24;
    InventoryGet(target, "ItemArms").Property = {"Block": ["ItemLegs", "ItemFeet", "ItemHands", "ItemHandheld" ], "Hide": [], "Type": null }


    for(let I=0; I <= 14; I++){
        InventoryLock(target, ItemGroupList[I], "MistressPadlock", Player.MemberNumber);
    }

    ChatRoomCharacterUpdate(target);
}
