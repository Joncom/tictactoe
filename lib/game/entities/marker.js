ig.module('game.entities.marker')

.requires('impact.entity')

.defines(function() {

    EntityMarker = ig.Entity.extend({

        size: {

            x: 62,

            y: 62

        },

        player: 'x',

        animSheet: new ig.AnimationSheet('media/markers.png', 62, 62),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            if( this.player === 'x' ) {

                this.addAnim( 'x', 0.1, [ 0 ] );

            } else {

                this.addAnim( 'o', 0.1, [ 1 ] );

            }

        },

        update: function() {

            this.parent();

        }

    });

});