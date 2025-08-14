import "./css/style.css";
import { dummyPosts } from "./data";
import { v4 as generateId } from "uuid";

// Use "import type" when importing interfaces or types to tell TS
import type { IPost } from "./types";

const postsContainer = document.querySelector<HTMLElement>("#posts")!;

postsContainer.innerHTML = /*html*/ `
  <section class="post-list"></section>
`;

const formEl = document.querySelector<HTMLFormElement>(".form");
const postListEl = document.querySelector<HTMLElement>(".post-list")!;
const inputTitleEl = document.querySelector<HTMLInputElement>("#title")!;
const inputAuthorEl = document.querySelector<HTMLInputElement>("#author")!;
const inputContentEl = document.querySelector<HTMLTextAreaElement>("#content")!;
const filterAuthorInput =
  document.querySelector<HTMLInputElement>("#filterAuthor")!;
const sortSelect = document.querySelector<HTMLSelectElement>("#sort")!;

let posts: IPost[] = loadPosts();

formEl?.addEventListener("submit", (e) => {
  e.preventDefault();

  const newPost: IPost = {
    id: generateId(),
    title: inputTitleEl.value,
    author: inputAuthorEl.value,
    content: inputContentEl.value,
    timestamp: Date.now(),
  };

//   posts.unshift(newPost);
//   savePosts();
//   renderPosts();
//   formEl.reset();
// });

postListEl.addEventListener("click", (e) => handleOnClick(e));

// populatePostListWithDummys();
renderPosts();

// ################### Functions below #################
function loadPosts(): IPost[] {
  const data = localStorage.getItem("posts");
  return data ? JSON.parse(data) : [];
}

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function renderPosts() {
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
