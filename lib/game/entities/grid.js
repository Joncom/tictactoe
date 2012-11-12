ig.module('game.entities.grid')

.requires('impact.entity')

.defines(function() {

    EntityGrid = ig.Entity.extend({

        init: function(x, y, settings) {

            this.parent(x, y, settings);

        },

        update: function() {

            this.parent();

        }

    });

});