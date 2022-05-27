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
class Style{
    constructor(style=Array||Style||String||Object){
        if (style.constructor === Array){
            this.style = style;
        }else if (style.constructor === Style){
            this.style = style.style;
        }else if (style.constructor == String){
            this.style = [style];
        }else if (style.constructor == Object){
            this.style = style;
        }else{
            this.style = [String(style)];
        };
    };
    toString(){
        if (this.style.constructor === Array){
            return this.style.join("\n");
        }else if (this.style.constructor === Object){
            return Object.keys(this.style).map(key=>{
                return key+":"+String(this.style[key])+";";
            }).join("\n");
        }
    };
    toObject(){
        if (this.style.constructor === Array){
            var content = this.toString().replaceAll("\n","").split(";");
            var obj = {};
            for (let i = 0; i < content.length; i++) {
                let key = content[i].split(":")[0];
                let value = content[i].split(":").slice(1).join(":");
                if (!(content[i].split(":").length < 2)) {
                    obj[key] = value;
                }
            }
            return obj;
        }else if (this.style.constructor === Object){
            return this.style;
        }
    };
    toArray(){
        if (this.style.constructor === Array){
            return this.style;
        }else if (this.style.constructor === Object){
            return Object.keys(this.style).map(key=>{
                return key+":"+String(this.style[key])+";";
            });
        }
    };
    appendElement(element=document.documentElement){
        element.style.cssText = Object.assign(element.style,this.toObject()).cssText;
        return element;
    };
    mergeStyle(style=Array||Style||String||Object){
        return new Style(Object.assign(this.toObject(),style.toObject()));
    }
    toThis(){
        return this;
    }
    toHTML(tagName="tagName",formatter=String){
        var element = document.createElement(tagName);
        element.innerHTML = (formatter(this));
        return element;
    }
}

class StringRegularExpression{
    constructor(str){
        this.String = String(str);
    }
    toString(){return String(this.String);}
    is_URL(){var RegExp = /^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;return RegExp.test(this.String);}
    is_Email(){var RegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,5})+$/;return RegExp.test(this.String);}
    is_Number(){    var RegExp = /^[0-9]+$/;    return RegExp.test(this.String);}
    is_Alpha(){var RegExp = /^[a-zA-Z]+$/;return RegExp.test(this.String);}
    is_Symbol(){var RegExp = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;return RegExp.test(this.String);}
    is_Name(){var RegExp = /^[a-zA-Z_][a-zA-Z0-9_]*$/;return RegExp.test(this.String);}
    is_HTML(){var RegExp = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;return RegExp.test(this.String);}
    is_JSON(){var RegExp = /^[\{\[].*[\}\]]$/;return RegExp.test(this.String);}
    is_Date(){var RegExp = /^\d{4}-\d{2}-\d{2}$/;return RegExp.test(this.String);}
    is_FileName(){var RegExp = /^[^\\\/\:\*\?\"\<\>\|]+$/;return RegExp.test(this.String);}
    is_Entity(){var RegExp = /^&(#)?[a-zA-Z0-9]+;$/;return RegExp.test(this.String);}
    is_ASCII(){var RegExp = /^[\x00-\x7F]+$/;return RegExp.test(this.String);}
    is_Unicode(){var RegExp = /^[\u0000-\uFFFF]+$/;return RegExp.test(this.String);}
    is_Base64(){var RegExp = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;return RegExp.test(this.String);}
    is_Hex(){var RegExp = /^[0-9a-fA-F]+$/;return RegExp.test(this.String);}
    is_MD5(){var RegExp = /^[a-fA-F0-9]{32}$/;return RegExp.test(this.String);}
    is_SHA1(){var RegExp = /^[a-fA-F0-9]{40}$/;return RegExp.test(this.String);}
    is_NumberHead(){var RegExp = /^[0-9]+.*/;return RegExp.test(this.String);}
    is_CommandName(){var str = this.String;var specialChars= "~·`!！$￥#%^…&*()（）—-_=+[]{}【】、|\\;:；：'\"“‘,/<>《》?？，。";var len=specialChars.length;for ( var i = 0; i < len; i++){if (str.indexOf(specialChars.substring(i,i+1)) != -1){return false;}} if (!this.is_NumberHead()) return true;}
    $_GET(name){var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");var r = this.String.substr(1).match(reg);if(r!=null)return  unescape(r[2]); return null;}
    $_HASH(){var reg = new RegExp("#(.*)$");var r = this.String.match(reg);if(r!=null)return  unescape(r[1]); return null;}
}
