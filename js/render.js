/*
 ____  _           __        __         _     _   ____                _           
/ ___|| |_ __ _ _ _\ \      / /__  _ __| | __| | |  _ \ ___ _ __   __| | ___ _ __ 
\___ \| __/ _` | '__\ \ /\ / / _ \| '__| |/ _` | | |_) / _ \ '_ \ / _` |/ _ \ '__|
 ___) | || (_| | |   \ V  V / (_) | |  | | (_| | |  _ <  __/ | | | (_| |  __/ |   
|____/ \__\__,_|_|    \_/\_/ \___/|_|  |_|\__,_| |_| \_\___|_| |_|\__,_|\___|_|   
                                                                                  
*/
class Color{
    constructor (color=Array){
        if (color.constructor === String){
            this.color = color;
            this.type = "hex";
        }else if (color.constructor === Array){
            this.color = color;
            this.type = "rgb";
        }else if (color.constructor === Number){
            this.color = "#"+color.toString(16);
            this.type = "hex";
        }else if (color.constructor === Color){
            this.color = color.color;
            this.type = color.type;
        }else{
            this.color = "#ffffff";
            this.type = "hex";
        }
    }
    isColor(){
        this.ColorRegExp  = /^#[0-9A-F]{6}$/i;
        return this.ColorRegExp.test(this.toHex(this.color));
    }
    toString(){
        return this.toHex().color;
    }
    toHex(){
        if (this.type == "hex"){
            return new Color(this.color);
        }else if (this.type == "int"){
            return new Color("#"+this.color.toString(16));
        }else{
            return new Color(`#${this.color.map(c=>{
                let hex = c.toString(16);
                return hex.length == 1 ? "0"+hex : hex;
            }).join("")}`);
        }
    }
    toRgb(){
        if (this.type == "rgb"){
            return new Color(this.color);
        }else{
            var data = this.color;
        };
        let color = data.toLowerCase();
        if (color.length === 4) {
            let colorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
        }
        let colorChange = [];
        for (let i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return new Color(colorChange);
    }
    getMultiply(color,ratio=0) {
        var c1 = this.toHex().color;
        var c2 = color.toHex().color; 
        ratio = Math.max(Math.min(Number(ratio), 1), 0);
        let r1 = parseInt(c1.substring(1, 3), 16);
        let g1 = parseInt(c1.substring(3, 5), 16);
        let b1 = parseInt(c1.substring(5, 7), 16);
        let r2 = parseInt(c2.substring(1, 3), 16);
        let g2 = parseInt(c2.substring(3, 5), 16);
        let b2 = parseInt(c2.substring(5, 7), 16);
        let r = Math.round(r1 * (1 - ratio) + r2 * ratio);
        let g = Math.round(g1 * (1 - ratio) + g2 * ratio);
        let b = Math.round(b1 * (1 - ratio) + b2 * ratio);
        r = ('0' + (r || 0).toString(16)).slice(-2);
        g = ('0' + (g || 0).toString(16)).slice(-2);
        b = ('0' + (b || 0).toString(16)).slice(-2);
        return new Color('#' + r + g + b);
    }
    valueOf(){
        return parseInt(this.toHex().color.substring(1),16);
    }
}

raw_console.log(
`%c
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                                                                   
                                                      ;i:                                          
                                                  ;iiiii:                                          
                                              iiiiiiiiii:                                          
                                         ,iiiiiiiiiiiiii:                                          
                                     ,iiiiiiiiiiiiiiiiii:                                          
                                 :iiiiiiiiiiiiiiiiiiiii;                                           
                                 iiiiiiiiiiiiiiiiii;                                               
                                 iiiiiiiiiiiiii:    i,  ,1,                                        
                                 iiiiiiiiii,     i. 1,  ,1111i:                                    
                                 iiiiiiiii    i: 1. 1,  ,11iiiiiii:                                
                                 iiiiiiiiii   i: 1. 1,  ,iiiiiiiii;                                
                                 iiiiiiiiii   1: 1. 1,  ,iiiiiiiii;                                
                                 iiiiiiiiii   1: 1. 1,  ,iiiiiiiii;                                
                                 iiiiii111i   1: 1. i,   :iiiiiiii;                                
                                     i1111i   1: i.     ;iiiiiiiii;                                
                                         ii   1,    iiiiiiiiiiiiii;                                
                                               .iiiiiiiiiiiiiiiiii;                                
                                           ,iiiiiiiiiiiiiiiiiii;;:.                                
                                           iiiiiiiiiiiiiiii;;;                                     
                                           iiiiiiiiiiii;;:                                         
                                           iiiiiiii;;:                                             
                                           iiii;;,                                                 
                                           ;;,                                                     
                                                                                                                                                                                                                                                                    
`," color:aqua;");
raw_console.log(`%c
                                      StarWorld Studio 
`,"color:aqua;");
