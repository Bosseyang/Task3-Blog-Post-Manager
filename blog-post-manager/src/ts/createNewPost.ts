import type { IPost } from "../types";

export function createNewPostEl(post: IPost): HTMLElement {
  //Deconstructing an object
  const { id, author, title, content, timestamp } = post;
  const classes = ["post"];

  const newPostEl = document.createElement("article");
  newPostEl.id = String(id);
  newPostEl.classList.add(...classes);

  newPostEl.innerHTML = /*html*/ `
    <article class="post-container">
      <div class="title-btn-container">
        <h1 class="post-title">${title}</h1>
        <div class="action-buttons">
          <button class="button icon-button edit-btn" type="button" title="edit">
            <span class=" material-symbols-outlined">edit</span>
          </button>
          <button class="button icon-button remove-btn" type="button" title="delete">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
      <p class="post-author">Author: <em>${author}</em></p>
      <p class="post-content">${content}</p>
      <p class="post-timestamp">${new Date(timestamp).toLocaleString()}</p>
    </article>
  `;
  return newPostEl;
}
