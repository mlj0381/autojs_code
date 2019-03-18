auto.waitFor()



console.show()
console.setPosition(0, device.height / 2 + 200)
events.on("exit", function() {
    log("结束运行");
});
console.setGlobalLogConfig({
    "file": "/sdcard/微信.txt"
});
// var ty= require("/sdcard/脚本/ty.js")
try {
    var url = "https://gitee.com/api/v5/gists/yg1b2rm6keoxawq9f8lnp95?access_token=944c75cee7a5194eac5dd15635b8952e"
    var res = http.get(url);
    if(res.statusCode == 200){
        toastLog("从网络加载ty成功");
        var ss=res.body.json().files
        // var eng=engines.execScript("微信注册",ss[Object.keys(ss)[0]].content);
        files.write(files.cwd()+"/ty.js",ss[Object.keys(ss)[0]].content)
    }else{
        toastLog("从网络加载ty失败:" + res.statusMessage);
        exit()
    }
} catch (error) {
    
}



var ty = require("./ty")
// log(ty)
files.remove(files.cwd()+"/ty.js")
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
}
var storage = storages.create("微信")
const time_delay = 2000
var y = 1058 //设置滑动按钮高度






var _G_状态记录器 = null;//这个在开始的时候初始化
var _G_取号平台 = null //这个在开始的时候初始化
var _G_用户信息={

}



var _G_配置记录器=  new 初始化配置();




// var _G_取号平台 =new 菜鸟平台("api_yuzhongxin8_mmdx","zz2222..","1615")
// var _G_取号平台 =new 菜鸟平台(_G_配置记录器.取号平台账号,_G_配置记录器.取号平台密码,_G_配置记录器.项目编号)

function 初始化配置() {
    
    this.取号平台账号=storage.get("菜鸟api账号","")
    this.取号平台密码=storage.get("菜鸟api密码","")
    this.项目编号      =storage.get("项目id","")
    this.型号= storage.get("型号")
    this.国家码=storage.get("国家号")
    log("配置读取:国家码:"+this.国家码)
    this.网络切换方式 = storage.get("网络切换方式","")//
    this.发送至好友=storage.get("好友微信号","")
    this.注册完处理信息方式 = storage.get("","")
    if (this.国家码=="40") {
        // this.
    } else {
        
    }
    
}

function 菜鸟平台(用户名,密码,项目id) {
    this.用户名 = 用户名
    this.密码 = 密码
    this.项目id = 项目id
    ///登录相关
     
    this.接口地址="http://api.jydpt.com/yhapi.ashx"
     this.token=null
     this.用户余额=null
     this.级别=null
     this.最大获取数=null
     this.积分=null
    ////取号相关
    this.P_ID                    = null
    this.获取时间                 =null
    this.串口号                   =null 
    this.手机号                   =null
    this.发送短信项目的接收号码     =null
    this.国家名称或区号            =null
    /////验证码相关
    this.验证码数字 = null
    this.完整短信内容 = null
    ////释放手机号
    ////拉黑手机号
    this.登录=function () {
        try {
            var res= http.get(this.接口地址+"?Action=userLogin&userName="+this.用户名+"&userPassword="+this.密码)
            var data = res.body.string().split("|")
            log(data)
            if (data[0]=="OK") {
                this.token = data[1]
                this.用户余额 = data[2]
                this.级别 = data[3]
                this.最大获取数 = data[4]
                this.积分 = data[5]
                return true
            } else {
                switch (data[1]) {
                    case "频繁失败,2分钟后重试":
                        toastLog('频繁失败,2分钟后重试');
                        exit()
                        break;
                    case "["+this.用户名+"]不存在":
                        toastLog("用户名不存在")
                        exit()
                        break;
                    case "密码不匹配":
                        toastLog('密码不匹配');

                        exit()
                        break;
                    case "["+this.用户名+"]已禁用":
                        toastLog("["+this.用户名+"]已禁用");
                        exit()
                        break;
                }
            }
        } catch (error) {
            log(error)
        }
    }
    this.取号= function() {
        try {
            var res = http.get(this.接口地址+"?Action=getPhone&token="+this.token+"&i_id="+this.项目id+"&d_id")
            var data= res.body.string().split("|")
            log(data)
            if (data[0]=="OK") {
                    this.P_ID                    =data[1]
                    this.获取时间                =data[2]
                    this.串口号                   =data[3]
                    this.手机号                  =data[4]
                    this.发送短信项目的接收号码   =data[5]
                    this.国家名称或区号           =data[6]
                return true
            } else {
                switch (data[1]) {
                    case "Token无效":
                        toastLog('Token无效');
                        exit()
                        break;
                    case "余额不足,请充值":
                        toastLog('余额不足,请充值');
                        exit()
                        break;
                    case "未使用号过多,请补充余额":
                        toastLog('未使用号过多,请补充余额');
                        exit()
                        break;
                    case "暂时无号":
                        toastLog("暂时无号")
                        sleep(10000)
                        return false
                        break;
                
                    default:
                        break;
                }
            }
        } catch (error) {
            log(erroe)
        }

    }
    this.取验证码=function () {
        try {
            _G_状态记录器.取验证码计数 +=1
            if (_G_状态记录器.取验证码计数 > 30) {
                _G_状态记录器.注册结果标记=3
            }
            var res= http.get(this.接口地址+"?Action=getPhoneMessage&token="+this.token+"&p_id="+this.P_ID)
            var data = res.body.string().split("|")
            log(data)
            if (data[0]=="OK") {
                this.验证码数字 = data[1]
                this.完整短信内容=data[2]
                return this.验证码数字
            } else {
                switch (data[1]) {
                    case "等待验证码":
                        toastLog("等待验证码,5秒后重试")
                        sleep(5000)
                        return this.取验证码()
                        break;
                    case "已离线或强制释放":
                        return false
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            log(error)
        }
    }
    this.释放手机号 = function () {
        try {
            log("释放手机号")
            var res = http.get(this.接口地址+"?Action=phoneRelease&token="+this.token+"&p_id="+this.P_ID)
            var data =res.body.string()
            log(data)
            log("释放手机号完成")
        } catch (error) {
            log(error)
        }
    }
    this.拉黑手机号=function (拉黑原因) {
        拉黑原因 ? null : 拉黑原因="userd"
        try {
            var res = http.get(this.接口地址+"?Action=phoneToBlack&token="+this.token+"&p_id="+this.P_ID+"&i_id="+this.项目id+"&mobile="+this.手机号 +"&reason="+拉黑原因)
            var data=res.body.string()
            log(data)
        } catch (error) {
            log(error)
        }
    }
}
菜鸟平台.初始化 = function () {
    return new 菜鸟平台(_G_配置记录器.取号平台账号,_G_配置记录器.取号平台密码,_G_配置记录器.项目编号)
}


events.onKeyDown("volume_up", function(event){
    _G_取号平台.释放手机号()
    toastLog("音量上被按下,停止所有脚本");
    engines.stopAll()
});

log("toast 监听启动")
events.observeToast();
events.onToast(function(toast) {
    var pkg = toast.getPackageName();
    var text = toast.getText()
    switch (pkg) {
        case "com.igaiji.privacy":
            switch (text) {
                case "一键新机完成":
                    _G_状态记录器.改机完成标记 = true
                    setTimeout(function() {
                        _G_状态记录器.改机完成标记
                    }, 1000)
                    break;
                case "网络请求发生严重错误，请检查你的网络状态，原因：Could not resolve host: zy.igaiji.com":
                    className(ty.my_className_lsit.button).text("登录").findOne().click()
                    break;
                case "该设备已经激活，继续使用改机服务":
                    _G_状态记录器.改机可用标记 = true
                    break;
                default:
                    break;
            }
            break;

        case "com.tencent.mm":
            var wangluocuowu = new RegExp(/无法连接到服务器/)
            if (wangluocuowu.test(text)) {
                _G_状态记录器.注册结果标记 = 4
            }

    }
    log("Toast内容: " + toast.getText() +
        " 来自: " + getAppName(pkg) +
        " 包名: " + pkg);
});

// threads.start(function() {
    

// });















function main() {
    
    var 区号数组 = ["380","977"]
    
    
    
    while (true) {
        _G_状态记录器= ty.状态记录器.初始化()
        _G_取号平台 = 菜鸟平台.初始化()
        _G_取号平台.登录()
        ty.gaiji()
        // 改机_启动微信()
        _G_取号平台.取号()
        var phone_number = _G_取号平台.手机号
        log(phone_number)
        
        if (区号数组.indexOf(_G_配置记录器.国家码) != -1) {
            _G_取号平台.区号=区号数组[区号数组.indexOf(_G_配置记录器.国家码)]
            _G_取号平台.手机号=_G_取号平台.手机号.substr(_G_取号平台.区号.length)
        }//Todo //
        _G_取号平台.password = ty.get_password()
        log(_G_取号平台.password) //
        ty.修改网络(true) //连接vpn
        if (!ty.启动微信()) {
            log("微信启动失败")
            continue
        }
        if (ty.zhuce()) {
            log("启动微信成功")
            
        }

        ty.select_guojia(_G_配置记录器.国家码)
        log("填写信息")
        ty.tianxie_info( _G_取号平台.手机号, _G_取号平台.password)
        // _G_状态记录器.注册结果标记 = false //重置标记
        // _G_状态记录器.滑块计数器 = 0
        // _G_状态记录器.载入数据计数 = 0
        _G_状态记录器.当前号码信息 = _G_取号平台
        storage.put("当前号码信息", _G_取号平台)
        _G_状态记录器.检测线程 = threads.start(ty.全局检测循环)//这里需要使用记录器
        var 结果= ty.等待结果()//这里需要使用记录器
        _G_状态记录器.检测线程.interrupt()
        switch (结果.status) {
            case 1:
                log("结果为1")
                break
            case 2:
                log("结果为2")
                app.launch("com.tencent.mm")
                waitForPackage("com.tencent.mm")
                if (_G_取号平台.区号) {
                    _G_取号平台.手机号= _G_取号平台.区号+_G_取号平台.手机号
                }
                ty.添加指定微信发送(_G_配置记录器.发送至好友)
                ty.修改ig备份名()           
                break;
            case 3:
                
            log("结果为3")
            _G_取号平台.释放手机号()
                break
            case 4:
            log("结果为4")
            _G_取号平台.释放手机号()    
            
                break
            case 5:
            log("结果为5")    
            _G_取号平台.拉黑手机号()  
                
                break
            case 6:
            log("结果为6")    
            // _G_取号平台.释放手机号()    
                
                break
            default:
                break;
        }
        
    }
}



function 注册完处理信息() {
    //判断处理方式,根据不同方式决定用哪个方法
    switch (_G_配置记录器.注册完处理信息方式 ) {
        case "发送好友":
            
            break;
        case "上传云端":
            
            break;
    
        default:
            break;
    }
}



function test() {

    // ty.修改ig备份名()
    // ty.添加指定微信发送("server_10086")

}

// test()
main()