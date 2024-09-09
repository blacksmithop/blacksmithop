const position = { x: 0, y: 0 }

var positionMap = {}


interact('.draggable').draggable({
  listeners: {
    move(event) {
      var iconName = event.target.classList[5]
      if (!(iconName)) {
        iconName = event.target.classList[1]
      }
      console.log(`Moving file ${iconName}`)

      if (!(positionMap.hasOwnProperty(iconName))) {
        positionMap[iconName] = { x: 0, y: 0 }
        event.target.style.transform =
          `translate(${positionMap[iconName].x}px, ${positionMap[iconName].y}px)`
      }
      else {

        positionMap[iconName].x += event.dx
        positionMap[iconName].y += event.dy

        event.target.style.transform =
          `translate(${positionMap[iconName].x}px, ${positionMap[iconName].y}px)`
      }
    },
  }
})
