import "./css/style.css";
import { dummyPosts } from "./data";
import { v4 as generateId } from "uuid";

// Use "import type" when importing interfaces or types to tell TS
import type { IPost } from "./types";

const app = document.querySelector<HTMLDivElement>("#app")!;

app.innerHTML = /*html*/ `
<main>
  <h1 class="post-title">Post</h1>
  <article class="author"></article>
  <article class="content"></article>
  <section class="post-list"></section>
</main>
`;

const formEl = document.querySelector<HTMLFormElement>(".form");
const postListEl = document.querySelector<HTMLElement>(".post-list")!;
const inputTitleEl = document.querySelector<HTMLInputElement>("#title")!;
const inputAuthorEl = document.querySelector<HTMLInputElement>("#author")!;
const inputContentEl = document.querySelector<HTMLTextAreaElement>("#content")!;

const postsContainer = document.querySelector<HTMLDivElement>("posts")!;

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

  const newPostEl = creatNewPostEl(newPost);
  postListEl.insertAdjacentElement("afterbegin", newPostEl);
  inputTitleEl.value = "";
  inputAuthorEl.value = "";
  inputContentEl.value = "";
});

postListEl.addEventListener("click", (e) => handleOnClick(e));

populatePostListWithDummys();

// ################### Functions below #################
function loadPosts(): IPost[] {
  const data = localStorage.getItem("posts");
  return data ? JSON.parse(data) : [];
}

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function creatNewPostEl(post: IPost): HTMLElement {
  //Deconstructing an object
  const { id, author, title, content, timestamp } = post;
  const classes = ["post"];

  const newPostEl = document.createElement("article");
  newPostEl.id = String(id);
  newPostEl.classList.add(...classes);

  newPostEl.innerHTML = /*html*/ `
    <p class="post-title">${title}</p>
    <p class="post-author">${author}</p>
    <p class="post-content">${content}</p>
    <p class="post-timestamp">${timestamp}</p>
    <div class="action-buttons">
      <button class="edit-btn" type="button">
        <span class="material-symbols-outlined">edit</span>
      </button>
      <button class="remove-btn" type="button">
        <span class="material-symbols-outlined">delete</span>
      </button>
    </div>
  `;

  return newPostEl;
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
    postListEl.insertAdjacentElement("beforeend", creatNewPostEl(t));
  });
}

function removePost(postEl: HTMLElement): void {
  postListEl.removeChild(postEl);
}

// function updatePost(postEl: HTMLElement): void {}
