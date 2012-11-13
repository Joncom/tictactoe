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

        nextTurn: 'x',

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            // Calculate unit size.
            this.unit = Math.floor( this.size.x / this.rows );

        },

        update: function() {

            this.parent();

            if( ig.input.pressed( 'mouse1' ) ) {

                var unitX = Math.floor( ( ig.input.mouse.x / this.unit ) - ( this.pos.x / this.unit ) ),
                    unitY = Math.floor( ( ig.input.mouse.y / this.unit ) - ( this.pos.y / this.unit ) );

                // Say which box was clicked.
                alert( 'You clicked... ' +  unitX + ', ' + unitY );

            }

        },

        draw: function() {

            // Horizontal Lines
            for( var y = this.unit, x = 0; y < this.unit * this.rows; y = y + this.unit ) {

                //for( x = 0; x < this.unit * this.columns; x = x + this.unit ) {

                    startX = ig.system.getDrawPos( this.pos.x - ig.game.screen.x + x );

                    startY = ig.system.getDrawPos( this.pos.y - ig.game.screen.y + y );

                    endX = ig.system.getDrawPos( this.pos.x + this.size.x - ig.game.screen.x );

                    endY = startY;

                    ig.system.context.strokeStyle = "red";

                    ig.system.context.beginPath();

                    ig.system.context.moveTo(startX,startY);

                    ig.system.context.lineTo(endX,endY);

                    ig.system.context.stroke();

                    ig.system.context.closePath();

                //}

            }

            // Vertical Lines
            for( x = this.unit, y = 0; x < this.unit * this.rows; x = x + this.unit ) {

                //for( x = 0; x < this.unit * this.columns; x = x + this.unit ) {

                    startX = ig.system.getDrawPos( this.pos.x - ig.game.screen.x + x );

                    startY = ig.system.getDrawPos( this.pos.y - ig.game.screen.y + y );

                    endX = startX;

                    endY = ig.system.getDrawPos( this.pos.y + this.size.y - ig.game.screen.y );

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