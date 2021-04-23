#pragma strict

function Start () {

}

function Update () {

}

function soldierDestroy(str:String){
	if(str=="Destroy")
	{
		GetComponent.<AudioSource>().Play();
	}
}