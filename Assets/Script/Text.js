function lasttxt(number:int){
	GameObject.Find("Score").GetComponent.<UI.Text>().text = "Last:"+(number);
}