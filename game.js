let hasPlaySfx = false;

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

    voiture = new Sprite ("sprite/voiture.png",30,V[2] )
    bulle = new Sprite ("sprite/bulle.png",50,20 )
    fondFixe = new Sprite ("sprite/fondFixe.png")

    music = new Audio();
    music.src = "audio/NYC1997.ogg";
    music.setAttribute("volume", 1.0);
    music.setAttribute("preload", "auto");
    music.setAttribute("controls", "none");
    music.style.display = "none";
    music.currentTime = 0;
    music.loop = true;

    obsSfx = new Audio();
    obsSfx.src = ("audio/obstacle.wav");
    obsSfx.setAttribute("volume", 1.0);
    obsSfx.loop = false;

    sigSfx = new Audio();
    sigSfx.src = ("audio/signal.wav");
    sigSfx.setAttribute("volume", 1.0);
    sigSfx.loop = false;

    LaunchGame()

    for (let S = 1; S <= 50; S++)
    {
        //console.log ( FindNumSegment(S),FindNumObstacle(S), segment [FindNumSegment(S)].voieDepart, segment[FindNumSegment(S)].nbVoie  ) 
        //console.log ( B01[segment[ FindNumSegment(S)][FindNumObstacle(S)]] [0], B01[segment[FindNumSegment(S)][FindNumObstacle(S)]] [1], B01[segment[FindNumSegment(S)][FindNumObstacle(S)]] [2], B01[segment[FindNumSegment(S)][FindNumObstacle(S)]] [3])
        //console.log ( CalObsPosX(S) )
    }
}


function LaunchGame()
{   
    voiture.V = 2
    voiture.y = V[voiture.V]
    CreateMap()
    distVoiture = 0
    nextObstacle = 1
    nextMessage = []
    for (let S = 1 ; S <= nbSegment; S++ )
    {
        nextMessage[S] = distDepart + distSegment * (S-1) + distSegment * apparitionMessage
        //console.log("HERE", nextMessage [S])
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
}


function BOOM()
{
    GameMod = "OVER"
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



function KeyDown(t)   //      ELSE IF A TESTER 
{
    if (t.code != "F12")
    {
        t.preventDefault()
    }
    if (GameMod == "MENU")
    {
        if (t.code == "Enter")
        {
            GameMod = "GAME"
        }
        music.play()
    }
    else if (GameMod == "OVER")
    {
        if (t.code == 'Enter')
        {
            GameMod = "GAME" 
            LaunchGame()
        } 
    }
    else if (GameMod == "GAME")
    {
        if (t.code == "ArrowUp" && voiture.V > 1)
        {
            voiture.V = voiture.V - 1
            voiture.y = V[voiture.V]
        }
        if (t.code == "ArrowDown" && voiture.V < 4)
        {
            voiture.V = voiture.V + 1
            voiture.y = V[voiture.V]
        }
    }
} 


function update()
{
    if(GameMod == "GAME")
    {
        distVoiture = distVoiture + voitureSpeed * dt
        roadX = roadX- voitureSpeed * dt
        if (roadX + roadEcartX <= 0)
        {
            roadX = roadX + roadEcartX
        }
        if (CalObsPosX(nextObstacle) < 0 - imgObstacle.width)
        {
            nextObstacle = nextObstacle + 1
        }
        //---------------------
        if (FindNumObstacle(nextObstacle) != 1)
        { 
            if (segment[FindNumSegment(nextObstacle)].nbVoie == 2)
            {
                if (segment[FindNumSegment(nextObstacle)].voieDepart == 1)
                {
                    if (voiture.V == 1 || voiture.V == 2)
                    {
                        BOOM()
                    }
                }
                else if (segment[FindNumSegment(nextObstacle)].voieDepart == 2)
                {
                    if (voiture.V == 1 || voiture.V == 4)
                    {
                        BOOM()
                    }
                }
                else
                {
                    if (voiture.V == 3 || voiture.V == 4)
                    {
                        BOOM()
                    }
                }
            }
            else if (segment[FindNumSegment(nextObstacle)].nbVoie == 3)
            {
                if (segment[FindNumSegment(nextObstacle)].voieDepart == 1)
                {
                    if (voiture.V == 1)
                    {
                        BOOM()
                    }
                }
                else
                {
                    if (voiture.V == 4)
                    {
                        BOOM()
                    }
                }
            }
        }
        if (CalObsPosX(nextObstacle) > 30 && CalObsPosX(nextObstacle) < imgObstacle.width + 30)
        {
            if (B01[segment[FindNumSegment(nextObstacle)][FindNumObstacle(nextObstacle)]][voiture.V - 1] == 1)
            {
                //console.log ("obstacle ")
                obsSfx.play();
                BOOM()
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
    voiture.draw(pCtx)

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
    if (FindNumSegment(nextObstacle) < nbSegment && nextMessage[FindNumSegment(nextObstacle)] > distVoiture &&
            nextMessage[FindNumSegment(nextObstacle)] < distVoiture + distMessage)
    {
        //pCtx.drawImage(imgBulle, 50 ,20 )
        sigSfx.play();
        bulle.draw(pCtx)
        // console.log("YOUPI")
        if (segment[FindNumSegment(nextObstacle) + 1].nbVoie == 2)
        {
            if (segment[FindNumSegment(nextObstacle) + 1].voieDepart == 1)
            { 
                pCtx.drawImage(imgNupe, 70, 32)
                pCtx.drawImage(imgNupe, 70, 50)
            }
            else if (segment[FindNumSegment(nextObstacle) + 1].voieDepart == 2)
            {
                pCtx.drawImage(imgNupe, 70, 32)
                pCtx.drawImage(imgNupe, 70, 86)
            }
            else
            {
                pCtx.drawImage(imgNupe, 70, 68)
                pCtx.drawImage(imgNupe, 70, 86)
            }
        }
        else if (segment[FindNumSegment(nextObstacle) + 1].nbVoie == 3)
        {
            if (segment[FindNumSegment(nextObstacle) + 1].voieDepart == 1)
            {
                pCtx.drawImage(imgNupe, 70, 32)         
            }
            else 
                pCtx.drawImage(imgNupe, 70, 86)
            }
    }
    // pCtx.fillText ("SCORE: ", 340,140)
    if (GameMod == "MENU")
    {
        pCtx.fillText("Press ENTER to start", 300, 50)
    }
    if (GameMod == "OVER")
    {
        pCtx.fillText("SCORE: " + Math.floor(distVoiture / 10), 340, 140)
        pCtx.fillText("Press RETURN to restart", 300, 50)
    }
}



