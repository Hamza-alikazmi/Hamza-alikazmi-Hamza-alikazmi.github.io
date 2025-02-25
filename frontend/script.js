  // Fetch post data from API
  async function fetchPostData() {
    try {
        const response = await fetch('https://skillspectum.vercel.app/post'); // Backend API URL
        if (response.ok) {
            const postData = await response.json(); // Get data from the response

            // Loop through all posts and create the HTML for each one
            postData.forEach(post => {
                const postContainer = document.createElement('div');
                postContainer.classList.add('post-container'); // Add class for styling

                // Create the background image div
                const backgroundImage = document.createElement('div');
                backgroundImage.classList.add('background-image');
                backgroundImage.style.backgroundImage = `url(${post.image.src})`; // Dynamically set background image URL
                postContainer.appendChild(backgroundImage); // Add it to the post container

                // Create overlay for contrast
                const overlay = document.createElement('div');
                overlay.classList.add('overlay');
                postContainer.appendChild(overlay); // Add overlay to the post container

                // Post Title
                const postTitle = document.createElement('h2');
                postTitle.innerText = post.title;
                postContainer.appendChild(postTitle); // Add title to the post container

                // Post Content
                const postContent = document.createElement('p');
                postContent.innerText = post.content;
                postContainer.appendChild(postContent); // Add content to the post container

                // Post Link
                const postLink = document.createElement('a');
                postLink.href = post.link;
                postLink.innerText = 'View Course...';
                postLink.target = '_blank'; // Open the link in a new tab
                postContainer.appendChild(postLink); // Add link to the post container

                // Append the post container to the posts container in the HTML
                document.getElementById('posts-container').appendChild(postContainer);
            });
        } else {
            console.error('Failed to fetch post data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the function to fetch and display the data
fetchPostData();
