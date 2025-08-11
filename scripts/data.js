"use strict";

import { confession, history, constitution, bylaws } from './objects.js';

// look for: indent, underline, span, italics

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

async function Constitution(container) {
  for (let i = 0; i < constitution.data.length; i++) {
      let section = document.createElement('section');
      section.classList.add('constitution-section')
      container.appendChild(section);

      let title = document.createElement('h5');
      title.textContent = constitution.data[i].title;
      section.appendChild(title);

      for (let j = 0; j < constitution.data[i].paragraphs.length; j++) {
        let paragraph = document.createElement(constitution.data[i].paragraphs[j].element);
        paragraph.className = constitution.data[i].paragraphs[j].className;
        paragraph.textContent = constitution.data[i].paragraphs[j].text;
        section.appendChild(paragraph);
      }
  }
}

async function Bylaws(container) {
  for (let i = 0; i < bylaws.data.length; i++) {
      let section = document.createElement('section');
      section.classList.add('bylaws-section')
      container.appendChild(section);

      let title = document.createElement('h5');
      title.textContent = bylaws.data[i].title;
      section.appendChild(title);

      for (let j = 0; j < bylaws.data[i].paragraphs.length; j++) {
        let paragraph = document.createElement(bylaws.data[i].paragraphs[j].element);
        paragraph.className = bylaws.data[i].paragraphs[j].className;
        paragraph.textContent = bylaws.data[i].paragraphs[j].text;
        section.appendChild(paragraph);
      }
  }
}

// async function Resources(container) {
//   let news = document.createElement('div');
//   container.appendChild(news);
//   let newsHeading = document.createElement('h4');
//   newsHeading.textContent = "News";
//   news.appendChild(newsHeading);
//   for (let i = 0; i < resources.data.news.length; i++) {
//       let link = document.createElement('a');
//       link.classList.add('recommended-resource-links');
//       link.textContent = resources.data.news[i][0];
//       link.href = resources.data.news[i][1];
//       link.target = "_blank";
//       news.appendChild(link);
//   }
    
//   let teaching = document.createElement('div');
//   container.appendChild(teaching);
//   let teachingHeading = document.createElement('h4');
//   teachingHeading.textContent = "Teaching";
//   teaching.appendChild(teachingHeading);
//   for (let i = 0; i < resources.data.teaching.length; i++) {
//       let link = document.createElement('a');
//       link.classList.add('recommended-resource-links');
//       link.textContent = resources.data.teaching[i][0];
//       link.href = resources.data.teaching[i][1];
//       teaching.appendChild(link);
//   }

//   let music = document.createElement('div');
//   container.appendChild(music);
//   let musicHeading = document.createElement('h4');
//   musicHeading.textContent = "Music";
//   music.appendChild(musicHeading);
//   for (let i = 0; i < resources.data.music.length; i++) {
//       let link = document.createElement('a');
//       link.classList.add('recommended-resource-links');
//       link.textContent = resources.data.music[i][0];
//       link.href = resources.data.music[i][1];
//       music.appendChild(link);
//   }

//   let podcasts = document.createElement('div');
//   container.appendChild(podcasts);
//   let podcastsHeading = document.createElement('h4');
//   podcastsHeading.textContent = "Podcasts";
//   podcasts.appendChild(podcastsHeading);
//   for (let i = 0; i < resources.data.podcasts.length; i++) {
//       let link = document.createElement('a');
//       link.classList.add('recommended-resource-links');
//       link.textContent = resources.data.podcasts[i][0];
//       link.href = resources.data.podcasts[i][1];
//       podcasts.appendChild(link);
//   }

//   let channels = document.createElement('div');
//   container.appendChild(channels);
//   let channelsHeading = document.createElement('h4');
//   channelsHeading.textContent = "Channels";
//   channels.appendChild(channelsHeading);
//   for (let i = 0; i < resources.data.channels.length; i++) {
//       let link = document.createElement('a');
//       link.classList.add('recommended-resource-links');
//       link.textContent = resources.data.channels[i][0];
//       link.href = resources.data.channels[i][1];
//       channels.appendChild(link);
//   }

//   let publishers = document.createElement('div');
//   container.appendChild(publishers);
//   let publishersHeading = document.createElement('h4');
//   publishersHeading.textContent = "Publishers";
//   publishers.appendChild(publishersHeading);
//   for (let i = 0; i < resources.data.publishers.length; i++) {
//       let link = document.createElement('a');
//       link.classList.add('recommended-resource-links');
//       link.textContent = resources.data.publishers[i][0];
//       link.href = resources.data.publishers[i][1];
//       publishers.appendChild(link);
//   }

//   let classicAuthors = document.createElement('div');
//   container.appendChild(classicAuthors);
//   let classicAuthorsHeading = document.createElement('h4');
//   classicAuthorsHeading.textContent = "Classic Authors";
//   classicAuthors.appendChild(classicAuthorsHeading);
//   for (let i = 0; i < resources.data.classicAuthors.length; i++) {
//       let p = document.createElement('p');
//       p.textContent = resources.data.classicAuthors[i];
//       classicAuthors.appendChild(p);
//   }

//   let modernAuthors = document.createElement('div');
//   container.appendChild(modernAuthors);
//   let modernAuthorsHeading = document.createElement('h4');
//   modernAuthorsHeading.textContent = "Modern Authors";
//   modernAuthors.appendChild(modernAuthorsHeading);
//   for (let i = 0; i < resources.data.modernAuthors.length; i++) {
//       let p = document.createElement('p');
//       p.textContent = resources.data.modernAuthors[i];
//       modernAuthors.appendChild(p);
//   }
// }

export { Confession, History, Constitution, Bylaws };