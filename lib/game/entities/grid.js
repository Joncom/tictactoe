ig.module('game.entities.grid')

.requires('impact.entity')

.defines(function() {

    EntityGrid = ig.Entity.extend({

        size: {

            x: 48,

            y: 48

        }

        width: 3,

        height: 3,

        init: function(x, y, settings) {

            this.parent(x, y, settings);

        },

        update: function() {

            this.parent();

        },

        draw: function() {

            var startX = ig.system.getDrawPos(this.pos.x - ig.game.screen.x);

            var startY = ig.system.getDrawPos(this.pos.y - ig.game.screen.y);

            var endX = ig.system.getDrawPos(this.target.x-ig.game.screen.x);

            var endY = ig.system.getDrawPos(this.target.y-ig.game.screen.y);

            ig.system.context.strokeStyle = "red";

            ig.system.context.beginPath();

            ig.system.context.moveTo(startX,startY);

            ig.system.context.lineTo(endX,endY);

            ig.system.context.stroke();

            ig.system.context.closePath();

        }

    });

});