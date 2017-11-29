/**
 * 抽奖
 * @param index       当前转动到哪个位置，起点位置
 * @param count       总共有多少个位置
 * @param timer       setTimeout的ID，用clearTimeout清除
 * @param speed       初始转动速度
 * @param times       转动次数
 * @param cycle       转动基本次数：即至少需要转动多少次再进入抽奖环节
 * @param prize       中奖位置
 * @param unit        盒子类名,用于计算个数
 * @param unit_num    盒子类名,用于添加class标记
 * @param calss       需要添加的calss名
 */
var lottery={
	index:-1,
	count:0,
	timer:0,
	speed:20,
	times:0,
	cycle:50,
	prize:-1,
	unit:"unit",
	unit_num:"unit_num",
	calss:"calss",
	init:function(id){
		if ($("#"+id).find(this.unit).length>0) {
			$lottery = $("#"+id);
			$units = $lottery.find(this.unit);
			this.obj = $lottery;
			this.count = $units.length;
			$lottery.find(this.unit_num+this.index).addClass(this.calss);
		}
	},
	roll:function(){
		var index = this.index;
		var count = this.count;
		var lottery = this.obj;
		$(lottery).find(this.unit_num+index).removeClass(this.calss);
		index += 1;
		if (index>count-1) {
			index = 0;
		}
		$(lottery).find(this.unit_num+index).addClass(this.calss);
		this.index=index;
		return false;
	},
	stop:function(index){
		this.prize=index;
		return false;
	}
};
function roll(){
	lottery.times += 1;
	lottery.roll();     //转动过程调用的是lottery的roll方法，这里是第一次调用初始化
	if (lottery.times > lottery.cycle+10 && lottery.prize===lottery.index) {
		clearTimeout(lottery.timer);
		lottery.prize=-1;
		lottery.times=0;
		click=false;
	}else{
		if (lottery.times<lottery.cycle) {
			lottery.speed -= 10;
		}else if(lottery.times===lottery.cycle) {
			lottery.prize = Math.random()*(lottery.count)|0;    //中奖物品通过一个随机数生成
		}else{
			if (lottery.times > lottery.cycle+10 && ((lottery.prize===0 && lottery.index===7) || lottery.prize===lottery.index+1)) {
				lottery.speed += 110;
			}else{
				lottery.speed += 20;
			}
		}
		if (lottery.speed<40) {
			lottery.speed=40;
		}
                // console.log(lottery.times+'次数 '+lottery.speed+'速度 '+lottery.prize+'随机数');
		lottery.timer = setTimeout(roll,lottery.speed);     //循环调用
	}
	return false;
}
var click=false;
