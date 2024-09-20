//header background chaned when scrolled
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 90) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ratings
const rate = document.querySelector('.rate');
const emoji = document.querySelector('.emoji');
const feedback = document.querySelector('.rate textarea');
const pindutan = document.querySelector('.pindutan');
emoji.addEventListener('click',(e) =>{
	if(e.target.className.includes('emoji')) return;
	feedback.classList.add('feedback--active');
	pindutan.classList.add('pindutan--active');
})

rate.addEventListener('mouseleave',()=>{
	feedback.classList.remove('feedback--active');
	pindutan.classList.remove('pindutan--active');
})

// particle effect
// const canvas = document.getElementById('background-canvas');
// const about = document.getElementById('About');
// const bop = document.querySelector('.bop');
// const footer = document.querySelector('footer');

// const sections = [about];
// let currentSection = about.nextElementSibling;

// while (currentSection !== bop && currentSection !== footer) {
// sections.push(currentSection);
// currentSection = currentSection.nextElementSibling;
// }
// sections.push(bop); // include the bop section

// const totalHeight = sections.reduce((acc, section) => acc + section.offsetHeight, 0);
// canvas.height = totalHeight;

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

onload = function (){
	setTimeout(init,0)
}

init = function(){
	canvas = document.querySelector('canvas')
	ctx = canvas.getContext('2d')

	onresize = function(){
		canvas.width = document.body.offsetWidth;
		canvas.height = document.body.offsetHeight;
	}
	onresize()

	mouse = {x:canvas.width/2,y:canvas.height/2,out:false}

	canvas.onmouseout = function(){
		mouse.out = true
	}

//   canvas.onmousemove = function(e){
//     var rect = canvas.getBoundingClientRect()
//     mouse = {
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//       out: false
//     }
//   }

	overlay = document.getElementById('overlay')
	overlay.addEventListener('mousemove', function(e) {
		var rect = canvas.getBoundingClientRect()
		mouse = {
		x: e.clientX - rect.left,
		y: e.clientY - rect.top,
		out: false
		}
	})

	gravityStrength = 10
	particles = []
	spawnTimer = 0
	spawnInterval = 10
	type = 0
	requestAnimationFrame(startLoop)
	}

	newParticle = function(){
	type = type?0:1
	particles.push({
		x:mouse.x,
		y:mouse.y,
		xv:type?18*Math.random()-9:24*Math.random()-12,
		yv:type?18*Math.random()-9:24*Math.random()-12,
		c:type?'rgb(159, 107, 83, 1)':'#9f6b53',
		s:type?1.5+2*Math.random():.5,
		a:1
	})
	}

	startLoop = function(newTime){
	time = newTime
	loop(newTime)
	}

	loop = function(newTime){
	draw()
	calculate(newTime)
	requestAnimationFrame(loop)
	}

	draw = function(){
	ctx.clearRect(0,0,canvas.width,canvas.height)
	for(var i=0;i<particles.length;i++){
		var p = particles[i]
		ctx.globalAlpha = p.a
		ctx.fillStyle = p.c
		ctx.beginPath()
		ctx.arc(p.x,p.y,p.s,0,2*Math.PI)
		ctx.fill()
	}
	}

	calculate = function(newTime){
	var dt = newTime-time
	time = newTime

	if(!mouse.out){
		spawnTimer += (dt<100)?dt:100
		for(;spawnTimer>0;spawnTimer-=spawnInterval){
		newParticle()
		}
	}

	particleOverflow = particles.length-700
	if(particleOverflow>0){
		particles.splice(0,particleOverflow)
	}

	for(var i=0;i<particles.length;i++){
		var p = particles[i]
		if(!mouse.out){
		x = mouse.x-p.x
		y = mouse.y-p.y
		a = x*x+y*y
		a = a>100?gravityStrength/a:gravityStrength/100
		p.xv = (p.xv+a*x)*0.99
		p.yv = (p.yv+a*y)*0.99
		}
		p.x += p.xv
		p.y += p.yv
		p.a *= 0.99
	}
}
