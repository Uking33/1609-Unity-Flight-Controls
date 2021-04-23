var updateInterval = 0.5;
 
private var accum = 0.0; // Fps accumulated over the interval
private var frames = 0; // Frames drawn over the interval
private var timeleft : float; // Left time for current interval
 
function Start()
{
	timeleft = updateInterval;
}
 
function Update()
{
	timeleft -= Time.deltaTime;
	accum += Time.timeScale/Time.deltaTime;
	++frames;
	 
	if( timeleft <= 0.0 )
	{
		GameObject.Find("FPS").GetComponent.<UI.Text>().text = "FPS:"+(accum/frames).ToString("f2");
		timeleft = updateInterval;
		accum = 0.0;
		frames = 0;
	}
}