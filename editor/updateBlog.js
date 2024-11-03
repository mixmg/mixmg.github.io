function updateBlog() {
  const title = document.getElementById("postTitle").value;
  const content = document.getElementById("postContent").value;

  if (!title || !content) {
    alert("Please enter a title and content for your post.");
    return;
  }

  const blogPost = `
      <article>
        <h2>${title}</h2>
        <p>${content}</p>
        <hr />
      </article>
    `;

  document
    .querySelector(".container")
    .insertAdjacentHTML("beforeend", blogPost);

  saveBlogToFile();
}

function saveBlogToFile() {
  const blogContent = document.querySelector(".container").innerHTML;

  console.log("Blog content updated:", blogContent);
  alert("Blog post added. Remember to push changes to GitHub.");
}

export { updateBlog };
