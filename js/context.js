var context ={
    commands:{
        "help":function(command){
            if (command == undefined){
                println("Usage: "+context.helps.help.usage,"color: #0f0;");
                println("Commands: [ \""+Object.keys(context.helps).join("\" , \"")+"\" ]","color: #0f0;");
            }else if (command == "@all"){
                for(var i = 0, len = Object.keys(context.helps).length; i < len; i++) {
                    names = (Object.keys(context.helps)[i]);
                    println(names,style="color: #0f0;");
                    println(`    Description: ${context.helps[names]["description"]}`,style="color: #bababa;")
                    println(`    Usage: ${context.helps[names]["usage"]}`,style="color: #bababa;")
                }
            }
            else{
                if (command in context.helps){
                    println(`${command}`,style="color: #0f0;");
                    println(`    Description: ${context.helps[command]["description"]}`,style="color: #bababa;")
                    println(`    Usage: ${context.helps[command]["usage"]}`,style="color: #bababa;")
                }else{
                    throw ReferenceError("Command not found");
                }
            }
            return "";
        },
        "args":function(...args){
            return args;
        },
        "js":function(...args){
            return eval(args.join(" "));
        },
        "console":function(sub,...args){
            if (typeof console[sub] == "function"){
                return console[sub](...args);
            }
            else{
                return console[sub];
            }
        },
        "curl":function(url,method="GET",data="{}"){
            $.ajax({
                url:url,
                method:method,
                data:JSON.parse(data.replaceAll("&nbsp;"," ")),
                success:function(content){
                    println(content.replaceAll(">","&gt;").replaceAll("<","&lt;"),"color: #0f0;");
                },
                error:function(err){
                    println(JSON.stringify(err,null,2).replaceAll(">","&gt;").replaceAll("<","&lt;"),"color: #f00;");
                }
            })
            
            return "";
        },
        "import":function(url){
            $.ajax({
                url:url,
                success:function(content){
                    try{
                        return Function(content)();
                    }catch(err){
                        println("Unable to load module: \n"+err,"color: #f00;");
                    }
                },
                error:function(err){
                    println("Unable to get module: \n"+JSON.stringify(err,null,2).replaceAll("<","&lt;").replaceAll(">","&gt;"),"color: #f00;");
                }
            })
            return "";
        },
        "setvar":function(name,value){
            window[name] = value;
            return "";
        },
        "getvar":function(name){
            return window[name];
        },
        "eval":function(...code){
            var evaler = new commandEvaler(context["commands"]);
            return evaler.eval(code.join(" "));
        }
    },
    helps:{
        "help":{
            description:"Show this help message.",
            usage:"help | help [command] | help @all"
        },
        "args":{
            description:"Show the arguments of the command.",
            usage:"args [*args]"
        },
        "js":{
            description:"Execute javascript code.",
            usage:"js [*code]"
        },
        "console":{
            description:"Output content on console",
            usage:`console [${Object.keys(console).join("|")}] [*args]`
        },
        "curl":{
            description:"Execute ajax request.",
            usage:"curl [url] [method=GET] [data={}]"
        },
        "import":{
            description:"Import a module.",
            usage:"import [url]"
        },
        "setvar":{
            description:"Set a variable.",
            usage:"setvar [name] [value]"
        },
        "getvar":{
            description:"Get a variable.",
            usage:"getvar [name]"
        },
        "eval":{
            description:"Evaluate code.",
            usage:"eval [*code]"
        }

    }

};