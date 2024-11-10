// Initialize Netlify Identity for user management
const netlifyIdentity = window.netlifyIdentity;

netlifyIdentity.on("init", user => {
  if (user) {
    loadDashboard(user);
  }
});

function signUp() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  netlifyIdentity.signup({ email: username, password })
    .then(user => {
      alert("Sign-up successful! Waiting for admin approval.");
      netlifyIdentity.logout();
    })
    .catch(error => console.error("Error signing up:", error));
}

function logIn() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  netlifyIdentity.login({ email: username, password })
    .then(user => loadDashboard(user))
    .catch(error => console.error("Error logging in:", error));
}

function loadDashboard(user) {
  const roles = user.app_metadata.roles || [];
  if (roles.includes("admin")) {
    window.location.href = "/admin.html";
  } else {
    window.location.href = "/dashboard.html";
  }
}

function createPost() {
  const title = document.getElementById("post-title").value;
  const content = document.getElementById("post-content").value;
  fetch("/.netlify/functions/createPost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  }).then(() => loadPosts());
}

function loadPosts() {
  fetch("/.netlify/functions/getPosts")
    .then(response => response.json())
    .then(posts => {
      const postsContainer = document.getElementById("posts");
      postsContainer.innerHTML = "";
      posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        postsContainer.appendChild(postElement);
      });
    });
}

function updateAvatar() {
  const file = document.getElementById("avatar-upload").files[0];
  if (file) {
    // Handle avatar upload using Netlify functions or a third-party service
    alert("Avatar updated successfully!");
  }
}

function logOut() {
  netlifyIdentity.logout();
  window.location.href = "/index.html";
}
