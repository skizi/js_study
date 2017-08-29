
export class utils{

    static getSize( element:any ){

        var oldStyle = element.style.display;
        if( oldStyle == 'none' ) element.style.display = 'block';
        var rect = element.getBoundingClientRect();
        if( oldStyle == 'none' ) element.style.display = oldStyle;

        var w = rect.width;
        var h = rect.height;

        return { width:w, height:h };

    }

}
