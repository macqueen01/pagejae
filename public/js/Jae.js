
document.querySelector('.logo').addEventListener('click', () => {
  window.location.reload()
})

console.log(document.getElementById('navigate'))


document.getElementById('navigate').addEventListener('click', () => {
  window.location.href = window.location.href + '/visitorsjae'
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
      } else {
        console.log('Something went wrong...')
      }
    }
  }
})