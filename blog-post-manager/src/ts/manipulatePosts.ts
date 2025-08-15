import type { IPost } from "../types";
import { renderPosts } from "./renderPosts";
import { postListEl } from "../main";
import { dummyPosts } from "../data";
import { createNewPostEl } from "./createNewPost";

export let posts: IPost[] = loadPosts();

export function loadPosts(): IPost[] {
  const data = localStorage.getItem("posts");
  return data ? JSON.parse(data) : [];
}

export function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

export function removePost(postEl: HTMLElement): void {
  const id = postEl.id;
  posts = posts.filter((p) => p.id != id);
  savePosts();
  renderPosts();
  //   postListEl.removeChild(postEl);
}

export function editPost(postEl: HTMLElement): void {
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

export function populatePostListWithDummys(): void {
  if (posts.length === 0) {
    dummyPosts.forEach((t) => {
      postListEl.insertAdjacentElement("beforeend", createNewPostEl(t));
    });
  }
}
