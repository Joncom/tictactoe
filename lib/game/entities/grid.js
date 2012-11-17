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

            // Build empty table for storing units.

            this.units = {};

            for( var i = 0; i < this.columns; i++ ) {

                this.units[ i ] = {};

            }

        },

        update: function() {

            this.parent();

            if( ig.input.pressed( 'mouse1' ) ) {

                var unitX = Math.floor( ( ig.input.mouse.x / this.unit ) - ( this.pos.x / this.unit ) ),
                    unitY = Math.floor( ( ig.input.mouse.y / this.unit ) - ( this.pos.y / this.unit ) );

                if( unitX >= 0 && unitX < this.columns ) {

                    if( unitY >= 0 && unitY < this.rows ) {

                        // Say which box was clicked.
                        //alert( 'You clicked... ' +  unitX + ', ' + unitY );

                        var x = this.pos.x + ( unitX * this.unit ),
                            y = this.pos.y + ( unitY * this.unit );

                        ig.game.spawnEntity( EntityMarker, x, y, { team: this.nextTurn } );

                        // Keep track of who played where.
                        this.units[ unitX ][ unitY ] = this.nextTurn;

                        // Alternate turns.
                        this.nextTurn = ( this.nextTurn === 'x' ? 'y' : 'x' );

                    }

                }

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