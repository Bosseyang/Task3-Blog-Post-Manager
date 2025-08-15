import "./css/style.css";
import { dummyPosts } from "./data";

import { createNewPostEl } from "./ts/createNewPost";
import { handleFormSubmit } from "./ts/handleFormSubmit";

// Use "import type" when importing interfaces or types to tell TS
import type { IPost } from "./types";

export let posts: IPost[] = loadPosts();

const postsContainer = document.querySelector<HTMLElement>("#posts")!;

postsContainer.innerHTML = /*html*/ `
  <section class="post-list"></section>
`;

export const formEl = document.querySelector<HTMLFormElement>(".form");
export const postListEl = document.querySelector<HTMLElement>(".post-list")!;

const filterAuthorInput =
  document.querySelector<HTMLInputElement>("#filterAuthor")!;
export const sortSelect = document.querySelector<HTMLSelectElement>("#sort")!;

formEl?.addEventListener("submit", handleFormSubmit);
postListEl.addEventListener("click", (e) => handleOnClick(e));
sortSelect.addEventListener("change", renderPosts);
filterAuthorInput.addEventListener("input", renderPosts);
// populatePostListWithDummys();
renderPosts();

// ################### Functions below #################
function loadPosts(): IPost[] {
  const data = localStorage.getItem("posts");
  return data ? JSON.parse(data) : [];
}

export function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

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

function handleOnClick(event: MouseEvent): void {
  const target = event.target;

  // Need this syntax to be typesafe. Looks odd but it gets the job done.
  if (!(target instanceof HTMLElement)) return;

  const postEl = target.closest<HTMLElement>(".post");
  if (postEl === null) return;

  if (target.closest(".remove-btn")) return removePost(postEl);

  if (target.closest(".edit-btn")) {
    const postId = postEl.id;
    const post = posts.find((p) => p.id === postId);
    if (!post) return;

    const newTitle = prompt("Edit Title:", post.title) ?? post.title;
    const newAuthor = prompt("Edit Author:", post.author) ?? post.author;
    const newContent = prompt("Edit Content:", post.content) ?? post.content;

    post.title = newTitle.trim() || post.title;
    post.author = newAuthor.trim() || post.author;
    post.content = newContent.trim() || post.content;

    savePosts();
    renderPosts();
  }
}

function populatePostListWithDummys(): void {
  dummyPosts.forEach((t) => {
    postListEl.insertAdjacentElement("beforeend", createNewPostEl(t));
  });
}

function removePost(postEl: HTMLElement): void {
  const id = postEl.id;
  posts = posts.filter((p) => p.id != id);
  savePosts();
  renderPosts();
  // postListEl.removeChild(postEl);
}

// function updatePost(postEl: HTMLElement): void {}
