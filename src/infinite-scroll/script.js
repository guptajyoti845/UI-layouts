const postContainer = document.getElementById('post-container'),
    loading = document.querySelector('.loader'),
    filter = document.getElementById('filter');

let limit =5;
let page = 1;

//Fetch POST from API
async function getPosts(){
    const result = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = result.json();
    return data;
}

//function to create Post in DOM

async function showPosts(){
    const posts = await getPosts();
    console.log(posts);

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
        <div class="number">
            ${post.id}
        </div>
        <div class="post-info">
            <div class="post-title">${post.title}</div>
            <p class="post-body">${post.body}</p>
        </div>
        `;
        postContainer.appendChild(postElement);
    });

}


const doMagic = function (fn, delay){
    let timer;
    return function (){
        let context = this, args=arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args)
        },delay)
    }
}
const filterPostsWithDebounce = doMagic(filterPosts,300);
//function to filterPosts

async function filterPosts(e){
    console.log("Fetching data");
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText;
        const body = post.querySelector('.post-body').innerText.toUpperCase();
        if(title.indexOf(term)>-1 || body.indexOf(term) > -1){
            post.style.display = 'flex';
        }
        else {
            post.style.display = 'none';
        }
    })
}
//initialize POSTS
showPosts();

//Show Loader and fetch more post

function showLoading(){
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');
        setTimeout(()=>{
            page++;
            showPosts();
        },300)
    },1000)
}
//Event Listener

window.addEventListener("scroll", ()=>{
    console.log(document.documentElement.scrollTop);
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight-5){
        showLoading();
    }
})

filter.addEventListener("input", filterPostsWithDebounce)

