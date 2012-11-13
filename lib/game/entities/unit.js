ig.module('game.entities.unit')

.requires('impact.entity')

.defines(function() {

    EntityUnit = ig.Entity.extend({

        size: {

            x: 16,

            y: 16

        },

        init: function(x, y, settings) {

            this.parent(x, y, settings);


        },

        update: function() {

            this.parent();

        }

    });

});