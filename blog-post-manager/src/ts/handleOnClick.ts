import { removePost, editPost } from "./manipulatePosts";

export function handleOnClick(event: MouseEvent): void {
  const target = event.target;

  // Need this syntax to be typesafe. Looks odd but it gets the job done.
  if (!(target instanceof HTMLElement)) return;

  const postEl = target.closest<HTMLElement>(".post");
  if (postEl === null) return;

  if (target.closest(".remove-btn")) return removePost(postEl);
  if (target.closest(".edit-btn")) return editPost(postEl);
}
