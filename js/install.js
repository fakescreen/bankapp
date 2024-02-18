console.log(navigator.userAgent)

document.getElementById('detect').innerHTML = navigator.userAgent

if(navigator.userAgent.match('CriOS'))
{
    document.getElementById('detect').innerHTML = "this is the right browser!"
}