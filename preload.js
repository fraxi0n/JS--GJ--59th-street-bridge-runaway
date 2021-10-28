let hasPlaySignal = false;


let voitureSpeed// = 1120  // vitesse de la voiture 
let TvoitureSpeed =[ 784, 1008, 1344, 1344 ] // difficulté - none - easy - medium - hard - hardcore


let distObstacle// = 1200   //la distance entre chaque ligne d'obstacle 
let TdistObstacle =[ 840, 1080, 1440,720 ] // difficulté - none - easy - medium - hard - hardcore

/* la vitesse et la distance doivent etre modifier proportionellement pour rester en tempo
 vitesse voiture * 112 /120  = écart obstacle
*/



let distMessage   // la distance sur laquelle le message est affiché 


// A NE PAS RETIRER CORRESPOND A QUOI?? -- créneaud sur lequell le message peut apparaitre
let msgMin
let msgMax

let nbSegment = 12 // un segment correspond a une portion marqué en jaune

let segment/* = []

// A RETIRER ??

for(let S= 1; S<=nbSegment ; S++) 
{ 
    segment[S]=[]
}
*/
let nbObstacleSegment = 16 // le nb de ligne d'obstacle à chaque segment


let skinObstacle = [] 



//--------------------------------------------------------------------





// A changer pour les perf
let GameMod = 1


let imgObstacle = []

let imgMainRoad = new Image 
let imgInterRoad = new Image 

let imgBarriere = new Image 
let imgInterSegmentW = new Image 
let imgInterSegmentY = new Image 

let imgTitre = new Image 
let imgCurseur = new Image
let curseur=[]

let imgBulle = new Image
let imgNupe = new Image 



let imgVoitureIntro = []

let imgIntroPlanche = new Image 

let imgStart1 = new Image 
let imgStart2 = new Image 

let imgEnd1 = new Image 
let imgEnd2 = new Image 

let imgBlack = new Image
let imgTuto2_1 = new Image
let imgTuto3_1 = new Image



fond1_1 = new Image
fond1_2 = new Image
fond2_1 = new Image
fond2_2 = new Image
fond3_1 = new Image
fond3_2 = new Image
fond4_1 = new Image
fond4_2 = new Image
fond5   = new Image

let fond1_1X
let fond1_2X
let fond2_1X
let fond2_2X
let fond3_1X 
let fond3_2X 
let fond4_1X 
let fond4_2X 


let fond1_2W = 2000
let fond2_2W = 1747
let fond3_2W = 1509
let fond4_2W = 1336





// position de la route 

let roadX 
let roadY=  303
let roadEcartX = 399
let roadEcartY = 80

let distTotal
let distVoiture // 
let distDepart  //=  1.2 * distObstacle// distObstacle*0.5   --1.2
let distSegment //= ( nbObstacleSegment+1.5)*distObstacle
let nextObstacle //
let nextMessage  //

let decalWin = 0

let voitureCrash=[]
voitureCrash.img=[]

let voitureBoom=[]
voitureBoom.img=[]

let voiture= []
voiture.img=[]

let V=[]
V[1] = roadY-10
V[2] = V[1]+roadEcartY
V[3] = V[1]+roadEcartY*2
V[4] = V[1]+roadEcartY*3

voiture.V=2

voiture.xGame = 30
voiture.xIntro = -200


let frameVoiture = 1



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

   menu.I[1][1]= []
   menu.I[1][2]= []



   menu.I[2][1]= []
   menu.I[2][2]= []
   menu.I[2][3]= []
   menu.I[2][4]= []
   menu.I[2][5]= []

   
   menu.I[2][1] .txt ="how to play"
   menu.I[2][1] .x = 600-60
   menu.I[2][1] .y =125-25


   menu.I[2][2] .txt ="Easy"
   menu.I[2][2] .x = 600-25
   menu.I[2][2] .y =175-30


   menu.I[2][3] .txt = "Medium"
   menu.I[2][3] .x = 600-30
   menu.I[2][3] .y = 225-35

   menu.I[2][4] .txt = "Hard"
   menu.I[2][4] .x = 600-25
   menu.I[2][4] .y = 275-40

   menu.I[2][5] .txt = "Hardcore"
   menu.I[2][5] .x = 600-50
   menu.I[2][5] .y = 325-45

   menu.I[1][1]=[]
   menu.I[1][1] .txt ="Restart"
   menu.I[1][1] .x =600-35
   menu.I[1][1] .y =150

   menu.I[1][2]=[]
   menu.I[1][2] .txt ="Back to menu"
   menu.I[1][2] .x =600-60
   menu.I[1][2] .y =200


   menu.curseur = 1 
   menu.statut = 2

   let raisonBoom
   let timer 

