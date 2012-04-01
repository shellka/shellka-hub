var SimpleShotEntity = me.ObjectEntity.extend({

    target: null,

    init: function(x, y, settings, target ) {

        this.target = target;

        // define this here instead of tiled
        settings.image = "rocket";
        settings.spritewidth = 16;

        // call the parent constructor
        this.parent(x, y, settings);

        // make it collidable
        this.collidable = false;

        // make it a enemy object
        this.type = me.game.ACTION_OBJECT;

        this.gravity = 0;
        this.computeAccel( 3 );
        this.vel = this.computeVelocity( this.vel );

        this.flicker(30, function(){

            me.game.remove( this );

        });

    },

    update: function ( ) {

        this.pos.add( this.vel );

        this.parent(this);

        res = me.game.collide(this);

    },

    computeVelocity : function(vel) {

        vel.x = this.accel.x * me.timer.tick;
        vel.y = this.accel.y * me.timer.tick;

        return vel;

    },

    computeAccel: function ( speed ) {

        var dx = (this.pos.x + this.hWidth)  - (this.target.pos.x + this.target.hWidth);
        var dy = (this.pos.y + this.hHeight) - (this.target.pos.y + this.target.hHeight);

        var xVel = -dx / 32;
        var yVel = -dy / 32;
        this.setVelocity( xVel * speed, yVel * speed );

    }

});