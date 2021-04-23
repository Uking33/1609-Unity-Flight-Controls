var stop:int=0;
var back:int=0;
var mul:float=1;

function Update() {
	if(!stop)
	{
		transform.Translate( 3*mul, 0, 0);
	}
    if(Input.GetButtonDown("Fire1")) {
		GetComponent.<AudioSource>().Play();
	}
}
function stopPlane(str:String)
{
	stop=1;
	var tempX:float=transform.position.x;
	var tempY:float=transform.position.y;
	var tempZ:float=transform.position.z;
	switch(str)
	{
		case "X+":
			tempX+=back;
			break;
		case "X-":
			tempX-=back;
			break;
		case "Z+":
			tempZ+=back;
			break;
		case "Z-":
			tempZ-=back;
			break;
		case "Y-":
			break;
	}
	transform.position=Vector3(tempX,tempY,tempZ);
	nowTime=Time.time; 
	SendMessage("ADtoGo","");
	BroadcastMessage("SmokeHide","");
}

function ReADtoGo(){
	stop=0;
	BroadcastMessage("SmokeDisplay","");
}

function speedUp(){
	mul=2;
}
function speedDown(){
	mul=1;
}