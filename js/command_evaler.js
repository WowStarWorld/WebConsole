function command_evaler(context={},command=""){
    if (command.substring(0,2) == "//"){
        return "";
    }
    contexts = context;
    command = command;
    command_args = command.split(" ");
    for (var i = 0; i < command_args.length; i++){
        command_args[i] = command_args[i].replaceAll("<","&lt;").replaceAll(">","&gt;");
    }
    command_name = command_args[0];
    command_args = command_args.slice(1,command_args.length);
    if (contexts.hasOwnProperty(command_name)){
        return contexts[command_name](...command_args);
    }else{
        throw ReferenceError("Command not found");
    }
}
