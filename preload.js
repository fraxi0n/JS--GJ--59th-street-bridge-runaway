let musicOn = false

let nbObstacleSegment = 5 // le nb de ligne d'obstacle à chaque segment



/* la vitesse et la distance doivent etre modifier proportionelement pour rester en tempo
let vitesse voiture * 112 /120  = écart obstacle
*/

let voitureSpeed// = 1120  // vitesse de la voiture 
let TvoitureSpeed =[ null,  784, 1008, 1120]


let distObstacle// = 1200   //la distance entre chaque ligne d'obstacle 
let TdistObstacle =[ null,  840, 1080, 1200]




let distMessage   //=2000 // la distance sur laquelle le message est affiché peut être convertit en durée:
    //distMessage= voitureSpeed * 2 //  = 2 secondes d'affichage 

let apparitionMessage=  RandomINT(5,8)/10  // apparition du message des mines, ici le message apparrait entre 50% et 80% du segment parcouru 

let nbSegment = 3

let segment = []


// A RETIRER ??
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
let distDepart  //=  1.2 * distObstacle// distObstacle*0.5   --1.2
let distSegment //= ( nbObstacleSegment+1.5)*distObstacle
let nextObstacle //
let nextMessage //

let decalWin = 0


//let  voitureV

let V=[]
V[1] = roadY-15
V[2] = V[1]+roadEcartY
V[3] = V[1]+roadEcartY*2
V[4] = V[1]+roadEcartY*3


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



let SGindex = []
SGindex[2] = 8
SGindex[3] = 12
SGindex[4] = 14



let menu=[] 

   menu.I= []   
   menu.I[1]= []
   menu.I[2]= []
   menu.I[3]=[]

   menu.I[1][1]= []
   menu.I[1][2]= []
   menu.I[1][3]= []

   menu.I[2][1]= []
   menu.I[2][2]= []
   menu.I[2][3]= []
   menu.I[2][4]= []




   menu.I[1][1] .txt ="How to  play"
   menu.I[1][1] .x =300
   menu.I[1][1] .y =200


   menu.I[1][2] .txt ="Play"
   menu.I[1][2] .x =300
   menu.I[1][2] .y =250

   menu.I[1][3] .txt = "Credit"
   menu.I[1][3] .x = 300
   menu.I[1][3] .y = 300




   menu.I[2][1] .txt ="Easy"
   menu.I[2][1] .x =300
   menu.I[2][1] .y =200



   menu.I[2][2] .txt ="Medium"
   menu.I[2][2] .x =300
   menu.I[2][2] .y =250


   menu.I[2][3] .txt = "Hard"
   menu.I[2][3] .x = 300
   menu.I[2][3] .y = 300

   menu.I[2][4] .txt = "Back"
   menu.I[2][4] .x = 300
   menu.I[2][4] .y = 350


   menu.I[3][1]=[]
   menu.I[3][1] .txt ="Restart"
   menu.I[3][1] .x =300
   menu.I[3][1] .y =200

   menu.I[3][2]=[]
   menu.I[3][2] .txt ="Back to menu"
   menu.I[3][2] .x =300
   menu.I[3][2] .y =250



   menu.curseur = 1 
   menu.statut = 1

