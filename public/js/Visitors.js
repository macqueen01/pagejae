  getComments()
  
  document.querySelector('.logo').addEventListener('click', () => {
    window.location.reload()
  })

  document.getElementById('submitForm').addEventListener('submit', (e) => {
    e.preventDefault()
    var name = encodeURIComponent(e.target.name.value)
    var message = encodeURIComponent(e.target.message.value)
    if (!name || !message) {
      return alert('Please insert valid Name or Comment')
    } else {
      e.target.name.value = ''
      e.target.message.value = ''
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/visitorsjae/messages')
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(JSON.stringify({name : name, message : message}))
      xhr.onload = () => {
        if (xhr.status == 200) {
          console.log('Comment sent successfully !')
          getComments()
        } else {
          console.log('Something went wrong...')
        }
      }
    }
  })

  function getComments() {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', '/visitorsjae/messages')
    xhr.send()
    xhr.onload = () => {
      if (xhr.status == 200) {
        document.getElementById("commentLeftContainer").innerHTML = ''
        document.getElementById("commentRightContainer").innerHTML = ''
        console.log('comment log recieved')
        var cells = JSON.parse(xhr.responseText)
        cells.map((cell) => {
          if (cells.indexOf(cell) % 2 ==0) {
            document.getElementById("commentLeftContainer")
              .innerHTML += '<div role="listitem" class="w-dyn-item"><a data-ix="project-list-thumb" class="home-work-item w-inline-block">' +
                '<h4 class="work-title">' + decodeURIComponent(cell.name) + '</h4>' +
                '<h7 style="font-weight: 100;"> posted at ' + cell.createdAt.toString() + '</h7>' +
                '<h4 class="project-description" style="color: gray;">' + decodeURIComponent(cell.message) + '</h4>' +
                '</a></div>'
          } else {
            document.getElementById("commentRightContainer")
              .innerHTML += '<div role="listitem" class="w-dyn-item"><a data-ix="project-list-thumb" class="home-work-item w-inline-block">' +
                '<h4 class="work-title">' + decodeURIComponent(cell.name) + '</h4>' +
                '<h7 style="font-weight: 100;"> posted at ' + cell.createdAt.toString() + '</h7>' +
                '<h4 class="project-description" style="color: gray;">' + decodeURIComponent(cell.message) + '</h4>' +
                '</a></div>'
          }
        })
      }
    }

  }