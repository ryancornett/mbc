/** Contents are built after the existing data modules populate the document. */
export default function ReadingNavigation() {
    const main = document.querySelector('.constitution-main, .history-main, .confession-main');
    if (!main) return;
    main.classList.add('reading-main');
    const title = main.querySelector('h4');
    if (title) {
        const heading = document.createElement('h1');
        heading.className = 'page-title';
        heading.textContent = title.textContent;
        title.replaceWith(heading);
    }
    const layout = document.createElement('div');
    layout.className = 'reading-layout';
    const article = document.createElement('article');
    article.className = 'reading-article';
    // Leave the page title above both columns.
    [...main.children].filter(child => !child.classList.contains('page-title'))
        .forEach(child => article.appendChild(child));
    const contents = document.createElement('details');
    contents.className = 'reading-contents';
    contents.open = matchMedia('(min-width: 1100px)').matches;
    const summary = document.createElement('summary');
    summary.textContent = 'On this page';
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'On this page');
    const list = document.createElement('ul');
    const targets = [];
    let currentGroup = '';
    const sections = article.querySelectorAll('.constitution-section, .bylaws-section, .history-section, .chapter');
    sections.forEach((section, index) => {
        const heading = section.querySelector('h3, h5, h6');
        if (!heading) return;
        const group = section.classList.contains('bylaws-section') ? 'Bylaws' :
            section.classList.contains('constitution-section') ? 'Constitution' : '';
        if (group && group !== currentGroup) {
            const groupItem = document.createElement('li');
            groupItem.className = 'contents-group';
            groupItem.textContent = group;
            list.appendChild(groupItem);
            currentGroup = group;
        }
        const slug = heading.textContent.toLowerCase().normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        section.id = `${group ? group.toLowerCase() + '-' : ''}${slug || 'section-' + (index + 1)}`;
        section.tabIndex = -1;
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${section.id}`;
        link.textContent = heading.textContent;
        item.appendChild(link);
        list.appendChild(item);
        targets.push({ section, link });
    });
    const print = document.createElement('button');
    print.type = 'button';
    print.className = 'reading-print';
    print.textContent = 'Print this page';
    print.addEventListener('click', () => window.print());
    nav.append(list, print);
    contents.append(summary, nav);
    layout.append(contents, article);
    main.appendChild(layout);

    function revealHash(focus = false) {
        let id;
        try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
        const entry = targets.find(({ section }) => section.id === id);
        if (!entry) return;
        if (entry.section.matches('details')) entry.section.open = true;
        requestAnimationFrame(() => {
            entry.section.scrollIntoView({ block: 'start' });
            if (focus) entry.section.focus({ preventScroll: true });
        });
    }
    nav.addEventListener('click', event => {
        const link = event.target.closest('a');
        if (!link) return;
        const entry = targets.find(target => target.link === link);
        if (entry?.section.matches('details')) entry.section.open = true;
        if (!matchMedia('(min-width: 1100px)').matches) contents.open = false;
        // Also handle clicking the already-current fragment.
        if (link.hash === location.hash) revealHash(true);
    });
    window.addEventListener('hashchange', () => revealHash(true));
    revealHash();
    const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            targets.forEach(({ section, link }) => {
                if (section === entry.target) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        }
    }, { rootMargin: '-5% 0px -65% 0px', threshold: 0 });
    targets.forEach(({ section }) => observer.observe(section));
    const desktop = matchMedia('(min-width: 1100px)');
    desktop.addEventListener('change', event => { contents.open = event.matches; });

    // Print every chapter, then restore the reader's chosen open states.
    let openStates = [];
    window.addEventListener('beforeprint', () => {
        openStates = [...article.querySelectorAll('details')].map(el => [el, el.open]);
        openStates.forEach(([el]) => { el.open = true; });
    });
    window.addEventListener('afterprint', () => {
        openStates.forEach(([el, open]) => { el.open = open; });
    });
}
