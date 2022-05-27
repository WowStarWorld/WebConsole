importjs("./js/prototypes.js");

class commandEvaler{
    constructor(context,helps){
        if (typeof context != "object"){
            throw new TypeError("context must be an object");
        }else if (typeof helps != "object"){
            throw new TypeError("helps must be an object");
        }
        this.context = context;
        helps.help = {description:"A built-in command is used to show this help message.",usage:"help | help [command] | help @all"};
        helps.eval = {description:"A built-in command is used to evaluate command and return value.",usage:"eval [···command]"};
        helps.exec = {description:"A Built in command is used to execute command and do not return value.",usage:"exec [···command]"};
        this.helps = helps;
        this.context.exec = function(...command){evaler = new commandEvaler(this,this); evaler.exec(command.join(" ")); return "";};
        this.context.eval = function(...command){evaler = new commandEvaler(this,helps); return evaler.eval(command.join(" "));}
        this.context.help = function(command){if(command==undefined){println("Usage:&nbsp;"+helps.help.usage,"color: #0f0;");println("Commands: [ \""+Object.keys(helps).join("\" , \"")+"\" ]","color: #0f0;")}else if(command=="@all"){for(var i=0,len=Object.keys(helps).length;i<len;i++){names=(Object.keys(helps)[i]);println(names,style="color: #0f0;");println(`Description:&nbsp;${helps[names]["description"]}`,style="color: #bababa;");println(`Usage:${helps[names]["usage"]}`,style="color: #bababa;")}}else{if(command in helps){println(`${command}`,style="color: #0f0;");println(`Description:&nbsp;${helps[command]["description"]}`,style="color: #bababa;");println(`Usage:&nbsp;${helps[command]["usage"]}`,style="color: #bababa;")}else{throw ReferenceError("Command not found");}}return""}
    }
    eval(command){
        if (typeof(console)=="undefined"|| raw_console == null || typeof(raw_console) == "undefined" || raw_console == null || println == null || typeof(println) == "undefined" || println == null || typeof(println) == "undefined"){
            throw new EXCEPTIONS.IOErrror("Cannot Write to Console");
        }
        if (typeof command != "string"){
            throw ( new EXCEPTIONS.CommandParseError ("Command must be a string") );
        }
        if (command.replaceAll(" ","").replaceAll("\t","") == ""){
            throw ( new EXCEPTIONS.CommandParseError ("Command cannot be empty") );
        }
        if (command.substring(0,2) == "//"){
            return "";
        }
        this.command = command;
        this.command_args = this.command.split(" ");
        for (var i = 0; i < this.command_args.length; i++){
            if (this.command_args[i] == ""){
                this.command_args.splice(i,1);
            }else{
                this.command_args[i] = this.command_args[i].replaceAll("<","&lt;").replaceAll(">","&gt;");
            }
        }
        this.command_name = this.command_args[0];
        if (!new StringRegularExpression(this.command_name).is_CommandName()){
            throw ( new EXCEPTIONS.CommandParseError ("Invalid Command Syntax") );
        }
        this.command_args = this.command_args.slice(1,this.command_args.length);
        if (this.context.hasOwnProperty(this.command_name)){
            try{
                var result = this.context[this.command_name](...this.command_args);
                return result;
            }catch(e){
                if (e instanceof RangeError){
                    if (e.message = "Maximum call stack size exceeded"){
                        throw ( new EXCEPTIONS.StackOverflowError (e.message) );
                    }
                    else{
                        throw ( e );
                    }
                }else{
                    throw ( e );
                }
            }
        }else{
            throw ( new EXCEPTIONS.CommandNotFoundError(`Command "${this.command_name}" is not defined`) );
        }
    }
    register(command,callback,usage,description){
        this.context[command] = callback;
        this.helps[command] = {
            description:description,
            usage:usage
        }
    }
    unregistered(command){
        if (this.context.hasOwnProperty(command)){
            delete this.context[command];
        }else{
            throw ( new EXCEPTIONS.CommandNotFoundError(`Command "${this.command_name}" is not defined`) );
        }
        if (this.helps.hasOwnProperty(command)){
            delete this.helps[command];
        }
    }
    exec(command){
        try{
            var lines = command.split("\n");
            for (var i = 0; i < lines.length; i++){
                this.eval(lines[i]);
            }
        }catch(e){
            println(e.stack,"color: #f00;");
        }
        return null;
    }
}
