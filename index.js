let facts;
let circleColors = ['#a590ed', '#c990ed', '#ed90cb', '#ed9099', '#9099ed', '#90aced', '#baed90', '#eddf90', '#edaa90', '#ed8a8a'];

// ELEMENTS
let factContainer;

const renderFacts = function () {
    for (let i = 0; i < 10; i++) {
        // Create fact element
        let fact = document.createElement('div');
        fact.classList.add('fact');

        // Create fact circle
        let factCircle = document.createElement('div');
        factCircle.classList.add('fact-circle');
        let randomColor = circleColors[Math.floor(Math.random() * circleColors.length)];
        factCircle.setAttribute('style', `background-color: ${randomColor}`);

        // Create fact info
        let factInfo = document.createElement('div');
        factInfo.classList.add('fact-info');

        // Create fact info title and add to fact info
        let factInfoTitle = document.createElement('h2');
        factInfoTitle.classList.add('info-title');
        let factInfoTitleText = document.createTextNode(facts.all[i].text);
        factInfoTitle.appendChild(factInfoTitleText);
        factInfo.appendChild(factInfoTitle);

        // Create fact info link and add to fact info
        if (facts.all[i].user) {
            let factInfoLink = document.createElement('p');
            factInfoLink.classList.add('user');
            let factInfoLinkText = document.createTextNode('By ' + facts.all[i].user.name.first + ' ' + facts.all[i].user.name.last);
            factInfoLink.appendChild(factInfoLinkText);
            factInfo.appendChild(factInfoLink);
        }

        // Create fact copy and upvotes
        let factCopyAndUpvotes = document.createElement('div');
        factCopyAndUpvotes.classList.add('fact-copy-and-upvotes');

        // Create copy ion-icon and add to fact copy and upvotes
        let factCopyIcon = document.createElement('ion-icon');
        factCopyIcon.classList.add('copy-icon');
        factCopyIcon.setAttribute('name', 'copy-outline');
        factCopyAndUpvotes.appendChild(factCopyIcon);

        factCopyIcon.addEventListener('click', function () {
            let range = document.createRange();
            range.selectNode(factInfoTitle);
            window.getSelection().removeAllRanges(); // clear current selection
            window.getSelection().addRange(range); // to select text
            document.execCommand('copy');
            window.getSelection().removeAllRanges(); // to deselect
        });

        // Create fact upvotes and add to fact copy and upvotes
        let factUpvotes = document.createElement('p');
        factUpvotes.classList.add('fact-upvotes');
        let factUpvotesText = document.createTextNode(facts.all[i].upvotes + ' upvotes');
        factUpvotes.appendChild(factUpvotesText);
        factCopyAndUpvotes.appendChild(factUpvotes);

        // Add fact circle, fact info and fact copy and upvotes to fact
        fact.appendChild(factCircle);
        fact.appendChild(factInfo);
        fact.appendChild(factCopyAndUpvotes);

        // Add fact to fact container
        factContainer.appendChild(fact);
    }
};

fetch('https://cat-fact.herokuapp.com/facts')
    .then((response) => response.json())
    .then((data) => (facts = data))
    .then(renderFacts);

window.addEventListener('DOMContentLoaded', function () {
    factContainer = document.getElementById('factContainer');

    let generateFactsButton = document.getElementById('generateFactsButton');
    generateFactsButton.addEventListener('click', function () {
        if (facts.all.length < 20) {
            alert('No more facts :(');
        } else {
            factContainer.innerHTML = '';
            facts.all = facts.all.slice(10);
            renderFacts();
        }
    });
});
