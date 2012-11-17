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

            // Used to check for winner.
            this.markerCount = {

                x: { row: new Array(), col: new Array() },

                o: { row: new Array(), col: new Array() }

            };

            // Create new table of markers.
            this.clearMarkers();

        },

        // Resets the game by clearing all markers from the grid.
        clearMarkers: function() {

            // Reset row count used to determine winner.
            for( x = 0; x < this.columns; x++ ) {

                for( y = 0; y < this.rows; y++ ) {

                    var initial = 0;

                    this.markerCount.x.row[ y ] = initial;

                    this.markerCount.x.col[ x ] = initial;

                    this.markerCount.o.row[ y ] = initial;

                    this.markerCount.o.col[ x ] = initial;

                }

            }

            for( y = 0; y < this.rows; y++ ) {

                this.markerCount.x[ y ] = 0;

                this.markerCount.o[ y ] = 0;

            }

            if( typeof this.markers === 'undefined' ) {

                this.markers = new Array();

                for( var x = 0; x < this.columns; x++ ) {

                    this.markers[ x ] = new Array();

                    for( var y = 0; y < this.rows; y++ ) {

                        this.markers[ x ][ y ] = undefined;

                    }

                }

            } else {

                for( var x = 0; x < this.markers.length; x++ ) {

                    for( var y = 0; y < this.markers[ x ].length; y++ ) {

                        // Only reset block if it's been set.
                        if( typeof this.markers[ x ][ y ] !== 'undefined' ) {

                            this.markers[ x ][ y ].kill();

                            this.markers[ x ][ y ] = undefined;

                        }

                    }

                }

            }

        },

        update: function() {

            this.parent();

            if( ig.input.pressed( 'mouse1' ) ) {

                // Calculate which block on the grid that the mouse is over.
                var blockX = Math.floor( ( ig.input.mouse.x / this.unit ) - ( this.pos.x / this.unit ) ),
                    blockY = Math.floor( ( ig.input.mouse.y / this.unit ) - ( this.pos.y / this.unit ) );

                // Is block available to be marked?
                if( typeof this.markers[ blockX ][ blockY ] === 'undefined' ) {

                    // Is the block within range?
                    if( blockX >= 0 && blockX < this.columns
                        && blockY >= 0 && blockY < this.rows ) {

                        // Place marker.

                        // Increase counters used to determine winner.

                            this.markerCount[ this.nextTurn ].col[ blockX ]++;

                            this.markerCount[ this.nextTurn ].row[ blockY ]++;

                        var x = this.pos.x + ( blockX * this.unit ),
                            y = this.pos.y + ( blockY * this.unit );

                        this.markers[ blockX ][ blockY ] = ig.game.spawnEntity( EntityMarker, x, y, { team: this.nextTurn } );

                        // Check for winner.
                        if( this.markerCount[ this.nextTurn ].col[ blockX ] >= 3
                            || this.markerCount[ this.nextTurn ].row[ blockY ] >= 3 ) {

                            alert( "Winner found: " + this.nextTurn );

                        }

                        // Alternate turns.
                        this.nextTurn = ( this.nextTurn === 'x' ? 'o' : 'x' );

                    }

                }

            }

        },

        draw: function() {

            // Horizontal Lines
            for( var y = this.unit, x = 0; y < this.unit * this.rows; y = y + this.unit ) {

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

            }

            // Vertical Lines
            for( x = this.unit, y = 0; x < this.unit * this.rows; x = x + this.unit ) {

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

            }

        }

    });

});