function InitMenu()
{

    fond1_1X = 0
    fond1_2X = 1000
    fond2_1X = 0
    fond2_2X = 10000
    fond3_1X = 0
    fond3_2X = 1000
    fond4_1X = 0
    fond4_2X = 1000

    //frameVoiture = 1
}


function InitGame() // initialise les variable + génère la map a lier au create map ?
{   

    function ReglageDifficulte(pDifficult ) // règle les stats en fonction de la difficulté 
    {

     
        if (pDifficult==3)  

            {
                nbObstacleSegment = 16
                nbSegment = 12
            }
            else
            {
                nbObstacleSegment = 8
                nbSegment = 6
            }
        

    
            voitureSpeed = TvoitureSpeed [ pDifficult]
            distObstacle = TdistObstacle [ pDifficult]
            distDepart  =  1.30 * distObstacle
            distMessage= voitureSpeed * 2.5



            distSegment = ( nbObstacleSegment+1)*distObstacle
        

            distTotal = distSegment*nbSegment + distDepart-(9*70)

            if(pDifficult==0)
            {
                msgMin=10
                msgMax=10
            }
            else
            {
                msgMin = 2
                msgMax = 8
            }
       

    }  


    if (GameMod == 2)
    {
        ReglageDifficulte(menu.curseur-2)
    }


    

    voiture.V = 2 
    voiture.y = V[voiture.V]

    roadX= 0
 // fond init  

    InitMenu()

    frameVoiture = 1
    distVoiture = 0
    nextObstacle = 1

    hasPlaySignal = false;

    function CreateMap() // Génère les position dobstacle a l'avance /!\ dépend de la difficulté choisie
{


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

     segment = []
        
    for (let S = 1; S <= nbSegment; S++)
    {
        segment[S]=[]

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

    //---------------- SKIN OBSTACLE
    for (S = 0; S<= ((nbSegment+1) * nbObstacleSegment*10); S++ )
    {
        skinObstacle[S] = RandomINT(1,4)
    }
} //CreateMap


    CreateMap()

    nextMessage = []
    for (let S = 1 ; S <= nbSegment*4; S++ )
    {
        nextMessage[S] = distDepart + distSegment * (S-1) + distSegment * RandomINT (msgMin,msgMax)/10
    }
} //







function FindNumSegment(pNumObstacle) //calcule les identifiant du segment en fonction de la position de la voiture
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
} //


function FindNumObstacle(pNumObstacle) // calcule les identifiant des obstacle en fonction de la position de la voiture
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
} //FindNumObstacle


function CalObsPosX(pNumObstacle) //calcule la position en X des obstacle (utiliser dans le draw)
{
    let value = distDepart+distSegment * (FindNumSegment(pNumObstacle) - 1) + distObstacle * FindNumObstacle(pNumObstacle) - distVoiture
    return value
} //CalObsPosX


function mouseDown() // CLICK TO PLAY
{
    if (GameMod == 1)
    {
        GameMod=2
    }
    
} //mouseDown


function KeyDown(t) //      ELSE IF A TESTER 
{
    if (t.code != "F12")
    {
        t.preventDefault()
    }

    if (GameMod == 2 || GameMod == 6 )
    {


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
        } // ARROW


        if (t.code == "Enter")
        {

            if (GameMod == 6)
            {
                explosionInstance.val.stop(FMOD.STUDIO_STOP_ALLOWFADEOUT);
                obstacleInstance.val.stop(FMOD.STUDIO_STOP_ALLOWFADEOUT);
            }

            voiture.x = voiture.xIntro

            if (menu.statut==2) // MENU  (choix des difficultés)
            {   
                if (menu.curseur == 1) // TUTORIEL
                {
                   
                    InitTUTO()
                    GameMod = 3


                } 
                else // LAUNCH GAME
                {
                    musicInstance.val.setParameterByID(fadeOutID, false, false);
                    musicInstance.val.start(); 
                    InitGame()
                    GameMod = 4

                }

                
                   
            }
                else if (menu.statut==1) // GAME OVER 
            {
                    
               
                if(menu.curseur==1) // quick restart
                {
                    if (tuto.over== true)
                    {
                        InitTUTO()
                        GameMod = 3
                    }
                    else
                    {
                        InitGame()
                        GameMod = 4  
                    }
                    
                }   
                    
                if(menu.curseur==2) // back to menu
                {
                    InitMenu() //21/10

                    GameMod = 2
                    menu.statut=2
                    menu.curseur=1
                    PlaceCursor()
                }
            }
        } // ENTER
            

    } // MENU or OVER
        
    



    else if (GameMod == 5 || GameMod == 3)
    {
        

        if (GameMod == 3 && FreezeTUTO()==true)
        {
            if (t.code == "Enter")
            {
                tuto.state++
            }

        }
        else
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



    }



} //KeyDown


function PlaceCursor() // (re)place le curseur du menu 
{
    
    curseur.x =  menu.I[menu.statut][menu.curseur].x-20
    curseur.y =  menu.I[menu.statut][menu.curseur].y-10
} //PlaceCursor


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

    if (GameMod == 3)
    {
        tuto.over = true 
       // InitTUTO()
    }
    else 
    {
        tuto.over = false 
    }
    
    
    //else
    //{
        GameMod = 6
    //}

    hasPlaySignal = false;
} //BOOM