const colors = [
    '#9f6b53', 
    '#c2a474', 
    '#a07f5d', 
    '#7f5642', 
    '#c8ac90'
  ]
  
  const bubbles = Array.from(document.querySelectorAll('.bubble'));
  
  let randomColor = [];
  
  for (let i = 0; i < bubbles.length; i++) {
    randomColor.push(~~(Math.random()*colors.length));
  }
  
  bubbles.map((bubble, index) => {
    bubble.style.backgroundColor = colors[randomColor[index]];
  })