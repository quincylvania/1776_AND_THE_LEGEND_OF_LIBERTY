{
	setObject:[
		{
			object:"dialogues",
			property:"intro",
			value:{
		  		font:"whiteOnBlack",
		  		skipkey:"a",
		  		esckey:"a",
		  		who:{
		  			narrator:{
		  				x:100,
		  				y:200
		  			}
		  		},
		  		scenes:[
		  		{
			  			speed:2,
			  			spacing:4,
			  			push:gbox.getScreenHH(),
			  			scroller:[
			  					"During the 17th and 18th centuries, the",
			  					"british empire encouraged the establishment of",
			  					"13 colonies on the recently re-discovered",
			  					"north american continent.",
			  					"",
			  					"the fruits of this virgin new world",
			  					"were good and plentiful. Among the",
			  					"corn, fish, and lumber, new ideas about",
			  					"economics, society, and government were forming.",
			  					"",
			  					"by the 1770s, colonial population",
			  					"had breached 2,000,000 citizens",
			  					"who no longer felt content living",
			  					"under the law of a far-off government.",
			  					"",
			  					"Pleas for representation and the repeal of",
			  					"intolerable laws fell on deaf british ears.",
			  					"Skirmishes at Lexington and Concord and later",
			  					"the battle of bunker hill pushed American-",
			  					"British relations toward a violent climax.",
			  					"",
			  					"The colonies, determined to form a unified",
			  					"course of action, met at the Second Continental",
			  					"Congress in Philadelphia to determine their fate.",
			  					"Following weeks of debate, the liberty bell rang",
			  					"and independence was declared.",
			  					"",
			  					"It was July the fourth,",
			  					"",
			  					"",
			  					"1776",
			  					"",
			  					"",
			  					"",
			  					"",
			  					"",
			  					"(press z)",
			  				]
			  		},
		  			/*{
		  				slide:{
		  					image:"teaParty",
		  					x:0,
		  					y:0
		  				},
		  				speed:1,
		  				gapy:2,
		  				who:"narrator",
		  				//audio:"beep",
		  				talk:[
		  					"                 A people possessed of the spirit of commerce,",
		  					" ",
		  					"who see, and who will pursue their advantages, may achieve almost anything.",
		  					" ",
		  					" ",
		  					"                                                  -George Washington",
		  					" ",
		  					" ",
		  					" ",
		  					" ",
		  					"                                   (PRESS X)"
		  				]
		  			}*/
		  		]
		  	}
		  },
		  {
		  	object:"dialogues",
		  	property:"ending",
		  	value:{
		  		font:"gold",
		  		skipkey:"a",
		  		esckey:null,
		  		who:{
		  			narrator:{
		  				x:10,
		  				y:150
		  			}
		  		},
		  		scenes:[
		  			
					  {
												slide:{
													image:"ending1",
													x:0,
													y:0
												},
												speed:1,
												who:"narrator",
												talk:[
													"And that's how George Washington saved the economy from collapsing and got his face on the dollar bill.",
												]
											}
					  
		  			/*
					  {
												slide:{
													image:"intro1",
													x:0,
													y:40
												},
												speed:1,
												who:"narrator",
												audio:"beep",
												talk:[
													"But Grandfather, what happened to the time machine?",
												]
											},
											{
												slide:{
													image:"intro1",
													x:0,
													y:40
												},
												speed:2,
												who:"narrator",
												audio:"beep",
												talk:[
													"George Washington took it back to 1776 so he could found the country.",
													"Why else would he be in your newfangled history books?",
												]
											},*/
					  
		  		]
		  	}
		}
	]
}
