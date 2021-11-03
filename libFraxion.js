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


class ImageManager {
  constructor() {
    this.lstPaths = []
    this.LstImages = []
    this.loadedImageCount = 0
    this.index=[]
  }

  add(pPathImage, pIndex) {

    this.lstPaths.push  ( pPathImage)
    this.index [ pIndex ] = this.lstPaths.length -1
  }

  /*getTotalImages() {
    return this.loadedImageCount
  }*/

  draw(pIndex ,pX , pY ,pCtx)
  {
    pCtx.drawImage(this.LstImages[ this.index [ pIndex ] ] , pX, pY)
  }

  getH(pIndex)
  {
    return this.LstImages[ this.index [ pIndex ] ] .height
  }

  getL(pIndex)
  {
    return this.LstImages[ this.index [ pIndex ] ] .length
  }



  removeFirstImage(){
    this.LstImages. shift ()
  }

  start() 
  {
    console.log ("START")

    for (let S = 0; S< this.lstPaths.length; S++)
    {
      let img = new Image()
      img.onload = this.imageLoaded.bind(this)
      img.src = this.lstPaths[S]
      this.LstImages.push (img)
    }

  }

  imageLoaded(e) 
  {
    this.loadedImageCount++
    if (this.loadedImageCount == this.lstPaths.length)
    {
      GameMod = 1  /* Clic to Play */
      //console.log( "lets GO !!!" )
    }


  }
}


