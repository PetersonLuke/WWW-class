
var today = new Date(); //variable for the date
/*list of Time changes
4-6 is "early Morning
7-10 is morning
12 is lunch time
13-18 is afternoon
18 is supper time
19-23 is evning
The rest are night time
*/
//today.setHours(3);  //used for testing this code
        
document.getElementById("date").innerHTML = 
"Day: " + today.getDate() + 
" Month: " + (today.getMonth() + 1) + //needs the plus one as jan = 0
" Year: " + (today.getYear() + 1900); //need to add the 1900 our the year amount is off
        
//return the hour
        
document.getElementById("Hour").innerHTML = today.getHours();
var hourOfToday = today.getHours();
        

var t_OD;

//4-6 early morning
if (hourOfToday >= 4 && hourOfToday < 7) 
{
    t_OD = "Early Morning: Zuzu wants to eat!";
    document.getElementById("textBackground").className = "morningFoodTB";
    document.getElementById("backgroundTime").className = "morningFoodBackground";
    document.getElementById("timeOfDay").className = "morningFood";
} 

else 

//7-12 morning
if (hourOfToday >= 7 && hourOfToday < 12) 
{
    t_OD = "Morning: It is now nap time.  He would be happy to have some food.";
    document.getElementById("textBackground").className = "firstNapTB";
    document.getElementById("backgroundTime").className = "firstNapBackground";
    document.getElementById("timeOfDay").className = "firstNap";
    
} 

else 

//12 lunch time
if(hourOfToday == 12) 
{
    t_OD = "Lunch Time!  Zuzu Wants your food.";
    document.getElementById("textBackground").className = "lunchTB";
    document.getElementById("backgroundTime").className = "lunchBackground";
    document.getElementById("timeOfDay").className = "lunch";        
} 

else 

//12-18 afternoon
if (hourOfToday >= 13 && hourOfToday < 18) 
{
    t_OD = "Afternoon:  Time for second nap.  (Zuzu probable wants to eat.)";
    document.getElementById("textBackground").className = "secondNapTB";
    document.getElementById("backgroundTime").className = "secondNapBackground";
    document.getElementById("timeOfDay").className = "secondNap";        
      
    
} 

else 

//18 supper time
if (hourOfToday == 18) 
{
    t_OD = "Supper time for Zuzu! (finaly).  He proabably wants your food also.";
    document.getElementById("textBackground").className = "supperTB";
    document.getElementById("backgroundTime").className = "supperBackground";
    document.getElementById("timeOfDay").className = "supper";        
        
}

else 

//19-23 is evening
if (hourOfToday >= 19 && hourOfToday < 23) 
{
    t_OD = "Evening: Zuzu Goes crazy.  He also probably wants some food.";
    document.getElementById("textBackground").className = "crazyTB";
    document.getElementById("backgroundTime").className = "crazyBackground";
    document.getElementById("timeOfDay").className = "crazy";        
        
} else {
    //the rest of the time           
    t_OD = "Night time: Zuzu gets lonely and wants you to pet him.  He also may want some food.";
    document.getElementById("textBackground").className = "lonelyTB";
    document.getElementById("backgroundTime").className = "lonelyBackground";
    document.getElementById("timeOfDay").className = "lonely";
}
        
document.getElementById("timeOfDay").innerHTML = t_OD;
