
let musicOn = true

let nbObstacleSegment = 8 // le nb de ligne d'obstacle à chaque segment



/* la vitesse et la distance doivent etre modifier proportionelement pour rester en tempo
let vitesse voiture * 112 /120  = écart obstacle
*/

let voitureSpeed = 1120  // vitesse de la voiture 

let distObstacle = 1200   //la distance entre chaque ligne d'obstacle 
//1200
let distMessage=2000 // la distance sur laquelle le message est affiché peut être convertit en durée:
    distMessage= voitureSpeed * 2 //  = 2 secondes d'affichage 

let apparitionMessage=  RandomINT(5,8)/10  // apparition du message des mines, ici le message apparrait entre 50% et 80% du segment parcouru 

let nbSegment = 1000

let segment = []

for(let S= 1; S<= nbSegment; S++) { segment[S]=[]
    segment [S].nbVoie = null
    segment [S].voieDepart = null


}


//--------------------------------------------------------------------

let GameMod = "MENU"

 
let imgObstacle
let imgRoad
let imgNupe

//let imgObstacleW
let roadX= 0
let roadY= 160
let roadEcartX=910
let roadEcartY=80

let distVoiture // 
let distDepart  =  2.5 * distObstacle// distObstacle*0.5   --1.2
let distSegment = ( nbObstacleSegment+1.5)*distObstacle
let nextObstacle //
let nextMessage //


//let  voitureV

let V=[]
V[1] = roadY
V[2] = roadY+roadEcartY
V[3] = roadY+roadEcartY*2
V[4] = roadY+roadEcartY*3


// ---------------------

let B01= []
B01[0]= [0,0,0,0]
B01[1]= [0,0,0,1]
B01[2]= [0,0,1,0]
B01[3]= [0,0,1,1]
B01[4]= [0,1,0,0]
B01[5]= [0,1,0,1]
B01[6]= [0,1,1,0]
B01[7]= [0,1,1,1]
B01[8]= [1,0,0,0]
B01[9]= [1,0,0,1]
B01[10]=[1,0,1,0]
B01[11]=[1,0,1,1]
B01[12]=[1,1,0,0]
B01[13]=[1,1,0,1]
B01[14]=[1,1,1,0]


//        SEGMENT GENERATOR
let SG=[]
SG[4]=[]
SG[4][1]= [null,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
SG[4][1].PO= [1,2,4,8]





SG[3]=[]
SG[3][1]= [null,1,2,3,4,5,6,9,10,11,12,13,14]
SG[3][2]= [null,2,3,4,5,6,7,8, 9,10,11,12,13]
SG[3][1].PO= [1,2,4,9,10,12]
SG[3][2].PO= [2,3,4,5,8 ,9]

SG[2]=[]
SG[2][1]= [null,1,2,5,6, 9,10,13,14]
SG[2][2]= [null,2,3,4,5,10,11,12,13]
SG[2][3]= [null,4,5,6,7,8 ,9 ,10,11]


//let SGindex= [0,0,8,12,13]

let SGindex = []
SGindex[2] = 8
SGindex[3] = 12
SGindex[4] = 14



    //SG1=[1,2,4,8]



/*
SG[3]={}
SG[3][1]= [1,2,3,4,5,6]
SG[3][2]= [2,4,6,8,10,12]

SG[2]=[]
SG[2][1]= [1,2]
SG[2][2]= [2,4]
SG[2][3]= [4,8]

SG1=[1,2,4,8]
*/
//------------------------

//let segment =[]

