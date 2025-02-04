// Get the canvas context
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw a rectangle
ctx.fillStyle = 'blue';
ctx.fillRect(50, 50, 100, 100);

// Draw a circle
ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(200, 200, 50, 0, Math.PI * 2);
ctx.fill();

// Draw some text
ctx.fillStyle = 'black';
ctx.font = '20px Arial';
ctx.fillText('Hello, CodeCraft!', 50, 300);