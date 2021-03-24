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

      const html=`<article>
                    <h2>${sarja.show.name}</h2>
                    
                    <figure data-id="${index}">
                   
                    <a href="${sarja.show.officialSite || sarja.show.url}" 
                            title = "Click here to go to official site "
                     >
                          <img src="${sarja.show.image?
          sarja.show.image.medium: 'http://placekitten.com/210/295'}" 
                              alt="${sarja.show.name}"
                          >
                    </a>
                    <figcaption> ${sarja.show.name}</figcaption>
                    </figure>
                    <p>Genres: ${sarja.show.genres.join('|')}<br>
                    ${sarja.show.summary}</p>
                    <hr>
                </article> `;
      main.innerHTML += html;
    });

    const figuret= document.querySelectorAll('figure');
    figuret.forEach((figure,index) => {
      console.log(figure);

      figure.addEventListener('click', ()=>{
        console.log(figure[index]);
      })
    });

  }catch (e){
    console.log(e.message)
  }
});






