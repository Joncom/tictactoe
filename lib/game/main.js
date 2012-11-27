ig.module('game.main')

.requires(

'impact.debug.debug',

'impact.game',

'impact.font',

'game.entities.button',

'game.entities.marker',

'game.entities.grid'

)

.defines(function() {

    MyGame = ig.Game.extend({

        // Load a font
        font: new ig.Font('media/04b03.font.png'),

        init: function() {

            // Bind keys.
            ig.input.bind(ig.KEY.MOUSE1, 'mouse1');

            // Create grid entity.
            this.grid = this.spawnEntity( EntityGrid, 16, 16 );

            var game = this;

            // Create reset button.
            this.resetButton = this.spawnEntity(

                EntityButton,

                4,

                4,

                {

                    text: 'Reset Game',

                    action: function() {

                        game.grid.kill();

                        game.grid = game.spawnEntity( EntityGrid, 16, 16 );

                    }

                }

            );

        },

        update: function() {
            // Update all entities and backgroundMaps
            this.parent();

            // Add your own, additional update code here
        },

        draw: function() {
            // Draw all entities and backgroundMaps
            this.parent();

            /*
            // Add your own drawing code here
            var x = ig.system.width / 2,
                y = ig.system.height / 2;

            this.font.draw('It Works!', x, y, ig.Font.ALIGN.CENTER);
            */

            if( this.grid.gameover ) {

                var text = '';

                if( this.grid.winner === 'draw' ) text = 'Draw!';

                else text = this.grid.winner + ' Wins!';

                this.font.draw(

                    text,

                    ig.system.width / 2,

                    ig.system.height - this.font.height,

                    ig.Font.ALIGN.CENTER

                );

            }

        }

    });


    // Start the Game with 60fps, a resolution of 320x240, scaled
    // up by a factor of 2
    ig.main('#canvas', MyGame, 60, 80, 80, 2);

});