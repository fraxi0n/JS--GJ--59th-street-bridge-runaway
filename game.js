let hasPlaySignal = false;

function load()
{
    document.addEventListener("keydown", KeyDown, false)
    document.addEventListener("keyup", KeyUp, false)  
    imgObstacle = new Image ()
    imgObstacle.src = "sprite/obstacle.png" 
    imgRoad = new Image ()
    imgRoad.src = "sprite/road.png" 
    imgNupe = new Image ()
    imgNupe.src = "sprite/nupe.png" 
    imgInterSegment = new Image()
    imgInterSegment.src = "sprite/interSegment.png"
    imgVoitureCasse = new Image()
    imgVoitureCasse.src = "sprite/voiture_crash.png"


    voiture = new Sprite ("sprite/voiture.png",30,V[2] )
    bulle = new Sprite ("sprite/bulle.png",50,20 )
    fondFixe = new Sprite ("sprite/fondFixe.png")
    curseur = new Sprite ("sprite/curseur.png" )
    PlaceCursor()

    /*
    music = new Audio();
    music.src = "audio/NYC1997.ogg";
    music.volume =  1.0;
    music.setAttribute("preload", "auto");
    music.loop = true;

    obsSfx = new Audio();
    obsSfx.src = ("audio/obstacle.wav");
    obsSfx.volume = 0.4;
    obsSfx.loop = false;

    sigSfx = new Audio();
    sigSfx.src = ("audio/signal.wav");
    sigSfx.volume = 0.7;
    sigSfx.loop = false;

    explosionSfx = new Audio();
    explosionSfx.src = ("audio/explosion.wav");
    explosionSfx.volume = 0.6;
    explosionSfx.loop = false;
    */

    InitGame()

    for (let S = 1; S <= 50; S++)
    {
        //console.log ( FindNumSegment(S),FindNumObstacle(S), segment [FindNumSegment(S)].voieDepart, segment[FindNumSegment(S)].nbVoie  ) 
        //console.log ( B01[segment[ FindNumSegment(S)][FindNumObstacle(S)]] [0], B01[segment[FindNumSegment(S)][FindNumObstacle(S)]] [1], B01[segment[FindNumSegment(S)][FindNumObstacle(S)]] [2], B01[segment[FindNumSegment(S)][FindNumObstacle(S)]] [3])
        //console.log ( CalObsPosX(S) )
    }
}


function InitGame()
{   
    voiture.V = 2
    voiture.y = V[voiture.V]
    roadX= 0
    CreateMap()
    distVoiture = 0
    nextObstacle = 1
    hasPlaySignal = false;
    //obsSfx.pause();
    //obsSfx.currentTime = 0;
    //explosionSfx.pause();
    //explosionSfx.currentTime = 0;
}

function ReglageDifficulte(pDifficult = 0)
{
    if (pDifficult != 0) 
    {
    voitureSpeed = TvoitureSpeed [ menu.curseur ]
    distObstacle = TdistObstacle [ menu.curseur ]
    distDepart  =  1.2 * distObstacle// distObstacle*0.5   --1.2
    distSegment = ( nbObstacleSegment+1.5)*distObstacle
    distMessage= voitureSpeed * 2
    }

    nextMessage = []
    for (let S = 1 ; S <= nbSegment; S++ )
    {
        nextMessage[S] = distDepart + distSegment * (S-1) + distSegment * apparitionMessage
    }

}



function CreateMap()
{
//segment =[]

    function CreateSegment (pNumSegment,  pNBvoieSegment, pDepartVoieSegment)
    {
        segment[pNumSegment] = []
        for (let S2 = 1; S2 <= nbObstacleSegment; S2++ )
        {
            segment[pNumSegment][S2] = SG[pNBvoieSegment][pDepartVoieSegment][RandomINT(1, SGindex[pNBvoieSegment])]
            if (pNBvoieSegment == 2 && S2 > 1)
            {
                if (B01[segment[pNumSegment][S2]][pDepartVoieSegment] == B01[segment[pNumSegment][S2-1]][pDepartVoieSegment])
                {
                    segment[pNumSegment][S2] = SG[pNBvoieSegment][pDepartVoieSegment][RandomINT(1, SGindex[pNBvoieSegment])]
                }
            }
            if (pNBvoieSegment >= 3)
            {
                if (SG[pNBvoieSegment][pDepartVoieSegment].PO.includes(segment[pNumSegment][S2]))
                {
                    segment[pNumSegment][S2] = SG[pNBvoieSegment][pDepartVoieSegment][RandomINT(1, SGindex[pNBvoieSegment])]

                    if (pNBvoieSegment == 4)
                    {
                        if  (segment[pNumSegment][S2] == 1||segment[pNumSegment][S2] == 2||segment[pNumSegment][S2] == 3||segment[pNumSegment][S2] == 4)
                        {
                            segment[pNumSegment][S2] = SG[pNBvoieSegment][pDepartVoieSegment][RandomINT(1, SGindex[pNBvoieSegment])]
                        }
                    }
                }
            }
        }  
        segment[pNumSegment].voieDepart = pDepartVoieSegment
        segment[pNumSegment].nbVoie= pNBvoieSegment
    }
        
    for (let S = 1; S <= nbSegment; S++)
    {
        let R2
        /////////-NB de voies 
        let R1 = RandomINT(1,100)
        if (R1 <= 25)
        {
            R1 = 2
        }
        else if (R1 <= 65)
        {
            R1 = 3
        }
        else
        {
            R1 = 4
        }
        // 
        if (S == 1)
        {
            R1 = 4
        }
        else if(segment[S-1].nbVoie == R1)
        { 
            R1 = RandomINT(1,100) 
            if (R1<= 25)
            {
                R1 = 2
            }
            else if (R1 <= 65)
            {
                R1 = 3
            }
            else
            {
                R1 = 4
            }
        }
       
        segment[S].nbVoie = R1
        if (R1 == 2)
        {
            R2 = RandomINT(1,3)
        }
        else if (R1 == 3)
        {
            R2 = RandomINT(1,2)
        }
        else
        {
            R2 = 1
        }
        segment[S].voieDepart = R2
        CreateSegment(S,R1,R2)
    }
//  -------------- SEGMENT D'ARRIVEE VIDE

    segment [nbSegment+1] = []
    for (S = 1; S <= nbObstacleSegment ; S++ )
    {
        segment[nbSegment+1][S]= 0
    } 
        
    segment[nbSegment+1].nbVoie=4
    segment[nbSegment+1].voieDepart=1

}


function BOOM(pRaison)
{
    menu.curseur=1
    menu.statut=3
    PlaceCursor()
    if (pRaison == "obstacle")
    {
        obstacleInstance.val.start();
    }
    if (pRaison == "mine")
    {
        explosionInstance.val.start();
    }
    GameMod = "OVER"
    hasPlaySignal = false;
    // console.log ("BOOM" ,nextObstacle,  Math.floor( distVoiture))
}


function FindNumSegment(pNumObstacle)
{ 
    let x
    if (pNumObstacle%nbObstacleSegment == 0)
    {
        x = Math.floor(pNumObstacle/nbObstacleSegment)
    }
    else
    {
        x = Math.floor(pNumObstacle/nbObstacleSegment) + 1
    }
    return x
}


function FindNumObstacle(pNumObstacle)
{
    let x

    if (pNumObstacle % nbObstacleSegment == 0)
    {
        x = nbObstacleSegment
    }
    else
    {
        x = pNumObstacle % nbObstacleSegment
    }
    return x
}


function CalObsPosX(pNumObstacle)
{
    let value = distDepart+distSegment * (FindNumSegment(pNumObstacle) - 1) + distObstacle * FindNumObstacle(pNumObstacle) - distVoiture
    return value
}


function PlaceCursor()
{
    curseur.x =  menu.I[menu.statut][menu.curseur].x-20
    curseur.y =  menu.I[menu.statut][menu.curseur].y-10
}


function KeyDown(t)   //      ELSE IF A TESTER 
{
    if (t.code != "F12")
    {
        t.preventDefault()
    }

    if (GameMod == "MENU" || GameMod == "OVER" )
    {

        if (GameMod == "OVER")
        {
            explosionInstance.val.stop(FMOD.STUDIO_STOP_ALLOWFADEOUT);
            obstacleInstance.val.stop(FMOD.STUDIO_STOP_ALLOWFADEOUT);
        }

        if (t.code == "ArrowUp")
         {
            menu.curseur -- 
            if (menu.curseur==0){ menu.curseur= menu.I[menu.statut].length -1 }
            PlaceCursor()
         }
        if (t.code == "ArrowDown")
        {
            menu.curseur ++
            if (menu.curseur==menu.I[menu.statut].length){ menu.curseur=1 }
             PlaceCursor()
        }

        //console.log(menu.statut,menu.curseur)

        if (t.code == "Enter")
        {
               if (menu.statut ==1)
               {
                   if(menu.curseur==2)
                   {
                       menu.statut=2
                   }

                   if(menu.curseur==1)
                   {
                       GameMod="TUTO"
                   }

                   if(menu.curseur==3)
                   {
                       GameMod="CREDIT"
                   }

               } else if (menu.statut==2)
               {
                   if(menu.curseur<=3)
                   {
                    
                    if (musicOn==true) {
                          //music.play() 
                          musicInstance.val.start(); 
                        }
                    ReglageDifficulte(menu.curseur)
                    GameMod = "GAME"
                   }
                   if(menu.curseur==4)
                   {
                    menu.statut=1
                    menu.curseur=1
                    PlaceCursor()
                   }
                }
                   else if (menu.statut==3) // GAME OVER
                {
                    
               
                    if(menu.curseur==1)
                    {
                        InitGame()
                        ReglageDifficulte()
                        GameMod = "GAME"
                    }
                    if(menu.curseur==2)
                    {
                        InitGame()
                        GameMod = 
                        "MENU"
                        menu.statut=1
                        menu.curseur=1
                        PlaceCursor()
                    }

                }

        }
            

    }
        
    



    else if (GameMod == "GAME")
    {
        if (t.code == "ArrowUp" && voiture.V > 1)
        {
            voiture.V = voiture.V - 1
         //   voiture.y = V[voiture.V]
        }
        if (t.code == "ArrowDown" && voiture.V < 4)
        {
            voiture.V = voiture.V + 1
          //  voiture.y = V[voiture.V]
        }
    }

   else if(GameMod=="TUTO"||GameMod=="CREDIT")
    {
        if (t.code == "Enter")
        {
            GameMod = "MENU"                
            menu.statut=1
            menu.curseur=1
            PlaceCursor()

        }




    }





} 


function update()
{
    if(GameMod=="TUTO")
    {
        


    }

    if (GameMod == "WIN")
    {
        if(decalWin< voitureSpeed) 

        {
            decalWin += dt*300
            if (decalWin> voitureSpeed)
            {
                decalWin=voitureSpeed
            }
        }


        if (decalWin<1000) {voiture.x+= decalWin/2*dt}

        roadX = roadX+(decalWin- voitureSpeed) * dt

        if (roadX + roadEcartX <= 0)
        {
            roadX = roadX + roadEcartX 
        }

        //distVoiture = distVoiture + voitureSpeed * dt
    }



    if(GameMod == "GAME")

    {
        distVoiture = distVoiture + voitureSpeed * dt
        roadX = roadX- voitureSpeed * dt

     if (voiture.y < V[voiture.V]){
         voiture.y+= voitureSpeed*0.8*dt
         if (voiture.y >= V[voiture.V]){voiture.y = V[voiture.V]}
     }

     

     if (voiture.y > V[voiture.V]){
         voiture.y-= voitureSpeed*0.8*dt
         if (voiture.y <= V[voiture.V]){voiture.y = V[voiture.V]}
     }


        if (roadX + roadEcartX <= 0)
        {
            roadX = roadX + roadEcartX
        }


        if (CalObsPosX(nextObstacle) < 0 - imgObstacle.width)
        {
            nextObstacle = nextObstacle + 1
            if(FindNumSegment(nextObstacle)== nbSegment+1) 
            {
                console.log("WIN")
                GameMod="WIN"
            }
        }
        //---------------------
        if (FindNumObstacle(nextObstacle) != 1 ||  CalObsPosX(nextObstacle)< imgObstacle.width-20  )
        { 
            if (segment[FindNumSegment(nextObstacle)].nbVoie == 2)
            {
                if (segment[FindNumSegment(nextObstacle)].voieDepart == 1)
                {
                    if (voiture.V == 1 || voiture.V == 2)
                    {
                        BOOM("mine")
                    }
                }
                else if (segment[FindNumSegment(nextObstacle)].voieDepart == 2)
                {
                    if (voiture.V == 1 || voiture.V == 4)
                    {
                        BOOM("mine")
                    }
                }
                else
                {
                    if (voiture.V == 3 || voiture.V == 4)
                    {
                        BOOM("mine")
                    }
                }
            }
            else if (segment[FindNumSegment(nextObstacle)].nbVoie == 3)
            {
                if (segment[FindNumSegment(nextObstacle)].voieDepart == 1)
                {
                    if (voiture.V == 1)
                    {
                        BOOM("mine")
                    }
                }
                else
                {
                    if (voiture.V == 4)
                    {
                        BOOM("mine")
                    }
                }
            }
        }
        if (  CalObsPosX(nextObstacle)>0 && CalObsPosX(nextObstacle) < voiture.img.width + 32)
        {
            if (B01[segment[FindNumSegment(nextObstacle)][FindNumObstacle(nextObstacle)]][voiture.V - 1] == 1)
            {
                //console.log ("obstacle ")
                BOOM("obstacle")
            }
        }
    }
    // GAME
}
// fin update







function draw(pCtx)
{
    
    for (let S = 1; S <= 2; S++)
    {
        pCtx.drawImage(imgRoad, roadX, roadY + (S - 1) * roadEcartY * 2)
        pCtx.drawImage(imgRoad, roadX + roadEcartX, roadY + (S - 1) * roadEcartY * 2)
    }
    pCtx.drawImage(imgInterSegment, (FindNumSegment(nextObstacle) - 1) * distSegment + distDepart - distVoiture, roadY)
    fondFixe.draw(pCtx)
    

    for (let S1 = 0; S1 <= 1; S1++)
    {
        //// THIS OBSTACLE 
        for (let S2 = 0; S2 < 4; S2++)
        {
            if (B01[segment[FindNumSegment(nextObstacle + S1)][FindNumObstacle(nextObstacle + S1)]][S2] == 1)
            {
                pCtx.drawImage(imgObstacle, CalObsPosX(nextObstacle + S1), roadY + roadEcartY * (S2))
            } 
        }
    }
        
    if (GameMod == "GAME") {
        voiture.draw(pCtx)
    if (FindNumSegment(nextObstacle) < nbSegment && nextMessage[FindNumSegment(nextObstacle)] > distVoiture &&
            nextMessage[FindNumSegment(nextObstacle)] < distVoiture + distMessage)
    {



        //pCtx.drawImage(imgBulle, 50 ,20 )
        if (!hasPlaySignal)
        {
            signalInstance.val.start();
            hasPlaySignal = true;
        }
        bulle.draw(pCtx)
        // console.log("YOUPI")
        if (segment[FindNumSegment(nextObstacle) + 1].nbVoie == 2)
        {
            if (segment[FindNumSegment(nextObstacle) + 1].voieDepart == 1)
            { 
                pCtx.drawImage(imgNupe, 155, 28)
                pCtx.drawImage(imgNupe, 155, 48)
            }
            else if (segment[FindNumSegment(nextObstacle) + 1].voieDepart == 2)
            {
                pCtx.drawImage(imgNupe, 155, 28)
                pCtx.drawImage(imgNupe, 155, 82)
            }
            else
            {
                pCtx.drawImage(imgNupe, 155, 66)
                pCtx.drawImage(imgNupe, 155, 82)
            }
        }
        else if (segment[FindNumSegment(nextObstacle) + 1].nbVoie == 3)
        {
            if (segment[FindNumSegment(nextObstacle) + 1].voieDepart == 1)
            {
                pCtx.drawImage(imgNupe, 155, 28)         
            }
            else 
                pCtx.drawImage(imgNupe, 155, 82)
            }
     }
     else
     {
         hasPlaySignal = false;
     }

    }
    if (GameMod == "MENU")
    {
        voiture.draw(pCtx)

       // curseur.draw(pCtx)
       curseur.draw(pCtx)

       for (let S = 1; S<= menu.I[menu.statut].length-1; S++ ){
        pCtx.fillText(menu.I[menu.statut][S].txt, menu.I[menu.statut][S].x, menu.I[menu.statut][S].y)
       }


        pCtx.fillText("Arrow to naviguate - ENTER to choose  ", 300, 400 )
    }
    if (GameMod == "OVER")
    { pCtx.drawImage(imgVoitureCasse,voiture.x+10,voiture.y)

        curseur.draw(pCtx)

        pCtx.fillText(menu.I[3][1].txt, menu.I[3][1].x, menu.I[3][1].y)
        pCtx.fillText(menu.I[3][2].txt, menu.I[3][2].x, menu.I[3][2].y)

        pCtx.fillText("SCORE: " + Math.floor(distVoiture / 10), 340, 140)
     //   pCtx.fillText("Press RETURN to restart", 300, 50)
    }

    if (GameMod == "WIN")
    { voiture.draw(pCtx)



        pCtx.fillText("Victoire", 340, 140)
     //   pCtx.fillText("Press RETURN to restart", 300, 50)
    }

    if(GameMod=="TUTO")
    {
        pCtx.fillText("How to play", 300, 250 )
        pCtx.fillText("ENTER to back to menu", 300, 300)


    }

    if(GameMod=="CREDIT")
    {
        pCtx.fillText("Credit", 300, 250 )
        pCtx.fillText("ENTER to back to menu", 300, 300)


    }




}



