!(function(){
    document.write("<script src=\"https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js\"></script>"); // $
    document.write("<script src=\"./js/command_evaler.js\"></script>"); // commandEvaler 
    document.write("<script src=\"./js/context.js\"></script>"); // context
})()

//variables
var up = [""];
var upnum = 0;
var raw_console = console;
var len =0;
var version = "1.0.7";
var code = "I am JavaScript Code";
var help = ()=>{
    return Object.keys(this);
};

console = {
    styles: {
        log:"color: #ffffff;",
        debug:"color: #337bff;",
        info:"color: #00aaff;",
        warn:"color: #ffa500;",
        error:"color: #ff0000;",
        success:"color: #00ff00;"
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
    success:(...strings) => {
        raw_console.log(strings.join(""));
        println(strings.join("").replaceAll("\n","<br/>").replaceAll("&lt;","<").replaceAll("&gt;",">"),console.styles.success);
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

function println(str="",style=""){
    $("#text").html($("#text").html()+`<span style="${style}" width="100%">`+str+`</span><span style="color:#ff0;float:right;">${len}</span><br/>`);
    window.scrollTo(0, document.body.scrollHeight+1000);
    len++;
}

window.onloads = function(){
    println(`Welcome to the web-based console - StarWorld console v${version}!`,"color:#ff0;");
    println("Github Repository: <a href='https://github.com/WowStarWorld/WebConsole' style='color:#ff0;'>https://github.com/WowStarWorld/WebConsole</a>","color:#ff0;");
    println("Type 'help' to get help.",style="color:#0f0;");
    println("Type '#code' to execute javascript code.",style="color:#0f0;");
}
window.onload = function(){
    window.onloads();
    send.onclick = function(){
        if (true) {
            up.push(sender.value);
            v = sender.value;
            sender.value = "";
            upnum = 0;
            println("> "+`<span style='color: #a1f7a7'>${v.replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll(" ","&nbsp;")}</span>`,"color: #939393;");
            try{
                if (v[0] == "#"){
                    v = v.substr(1)
                    result = String(eval(v.replaceAll("<","&lt;").replaceAll(">","&gt;"))).replaceAll("\n","<br/>").replaceAll(" ","&nbsp;");
                    if (String(result).replaceAll(" ","") != ""){
                        println("< "+`<span style='color: #9980f1;'>${result}</span>`+"","color: #bababa;");
                    }
                }
                else{
                    var evaler = new commandEvaler(context["commands"]);
                    result = String(evaler.eval(v.replaceAll("<","&lt;").replaceAll(">","&gt;"))).replaceAll("\n","<br/>").replaceAll(" ","&nbsp;");
                    if (String(result).replaceAll(" ","") != ""){
                        println("< "+`<span style='color: #9980f1;'>${result}</span>`+"","color: #bababa;");
                    }
                }
                
            }catch(err){
                println("<strong>"+String(err).replaceAll("<","&lt;").replaceAll(">","&gt;")+"</strong>","color: red;font-size: 15px;");
            }
            
        }
    }
    sender.addEventListener("keyup", function(event) {
        event.preventDefault();
        
        if (event.keyCode === 38){
            if (up[up.length - (upnum+1)] != undefined){
                sender.value = up[up.length - (upnum+1)];
            }
            if ((up.length - (upnum+1)) != undefined){
                upnum++;
            }
        }
        else if (event.keyCode === 40){
            if (up[upnum] != undefined){
                sender.value = up[upnum];
            }
            if ((upnum) != undefined){
                upnum--;
            }
        }
    });

}



