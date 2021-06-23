let hasPlaySignal = false;
let hasFadeOut = false;

function load()
{
    document.addEventListener("keydown", KeyDown, false)
    document.addEventListener("keyup", KeyUp, false)  
    imgObstacle = new Image ()
    imgObstacle.src = "sprite/obstacle.png" 
    imgMainRoad = new Image ()
    imgMainRoad.src = "sprite/route.png" 
    imgBarriere = new Image ()
    imgBarriere.src = "sprite/barriere.png" 




    imgNupe = new Image ()
    imgNupe.src = "sprite/nupe.png" 
    imgInterSegment = new Image()
    imgInterSegment.src = "sprite/interSegment.png"

    voiture.img[1] = new Image()
    voiture.img[2] = new Image()
    voiture.img[1].src = "sprite/voiture1.png"
    voiture.img[2].src = "sprite/voiture2.png"
    
    voitureCrash.img[1] = new Image()
    voitureCrash.img[2] = new Image()
    voitureCrash.img[1].src = "sprite/crash1.png"
    voitureCrash.img[2].src = "sprite/crash2.png"

for (let S=1; S<=9;S++)
{
    voitureBoom.img[S] = new Image()
    voitureBoom.img[S].src = "sprite/boom/boom"+S+".png"
}

/*
    voitureBoom.img[1] = new Image()
    voitureBoom.img[2] = new Image()
    voitureBoom.img[3] = new Image()
    voitureBoom.img[1].src = "sprite/boom/boom1.png"
    voitureBoom.img[2].src = "sprite/boom/boom1.png"
    voitureBoom.img[3].src = "sprite/boom/boom1.png"
    voitureBoom.img[4].src = "sprite/boom/boom1.png"
    voitureBoom.img[5].src = "sprite/boom/boom1.png"
    voitureBoom.img[6].src = "sprite/boom/boom1.png"
    voitureBoom.img[7].src = "sprite/boom/boom1.png"
    voitureBoom.img[8].src = "sprite/boom/boom1.png"
    voitureBoom.img[9].src = "sprite/boom/boom1.png"
*/

    voiture.x=30
    voiture.y=V [voiture.V]

    //voiture = new Sprite ("sprite/voiture.png",30,V[2] )
    bulle = new Sprite ("sprite/bulle.png",50,20 )
    fond1 = new Sprite ("sprite/fond1.png")
    fond2 = new Sprite ("sprite/fond2.png", 944 )
    curseur = new Sprite ("sprite/curseur.png" )
    PlaceCursor()

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
    fond1.x=0
    fond2.x=944
    frameVoiture = 1
    CreateMap()
    distVoiture = 0
    nextObstacle = 1
    hasPlaySignal = false;
    hasFadeOut = false;
}

function ReglageDifficulte(pDifficult = 0)
{
    if (pDifficult != 0) 
    {
    voitureSpeed = TvoitureSpeed [ pDifficult]
    distObstacle = TdistObstacle [ pDifficult]
    
    distDepart  =  1.30 * distObstacle
    distSegment = ( nbObstacleSegment+1)*distObstacle
    distMessage= voitureSpeed * 2
    distTotal = distSegment*nbSegment + distDepart-(9*70)



    console.log (distTotal)
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
    frameVoiture=1
    timer=0.5
    raisonBoom = pRaison
    menu.curseur=1
    menu.statut=1
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
                if (menu.statut==2)
               {
                   if(menu.curseur<=3)
                   {
                    
                    if (musicOn==true) {
                          musicInstance.val.start(); 
                        }
                    ReglageDifficulte(menu.curseur)
                    GameMod = "GAME"
                   }
                }
                   else if (menu.statut==1) // GAME OVER
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
                        menu.statut=2
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
    if(GameMod == "OVER")
    {
        if (timer>0)
        {
            timer-= dt
            menu.curseur=1
            PlaceCursor()
        }


        if(raisonBoom == "obstacle")
        {
            
            if (frameVoiture<2)
            {
                frameVoiture += 12*dt
            } 

        }

        if(raisonBoom == "mine")
        {
            if (voiture.y < V[voiture.V]){
                voiture.y+= voitureSpeed*1*dt
                if (voiture.y >= V[voiture.V]){voiture.y = V[voiture.V]}
            }
       
            
            if (voiture.y > V[voiture.V]){
                voiture.y-= voitureSpeed*1*dt
                if (voiture.y <= V[voiture.V]){voiture.y = V[voiture.V]}
            }

            if (voiture.y == V[voiture.V]){
                if (frameVoiture<=6)
                {
                    frameVoiture += 13*dt
                }
                else
                {
                    frameVoiture += 8*dt
                }
                
            }



            
            if (frameVoiture>=10)
            {
                frameVoiture-= 3
            } 
        }

    }

    if (GameMod == "WIN")
    {
        timer -= dt
        if(timer<=0)
        {
            GameMod="MENU"
            menu.statut=2
            voiture.x=30
            decalWin=0
            InitGame()
        }
        //fade out music
        if (!hasFadeOut)
        {
            musicInstance.val.setParameterByID(fadeOutID, true, false);
            hasFadeOut = true;
        }

        if(decalWin< voitureSpeed) 
        {
            decalWin += dt*300
            if (decalWin> voitureSpeed)
            {
                decalWin=voitureSpeed
            }
        }

        voiture.x+= decalWin/2*dt

        roadX = roadX+(decalWin- voitureSpeed) * dt

        if (roadX + roadEcartX <= 0)
        {
            roadX = roadX + roadEcartX 
        }
        

        //distVoiture = distVoiture + voitureSpeed * dt
    }



    if(GameMod == "GAME")

    {

        frameVoiture += 5*dt
        if(frameVoiture>=
            3 )
        {
            frameVoiture-=2
        }

        fond1.x-= (1887-1200)/(distTotal/voitureSpeed )*dt
        fond2.x-= (1887-1200)/(distTotal/voitureSpeed )*dt



        distVoiture = distVoiture + voitureSpeed * dt
        roadX = roadX- voitureSpeed * dt

        if (roadX + roadEcartX <= 0)
        {
            roadX = roadX + roadEcartX
        }

     if (voiture.y < V[voiture.V]){
         voiture.y+= voitureSpeed*1*dt
         if (voiture.y >= V[voiture.V]){voiture.y = V[voiture.V]}
     }

     

     if (voiture.y > V[voiture.V]){
         voiture.y-= voitureSpeed*1*dt
         if (voiture.y <= V[voiture.V]){voiture.y = V[voiture.V]}
     }





        if (CalObsPosX(nextObstacle) < 0 - 156/* obstacle width*/  )
        {
            nextObstacle = nextObstacle + 1
            if(FindNumSegment(nextObstacle)== nbSegment+1) 
            {
                GameMod="WIN"
                timer = 5
            }
        }
        //---------------------
        if (FindNumObstacle(nextObstacle) != 1 ||  CalObsPosX(nextObstacle)< /*imgObstacle.width*/156 -20  )
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
        if (  CalObsPosX(nextObstacle)>0 && CalObsPosX(nextObstacle) < 156 /*voiture.width*/+ 32)
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
    

    fond1.draw(pCtx)
    fond2.draw(pCtx)

    //pCtx.drawImage (voitureCrash.img[2], 0,0)

    for (let S= 0; S<=3; S++)
    {
        pCtx.drawImage(imgMainRoad, roadX+ (S*roadEcartX), roadY-128  )
    }


    pCtx.drawImage(imgInterSegment, (FindNumSegment(nextObstacle) - 1) * distSegment + distDepart +distObstacle*0.8 - distVoiture, roadY)

    

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


        pCtx.fillText("remaining distance" , 900, 50)
        pCtx.fillText( Math.floor( (distTotal - distVoiture) /70  )+" m", 974 , 70)


        pCtx.drawImage(voiture.img[Math.floor(frameVoiture) ],voiture.x,voiture.y+Math.floor(Math.floor(frameVoiture-1)*2))


      //  voiture.draw(pCtx)

    if (FindNumSegment(nextObstacle) < nbSegment && nextMessage[FindNumSegment(nextObstacle)] > distVoiture && nextMessage[FindNumSegment(nextObstacle)] < distVoiture + distMessage)
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
                pCtx.drawImage(imgNupe, 155+95, 28+12)
                pCtx.drawImage(imgNupe, 155+95, 58+12)
            }
            else if (segment[FindNumSegment(nextObstacle) + 1].voieDepart == 2)
            {
                pCtx.drawImage(imgNupe, 155+95, 28+12)
                pCtx.drawImage(imgNupe, 155+95, 118+12)

            }
            else
            {
                pCtx.drawImage(imgNupe, 155+95, 88+12)
                pCtx.drawImage(imgNupe, 155+95, 118+12)
            }
        }
        else if (segment[FindNumSegment(nextObstacle) + 1].nbVoie == 3)
        {
            if (segment[FindNumSegment(nextObstacle) + 1].voieDepart == 1)
            {
                pCtx.drawImage(imgNupe, 155+95, 28+12)         
            }
            else 
                pCtx.drawImage(imgNupe, 155+95, 118+12)
            }
     }
     else
     {
         hasPlaySignal = false;
     }

    }
    if (GameMod == "MENU")
    {
        ctx.fillStyle = 'rgb(255, 255, 255)';
        pCtx.drawImage(voiture.img[1],voiture.x,voiture.y)

        //pCtx.drawImage(voiture.img[1],voiture.x,voiture.y)
       // voiture.draw(pCtx)

       // curseur.draw(pCtx)
       curseur.draw(pCtx)

       for (let S = 1; S<= menu.I[menu.statut].length-1; S++ )
       {
        pCtx.fillText(menu.I[menu.statut][S].txt, menu.I[menu.statut][S].x, menu.I[menu.statut][S].y)
       }


        pCtx.fillText("Arrow to naviguate - ENTER to choose  ", 400, 50 )
    }
    if (GameMod == "OVER")
    { 
        if(raisonBoom=="obstacle")
        {
            pCtx.drawImage(voitureCrash.img[Math.floor(frameVoiture) ],voiture.x+10,voiture.y)
        }
        if(raisonBoom=="mine")
        {
            pCtx.drawImage(voitureBoom.img[Math.floor(frameVoiture) ],voiture.x,voiture.y+86 - voitureBoom.img[Math.floor(frameVoiture) ].height  )
        }
        


        curseur.draw(pCtx)

        pCtx.fillText("Arrow to naviguate - ENTER to choose  ", 400, 50 )
        pCtx.fillText(menu.I[1][1].txt, menu.I[1][1].x, menu.I[1][1].y)
        pCtx.fillText(menu.I[1][2].txt, menu.I[1][2].x, menu.I[1][2].y)

        pCtx.fillText("remaining distance" , 900, 50)
        pCtx.fillText( Math.floor( (distTotal - distVoiture) /70  )+" m", 974 , 70)

     //   pCtx.fillText("Press RETURN to restart", 300, 50)
    }

    if (GameMod == "WIN")
    { 
        //voiture.draw(pCtx)
        pCtx.drawImage(voiture.img[1],voiture.x,voiture.y)


        pCtx.fillText("Mission complete", 340, 140)
     //   pCtx.fillText("Press RETURN to restart", 300, 50)
    }

}

