
    $.widget("acme.color", {
        options: {
            colors: [
                '#f00',
                '#0f0',
                '#00f'
            ], 

            selectedIndex:0,
            targetSelector: "body"

        },
        
        _create: function(){
            var _this = this;
            this.element.bind('click', function(e) {
                _this._update(e);
            });

        },
    
        _setOption: function (key, value) {
    
        },
    
        _update: function() {
            var selectedColor = this.options.colors[this.options.selectedIndex];
            $(this.options.targetSelector).css("background-color", selectedColor);
            this.options.selectedIndex = (this.options.selectedIndex + 1) % this.options.colors.length; 
            e.preventDefault();
        }, 
    
        _destroy: function() {

        }
    
    }); 

