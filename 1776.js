// Copyright (c) 2011-2012 Quincy Morgan & Chris Brown
		  
		  var maingame;
		  var dialogues={}; // Loaded by external resources. Must be global.
		  var tilemaps={}; // Loaded by external resources. Must be global.
		  var mapmeta={}; // Loaded by external resources. Must be global.
		  var mapobjects={};
		  var stages={}; // Loaded by external resources. Must be global.
		  var audioserver;
		  var currentstage; // The stage that is currently playing
		  var dialogues={};
		  var isPaused=false;
		  var menuUp=false;
		  var count=0;
		  var helpUp=false;
		  var currentHelpText;
		  var helpCount=0;
		  var lastStage;
		  var redDead;
		  var hasLoan=false;
		  var hasInsurance=false;
		  var daysOfInsurance=0;
		  var talkLine=0;
		  var talkOn=false;
		  var talkCount=0;
		  var talkSesh=0;
		  var hamDialogue = [];
		  var unLocked=[];
		  var cityLocs=[];
		  var scroller;
		  var laststage="Philadelphia";
		  var focredits;
		  var part1won=false;
		  var retroOn=false;
		  var insurancePrice=495;
		  var cash=4000;
		  var worth=0;

		  function go() {
		  				
			gbox.setGroups(["background","bonuses","player","foes","foreground","sparks","gamecycle"]);
			gbox.setAudioChannels({bgmusic:{volume:0.7},sfx:{volume:0.4}});//music temporarily muted
		   	
		   	maingame=gamecycle.createMaingame("gamecycle","gamecycle");
		  	
		  	maingame.initializeGame=function() {
			  	// Build hud
			 	maingame.hud.setWidget("label",{widget:"label",font:"small",value:"1UP",dx:10,dy:10,clear:true});
			 	maingame.hud.setWidget("lives",{widget:"symbols",minvalue:0,value:3,maxshown:3,tileset:"1up",tiles:[0],dx:42,dy:10,gapx:13,gapy:0});
			 	maingame.hud.setWidget("redheads",{widget:"symbols",minvalue:0,value:enemyTally.getTally("Philadelphia"),maxshown:21,tileset:"redheadTiles",tiles:[0],dx:1,dy:450,gapx:12,gapy:0});
				maingame.hud.setWidget("PHPLabel",{widget:"label",font: 'whiteOnGreen', value:"PHP", dx:660,dy:10, clear:true});
				maingame.hud.setWidget("PHP",{widget:"label",font: 'green', value:stocks.getValue("Philadelphia"), dx:660,dy:22, clear:true});
				maingame.hud.setWidget("MMSLabel",{widget:"label",font: 'whiteOnGreen', value:"MMS", dx:690,dy:10, clear:true});
				maingame.hud.setWidget("MMS",{widget:"label",font: 'green', value:stocks.getValue("Boston"), dx:690,dy:22, clear:true});
				maingame.hud.setWidget("CSLabel",{widget:"label",font: 'whiteOnGreen', value:"CS", dx:724,dy:10, clear:true});
				maingame.hud.setWidget("CS",{widget:"label",font: 'green', value:stocks.getValue("Chesapeake"), dx:724,dy:22, clear:true});
				maingame.hud.setWidget("dayLabel",{widget:"label",font: 'small', value:"Day", dx:800,dy:gbox.getScreenH()-8, clear:true});
			 	maingame.hud.setWidget("day",{widget:"label",font: 'small', value:0, dx:830,dy:gbox.getScreenH()-8, clear:true});
			 	maingame.hud.setWidget("insurance",{widget:"label",font: 'whiteOnBlue', value:"insured", dx:768,dy:10, clear:true});
			 	maingame.hud.setWidget("loansdue",{widget:"label",font: 'whiteOnBlue', value:"loans due", dx:770,dy:22, clear:true});
			 	maingame.hud.setWidget("CASHlabel",{widget:"label",font:"small",value:"CASH",dx:0,dy:10,dw:gbox.getScreenW(),halign:gbox.ALIGN_CENTER,clear:true});
			 	maingame.hud.setWidget("cash",{widget:"label",font:"gold",value:cash,dx:0,dy:20,dw:gbox.getScreenW(),halign:gbox.ALIGN_CENTER,prepad:2,padwith:"0",clear:true});
			 	maingame.hud.setWidget("worthlabel",{widget:"label",font:"small",value:"Networth",dx:100,dy:10,clear:true});
			 	maingame.hud.setWidget("worth",{widget:"label",font:"silver",value:worth,dx:100,dy:20,prepad:2,padwith:"0",clear:true});
			 	maingame.hud.setWidget("outofworth",{widget:"label",font:"blue",value:"/15000",dx:154,dy:20,prepad:2,padwith:"0",clear:true});
			 	maingame.hud.setWidget("debtlabel",{widget:"label",font:"small",value:"debt",dx:10,dy:10,clear:true});
			 	maingame.hud.setWidget("debt",{widget:"label",font:"red",value:loan.playerDebt,dx:10,dy:20,prepad:2,padwith:"0",clear:true});
			 	maingame.hud.setWidget("stage",{widget:"label",font:"small",value:"",postpad:7,padwith:" ",dx:0,dy:gbox.getScreenH()-8,clear:true});
			 	
			 	focredits ={
			  		font: "whiteOnGreen",
			  		scenes:[
			  			{
			  			speed:2,
			  			spacing:2,
			  			push:gbox.getScreenHH(),
			  			scroller:[
			  					"1776 and the Legend of Liberty",
			  					"By Quincy Morgan and Chris Brown",
			  					"","",
			  					"",
			  					"-Graphics-",
			  					"Quincy Morgan",
			  					"",
			  					"-Algorithms-",
			  					"Chris Brown",
			  					"",
			  					"-Music-",
			  					"Dramatic",
			  					"By Quincy Morgan",	  				
			  					"",
			  					"Colonial Times",
			  					"By Andrea Brown",	  				
			  					"",
			  					"Colonial Loop",
			  					"By Ben Salus",
			  					"",
			  					"Folk Medley (excerpt)",
			  					"(c)2003 Eric Riegler, Phillip Ayling & Richard Tognetti",
			  					"used under Fair Use",
			  					"",
			  					"-Testing-",
			  					"Jetmir Koboci / Jon Williams",
			  					"and the students of Abington Senior High School",
			  					"",
			  					"-engine-",
			  					"Created using the Akihabara Engine",
			  					"By Kesiev (c)2010",
			  					"www.kesiev.com",
								"","","","","","","",
								"From the ashes rises a phoenix",
								"Thank you for playing!",
								"","","","","","","","","","","","","","","","","",
								"The End?"
			  				]
			  			}
			  		]
			  	}
			  	
			  	hamDialogue[0]=["Washington! What a nice surprise.","I\'m pleased to see you're doing business with us.","Although we primarily exchange stocks, you can also apply for a loan and we now sell insurance.","Have a look around."];
				hamDialogue[1]=["The companies in the market are each based in a different city.","When that city is under attack the stock is bound to drop.","If you free it, however, the price will probably rebound.","Companies in cities still occupied would naturally do worse."];
				hamDialogue[2]=["After you take out a loan you can access the Chesapeake Bay.","You must make your loan payments on time to sail.","In addition, you must be insured."];
				hamDialogue[3]=["Your insurance rate depends on how fine of a sailor you are.","Each time you sink the price of insurance will rise.","If you clear the Chesapeake area your insurance price will drop."];
				hamDialogue[4]=["Yo Washington, what\'s the capital of France?","About $3.79!","Hahaha!"];
				hamDialogue[5]=["What\'s it called when George Washington commits identity theft?","Valley-Forgery!","Hahaha!","Wait, you\'re not Jeffereson..."];
				hamDialogue[6]=[". . ."];
				
				unLocked["Philadelphia"]=true;
				unLocked["Boston"]=true;
				unLocked["Chesapeake"]=true;
				unLocked["New York"]=true;
				unLocked["Time Machine"]=true;
				
				cityLocs["Philadelphia"]={x:346, y:197, text:"Philadelphia",pin:0, side:1};
				cityLocs["Boston"]={x:430, y:140, text:"Boston",pin:2, side:1};
				cityLocs["Chesapeake"]={x:330, y:260, text:"Chesapeake",pin:3, side:1};
				cityLocs["New York"]={x:375, y:160, text:"New York",pin:1, side:1};
		   }
		  
		  // Game intro
		 maingame.gameIntroAnimation=function(reset){
								  if (reset) {
									  toys.resetToy(this,"intro-animation");
									  maingame.hud.hideWidgets(["outofworth","stage","cash","CASHlabel","lives","label","debtlabel","debt","redheads","dayLabel","day","insurance","loansdue","PHP","MMS","CS","PHPLabel","MMSLabel","CSLabel","worth","worthlabel"]);
								  } else {
									  gbox.blitFade(gbox.getBufferContext(),{alpha:1});
									  return toys.dialogue.render(this,"intro-animation",dialogues.intro);
								  }
							  }
		  
		  // Game ending
		  maingame.gameEndingIntroAnimation=function(reset){
		  	return true;
		  	/*
			  if (reset) {
								toys.resetToy(this,"intro-animation");
								//maingame.hud.hideWidgets(["stage","cash","CASHlabel","lives","label","debtlabel","debt","redheads","insurance","loansdue","PHP","MMS","CS","PHPLabel","MMSLabel","CSLabel","worth","worthlabel"]); // Hides the timer and the stage label for the ending
							} else {
								//gbox.blitFade(gbox.getBufferContext(),{alpha:1});
								return toys.dialogue.render(this,"intro-animation",dialogues.ending);
							}*/
			  
		  }
		  // Title intro
		  maingame.gameTitleIntroAnimation=function(reset) {
						  if (reset) {
							  gbox.hitAudio("colonialTimes");
							 toys.resetToy(this,"bouncer");
						  } else {
							  gbox.blitFade(gbox.getBufferContext(),{alpha:1});
							  toys.logos.bounce(this,"bouncer",{image:"logo",x:gbox.getScreenHW()-gbox.getImage("logo").hwidth,y:-gbox.getImage("logo").height,accy:0,/*audiobounce:"hit",*/floory:gbox.getScreenHH()});
						  }
					  },
					  
		  // End level animation
		  maingame.endlevelIntroAnimation=function(reset) {
		  		 if (reset) {
		  			 toys.resetToy(this,"framecounter");
		  			 toys.resetToy(this,"aftercounter");
		  		} else {
					return toys.timer.after(this,"aftercounter",15); // If there isn't more time, quit after 10 frames
		  		}
		  	},
		  //Displays screen at end of game
		  maingame.gameoverIntroAnimation=function(reset) {
			 if (reset) {
 				gbox.stopChannel("bgmusic");
 				toys.resetToy(this,"default-blinker");
 			} else {
 				gbox.blitFade(gbox.getBufferContext(),{alpha:1});
 				return toys.text.fixed(this,"default-blinker",gbox.getBufferContext(),{font:"small",text:"Congratulations! Retro Mode unlocked! Select from the game menu",valign:gbox.ALIGN_MIDDLE,halign:gbox.ALIGN_CENTER,dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),time:100});
 			}
 		}
		
		  maingame.levelIntroAnimation = function() { gbox.blitFade(gbox.getBufferContext(),{alpha:1});return true; };
		  maingame.newlifeIntroAnimation = function() { gbox.blitFade(gbox.getBufferContext(),{alpha:1});return true; };
		
		  //Displays the text during the game intro  
		  maingame.pressStartIntroAnimation=function(reset) {
 			if (reset) {
			  		toys.resetToy(this,"default-blinker");
  			} else {
   			 	toys.text.blink(this,"default-blinker",gbox.getBufferContext(),{font:"small",text:"PRESS Z TO START",valign:gbox.ALIGN_MIDDLE,halign:gbox.ALIGN_CENTER,dx:0,dy:Math.floor(gbox.getScreenH()/3),dw:gbox.getScreenW(),dh:Math.floor(gbox.getScreenH()/3)*2,blinkspeed:10});
    			//blitBottomText("Test");
    			return gbox.keyIsHit("a");
    			}
			};
 			//Displays the help text		
			blitHelpText = function (text, font) {
				if(font==null)
					font='small';
				gbox.blitText(gbox.getBufferContext(), { font: font, text: text, valign: gbox.ALIGN_BOTTOM, halign: gbox.ALIGN_CENTER, dx: 0, dy: 0, dw: gbox.getScreenW(), dh: gbox.getScreenH()});
			}
			updateHUD=function(){
				worth=stocks.totalStockWorth()+cash-loan.playerDebt;//recalculates player worth, must be copied to HUD
				maingame.hud.setValue("debt","value",loan.playerDebt);
				maingame.hud.setValue("worth","value",worth);
				maingame.hud.setValue("cash","value",cash);
				maingame.hud.redraw();
			}
			//Displays the credits when the game ends
			maingame.addFoCredits=function(){
			  	gbox.addObject({
				group:"sparks",
				counter:0,
				initialize:function() {
					toys.resetToy(this,"fakeCreds");
					gbox.hitAudio("ending");
					var row;		
			  	},
				blit:function() {
					this.counter=(this.counter+1);
					if(this.counter==1875){//fps*length of ssb
						maingame.gameIsCompleted();
					}
					toys.dialogue.render(this,"fakeCreds",focredits);
				}
				});
		   }
		  //Tells the engine whether the game has ended or not
		  maingame.gameIsOver=function() {
		  	return maingame.hud.getValue("lives","value")==0;
		  }
		  //Displays the menu at the start of the game
		  maingame.gameMenu = function (reset) {
		  	if(part1won){
				var verticleMiddle = gbox.getScreenH() / 2 + 33, modeSelectMenu;
				modeSelectMenu = {
					x: 100,
					y: verticleMiddle,
					font: 'small',
					selector: '-',
					keys: { up: 'up', down: 'down', ok: 'a', cancel: null },
					items: ["Normal","Retro Mode"],
					menuOptions: {
						normal: 0,
						retro: 1,
					}
				};
				if (reset) {
					toys.resetToy(this, 'levelSelect');
					return false;
				}
				else {
					if (toys.ui.menu(this, 'levelSelect', modeSelectMenu)) {
						if (toys.getToyValue(this, 'levelSelect', 'ok') === -1) {
							return -1;
						}
						else {
							var selected = toys.getToyValue(this, 'levelSelect', 'selected');
							switch (selected) {
								case modeSelectMenu.menuOptions.normal:
									retroOn=false;
									return true;
									break;
								case modeSelectMenu.menuOptions.retro:
									retroOn=true;
									return true;
									break;
								default:
									return true;
							}
						}
					}
					return false;
				}
			}
			else{
					gbox.blitClear(gbox.getBufferContext(), {x:0,y:240});
					gbox.blitText(gbox.getBufferContext(),{dx:100,dy:258,font:'small',text:"-Instructions-"});
					gbox.blitText(gbox.getBufferContext(),{dx:100,dy:276,font:'small',text:"Arrow Keys: move"});
					gbox.blitText(gbox.getBufferContext(),{dx:100,dy:294,font:'small',text:"Z: jump / enter city (worldmap) / fire left cannon (Chesapeake)"});
					gbox.blitText(gbox.getBufferContext(),{dx:100,dy:312,font:'small',text:"X: talk (New York) / fire right cannon (Chesapeake)"});
					gbox.blitText(gbox.getBufferContext(),{dx:100,dy:330,font:'small',text:"C: go to worldmap"});
					gbox.blitText(gbox.getBufferContext(),{dx:100,dy:348,font:'small',text:"Esc: pause"});
					gbox.blitText(gbox.getBufferContext(),{dx:100,dy:366,font:'small',text:"Quit at any time by closing the browser window"});
					gbox.blitText(gbox.getBufferContext(),{dx:100,dy:402,font:'small',text:"(press z to play)"});
					if(gbox.keyIsHit("a")){
						selected=null;
						return true;
					}
			}
		};
		//Displays the stock menu
		blitStockMenu=function(){
					var mainMenu, stockSelectMenu, buysellMenu, infoMenu, infoSubMenu, selected1, selected2, selected3, currentStock;
					mainMenu = {
						x: 100,
						y: 400,
						font: 'big',
						selector: '-',
						keys: { up: 'up', down: 'down', ok: 'a', cancel: null },
						items: ['Stocks Exchange', 'Loans', 'Insurance',"Information","Leave"],
						menuOptions: {
							stocks: 0,
							loans: 1,
							insurance: 2,
							information: 3,
							leave:4,
						}
					};
					stockSelectMenu = {
						x: 100,
						y: 400,
						font: 'big',
						selector: '-',
						keys: { up: 'up', down: 'down', ok: 'a', cancel: null },
						items: ['Philadelphia Post (PHP)  $'+stocks.values["Philadelphia"], 'Mason & Mason Shipbuilders (MMS)  $'+stocks.values["Boston"],"Chesapeake Shipping (CS)  $"+stocks.values["Chesapeake"],"Back"],
						menuOptions: {
							php: 0,
							mms: 1,
							cs: 2,
							cancel:3
						}
					};
					buysellMenu = {
						x: 110,
						y: 417,
						font: 'big',
						selector: '-',
						keys: { up: 'up', down: 'down', ok: 'a', cancel: null },
						items: ["Buy 100 shares","Sell 100 shares","Cancel"],
						menuOptions: {
							buy: 0,
							sell: 1, 
							cancel:2
						}
					};
					loanMenu = {
						x: 100,
						y: 400,
						font: 'big',
						selector: '-',
						keys: { up: 'up', down: 'down', ok: 'a', cancel: null },
						items: ["Take out a mortgage loan","Make a mortgage payment","Back"],
						menuOptions: {
							takeout: 0,
							payback: 1, 
							back:2
						}
					};
					mortgageMenu={
						x: 110,
						y: 417,
						font: 'big',
						selector:'-',
						keys: { up: 'up', down: 'down', ok: 'a', cancel: null },
						items:["Accept ($3000 down payment required)","Decline"],
						menuOptions:{
							agree: 0,
							decline: 1
						}
					};
					paybackMenu={
						x: 110,
						y: 417,
						font: 'big',
						selector:'-',
						keys: { up: 'up', down: 'down', ok: 'a', cancel: null },
						items:["Pay next installment (due in "+(loan.daysRemaining)+" days)","Back"],
						menuOptions:{
							pay: 0,
							back: 1
						}
					};
					insuranceMenu = {
						x: 100,
						y: 400,
						font: 'big',
						selector: '-',
						keys: { up: 'up', down: 'down', ok: 'a', cancel: null },
						items: ["Insure your ship for 5 days for $"+insurancePrice+" (you are insured for "+daysOfInsurance+" days)","Back"],
						menuOptions: {
							insure: 0,
							back:1
						}
					};
					infoMenu={
						x: 110,
						y: 386,
						font: 'big',
						selector:'-',
						keys: { up: 'up', down: 'down', ok: 'a', cancel: null },
						items:['What is a stock?', 'What is a loan?','What is insurance?',"What is net worth?","Back"],
						menuOptions:{
							stock: 0,
							loan: 1,
							insure: 2,
							worth:3,
							back:4
						}
					};
					infoSubMenu={
						x: 110,
						y: 417,
						font: 'big',
						selector:' ',
						keys: { up: 'up', down: 'down', ok: 'a', cancel: 'b' },
						items:[' '],
						menuOptions:{
							thanks: 0,
						}
					};
					if (toys.ui.menu(maingame, 'menuSelect1', mainMenu)) {
						selected1=toys.getToyValue(maingame, 'menuSelect1', 'selected');
						switch(selected1){
							case mainMenu.menuOptions.leave:
								menuUp=false;
								selected1=null;
								selected2=null;
								selected3=null;
								toys.resetToy(maingame, 'meunSelect3');
								toys.resetToy(maingame, 'menuSelect2');
								toys.resetToy(maingame, 'menuSelect1');
								maingame.gotoLevel("1776");
								enemyTally.redPresence();
								
								break;
							case mainMenu.menuOptions.stocks:
								gbox.blitClear(gbox.getBufferContext(), { x: 0, y: 368 });
								if (toys.ui.menu(maingame, 'menuSelect2', stockSelectMenu)) {
									gbox.blitClear(gbox.getBufferContext(), { x: 0, y: 368 });
									selected2=toys.getToyValue(maingame, 'menuSelect2', 'selected');
									if(selected2===3){
										selected1=null;
										selected2=null;
										selected3=null;
										toys.resetToy(maingame, 'meunSelect3');
										toys.resetToy(maingame, 'menuSelect2');
										toys.resetToy(maingame, 'menuSelect1');
										break;
									}
									else if(selected2!==null){
									currentStock=stocks.names[selected2];
									gbox.blitText(gbox.getBufferContext(),{dx: 100,dy: 400,font: 'big',text: stocks.tickers[currentStock]+' $'+stocks.getValue(currentStock)+" per share."+"\n"+"You hold "+stocks.getHoldings(currentStock)+" shares, a $"+(stocks.getHoldings(currentStock)*stocks.getValue(currentStock))+" stake."});
									if (toys.ui.menu(maingame, 'menuSelect3', buysellMenu)) {
										selected3=toys.getToyValue(maingame, 'menuSelect3', 'selected');
										if(selected3!==null){
										if (selected3 === 0) {
											if(maingame.hud.getValue("cash","value")>=stocks.getValue(currentStock)*100){
													stocks.buyStocks(currentStock,100);
													cash-=stocks.getValue(currentStock)*100;
													currentHelpText='Jolly Good! You now own 100 shares of '+stocks.tickers[currentStock]+" worth "+(stocks.getValue(currentStock)*100)+" at $"+stocks.getValue(currentStock)+" per share!";
													helpUp=true;
													updateHUD();
												}else{
													currentHelpText='You do not have enough money to buy these stocks! Earn more!';
													helpUp=true;
												}
												toys.resetToy(maingame, 'meunSelect3');
												toys.resetToy(maingame, 'menuSelect2');
												toys.resetToy(maingame, 'menuSelect1');
												currentStock=null;
												selected3=null;
												selected2=null;
										}
										else if (selected3 === 1) {
											if((stocks.holdings[currentStock]>=100)){
												stocks.sellStocks(currentStock,100);
												cash+=stocks.getValue(currentStock)*100;
												currentHelpText='Splendid! You\'ve sold 100 shares of '+stocks.tickers[currentStock]+" for "+(stocks.getValue(currentStock)*100)+" at $"+stocks.getValue(currentStock)+" per share!";
												helpUp=true;
												updateHUD();
											}else{
												currentHelpText='You do not own any stocks of '+stocks.tickers[currentStock]+' to sell!';
												helpUp=true;
											}
											toys.resetToy(maingame, 'meunSelect3');
											toys.resetToy(maingame, 'menuSelect2');
											toys.resetToy(maingame, 'menuSelect2');
											selected3=null;
										}
										}
										toys.resetToy(maingame, 'menuSelect3');
										toys.resetToy(maingame, 'menuSelect1');
										selected3=null;
										selected2=null;
										currentStock=null;
										toys.resetToy(maingame, 'menuSelect2');
									}
									}
								}
									
							break;
							case mainMenu.menuOptions.loans:
								gbox.blitClear(gbox.getBufferContext(), { x: 0, y: 368 });
								if (toys.ui.menu(maingame, 'menuSelect2', loanMenu)) {
									gbox.blitClear(gbox.getBufferContext(), { x: 0, y: 368 });
									selected2=toys.getToyValue(maingame, 'menuSelect2', 'selected');
									if(selected2===2){
										selected1=null;
										selected2=null;
										selected3=null;
										toys.resetToy(maingame, 'menuSelect3');
										toys.resetToy(maingame, 'menuSelect2');
										toys.resetToy(maingame, 'menuSelect1');
										break;
									}
									else if(selected2===0){
										if(loan.playerDebt==0&&!hasLoan){
											gbox.blitClear(gbox.getBufferContext(), { x: 0, y: 368 });
											gbox.blitText(gbox.getBufferContext(),{dx: 50,dy: 400,font: 'big',text: "Take out $12,000 on a $15,000 ship paid back at 5% simple interest over 20 days."});
											if (toys.ui.menu(maingame, 'menuSelect3', mortgageMenu)) {
												selected3=toys.getToyValue(maingame, 'menuSelect3', 'selected');
												if(selected3==1){
													selected1=null;
													selected2=null;
													selected3=null;
													toys.resetToy(maingame, 'menuSelect3');
													toys.resetToy(maingame, 'menuSelect2');
													toys.resetToy(maingame, 'menuSelect1');
													break;
												}
												if(selected3==0){
													if(cash>=3000){
														currentHelpText="Congratulations! Your first loan payment is due in two days. Be sure to buy insurance!";
														hasLoan=true;
														helpUp=true;
														loan.takeOut(12000,0.05,2);//feeds value, rate, and payment intervals into loan.js
														cash-=3000;
														updateHUD();
													}
													else{
														currentHelpText="You don't have enough money for the down payment!";
														helpUp=true;
													}
													selected1=null;
													selected2=null;
													selected3=null;
													toys.resetToy(maingame, 'menuSelect3');
													toys.resetToy(maingame, 'menuSelect2');
													toys.resetToy(maingame, 'menuSelect1');
													break;
												}
											}
										}
										else{
											currentHelpText="You've already taken out a loan.";
											helpUp=true;
											selected1=null;
											selected2=null;
											selected3=null;
											toys.resetToy(maingame, 'menuSelect3');
											toys.resetToy(maingame, 'menuSelect2');
											toys.resetToy(maingame, 'menuSelect1');
											break;
										}
									}
									else if(selected2===1){
										if(loan.playerDebt>0){
											gbox.blitClear(gbox.getBufferContext(), { x: 0, y: 368 });
											gbox.blitText(gbox.getBufferContext(),{dx: 100,dy: 400,font: 'big',text:"On your next payment you will owe $1260 of your $"+loan.playerDebt+" remaining debt." });
											if (toys.ui.menu(maingame, 'menuSelect3', paybackMenu)) {
												selected3=toys.getToyValue(maingame, 'menuSelect3', 'selected');
												if(selected3==1){
													selected1=null;
													selected2=null;
													selected3=null;
													toys.resetToy(maingame, 'menuSelect3');
													toys.resetToy(maingame, 'menuSelect2');
													toys.resetToy(maingame, 'menuSelect1');
													break;
												}
												else if(selected3==0){
													if(cash>=1260){
														loan.payLoan();//subtracts 1260 from loan.playerDebt
														cash-=1260;
														if(loan.playerDebt<=0){
															loan.resetAll();
															maingame.hud.setValue("worth","value",(maingame.hud.getValue("cash","value")+ stocks.totalStockWorth))
															currentHelpText="Hooray! You've fully paid off your loan!";
														}
														else{
															loan.days=0;
															loan.daysRemaining+=2;
															if(loan.daysRemaining>0)
																maingame.hud.hideWidgets(["loansdue"]);
															currentHelpText="Hip-hip! You've made your loan payment.";
														}
														helpUp=true;
														updateHUD();
														selected1=null;
														selected2=null;
														selected3=null;
														toys.resetToy(maingame, 'menuSelect3');
														toys.resetToy(maingame, 'menuSelect2');
														toys.resetToy(maingame, 'menuSelect1');
														break;
													}
													else{
														if(loan.playerDebt<=0){
															currentHelpText="You've already paid off your loan!"
														}
														currentHelpText="Sorry, you've not enough cash.";
														helpUp=true;
														selected1=null;
														selected2=null;
														selected3=null;
														toys.resetToy(maingame, 'menuSelect3');
														toys.resetToy(maingame, 'menuSelect2');
														toys.resetToy(maingame, 'menuSelect1');
														break;
													}
												}
											}
										}
										else{
											currentHelpText="You have no payments to make!";
											helpUp=true;
											selected1=null;
											selected2=null;
											selected3=null;
											toys.resetToy(maingame, 'menuSelect3');
											toys.resetToy(maingame, 'menuSelect2');
											toys.resetToy(maingame, 'menuSelect1');
											break;
										}
									}
								}
								break;
							case mainMenu.menuOptions.insurance:
								gbox.blitClear(gbox.getBufferContext(), { x: 0, y: 368 });
								if(hasLoan){
									if(toys.ui.menu(maingame,'menuSelect2',insuranceMenu)){
										selected2=toys.getToyValue(maingame, 'menuSelect2','selected');
										if(selected2==1){
											selected1=null;
											selected2=null;
											selected3=null;
											toys.resetToy(maingame, 'menuSelect3');
											toys.resetToy(maingame, 'menuSelect2');
											toys.resetToy(maingame, 'menuSelect1');
										}
										else if(selected2==0){
											if(cash>=insurancePrice){
												hasInsurance=true;
												daysOfInsurance+=5;
												currentHelpText="You now have 5 more days of insurance!";
												cash-=insurancePrice;
												maingame.hud.setValue("insurance","value","insured");
			 									maingame.hud.showWidgets(["insurance"]);
												updateHUD();
												helpUp=true;
											}
											else{
												currentHelpText="You do not have enough cash for insurance!";
												helpUp=true;
											}
											selected1=null;
											selected2=null;
											selected3=null;
											toys.resetToy(maingame, 'menuSelect3');
											toys.resetToy(maingame, 'menuSelect2');
											toys.resetToy(maingame, 'menuSelect1');
										}
									}
								}
								else{
									currentHelpText="You have nothing to insure! Mortgage a ship!";
									helpUp=true;
									selected1=null;
									selected2=null;
									selected3=null;
									toys.resetToy(maingame, 'menuSelect3');
									toys.resetToy(maingame, 'menuSelect2');
									toys.resetToy(maingame, 'menuSelect1');
								}
								break;
							case mainMenu.menuOptions.information:
								gbox.blitClear(gbox.getBufferContext(), { x: 0, y: 368 });
								gbox.blitText(gbox.getBufferContext(),{dx:100,dy:368, font:'big',text:'What would you like to know more about?'});
								if(toys.ui.menu(maingame,'menuSelect2',infoMenu)){
									gbox.blitClear(gbox.getBufferContext(), { x: 0, y: 368 });
									selected2=toys.getToyValue(maingame, 'menuSelect2','selected');
									switch(selected2){
										case 0:
											gbox.blitClear(gbox.getBufferContext(), {x:0,y:368});
											gbox.blitText(gbox.getBufferContext(),{dx:0,dy:368, font:'big',text:'A stock is a share, or portion, of a company. When you hold shares in a company,'});
											gbox.blitText(gbox.getBufferContext(),{dx:0,dy:386, font:'big',text:'you have money invested in it, and as a result, have a say in the direction of the company.'});
											break;
										case 1:
											gbox.blitClear(gbox.getBufferContext(), {x:0,y:368});
											gbox.blitText(gbox.getBufferContext(),{dx:0,dy:368, font:'big',text:'A loan is a sum of money lent at interest. What this means is that, in exchange for a sum of'});
											gbox.blitText(gbox.getBufferContext(),{dx:0,dy:386, font:'big',text:'money given to you immediately, you agree to pay it back with an additional modest fee, usually'});
											gbox.blitText(gbox.getBufferContext(),{dx:0,dy:404, font:'big',text:'a percentage of the loan. If you do not pay this value within the allotted amount of time, the'});
											gbox.blitText(gbox.getBufferContext(),{dx:0,dy:422, font:'big',text:'interest is compounded, and you will owe more money to the lender. Pay on time to avoid that!'});
											break;
										case 2:
											gbox.blitClear(gbox.getBufferContext(), {x:0,y:368});
											gbox.blitText(gbox.getBufferContext(),{dx:0,dy:368, font:'big',text:'Insurance is a practice by which a company provides a guarantee of compensation for specified loss,'});
											gbox.blitText(gbox.getBufferContext(),{dx:0,dy:386, font:'big',text:'damage, illness, or death in return for payment. You pay a reasonable regular fee in exchange for the'});
											gbox.blitText(gbox.getBufferContext(),{dx:0,dy:404, font:'big',text:'guarantee of restitution in the event that something unfortunate happens to whatever you have insured.'});
											break;
										case 3:
											gbox.blitClear(gbox.getBufferContext(), {x:0,y:368});
											gbox.blitText(gbox.getBufferContext(),{dx:0,dy:368, font:'big',text:"Net worth is the combined value of all of a person's assets. It is calculated by totaling their cash "});
											gbox.blitText(gbox.getBufferContext(),{dx:0,dy:386, font:'big',text:"on hand, the cumulative market price of all their stocks, the value of major investments like houses,"});
											gbox.blitText(gbox.getBufferContext(),{dx:0,dy:404, font:'big',text:"and then subtracting their debt. This is how millionaires may still have ceremoniously small incomes."});
											break;
										case 4:
											selected1=null;
											selected2=null;
											selected3=null;
											toys.resetToy(maingame, 'meunSelect3');
											toys.resetToy(maingame, 'menuSelect2');
											toys.resetToy(maingame, 'menuSelect1');
											break;
									}
									if(selected2!==4&&selected2!==null){
										if (toys.ui.menu(maingame, 'menuSelect3', infoSubMenu)) {
											toys.resetToy(maingame, 'menuSelect3');
											toys.resetToy(maingame, 'menuSelect2');
										}
									}
								}
							break;
						}
					}
				selected3=null;
				selected2=null;
				selected1=null;
			}
		   // Change level
		  maingame.changeLevel=function(level) {
		  	maingame.hud.showWidgets(["outofworth","stage","cash","CASHlabel","debtlabel","day","dayLabel","debt","redheads","loansdue","insurance","PHP","MMS","CS","PHPLabel","MMSLabel","CSLabel","worth","worthlabel"]);
		  	if (level==null){//first launch
		  		level="1776";
		  		currentHelpText="Welcome! Garner a net worth of $15,000 to fund the revolution!";
		  		helpUp=true;
		  	}
		  	else{
		  		helpUp=false;
		  		helpCount=0;
		  	}
		  	var lastLevel=currentstage;
			currentstage=level;
		  	if(currentstage!="Time Machine"){
		  		maingame.hud.setValue("stage","value",currentstage); // Level name on the hud!
		  		enemyTally.increase(currentstage);
		  	}
		  	if(currentstage=="1776"&& lastLevel!=="New York"){
		  		maingame.hud.addValue("day","value",1);
		  		if(loan.playerDebt!=0){
			  		loan.addDay();
			  		loan.daysRemaining-=1;
		  		}
		  		if(hasInsurance==true){
		  			daysOfInsurance--;
			  		if(daysOfInsurance<=0)
			  			hasInsurance=false;
			  		else
			  			hasInsurance=true;
		  		}
		  	}
		  	count=0;
			gbox.createCanvas("tileslayer",{w:tilemaps[currentstage].w,h:tilemaps[currentstage].h});
			gbox.blitTilemap(gbox.getCanvasContext("tileslayer"),tilemaps[currentstage]);
			this.newLife();
			}
		  // New life
		  maingame.newLife=function(up) {
		  	// Cleanup the level.
		  	gbox.trashGroup("foes");
		  	gbox.trashGroup("bonuses");
		  	gbox.trashGroup("player");
		  	gbox.trashGroup("sparks");
		  	gbox.trashGroup("background");
		  	gbox.trashGroup("foreground");
		  	gbox.purgeGarbage(); // Since we're starting, we can purge all now

			for(tick in stocks.tickers){
				if(stocks.dropped[tick]){
					maingame.hud.setValue(stocks.tickers[tick],"value",stocks.getValue(tick)+"_");
					maingame.hud.setValue(stocks.tickers[tick],"font","red");
				}
				else{
					maingame.hud.setValue(stocks.tickers[tick],"value",stocks.getValue(tick)+"^");
					maingame.hud.setValue(stocks.tickers[tick],"font","green");
				}
			}
		  	
		  	if(currentstage=="New York"){
		  		gbox.hitAudio("colonialTimes");
		  		unLocked["Boston"]=true;
		  	}
		  	else if(currentstage=="Chesapeake"){
		  		gbox.hitAudio("folk");
		  	}
		  	else if(currentstage=="Boston"){
		  		gbox.hitAudio("folk");
		  		unLocked["Chesapeake"]=true;
		  	}
		  	else if(currentstage=="Philadelphia")
		  		gbox.hitAudio("dramatic");
		  	if(enemyTally.getTally("Philadelphia")>0){
		  		unLocked["New York"]=true;
		  	}
		  	menuUp=false;
		  	talkOn=false;
		  	if(currentstage=="Philadelphia"||currentstage=="Chesapeake"||currentstage=="Boston"){
		  		maingame.hud.showWidgets(["redheads"]);
		  		maingame.hud.setValue("redheads","value",enemyTally.getTally(currentstage))
		  	}
		  	else{
		  		maingame.hud.hideWidgets(["redheads"]);
		  	}

		  	if(currentstage!=="Chesapeake"&&currentstage!=="Time Machine"){
		  		tilemaps[currentstage].tileIsSolidCeil = function(obj, t) { return (obj.group === 'foes' ? false: t >= 0 && t !== null); };
				tilemaps[currentstage].tileIsSolidFloor = function(obj, t) { return t >= 0 && t !== null; };
			}
			else
				tilemaps[currentstage].tileIsSolid = function(obj, t) { return t >= 0 && t !== null; };
				
			if(currentstage!=="1776"){
				laststage=currentstage;
				if(laststage=="Time Machine")
					laststage="Philadelphia"; //catch for exiting time machine, should be modified for different time periods
			}

		  	var current;
		  	for (var i=0;i<mapobjects[currentstage].items.length;i++) {
		  		current=mapobjects[currentstage].items[i];
		  		switch (current.objecttype) {
		  			case "player": {

		  			if(currentstage=="Philadelphia"){
		  				 gbox.addObject({
							  	id:"trees",
							  	group:"background",
							  	blit:function() {
							  		gbox.blit(gbox.getBufferContext(),gbox.getImage("phillyTrees"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0.5,parallaxy:0});
							  	}
							  });
							 gbox.addObject({
							  	id:"bg2",
							  	group:"background",
							  	blit:function() {
							  		gbox.blit(gbox.getBufferContext(),gbox.getImage("bg2"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0,parallaxy:0});
							  	}
							  });
							 gbox.addObject({
							  	id:"bg",
							  	group:"background",
							  	blit:function() {
							  		gbox.centerCamera(gbox.getObject("player","player"),{w:tilemaps[currentstage].w,h:tilemaps[currentstage].h});
							  		gbox.blit(gbox.getBufferContext(),gbox.getImage("bg"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0,parallaxy:0});
							  		gbox.blit(gbox.getBufferContext(),gbox.getCanvas("tileslayer"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true});
							  	}
							  });
							  gbox.addObject({
							  	id:"fence",
							  	group:"foreground",
							  	blit:function() {
							  		gbox.blit(gbox.getBufferContext(),gbox.getImage("phillyFg"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0,parallaxy:0});
							  	}
							  });
							 }
						if(currentstage=="Boston"){
							 	 gbox.addObject({
							  	id:"sunset",
							  	group:"background",
							  	blit:function() {
							  		gbox.centerCamera(gbox.getObject("player","player"),{w:tilemaps[currentstage].w,h:tilemaps[currentstage].h});
							  		gbox.blit(gbox.getBufferContext(),gbox.getImage("sunset"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0,parallaxy:0});
							  		gbox.blit(gbox.getBufferContext(),gbox.getCanvas("tileslayer"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true});
							  	}
							  });
							 	gbox.addObject({
							  	id:"bostonBg",
							  	group:"background",
							  	initialize:function() {
								toys.platformer.initialize(this,{
									frame:1,
									back:false,
									x:0,
									y:0,
									side:0
								});
							},
							first:function() {
									this.counter++;
									if(this.counter==16){
										//if(gbox.getObject("player","player").accy==0&&gbox.getObject("player","player").accx==0){ //for iPad uncomment this and the end bracket
											if(this.frame<4&&this.frame>1&&!this.back){
												this.frame++;
											}
											else if(this.frame<4&&this.frame>1&&this.back){
												this.frame--;
											}
											else if(this.frame==4){
												this.back=true;
												this.frame--;
											}
											else if(this.frame==1){
												this.back=false;
												this.frame++;
											}
										//} //this one here!
										this.counter=0;
									}
							},
							blit:function() {
									gbox.blit(gbox.getBufferContext(),gbox.getImage("bostonBg"+this.frame),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0,parallaxy:0});
									
							}
							  });
							 }
						if(currentstage=="New York"){
							 	gbox.addObject({
							  	id:"blackBg",
							  	group:"background",
							  	blit:function() {
							  		gbox.blit(gbox.getBufferContext(),gbox.getImage("blackBg"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0,parallaxy:0});
							  	}
							  });
							 	gbox.addObject({
							  	id:"officeBg1",
							  	group:"bonuses",
							  	blit:function() {
							  		gbox.centerCamera(gbox.getObject("player","player"),{w:tilemaps[currentstage].w,h:tilemaps[currentstage].h});
							  		gbox.blit(gbox.getBufferContext(),gbox.getImage("officeBg1"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0,parallaxy:0});
							  		gbox.blit(gbox.getBufferContext(),gbox.getCanvas("tileslayer"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true});
							  	}
								});
								maingame.addWallst();
								gbox.addObject({
							  	id:"deskFG",
							  	group:"foreground",
							  	blit:function() {
							  		gbox.blit(gbox.getBufferContext(),gbox.getImage("deskFG"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0,parallaxy:0});
							  	}
							  });
							 }
							 maingame.addGW(current.objecttype,current);
		  				break;
		  			}
		  			case "gwTiny":{
		  				gbox.addObject({
							  	id:"mapBg",
							  	group:"background",
							  	blit:function() {
							  		gbox.centerCamera(gbox.getObject("player","player"),{w:tilemaps[currentstage].w,h:tilemaps[currentstage].h});
							  		gbox.blit(gbox.getBufferContext(),gbox.getImage("mapBg"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0.5,parallaxy:0.5});
							  		gbox.blit(gbox.getBufferContext(),gbox.getCanvas("tileslayer"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true});
							  	}
						});
						maingame.add16GW(current);
						break;
					}
					case "playerBoat":{
						maingame.addPlayerBoat(current);
						gbox.addObject({
							  	id:"chesakpeakeBgWater",
							  	group:"background",
							  	blit:function() {
							  		gbox.blit(gbox.getBufferContext(),gbox.getImage("chesapeakeWater"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0,parallaxy:0});
							  	}
						 });
						gbox.addObject({
							  	id:"chesapeakeBg",
							  	group:"background",
							  	blit:function() {
							  		gbox.centerCamera(gbox.getObject("player","player"),{w:tilemaps[currentstage].w,h:tilemaps[currentstage].h});
							  		gbox.blit(gbox.getBufferContext(),gbox.getImage("chesapeakeBg"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0,parallaxy:0});
							  		gbox.blit(gbox.getBufferContext(),gbox.getCanvas("tileslayer"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true});
							  	}
						});
						break;
					}
					case "dates":{
						maingame.addDates(current);
						gbox.addObject({
							  	id:"tmui",
							  	group:"foreground",
							  	blit:function() {
							  		gbox.centerCamera(gbox.getObject("player","player"),{w:tilemaps[currentstage].w,h:tilemaps[currentstage].h});
							  		gbox.blit(gbox.getBufferContext(),gbox.getImage("tmui"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0,parallaxy:0});
							  		gbox.blit(gbox.getBufferContext(),gbox.getCanvas("tileslayer"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true});
							  	}
						});
						
						break;
					}
					case "dockman":{
						maingame.addDockman(current);
						break;
					}
					case "time machine":{
						maingame.addTimeMachine(current.objecttype, current);
						break;
					}
		  			case "hamCut": {
						maingame.addHam(current.objecttype,current);
		  				break;
		  			}
		  			case "gwwh": {
						maingame.addHorse(current.objecttype,current);
		  				break;
		  			}
		  			case "door": {
						maingame.addDoor(current);
		  				break;
		  			}
		  			default: { 
		  				break;
		  			}
		  		}
		  	}
		  	if(currentstage=="Philadelphia"||currentstage=="Boston"){
		  		for(var i=0;i<(enemyTally.getTally(currentstage));i++){
						maingame.addRedcoat();
				}
		  	}
		  	else if(currentstage=="Chesapeake"){
		  		for(var i=0;i<(enemyTally.getTally(currentstage));i++){
						maingame.addEnemyBoat();
				}
				if(enemyTally.cities["Chesapeake"]==1){
		  			helpUp=true;
		  			currentHelpText="Sink Redcoat Ships! Press 'Z' and 'X' to fire!";
		  		}
		  		else if(enemyTally.cities["Chesapeake"]==2||enemyTally.cities["Chesapeake"]==3){
		  			helpUp=true;
		  			currentHelpText="Be careful! Every time you sink insurance will go up by $100!";
		  		}
		  	}
		  	else if(currentstage=="1776"){
		  		gbox.hitAudio("colonialSong");
		  		for(city in unLocked){
		  			if(unLocked[city]==true&&city!=="Time Machine")
		  				maingame.addCity(cityLocs[city]);
		  		}
		  	}
		   if(worth>=15000){
			  		part1won=true;
			  		loan.resetAll();
			  		stocks.resetAll();
			  		enemyTally.resetAll();
			  		maingame.hud.setValue("worth","value",0);
			  		gbox.stopGroups(['player', 'foes', 'bonuses']);
					gbox.addObject({
						id:"creditsbg",
						group:"foreground",
						blit:function() {
								  gbox.blit(gbox.getBufferContext(),gbox.getImage("ending1"),{dx:0,dy:0,dw:gbox.getScreenW(),dh:gbox.getScreenH(),sourcecamera:true,parallaxx:0,parallaxy:0});
						}
					});
			  		maingame.hud.hideWidgets(["outofworth","stage","cash","CASHlabel","lives","label","debtlabel","debt","redheads","dayLabel","day","insurance","loansdue","PHP","MMS","CS","PHPLabel","MMSLabel","CSLabel","worth","worthlabel"]);
					maingame.addFoCredits();
			  }
			  
			 if(loan.daysRemaining<=0){
			 	maingame.hud.showWidgets(["loansdue"]);
			 }
			 else
			 	maingame.hud.hideWidgets(["loansdue"]);
			 if(!hasLoan){
			 	maingame.hud.hideWidgets(["insurance"]);
			 }
			 else if(hasInsurance){
			 	maingame.hud.setValue("insurance","value","insured");
			 	maingame.hud.showWidgets(["insurance"]);
			 }
			 else{
			 	maingame.hud.setValue("insurance","value","uninsured");
			 	maingame.hud.showWidgets(["insurance"]);
			 }
			 updateHUD();
		  }
		  //Called every frame. Checks for changes in ongoing events
		  maingame.gameEvents=function() {
		  	count++;
		  	if(talkOn){
		  		gbox.blitText(gbox.getBufferContext(), { font: 'small', text: hamDialogue[talkSesh][talkLine], halign: gbox.ALIGN_CENTER, dx: 0, dy: 360, dw: gbox.getScreenW(), dh: gbox.getScreenH()});
		  		if(talkCount==100){
		  			if(talkLine>=hamDialogue[talkSesh].length-1){
		  				talkOn=false;
		  				talkCount=0;
		  				talkLine=0;
		  				talkSesh++;
		  				if(talkSesh>6)
		  					talkSesh=6;
		  			}
		  			else{
		  				talkCount=0;
		  				talkLine++;
		  			}
		  		}
		  		talkCount++;
			 }
		  	if(currentstage!=="New York"&&currentstage!=="1776"&&currentstage!=="Time Machine"&&maingame.hud.getValue("redheads", "value")==0){
		  		currentHelpText="Redcoats defeated! Press 'C' to go back to the map.";
		  		helpUp=true;
		  	}
		  	if(helpUp){
		  		helpCount++;
		  		if(helpCount==76){
		  			helpCount=0;
		  			helpUp=false;
		  		}
		  		gbox.blitText(gbox.getBufferContext(),{valign:gbox.ALIGN_MIDDLE,halign:gbox.ALIGN_CENTER,dx:0,dy:0,font:'big', text:currentHelpText,dw: gbox.getScreenW(), dh: gbox.getScreenH()})
		  	}
			if(menuUp){
				blitStockMenu();
			}
			if(gbox.keyIsHit("esc")&&!part1won){
				if (!isPaused) {
					gbox.stopGroups(['background', 'player', 'foes', 'bonuses','foreground']);
					gbox.blitText(gbox.getBufferContext(), { font: 'small', text: '-paused-',valign: gbox.ALIGN_MIDDLE, halign: gbox.ALIGN_CENTER, dx: 0, dy: 0, dw: gbox.getScreenW(),dh: gbox.getScreenH()});
					gbox.blitText(gbox.getBufferContext(), { font: 'small', text: 'Quit: close browser',valign: gbox.ALIGN_MIDDLE, halign: gbox.ALIGN_CENTER, dx: 0, dy: 10, dw: gbox.getScreenW(),dh: gbox.getScreenH()});
					gbox.blitText(gbox.getBufferContext(), { font: 'small', text: 'continue: press esc',valign: gbox.ALIGN_MIDDLE, halign: gbox.ALIGN_CENTER, dx: 0, dy: 20, dw: gbox.getScreenW(),dh: gbox.getScreenH()});

					isPaused = true;
				}
				else {
					gbox.playAllGroups();
					isPaused = false;
				}
			}
			
			if (gbox.keyIsHit("c")){
					if(currentstage=="Time Machine"){
						var pl = gbox.getObject("player","player");
						if(pl.y>=-630&&pl.y<=-592){//2012
		     		
				     	}
				     	else if(pl.y>=-445&&pl.y<=-360){//1863
				     		
				     	}
				     	else if(pl.y>=-200&&pl.y<=-116){//1815
				     		
				     	}
				     	else if(pl.y>=16&&pl.y<=70){//1776
				     		maingame.gotoLevel("1776");
				     	}
					}
			  		else if (currentstage!=="1776"){
			  			if(maingame.hud.getValue("redheads", "value")==0){
			  				redDead=true;
			  			}
			  			else{
			  				redDead=false;
			  			}
						if(redDead==true && currentstage!=="New York" && enemyTally.getTally(currentstage)!=0){
							stocks.adjustStocks(currentstage, enemyTally.getTally(currentstage), enemyTally.reds);
						}
						if(currentstage !=="New York"){
							lastStage=currentstage;
						}
						if(laststage=="Chesapeake"&&redDead&&insurancePrice>195){
							insurancePrice-=100;
						}
						maingame.gotoLevel("1776");
						helpUp=false;
			  			enemyTally.redPresence();
			  			if(redDead==true && lastStage!=null){
			  				enemyTally.reds[lastStage]=false;
			  			}
			  			else{
			  				enemyTally.reds[lastStage]=true;
			  				enemyTally.decrease(lastStage);
			  			}
			  			maingame.hud.redraw();
			  		}
			}
		  }
			 //Adds a redcoat
			 maingame.addRedcoat=function() {
			 	var tilset;
			 	if(currentstage=="Boston")
			 		tilset="shadowcoatTiles";
			 	else
			 		tilset="redcoatTiles";
			 		
					    gbox.addObject({
							group:"foes",
							tileset:tilset,
							initialize:function() {
								toys.platformer.initialize(this,{
									frames:{
										still:{ speed:1, frames:[2] },
										walking:{ speed:2, frames:[0,1,2,3,4,3,2,1] },
										jumping:{ speed:1, frames:[2] },
										falling:{ speed:1, frames:[2] },
										die: { speed:1,frames:[2] }
									},
									x:(Math.random()*2500)+300,
									y:800,
									jumpaccy:10,
									side:1,
									bostoncount:0
								});
							},
							first:function() {
									this.counter=(this.counter+1);

									toys.platformer.applyGravity(this); // Apply gravity
									toys.platformer.auto.horizontalBounce(this); // Bounces horizontally if hit the sideways walls
									if (this.touchedfloor) // If touching the floor...
										toys.platformer.auto.goomba(this,{moveWhileFalling:true,speed:2}); // goomba movement
									else
										this.accx=0; // Stay still (i.e. jump only vertically)
									toys.platformer.auto.dontFall(this,tilemaps[currentstage],"map"); // prevent from falling from current platform
									if(currentstage=="Boston"&&this.y>=944){
										this.bostoncount++;
										if(this.bostoncount==7){
											gbox.trashObject(this);
											maingame.hud.addValue("redheads","value",-1);
										}
									}
									else{
										toys.platformer.verticalTileCollision(this,tilemaps[currentstage],"map"); // vertical tile collision (i.e. floor)
									}
									toys.platformer.horizontalTileCollision(this,tilemaps[currentstage],"map"); // horizontal tile collision (i.e. walls)
									toys.platformer.handleAccellerations(this); // gravity/attrito
									 // set the right animation frame
									var pl=gbox.getObject("player","player");
									if (pl.collisionEnabled()){
										if (help.isSquished(this,pl)) {
											gbox.hitAudio("hit");
											maingame.hud.addValue("redheads","value",-1);
											if(Math.random()>0.5)
												maingame.addCashDeath("200dollar",{x:this.x,y:this.y+this.h/2,side:1});
											else
												maingame.addCashDeath("100dollar",{x:this.x,y:this.y+this.h/2,side:1})
											gbox.trashObject(this);
											toys.platformer.bounce(pl,{jumpsize:10});
										}
										else{
											if (gbox.collides(this,pl,2))
												pl.kill(this);
										}
									}
									toys.platformer.setFrame(this);
							},
							blit:function() {
								if (gbox.objectIsVisible(this))
									gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y,camera:this.camera,fliph:this.side,flipv:this.flipv});
					  		}
					  });
				}
		  //Spawns cash on enemy death
		  maingame.addCashDeath=function(type,data) {
		  	var amount;
		  	var tiles;
			switch (type) {
				case "100dollar": {
					   amount=100;
					   tiles=[0,1,2,3,2,1,0];
					break;
				}
				case "200dollar": {
					amount=200;
					tiles=[4,5,6,7,6,5,4]
					break;
				}
			}
			 gbox.addObject({
							group:"bonuses",
							tileset:"moneyTiles",
							score:amount,
							initialize:function() {
								toys.platformer.initialize(this,{
									frames:{
										still:{ speed:2, frames:tiles },
										walking:{ speed:2, frames:tiles },
										jumping:{ speed:2, frames:tiles },
										falling:{ speed:2, frames:tiles },
										die: { speed:2,frames:[0] }
									},
									x:data.x,
									y:data.y,
									jumpaccy:10,
									side:0,
									accy:5,
									bostoncount:0
								});
							},
							first:function() {
								if (gbox.objectIsVisible(this)) {
									this.counter=(this.counter+1)%10;
									this.accx=2;
									toys.platformer.applyGravity(this);
									if(currentstage=="Boston"&&this.y>=1000){
										this.bostoncount++;
										if(this.bostoncount==7){
											gbox.trashObject(this);
										}
									}
									else{
										toys.platformer.verticalTileCollision(this,tilemaps[currentstage],"map"); // vertical tile collision (i.e. floor)
									}
									toys.platformer.horizontalTileCollision(this,tilemaps[currentstage],"map"); // horizontal tile collision (i.e. walls)
									if (toys.platformer.canJump(this)) this.accy=-this.jumpaccy;
									toys.platformer.handleAccellerations(this); // gravity/attrito
									toys.platformer.setFrame(this); // set the right animation frame
									var pl=gbox.getObject("player","player");
									if (pl.collisionEnabled())
										if (gbox.collides(this,pl,2)) {
											gbox.hitAudio("ding");
											cash+=this.score;
											updateHUD();
											gbox.trashObject(this);
											//toys.generate.sparks.bounceDie(this,"sparks",null,{jump:6,flipv:true});
											toys.generate.sparks.popupText(this,"sparks",null,{font:"big",jump:6,text:"Ka-Ching!",keep:10});
											toys.generate.sparks.popupText(this,"sparks",null,{font:"big",jump:-1,text:"$"+amount,keep:10});
										} else{}
								}
								
							},
							blit:function() {
								if (gbox.objectIsVisible(this))
									gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y,camera:this.camera,fliph:this.side,flipv:this.flipv});
							}
					  });
		  }
		  //Adds the Dockman to explain basic controls
		  maingame.addDockman=function(data){
		  	gbox.addObject({
		  					id:"dockman",
							group:"bonuses",
							tileset:"dockmanTiles",
							initialize:function() {
								toys.platformer.initialize(this,{
									frames:{
										still:{ speed:1, frames:[1] },
										walking:{ speed:2, frames:[1] },
										jumping:{ speed:1, frames:[0] },
										falling:{ speed:1, frames:[1] },
										die:{speed:1,frames:[1] }
									},
									x:data.x,
									y:data.y,
									jumpaccy:10,
									side:data.side
								});
							},
							first:function() {
								if (gbox.objectIsVisible(this)) {
									// Counter
									this.counter=(this.counter+1);
									toys.platformer.applyGravity(this); // Apply gravity
									toys.platformer.auto.horizontalBounce(this); // Bounces horizontally if hit the sideways walls
									toys.platformer.verticalTileCollision(this,tilemaps[currentstage],"map"); // vertical tile collision (i.e. floor)
									//toys.platformer.horizontalTileCollision(this,tilemaps[currentstage],"map"); // horizontal tile collision (i.e. walls)
									toys.platformer.handleAccellerations(this); // gravity/attrito
									 // set the right animation frame
									 toys.platformer.setFrame(this);	
									var pl=gbox.getObject("player","player");
									if (pl.collisionEnabled() && gbox.collides(this, pl, 0)) {
										if(maingame.hud.getValue("redheads","value")>0){
											this.frame = help.decideFrame(this.counter,this.frames.jumping);
											blitHelpText("Over there! The redcoats are attacking! Press 'z' to jump.","whiteOnBlue");
										}
										else{
											if(maingame.hud.getValue("day","value")==1)
												blitHelpText("Thanks Washington! Press 'c' to go back the world map. Check Out New York!","whiteOnBlue");
											else
												blitHelpText("Thanks again Washigton! Remember: buy low, sell high.","whiteOnBlue");
										}
									}				
								}
							},
							blit:function() {
								if (gbox.objectIsVisible(this))
									gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y,camera:this.camera,fliph:this.side,flipv:this.flipv});
							}
					  });
		  }
		   //Adds the door to independence hall
		   maingame.addDoor=function(data){
		   			var tempText="(arrow to enter)";
		   			if(currentstage=="New York")
		   				tempText="('c' to exit)";
		  			gbox.addObject({
							group:"bonuses",
							tileset:"doorTiles",
							initialize:function() {
								toys.platformer.initialize(this,{
									frames:{
										still:{ speed:1, frames:[0] },
										walking:{ speed:2, frames:[0] },
										jumping:{ speed:1, frames:[0] },
										falling:{ speed:1, frames:[0] },
										die:{speed:1,frames:[0] }
									},
									x:data.x,
									y:data.y,
									side:data.side,
									text:tempText
								});
							},
							first:function() {
								if (gbox.objectIsVisible(this)) {
									this.counter=(this.counter+1);
									toys.platformer.applyGravity(this); // Apply gravity
									toys.platformer.auto.horizontalBounce(this); // Bounces horizontally if hit the sideways walls
									toys.platformer.verticalTileCollision(this,tilemaps[currentstage],"map"); // vertical tile collision (i.e. floor)
									toys.platformer.handleAccellerations(this); // gravity/attrito
									 // set the right animation frame
									 toys.platformer.setFrame(this);	
									var pl=gbox.getObject("player","player");
									if (pl.collisionEnabled() && gbox.collides(this, pl, 5)) {
										blitHelpText(this.text);
										if(currentstage!=="New York"){
											if(gbox.keyIsHit("up")){
													pl.x=1712;
													pl.y=576;
											}
											if(gbox.keyIsHit("down")){
													pl.x=1712;
													pl.y=928;
											}
										}
									}									
								}
							},
							blit:function() {
								if (gbox.objectIsVisible(this))
									gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y,camera:this.camera,fliph:this.side,flipv:this.flipv});
							}
					  });
		  }
		  	 //Adds the time machine in Hamilton's office.
		     maingame.addTimeMachine=function(data){
		     	var tempgroup="bonuses";
		     	var tempTile=1;
		     		if(unLocked["Time Machine"]){
		     			tempgroup="foreground";
		     			tempTile=0;
		     		}
		  			gbox.addObject({
							group:tempgroup,
							tileset:"timeMachineTiles",
							initialize:function() {
								toys.platformer.initialize(this,{
									x:700,
									y:100,
									side:0,
									tile:tempTile
								});
							},
							first:function() {
								if (gbox.objectIsVisible(this)) {
									this.counter=(this.counter+1);
									toys.platformer.applyGravity(this); // Apply gravity
									toys.platformer.verticalTileCollision(this,tilemaps[currentstage],"map"); // vertical tile collision (i.e. floor)
									toys.platformer.handleAccellerations(this); // gravity/attrito
									 // set the right animation frame
									 this.frame = help.decideFrame(this.counter, {speed:1,frames:[this.tile]});									
									 var pl=gbox.getObject("player","player");
									if (help.isSquished(this,pl)) {
										if(this.tile==0)
											maingame.gotoLevel("Time Machine");
									}								
								}
							},
							blit:function() {
								if (gbox.objectIsVisible(this))
									gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y,camera:this.camera,fliph:this.side,flipv:this.flipv});
							}
					  });
		  }
		  //Creates Hamilton
		  maingame.addHam=function(type,data) {
			  	var hamx=data.x;
			  	var hamy=data.y;
			  	var hamsprite=0;
			  	if(Math.round(Math.random()*10)%2==0){
			  		hamx=300
			  		hamy=165
			  		hamsprite=6;
			  	}
					  gbox.addObject({
							group:"bonuses",
							tileset:"hamiltonTiles",
							initialize:function() {
								toys.platformer.initialize(this,{
									frames:{
										jumping:{ speed:1, frames:[0] },
										falling:{ speed:1, frames:[0] },
										die:{speed:1,frames:[0] }
									},
									x:hamx,
									y:hamy,
									side:data.side
								});
							},
							first:function() {
								if (gbox.objectIsVisible(this)) {
									this.counter=(this.counter+1);
									toys.platformer.horizontalTileCollision(this,tilemaps[currentstage],"map"); // horizontal tile collision (i.e. walls)
									toys.platformer.handleAccellerations(this); // gravity/attrito
									this.frame = help.decideFrame(this.counter, {speed:2,frames:[hamsprite]});
									var pl=gbox.getObject("player","player");
									if(pl.y<=64&&pl.x>=375&&pl.x<=620&&hamsprite==6)
										this.frame = help.decideFrame(this.counter, {speed:2,frames:[4]});
									else if(pl.y<=64&&pl.x>=375&&pl.x<=620&&hamsprite==0)
										this.frame = help.decideFrame(this.counter, {speed:2,frames:[5]});
									else if(pl.collisionEnabled() && gbox.collides(this, pl, 20)){
											this.frame = help.decideFrame(this.counter, {speed:3,frames:[0]});
											if(this.counter>=100&&this.counter<=110)
												this.frame = help.decideFrame(this.counter, {speed:2,frames:[0,10,11,10,0]});
									}
									else if(hamsprite==6&&pl.x<this.x&&pl.collisionEnabled() && gbox.collides(this, pl, -57))
											this.frame = help.decideFrame(this.counter, {speed:3,frames:[2]});
									else if(hamsprite==6&&pl.x>=this.x&&pl.collisionEnabled() && gbox.collides(this, pl, -57))
											this.frame = help.decideFrame(this.counter, {speed:3,frames:[3]});
									else if(hamsprite==0&&this.counter>=100&&this.counter<=110)
										this.frame = help.decideFrame(this.counter, {speed:2,frames:[0,10,11,10,0]});
									else if(hamsprite==0&&this.counter>=200&&this.counter<233)
										this.frame = help.decideFrame(this.counter, {speed:3,frames:[0,7,8,9,8,9,8,9,8,7,0]});
									if (pl.collisionEnabled() && gbox.collides(this, pl, -57)&&pl.y>=64&&(pl.x<=375||pl.x>=620)) {
										if(gbox.keyIsHit("b")&&!menuUp){
											pl.jumpaccy=0;
											pl.frames={
													still:{ speed:1, frames:[1] },
													walking:{ speed:1, frames:[1] },
													jumping:{ speed:1, frames:[1] },
													falling:{ speed:1, frames:[1] },
													die:{speed:1,frames:[6] }
											}
											pl.maxaccx=0;
											toys.resetToy(maingame, 'menuSelect');
									  		menuUp=true;
											talkOn=true;
										}
										if(!menuUp)
											blitHelpText("('x' to talk)");
									}
									if(this.counter==120){
										if((Math.round(Math.random())*10)%3==0)
											this.counter=200;
										else
											this.counter=Math.round(Math.random())*2;
									}
									if(this.counter==234)
										this.counter=Math.round(Math.random())*2;			
								}
							},
							blit:function() {
								if (gbox.objectIsVisible(this))
									gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y,camera:this.camera,fliph:this.side,flipv:this.flipv});
							}
					  });
		  }
		  //Adds a city to the world map
		  maingame.addCity=function(data) {
					    gbox.addObject({
					    	id:this.text,
							group:"bonuses",
							tileset:"dotTiles",
							initialize:function() {
								toys.shmup.initialize(this,{
									frames:{
										still:{ speed:1, frames:[data.pin] }
									},
									x:data.x,
									y:data.y,
									side:data.side,
									text:data.text
								});
							},
							first:function() {
									this.counter=(this.counter+1);
									toys.shmup.setFrame(this); // set the right animation frame
									var pl=gbox.getObject("player","player");
									if (gbox.collides(this, pl, 0)) {
										gbox.blitText(gbox.getBufferContext(), { font: 'big', text: this.text, dx: this.x+18, dy: this.y, dw: gbox.getScreenW(), dh: gbox.getScreenH()});
										if(this.text=="Chesapeake"){
											if(hasLoan==false)
												blitHelpText("You have no ship! Mortgage one from Hamilton!");
											else if(loan.daysRemaining<0)
												blitHelpText("You are behind on your loans! You cannot sail!");
											else if(!hasInsurance)
												blitHelpText("You are uninsured! You cannot sail!");
											else{
												if(enemyTally.reds[this.text]==true)
													blitHelpText(this.text+" is under attack! Press 'z' to enter.");
												if(gbox.keyIsHit("a")&&(enemyTally.reds[this.text]==true))
													maingame.gotoLevel(this.text);
												else if((enemyTally.reds[this.text]==false))
													blitHelpText(this.text+" Is not being occupied by the redcoats");
											}
										}		
										else{
										if(enemyTally.reds[this.text]==true)	{
											blitHelpText(this.text+" is under attack! Press 'z' to enter.");
										}				
										if(gbox.keyIsHit("a")&&(this.text==="New York")){
											maingame.gotoLevel(this.text);
										}
										else if(gbox.keyIsHit("a")&&(enemyTally.reds[this.text]==true)){
											maingame.gotoLevel(this.text);
										}
										if((enemyTally.reds[this.text]==false)){
											blitHelpText(this.text+" Is not being occupied by the redcoats");
										}
										}
								}
							},
							blit:function() {
									gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y,camera:this.camera,fliph:false,flipv:this.flipv});
							}
						});
		  }
		   //Adds Hamilton's office
		   maingame.addWallst=function() {
		   		var temp;
			  	if(Math.round(Math.random()*10)%2==0){
			  		temp=[0,1];
			  	}
			  	else
			  		temp=[2,3,4,3];
				 gbox.addObject({
							group:"background",
							tileset:"wallstTiles",
							initialize:function() {
								toys.platformer.initialize(this,{
									frames:temp,
									x:140,
									y:52,
									side:0
								});
							},
							first:function() {
								if (gbox.objectIsVisible(this)) {
									this.counter=(this.counter+1);
									this.frame = help.decideFrame(this.counter, {speed:10,frames:this.frames});
								}
							},
							blit:function() {
								if (gbox.objectIsVisible(this))
									gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y,camera:this.camera,fliph:this.side,flipv:this.flipv});
							}
					});
		  }
		  //Spawns GW
		  maingame.addGW=function(data){
		  	var tilset;
		  	var locs;
		  	if(!retroOn){
			  	if(currentstage!=="New York"){
			  		if(currentstage=="Philadelphia")
			  		{
			  			tilset="player";
			  			locs={x:20,y:830};
			  		}
			  		else{
			  			tilset="gwShadowTiles";
			  			locs={x:20,y:800};
			  		}
			  	}
			  	else{
			  		tilset="gwBigTiles";
			  		locs={x:55,y:90};
			  	}
		  	}
		  	else{
		  		if(currentstage!=="New York"){
			  		if(currentstage=="Philadelphia")
			  		{
			  			tilset="playerRetro";
			  			locs={x:20,y:830};
			  		}
			  		else{
			  			tilset="gwShadowRetroTiles";
			  			locs={x:20,y:800};
			  		}
			  	}
			  	else{
			  		tilset="gwBigRetroTiles";
			  		locs={x:55,y:90};
			  	}
		  	}
		  	gbox.addObject({
		  	id:"player",
		  	group:"player",
		  	tileset:tilset,
		  	multiplier:0,
			initialize:function() {
				toys.platformer.initialize(this,{
					frames:{
						still:{ speed:1, frames:[1] },
						walking:{ speed:3, frames:[2,3] },
						jumping:{ speed:1, frames:[5] },
						falling:{ speed:1, frames:[4] },
						die:{speed:1,frames:[6] }
					},
					jumpaccy:10,
					accy:0,
					maxaccy:20,
					accx:0,
					maxaccx:15,
					x:locs.x,
					y:locs.y,
					side:2,
					bostoncount:0
				});
			},
			collisionEnabled:function() {
				return !maingame.gameIsHold()&&!this.killed;
			},
			kill:function(by){
		  		this.killed=true;
		  		gbox.hitAudio("die");
		  		stocks.decreaseStocks(enemyTally.getTally(currentstage), enemyTally.reds);
		  		toys.generate.sparks.bounceDie(this,"sparks",null,{jump:6,flipv:false});
		  		maingame.playerDied({wait:50});
		  	},
		  	first:function() {
		  		this.counter=(this.counter+1);
		  		toys.platformer.applyGravity(this); // Apply gravity
				toys.platformer.horizontalKeys(this,{left:"left",right:"right"}); // Moves horizontally
				toys.platformer.horizontalTileCollision(this,tilemaps[currentstage],"map"); // horizontal tile collision (i.e. walls)
				if (!this.killed) {
					if(currentstage=="Boston"&&this.y>=944){
						this.bostoncount++;
						if(this.bostoncount==7)
							this.kill();
					}
					else{
						toys.platformer.verticalTileCollision(this,tilemaps[currentstage],"map"); // vertical tile collision (i.e. floor)
					}
					toys.platformer.jumpKeys(this,{jump:"a"});// handle jumping
					toys.platformer.handleAccellerations(this); // gravity/attrito
					toys.platformer.setSide(this); // set horizontal side
					toys.platformer.setFrame(this);
					if(gbox.keyIsHold("down")&&this.jumpaccy==10){
						this.frame=0;
					}
					if(gbox.keyIsHold("a")||gbox.keyIsHold("right")||gbox.keyIsHold("left")||this.accy!==0){
						toys.platformer.setFrame(this);		
					}
				}
		  	},
		  	blit:function() {
		  		if (!this.killed)
		  			gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y,camera:this.camera,fliph:this.side,flipv:this.flipv});
		  	}
		  });
		  }
		  //Adds dates to the time machine
		  maingame.addDates=function(data){
		  	 gbox.addObject({
			    id:      'player',    // id refers to the specific object.
			    group:   'player',       // The rendering group
			    tileset: 'datesTiles', // tileset is where the graphics come from.
			    initialize: function() {
			      toys.topview.initialize(this, {
		      		x:0,
		      		y:80,
		      		maxacc:75,
		      		controlmaxacc:75,
		      		counter:0,
		      		fliph:false
		      	});
    	},
    	collisionEnabled:function() {
				return !maingame.gameIsHold()&&!this.killed;
		},
   		first: function() {
    		this.counter=this.counter+1;
	      		toys.topview.controlKeys(this, { left: null, right: null, up: 'up', down: 'down' });
			
			      // Set the animation.
			      this.frame = help.decideFrame(this.counter, {speed:1,frames:[0]});
	
			      toys.topview.handleAccellerations(this);
			      toys.topview.applyForces(this);
			      toys.topview.tileCollision(this, tilemaps[currentstage], 'map', null);
		     if(this.y<=-630)
		     	this.y=-630;
		     else if(this.y>=70)
		     	this.y=70;
    	},
    	blit: function() {
      		gbox.blitTile(gbox.getBufferContext(), {tileset: this.tileset,tile:    this.frame,dx:      this.x, dy:      this.y,fliph:   this.fliph,flipv:   this.flipv,camera:  this.camera,alpha:   1.0});
    	}
 	 });
		  }
		 //Adds GW to the world map
		 maingame.add16GW=function(data){
		  	 gbox.addObject({
		  	id:"player",
		  	group:"player",
		  	tileset:"gw16tiles",
			initialize:function() {
				toys.shmup.initialize(this,{
					frames:{
						still:{ speed:5, frames:[1,2] }
					},
					x:cityLocs[laststage].x-30,
					y:cityLocs[laststage].y
				});
			},
		  	first:function() {
		  		// Counter
		  			this.counter=(this.counter+1);
					toys.shmup.applyForces(this); // Apply forces
					toys.shmup.controlKeys(this,{left:"left",right:"right",up:"up",down:"down"}); // Moves
					toys.platformer.verticalTileCollision(this,tilemaps[currentstage],"map"); // vertical tile collision (i.e. floor)
					toys.platformer.horizontalTileCollision(this,tilemaps[currentstage],"map"); // horizontal tile collision (i.e. walls)
					toys.shmup.handleAccellerations(this);
					//toys.shmup.keepInBounds(this); // Keep the ship in his bounds
					toys.shmup.setFrame(this); // set the right animation frame
					//if (gbox.keyIsHit("a"))
						//this.fireBullet();
		  	},
		  	blit:function() {
		  			gbox.blitTile(gbox.getBufferContext(),{tileset:this.tileset,tile:this.frame,dx:this.x,dy:this.y,camera:this.camera,fliph:this.fliph,flipv:this.flipv,alpha:0});
		   }
		  });
		  }
		  //Adds the boat to Chesapeake
		  maingame.addPlayerBoat=function(data){
		  	 gbox.addObject({
			    id:      'player',    // id refers to the specific object.
			    group:   'player',       // The rendering group
			    tileset: 'boatTiles', // tileset is where the graphics come from.
			    initialize: function() {
			      toys.topview.initialize(this, {
			      	frame:0,
		      		x:data.x,
		      		y:data.y,
		      		maxacc:10,
		      		controlmaxacc:10,
		      		animIndex:'down',
		      		counter:0,
		      		fliph:false,
		      		rcannon:0,
		      		lcannon:0,
		      		safe:0
		      	});
    	},
    	collisionEnabled:function() {
				return !maingame.gameIsHold()&&!this.killed;
		},
		//Executed when the player dies. Code  inside is the penalty for death.
    	kill:function(by){
		  		this.killed=true;
		  		stocks.decreaseStocks(enemyTally.getTally(currentstage), enemyTally.reds);
		  		maingame.playerDied({wait:5});
		  		if(insurancePrice<2195){//increases price of insurance up to $2195 in the event of death
		  			insurancePrice+=100;
		  		}
		 },
		//Controls the boats' reactions to being hit by cannon fire.
    	hitByBullet:function(by){
    		gbox.hitAudio("cannonHit");
    		if(this.collisionEnabled()){
    			if(this.frame==0){
    				this.frame=14;
    				//return true;
    			}
    			else if(this.frame==14||this.frame==15){
    				this.frame++;
    				//return true;
    			}
    			else{
    		   		this.kill();
    		   		//return false;
    		   }
    		}
    	 	else
    		  	return true;
    		return false;
    	},
   		first: function() {
   			this.safe++;
    		this.counter++;
    		if(!this.killed){
	      		  toys.topview.controlKeys(this, { left: 'left', right: 'right', up: 'up', down: 'down' });
			      toys.topview.handleAccellerations(this);
			      toys.topview.applyForces(this);
			      toys.topview.tileCollision(this, tilemaps[currentstage], 'map', null);
			      if(gbox.keyIsHit("b")){
			      	gbox.hitAudio("cannonFire");
			      	toys.topview.fireBullet("sparks",null,{fullhit:true,collidegroup:"foes",from:this,x:this.x+52,y:this.y+37+(this.rcannon*8),tileset:"ballsTiles",frames:{speed:1,frames:[0]},duration:100,acc:40,fliph:(this.facing==toys.FACE_RIGHT),flipv:(this.facing==toys.FACE_UP),angle:toys.FACES_ANGLE[toys.FACE_RIGHT]});
			      	if(this.rcannon==3){
			      		this.rcannon=0;
			      	}
			      	else
			      		this.rcannon++;
			      }
			      if(gbox.keyIsHit("a")){
			      	gbox.hitAudio("cannonFire");
			      	toys.topview.fireBullet("sparks",null,{fullhit:true,collidegroup:"foes",from:this,x:this.x,y:this.y+37+(this.lcannon*8),tileset:"ballsTiles",frames:{speed:1,frames:[0]},duration:100,acc:40,fliph:(this.facing==toys.FACE_LEFT),flipv:(this.facing==toys.FACE_UP),angle:toys.FACES_ANGLE[toys.FACE_LEFT]});
			      	if(this.lcannon==3){
			      		this.lcannon=0;
			      	}
			      	else
			      		this.lcannon++;
			      }
			      if(this.y<=0)
			      	this.y=0;
			      else if(this.y>650)
			      	this.y=650;
			      if(this.x>800)
			      	this.x=800;
		     }
    	},
    	blit: function() {
    		if(!this.killed)
      		gbox.blitTile(gbox.getBufferContext(), {tileset: this.tileset,tile:    this.frame,dx:      this.x, dy:      this.y,fliph:   this.fliph,flipv:   this.flipv,camera:  this.camera,alpha:   1.0});
    	}
 	 });
 	 }
 	 //Adds an enemy boat
 	 maingame.addEnemyBoat=function(){
		  	 gbox.addObject({
			    group:   'foes',       // The rendering group
			    tileset: 'boatTiles', // tileset is where the graphics come from.
			    initialize: function() {
			      toys.topview.initialize(this,{
		      		x:(Math.random()*500)+200,
		      		y:(Math.random()*500),
		      		maxacc:10,
		      		controlmaxacc:10,
		      		counter:0,
		      		fliph:false,
		      		rcannon:0,
		      		lcannon:0,
		      		life:2,
		      		killed:false
		      	});
    	},
    	hitByBullet:function(by) {
    			gbox.hitAudio("cannonHit");
    			if(this.life==5)
    			{
					maingame.hud.addValue("redheads","value",-1);
					this.killed=true;
				}
				else if(this.life<5)
					this.life=this.life+1;
				return false;
		},
   		first: function() {
    		this.counter=this.counter+1;
			if(this.killed&&this.counter%4==0){
				if(this.life<13)
					this.life=this.life+1;
				else{
					cash+=1000;
					updateHUD();
					gbox.hitAudio("ding");
					gbox.trashObject(this);
				}
			}
		      // Set the animation.
		     this.frame = help.decideFrame(this.counter, {speed:2,frames:[this.life]});
			if(!this.killed){
		      toys.topview.handleAccellerations(this);
		      toys.topview.applyForces(this);
		      toys.topview.tileCollision(this, tilemaps[currentstage], 'map', null);
		      if(Math.round((Math.random()*1000))%20==0){
		      	toys.topview.fireBullet("sparks",null,{fullhit:true,collidegroup:"player",from:this,x:this.x+52,y:this.y+37+(this.rcannon*8),tileset:"ballsTiles",frames:{speed:1,frames:[0]},duration:100,acc:40,fliph:(this.facing==toys.FACE_RIGHT),flipv:(this.facing==toys.FACE_UP),angle:toys.FACES_ANGLE[toys.FACE_RIGHT]});
		      	if(this.rcannon==3){
		      		this.rcannon=0;
		      	}
		      	else
		      		this.rcannon++;
		      }
		      if(Math.round((Math.random()*1000))%20==0){
		      	toys.topview.fireBullet("sparks",null,{fullhit:true,collidegroup:"player",from:this,x:this.x,y:this.y+37+(this.lcannon*8),tileset:"ballsTiles",frames:{speed:1,frames:[0]},duration:100,acc:40,fliph:(this.facing==toys.FACE_LEFT),flipv:(this.facing==toys.FACE_UP),angle:toys.FACES_ANGLE[toys.FACE_LEFT]});
		      	if(this.lcannon==3){
		      		this.lcannon=0;
		      	}
		      	else
		      		this.lcannon++;
		      }
      		 }
      		var pl=gbox.getObject("player","player");
			if (gbox.collides(this,pl,5)){
				if((Math.abs(pl.accy)>=5||Math.abs(pl.accx)>=5)&&pl.safe>=10){
					pl.safe=0;
					pl.hitByBullet(this);
					if(this.x<pl.x)
						pl.accx=6;
					else
						pl.accx=-6;
					if(this.y<pl.y)
						pl.accy=6;
					else
						pl.accy=-6;
				}
				else{
					pl.accx=0;
					pl.accy=0;
				}
			}
    	},
    	blit: function() {
      		gbox.blitTile(gbox.getBufferContext(), {tileset: this.tileset,tile:    this.frame,dx:      this.x, dy:      this.y,fliph:   this.fliph,flipv:   this.flipv,camera:  this.camera,alpha:   1.0});
    	}
 	 });
 	 }
		  gbox.go();
	}
	// BOOTSTRAP
	gbox.onLoad(function () {
		help.akihabaraInit({
		    title: "1776",
		    width: 848,
		    height: 480,
		    zoom: 1
		});
		audioserver="resources/audio/"
		gbox.addBundle({file:"resources/bundles/bundle.js"});
		gbox.loadAll(go);
	}, false);