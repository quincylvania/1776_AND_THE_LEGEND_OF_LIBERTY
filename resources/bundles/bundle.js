{
	// Graphic resources.
	addImage:[
		["GWS","resources/sprites/GW_sprite_sheet.png"],
		["gwShadowImg","resources/sprites/GWshadows.png"],
		["gwwhTDImg","resources/sprites/horseTopDown.png"],
		["gwBigImg","resources/sprites/gwBig.png"],
		["GWSRetro","resources/sprites/GW_sprite_sheetRetro.png"],
		["gwShadowRetroImg","resources/sprites/GWshadowsRetro.png"],
		["gwBigRetroImg","resources/sprites/gwBigRetro.png"],
		["bg","resources/bgs/independence_hall_large.png"],
		["bg2","resources/bgs/independence_hall_philly.png"],
		["bostonBg1","resources/bgs/boston_boats1.png"],
		["bostonBg2","resources/bgs/boston_boats2.png"],
		["bostonBg3","resources/bgs/boston_boats3.png"],
		["bostonBg4","resources/bgs/boston_boats4.png"],
		["phillyTrees","resources/bgs/phpTrees.png"],
		["phillyFg","resources/bgs/fence.png"],
		["sunset","resources/bgs/sunset.png"],
		["blackBg","resources/bgs/tempblack.png"],//needed for bottom of NY
		["officeBg1","resources/bgs/office.png"],
		["wallstImg","resources/bgs/wallst.png"],
		["tmui","resources/bgs/tmui.png"],
		["datesImg","resources/bgs/dates.png"],
		["deskFG","resources/bgs/deskFG.png"],
		["chesapeakeBg","resources/bgs/chesapeakeBg.png"],
		["chesapeakeWater","resources/bgs/chesapeakeBgWater.png"],
		["font","resources/fonts/font.png"],
		["solfont","resources/fonts/solfontbig.png"],
		["fontbig","resources/fonts/fontbig.png"],
		["ending1","resources/ending1.png"],
		["logo","resources/logo.png"],
		["moneyImg","resources/sprites/money.png"],
		["timeMachineImg","resources/sprites/time_machine.png"],
		["1upImg","resources/sprites/1up.png"],//needed for HUD, not displayed
		["redheadImg","resources/sprites/redHead.png"],
		["gw16img","resources/sprites/gwTiny.png"],
		["dotImg","resources/sprites/dot.png"],
		["hamiltonImg","resources/sprites/hamilton.png"],
		["redcoatImg","resources/sprites/redcoat.png"],
		["boatImg","resources/sprites/boat.png"],
		["shadowcoatImg","resources/sprites/redcoatShadow.png"],
		["dockmanImg","resources/sprites/dockman.png"],
		["doorImg","resources/sprites/invisDoor.png"],
		["ballsImg","resources/sprites/cannonballs.png"],
		["mapBg","resources/map.png"]
	],
	addFont:[
		{id:"small",image:"font",firstletter:" ",tileh:8,tilew:8,tilerow:255,gapx:0,gapy:8},
		{id:"whiteOnBlack",image:"font",firstletter:" ",tileh:8,tilew:8,tilerow:255,gapx:0,gapy:0},
		{id:"whiteOnGreen",image:"font",firstletter:" ",tileh:8,tilew:8,tilerow:255,gapx:0,gapy:24},
		{id:"whiteOnBlue",image:"font",firstletter:" ",tileh:8,tilew:8,tilerow:255,gapx:0,gapy:16},
		{id:"smallBlack",image:"font",firstletter:" ",tileh:8,tilew:8,tilerow:255,gapx:0,gapy:56},
		{id:"big",image:"fontbig",firstletter:" ",tileh:16,tilew:8,tilerow:255,gapx:0,gapy:0},
		{id:"green",image:"solfont",firstletter:" ",tileh:16,tilew:8,tilerow:255,gapx:0,gapy:16},
		{id:"silver",image:"solfont",firstletter:" ",tileh:16,tilew:8,tilerow:255,gapx:0,gapy:0},
		{id:"blue",image:"solfont",firstletter:" ",tileh:16,tilew:8,tilerow:255,gapx:0,gapy:48},
		{id:"gold",image:"solfont",firstletter:" ",tileh:16,tilew:8,tilerow:255,gapx:0,gapy:64},
		{id:"red",image:"solfont",firstletter:" ",tileh:16,tilew:8,tilerow:255,gapx:0,gapy:32}
	],
	addTiles:[
		{id:"player",image:"GWS",tileh:96,tilew:64,tilerow:7,gapx:0,gapy:0},
		{id:"playerRetro",image:"GWSRetro",tileh:96,tilew:64,tilerow:7,gapx:0,gapy:0},
		{id:"redcoatTiles",image:"redcoatImg",tileh:96,tilew:64,tilerow:5,gapx:0,gapy:0},
		{id:"wallstTiles",image:"wallstImg",tileh:224,tilew:328,tilerow:6,gapx:0,gapy:0},
		{id:"ballsTiles",image:"ballsImg",tileh:4,tilew:4,tilerow:1,gapx:0,gapy:0},
		{id:"timeMachineTiles",image:"timeMachineImg",tileh:175,tilew:148,tilerow:3,gapx:0,gapy:0},
		{id:"datesTiles",image:"datesImg",tileh:1000,tilew:848,tilerow:1,gapx:0,gapy:0},
		{id:"boatTiles",image:"boatImg",tileh:102,tilew:52,tilerow:17,gapx:0,gapy:0},
		{id:"dockmanTiles",image:"dockmanImg",tileh:96,tilew:64,tilerow:2,gapx:0,gapy:0},
		{id:"doorTiles",image:"doorImg",tileh:96,tilew:64,tilerow:1,gapx:0,gapy:0},
		{id:"shadowcoatTiles",image:"shadowcoatImg",tileh:96,tilew:64,tilerow:5,gapx:0,gapy:0},
		{id:"gwShadowTiles",image:"gwShadowImg",tileh:96,tilew:64,tilerow:7,gapx:0,gapy:0},
		{id:"gwShadowRetroTiles",image:"gwShadowRetroImg",tileh:96,tilew:64,tilerow:7,gapx:0,gapy:0},
		{id:"gwBigTiles",image:"gwBigImg",tileh:192,tilew:128,tilerow:7,gapx:0,gapy:0},
		{id:"gwBigRetroTiles",image:"gwBigRetroImg",tileh:192,tilew:128,tilerow:7,gapx:0,gapy:0},
		{id:"tiles",image:"doorImg",tileh:16,tilew:16,tilerow:8,gapx:0,gapy:0},
		{id:"hamiltonTiles",image:"hamiltonImg",tileh:176,tilew:128,tilerow:14,gapx:0,gapy:0},
		{id:"smalltiles",image:"cels",tileh:8,tilew:8,tilerow:1,gapx:0,gapy:0},
		{id:"tiledfont",image:"font",tileh:8,tilew:8,tilerow:255,gapx:0,gapy:8},
		{id:"moneyTiles",image:"moneyImg",tileh:16,tilew:32,tilerow:8,gapx:0,gapy:0},
		{id:"1up",image:"1upImg",tileh:6,tilew:12,tilerow:1,gapx:0,gapy:0},
		{id:"redheadTiles",image:"redheadImg",tileh:20,tilew:10,tilerow:1,gapx:0,gapy:0},
		{id:"gw16tiles",image:"gw16img",tileh:32,tilew:32,tilerow:3,gapx:0,gapy:0},
		{id:"dotTiles",image:"dotImg",tileh:18,tilew:16,tilerow:4,gapx:0,gapy:0},
	],
	
	// Audio resources	
	addAudio:[
		["colonialSong",[audioserver+"colonial.mp3",audioserver+"colonial.ogg"],{channel:"bgmusic",loop:true}],
		["colonialTimes",[audioserver+"Colonial_Times.mp3",audioserver+"Colonial_Times.ogg"],{channel:"bgmusic",loop:true}],
		["dramatic",[audioserver+"Dramatic.mp3",audioserver+"Dramatic.ogg"],{channel:"bgmusic",loop:true}],
		["folk",[audioserver+"folks.mp3",audioserver+"folks.ogg"],{channel:"bgmusic",loop:true}],
		["ending",[audioserver+"Star_Spangled_Banner.mp3",audioserver+"Star_Spangled_Banner.ogg"],{channel:"bgmusic",loop:false}],
		["default-menu-option",[audioserver+"select.mp3",audioserver+"select.ogg"],{channel:"sfx"}],
		["ding",[audioserver+"start.mp3",audioserver+"start.ogg"],{channel:"sfx"}],
		["beep",[audioserver+"voice_narrator.mp3",audioserver+"voice_narrator.ogg"],{channel:"sfx"}],
		["die",[audioserver+"die.mp3",audioserver+"die.ogg"],{channel:"sfx"}],
		["hit",[audioserver+"hit.mp3",audioserver+"hit.ogg"],{channel:"sfx"}],
		["jump",[audioserver+"jump.mp3",audioserver+"jump.ogg"],{channel:"sfx"}],
		["cannonFire",[audioserver+"cannon.mp3",audioserver+"cannon.ogg"],{channel:"sfx"}],
		["cannonHit",[audioserver+"cannon2.mp3",audioserver+"cannon2.ogg"],{channel:"sfx"}]
	],
	
	// Sub-resource files.
	addBundle:[
		{file:"resources/bundles/bundle-stage1.js"},
		{file:"resources/bundles/bundle-stage2.js"},
		{file:"resources/bundles/bundle-stage3.js"},
		{file:"resources/bundles/bundle-stage4.js"},
		{file:"resources/bundles/bundle-virginia.js"},
		{file:"resources/bundles/bundle-tmui.js"},
		{file:"resources/bundles/bundle-intros.js"}
	]
}