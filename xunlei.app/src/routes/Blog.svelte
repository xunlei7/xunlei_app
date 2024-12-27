<script>
    let posts = [
      { title: "Understanding JavaScript", date: "2024-01-01", link: "#" },
      { title: "My Svelte Journey", date: "2024-02-01", link: "#" },
      { title: "How to Build a Game", date: "2024-03-01", link: "#" }
    ];
  </script>
  
  <section class="blog">
    <h1>My Blog</h1>
    <ul>
      {#each posts as post}
        <li>
          <a href={post.link}>{post.title}</a>
          <span>{post.date}</span>
        </li>
      {/each}
    </ul>
  </section>
  
  <style>
    .blog {
      padding: 2rem;
      text-align: center;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      margin-bottom: 1rem;
    }
    a {
      font-size: 1.2rem;
      text-decoration: none;
      color: #007aff;
    }
    span {
      margin-left: 0.5rem;
      color: #666;
      font-size: 0.9rem;
    }
  </style>
  