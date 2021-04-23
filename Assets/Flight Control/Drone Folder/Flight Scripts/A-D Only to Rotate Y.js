var speed = 50.0;
var stop=0;
private var nowTime : float;  
function Update () {
 
	if (Input.GetKey(KeyCode.A))
	{
	    transform.Rotate(Vector3.up * speed * Time.deltaTime);
		if(stop)
		{
			if(Time.time - nowTime >=(0.5f))
			{
				stop=0;
				SendMessage("ReADtoGo","");
			}
		}
	}
 
	if (Input.GetKey(KeyCode.D))
    {
    	transform.Rotate(-Vector3.up * speed * Time.deltaTime);
		if(stop)
		{
			if(Time.time - nowTime >=(0.5f))
			{
				stop=0;
				SendMessage("ReADtoGo","");
			}
		}
 	}
}

function ADtoGo(){
	stop=1;
	nowTime = Time.time;
}