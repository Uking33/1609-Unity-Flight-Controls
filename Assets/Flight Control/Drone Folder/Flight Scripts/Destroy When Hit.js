
var explosionPrefab : Transform;
var wudi : int=0;

function OnCollisionEnter(collision : Collision) {
 	var contact = collision.contacts[0];
	var rot = Quaternion.FromToRotation(Vector3.up, contact.normal);
	var pos = contact.point;
		
	if(gameObject.name=="DronePlay")
	{
		if(collision.transform.name=="BianX+")
	 	{
 			//SendMessage("stopPlane","X+");
	 	}
		else if(collision.transform.name=="BianX-")
	 	{
 			//SendMessage("stopPlane","X-");
	 	}
	 	else if(collision.transform.name=="BianY-")
	 	{
 			//SendMessage("stopPlane","Y-");
	 	}
	 	else if(collision.transform.name=="BianZ+")
	 	{
 			//SendMessage("stopPlane","Z+");
	 	}
	 	else if(collision.transform.name=="BianZ-")
	 	{
 			//SendMessage("stopPlane","Z-");
	 	}
		else if(!wudi)
		{
	 		SendMessageUpwards("destroy","Destroy");
			Destroy (gameObject, 0);
			Instantiate(explosionPrefab, pos, rot);
	 	}
	 }
 	else if(collision.transform.name!="BianX+" && collision.transform.name!="BianX-"
 		 && collision.transform.name!="BianZ+" && collision.transform.name!="BianZ-"
 		 && collision.transform.name!="BianY	+")
 	{
		Destroy (gameObject, 0);		
		Instantiate(explosionPrefab, pos, rot);
	}
}

function planeCollision(str:String)
{
	if(str=="wudi")
	{
		if(wudi)
		{
			print("planeCollision Off");
			wudi=0;
		}
		else
		{
			print("planeCollision On");
			wudi=1;
		}
	}
}