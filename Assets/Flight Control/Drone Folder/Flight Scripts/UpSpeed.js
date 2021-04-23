function Update() {
	if(Input.GetKey(KeyCode.Space))
		SendMessage("speedUp","");
	else
		SendMessage("speedDown","");
}
