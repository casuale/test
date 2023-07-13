let c = document.getElementById('c'),
	con = c.getContext("2d"),
	cw = c.width = 512,
	ch = c.height = 512,
	keyCode = {q: 81, w: 87, e: 69, r: 82, a: 65, s: 83, d: 68, space: 32, Control: 17, Shift: 16, Alt: 18, Enter: 13, n1: 49, n2: 50, n3: 51, n4: 52, n5: 53, n6: 54, n7: 55, n8: 56, n9: 57, n0: 48},
	keyDown = {
		q: false,
		w: false,
		e: false,
		r: false,
		a: false,
		s: false,
		d: false,
		space: false,
		Control: false,
		Shift: false,
		Alt: false,
		Enter: false,
		n1: false,
		n2: false,
		n3: false,
		n4: false,
		n5: false,
		n6: false,
		n7: false,
		n8: false,
		n9: false,
		n0: false,
	},
	keyUp = {
		q: false,
		w: false,
		e: false,
		r: false,
		a: false,
		s: false,
		d: false,
		space: false,
		Control: false,
		Shift: false,
		Alt: false,
		Enter: false,
		n1: false,
		n2: false,
		n3: false,
		n4: false,
		n5: false,
		n6: false,
		n7: false,
		n8: false,
		n9: false,
		n0: false,
	},
	keydown = false,
	keyup = false,
	mouse = {
		down: false,
		x: 0,
		y: 0,
		downX: undefined,
		downY: undefined,
		upX: undefined,
		upY: undefined,
		scroll: 1,
	};

function rectCollision(type, x1, y1, w1, h1, x2, y2, w2, h2) {
	if(type == 'basic') {
		if (x1 + w1 >= x2 & x1 <= x2 + w2 & y1 + h1 >= y2 & y1 <= y2 + h2) 
			return true;
		else return false;
	}
	else {
		if (type.x + type.w >= x1 & type.x <= x1 + w1 & type.y + type.h >= y1 & type.y <= y1 + h1) 
			return true;
		else return false;
	}
}
function circleAndBox(circle, box) {
  // get box closest point to circle center by clamping
  let x = Math.max(box.x, Math.min(circle.x, box.x + box.w));
  let y = Math.max(box.y, Math.min(circle.y, box.y + box.h));

  // this is the same as isPointInsidecircle
  let distance = Math.sqrt(
    (x - circle.x) * (x - circle.x) +
      (y - circle.y) * (y - circle.y)
  );

  return distance < circle.r;
}
function circleAndBoxDistance(circle, box) {
  // get box closest point to circle center by clamping
  const x = Math.max(box.x, Math.min(circle.x, box.x + box.w));
  const y = Math.max(box.y, Math.min(circle.y, box.y + box.h));

  // this is the same as isPointInsidecircle
  const distance = Math.sqrt((x - circle.x) * (x - circle.x));

  return distance;
}
function circleAndCircle(circle1, circle2) {
  // we are using multiplications because it's faster than calling Math.pow
  const distance = Math.sqrt(
    (circle1.x - circle2.x) * (circle1.x - circle2.x) +
      (circle1.y - circle2.y) * (circle1.y - circle2.y) +
      (circle1.z - circle2.z) * (circle1.z - circle2.z)
  );
  return distance < circle1.radius + circle2.radius;
}
function isPointInsideSphere(point, sphere) {
  // we are using multiplications because is faster than calling Math.pow
  const distance = Math.sqrt(
    (point.x - sphere.x) * (point.x - sphere.x) +
      (point.y - sphere.y) * (point.y - sphere.y) +
      (point.z - sphere.z) * (point.z - sphere.z)
  );
  return distance < sphere.radius;
}
function getDistance(x1, x2) {
	return Math.sqrt(Math.pow(x1 - x2, 2));
}
function random(min, max) {
	return Math.random() * max + min;
}
function frandom(min, max) {
	return Math.round(Math.random() * max + min);
}
function toRadians(deg) {
	return deg / 180 * Math.PI;
}
function toDeg(a) {
	return a * 180 / Math.PI;
}

function fillRect(x, y, w, h, c, a, rotatePoint) {

	con.save();
	if (rotatePoint) {
		con.translate(rotatePoint.x, rotatePoint.y);
		con.rotate((a / 180 * Math.PI));
		con.translate(-rotatePoint.x, -rotatePoint.y);
	}
	else {
		con.translate(x + w / 2, y + h / 2);
		con.rotate((a / 180 * Math.PI));
		con.translate(-x + -w / 2, -y + -h / 2);
	}

	con.fillStyle = c;
	con.fillRect(x, y, w, h);
	con.fill();
	con.restore();
}

function strokeRect(x, y, w, h, s, c, a) {
	
	con.save();

	con.translate(x + w / 2, y + h / 2);
	con.rotate((a * 180 / Math.PI));
	con.translate(-x + -w / 2, -y + -h / 2);

	con.strokeStyle = c;
	con.lineWidth = s;
	con.strokeRect(x, y, w, h);
	con.stroke();
	con.restore();
}

// function arc(x, y, r, c, type, s, a) {
	
// 	con.save();

// 	con.translate(x, y);
// 	con.rotate((a / 180 * Math.PI));
// 	con.translate(-x, -y);

// 	if (type == 'fill') {
// 		con.fillStyle = c;
// 		con.beginPath();
// 		con.arc(x, y, r, 0, Math.PI * 2);
// 		con.fill();
// 	}
// 	if (type == 'stroke') {
// 		con.strokeStyle = c;
// 		con.lineWidth = s;
// 		con.arc(x, y, r, 0, Math.PI * 2);
// 		con.stroke();
// 	}
// 	con.restore();
// }
function fillArc(x, y, r, c) {
	con.fillStyle = c;
	con.beginPath();
	con.arc(x, y, r, 0, Math.PI * 2);
	con.fill();
}
function fillText(text, x, y, font, color) {
	con.fillStyle = color;
	con.font = font;
	con.fillText(text, x, y);
}
function drawImage(x, y, w, h, src, a) {
	let img = new Image();
	img.src = src;
	con.imageSmoothingEnabled = false;
	con.save();

	con.translate(x + w / 2, y +h / 2);
	con.rotate((a / 180 * Math.PI));
	con.translate(-x - w / 2, -y - h / 2);

	con.drawImage(img, x, y, w, h);
	
	con.restore();
}
function drawSprite(x1, y1, w1, h1, x, y, w, h, src, a, rotatePoint) {
	let img = new Image();
	img.src = src;
	con.imageSmoothingEnabled = false;
	con.save();

	if (rotatePoint) {
		con.translate(rotatePoint.x, rotatePoint.y);
		if (rotatePoint.radians) {
			con.rotate(a);
		}
		else 
			con.rotate((a / 180 * Math.PI));
		
		con.translate(-rotatePoint.x, -rotatePoint.y);
	}
	else {
		con.translate(x, y);
		con.rotate((a / 180 * Math.PI));
		con.translate(-x, -y);
	}

	con.drawImage(img, x1, y1, w1, h1, x, y, w, h);
	
	con.restore();
}
class SpriteImage{
	constructor(p) {
		this.img = new Image();
		this.t = 0;
		this.contextImage = c.getContext('2d');
		this.p = p;
	}
	update(x, y, w, h, src, a) {
		this.contextImage.imageSmoothingEnabled = false;
		this.img.src = src;

		if (this.t > this.p.fps) {
			this.p.frame++;
			if (this.p.left & this.p.play) {
				this.p.pos.x += this.p.s.w;
				if (this.p.pos.x + this.p.s.w > this.p.max.x)
					this.p.pos.x = this.p.oldPos.x,
					this.p.ended = true,
					this.p.frame = 0;
			}
			else if (this.p.top & this.p.play) {
				this.p.pos.y += this.p.s.h;
				if (this.p.pos.y + this.p.s.h > this.p.max.y)
					this.p.pos.y = this.p.oldPos.y,
					this.p.ended = true,
					this.p.frame = 0;
			}
			this.t = 0;
		}
		this.t++;

		con.save();

		con.translate(x + w / 2, y + h / 2);
		con.rotate((a / 180 * Math.PI));
		con.translate(-x - w / 2, -y - h / 2);
		
		this.contextImage.save();
		this.contextImage.translate(x, y);
		if (this.p.mirrorLeft)
			this.contextImage.scale(-1, 1);
		else
			this.contextImage.scale(1, 1);

		this.contextImage.translate(-x, -y);
		this.contextImage.drawImage(this.img, this.p.pos.x, this.p.pos.y, this.p.s.w, this.p.s.h, this.p.mirrorLeft ? x - w : x, y, w, h);
		this.contextImage.restore();

		
		con.restore();
	}
}
function repeatImage(x, y, w, h, src, a) {
	let img = new Image(),
		contextImage = c.getContext('2d');
		img.src = src;

		
		con.save();

		con.translate(x + w / 2, y + h / 2);
		con.rotate((a / 180 * Math.PI));
		con.translate(-x - w / 2, -y - h / 2);
		
		con.fillStyle = contextImage.createPattern(img, 'repeat');
		con.fillRect(x, y, w, h);
		con.fill();
		
		con.restore();
	}
document.addEventListener('mousemove', function(e) {
	var canvasRect = c.getBoundingClientRect();
	mouse.x = (e.clientX - canvasRect.left) * window.devicePixelRatio / 2;
	mouse.y = (e.clientY - canvasRect.top) * window.devicePixelRatio / 2;
	
	if (mouse.down) {
		mouse.downX = (e.clientX - canvasRect.left) * window.devicePixelRatio / 2;
		mouse.downY = (e.clientY - canvasRect.top) * window.devicePixelRatio / 2;
	}
	// console.log(mouse.x);
});
document.addEventListener('mousedown', function(e) {
	var canvasRect = c.getBoundingClientRect();
	mouse.down = true;
	mouse.downX = (e.clientX - canvasRect.left) * window.devicePixelRatio / 2;
	mouse.downY = (e.clientY - canvasRect.top) * window.devicePixelRatio / 2;
	
});
document.addEventListener('mouseup', function(e) {
	var canvasRect = c.getBoundingClientRect();
	mouse.down = false;
	mouse.upX = (e.clientX - canvasRect.left) * window.devicePixelRatio / 2;
	mouse.upY = (e.clientY - canvasRect.top) * window.devicePixelRatio / 2;
	
});
document.addEventListener('wheel', function(e) {
	mouse.scroll -= e.deltaY * -0.01;
	if (mouse.scroll > 14)
		mouse.scroll = 1;
	if (mouse.scroll < 1)
		mouse.scroll = 14;

	// mouse.scroll = Math.min(Math.max(0, mouse.scroll), 13);
});
document.addEventListener('keyup', function(e) {
	keydown = false;
	keyup = true;

	switch(e.keyCode) {
		case keyCode.q:
			keyUp.q = true;
			keyDown.q = false;
		break;
		case keyCode.w:
			keyUp.w = true;
			keyDown.w = false;
		break;
		case keyCode.e:
			keyUp.e = true;
			keyDown.e = false;
		break;
		case keyCode.r:
			keyUp.r = true;
			keyDown.r = false;
		break;
		case keyCode.a:
			keyUp.a = true;
			keyDown.a = false;
		break;
		case keyCode.s:
			keyUp.s = true;
			keyDown.s = false;
		break;
		case keyCode.d:
			keyUp.d = true;
			keyDown.d = false;
		break;
		case keyCode.space:
			keyUp.space = true;
			keyDown.space = false;
		break;
		case keyCode.Shift:
			keyUp.Shift = true;
			keyDown.Shift = false;
		break;
		case keyCode.Alt:
			keyUp.Alt = true;
			keyDown.Alt = false;
		break;
		case keyCode.Control:
			keyUp.Control = true;
			keyDown.Control = false;
		break;
		case keyCode.Enter:
			keyUp.Enter = true;
			keyDown.Enter = false;
		break;
		case keyCode.n1:
			keyUp.n1 = true;
			keyDown.n1 = false;
		break;
		case keyCode.n2:
			keyUp.n2 = true;
			keyDown.n2 = false;
		break;
		case keyCode.n3:
			keyUp.n3 = true;
			keyDown.n3 = false;
		break;
		case keyCode.n4:
			keyUp.n4 = true;
			keyDown.n4 = false;
		break;
		case keyCode.n5:
			keyUp.n5 = true;
			keyDown.n5 = false;
		break;
		case keyCode.n6:
			keyUp.n6 = true;
			keyDown.n6 = false;
		break;
		case keyCode.n7:
			keyUp.n7 = true;
			keyDown.n7 = false;
		break;
		case keyCode.n8:
			keyUp.n8 = true;
			keyDown.n8 = false;
		break;
		case keyCode.n9:
			keyUp.n9 = true;
			keyDown.n9 = false;
		break;
		case keyCode.n0:
			keyUp.n0 = true;
			keyDown.n0 = false;
		break;

	}
});document.addEventListener('keydown', function(e) {
	keydown = true;
	keyup = false;

	switch(e.keyCode) {
		case keyCode.q:
			keyDown.q = true;
			keyUp.q = false;
		break;
		case keyCode.w:
			keyDown.w = true;
			keyUp.w = false;
		break;
		case keyCode.e:
			keyDown.e = true;
			keyUp.e = false;
		break;
		case keyCode.r:
			keyDown.r = true;
			keyUp.r = false;
		break;
		case keyCode.a:
			keyDown.a = true;
			keyUp.a = false;
		break;
		case keyCode.s:
			keyDown.s = true;
			keyUp.s = false;
		break;
		case keyCode.d:
			keyDown.d = true;
			keyUp.d = false;
		break;
		case keyCode.space:
			keyDown.space = true;
			keyUp.space = false;
		break;
		case keyCode.Shift:
			keyDown.Shift = true;
			keyUp.Shift = false;
		break;
		case keyCode.Alt:
			keyDown.Alt = true;
			keyUp.Alt = false;
		break;
		case keyCode.Control:
			keyDown.Control = true;
			keyUp.Control = false;
		break;
		case keyCode.Enter:
			keyDown.Enter = true;
			keyUp.Enter = false;
		break;
		case keyCode.n1:
			keyDown.n1 = true;
			keyUp.n1 = false;
		break;
		case keyCode.n2:
			keyDown.n2 = true;
			keyUp.n2 = false;
		break;
		case keyCode.n3:
			keyDown.n3 = true;
			keyUp.n3 = false;
		break;
		case keyCode.n4:
			keyDown.n4 = true;
			keyUp.n4 = false;
		break;
		case keyCode.n5:
			keyDown.n5 = true;
			keyUp.n5 = false;
		break;
		case keyCode.n6:
			keyDown.n6 = true;
			keyUp.n6 = false;
		break;
		case keyCode.n7:
			keyDown.n7 = true;
			keyUp.n7 = false;
		break;
		case keyCode.n8:
			keyDown.n8 = true;
			keyUp.n8 = false;
		break;
		case keyCode.n9:
			keyDown.n9 = true;
			keyUp.n9 = false;
		break;
		case keyCode.n0:
			keyDown.n0 = true;
			keyUp.n0 = false;
		break;

	}
});