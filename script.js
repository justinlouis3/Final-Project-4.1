/**
 * JSONPlaceholder API Demo Script
 * 
 * This script demonstrates how to interact with the JSONPlaceholder API
 * for testing and prototyping. Includes examples of all CRUD operations.
 * 
 * API Base URL: https://jsonplaceholder.typicode.com
 */

// API Configuration
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Utility function to make API requests
async function makeRequest(url, options = {}) {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Handle empty responses (like DELETE)
        if (response.status === 204) {
            return { success: true };
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
}

// ========================================
// POSTS API FUNCTIONS
// ========================================

/**
 * Get all posts
 */
async function getAllPosts() {
    console.log('📋 Fetching all posts...');
    const posts = await makeRequest(`${API_BASE_URL}/posts`);
    console.log(`✅ Retrieved ${posts.length} posts`);
    return posts;
}

/**
 * Get a specific post by ID
 */
async function getPost(id) {
    console.log(`📄 Fetching post ${id}...`);
    const post = await makeRequest(`${API_BASE_URL}/posts/${id}`);
    console.log(`✅ Retrieved post: "${post.title}"`);
    return post;
}

/**
 * Get posts by user ID
 */
async function getPostsByUser(userId) {
    console.log(`👤 Fetching posts by user ${userId}...`);
    const posts = await makeRequest(`${API_BASE_URL}/posts?userId=${userId}`);
    console.log(`✅ Found ${posts.length} posts by user ${userId}`);
    return posts;
}

/**
 * Create a new post
 */
async function createPost(postData) {
    console.log('📝 Creating new post...');
    const newPost = await makeRequest(`${API_BASE_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(postData)
    });
    console.log(`✅ Created post with ID: ${newPost.id}`);
    return newPost;
}

/**
 * Update an existing post (full update)
 */
async function updatePost(id, postData) {
    console.log(`📝 Updating post ${id}...`);
    const updatedPost = await makeRequest(`${API_BASE_URL}/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ id, ...postData })
    });
    console.log(`✅ Updated post ${id}`);
    return updatedPost;
}

/**
 * Partially update a post
 */
async function patchPost(id, partialData) {
    console.log(`✏️ Patching post ${id}...`);
    const patchedPost = await makeRequest(`${API_BASE_URL}/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(partialData)
    });
    console.log(`✅ Patched post ${id}`);
    return patchedPost;
}

/**
 * Delete a post
 */
async function deletePost(id) {
    console.log(`🗑️ Deleting post ${id}...`);
    const result = await makeRequest(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE'
    });
    console.log(`✅ Deleted post ${id}`);
    return result;
}

// ========================================
// COMMENTS API FUNCTIONS
// ========================================

/**
 * Get all comments
 */
async function getAllComments() {
    console.log('💬 Fetching all comments...');
    const comments = await makeRequest(`${API_BASE_URL}/comments`);
    console.log(`✅ Retrieved ${comments.length} comments`);
    return comments;
}

/**
 * Get comments for a specific post
 */
async function getCommentsForPost(postId) {
    console.log(`💬 Fetching comments for post ${postId}...`);
    // Two equivalent ways to get comments for a post
    const comments1 = await makeRequest(`${API_BASE_URL}/posts/${postId}/comments`);
    // const comments2 = await makeRequest(`${API_BASE_URL}/comments?postId=${postId}`);
    
    console.log(`✅ Found ${comments1.length} comments for post ${postId}`);
    return comments1;
}

// ========================================
// USERS API FUNCTIONS  
// ========================================

/**
 * Get all users
 */
async function getAllUsers() {
    console.log('👥 Fetching all users...');
    const users = await makeRequest(`${API_BASE_URL}/users`);
    console.log(`✅ Retrieved ${users.length} users`);
    return users;
}

/**
 * Get a specific user
 */
async function getUser(id) {
    console.log(`👤 Fetching user ${id}...`);
    const user = await makeRequest(`${API_BASE_URL}/users/${id}`);
    console.log(`✅ Retrieved user: ${user.name} (${user.email})`);
    return user;
}

/**
 * Get user's albums
 */
async function getUserAlbums(userId) {
    console.log(`📸 Fetching albums for user ${userId}...`);
    const albums = await makeRequest(`${API_BASE_URL}/users/${userId}/albums`);
    console.log(`✅ Found ${albums.length} albums for user ${userId}`);
    return albums;
}

/**
 * Get user's todos
 */
async function getUserTodos(userId) {
    console.log(`✅ Fetching todos for user ${userId}...`);
    const todos = await makeRequest(`${API_BASE_URL}/users/${userId}/todos`);
    console.log(`✅ Found ${todos.length} todos for user ${userId}`);
    return todos;
}

// ========================================
// ALBUMS AND PHOTOS API FUNCTIONS
// ========================================

/**
 * Get all albums
 */
async function getAllAlbums() {
    console.log('📚 Fetching all albums...');
    const albums = await makeRequest(`${API_BASE_URL}/albums`);
    console.log(`✅ Retrieved ${albums.length} albums`);
    return albums;
}

/**
 * Get photos from an album
 */
async function getAlbumPhotos(albumId) {
    console.log(`📸 Fetching photos from album ${albumId}...`);
    const photos = await makeRequest(`${API_BASE_URL}/albums/${albumId}/photos`);
    console.log(`✅ Found ${photos.length} photos in album ${albumId}`);
    return photos;
}

/**
 * Get all photos
 */
async function getAllPhotos() {
    console.log('🖼️ Fetching all photos...');
    const photos = await makeRequest(`${API_BASE_URL}/photos`);
    console.log(`✅ Retrieved ${photos.length} photos`);
    return photos;
}

// ========================================
// TODOS API FUNCTIONS
// ========================================

/**
 * Get all todos
 */
async function getAllTodos() {
    console.log('📝 Fetching all todos...');
    const todos = await makeRequest(`${API_BASE_URL}/todos`);
    console.log(`✅ Retrieved ${todos.length} todos`);
    return todos;
}

/**
 * Get completed todos
 */
async function getCompletedTodos() {
    console.log('✅ Fetching completed todos...');
    const todos = await makeRequest(`${API_BASE_URL}/todos`);
    const completed = todos.filter(todo => todo.completed);
    console.log(`✅ Found ${completed.length} completed todos`);
    return completed;
}

// ========================================
// DEMO FUNCTIONS
// ========================================

/**
 * Run a comprehensive demo of all API features
 */
async function runFullDemo() {
    console.log('🚀 Starting JSONPlaceholder API Demo');
    console.log('=====================================\n');
    
    try {
        // 1. Posts Demo
        console.log('1️⃣ POSTS DEMO');
        console.log('-'.repeat(20));
        
        // Get first post
        const post1 = await getPost(1);
        
        // Get posts by user 1
        const userPosts = await getPostsByUser(1);
        
        // Create a new post
        const newPost = await createPost({
            title: 'My Test Post',
            body: 'This is a test post created via API',
            userId: 1
        });
        
        // Update the post
        const updatedPost = await updatePost(newPost.id, {
            title: 'Updated Test Post',
            body: 'This post has been updated',
            userId: 1
        });
        
        // Patch the post
        const patchedPost = await patchPost(newPost.id, {
            title: 'Patched Test Post'
        });
        
        console.log('\n');
        
        // 2. Comments Demo
        console.log('2️⃣ COMMENTS DEMO');
        console.log('-'.repeat(20));
        
        const comments = await getCommentsForPost(1);
        console.log(`First comment: "${comments[0]?.body.substring(0, 50)}..."`);
        
        console.log('\n');
        
        // 3. Users Demo
        console.log('3️⃣ USERS DEMO');
        console.log('-'.repeat(20));
        
        const users = await getAllUsers();
        const user1 = await getUser(1);
        const user1Albums = await getUserAlbums(1);
        const user1Todos = await getUserTodos(1);
        
        console.log('\n');
        
        // 4. Albums & Photos Demo
        console.log('4️⃣ ALBUMS & PHOTOS DEMO');
        console.log('-'.repeat(25));
        
        const albums = await getAllAlbums();
        const album1Photos = await getAlbumPhotos(1);
        console.log(`Sample photo: ${album1Photos[0]?.title}`);
        
        console.log('\n');
        
        // 5. Todos Demo
        console.log('5️⃣ TODOS DEMO');
        console.log('-'.repeat(15));
        
        const todos = await getAllTodos();
        const completedTodos = await getCompletedTodos();
        const completionRate = ((completedTodos.length / todos.length) * 100).toFixed(1);
        console.log(`📊 Todo completion rate: ${completionRate}%`);
        
        console.log('\n');
        
        // 6. Summary
        console.log('📊 DEMO SUMMARY');
        console.log('-'.repeat(20));
        console.log(`✅ Posts: ${userPosts.length} by user 1`);
        console.log(`💬 Comments: ${comments.length} on post 1`);
        console.log(`👥 Users: ${users.length} total`);
        console.log(`📚 Albums: ${albums.length} total`);
        console.log(`🖼️ Photos: ${album1Photos.length} in album 1`);
        console.log(`📝 Todos: ${todos.length} total (${completedTodos.length} completed)`);
        
        console.log('\n🎉 Demo completed successfully!');
        
    } catch (error) {
        console.error('❌ Demo failed:', error);
    }
}

/**
 * Quick test function for immediate verification
 */
async function quickTest() {
    console.log('⚡ Running Quick Test...\n');
    
    try {
        // Test basic GET request
        const post = await getPost(1);
        console.log('✅ GET request successful');
        
        // Test POST request
        const newPost = await createPost({
            title: 'Quick Test Post',
            body: 'Testing POST request',
            userId: 99
        });
        console.log('✅ POST request successful');
        
        // Test query parameters
        const userPosts = await getPostsByUser(1);
        console.log('✅ Query parameters working');
        
        // Test nested routes
        const comments = await getCommentsForPost(1);
        console.log('✅ Nested routes working');
        
        console.log('\n🎉 All tests passed! API is working correctly.');
        
    } catch (error) {
        console.error('❌ Quick test failed:', error);
    }
}

/**
 * Interactive demo with user input (for browser console)
 */
async function interactiveDemo() {
    console.log('🎯 Interactive JSONPlaceholder Demo');
    console.log('==================================');
    console.log('Available functions you can try:');
    console.log('');
    console.log('Posts:');
    console.log('  getAllPosts()');
    console.log('  getPost(id)');
    console.log('  getPostsByUser(userId)');
    console.log('  createPost({title, body, userId})');
    console.log('');
    console.log('Users:');
    console.log('  getAllUsers()');
    console.log('  getUser(id)');
    console.log('  getUserAlbums(userId)');
    console.log('  getUserTodos(userId)');
    console.log('');
    console.log('Comments:');
    console.log('  getCommentsForPost(postId)');
    console.log('');
    console.log('Albums & Photos:');
    console.log('  getAllAlbums()');
    console.log('  getAlbumPhotos(albumId)');
    console.log('');
    console.log('Todos:');
    console.log('  getAllTodos()');
    console.log('  getCompletedTodos()');
    console.log('');
    console.log('Demo Functions:');
    console.log('  quickTest()');
    console.log('  runFullDemo()');
    console.log('');
    console.log('💡 Try: await getPost(1)');
}

// ========================================
// EXPORT FOR NODE.JS OR BROWSER USAGE
// ========================================

// For Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        // Posts
        getAllPosts,
        getPost,
        getPostsByUser,
        createPost,
        updatePost,
        patchPost,
        deletePost,
        
        // Comments
        getAllComments,
        getCommentsForPost,
        
        // Users
        getAllUsers,
        getUser,
        getUserAlbums,
        getUserTodos,
        
        // Albums & Photos
        getAllAlbums,
        getAlbumPhotos,
        getAllPhotos,
        
        // Todos
        getAllTodos,
        getCompletedTodos,
        
        // Demo functions
        runFullDemo,
        quickTest,
        interactiveDemo
    };
}

// ========================================
// AUTO-RUN DEMO (Browser)
// ========================================

// If running in browser, automatically show interactive demo
if (typeof window !== 'undefined') {
    console.log('🌐 JSONPlaceholder API Script Loaded!');
    interactiveDemo();
}

// If running in Node.js, run quick test
if (typeof module !== 'undefined' && require.main === module) {
    quickTest().then(() => {
        console.log('\n💡 To run full demo: node script.js --full');
        console.log('💡 To run interactive: open this file in browser console');
    });
}