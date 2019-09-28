var loan={}
	loan.playerDebt=0;
	loan.days=0;
	loan.daysRemaining=2;
	
loan.addDay=function(){
	loan.days+=1;
	}
	
loan.takeOut=function(value, interest, days){
	loan.playerDebt=(value+(value*interest));
	loan.daysRemaining=days;
}
//Repays the loan in part. Cash must be deducted from the widget value in 1776.js. 
loan.payLoan=function(){
	loan.playerDebt-=1260;
}

loan.resetAll=function(){
	loan.playerDebt=0;
	loan.days=0;
	loan.daysRemaining=2;
}