import { v4 as generateId } from "uuid";
import { postListEl, posts, savePosts, formEl } from "../main";
import { renderPosts } from "./renderPosts";
import type { IPost } from "../types";
import { createNewPostEl } from "./createNewPost";

export function handleFormSubmit(e: Event): void {
  e.preventDefault();
  const inputTitleEl = document.querySelector<HTMLInputElement>("#title")!;
  const inputAuthorEl = document.querySelector<HTMLInputElement>("#author")!;
  const inputContentEl =
    document.querySelector<HTMLTextAreaElement>("#content")!;

  const newPost: IPost = {
    id: generateId(),
    title: inputTitleEl.value,
    author: inputAuthorEl.value,
    content: inputContentEl.value,
    timestamp: Date.now(),
  };

  const newPostEl = createNewPostEl(newPost);
  postListEl.insertAdjacentElement("afterbegin", newPostEl);

  posts.unshift(newPost);
  savePosts();
  renderPosts();
  if (formEl) {
    formEl.reset();
  }
}
