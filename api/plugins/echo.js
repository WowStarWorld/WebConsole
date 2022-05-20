context.commands.echo = function(...content){
    println(content.join(" "));
    return "";
}
context.helps.echo = {
    description:"Print the content to the console.",
    usage:"echo [···content]"
}
reload_evaler()