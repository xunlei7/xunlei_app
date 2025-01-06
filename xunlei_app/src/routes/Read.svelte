<script>
    export let isDayTime;
    let books = [
        { title: "The C Programming Language", author: "Brian W. Kernighan and Dennis M. Ritchie", image:"/Cbook.jpg", description: "The book serves as both an introduction to the C programming language and a reference guide. It provides a concise, authoritative explanation of the language's core concepts, syntax, and powerful features, with numerous examples and exercises to solidify understanding.",year: "Reading Now" },
        { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "Reading Now" },
        { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2014" },
        { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2014" },
        { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2014" },
        { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2014" },
        { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2015" },
        { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2022" },
        { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2022" },
        { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2016" },
        { title: "The C Programming Language", author: "Haruki Murakami", image: "/Cbook.jpg", description: "Description 1", year: "2014" },
    ];
  
    let groupedBooks = {};
    books.forEach((book) => {
      if (!groupedBooks[book.year]) {
        groupedBooks[book.year] = [];
      }
      groupedBooks[book.year].push(book);
    });
  
    let sortedYears = Object.keys(groupedBooks)
      .filter(year => year !== "Reading Now")
      .sort((a, b) => Number(b) - Number(a));
  
    if (Object.keys(groupedBooks).includes("Reading Now")) {
      sortedYears = ["Reading Now", ...sortedYears];
    }

    let showModal = false; // 控制弹窗显示状态
    let selectedBook = null; // 选中的书

    function openModal(book) {
      selectedBook = book;
      showModal = true;
    }

    function closeModal() {
      showModal = false;
      selectedBook = null;
    }
</script>
  
<div class="{isDayTime ? 'day-theme' : 'night-theme'} container">
    <div class="bookshelf-wrapper">
      <h1 class="bookshelf-title">My Bookshelf</h1>
      <p class="bookshelf-description">
        Here's a collection of books I have read, want to read, and currently reading:
      </p>
  
      {#each sortedYears as year}
        <div class="year-section">
          <h2 class="year-header">{year}</h2>
          <div class="bookshelf">
            {#each groupedBooks[year] as book}
              <button class="book" type="button" on:click={() => openModal(book)} aria-label="Open book details">
                <img src={book.image} alt={book.title} />
              </button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  
    <!-- 弹窗 -->
    {#if showModal}
      <div class="modal-overlay" role="dialog" aria-modal="true">
        <div class="modal-content {isDayTime ? 'day-theme' : 'night-theme'}">
          <img class="book-cover" src={selectedBook.image} alt="{selectedBook.title}" />
          <h3>{selectedBook.title}</h3>
          <p><strong>Author:</strong> {selectedBook.author}</p>
          <p>{selectedBook.description}</p>
          <div class="modal-actions">
            <button class="close-button" on:click={closeModal}>Close</button>
          </div>
        </div>
      </div>
    {/if}
</div>
  
<style>
    .container {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }
    
    .bookshelf-wrapper {
      max-width: 80%;
      height: 600px;
      overflow-y: auto;
      border-radius: 12px;
      padding: 1rem;
      background-color: inherit;
      border: 2px solid #ccc;
    }
  
    .bookshelf-title {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.3rem;
    }
  
    .bookshelf-description {
      font-size: 0.85rem;
      margin-bottom: 1.2rem;
      border-bottom: 1px solid #aaa;
    }
  
    .year-header {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 1.5rem 0 1rem 0;
    }
  
    .bookshelf {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }
  
    .book img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 10px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
  
    .book:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    }
  
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.4); /* 半透明背景 */
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      backdrop-filter: blur(8px); /* 背景虚化 */
    }
  
    .modal-content {
      padding: 2rem;
      border-radius: 16px;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      text-align: center;
    }
  
    .day-theme .modal-content {
      background-color: rgba(255, 255, 255, 0.85); /* 白天模式 */
      color: #333;
    }
  
    .night-theme .modal-content {
      background-color: rgba(24, 24, 24, 0.85); /* 夜晚模式 */
      color: #f0f0f0;
    }
  
    .book-cover {
      width: 100px;
      height: 150px;
      border-radius: 8px;
      margin-bottom: 1rem;
      object-fit: cover;
    }
  
    .close-button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      border: 2px solid; /* 添加边框 */
      background-color: transparent; /* 默认透明背景 */
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
  
    /* 白天模式按钮样式 */
    .day-theme .close-button {
      color: #333;
      border-color: #333;
    }
  
    .day-theme .close-button:hover {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }
  
    /* 夜晚模式按钮样式 */
    .night-theme .close-button {
      color: #f0f0f0;
      border-color: #f0f0f0;
    }
  
    .night-theme .close-button:hover {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }
  </style>
  