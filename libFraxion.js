let keyUp = false
let keyDown = false
let keyRight = false
let keyLeft = false



//   équivalent au love.math.random(min, max  )
function RandomINT (pMin,pMax)
{ let w = pMin -1
  let x = 1+ pMax-pMin
  let y = Math.random ()
  let z = 0

while (z< y)
 {
 z += 1/x
w ++

} 

return w
}

/*
function KeyDown (t)
{
 if (t.code =! "F12")  {t.preventDefault()}
if (t.code == "ArrowUp") { keyUp= true}
if (t.code == "ArrowDown") { keyDown= true}
if (t.code == "ArrowLeft") { keyLeft= true}
if (t.code == "ArrowRight") { keyRight= true}
}
*/

function KeyUp (t)
{
  t.preventDefault();
  if (t.code == "ArrowUp") { keyUp= false}
  if (t.code == "ArrowDown") { keyDown= false}
  if (t.code == "ArrowLeft") { keyLeft= false}
  if (t.code == "ArrowRight") { keyRight= false}
  
  


}



class Sprite {

constructor (pSrc, pX=0,pY=0)
{
this.img=new Image ()
this.img.src =  pSrc

this.x= pX
this.y=pY
}
draw(pCtx)
{
pCtx.drawImage(this.img, this.x, this.y);
}

}