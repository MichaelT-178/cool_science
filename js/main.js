document.addEventListener('DOMContentLoaded', () => {
    // Initialize an empty array to store all video data
    let allData = [];

    // Function to update the UI based on a filter text or show all videos by default
    const filterCards = (filterText = '') => {
        // Get the container elements for video cards and the side menu
        const container = document.getElementById('video-card-container');
        const sideMenu = document.getElementById('side-menu');

        // Clear existing content in both the container and side menu
        container.innerHTML = '';
        sideMenu.innerHTML = '';

        // Filter and display videos that match the filter text
        allData.forEach((video, index) => {
            // Check if video title includes the filter text, ignoring case
            if (video.title.toLowerCase().includes(filterText.toLowerCase()) || 
                video.description.toLowerCase().includes(filterText.toLowerCase()) || 
                filterText === '') {
                    
                // Create a new VideoCard component for each video
                const component = new VideoCard(video.image, video.title, video.description, video.link);
                component.render(container);

                // Create a menu item for the side menu for each video
                const menuItem = document.createElement('a');
                menuItem.href = `#video-${index}`;
                menuItem.innerText = video.title;
                menuItem.className = 'menu-item';

                // Append the menu item to the side menu
                sideMenu.appendChild(menuItem);

                // Set the ID for the last video card element added
                const lastChild = container.lastElementChild;
                lastChild.id = `video-${index}`;

                // Smooth scroll to the video card when its menu item is clicked
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



    // Fetch the video card HTML template
    fetch('../component/video-card.html')
        .then(response => response.text())
        .then(html => {
            // Insert the video card template into the document
            document.body.insertAdjacentHTML('beforeend', html);

            // Fetch the video data from the JSON file
            fetch('../data/videos.json')
                .then(response => response.json())
                .then(data => {
                    // Store the fetched data in allData
                    allData = data;
                    // Initially update the UI with all videos
                    filterCards();

                    // Implement search functionality
                    const searchInput = document.getElementById('search-bar');
                    searchInput.addEventListener('input', () => {
                        // Update the UI based on the search input value
                        filterCards(searchInput.value);
                    });
                })
                .catch(error => console.error('Error occurred while loading json data', error));
        })
        .catch(error => console.error('Error loading the template', error));
});