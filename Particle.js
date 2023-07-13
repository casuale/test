class Particle {
	constructor(x, y, r, vx, vy, image) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = 'rgb(' + frandom(0, 255) + ',' + frandom(0, 255) + ',' + frandom(0, 255) + ')';
		this.vel = {x:0,y:0};
		this.speed = frandom(3, 5);
		this.distance = 50;
		this.a = 0;
	}
	update(eat) {
		this.x += this.vel.x * this.speed;
		this.y += this.vel.y * this.speed;
		for (var i = 0; i < eat.length; i++) {
			if (getDistance(this.x, eat[i].x) < this.distance) {
				this.a = Math.atan2(this.y - eat[i].y, this.x - eat[i].x);
				this.vel.x += Math.sin(this.a);

			}

		}

		drawImage(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2, 'o.png', this.a);
	}
}