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
                        println("Unable to load plugin: \n"+err,"color: #f00;");
                    }
                },
                error:function(err){
                    println("Unable to get plugin: \n"+JSON.stringify(err,null,2).replaceAll("<","&lt;").replaceAll(">","&gt;"),"color: #f00;");
                }
            })
            return "";
        },
        "var":function(type,name,exp,...value){
            helper = () => {var evaler = new commandEvaler(context["commands"]);return evaler.eval("help var");}
            if (type == "set"){
                if (name != undefined){
                    if (exp == "=="){
                        return window[name] = eval(value.join(" "));
                    }else if (exp == "+="){
                        return window[name] = window[name] + eval(value.join(" "));
                    }else if (exp == "^="){
                        return window[name] = window[name] ** eval(value.join(" "));
                    }else if (exp == "-="){
                        return window[name] = eval(window[name]-eval(value.join(" ")));
                    }else if (exp == "*="){
                        return window[name] = eval(window[name]*eval(value.join(" ")));
                    }else if (exp == "/="){
                        return window[name] = eval(window[name]/eval(value.join(" ")));
                    }else if (exp == "\\="){
                        return window[name] = Math.floor(window[name]/eval(value.join(" ")));
                    }else if (exp == "++"){
                        return window[name]++;
                    }else if (exp == "--"){
                        return window[name]--;
                    }else{
                        return helper();
                    }
                }else{
                    return helper();
                }
            }
            else if (type == "get"){
                if (name != undefined){
                    return window[name];
                }else{
                    return helper();
                }
            }
            else if (type == "del"){
                if (name != undefined){
                    window[name] == null;
                    return delete window[name];
                }else{
                    return helper();
                }
                
            }else{
                return helper();
            }
        },
        "eval":function(...code){
            var evaler = new commandEvaler(context["commands"]);
            return evaler.eval(code.join(" "));
        },
        "plugins":function(){
            $.ajax({
                url:config.pluginlist_mirror,
                success:function(content){
                    var plugins = content.pluginlist;
                    for(var i = 0, len = plugins.length; i < len; i++) {
                        println(plugins[i].name,style="color: #0f0;");
                        println(`    Description: ${plugins[i].description}`,style="color: #bababa;")
                        println(`    Author: ${plugins[i].author}`,style="color: #bababa;")
                        println(`    Version: ${plugins[i].version}`,style="color: #bababa;")
                        println(`    URL: ${plugins[i].url}`,style="color: #bababa;")
                        println(`    Plugin: ${plugins[i].plugin}`,style="color: #bababa;")
                    }
                },
                error:function(err){
                    println(JSON.stringify(err,null,2).replaceAll(">","&gt;").replaceAll("<","&lt;"),"color: #f00;");
                }
            });
        },
        "upload":function(){
            var inputObj=document.createElement('input')
            inputObj.setAttribute('id','_ef');
            inputObj.setAttribute('type','file');
            inputObj.setAttribute("style",'visibility:hidden');
            document.body.appendChild(inputObj);
            inputObj.click();
            inputObj.onchange = function(){
                const reader = new FileReader();
                reader.onload = function(){
                    try{
                        Function(reader.result)()
                    }catch(e){
                        println(`Unable to load plugin: ${e}`,"color:#f00;")
                    }
                }
                reader.readAsText(inputObj.files[0])
            }
        }
    },
    helps:{
        "help":{
            description:"Show this help message.",
            usage:"help | help [command] | help @all"
        },
        "args":{
            description:"Show the arguments of the command.",
            usage:"args [···args]"
        },
        "js":{
            description:"Execute javascript code.",
            usage:"js [···code]"
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
            description:"Import a plugin.",
            usage:"import [url]"
        },
        "var":{
            description:"Manage variables.",
            usage:"var set|get|del &lt;name&gt; &lt;set-expression[==|+=|-=|*=|^=|/=|\\=|++|--]&gt; &lt;set-expression!=[++|--][···values]&gt;"
        },
        "eval":{
            description:"Evaluate code.",
            usage:"eval [···code]"
        },
        "plugins":{
            description:"Show the official plugins",
            usage:"plugins & import &lt;plugin&gt;"
        },
        "upload":{
            description:"Upload and import a plugin",
            usage:"upload"
        }
    }

};