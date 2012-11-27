ig.module('game.entities.grid')

.requires('impact.entity')

.defines(function() {

    EntityGrid = ig.Entity.extend({

        size: {

            x: 48,

            y: 48

        },

        // Size of n by n board.
        n: 3,

        nextTurn: 'x',

        moveCount: 0,

        winner: undefined,

        gameover: false,

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            // Calculate unit size.
            this.unit = Math.floor( this.size.x / this.n );

            // Create new table of markers.
            this.clearMarkers();

        },

        // Resets the game by clearing all markers from the grid.
        clearMarkers: function() {

            moveCount = 0;

            if( typeof this.markers === 'undefined' ) {

                this.markers = new Array();

                for( var x = 0; x < this.n; x++ ) {

                    this.markers[ x ] = new Array();

                    for( var y = 0; y < this.n; y++ ) {

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

        // Be sure to clean up children entities also.
        kill: function() {

            for( var x = 0; x < this.markers.length; x++ ) {

                for( var y = 0; y < this.markers[ x ].length; y++ ) {

                    if( typeof this.markers[ x ][ y ] !== 'undefined' ) {

                        this.markers[ x ][ y ].kill();

                    }

                }

            }

            this.parent();

        },

        endGame: function( winner ) {

            this.winner = winner;

            this.gameover = true;

        },

        update: function() {

            this.parent();

             if( ig.input.pressed( 'mouse1' )
              && typeof this.winner === 'undefined' ) {

                var player = this.nextTurn;

                // Calculate which block on the grid that the mouse is over.
                var blockX = Math.floor( ( ig.input.mouse.x / this.unit ) - ( this.pos.x / this.unit ) ),
                    blockY = Math.floor( ( ig.input.mouse.y / this.unit ) - ( this.pos.y / this.unit ) );

                // Is the block within range?
                if( blockX >= 0 && blockX < this.n
                    && blockY >= 0 && blockY < this.n ) {

                    // Is block available to be marked?
                    if( typeof this.markers[ blockX ][ blockY ] === 'undefined' ) {

                        // Place marker.

                        this.moveCount++;

                        var x = this.pos.x + ( blockX * this.unit ),
                            y = this.pos.y + ( blockY * this.unit );

                        this.markers[ blockX ][ blockY ] = ig.game.spawnEntity( EntityMarker, x, y, { player: player } );

                        // Check for win.

                            // Check column.
                            for( i = 0; i < this.n; i++ ) {

                                if( typeof this.markers[ blockX ][ i ] === 'undefined' ) {

                                    break;

                                }

                                if( this.markers[ blockX ][ i ].player != this.nextTurn ) {

                                    break;

                                }

                                if( i == this.n - 1 ) {

                                    this.endGame( player );

                                }

                            }

                            // Check row.
                            for( i = 0; i < this.n; i++ ) {

                                if( typeof this.markers[ i ][ blockY ] === 'undefined' ) {

                                    break;

                                }

                                if( this.markers[ i ][ blockY ].player != this.nextTurn ) {

                                    break;

                                }

                                if( i == this.n - 1 ) {

                                    this.endGame( player );

                                }

                            }

                            // Check diagonal.
                            if( blockX == blockY ) {

                                // We're on a diagonal

                                for( i = 0; i < this.n; i++ ) {

                                    if( typeof this.markers[ i ][ i ] === 'undefined' ) {

                                        break;

                                    }

                                    if( this.markers[ i ][ i ].player != this.nextTurn ) {

                                        break;
                                    }

                                    if( i == this.n - 1) {

                                        this.endGame( player );

                                    }

                                }

                            }

                            // Check anti-diagonal.
                            for( i = 0; i < this.n; i++ ) {

                                if( typeof this.markers[ i ][ ( this.n - 1 ) - i ] === 'undefined' ) {

                                    break;

                                }

                                if( this.markers[ i ][ ( this.n - 1 ) - i ].player != this.nextTurn ) {

                                    break;

                                }

                                if( i == this.n - 1 ) {

                                    this.endGame( player );

                                }

                            }

                            // Check draw.
                            if( this.moveCount == ( Math.pow( this.n, 2 ) - 1 ) ) {

                                this.endGame( 'draw' );

                            }

                        // Alternate turns.
                        this.nextTurn = ( this.nextTurn === 'x' ? 'o' : 'x' );

                    }

                }

            }

        },

        draw: function() {

            // Horizontal Lines
            for( var y = this.unit, x = 0; y < this.unit * this.n; y = y + this.unit ) {

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
            for( x = this.unit, y = 0; x < this.unit * this.n; x = x + this.unit ) {

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