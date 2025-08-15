import "./css/style.css";
import { handleFormSubmit } from "./ts/handleFormSubmit";
import { renderPosts } from "./ts/renderPosts";
import { handleOnClick } from "./ts/handleOnClick";

const postsContainer = document.querySelector<HTMLElement>("#posts")!;
postsContainer.innerHTML = /*html*/ `
  <section class="post-list"></section>
`;

export const formEl = document.querySelector<HTMLFormElement>(".form")!;
export const postListEl = document.querySelector<HTMLElement>(".post-list")!;
export const filterAuthorInput =
  document.querySelector<HTMLInputElement>("#filterAuthor")!;
export const sortSelect = document.querySelector<HTMLSelectElement>("#sort")!;
export const formContainerEl =
  document.querySelector<HTMLElement>("#form-container");
export const insidePostBtn =
  document.querySelector<HTMLParagraphElement>(".inside-post-btn")!;
const addNewPostBtn =
  document.querySelector<HTMLButtonElement>(".add-new-post-btn")!;
export const closeFormBtn =
  document.querySelector<HTMLButtonElement>(".close-form-btn")!;

addNewPostBtn.addEventListener("click", () => {
  formContainerEl?.classList.toggle("hidden");
});
closeFormBtn.addEventListener("click", () => {
  formContainerEl?.classList.toggle("hidden");
});

// closeFormBtn.addEventListener("click", (e) => handleOnClick(e));
// addNewPostBtn.addEventListener("click", (e) => handleOnClick(e));

formEl.addEventListener("submit", handleFormSubmit);
postListEl.addEventListener("click", (e) => handleOnClick(e));
sortSelect.addEventListener("change", renderPosts);
filterAuthorInput.addEventListener("input", renderPosts);
// populatePostListWithDummys();
renderPosts();
