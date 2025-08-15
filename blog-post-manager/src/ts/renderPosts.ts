import { postListEl, sortSelect, filterAuthorInput } from "../main";
import { createNewPostEl } from "./createNewPost";
import { posts } from "./manipulatePosts";

export function renderPosts() {
  postListEl.innerHTML = "";

  const filterValue = filterAuthorInput.value.toLowerCase();
  const sortedPosts = [...posts].sort((a, b) => {
    if (sortSelect.value === "date") {
      return b.timestamp - a.timestamp;
    } else {
      return a.author.localeCompare(b.author);
    }
  });

  const filteredPosts = sortedPosts.filter((p) =>
    p.author.toLowerCase().includes(filterValue)
  );

  filteredPosts.forEach((post) => {
    postListEl.appendChild(createNewPostEl(post));
  });
}