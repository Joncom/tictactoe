ig.module('game.entities.unit')

.requires('impact.entity')

.defines(function() {

    EntityUnit = ig.Entity.extend({

        size: {

            x: 16,

            y: 16

        },

        team: 'x',

        animSheet: new ig.AnimationSheet('media/units.png', 16, 16),

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