
var explosionPrefab : Transform;
static public var hit : byte = 0;
var big : int=0;

function OnCollisionEnter(collision : Collision) {
	if(gameObject.name == "orc_Soldier")
	{
		if(collision.gameObject.name=="BianX+")
	 	{
 			SendMessage("stopSoldier","X+");
	 	}
		else if(collision.gameObject.name=="BianX-")
	 	{
 			SendMessage("stopSoldier","X-");
	 	}
	 	else if(collision.gameObject.name=="BianY-")
	 	{
 			SendMessage("stopSoldier","Y-");
	 	}
	 	else if(collision.gameObject.name=="BianZ+")
	 	{
 			SendMessage("stopSoldier","Z+");
	 	}
	 	else if(collision.gameObject.name=="BianZ-")
	 	{
 			SendMessage("stopSoldier","Z-");
	 	}
		else if(collision.transform.name == "rocket(Clone)" ||collision.transform.name == "rocketbig(Clone)")
		
		{
			hit++;
		    var contact = collision.contacts[0];
		    var rot = Quaternion.FromToRotation(Vector3.up, contact.normal);
		    var pos = contact.point;
		    Instantiate(explosionPrefab, pos, rot);
		    if(big)
			{
				hit=0;
	 			SendMessageUpwards("win","Destroy");
			    Destroy (gameObject, 0);
			}
			else if(hit>=3)
			{
				hit=0;
	 			SendMessageUpwards("win","Destroy");
	 			SendMessageUpwards("soldierDestroy");
			    Destroy (gameObject, 0);
			}
		}
		/*else if(collision.gameObject.name != "Terrain")
		{
			var tempX:float=transform.position.x;
			var tempY:float=transform.position.z;
			var tempZ:float=transform.position.z;
			transform.position=Vector3(tempX,tempY,tempZ);
 			SendMessage("stopSoldier","");
		}*/
	}
	
}

function roacket(str:String){	
	if(str=="big")
	{
		if(big)
		{
			print("RoacketBig Off");
			big=0;
		}
		else
		{
			print("RoacketBig On");
			big=1;
		}
	}
}