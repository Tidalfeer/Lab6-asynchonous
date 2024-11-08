function fetchUserProfile() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.8 ? reject("Failed to fetch user profile.") : resolve({id: 1, name: Frank});
        }, 1500);
    });
}

function fetchUserPost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.8 ? reject("Failed to fetch user posts.") : resolve([{id:101, title: "First Post"},{id: 102, title: "Second Post"}]);
        }, 1500);
    });
}

function fetchComments() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.8 ? reject("Failed to fetch comments.") : resolve(["Thank you for posting!"]);
        }, 1500);
    });
}

async function fetchDataSequential() {
    console.log("Fetching Data...");
    try{ 
        const user = await fetchUserProfile();
        console.log("User profile retrieved: ", user);

        const posts = await fetchUserPost();
        console.log("User post retrieved: ", posts);

        const comments = await fetchComments();
        console.log("User comments retrieved: ", comments);

        return{ user, posts, comments};

    } catch(error) {
        console.error("Sequential fetch failed: ", error);
        
    };
}

async function fetchDataParallel() {
    console.log("Fetching Data...");
    try {
        const [user, posts,comments] = await Promise.all([fetchUserProfile(),fetchUserPost(),fetchComments()]);
        console.log("User profile retrieved: ", user);
        console.log("User post retrieved: ", posts);
        console.log("User comments retrieved: ",comments);

        return {user, posts, comments};

    } catch (error) {
        console.error("Parallel fetch failed: ", error);
    }
}

async function getUserContent() {
    console.log("Starting Data retrieveal...");
    
    try {
        const user = await fetchUserProfile();
        console.log("User profile retrieved: ", user);

        const posts = await fetchUserPost();
        console.log("User post retrieved: ", posts);

        const comments = await fetchComments();
        console.log("User comments retrieved: ", comments);

        console.log("Data retrieval complete.");
        return {user, posts, comments};
    } catch (error) {
        console.error("Data retrieval failed: ", error);
        
    }
}

fetchDataSequential().then(result => console.log("Sequential fetch results: ", result));
fetchDataParallel().then(result => console.log("Parallel fetch results: ", result));
getUserContent().then(result => console.log("User content result: ", result));