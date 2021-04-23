private var nowTime : float;  
var isOver : byte  = 0;  
var n : byte = 0;

function Update () {
	if(Time.time - nowTime >=(2.0f) && isOver)
	{
		Application.LoadLevel (3);
	}
}

function win(str:String){
	if(str=="Destroy")
	{
		n++;
 		BroadcastMessage("lasttxt",8-n);
		if(n>=8)
		{
			isOver = 1;
			nowTime = Time.time;
		}
	}
}

function bugGame(str:String)
{
	if(str=="big")		
 		BroadcastMessage("roacket","big");
	if(str=="wudi")		
 		BroadcastMessage("planeCollision","wudi");
}