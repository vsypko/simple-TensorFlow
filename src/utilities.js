export const drawRect = (detections, ctx) => {
  detections.forEach((prediction) => {
    const [x, y, width, height] = prediction['bbox']
    const title = prediction['class']
    let color = 'green'

    if (title.charAt(0) === 'p') {
      color = 'purple'
    }
    if (title.charAt(0) === 'b') {
      color = 'blue'
    }
    if (title.charAt(0) === 'c') {
      color = 'cyan'
    }

    ctx.strokeStyle = color
    ctx.font = '18px Roboto'
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.fillText(title, x, y)
    ctx.rect(x, y, width, height)
    ctx.stroke()
  })
}
