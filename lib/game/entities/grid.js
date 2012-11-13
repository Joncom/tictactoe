ig.module('game.entities.grid')

.requires('impact.entity')

.defines(function() {

    EntityGrid = ig.Entity.extend({

        size: {

            x: 48,

            y: 48

        },

        rows: 3,

        columns: 3,

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            // Calculate unit size.
            this.unit = Math.floor( this.size.x / this.rows );

        },

        update: function() {

            this.parent();

        },

        draw: function() {

            // Horizontal Lines
            for( var y = this.unit, x = 0; y < this.unit * this.rows; y = y + this.unit ) {

                //for( x = 0; x < this.unit * this.columns; x = x + this.unit ) {

                    var startX = ig.system.getDrawPos( this.pos.x - ig.game.screen.x + x );

                    var startY = ig.system.getDrawPos( this.pos.y - ig.game.screen.y + y );

                    var endX = ig.system.getDrawPos( this.pos.x + this.size.x - ig.game.screen.x );

                    var endY = startY;

                    ig.system.context.strokeStyle = "red";

                    ig.system.context.beginPath();

                    ig.system.context.moveTo(startX,startY);

                    ig.system.context.lineTo(endX,endY);

                    ig.system.context.stroke();

                    ig.system.context.closePath();

                //}

            }

        }

    });

});