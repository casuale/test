let particles = [],
	eat = [];

function Eat(x, y, r, s) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.s = s;

	this.update = ()=>{

		con.beginPath();
		con.fillStyle = 'red';
		con.arc(this.x, this.y, this.r, 0, Math.PI * 2);
		con.fill();
	}
}

setInterval(()=>{
	if (particles.length <= 10)
		particles.push(new Particle(256, 256, random(10, 10), random(-1, 2), random(-1, 2)));
	if (eat.length <= 10)
		eat.push(new Eat(random(0, cw), random(0, ch), random(10, 10)));

}, 800);

function update() {
	fillRect(0, 0, cw, ch, '#000');

	for (var i = 0; i < (particles.length > eat.length ? particles.length : eat.length); i++) {
		if (particles.length >= eat.length)
			particles[i].update(eat);
		if (eat.length >= particles.length)
			eat[i].update();
		
		if (particles[i].y >= ch || particles[i].y <= 0 || particles[i].x <= 0 || particles[i].x >= cw)
			particles.splice(i, 1);
	}

	requestAnimationFrame(update);
}
	update();