
var context ={
    commands:{
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
            helper = () => {var evaler = new commandEvaler(context["commands"],context["helps"]);return evaler.eval("help var");}
            if (type == "set"){
                if (name != undefined){
                    if(exp=="=="){var nameArr=name.split(".");var obj=window;for(var i=0;i<nameArr.length;i++){if(i==nameArr.length-1){obj[nameArr[i]]=eval(value.join(" "))}else{obj=obj[nameArr[i]]}}}else if(exp=="+="){var nameArr=name.split(".");var obj=window;for(var i=0;i<nameArr.length;i++){if(i==nameArr.length-1){obj[nameArr[i]]=obj[nameArr[i]]+eval(value.join(" "))}else{obj=obj[nameArr[i]]}}}else if(exp=="^="){var nameArr=name.split(".");var obj=window;for(var i=0;i<nameArr.length;i++){if(i==nameArr.length-1){obj[nameArr[i]]=obj[nameArr[i]]**eval(value.join(" "))}else{obj=obj[nameArr[i]]}}}else if(exp=="-="){var nameArr=name.split(".");var obj=window;for(var i=0;i<nameArr.length;i++){if(i==nameArr.length-1){obj[nameArr[i]]=obj[nameArr[i]]-eval(value.join(" "))}else{obj=obj[nameArr[i]]}}}else if(exp=="*="){var nameArr=name.split(".");var obj=window;for(var i=0;i<nameArr.length;i++){if(i==nameArr.length-1){obj[nameArr[i]]=obj[nameArr[i]]*eval(value.join(" "))}else{obj=obj[nameArr[i]]}}}else if(exp=="/="){var nameArr=name.split(".");var obj=window;for(var i=0;i<nameArr.length;i++){if(i==nameArr.length-1){obj[nameArr[i]]=obj[nameArr[i]]/eval(value.join(" "))}else{obj=obj[nameArr[i]]}}}else if(exp=="\\="){var nameArr=name.split(".");var obj=window;for(var i=0;i<nameArr.length;i++){if(i==nameArr.length-1){obj[nameArr[i]]=Math.floor(obj[nameArr[i]]/eval(value.join(" ")))}else{obj=obj[nameArr[i]]}}}else if(exp=="++"){var nameArr=name.split(".");var obj=window;for(var i=0;i<nameArr.length;i++){if(i==nameArr.length-1){obj[nameArr[i]]++}else{obj=obj[nameArr[i]]}}}else if(exp=="--"){var nameArr=name.split(".");var obj=window;for(var i=0;i<nameArr.length;i++){if(i==nameArr.length-1){obj[nameArr[i]]--}else{obj=obj[nameArr[i]]}}}else{return helper()}
                }else{
                    return helper();
                }
            }
            else if (type == "get"){
                if (name != undefined){
                    name_ = name.split(".");
                    if (name_.length > 1){
                        content = window[name_[0]];
                        for (var i = 1; i < name_.length; i++){
                            content = content[name_[i]];
                        }
                        return content;
                    }
                    else{
                        return window[name];
                    }
                }else{
                    return helper();
                }
            }
            else if (type == "del"){
                if (name != undefined){
                    name_ = name.split(".");
                    if (name_.length > 1){
                        content = window[name_[0]];
                        for (var i = 1; i < name_.length; i++){
                            content = content[name_[i]];
                        }
                        content = undefined;
                    }
                    else{
                        window[name] = undefined;
                    }
                }else{
                    return helper();
                }
                
            }else{
                return helper();
            }
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
            return "";
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
                        println(`Unable to load plugin: \n&nbsp;&nbsp;${e}`,"color:#f00;")
                    }
                }
                reader.readAsText(inputObj.files[0])
            }
        }
    },
    helps:{
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