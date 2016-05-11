var TextItem = (function(window, undefined) { 
	
	function TextItem(p_obj) {
		this.item = new createjs.Container();
		this.parent = p_obj.parent;
	}

	var _ = TextItem.prototype;

	_.addText = function(p_text, p_font, p_color) {

		var offset = {x:0, y:0};
		var text = new createjs.Text(p_text, p_font, p_color);
		var rect = text.getBounds();
        
        text.textBaseline = "middle";

        this.item.addChild(this.createHighlight(rect));
        this.item.addChild(text);
        this.item.addChild(this.areaClick(rect));
        text.lineHeight = 210;

        this.item.regX = rect.width / 2;
        this.item.regY = rect.height / 2;

        this.item.cursor = "pointer";


        this.item.x = 426;
        this.item.y = 170;
        
        this.item.scaleX = 0.5;
        this.item.scaleY = 0.5;

        this.item.addEventListener("onContainerSelect", 
            (function(evt){
                this.parent.current_item = this;
                this.parent.updateSelect();
                ref.sliderTamano.slider("value", this.item.scaleX * 100)
            }).bind(this));

        this.item.addEventListener("mousedown",
            (function(evt) {
                this.item.dispatchEvent("onContainerSelect");
                // var item = evt.target.getChildAt(1);    
                var borde = this.item.getChildAt(0);
                borde.visible = true;
                //$("#escala").slider("value",item.parent.scaleX);
                // add a handler to the event object's onMouseMove callback
                // this.movieclip will be active until the user releases the mouse button:
                offset = {x:this.item.x - evt.stageX, y:this.item.y - evt.stageY};
                
            }).bind(this));

        this.item.addEventListener("pressmove", (function(evt) {
            var target = this.item;
            target.x = evt.stageX + offset.x;
            target.y = evt.stageY + offset.y;
        }).bind(this));
		return this.item;
	}

	_.areaClick = function(rect) {
		// var border = new createjs.Shape();
  //       border.graphics.beginStroke("#000");
  //       border.graphics.setStrokeStyle(.5);
  //       border.graphics.beginFill(createjs.Graphics.getRGB(255,31,154));
  //       border.snapToPixel = true;
  //       border.graphics.drawRect(0, rect.height/2, rect.width, rect.height);
  //       border.alpha = 0.01;
  //       return border;

        var bounds = rect;
        var pad = 10;
        var bg = new createjs.Shape();
        bg.graphics.beginFill("#114")
        bg.graphics.drawRect(rect.x-pad+bounds.x, -rect.height/2 - pad*2, bounds.width+pad*2, bounds.height*1.5+pad*2);
        bg.alpha = 0.01;
        return bg
	}

	_.createHighlight = function(rect)
    {
        var border = new createjs.Shape();
        var pad = 10;
        border.graphics.beginStroke("#000");
        border.graphics.setStrokeStyle(.5);
        border.graphics.beginFill(createjs.Graphics.getRGB(148,84,162));
        border.snapToPixel = true;
        border.graphics.drawRect(rect.x-pad+rect.x, -rect.height/2 - pad*2, rect.width+pad*2, rect.height*1.5+pad*2);
        border.visible = false;
        border.alpha = .3;
        return border;
    }

	return TextItem;
})(window, undefined);