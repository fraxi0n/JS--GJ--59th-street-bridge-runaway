
   
function FreezeTUTO()
{
    let x = false
   if (distVoiture>= tuto.x[tuto.state]) {x=true}
  // console.log( tuto.x[tuto.state], distVoiture)
   return x

}



function InitTUTO()
{

    tuto.state = 1

    voiture.x = voiture.xGame
    nbObstacleSegment = 7
    nbSegment = 3

    segment=[]
    segment[1] = [] 
    segment[1][1] = 7
    segment[1][2] = 12
    segment[1][3] = 3
    segment[1][4] = 4
    segment[1][5] = 10
    segment[1][6] = 12
    segment[1][7] = 14

    segment[2] = [] 
    segment[2][1] = 10
    segment[2][2] = 6
    segment[2][3] = 8
    segment[2][4] = 7
    segment[2][5] = 12
    segment[2][6] = 6
    segment[2][7] = 3

    segment[3] = [] 
    segment[3][1] = 9
    segment[3][2] = 2
    segment[3][3] = 1
    segment[3][4] = 14
    segment[3][5] = 6
    segment[3][6] = 1
    segment[3][7] = 9




    //segment = [ [1,1,1,1,1] [1,8,1,2,3] ];

    segment[1].voieDepart = 1
    segment[1].nbVoie= 4
    segment[2].voieDepart = 2
    segment[2].nbVoie= 3
    segment[3].voieDepart = 1
    segment[3].nbVoie= 2

    msgMin=0.70
    msgMax=0.70




    voitureSpeed = TvoitureSpeed [ 0]
    distObstacle = TdistObstacle [ 0]
    distDepart  =  1.30 * distObstacle
    distMessage= voitureSpeed * 1



    distSegment = ( nbObstacleSegment+1)*distObstacle


    distTotal = distSegment*nbSegment + distDepart-(9*70)

    msgMin = 6.6
    msgMax = 6.6


    voiture.V = 2 
    voiture.y = V[voiture.V]

    roadX= 0
 // fond init  

    InitMenu()

    frameVoiture = 1
    distVoiture = 0
    nextObstacle = 1

    segment [nbSegment+1] = []
    for (S = 1; S <= nbObstacleSegment ; S++ )
    {
        segment[nbSegment+1][S]= 0
    } 
        
    segment[nbSegment+1].nbVoie=4
    segment[nbSegment+1].voieDepart=1



    nextMessage = []
    for (let S = 1 ; S <= nbSegment; S++ )
    {
        nextMessage[S] = distDepart + distSegment * (S-1) + distSegment * RandomINT (msgMin,msgMax)/10
    }


    for (S = 0; S<= ((nbSegment+1) * nbObstacleSegment*10); S++ )
    {
        skinObstacle[S] = RandomINT(1,4)
        
    }



}



let tuto = []


tuto.txt=[]
tuto.txtX=[]
tuto.txtY=[]

for (let S= 1; S <=10; S++)
{
    tuto.txt [S] = []
    tuto.txtX[S] = []
    tuto.txtY[S] = []

}


tuto.x= [0,900,5300,5300,7400, 11500]


tuto.txt [1][1] = "use arrow to dodge cars"
tuto.txtX[1][1] = 465
tuto.txtY[1][1] = 300


tuto.txt [2][1] = "brain aware you, the bottom road will be mine soon"
tuto.txtX[2][1] = 350-20-20
tuto.txtY[2][1] = 300

tuto.txt [3][1] = "it will be impractical from the white crosswalk to the yellow crosswalk" // "carreful this way will be unpractical only after the white crosswalk"
tuto.txtX[3][1] = 200+5
tuto.txtY[3][1] = 300
tuto.txt [3][2] = "for now this way is still sure "
tuto.txtX[3][2] = 500-50-3
tuto.txtY[3][2] = 321

tuto.txt [4][1]  = "white part are always free of mine and obstacle"
tuto.txtX[4][1]  = 300+15
tuto.txtY[4][1]  = 300
tuto.txt [4][2]  = "remember, the mined part begin right after the white crosswalk"
tuto.txtX[4][2]  = 270+20-50
tuto.txtY[4][2]  = 321

tuto.txt [5][1] = "brain aware you again, but careful :"
tuto.txtX[5][1] = 400
tuto.txtY[5][1] = 300
tuto.txt [5][2] = "his last warning is still cumpting until the next yellow crosswalk !"
tuto.txtX[5][2] = 200
tuto.txtY[5][2] = 321



/*


tuto.txt [1] = ""
tuto.txtX[1] =
tuto.txtY[1] =
*/

