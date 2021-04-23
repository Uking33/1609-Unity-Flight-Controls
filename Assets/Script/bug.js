var type:int=0;
function bug()
{
	if(type)
	{
		type=0;
		GameObject.Find("bug/Text").GetComponent.<UI.Text>().text = "Whosyourdady";
		SendMessageUpwards("bugGame","big");
		SendMessageUpwards("bugGame","wudi");
	}
	else
	{
		type=1;
		GameObject.Find("bug/Text").GetComponent.<UI.Text>().text = "Close";
		SendMessageUpwards("bugGame","big");
		SendMessageUpwards("bugGame","wudi");
	}
}