var CollisionTester = Object.extend({

    size: 0,
    pos: new me.Vector2d( 0, 0 ),
    collisionBox: new me.Rect( this.pos, this.size, this.size),

    init: function ( settings ) {

        this.size = settings.size;

    },

    isEmpty: function ( mousePos, screenPos ) {

        this.pos.x = mousePos.x + screenPos.x;
        this.pos.y = mousePos.y + screenPos.y;
        this.collisionBox.pos = this.pos;
        this.collisionBox.width = this.size;
        this.collisionBox.height = this.size;

        var collision = me.game.collisionMap.checkCollision(this.collisionBox, {x :1, y: 1 });

        if ( collision.xtile != undefined || collision.ytile != undefined )
            return false;

        var res = me.game.collide( this );

        if ( res ) {

            if ( res.obj instanceof TowerEntity ) {



            }

            return false;

        } else
            return true;

    }

});