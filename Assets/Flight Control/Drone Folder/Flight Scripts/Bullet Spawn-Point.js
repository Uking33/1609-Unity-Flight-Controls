var bullet : Rigidbody; 
var bulletBig : Rigidbody; 
var speed : float = 10.0f;
var muzzlePoint : Transform; 
var big : int=0;
 
function Update() {
    if(Input.GetButtonDown("Fire1")) {
        var instance : Rigidbody;
        if(big)
        {
        	instance = Instantiate(bulletBig, muzzlePoint.position, 
                                               muzzlePoint.rotation);
        	instance.velocity = muzzlePoint.forward * speed*2;
        }
        else
        {
        	instance = Instantiate(bullet, muzzlePoint.position, 
                                               muzzlePoint.rotation);
        	instance.velocity = muzzlePoint.forward * speed;
        }
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