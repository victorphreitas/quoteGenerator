//get button to fetch data from the api
const buttonQuote = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
//container elements 
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.querySelector('.quote-text')
const quoteAuthor = document.querySelector('.quote-author')
const quoteBtn = document.querySelector('.button-container')
//loader element 
const loader = document.querySelector('.loader');
//url 
const url = 'https://type.fit/api/quotes';
let apiQuotes;

//DOMContentLoaded event is to populate the the quote element with with text when the user refresh or first open the page
document.addEventListener('DOMContentLoaded', generateQuote);
buttonQuote.addEventListener('click', generateQuote);
//twitter event goes here
twitterBtn.addEventListener('click', tweet);

function loading(){
  // quoteContainer.style.display = 'none';
  loader.style.display = 'block';
}

function complete(){
  loader.style.display = 'none';
  quoteContainer.style.display = 'block';
}

function tweet(event){
  //here I move the user to this url https://twitter.com/intent/tweet
  const twitterText = document.getElementById('quote').textContent
  const authorText = document.getElementById('author').textContent
  console.log(twitterText)
  const twitterUrl = `https://twitter.com/intent/tweet?text=${twitterText} - ${authorText}`
  window.open(twitterUrl, '_blank')
  event.preventDefault()
}

async function generateQuote(event) {
  // console.log('Quote generated successfully.')
  try {
    const response = await fetch(url)
    apiQuotes = await response.json()
  } catch(err) {
    //alert error here 
    alert(err)
  }
  // here we have to show the loader only when user reloads the page
  if (event.type === 'DOMContentLoaded'){
    //add the loader and disable the quotes
    loading()
    setTimeout(()=>{complete()},700)
  }
  
  //apiQuotes[0].text and the author apiQuotes[0].author
  const randomIndex = Math.floor(Math.random()*apiQuotes.length)

  
  document.getElementById('quote').innerText = `${apiQuotes[randomIndex].text}`
  //in case author is undefined this code will replace the undefined value
  if (apiQuotes[randomIndex].author === null){
    document.getElementById('author').innerText = "Unknown Author"
  } else {
    document.getElementById('author').innerText = `${apiQuotes[randomIndex].author}`
  }
  
  if (apiQuotes[randomIndex].text.length > 120){
    //add the class long-quote to the element with an id of quote
    document.getElementById('quote').classList.add('long-quote')
  } else {
    document.getElementById('quote').classList.remove('long-quote')
  }
  event.preventDefault()
};

