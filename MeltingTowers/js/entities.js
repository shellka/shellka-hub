//Player Entity

var PlayerEntity = me.ObjectEntity.extend(
{    

        init:function (x, y, settings)
        {

            this.name = "mainplayer";

            // call the constructor
            this.parent(x, y , settings);
            
            // set the walking speed
            this.setVelocity(2.5, 2.5);
			
			// set the walking speed
            this.setFriction(0.5, 0.5);
            
            // adjust the bounding box
            this.updateColRect(13,14,21,6);
            
            // disable gravity
            this.gravity = 0;
            
            //this.firstUpdates = 0;
            this.direction = 'down';
         
            // set the display to follow our position on both axis
            me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
            
            this.addAnimation("stand-down", [0]);
            this.addAnimation("stand-left", [8]);
            this.addAnimation("stand-up", [16]);
            this.addAnimation("stand-right", [24]);
            this.addAnimation("down", [1,2,3,4,5,6,7]);
            this.addAnimation("left", [9,10,11,12,13,14,15]);
            this.addAnimation("up", [17,18,19,20,21,22,23]);
            this.addAnimation("right", [25,26,27,28,29,30,31]);
            this.addAnimation("strike-down", [32,33,34,35,36,37]);
			this.addAnimation("strike-left", [38,39,40,41,42]);
            this.addAnimation("strike-up", [43,44,45,46,47]);
            this.addAnimation("strike-right", [48,49,50,51,52]);
        },


        //    Update player position.
		
        update : function ()
        {
            hadSpeed = this.vel.y != 0 || this.vel.x != 0
			
			if (me.input.isKeyPressed('left') && (!me.input.isKeyPressed('strike')))
            {
				this.animationspeed = me.sys.fps / 20;
                this.vel.x = -this.accel.x * me.timer.tick
                this.setCurrentAnimation('left')
                this.direction = 'left'
            }
            else if (me.input.isKeyPressed('right')&& (!me.input.isKeyPressed('strike')))
            {
				this.animationspeed = me.sys.fps / 20;
                this.vel.x = this.accel.x * me.timer.tick 
                this.setCurrentAnimation('right')
                this.direction = 'right'
            }

            if (me.input.isKeyPressed('up')&& (!me.input.isKeyPressed('strike')))
            {
				this.animationspeed = me.sys.fps / 20;
                this.vel.y = -this.accel.y * me.timer.tick 
                this.setCurrentAnimation('up')
                this.direction = 'up'
            }
            else if (me.input.isKeyPressed('down')&& (!me.input.isKeyPressed('strike')))
            {
				this.animationspeed = me.sys.fps / 20;
                this.vel.y = this.accel.y * me.timer.tick 
                this.setCurrentAnimation('down')
                this.direction = 'down'
            }

			//sword strike
			if (me.input.isKeyPressed('strike'))
			{
				if (this.direction == 'left')
				{
					this.updateColRect(2,26,4,28); // (-2,26,4,28)
					this.animationspeed = me.sys.fps / 35;
					this.setCurrentAnimation('strike-left', 'stand-left')
					me.audio.play("sword_swipe");
				}
				else if (this.direction == 'right')
				{
					this.updateColRect(13,30,4,28);
					this.animationspeed = me.sys.fps / 35;
					this.setCurrentAnimation('strike-right', 'stand-right')
					me.audio.play("sword_swipe");
				}
				else if (this.direction == 'up')
				{
					this.updateColRect(4,26,3,32); //(4,26,-3,32);
					this.animationspeed = me.sys.fps / 35;
					this.setCurrentAnimation('strike-up', 'stand-up')
					me.audio.play("sword_swipe");
				}
				else if (this.direction == 'down')
				{
					this.updateColRect(6,26,21,18);
					this.animationspeed = me.sys.fps / 35;
					this.setCurrentAnimation('strike-down', 'stand-down')
					me.audio.play("sword_swipe");
				}
			}//end sword function

            // check for collision
            res = me.game.collide(this);

            if (res)
            {
                // if we collide with an enemy
                if (res.type == me.game.ENEMY_OBJECT && (!this.flickering))
                {
                    if ((!this.isCurrentAnimation('strike-left')) && (!this.isCurrentAnimation('strike-right')) &&
                        (!this.isCurrentAnimation('strike-up')) &&  (!this.isCurrentAnimation('strike-down')))
                    {
                        this.flicker(45);
                        me.audio.play("link_hurt");
                    }
                } else if ( res.obj instanceof TowerEntity ) {

                    //this.vel.x = this.vel.y = 0;
                    this.setCurrentAnimation('stand-' + this.direction)
                    {
                        if	(this.direction == 'left')
                            this.updateColRect(12,14,21,7);
                        else if (this.direction == 'right')
                            this.updateColRect(13,14,21,6);
                        else if (this.direction == 'up')
                            this.updateColRect(12,14,21,7);
                        else if (this.direction == 'down')
                            this.updateColRect(13,14,21,6);

                        //return false;
                    }

                }
            }

            // check & update player movement
            updated = this.updateMovement();
            
			if (this.isCurrentAnimation('strike-left') || this.isCurrentAnimation('strike-right') ||
			this.isCurrentAnimation('strike-up') || this.isCurrentAnimation('strike-down'))
			{
                updated = true
			}
			else if (this.vel.y == 0 && this.vel.x == 0)
            {
                this.setCurrentAnimation('stand-' + this.direction)
                {
					if	(this.direction == 'left')
						this.updateColRect(12,14,21,7);
					else if (this.direction == 'right')
						this.updateColRect(13,14,21,6);
					else if (this.direction == 'up')
						this.updateColRect(12,14,21,7);
					else if (this.direction == 'down')
						this.updateColRect(13,14,21,6);
					
					if (hadSpeed) 
					{
                       updated = true
					}
				}
            }

            // update animation
            if (updated)
            {
                // update object animation
                this.parent(this);
            }
            return updated;
        }

});

/*----------------
 a Rupee entity
------------------------ */

var RupeeEntity = me.CollectableEntity.extend(
{
    init: function(x, y, settings) 
	{
		this.parent(x, y, settings);
    },

    onCollision: function ( res, obj ) {

        if (!( obj instanceof CollisionTester )) {

            this.parent( res, obj );

        }
    },

	onDestroyEvent : function ()
	{
		me.audio.play("get_rupee");
		me.game.HUD.updateItemValue("score", 2);
		me.audio.play("bank_rupee");
	}
});

var ScoreObject = me.HUD_Item.extend(
{
    init: function(x, y) 
	{
        this.parent(x, y);
        this.font = new me.BitmapFont("32x32_font", 32);
    },
	
    draw: function(context, x, y) 
	{
		this.font.draw(context, "XP:", 100, 10);
		this.font.draw(context, "RUPEES:", 500, 10);
        this.font.draw(context, this.value, this.pos.x + x, this.pos.y + y);
    }
});

/* --------------------------

		Enemy Knight

------------------------ */

var EnemyEntity = me.ObjectEntity.extend(
{
    init: function(x, y, settings) 
	{
        // define this here instead of tiled
        settings.image = "enemy_knight";
        settings.spritewidth = 21;
		this.life = 3;

        // call the parent constructor
        this.parent(x, y, settings);

		this.gravity = 0;
	
        this.startX = x;
        this.endX = x + settings.width - settings.spritewidth;
        // size of sprite

        // make him start from the right
        this.pos.x = x + settings.width - settings.spritewidth;
		this.direction = 'left';
        this.vel.x = -1;

        // walking speed
        this.setVelocity(1,1);

        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
		
		this.addAnimation("down", [0,1,2,3]);
		this.addAnimation("right", [4,5,6,7]);
        this.addAnimation("left", [8,9,10,11]);
        this.addAnimation("up", [12,13,14,15]);
		this.addAnimation("die", [16,17,18,19]);

    },

    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {

        if (!( obj instanceof CollisionTester )) {

            if (this.alive && (!this.flickering)) {
                if(this.life == 1)
                {
                this.alive = false;
                this.collidable = false;
                this.setCurrentAnimation("die");
                this.flicker(10, function (){me.game.remove(this)});
                me.audio.play("enemy_kill");
                me.game.HUD.updateItemValue("xp", 1);
                }
                else
                    {
                    this.vel.x = -this.vel.x
                    this.flicker(35);
                    me.audio.play("enemy_hit");
                    this.life--;
                    }
            }
        }
    },

    // manage the enemy movement
    update: function() 
	{
        // do nothing if not visible
        if (!this.visible && !this.flickering)
            return false;

        if (this.alive) 
		{
            if (this.pos.x <= this.startX) 
			{
				this.vel.x = this.accel.x * me.timer.tick 
				this.setCurrentAnimation("right")
				this.direction = 'right'
            } else if (this.pos.x >= this.endX) 
			{
				this.vel.x = -this.accel.x * me.timer.tick 
				this.setCurrentAnimation("left")
				this.direction = 'left'
            }
        }
		else
		{
			this.vel.x = 0;
		}
				
		// check & update movement
		updated = this.updateMovement();
		
		if (this.vel.x == 1)
        {
			this.setCurrentAnimation(this.direction)
            updated = true
		}

        if (updated) 
		{
            // update the object animation
            this.parent();
        }
        return updated;
    }
});

/* --------------------------

 Player tower

 ------------------------ */

var TowerEntity = me.ObjectEntity.extend(
{

    friendlyCollisionBox: new me.Rect( this.pos, this.width, this.height ),

    init: function(x, y, settings)
    {
        // define this here instead of tiled
        settings.image = "tank";
        settings.spritewidth = 16;
        // call the parent constructor
        this.parent(x, y, settings);

        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ACTION_OBJECT;

        this.updateColRect(-50,116,-50,116);

        this.friendlyCollisionBox.pos = this.pos;
        this.friendlyCollisionBox.width = settings.spritewidth;
        this.friendlyCollisionBox.height = settings.spritewidth;
        this.friendlyCollisionBox.adjustSize( 0, settings.spritewidth, 0, settings.spritewidth );

    },

    /**
     * collision detection
     * @private
     */
    checkCollision : function(obj) {

        var colBox = this.collisionBox;

        if ( obj.type != me.game.ENEMY_OBJECT ) {

            colBox = this.friendlyCollisionBox;

        }

        var res = colBox.collideVsAABB(obj.collisionBox);

        if (res.x != 0 || res.y != 0) {
            // notify the object
            this.onCollision(res, obj);
            // return the type (deprecated)
            res.type = this.type;
            // return a reference of the colliding object
            res.obj  = this;
            return res;
        }
        return null;

    },

    update: function () {

        // check for collision
        res = me.game.collide(this);

        if (res)
        {
            // if we collide with an enemy
            if (res.type == me.game.ENEMY_OBJECT)
            {

            }
        }

    },

    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj)
    {
        if (res)
        {


        }
    }
});


