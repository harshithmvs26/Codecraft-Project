from browser import document, html, timer

# Clear the previous content
document["livePreview"].clear()

# Create a new canvas
canvas = html.CANVAS(width=400, height=400)
document["livePreview"] <= canvas

# Get the context
ctx = canvas.getContext('2d')

# Ball properties
x = 50
y = 50
radius = 20
dx = 2  # Change in x (speed in x direction)
dy = 2  # Change in y (speed in y direction)

# Animation function
def draw():
    global x, y, dx, dy
    ctx.clearRect(0, 0, canvas.width, canvas.height)  # Clear the canvas

    # Draw the ball
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 3.14 * 2)
    ctx.fillStyle = 'orange'
    ctx.fill()
    ctx.closePath()

    # Update ball position
    x += dx
    y += dy

    # Bounce off the walls
    if x + radius > canvas.width or x - radius < 0:
        dx = -dx  # Reverse direction
    if y + radius > canvas.height or y - radius < 0:
        dy = -dy  # Reverse direction

# Start the animation
timer.set_interval(draw, 20)  # Call draw every 20 milliseconds