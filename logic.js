var cardBacks = document.getElementsByClassName("cardBack");
var cardBounds=document.getElementsByClassName("inner");
var cards = document.getElementsByClassName("cards");
var flippedCards=[];
var Score=0;
var time=00;
const scoreTxt = document.querySelector(".score");
const timeTxt = document.querySelector(".time");
const randomizeBtn = document.querySelector("button");

var x=0;
var li=[];
var previousVal=0;
var presentVal=0;

// Generating random numbers[1-16] to select 1-8 images two times 

function randomNum()
{
    x=Math.floor((Math.random() * 16) + 1);
    if(li.includes(x))
    {
        randomNum();
    }
    else
    {
        li.push(x);
    }
}

for(let i=0;i<cardBacks.length;i++)
{
    randomNum();
    if(x>8)
    {
        x=x-8;
    }
    console.log(li);
    cardBacks[i].style.backgroundImage="url(imgs/puzzle_imgs/"+x+".svg)";
    console.log("Done");
    cardBacks[i].style.backgroundPosition="center";
    cardBacks[i].style.backgroundRepeat="no-repeat";
    cardBacks[i].style.backgroundSize="30%";
    cards[i].val=x;
}

// flipping and unflipping the card on clicks

for(let k=0;k<cardBounds.length;k++)
{
    cardBounds[k].addEventListener('click',()=>{
        if(cards[k].classList.contains("flipped"))
        {
            cards[k].classList.remove("flipped");
            cards[k].style.transform="rotateY(360deg)";
            presentVal=0;
            previousVal=0;
            //deleting the element from arr
            flippedCards = flippedCards.filter(item => item !== cards[k]);
            console.log(flippedCards);
        }
        else
        {
            cards[k].style.transform="rotateY(180deg)";
            cards[k].classList.add("flipped");
            flippedCards.push(cards[k]);
        }
        console.log(cards[k].classList);
        console.log(cards[k].val);
        console.log(flippedCards);
    });
}

//setting scores values and unflippig the previous card if there is more than 2 cards flipped

setInterval(()=>{
time=time+0.003;
timeTxt.innerHTML="TIME : "+parseInt(time)+"s";
if(flippedCards.length>2)
{
    for(var n=0;n<flippedCards.length-1;n++)
    {
        flippedCards[n].classList.remove("flipped");
        flippedCards[n].style.transform="rotateY(360deg)";  
        flippedCards = flippedCards.filter(item => item !== flippedCards[n]);   
        console.log(flippedCards);
    }
}

// if both cards are same then they disappear .... done by creating property named val

if(flippedCards.length==2)
{
    if(flippedCards[0].val===flippedCards[1].val)
    {

        // this is done to overcome an error when u click while the condition is true some unusual behaviour was observed

        for(let k=0;k<cardBounds.length;k++)
        {
            cardBounds[k].style.pointerEvents="none";
        }
        setTimeout(()=>{
        flippedCards[0].style.display="none";
        flippedCards[1].style.display="none";
        flippedCards = flippedCards.filter(item => item !== flippedCards[0]); 
        flippedCards = flippedCards.filter(item => item !== flippedCards[1]);
        console.log(flippedCards); 

        Score++;
        scoreTxt.innerHTML="SCORE : "+Score;
        if(Score===8)
        {
        setTimeout(()=>{
            alert("Yayyyy !!! YOU WON \n SCORE : "+Score+"\n "+timeTxt.innerHTML+"\nDo you want to play again ??");
            location.reload();
        },800)
        }    

        // making the pointer normal when cards are disappeared under the true condition

        setTimeout(()=>{
        for(let k=0;k<cardBounds.length;k++)
        {
            cardBounds[k].style.pointerEvents="auto";
        }            
        },900);
        },900);
    }
}
},1);

//setting up the randomize button

randomizeBtn.addEventListener("click",()=>{
    location.reload();
});


// Not included : to automatically unflip the cards after some seconds bcz of some unusual logical errors