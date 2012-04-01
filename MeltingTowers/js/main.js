// game resources
var g_resources = 
[
{name: "ForestSet",	type: "image",	src: "data/sprite/ForestSet.png"},
{name: "046-Cave04",	type: "image",	src: "data/sprite/046-Cave04.png"},
{name: "link",	type: "image",	src: "data/sprite/link.png"},
{name: "enemy",	type: "image",	src: "data/sprite/enemy.png"},
{name: "enemy_knight",	type: "image",	src: "data/sprite/enemy_knight.png"},
{name: "rup_spin",	type: "image",	src: "data/sprite/rup_spin.png"},
{name: "32x32_font",type: "image",  src: "data/sprite/32x32_font.png"},
{name: "link_font",type: "image",  src: "data/sprite/link_font.png"},  
{name: "link_title",type: "image",src: "data/sprite/link_title.png"},
{name: "tank",type: "image",src: "data/sprite/Tank-16x16.png"},
{name: "rocket",type: "image",src: "data/sprite/rocket-fly.png"},
{name: "get_rupee", type: "audio",  src: "data/audio/", channel: 1},
{name: "bank_rupee", type: "audio", src: "data/audio/", channel: 1},
{name: "sword_swipe", type: "audio", src: "data/audio/", channel: 1},
{name: "enemy_hit", type: "audio",  src: "data/audio/", channel: 2},
{name: "enemy_kill", type: "audio",  src: "data/audio/", channel: 2},
{name: "link_hurt", type: "audio",  src: "data/audio/", channel: 2},  
{name: "overworld",  type: "audio", src: "data/audio/", channel: 3},
{name: "area01",	type: "tmx",	src: "data/area01.tmx"},
{name: "area02",	type: "tmx",	src: "data/area02.tmx"},
{name: "cave01",	type: "tmx",	src: "data/cave01.tmx"}
];


var jsApp	= 
{	
	// Initialize the jsApp
	
	onload: function()
	{

        // enable dirty rectangle
        //me.sys.dirtyRegion = true;
        //me.debug.renderDirty = true;
        // collision box debug
        me.debug.renderHitBox = true;

		// video
		if (!me.video.init('jsapp', 1200, 600, true, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
			return;
		}
				
		// "audio"
		me.audio.init("mp3");
		
		// i love the music & SFX, but when
		// developing it can quickly become boring !
		//me.audio.disable();
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(g_resources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
	},
	
	// Callback when everything is loaded
	
	loaded: function ()
	{
        me.sys.fps = 50;
        me.sys.enableWebGL = false;

		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.MENU, new TitleScreen());

		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());

		// set a global fading transition for the screen
		me.state.transition("fade", "#FFFFFF", 15);

		// add our player entity in the entity pool
		me.entityPool.add("mainPlayer", PlayerEntity);
        me.entityPool.add("SimpleShotEntity", SimpleShotEntity);
        me.entityPool.add("TowerEntity", TowerEntity);
		me.entityPool.add("RupeeEntity", RupeeEntity);
		me.entityPool.add("EnemyEntity", EnemyEntity);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT,     "left");
        me.input.bindKey(me.input.KEY.RIGHT,    "right");
        me.input.bindKey(me.input.KEY.UP,     "up");
        me.input.bindKey(me.input.KEY.DOWN,    "down");
        // bind X key, and disable key repeating (2nd parameter)
        me.input.bindKey(me.input.KEY.X,        "strike", true);

        // start the game
        me.state.change(me.state.MENU);
	}

}; // jsApp

// Title Screen

var TitleScreen = me.ScreenObject.extend(
{
    init: function() 
	{
        this.parent(true);
        this.title = null;
        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;
        //this.scroller = "AN ALL NEW MINI-ADVENTURE FOR LINK!";
        this.scrollerpos = 1;
    },

    onResetEvent: function() 
	{
        if (this.title == null) 
		{
            this.title = me.loader.getImage("link_title");
            this.font = new me.BitmapFont("32x32_font", 32);
            this.font.set("left");
            this.scrollerfont = new me.BitmapFont("32x32_font", 32);
            this.scrollerfont.set("left");
        }
        this.scrollerpos = 640;
        this.scrollertween = new me.Tween(this).to({scrollerpos: -2200},10000).onComplete(this.scrollover.bind(this)).start();
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    },

    scrollover: function() 
	{
        this.scrollerpos = 640;
        this.scrollertween.to({scrollerpos: -2500}, 10000).onComplete(this.scrollover.bind(this)).start();
    },
    update: function() 
	{
        if (me.input.isKeyPressed('enter')) 
		{
            me.state.change(me.state.PLAY);
        }
        return true;
    },

    draw: function(context) 
	{
        context.drawImage(this.title, 0, 0);
        this.font.draw(context, "PRESS ENTER", 150, 440);
        //this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
    },

    onDestroyEvent: function() 
	{
        me.input.unbindKey(me.input.KEY.ENTER);
        this.scrollertween.stop();
    }

    }); //end Title Screen



//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});
