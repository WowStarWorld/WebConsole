importjs = (url)=>{
    var script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
    return script;
}
!(function(){
    importjs("https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js");
    importjs("./js/command_evaler.js");
    importjs("./js/config.js");
    importjs("./js/context.js");
    importjs("./js/render.js");
})()


var up = [""]; // Content history
var upnum = 0; // history index
var raw_console = console; // old console
var len =0; // println length
var version = "1.1.8"; // WebConsole version
var code = "I am JavaScript Code"; // Code Variable
var evaler; // Define Evaler

var reload_evaler = ()=>{
    evaler = new commandEvaler(context["commands"],context["helps"]);
}
var eval_command = (...args)=>{
    if (evaler){
        return evaler.eval(...args)
    }else{
        return null;
    }
}
var help = (obj=help)=>{
    getParameterName = (fn) => {
        if(typeof fn !== 'object' && typeof fn !== 'function' ) return;
        const COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        const DEFAULT_PARAMS = /=[^,)]+/mg;
        const FAT_ARROWS = /=>.*$/mg;
        let code = fn.prototype ? fn.prototype.constructor.toString() : fn.toString();
        code = code
            .replace(COMMENTS, '')
            .replace(FAT_ARROWS, '')
            .replace(DEFAULT_PARAMS, '');
        let result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g);
        return result === null ? [] :result;
    }
    getName = (obj) => {
        return obj.name || obj.toString().match(/function\s*([^(]*)\(/)[1]
    }
    if (obj == help){
        println("Type 'help(Object)' to get help of a object.","color:#0f0;");
    }else if (typeof obj == "function"){
        println(`Name: ${getName(obj)}`,"color:#0f0;");
        if (obj == Object){
            println("Properties: "+Object.keys(this).join(),"color:#0f0;");
        }else{
            println("Parameters: "+getParameterName(obj).join(", "),"color:#0f0;");
        }
    }else if (typeof obj == "object"){
        try{println(`Name: ${getName(obj)}`,"color:#0f0;");}catch(e){}
        try{println("Properties: "+Object.keys(obj).join(", "),"color:#0f0;");}catch(e){}
        try{println("Methods: "+Object.getOwnPropertyNames(obj).join(", "),"color:#0f0;");}catch(e){}
        if (obj.__doc__ != undefined){
            println("Description: "+obj.__doc__,"color:#0f0;");
        }
    }else{
        println(`Type: ${typeof obj}`,"color:#0f0;");
        println(`Value: ${obj}`,"color:#0f0;");
        if (obj.__doc__ != undefined){
            println("Description: "+obj.__doc__,"color:#0f0;");
        }
    }
    return "";
};

console = {
    styles: {
        log:"color: #ffffff;",
        debug:"color: #337bff;",
        info:"color: #00aaff;",
        warn:"color: #ffa500;",
        error:"color: #ff0000;",
        done:"color: #00ff00;"
    },
    log:(...strings) => {
        raw_console.log(strings.join(""));
        println(strings.join("").replaceAll("\n","<br/>").replaceAll("&lt;","<").replaceAll("&gt;",">"),console.styles.log);
        return "";
    },
    debug:(...strings) => {
        raw_console.debug(strings.join(""));
        println(strings.join("").replaceAll("\n","<br/>").replaceAll("&lt;","<").replaceAll("&gt;",">"),console.styles.debug);
        return "";
    },
    info:(...strings) => {
        raw_console.info(strings.join(""));
        println(strings.join("").replaceAll("\n","<br/>").replaceAll("&lt;","<").replaceAll("&gt;",">"),console.styles.info);
        return "";
    },
    warn:(...strings) => {
        raw_console.warn(strings.join(""));
        println(strings.join("").replaceAll("\n","<br/>").replaceAll("&lt;","<").replaceAll("&gt;",">"),console.styles.warn);
        return "";
    },
    error:(...strings) => {
        raw_console.error(strings.join(""));
        println(strings.join("").replaceAll("\n","<br/>").replaceAll("&lt;","<").replaceAll("&gt;",">"),console.styles.error);
        return "";
    },
    done:(...strings) => {
        raw_console.log(strings.join(""));
        println(strings.join("").replaceAll("\n","<br/>").replaceAll("&lt;","<").replaceAll("&gt;",">"),console.styles.done);
        return "";
    },
    dumps:(content,indent=2)=>{
        if (typeof content == "string"){
            return JSON.stringify(JSON.parse(content),null,indent);
        }else{
            return JSON.stringify(content,null,indent);
        }
    },
    clear:() => {
        $("#text").html("")
        up = [""];
        upnum = 0;
        len = 0;
        raw_console.clear();
        return false;
    }
}


function loop(Callback,Count){
    for (var i = 0; i < Count; i++) {
        Callback(i);
    }
}

function range(start=0,end=0,step=1){
    var arr = [];
    for (var i = start; i < end; i+=step) {
        arr.push(i);
    }
    return arr;
}

function println(str="",style="",std=false){
    var date = new Date();
    $("#text").html($("#text").html()+`<span style="${style}" width="100%">`+str+`</span><span style="color:#ff0;float:right;">[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} | ${len}]</span><br/>`);
    window.scrollTo(0, document.body.scrollHeight+1000);
    len++;
}
function isMobile(){return navigator.userAgentData.mobile;}

window.onloads = function(){
    println(`Welcome to the web-based console - StarWorld console v${version}!`,"color:#ff0;",std=true);
    println("Github Repository: <a href='https://github.com/WowStarWorld/WebConsole' style='color:#ff0;'>https://github.com/WowStarWorld/WebConsole</a>","color:#ff0;",std=true);
    println("Type 'help' to get help.",style="color:#0f0;",std=true);
    println("Type '#code' to execute javascript code.",style="color:#0f0;",std=true);
}
window.onload = function(){
    window.onloads();
    if (document.getElementById("button-group") !== null && typeof document.getElementById("button-group") !== "undefined"){
        if (!isMobile()){
            document.getElementById("button-group").style.display = "none";
        }
    }
    send.onclick = function(){
        if (true) {
            up.push(sender.value);
            v = sender.value;
            sender.value = "";
            upnum = 0;
            if (!v.replaceAll(" ","") == "") {
                println("> "+`<span style='color: #a1f7a7'>${v.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll(" ","&nbsp;")}</span>`,"color: #939393;");
            }
            try{
                if (v[0] == "#"){
                    v = v.substr(1)
                    result = String(eval(v.replaceAll("<","&lt;").replaceAll(">","&gt;"))).replaceAll("\n","<br/>").replaceAll(" ","&nbsp;");
                    if (String(result).replaceAll(" ","") != ""){
                        println("< "+`<span style='color: #9980f1;'>${result}</span>`+"","color: #bababa;");
                    }
                }
                else{
                    reload_evaler();
                    result = String(evaler.eval(v.replaceAll("<","&lt;").replaceAll(">","&gt;"))).replaceAll("\n","<br/>").replaceAll(" ","&nbsp;");
                    if (String(result).replaceAll(" ","") != ""){
                        println("< "+`<span style='color: #9980f1;'>${result}</span>`+"","color: #bababa;");
                    }
                }
                
            }catch(err){
                println("<strong>"+String(err.stack).replaceAll("<","&lt;").replaceAll(">","&gt;")+"</strong>","color: red;font-size: 15px;");
            }
            
        }
    }
    page_up.onclick = function(){
        if (up[up.length - (upnum+1)] != undefined){
            sender.value = up[up.length - (upnum+1)];
        }
        if ((up.length - (upnum+1)) != undefined){
            upnum++;
        }
    }
    page_down.onclick = function(){
        if (up[upnum] != undefined){
            sender.value = up[upnum];
        }
        if ((upnum) != undefined){
            upnum--;
        }
    }
    sender.addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 38){
            page_up.onclick();
        }
        else if (event.keyCode === 40){
            page_down.onclick();
        }
    });
    sender.addEventListener("keydown", function(event) {
        if (event.keyCode === 9) {
            event.keyCode=0;
            event.returnValue=false;
            tmp = sender.selectionStart;
            if (sender.selectionStart == sender.selectionEnd){
                sender.value = sender.value.substr(0,tmp) + "\t" + sender.value.substr(tmp);
            }else{
                sender.value = sender.value.substr(0,sender.selectionStart) + "\t" + sender.value.substr(sender.selectionEnd);
            }
            sender.selectionStart = tmp+2;
            sender.selectionEnd = tmp+2;
        }
    });

}



