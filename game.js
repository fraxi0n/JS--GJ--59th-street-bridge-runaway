/*
GameMod :
1 - click to play
2 - menu
3 - tuto
4 - intro
5 - game
6 - over 
7 - win 
10 - image loader
*/







function load() 
{
    
    document.addEventListener("keydown", KeyDown, false)
    document.addEventListener("keyup", KeyUp, false)  
    document.addEventListener("mousedown", mouseDown)

    imgBlack.src= "sprite/tuto/black.png"
    logo.src = "sprite/fmod_logo.png"

    img.add(  "sprite/bridge/route.png", "MainRoad" )
    img.add(  "sprite/bridge/route_blanc.png", "InterRoad"  )

    img.add(  "sprite/bridge/interSegment_blanc.png" , "InterSegmentW"   )
    img.add(  "sprite/bridge/interSegment_jaune.png" , "InterSegmentY"  )

    img.add( "sprite/bridge/barriere.png" , "Barriere"  )

    
    img.add( "sprite/bridge/start_1.png" , "Start1"  )
    img.add( "sprite/bridge/start_2.png" , "Start2" )
    img.add( "sprite/bridge/end_1.png" , "End1"  )
    img.add( "sprite/bridge/end_2.png" , "End2"  )

    img.add("sprite/bulle.png" , "Bulle"  )
    img.add( "sprite/nupe.png" ,  "Nupe"  )

    img.add( "sprite/tuto/2-1.png" , "Tuto2_1"  )
    img.add( "sprite/tuto/3-1.png" , "Tuto3_1"  )


    img.add( "sprite/intro/ees_planche.png" , "IntroPlanche"  )


    for(S=1; S<=74; S++)
    {
         img.add( "sprite/intro/ees_"+S+".png" , "VoitureIntro"+S  )
    }

    
    for(S=1; S<=4; S++)
    {
         img.add( "sprite/obstacle/obstacle_"+S+".png" , "Obstacle"+S   )
    }


    for (let S=1; S<=9;S++)
    {
         img.add( "sprite/boom/boom"+S+".png" , "voitureBoom"+S   )
    }


    img.add( "sprite/boom/crash1.png" , "voitureCrash1"  )
    img.add( "sprite/boom/crash2.png" , "voitureCrash2"  )


    img.add( "sprite/voiture1.png" , "voiture1" )
    img.add( "sprite/voiture2.png" , "voiture2" )
    

    img.add( "sprite/fond 2/C1-1.png" , "fond1_1"  )
    img.add( "sprite/fond 2/C1-2.png" , "fond1_2"  )
    img.add( "sprite/fond 2/C2-1.png" , "fond2_1"  )
    img.add( "sprite/fond 2/C2-2.png" , "fond2_2"  )
    img.add( "sprite/fond 2/C3-1.png" , "fond3_1"  )
    img.add( "sprite/fond 2/C3-2.png" , "fond3_2"  )
    img.add( "sprite/fond 2/C4-1.png" , "fond4_1"  )
    img.add( "sprite/fond 2/C4-2.png" , "fond4_2"  )
    img.add(   "sprite/fond 2/C5.png" , "fond5"  )

    img.add( "sprite/curseur.png" , "Curseur"   )
    img.add( "sprite/titre.png" ,  "Titre"  )

 
    img.start()


    PlaceCursor()

    InitMenu()
} //fin load


function update()
{
    if (GameMod == 8  /* Img Load*/)
    {
        timer += dt

        if ( timer < 3 && alphaFade < 1)
        {
            alphaFade += 2* dt
        }
        else if (timer > 4 /*&& alphaFade > 0*/)
        {
            alphaFade -= 1.5 * dt
        } 




        if (timer >= 5 && img.ready == true)
        {
            GameMod = 1 /* Clic to Play */
            alphaFade = 0

        }



    }

    if (GameMod == 1  /* Clic to Play */ && alphaFade < 1)
    {
        alphaFade += 3* dt
    }

    if (GameMod == 3  /* TUTO */)
    {
        if (FreezeTUTO() == true)
        {

        }
        else
        {
            frameVoiture += 5*dt
            if(frameVoiture>= 3 )  { frameVoiture-=2 }
    
            fond1_1X -= (fond1_2W-1200)/(distTotal/voitureSpeed )*dt
            fond1_2X -= (fond1_2W-1200)/(distTotal/voitureSpeed )*dt
    
            fond2_1X -= (fond2_2W-1200)/(distTotal/voitureSpeed )*dt
            fond2_2X -= (fond2_2W-1200)/(distTotal/voitureSpeed )*dt
    
            fond3_1X-= (fond3_2W-1200)/(distTotal/voitureSpeed )*dt
            fond3_2X-= (fond3_2W-1200)/(distTotal/voitureSpeed )*dt
    
            fond4_1X-= (fond4_2W-1200)/(distTotal/voitureSpeed )*dt
            fond4_2X-= (fond4_2W-1200)/(distTotal/voitureSpeed )*dt
    
    
            distVoiture = distVoiture + voitureSpeed * dt
            roadX = roadX- voitureSpeed * dt
    
            if (roadX + roadEcartX <= 0)
            {
                roadX = roadX + roadEcartX
            }
    
            if (voiture.y < V[voiture.V])
            {
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
                    GameMod = 7  /* WIN */
                    timer = 5
                    musicInstance.val.setParameterByID(fadeOutID, true, false);
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
                    BOOM("obstacle")
                }
            }

        }


    

        


        

    } //TUTO


    if (GameMod == 4  /* INTRO */)
    {
        
        frameVoiture += voitureSpeed*0.040*dt*2

        if  (frameVoiture >= 53 && soundCascade == false  )
        {
            soundCascade = true 
            
            //mettre le son de cascade ICI
            cascadeInstance.val.start();
        }

        if(frameVoiture>=75)
        {
            frameVoiture=1
            voiture.x = voiture.xGame
            soundCascade = false 
            GameMod = 5  /* GAME */
        }





        
    } //INTRO

    if (GameMod == 5  /* GAME */)

    {

        frameVoiture += 5*dt
        if(frameVoiture>=
            3 )
        {
            frameVoiture-=2
        }

        fond1_1X -= (fond1_2W-1200)/(distTotal/voitureSpeed )*dt
        fond1_2X -= (fond1_2W-1200)/(distTotal/voitureSpeed )*dt

        fond2_1X -= (fond2_2W-1200)/(distTotal/voitureSpeed )*dt
        fond2_2X -= (fond2_2W-1200)/(distTotal/voitureSpeed )*dt

        fond3_1X-= (fond3_2W-1200)/(distTotal/voitureSpeed )*dt
        fond3_2X-= (fond3_2W-1200)/(distTotal/voitureSpeed )*dt

        fond4_1X-= (fond4_2W-1200)/(distTotal/voitureSpeed )*dt
        fond4_2X-= (fond4_2W-1200)/(distTotal/voitureSpeed )*dt


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





        if (CalObsPosX(nextObstacle) < 0 - 156)
        {
            nextObstacle = nextObstacle + 1
            if(FindNumSegment(nextObstacle)== nbSegment+1) 
            {
                GameMod = 7  /* WIN */
                timer = 5
                musicInstance.val.setParameterByID(fadeOutID, true, false);
            }
        }

        if (FindNumObstacle(nextObstacle) != 1 ||  CalObsPosX(nextObstacle)< 156 -20  )
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
                BOOM("obstacle")
            }
        }
    } //GAME

    if (GameMod == 6  /* OVER */)
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

    } //OVER

    if (GameMod == 7 /* WIN */)
    {

        distVoiture = distVoiture + voitureSpeed * dt

        timer -= dt
        if(timer<=0)
        {
            GameMod = 2 /* MENU */ 

            InitMenu()

            menu.statut=2
            voiture.x= voiture.xIntro
            
            decalWin=0
            PlaceCursor()

        }

        if(decalWin< voitureSpeed)
        {
            decalWin += dt* (voitureSpeed/ (1100*2/voitureSpeed))^0.5    // CALCUL TRES CHIANT NE PAS POSER DE QUESTION = calcul du frein de l'écran (décélération )
            // 1296 = nb de pixel que l'ECRAN parcourt en phase de freinage 
            if (decalWin>= voitureSpeed)
            {
                decalWin=voitureSpeed
            }
        }

        voiture.x+= decalWin*dt

        roadX = roadX+(decalWin- voitureSpeed) * dt

    } //WIN

} // fin update



function draw(pCtx)
{
    if (alphaFade<1 )
    {
        pCtx.globalAlpha = alphaFade
    }
     

    if (GameMod == 8  /* Img Load */)
    {
        if ( alphaFade> 0)
        {
            pCtx.globalAlpha = alphaFade
            pCtx.drawImage(logo, 418, 250, 364, 96)
            pCtx.globalAlpha = 1
        }

        
    }
    else 
    {
     img.draw("fond5", 0,0, pCtx)
     img.draw("fond4_1", fond4_1X,0, pCtx)
     img.draw("fond4_2", fond4_2X,0, pCtx)
     img.draw("fond3_1", fond4_1X,0, pCtx)
     img.draw("fond3_2", fond3_2X,0, pCtx)
     img.draw("fond3_2", fond3_2X,0, pCtx)
     img.draw("fond2_1", fond2_1X,0, pCtx)
     img.draw("fond2_2", fond2_2X,0, pCtx)
     img.draw("fond1_1", fond1_1X,0, pCtx)
     img.draw("fond1_2", fond1_2X,0, pCtx)

    }

    if (GameMod == 3  /* TUTO */)
    {

        
        for (let S= 0; S<=3; S++)
        {
             img.draw("MainRoad", roadX+ (S*roadEcartX), roadY-128  , pCtx)
        
        }

        
        if (nextObstacle>=2 && FindNumSegment(nextObstacle+3)<= nbSegment ) 
        {
            let S=0
                
            while( S*roadEcartX< distObstacle*1.6) 
            {
                 img.draw("InterRoad", (FindNumSegment(nextObstacle-1) ) * distSegment + distDepart -distObstacle*0.8+ (S*roadEcartX) - distVoiture, roadY, pCtx)
                S++
            }
        }
        


        if( nextObstacle!=1 /*&& nextObstacle  < nbSegment*nbObstacleSegment-3*/ )  
        {
        
             img.draw("InterSegmentW", (FindNumSegment(nextObstacle) - 1) * distSegment + distDepart +distObstacle*0.8 - distVoiture, roadY, pCtx)
            
            if( FindNumSegment(nextObstacle+3)<= nbSegment)
            {
                //les deux sont nécéssaire car il y a un changement de segment lorsque dépassé
                 img.draw("InterSegmentY", (FindNumSegment(nextObstacle-1)  ) * distSegment + distDepart -distObstacle*0.8 - distVoiture, roadY, pCtx)
                 img.draw("InterSegmentY", (FindNumSegment(nextObstacle) -1 ) * distSegment + distDepart -distObstacle*0.8 - distVoiture, roadY, pCtx)
            }
        }
   

        for (let S1 = 0; S1 <= 2; S1++) 
        {
           
            for (let S2 = 0; S2 < 4; S2++)
            {
                if (B01[segment[FindNumSegment(nextObstacle + S1)][FindNumObstacle(nextObstacle + S1)]][S2] == 1 /*&& FindNumSegment(nextObstacle + S1) <nbSegment*/)
                {
                     img.draw("Obstacle" + skinObstacle [4*(nextObstacle+S1) +S2 ]  , CalObsPosX(nextObstacle + S1), V[S2+1]+10 /*roadY + roadEcartY * (S2)*/, pCtx)
                } 
            }
        }




         img.draw("voiture" +Math.floor(frameVoiture) ,voiture.x,voiture.y+Math.floor(Math.floor(frameVoiture-1)*2), pCtx)


        pCtx.fillText("remaining distance" , 100, 50)
        pCtx.fillText( Math.floor( (distTotal - distVoiture) /70  )+" m", 174 , 70)


         img.draw("voiture" +[Math.floor(frameVoiture) ],voiture.x,voiture.y+Math.floor(Math.floor(frameVoiture-1)*2), pCtx)


        let NOF // nextObstacleFictif
        // NOF = next obstacle mais corrige un bug de dizaine en fin de segment 

        if (FindNumObstacle(nextObstacle)==1)
        {
            NOF = nextObstacle-1
        }
        else
        {
            NOF = nextObstacle
        }

        if  ( ( nextMessage[FindNumSegment(NOF)]   > distVoiture && nextMessage[FindNumSegment(NOF)] < distVoiture + distMessage && FindNumSegment(NOF) < nbSegment ))
        {


            if (!hasPlaySignal && segment[FindNumSegment(NOF) + 1].nbVoie < 4)
            {
                signalInstance.val.start();
                hasPlaySignal = true;
            }

             img.draw("Bulle", 750,20 , pCtx)

            
            
            if (segment[FindNumSegment(NOF) + 1].nbVoie == 2)
            {
                if (segment[FindNumSegment(NOF) + 1].voieDepart == 1)
                { 
                     img.draw("Nupe", 155+95+700, 28+12, pCtx)
                     img.draw("Nupe", 155+95+700, 58+12, pCtx) 
                }
                else if (segment[FindNumSegment(NOF) + 1].voieDepart == 2)
                {
                     img.draw("Nupe", 155+95+700, 28+12, pCtx)
                     img.draw("Nupe", 155+95+700, 118+12, pCtx)
                }
                else
                {
                     img.draw("Nupe", 155+95+700, 88+12, pCtx)
                     img.draw("Nupe", 155+95+700, 118+12, pCtx)
                }
            }


            else if (segment[FindNumSegment(NOF) + 1].nbVoie == 3)
            {
                if (segment[FindNumSegment(NOF) + 1].voieDepart == 1)
                {
                     img.draw("Nupe", 155+95+700, 28+12, pCtx)         
                }
                else 
                 img.draw("Nupe", 155+95+700, 118+12, pCtx)
            }
        }
        else
        {
         hasPlaySignal = false;
        }

        if (FreezeTUTO()==true)
        {
            pCtx.globalAlpha = 0.4
            pCtx.drawImage( imgBlack,0,0,1200,675)
            pCtx.globalAlpha = 1
            /*
            tuto.txt[tuto.state].forEach(element => {
                pCtx.fillText( element, tuto.txtX[tuto.state][1], tuto.txtY[tuto.state][1])
                console.log (element)
            })*/

            for (let S = 1; S <= tuto.txt[tuto.state].length; S++ )
            {
                pCtx.globalAlpha = 0.8
                pCtx.drawImage( imgBlack,tuto.txtX[tuto.state][S]-10,tuto.txtY[tuto.state][S]-15,20+ (600-tuto.txtX[tuto.state][S])*2 ,20 ) 
                pCtx.globalAlpha = 1
            

                pCtx.fillText( tuto.txt[tuto.state][S] , tuto.txtX[tuto.state][S], tuto.txtY[tuto.state][S])


            }

            if (tuto.state == 2) { img.draw("Tuto2_1",935,120 , pCtx)}
            if (tuto.state == 3) { img.draw("Tuto3_1", 890,33 , pCtx)}

            //pCtx.fillText( tuto.txt[tuto.state] , tuto.txtX[tuto.state], tuto.txtY[tuto.state])

            pCtx.drawImage( imgBlack, 465-10 ,550-15, 20+ (600-465)*2 ,20)
            pCtx.fillText( "PRESS ENTER TO CONTINUE" , 465 , 550)

        }
    } //TUTO


    if (GameMod == 5  /* GAME */ || GameMod == 6  /* OVER */ || GameMod == 7  /* WIN */)
    {
        for (let S= 0; S<=3; S++)
        {
             img.draw("MainRoad", roadX+ (S*roadEcartX), roadY-128  , pCtx)
        
        }

        if (GameMod == 5  /* GAME */ || GameMod == 6  /* OVER */)
        {
            if (nextObstacle>=2 && FindNumSegment(nextObstacle+3)<= nbSegment ) 
            {
                let S=0
                    
                while( S*roadEcartX< distObstacle*1.6) 
                {
                     img.draw("InterRoad", (FindNumSegment(nextObstacle-1) ) * distSegment + distDepart -distObstacle*0.8+ (S*roadEcartX) - distVoiture, roadY, pCtx)
                    S++
                }
            }
            


            if( nextObstacle!=1 )  
            {
            
                 img.draw("InterSegmentW", (FindNumSegment(nextObstacle) - 1) * distSegment + distDepart +distObstacle*0.8 - distVoiture, roadY, pCtx)
                
                if( FindNumSegment(nextObstacle+3)<= nbSegment)
                {
                    //les deux sont nécéssaire car il y a un changement de segment lorsque dépassé
                     img.draw("InterSegmentY", (FindNumSegment(nextObstacle-1)  ) * distSegment + distDepart -distObstacle*0.8 - distVoiture, roadY, pCtx)
                     img.draw("InterSegmentY", (FindNumSegment(nextObstacle) -1 ) * distSegment + distDepart -distObstacle*0.8 - distVoiture, roadY, pCtx)
                }
            }
       

            for (let S1 = 0; S1 <= 2; S1++) 
            {
               
                for (let S2 = 0; S2 < 4; S2++)
                {
                    if (B01[segment[FindNumSegment(nextObstacle + S1)][FindNumObstacle(nextObstacle + S1)]][S2] == 1 )
                    {
                         img.draw("Obstacle"+ skinObstacle [4*(nextObstacle+S1) +S2 ]  , CalObsPosX(nextObstacle + S1), V[S2+1]+10 , pCtx)
                    } 
                }
            }


            if (GameMod == 5  /* GAME */)  
        {
    
             img.draw("voiture" + Math.floor(frameVoiture) ,voiture.x,voiture.y+Math.floor(Math.floor(frameVoiture-1)*2), pCtx)
    
    
            pCtx.fillText("remaining distance" , 100, 50)
            pCtx.fillText( Math.floor( (distTotal - distVoiture) /70  )+" m", 174 , 70)
    

             img.draw("voiture" +Math.floor(frameVoiture) ,voiture.x,voiture.y+Math.floor(Math.floor(frameVoiture-1)*2), pCtx)
    
    
            let NOF // nextObstacleFictif -> next obstacle mais corrige un bug de dizaine en fin de segment 
    
            if (FindNumObstacle(nextObstacle)==1)
            {
                NOF = nextObstacle-1
            }
            else
            {
                NOF = nextObstacle
            }
    
            if  ( ( nextMessage[FindNumSegment(NOF)]   > distVoiture && nextMessage[FindNumSegment(NOF)] < distVoiture + distMessage && FindNumSegment(NOF) < nbSegment ))
            {
    
    
                if (!hasPlaySignal && segment[FindNumSegment(NOF) + 1].nbVoie < 4)
                {
                    signalInstance.val.start();
                    hasPlaySignal = true;
                }

                 img.draw("Bulle", 750,20  , pCtx)
                
                if (segment[FindNumSegment(NOF) + 1].nbVoie == 2)
                {
                    if (segment[FindNumSegment(NOF) + 1].voieDepart == 1)
                    { 
                         img.draw("Nupe", 155+95+700, 28+12, pCtx)
                         img.draw("Nupe", 155+95+700, 58+12, pCtx) 
                    }
                    else if (segment[FindNumSegment(NOF) + 1].voieDepart == 2)
                    {
                         img.draw("Nupe", 155+95+700, 28+12, pCtx)
                         img.draw("Nupe", 155+95+700, 118+12, pCtx)
                    }
                    else
                    {
                         img.draw("Nupe", 155+95+700, 88+12, pCtx)
                         img.draw("Nupe", 155+95+700, 118+12, pCtx)
                    }
                }


                else if (segment[FindNumSegment(NOF) + 1].nbVoie == 3)
                {
                    if (segment[FindNumSegment(NOF) + 1].voieDepart == 1)
                    {
                         img.draw("Nupe", 155+95+700, 28+12, pCtx)      
                    }
                    else 
                     img.draw("Nupe", 155+95+700, 118+12, pCtx)
                }
            }
            else
            {
             hasPlaySignal = false;
            }
    
            } // GAME 

            if (GameMod == 6  /* OVER */)
        { 
            if(raisonBoom=="obstacle")
            {
                 img.draw("voitureCrash" +Math.floor(frameVoiture) ,voiture.x+10,voiture.y, pCtx)
            }
            if(raisonBoom=="mine")
            {
                 img.draw("voitureBoom" +Math.floor(frameVoiture) ,voiture.x,voiture.y+86 -  img.getH("voitureBoom"+Math.floor(frameVoiture)) , pCtx)
                 /*voitureBoom.img[Math.floor(frameVoiture) ].height */
            }
            
    
    
             img.draw("Curseur", curseur.x,curseur.y , pCtx)
    
            pCtx.fillText("Arrow to naviguate - ENTER to choose  ", 400, 50 )
            pCtx.fillText(menu.I[1][1].txt, menu.I[1][1].x, menu.I[1][1].y)
            pCtx.fillText(menu.I[1][2].txt, menu.I[1][2].x, menu.I[1][2].y)
    
            pCtx.fillText("remaining distance" , 100, 50)
            pCtx.fillText( Math.floor( (distTotal - distVoiture) /70  )+" m", 174 , 70)
    
            } // OVER

        } // GAME + OVER

        if (GameMod == 7 /* WIN */)
        { 

             img.draw("End1", roadX  + roadEcartX*4 ,175, pCtx)
             img.draw("voiture" +Math.floor(frameVoiture) ,voiture.x,voiture.y+Math.floor(Math.floor(frameVoiture-1)*2), pCtx)
            pCtx.fillText("Mission complete", 500, 300)
     
        } //WIN
    }

    if ( GameMod == 1  /* Clic to Play */ || GameMod == 2  /* MENU */ || GameMod == 4  /* INTRO */ )
    { 
         img.draw("Start1",0,175, pCtx)
         img.draw("Obstacle"+1, 350, V[1]+10 , pCtx)
         img.draw("Obstacle"+2, 350, V[2]+10  , pCtx)
         img.draw("Obstacle"+3, 350, V[3]+10  , pCtx)
         img.draw("Obstacle"+4, 350, V[4]+10  , pCtx)

         img.draw("IntroPlanche", 280, 370   , pCtx)


        if (GameMod == 1  /* Clic to Play */)
        {
            img.draw("Titre",200,65, pCtx)
            pCtx.fillText("-- CLICK TO PLAY --", 510, 50 )

        } //CLICTOPLAY
    
    
        if (GameMod == 2  /* MENU */)
        {

           pCtx.fillText("Arrow to naviguate - ENTER to choose  ", 400, 50 )
    
           for (let S = 1; S<= menu.I[menu.statut].length-1; S++ )
           {
            pCtx.fillText(menu.I[menu.statut][S].txt, menu.I[menu.statut][S].x, menu.I[menu.statut][S].y)
           }

            img.draw("Curseur", curseur.x,curseur.y , pCtx)

        } // MENU


        if (GameMod == 4  /* INTRO */)
        {
                 img.draw("VoitureIntro"+Math.floor(frameVoiture) ,0,175 , pCtx)
        }



    }  




    pCtx.globalAlpha = 0.4 


    if (GameMod == 4  /* INTRO */ || GameMod == 2  /* MENU */ || GameMod == 1  /* Clic to Play */)
    {
         img.draw("Start2", 0, 175+48-20 , pCtx)
    }
    else
    {
        if(GameMod == 7 /* WIN */)
        {
             img.draw("End2", roadX  + roadEcartX*4 ,175+48-20, pCtx)

        }
        
        
            for (let S= 0; S<=3; S++)
            {
                 img.draw("Barriere", roadX+ (S*roadEcartX), 522+48-20  , pCtx)
            }
        
        
        
    }
    pCtx.globalAlpha = 1


} //fin draw
