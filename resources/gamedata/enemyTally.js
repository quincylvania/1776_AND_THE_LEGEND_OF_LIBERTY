var enemyTally= {};
	
	enemyTally.cities=[];
	
	enemyTally.cities["Philadelphia"]=2;
	enemyTally.cities["Boston"]=2;
	enemyTally.cities["Chesapeake"]=0;
	
	enemyTally.reds=[];
	enemyTally.reds["Philadelphia"]=true;
	enemyTally.reds["Boston"]=true;
	enemyTally.reds["Chesapeake"]=true;
	
	enemyTally.getTally=function(level){
		for(city in enemyTally.cities){
			if(city===level){
				return enemyTally.cities[level];
			}
		}
	}
	enemyTally.increase=function(level){
		for(city in enemyTally.cities){
			if(city===level){
				enemyTally.cities[level]++;
			}	
		}
		if(enemyTally.cities["Chesapeake"]>4){
			enemyTally.cities["Chesapeake"]=4;
		}
	}
	enemyTally.decrease=function(level){
		for(city in enemyTally.cities){
			if(city===level){
				enemyTally.cities[level]--;
			}
		}
	}
	enemyTally.redPresence=function(){
		for(city in enemyTally.reds){
			var rand=Math.round(Math.random()*10);
			if(rand%2==0){
				enemyTally.reds[city]=true;
			}else{
				enemyTally.reds[city]=false;
			}
		}
		if(!enemyTally.reds["Philadelphia"]&&!enemyTally.reds["Boston"]&&!enemyTally.reds["Chesapeake"]){
			for(city in enemyTally.reds)
				enemyTally.reds[city]=true;
		}
	}
	enemyTally.resetAll=function(){
		enemyTally.reds["Philadelphia"]=true;
		enemyTally.reds["Boston"]=true;
		enemyTally.reds["Chesapeake"]=true;
		enemyTally.cities["Philadelphia"]=0;
		enemyTally.cities["Boston"]=0;
		enemyTally.cities["Chesapeake"]=0;
	}