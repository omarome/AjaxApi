'use strict';

const form= document.querySelector('#search-form')
const main =document.querySelector('main');

form.addEventListener('submit',async(eyt)=>{
  eyt.preventDefault()

  try{

    const hakusana=document.querySelector('input[name=search-field]').value;
    const vastaus= await fetch('http://api.tvmaze.com/search/shows?q=' + hakusana);
    const sarjat = await  vastaus.json();
    console.log(sarjat);

    if(sarjat.length===0){
      main.innerText="Havullasi ei löytynyt yhtään sarjaa";
      return;
    }
    sarjat.forEach((sarja,index)=>{
      const article= document.createElement('article');
      const h2= document.createElement('h2');
      const figure= document.createElement('figure');
      const figcaption= document.createElement('figcaption');
      const img= document.createElement('img');
      const p= document.createElement('p');
      const div = document.createElement('div');
      const hr=document.createElement('hr');
      const a=document.createElement('a');

      h2.innerHTML = sarja.show.name;
      figcaption.innerHTML=sarja.show.name;
      p.innerHTML=sarja.show.genres.join('|');
      div.innerHTML=sarja.show.summary;
      img.src= sarja.show.image ?
          sarja.show.image.medium :'http://placekitten.com/210/295';
      img.alt=sarja.show.name;
      a.href=sarja.show.officialSite || sarja.show.url;
      a.title= "Click here to go to official site ";


      a.appendChild(img)
      figure.appendChild(a);
      figure.appendChild(figcaption);
      article.appendChild(h2);
      article.appendChild(figure);
      article.appendChild(p);
      article.appendChild(div);
      article.appendChild(hr)

      figure.addEventListener('click',()=>{
        console.log(sarja.show.image.original);
        // window.location.href=sarja.show.officialSite || sarja.show.url;
      });
      main.appendChild(article)
    });

  }catch (e){
    console.log(e.message)
  }

});






