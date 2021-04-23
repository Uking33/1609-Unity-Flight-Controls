using UnityEngine;
using System.Collections;

//这里是枚举选择敌人类型
public enum EnemyType 
{
	Enemy0, 
	Enemy1,
	Enemy2, 
	Enemy3,
	Enemy4, 
	Enemy5,
	Enemy6,
	Enemy7
}


public class AI : MonoBehaviour {
	
	
	//敌人类型枚举 有策划人员选择
	public EnemyType enemyType = EnemyType.Enemy0;
	
	//主角游戏对象
	public GameObject player;	
	private int type;
	
	//敌人状态 普通状态 旋转状态 奔跑状态 追击主角状态 攻击主角状态
	private const int EMEMY_NORMAL=0;
	private const int EMEMY_ROTATION=1;
	private const int EMEMY_RUN = 2;
	private const int EMEMY_CHASE = 3;
	private const int EMEMY_ATTACK = 4;
	
	//记录当前敌人状态 根据不同类型 敌人播放不同动画
	static private int[] state={0,0,0,0,0,0,0,0};
	//旋转状态，敌人自身旋转
	static private int[] rotation_state={0,0,0,0,0,0,0,0};
	//记录敌人上一次思考时间
	static private float[] aiThankLastTime={0,0.2f,0.3f,0.5f,0.6f,0.7f,0.8f,0.9f}; 
	//敌人撞墙
	static private int[] stop={0,0,0,0,0,0,0,0}; 
	
	void Start () 
	{
		//初始话标志敌人状态 以及动画为循环播放
		state[type] = EMEMY_NORMAL;
		this.GetComponent<Animation>().wrapMode = WrapMode.Loop;
	}
	
	void Update () 
	{
		//根据策划选择的敌人类型 这里面会进行不同的敌人AI
		switch(enemyType)
		{
		case EnemyType.Enemy0:
			type=0;
			break;
		case EnemyType.Enemy1:
			type=1;
			break;
		case EnemyType.Enemy2:
			type=2;
			break;
		case EnemyType.Enemy3:
			type=3;
			break;
		case EnemyType.Enemy4:
			type=4;
			break;
		case EnemyType.Enemy5:
			type=5;
			break;
		case EnemyType.Enemy6:
			type=6;
			break;
		case EnemyType.Enemy7:
			type=7;
			break;
		}
		updateEnemy();
	}
	
	//敌人的AI
	void updateEnemy()
	{
		
		//判断敌人是否开始思考
		if(isAIthank())
		{
			if(stop[type]==1)
			{
				if (type == 1)
					print ("11 "+ state [type]+" "+aiThankLastTime[type]+" "+rotation_state[type] * 90);
				if(state[type]==EMEMY_RUN)
					stop[type]=0;
				else
					setEmemyState(EMEMY_RUN);
				if (type == 1)
					print ("12 "+ state [type]+" "+aiThankLastTime[type]+" "+rotation_state[type] * 90);
			}
			//敌人开始思考
			if(stop[type]==0)
				AIthankEnemyState(3);
		}else
		{
			//更新敌人状态
			UpdateEmenyState();
		}
	}
	
	int getRandom(int count)
	{
		
		 return new System.Random().Next(count);
		
	}
	
	bool isAIthank()
	{
		//这里表示敌人每1秒进行一次思考
		if(Time.time - aiThankLastTime[type] >=1.0f)
		{
			aiThankLastTime[type] = Time.time;
			return true;			
		}
		return false;
	}
	
	//敌人在这里进行思考
	void AIthankEnemyState(int count)
	{
		//开始随机数字。
		int d = getRandom(count);
	
		switch(d)
		{
		case 0:
			//设置敌人为站立状态
			setEmemyState(EMEMY_NORMAL);
			break;
		case 1:
			//设置敌人为旋转状态
			setEmemyState(EMEMY_ROTATION);
			break;
		case 2:
			//设置敌人为奔跑状态
			setEmemyState(EMEMY_RUN);
			break;
		}

	}

	void setEmemyState(int newState)
	{
		if(state[type] == newState)
			return;
		state[type] = newState;
		
		string animName = "Idle";
		switch(state[type])
		{
		case EMEMY_NORMAL:
			animName  =  "Idle";
			break;
		case EMEMY_RUN:
			animName  =  "Run";
			break;
		case EMEMY_ROTATION:
			animName  =  "Run";
			//当敌人为旋转时， 开始随机旋转的角度系数 
			rotation_state[type] = getRandom(4);
			break;
		case EMEMY_CHASE:
			animName  =  "Run";
			//当敌人进入追击状态时，将面朝主角方向奔跑
			this.transform.LookAt(new Vector3(player.transform.position.x,(float)37.5,player.transform.position.z));
			break;
		case EMEMY_ATTACK:
			animName  =  "Attack";
			//当敌人进入攻击状态时，继续朝向主角开始攻击砍人动画
			int d = getRandom(50);
			this.transform.LookAt(new Vector3(player.transform.position.x,player.transform.position.y-(170-d),player.transform.position.z));
			break;
		}
		
		//避免重复播放动画，这里进行判断
		if(!this.GetComponent<Animation>().IsPlaying(animName))
		{
			//播放动画
			this.GetComponent<Animation>().Play(animName);
		}
		
	}
	
	//在这里更新敌人状态
	void UpdateEmenyState()
	{
		if (player == null)
			return;
		if (stop [type] == 0) {
			//判断敌人与主角之间的距离
			float distance;
			distance = Vector3.Distance (player.transform.position, this.transform.position);
			//当敌人与主角的距离小于10 敌人将开始面朝主角追击
			if (distance <= 800) {
				//当敌人与主角的距离小与3 敌人将开始面朝主角攻击
				if (distance <= 250) {
					setEmemyState (EMEMY_ATTACK);
				} else {
					//否则敌人将开始面朝主角追击
					setEmemyState (EMEMY_CHASE);
				}

			} else {
				//敌人攻击主角时 主角迅速奔跑 当它们之间的距离再次大于10的时候 敌人将再次进入正常状态 开始思考
				if (state [type] == EMEMY_CHASE || state [type] == EMEMY_ATTACK) {
					setEmemyState (EMEMY_NORMAL);
				}
					
			}
		}
		
		switch(state[type])
		{
		case EMEMY_ROTATION:
			//旋转状态时 敌人开始旋转， 旋转时间为1秒 这样更加具有惯性
			transform.Rotate(0,rotation_state[type] * 90*Time.deltaTime,0);
			break;
		case EMEMY_RUN:
			//奔跑状态，敌人向前奔跑
			transform.Translate(Vector3.forward *1.5f);
			break;
		case EMEMY_CHASE:
			//追击状态 敌人向前开始追击
			if(type<2)
				transform.Translate(Vector3.forward *2f);
			else if(type<5)				
				transform.Translate(Vector3.forward *4f);
			else if(type<8)				
				transform.Translate(Vector3.forward *8f);
			break;
		case EMEMY_ATTACK:
			break;
		}
		if(transform.position.y>37.5)
		{
			float tempX=transform.position.x;
			float tempZ=transform.position.z;
			transform.position=new Vector3(tempX,(float)37.5,tempZ);
		}
	}
	void stopSoldier()	{
		if (stop [type] == 0) {
			stop[type] =1;
			setEmemyState(EMEMY_ROTATION);
			aiThankLastTime[type] = Time.time;
			rotation_state [type] = 2;
			if (type == 1)
				print ("1+ "+ state [type]+" "+aiThankLastTime[type]+" "+rotation_state[type] * 90);
		}
	}
}

