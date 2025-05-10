//HEADER background changed when scrolled
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 90) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Function to log the total height of the HTML document
function logDocumentHeight() {
  const totalHeight = document.body.scrollHeight; // Get the total height of the body
  console.log("Total height of the document:", totalHeight);
}

logDocumentHeight();
window.addEventListener("resize", logDocumentHeight);

// PARTICLE EFFFECT ALL BODY
window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;

onload = function () {
  setTimeout(init, 0);
};

init = function () {
  canvas = document.getElementById("background-canvas");
  ctx = canvas.getContext("2d");

  onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight;
  };
  onresize();

  mouse = { x: canvas.width / 2, y: canvas.height / 2, out: false };

  canvas.onmouseout = function () {
    mouse.out = true;
  };

  //   canvas.onmousemove = function(e){
  //     var rect = canvas.getBoundingClientRect()
  //     mouse = {
  //       x: e.clientX - rect.left,
  //       y: e.clientY - rect.top,
  //       out: false
  //     }
  //   }

  overlay = document.getElementById("overlay");
  overlay.addEventListener("mousemove", function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      out: false,
    };
  });

  gravityStrength = 10;
  particles = [];
  spawnTimer = 0;
  spawnInterval = 10;
  type = 0;
  requestAnimationFrame(startLoop);
};

newParticle = function () {
  type = type ? 0 : 1;
  particles.push({
    x: mouse.x,
    y: mouse.y,
    xv: type ? 18 * Math.random() - 9 : 24 * Math.random() - 12,
    yv: type ? 18 * Math.random() - 9 : 24 * Math.random() - 12,
    c: type ? "rgb(159, 107, 83, 1)" : "#9f6b53",
    s: type ? 1.5 + 2 * Math.random() : 0.5,
    a: 1,
  });
};

startLoop = function (newTime) {
  time = newTime;
  loop(newTime);
};

loop = function (newTime) {
  draw();
  calculate(newTime);
  requestAnimationFrame(loop);
};

draw = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    ctx.globalAlpha = p.a;
    ctx.fillStyle = p.c;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.s, 0, 2 * Math.PI);
    ctx.fill();
  }
};

calculate = function (newTime) {
  var dt = newTime - time;
  time = newTime;

  if (!mouse.out) {
    spawnTimer += dt < 100 ? dt : 100;
    for (; spawnTimer > 0; spawnTimer -= spawnInterval) {
      newParticle();
    }
  }

  particleOverflow = particles.length - 700;
  if (particleOverflow > 0) {
    particles.splice(0, particleOverflow);
  }

  for (var i = 0; i < particles.length; i++) {
    var p = particles[i];
    if (!mouse.out) {
      x = mouse.x - p.x;
      y = mouse.y - p.y;
      a = x * x + y * y;
      a = a > 100 ? gravityStrength / a : gravityStrength / 100;
      p.xv = (p.xv + a * x) * 0.99;
      p.yv = (p.yv + a * y) * 0.99;
    }
    p.x += p.xv;
    p.y += p.yv;
    p.a *= 0.99;
  }
};

// VIDEO PLAYS WHEN IMG IS HOVERED
// BVID 1
const image = document.querySelector(".wpic1");
const video = document.querySelector(".wvid1");

document.querySelector(".wboxes1").addEventListener("mouseover", () => {
  image.style.display = "none";
  video.style.display = "block";
  video.play();
});

document.querySelector(".wboxes1").addEventListener("mouseout", () => {
  image.style.display = "block";
  video.style.display = "none";
  video.pause();
});

// VID 2
const image2 = document.querySelector(".wpic2");
const video2 = document.querySelector(".wvid2");

document.querySelector(".wboxes2").addEventListener("mouseover", () => {
  image2.style.display = "none";
  video2.style.display = "block";
  video2.play();
});

document.querySelector(".wboxes2").addEventListener("mouseout", () => {
  image2.style.display = "block";
  video2.style.display = "none";
  video2.pause();
});

// VID 3
const image3 = document.querySelector(".wpic3");
const video3 = document.querySelector(".wvid3");

document.querySelector(".wboxes3").addEventListener("mouseover", () => {
  image3.style.display = "none";
  video3.style.display = "block";
  video3.play();
});

document.querySelector(".wboxes3").addEventListener("mouseout", () => {
  image3.style.display = "block";
  video3.style.display = "none";
  video3.pause();
});

// VID 4
const image4 = document.querySelector(".wpic4");
const video4 = document.querySelector(".wvid4");

document.querySelector(".wboxes4").addEventListener("mouseover", () => {
  image4.style.display = "none";
  video4.style.display = "block";
  video4.play();
});

document.querySelector(".wboxes4").addEventListener("mouseout", () => {
  image4.style.display = "block";
  video4.style.display = "none";
  video4.pause();
});

// // SEND EMAIL
// function sendMail() {
//   let parms = {
//     first_name: document.getElementById("first_name").value,
//     last_name: document.getElementById("last_name").value,
//     email: document.getElementById("email").value,
//     contact_number: document.getElementById("contact_number").value,
//     message: document.getElementById("message").value,
//   };
//   emailjs
//     .send("service_pl4m79a", "template_15aikti", parms)
//     .then(alert("Email sent!"));
// }

// EMAIL JS
(function () {
  emailjs.init({
    publicKey: "j1sMopi3DbKjWYIOb",
  });
})();

// RATINGS
const rate = document.querySelector(".rate");
const emoji = document.querySelector(".emoji");
const feedback = document.querySelector(".rate textarea");
const pindutan = document.querySelector(".pindutan");
let = selectedEmoji = "";
emoji.addEventListener("click", (e) => {
  // if (e.target.className.includes("emoji")) return;
  if (!e.target.closest("div")) return;
  selectedEmoji = e.target.textContent;
  feedback.classList.add("feedback--active");
  pindutan.classList.add("pindutan--active");
});

rate.addEventListener("mouseleave", () => {
  feedback.classList.remove("feedback--active");
  pindutan.classList.remove("pindutan--active");
});

// RATING EMAIL
pindutan.addEventListener("click", () => {
  const message = feedback.value.trim();
  if (!message) {
    alert("Please select a rating and write your feedback before sending.");
    return;
  }

  emailjs
    .send("service_pl4m79a", "template_nq9tu13", {
      rating: selectedEmoji,
      message: message,
    })
    .then(
      () => {
        alert("Feedback sent! Thank you.");
        feedback.value = "";
      },
      (error) => {
        alert("Something went wrong: " + JSON.stringify(error));
      }
    );
});

// CONTACT FORM

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.sendForm("service_pl4m79a", "template_15aikti", form).then(
        function () {
          alert("Message sent successfully!");
          form.reset();
        },
        function (error) {
          console.error("Email sending failed:", error);
          alert("Oops! Something went wrong.");
        }
      );
    });
  }
});
