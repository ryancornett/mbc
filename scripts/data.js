"use strict";

import confession from "../data/confession.json" assert { type: "json" };
import history from "../data/history.json" assert { type: "json" };
import constitution from "../data/constitution.json" assert { type: "json" };
import bylaws from "../data/bylaws.json" assert { type: "json" };

function populateChapterSections(container, index) {
    for (let i = 0; i < confession.data[index].text.length; i++) {
        let section = document.createElement('div');
        section.setAttribute('class', 'chapter-section');
        let paragraph = document.createElement('span');
        paragraph.innerHTML = confession.data[index].text[i].paragraph;
        section.appendChild(paragraph);
        let references = document.createElement('p');
        references.textContent = confession.data[index].text[i].references;
        section.appendChild(references);
        container.appendChild(section);
    }
}

function populateChapters(container, index) {
    let chapterDiv = document.createElement('div');
    chapterDiv.setAttribute('class', 'chapter');
    let chapterTitleCard = document.createElement('div');
    chapterTitleCard.setAttribute('class', 'chapter-title-card');
    let chapterTitle = document.createElement('h6');
    chapterTitle.setAttribute('class', 'chapter-title');
    chapterTitle.textContent = confession.data[index].title;
    chapterTitleCard.appendChild(chapterTitle);
    let chapterPlusX = document.createElement('p');
    chapterPlusX.setAttribute('class', 'chapter-plus-x');
    chapterPlusX.textContent = '+';
    chapterTitleCard.appendChild(chapterPlusX);
    chapterDiv.appendChild(chapterTitleCard);
    let chapterSections = document.createElement('div');
    chapterSections.setAttribute('class', 'chapter-sections');
    populateChapterSections(chapterSections, index)
    chapterDiv.appendChild(chapterSections);
    container.appendChild(chapterDiv);
}

function Confession(container) {
  for (let i = 0; i < confession.data.length; i++) {
    populateChapters(container, i);
  };

  let chapterTitles = document.querySelectorAll('.chapter-title-card');
  let plusSign = document.querySelectorAll('.chapter-plus-x');
  let chapterSections = document.querySelectorAll('.chapter-sections');
  let expandables = [chapterTitles, plusSign, chapterSections];

  function collapseAll(position) {
    for (let i=0; i < expandables.length; i++) {
      expandables[i][position].classList.remove('active');
    }
  }

  function expandCard(position) {
  for (let i=0; i < expandables.length; i++) {
      expandables[i][position].classList.add('active');
    }
  }

  chapterTitles.forEach((chapterTitle, index) => {
      chapterTitle.addEventListener('click', () => {
          if (chapterTitle.classList.contains('active')) {
          for (let i = 0; i < chapterTitles.length; i++) {
              collapseAll(i);
          }
          } else {        
          for (let j = 0; j < chapterTitles.length; j++) {
              collapseAll(j);
              expandCard(index);
          }    
      }
    })
  });
}

async function History(container) {
  for (let i = 0; i < history.data.length; i++) {
      let section = document.createElement('section');
      section.classList.add('history-section')
      container.appendChild(section);

      let period = document.createElement('h5');
      period.textContent = history.data[i].title;
      section.appendChild(period);

      for (let j = 0; j < history.data[i].text.length; j++) {
        let paragraph = document.createElement('p');
        paragraph.textContent = history.data[i].text[j];
        section.appendChild(paragraph);
      }
  }
}

export { Confession, History };