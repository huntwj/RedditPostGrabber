//html elements
const ul = document.querySelector("ul");
const select = document.querySelector("select");
const container = document.querySelector(".container");
const catButton = document.querySelector("#poker-cat");
const selfText = document.querySelector("#selfText");
const readMoreButton = document.querySelector("#readMore");
//const postRangeSelector = document.querySelector("#postRangeSelector");

//brings the cat image back
catButton.addEventListener("click", () => {
  ul.innerHTML = `<li class="text-center"><img src="http://www.guzer.com/pictures/poker-cat.jpg" alt="poker-cat" class="text-center m-auto col-sm-12 col-md-12 col-lg-10 col-xl-8"></li>
          <li class="text-center">"Pick a sub, any sub, but make it quick!"</li>`;
});


//get top 5 posts (no filter)
const fetchTopFive = async sub => {
  const URL = `https://www.reddit.com/r/${sub}/top/.json?limit=5`;
  const fetchResult = fetch(URL);
  const response = await fetchResult;
  const jsonData = await response.json();
  const posts = jsonData.data.children;
  const content = posts
    .map(
      (post, i) =>
        `<li class='list-group-item'>
        <strong>${i + 1})</strong>"<strong><a id="postTitleLink" href='https://reddit.com${
          post.data.permalink
        }'>${post.data.title}</strong></a>"
         <small>(/u/${post.data.author})</small> 
         <a href='https://reddit.com${
           post.data.permalink
         }' class='badge' target="_blank">link to post</a>
         <button disabled class="btn">Post score: <strong>${
           post.data.score
         }</strong></button>
         <button disabled class="btn">Comments: <strong>${
          post.data.num_comments
        }</strong></button>
         <button class="btn btn-sm" id="readMore">Read more</button>
         <div id="selfText" style="display: none;">
         <hr>
         <p class="postText lead">${post.data.selftext}</p>
         </div>
         
      </li>`
    )
    .join("");
  ul.innerHTML = content;
  console.log(posts);
};

// passes selected sub to fetchTopFive()
function selectSub() {
  fetchTopFive(this.value);
}

select.addEventListener("change", selectSub);
//readMoreButton.addEventListener('click', () => postText.style.display === 'inherit');
