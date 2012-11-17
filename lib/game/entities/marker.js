ig.module('game.entities.marker')

.requires('impact.entity')

.defines(function() {

    EntityMarker = ig.Entity.extend({

        size: {

            x: 16,

            y: 16

        },

        team: 'x',

        animSheet: new ig.AnimationSheet('media/markers.png', 16, 16),

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            if( this.team === 'x' ) {

                this.addAnim( 'team', 0.1, [ 0 ] );

            } else {

                this.addAnim( 'team', 0.1, [ 1 ] );

            }

        },

        update: function() {

            this.parent();

        }

    });

});