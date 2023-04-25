/* TODO: inserite il codice JavaScript necessario a completare il MHW! */


function OnFirstclick(){

     let tar=event.currentTarget
     let ch
     let qid=CheckId(tar)

  Index(tar,qid);
if(qid==="one"){
    chosen1=true
for(let re of notChosenChoices1 ){
   
re.classList.add('opaco')
re.classList.remove('selected')
re.removeEventListener('click',OnFirstclick)
re.addEventListener('click', OnSecondClick)
}
typeOfChoices[0]= tar.dataset.choiceId
ch=AllChosen(chosen1,chosen2,chosen3)
}

if(qid==="two"){
     chosen2=true
for(let re of notChosenChoices2 ){
    

re.classList.add('opaco')
re.classList.remove('selected')
re.removeEventListener('click',OnFirstclick)
re.addEventListener('click', OnSecondClick)}

typeOfChoices[1]= tar.dataset.choiceId
ch=AllChosen(chosen1,chosen2,chosen3)
}


if(qid==="three"){
    chosen3=true
for(let re of notChosenChoices3 ){
     
re.classList.add('opaco')
re.classList.remove('selected')
re.removeEventListener('click',OnFirstclick)
re.addEventListener('click', OnSecondClick)}

typeOfChoices[2]= tar.dataset.choiceId
ch=AllChosen(chosen1,chosen2,chosen3)
}

if(ch) Result()



}

function OnSecondClick(){
   Starter()
   let target=event.currentTarget
   let qid=CheckId(target)
   Unchecker(qid)
   OnFirstclick()

   target.classList.remove('opaco')


}


function CheckId(tar){
        

        let qid=tar.dataset.questionId
         return qid
     }

function Checker(tar){
    
    let uncheck=tar.childNodes[3]
    let check=tar.childNodes[5]
     
    uncheck.classList.add('hidden')
    check.classList.remove('hidden')

}

function Unchecker(qid){
   
   if(qid==="one")
   for(let ch of notChosenChoices1){
    let uncheck=ch.childNodes[3]
    
    let check=ch.childNodes[5]
    uncheck.classList.remove('hidden')
    check.classList.add('hidden')
   }

   if(qid==="two")
   for(let ch of notChosenChoices2){
    let uncheck=ch.childNodes[3]
    let check=ch.childNodes[5]
    uncheck.classList.remove('hidden')
    check.classList.add('hidden')
   }

   if(qid==="three")
   for(let ch of notChosenChoices3){
    let uncheck=ch.childNodes[3]
    let check=ch.childNodes[5]
    uncheck.classList.remove('hidden')
    check.classList.add('hidden')
   }



}

function AllChosen(ch1,ch2,ch3){
    if(ch1===ch2 && ch1===ch3)return true
    else return false

}


function Index(tar,qid){
	
    if(qid==="one"){
    const indexToRemove = notChosenChoices1.indexOf(tar)
    notChosenChoices1.splice(indexToRemove,1)
    Checker(tar)
    tar.classList.add('selected')
    
    }
    if(qid==="two"){
    const indexToRemove = notChosenChoices2.indexOf(tar)
    notChosenChoices2.splice(indexToRemove,1)
    Checker(tar)
    tar.classList.add('selected')
   
    
    }
    if(qid==="three"){
    const indexToRemove = notChosenChoices3.indexOf(tar)
    notChosenChoices3.splice(indexToRemove,1)
    Checker(tar)
    tar.classList.add('selected')
   
    }

}

function Result(){
    
    for(const re of divs ){
    re.removeEventListener("click",OnSecondClick)
    re.removeEventListener("click",OnFirstclick)
    }
let type=Calc()
let article= document.querySelector("article")
 const result = document.createElement("section")
 const resultTitle = document.createElement("h1")
 const resultText=document.createElement("h2")
 result.classList.add("result")
 resultTitle.textContent=RESULTS_MAP[type].title
 resultText.textContent=RESULTS_MAP[type].contents
 const button= document.createElement("button");
 button.textContent= 'Ricomincia il quiz'
 
 article.appendChild(result)
 result.appendChild(resultTitle)
 resultTitle.appendChild(resultText)
 result.appendChild(button)
 button.addEventListener('click',OnClick)


}

function AlreadyThere(element,list){
   let isThere=false    
for(let elem of list)
    if(elem===element){ isThere=true;
    break;
    }
    return isThere
}


function Starter(){
    for(const re of divs ){
     re.addEventListener("click",OnFirstclick)

     if(re.dataset.questionId==="one")
      if(!AlreadyThere(re,notChosenChoices1))
      notChosenChoices1.push(re)

     if(re.dataset.questionId==="two")
      if(!AlreadyThere(re,notChosenChoices2))
         notChosenChoices2.push(re)


      if(re.dataset.questionId==="three")
        if(!AlreadyThere(re,notChosenChoices3))
           notChosenChoices3.push(re)

}
}

function Calc(){
    let type
    for(let i=0;i<3;i++){
        let temp=typeOfChoices[i]
        for(let j=1;j<3;j++){
            if(i!=j)
              if(temp===typeOfChoices[j]){
                type=temp;
                return type

            }

        }


    }
    type=typeOfChoices[0]
    console.log(type)
    return type


}

function OnClick(){
 
Starter()

 Unchecker('one')
 Unchecker('two')
 Unchecker('three')

 for(const re of divs ){
    re.classList.remove('opaco')
    re.classList.remove('selected')}
 chosen1=chosen2=chosen3=false
 
 let result=document.querySelector(".result")
 result.remove()
 window.scrollTo(0,0)
 
}

function createImage(src) {
  const image = document.createElement('img');
  image.src = src;
  return image;
}

function onThumbnailClick(event) {
  const image = createImage(event.currentTarget.src);
  document.body.classList.add('no-scroll');
  modalView.style.top = window.pageYOffset + 'px';
  modalView.appendChild(image);
  modalView.classList.remove('hidden');
  for (let ima of imgs) 
  ima.removeEventListener('click', onThumbnailClick);
  
  event.stopPropagation();
}

function onModalClick() {
  document.body.classList.remove('no-scroll');
  modalView.classList.add('hidden');
  modalView.innerHTML = '';
  for (let ima of imgs) 
  ima.addEventListener('click', onThumbnailClick);
  for (let che of checkboxes) 
  che.removeEventListener('click', onThumbnailClick)
}


const divs= document.querySelectorAll("section div")
const imgs=document.querySelectorAll("div img")
const checkboxes= document.querySelectorAll(".checkbox")
for (let ima of imgs) 
  ima.addEventListener('click', onThumbnailClick);
for (let che of checkboxes) 
  che.removeEventListener('click', onThumbnailClick)


const modalView = document.querySelector('#modal-view');
modalView.addEventListener('click', onModalClick);

chosen1=chosen2=chosen3=false;
const notChosenChoices1=[]
const notChosenChoices2=[]
const notChosenChoices3=[]
const typeOfChoices=[];

Starter()





