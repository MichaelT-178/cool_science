document.addEventListener('DOMContentLoaded', () => {

    let allData = [];


    const filterCards = (filterText = '') => {

        const container = document.getElementById('video-card-container');
        const sideMenu = document.getElementById('side-menu');

        container.innerHTML = '';
        sideMenu.innerHTML = '';

        allData.forEach((video, index) => {

            if (video.title.toLowerCase().includes(filterText.toLowerCase()) || 
                video.description.toLowerCase().includes(filterText.toLowerCase()) || 
                filterText === '') {
                    
                const component = new VideoCard(video.image, video.title, video.description, video.link);
                component.render(container);

                const menuItem = document.createElement('a');
                menuItem.href = `#video-${index}`;
                menuItem.innerText = video.title;
                menuItem.className = 'menu-item';

                sideMenu.appendChild(menuItem);

                const lastChild = container.lastElementChild;
                lastChild.id = `video-${index}`;

                menuItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.getElementById(lastChild.id).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            }
        });

        let noResultsText = document.getElementById("no-results");
        
        noResultsText.innerText = (container.innerHTML === "")
                                  ? `No results for: "${filterText}"`
                                  : ""
    };

    const loadJsonDataBasedOnHash = () => {
        const hash = window.location.hash.slice(1); // Remove #

        // Load certain JSON file based on the hash
        fetch(`../data/${hash || 'default'}.json`)
            .then(response => response.json())
            .then(data => {
                allData = data;
                filterCards();
            })
            .catch(error => {
                console.error(`Error loading JSON data for the hash '${hash}':`, error);
            });
    };

    window.addEventListener('hashchange', loadJsonDataBasedOnHash);

    fetch('../component/video-card.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);

            loadJsonDataBasedOnHash();

            const searchInput = document.getElementById('search-bar');
            searchInput.addEventListener('input', () => {

            filterCards(searchInput.value);
        });
    })
    .catch(error => console.error('Error loading the template', error));
});