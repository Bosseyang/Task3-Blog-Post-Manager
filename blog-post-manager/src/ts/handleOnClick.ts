import { removePost, editPost } from "./manipulatePosts";
// import { formContainerEl, insidePostBtn } from "../main";

export function handleOnClick(event: MouseEvent): void {
  const target = event.target;

  // Need this syntax to be typesafe. Looks odd but it gets the job done.
  if (!(target instanceof HTMLElement)) return;

  const postEl = target.closest<HTMLElement>(".post");
  if (postEl === null) return;

  if (target.closest(".remove-btn")) return removePost(postEl);
  if (target.closest(".edit-btn")) return editPost(postEl);

  //   if (target.closest(".add-new-post-btn")) {
  //     formContainerEl?.classList.toggle("hidden");
  //     return;
  //   }

  //   if (target.closest(".close-form-btn")) {
  //     formContainerEl?.classList.toggle("hidden");
  //     return;
  //   }
}
