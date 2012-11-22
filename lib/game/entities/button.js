ig.module('game.entities.button')

.requires('impact.entity')

.defines(function() {

    EntityButton = ig.Entity.extend({

        font: new ig.Font('media/04b03.font.png'),

        text: 'Click Me.',

        init: function(x, y, settings) {

            this.parent(x, y, settings);

            this.size.x = this.font.widthForString( this.text );

            this.size.y = this.font.heightForString( this.text );

        },

        draw: function() {

            this.font.draw(

                this.text,

                this.pos.x - this.offset.x - ig.game._rscreen.x,

                this.pos.y - this.offset.y - ig.game._rscreen.y,

                ig.Font.ALIGN.LEFT

            );

            this.parent();

        },

        update: function() {

            this.parent();

        }

    });

});