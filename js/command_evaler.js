class commandEvaler{
    constructor(context){
        this.context = context;
    }
    eval(command){
        if (command.substring(0,2) == "//"){
            return "";
        }
        this.command = command;
        this.command_args = this.command.split(" ");
        for (var i = 0; i < this.command_args.length; i++){
            this.command_args[i] = this.command_args[i].replaceAll("<","&lt;").replaceAll(">","&gt;");
        }
        this.command_name = this.command_args[0];
        this.command_args = this.command_args.slice(1,this.command_args.length);
        if (this.context.hasOwnProperty(this.command_name)){
            return this.context[this.command_name](...this.command_args);
        }else{
            throw ReferenceError("Command not found");
        }
    }
}
