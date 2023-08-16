const switcher = document.querySelector('.switcher');
switcher.innerHTML = `<img src="../images/moon.png" />`;
const switcherContainer = document.querySelector('.switcher-container');
const svg = document.querySelector('svg');
const themeElements = [switcher, switcherContainer];
let lightTheme = true;

function switchTheme() {
  for (let i=0; i<themeElements.length; i++) {
    themeElements[i].classList.toggle('dark');
  }
  if (lightTheme) {
     switcher.innerHTML = `<img src="../images/sun.png" />`;
     lightTheme = false;
  
  } else {
     switcher.innerHTML = `<img src="../images/moon.png" />`;
     lightTheme = true;
  }
}

switcher.addEventListener('click', () => {
   switchTheme();
});

// >>> EVERY PAGE GETS A PAGE ID TO FACILITATE THE BELOW SWITCH/CASE TO DETERMINE THE ELEMENTS ARRAY FOR THEME SWITCHING <<<

// CHANGE themeElements to a parameter with each page's corresponding elements array

let pageId = document.getElementById('page-id').classList.value;

switch (pageId) {
    case 'index': // switchTheme(indexElements); break;
    case 'salvation': // switchTheme(salvationElements); break;
    case 'history': // switchTheme(historyElements); break;
    case 'beliefs': console.log('success'); break;
    case null: console.log('null'); break;
}

// >>> EVERY PAGE GETS A PAGE ID TO FACILITATE THE ABOVE SWITCH/CASE TO DETERMINE THE ELEMENTS ARRAY FOR THEME SWITCHING <<<