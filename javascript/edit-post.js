async function editFormHandler(event) {
  event.preventDefault();

  const post_title = document.querySelector("#post-title").value;
  const post_text = document.querySelector("#post-text").value;
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const response = await fetch(`/api/posts/${post_id}`, {
    method: "PUT",
    body: JSON.stringify({
      post_title,
      post_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".delete-post-btn")
  .addEventListener("submit", editFormHandler);
document.querySelector("#delete").addEventListener("click", deleteFormHandler);
