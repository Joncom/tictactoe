ig.module('game.entities.grid')

.requires('impact.entity')

.defines(function() {

    EntityGrid = ig.Entity.extend({

        width: 3,

        height: 3,

        init: function(x, y, settings) {

            this.parent(x, y, settings);

        },

        update: function() {

            this.parent();

        }

    });

});