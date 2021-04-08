function adressCheck() {
  if (document.getElementById('input-streetAdress').addEventListener('submit', true)) {
    document.getElementById('input-lat').style.display = "none"
    document.getElementById('input-long').style.display = "none"
  } else {
    document.getElementById('input-lat').style.display = "block"
    document.getElementById('input-long').style.display = "block"
  }
}