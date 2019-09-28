	//Takes parameter of stage name enemyTally to increase stocks in association with visits to an attacked town
	var stocks= {};
		
		stocks.values=[];
		
		stocks.values['Philadelphia']=10;
		stocks.values['Chesapeake']=15;
		stocks.values['Boston']=5;
		
		stocks.names=[];
		
		stocks.names[0]="Philadelphia";
		stocks.names[1]="Boston";
		stocks.names[2]="Chesapeake";
		
		stocks.holdings=[];
		
		stocks.holdings["Philadelphia"]=0;
		stocks.holdings["Chesapeake"]=0;
		stocks.holdings["Boston"]=0;
		
		stocks.dropped=[];
		
		stocks.dropped["Philadelphia"]=false;
		stocks.dropped["Chesapeake"]=false;
		stocks.dropped["Boston"]=false;
				
		stocks.tickers=[];
		
		stocks.tickers["Philadelphia"]="PHP";
		stocks.tickers["Chesapeake"]="CS";
		stocks.tickers["Boston"]="MMS";
		
	//Returns the value of a stock
	stocks.getValue=function(level){
		return stocks.values[level];
	}
	
	stocks.getHoldings=function(level){
		return stocks.holdings[level];
	}
	
	//allows the player to purchase stocks
	stocks.buyStocks=function(level, number){
		stocks.holdings[level]+=number;
		
		
	}
	
	stocks.sellStocks=function(level, number){
		stocks.holdings[level]-=number;
	}
	//Raises the stock of the current level and lowers the stocks of the ones not currently visited.
	stocks.adjustStocks=function(level, enemyTally, reds){
		for(city in stocks.values){
			if(city!==level){
				var i=0;
					if(reds[city]==true){
						stocks.values[city]-=Math.round(Math.random()*8);
						stocks.dropped[city]=true;
						if(stocks.values[city]<2){
							stocks.values[city]=2;
						}
					}
				i++;
			}
			if(city===level){
				stocks.dropped[level]=false;
				var j=0;
					stocks.values[city]+=Math.round(Math.random()*10);
					j++;
				
			}
		}
		
	}
	//decreases the value of play-owned stocks, used in the event of player death.
	stocks.decreaseStocks=function(enemyTally,reds){
		for(city in stocks.values){
			if(stocks.holdings[city]>0){
			stocks.dropped[city]=true;
				var i=0;
				while(i<=enemyTally){
					if(stocks.values[city]-enemyTally>2 && reds[city]==true){
					stocks.values[city]-=enemyTally;
					stocks.dropped[city]=true;
					}if(stocks.values[city]-enemyTally<=2 && reds[city]==true){
					stocks.values[city]=2;
					stocks.dropped[city]=true;
					}
				i++;
				}
			}
		}
	}
	
	stocks.totalStockWorth=function(){
		var temp=0;
		for(stk in stocks.holdings){
			temp+=(stocks.holdings[stk]*stocks.values[stk]);
		}
		return temp;
	}
	
	stocks.resetAll=function(){
		stocks.values['Philadelphia']=10;
		stocks.values['Chesapeake']=15;
		stocks.values['Boston']=5;
		stocks.holdings["Philadelphia"]=0;
		stocks.holdings["Chesapeake"]=0;
		stocks.holdings["Boston"]=0;
		stocks.dropped["Philadelphia"]=false;
		stocks.dropped["Chesapeake"]=false;
		stocks.dropped["Boston"]=false;
	}
