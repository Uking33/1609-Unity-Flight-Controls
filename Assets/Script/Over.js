#pragma strict

private var nowTime : float;  
var isOver : byte  = 0;  

function Update () {
	if(Time.time - nowTime >=(2.0f) && isOver)
	{
		Application.LoadLevel (2);
	}
}

function destroy(str:String){
	if(str=="Destroy")
	{
		isOver = 1;
		nowTime = Time.time;
		GetComponent.<AudioSource>().Play();
	}
}