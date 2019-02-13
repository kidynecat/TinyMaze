import WebGL = Laya.WebGL;
// 程序入口
class Main {
    private sp: Laya.Sprite;
    map = new MapMain(30, 30);
    pss: Array<PathStep> = [];
    unitsize = 16;
    

    private player: Unit;
    constructor() {
        //画布
        Laya.init(1000, 700, WebGL);

        //消息
        let msg: string = "";
        msg = msg + `主路生成尝试${this.map.times}次,主路共${this.map.steps}步`

        //maze
        //随机生成起点和终点
        var sx = Math.floor(Math.random() * this.map.SizeX + 1)
        var sy = Math.floor(Math.random() * this.map.SizeY + 1)
        var ex = 0;
        var ey = 0;
        
        while (sx == ex || sy == ey || ex == 0 || ey == 0)  {
            ex = Math.floor(Math.random() * this.map.SizeX + 1)
            ey = Math.floor(Math.random() * this.map.SizeX + 1)
        }

        // var sx = 1;
        // var sy = 1;
        // var ex = 30;
        // var ey = 30;

        this.pss = this.map.InitMap2(sx, sy, ex, ey);


        this.sp = new Laya.Sprite();
        Laya.stage.addChild(this.sp);
        if (this.pss != null) {
            for (let ps of this.pss) {
                //msg = msg + `${ps.X},${ps.Y},${PathDirection[ps.PD]}\r\n`;
                Sys.drawMapUnit("rw", this.sp, ps, this.unitsize, "#ffffff", "#ff0000");
            }
        }

        Sys.drawMapUnit("s", this.sp, new PathStep(sx, sy), this.unitsize, "#ff0000", null, 0);
        Sys.drawMapUnit("e", this.sp, new PathStep(ex, ey), this.unitsize, "#0000ff", null, 0);

        //操作者
        this.player = new Unit();
        this.player.sp.graphics.drawPoly(0, 0, [0, this.unitsize, this.unitsize*0.5, 0, this.unitsize, this.unitsize], "#006599");
        //this.player.graphics.drawCircle(30,30,18,"#ff0000");
        //this.player.pivot(50,50);
        this.player.LocationX = sx;
        this.player.LocationY = sy;
        this.player.sp.x = sx*this.unitsize;
        this.player.sp.y = sy*this.unitsize;
        Laya.stage.addChild(this.player.sp);

        //操作
        Laya.stage.on(Laya.Event.KEY_PRESS, this, this.keyOrder);
        Laya.stage.on(Laya.Event.KEY_DOWN, this, this.keydown);

        //显示消息
        Sys.createText(msg);
    }

    public keyOrder(e: Laya.Event) {
        //显示结果路径
        if (e.keyCode == 13) {
            // var newfork = this.map.forkpath();
            // Laya.stage.removeChild(this.sp);
            // this.sp = new Laya.Sprite();
            // Laya.stage.addChild(this.sp);
            // var unitsize = 15;
            // if (newfork != null) {
            //     for (let ps of newfork) {
            //         //msg = msg + `${ps.X},${ps.Y},${PathDirection[ps.PD]}\r\n`;
            //         Sys.drawMapUnit(this.sp, ps, unitsize, "#ffffff", "#00ff00");
            //     }
            // }
            for (let ps of this.map.MainPath) {
                Sys.drawMapUnit("p", this.sp, ps, this.unitsize, "#00ff00", "#00ff00");
            }
        }
    }

    public keydown(e: Laya.Event) {
        if (e.keyCode == Laya.Keyboard.W)  {
            if(this.map.AllPathArray[this.player.LocationX-1][this.player.LocationY-1].mapUnitBorder.top == false)
            this.player.LocationY -= 1;
        }
        if (e.keyCode == Laya.Keyboard.D)  {
            if(this.map.AllPathArray[this.player.LocationX-1][this.player.LocationY-1].mapUnitBorder.right == false)
            this.player.LocationX += 1;
        }
        if (e.keyCode == Laya.Keyboard.S)  {
            if(this.map.AllPathArray[this.player.LocationX-1][this.player.LocationY-1].mapUnitBorder.bottom == false)
            this.player.LocationY +=1 ;
        }
        if (e.keyCode == Laya.Keyboard.A)  {
            if(this.map.AllPathArray[this.player.LocationX-1][this.player.LocationY-1].mapUnitBorder.left == false)
            this.player.LocationX -= 1;
        }

        this.player.sp.x = this.player.LocationX*this.unitsize;
        this.player.sp.y = this.player.LocationY*this.unitsize;
    }



}
var m = new Main();