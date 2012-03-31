/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend({

    colTester: new CollisionTester({
        size: 16
    }),
    player: null,

    init : function()
    {
        //call the parent constructor giving true
        //as parameter, so that we use the update & draw functions
        this.parent(true);

        // enable the mouse
        me.input.registerMouseEvent('mousedown', null, this.onMouseDown.bind( this ));
        this.player = me.game.getEntityByName( 'mainPlayer' )[0];

    },

    draw : function( context ) {


    },

    onResetEvent: function()
    {
        me.levelDirector.loadLevel("area01");
        me.audio.playTrack("overworld");
        me.game.addHUD(0, 430, 640, 60);
        me.game.HUD.addItem("score", new ScoreObject(620, 10));
        me.game.HUD.addItem("xp", new ScoreObject(200, 10));
        me.game.sort();
    },

    onDestroyEvent: function()
    {
        me.game.disableHUD();
        me.audio.stopTrack();
    },

    /**
     * callback for mouse click
     */
    onMouseDown : function( ) {

        if ( me.state.isCurrent( me.state.PLAY ) && this.colTester.isEmpty( me.input.mouse.pos, me.game.viewport.pos )) {

            if ( this.player == null )
                this.player = me.game.getEntityByName( 'mainPlayer' )[0];

            var tower = new TowerEntity(  me.input.mouse.pos.x + me.game.viewport.pos.x, me.input.mouse.pos.y + me.game.viewport.pos.y - 16, {});
            me.game.add( tower, this.player.z + 1 );
            me.game.sort();

        }

    }

});
