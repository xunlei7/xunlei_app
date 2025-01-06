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
      .sort((a, b) => Number(a) - Number(b));
  
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
    
    let selectedYear = null;

    function openYearDetails(year) {
      selectedYear = year;
    }

    function closeYearDetails() {
      selectedYear = null;
    }
</script>

<div class="{isDayTime ? 'day-theme' : 'night-theme'} container">
    <!-- 关于我的阅读简介 -->
    <div class="reading-intro">
      <h2>About My Reading Journey</h2>
      <p>I am passionate about books related to programming, fiction, and personal development. I enjoy immersing myself in new stories and learning from each book I read.</p>
    </div>

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

    <div class="reading-timeline-wrapper {isDayTime ? 'day-theme' : 'night-theme'}">
        <h2 class="timeline-title">Reading Timeline</h2>
        <div class="timeline-scroll-container">
          <div class="timeline-x-axis"></div>
          {#each sortedYears as year, index}
            <div class="timeline-year">
              <button class="year-button" on:click={() => openYearDetails(year)}>{year}</button>
            </div>
          {/each}
        </div>
      
        {#if selectedYear}
          <div class="year-details">
            <h3>Books from {selectedYear}</h3>
            <button class="close-year-button" on:click={closeYearDetails}>Close</button>
            <div class="year-books">
              {#each groupedBooks[selectedYear] as book}
                <div class="timeline-book">
                  <img src={book.image} alt="{book.title}" />
                  <p>{book.title}</p>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
</div>

<style>
    .container {
      display: flex;
      justify-content: center;
      padding: 2rem;
      flex-direction: column;
      align-items: center;
    }

    .reading-intro {
      max-width: 800px;
      text-align: center;
      margin-bottom: 2rem;
    }

    .reading-intro h2 {
      font-size: 1.75rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .reading-intro p {
      font-size: 1rem;
      color: #555;
    }

    .bookshelf-wrapper {
      max-width: 80%;
      height: 600px;
      overflow-y: auto;
      border-radius: 12px;
      padding: 1rem;
      background-color: inherit;
      border: 2px solid #ccc;
      scrollbar-width: thin; /* Firefox */
      scrollbar-color: transparent transparent; /* Firefox */
    }

    .bookshelf-wrapper::-webkit-scrollbar {
      width: 8px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .bookshelf-wrapper:hover::-webkit-scrollbar {
      opacity: 1;
    }

    .bookshelf-title {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.3rem;
    }

    .year-header {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 1.5rem 0 1rem 0;
    }

    .bookshelf {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }

    .book {
      padding: 0;
      background-color: transparent;
      border: none;
      border-radius: 0;
      box-shadow: none;
    }

    .book img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 8px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .book:hover img {
      transform: translateY(-10px);
      box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
    }


    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      backdrop-filter: blur(8px);
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
      background-color: rgba(255, 255, 255, 0.85);
      color: #333;
    }

    .night-theme .modal-content {
      background-color: rgba(24, 24, 24, 0.85);
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
      border: 2px solid;
      background-color: transparent;
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }

    .day-theme .close-button {
      color: #333;
      border-color: #333;
    }

    .day-theme .close-button:hover {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }

    .night-theme .close-button {
      color: #f0f0f0;
      border-color: #f0f0f0;
    }

    .night-theme .close-button:hover {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }

    .reading-timeline-wrapper {
      max-width: 100%;
      overflow-x: auto;
      padding: 2rem 0;
      background-color: inherit;
      scrollbar-width: thin; /* Firefox */
      scrollbar-color: rgba(0, 0, 0, 0.2) transparent; /* Firefox */
      border: none;
      border-radius: 0;
      box-shadow: none;
    }

    .reading-timeline-wrapper::-webkit-scrollbar {
      height: 8px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .reading-timeline-wrapper:hover::-webkit-scrollbar {
      opacity: 1;
    }

    .reading-timeline-wrapper::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 4px;
    }

    .timeline-scroll-container {
      position: relative;
      display: flex;
      min-width: 100%;
      padding: 1rem 0;
      gap: 0rem;
    }

    .timeline-x-axis {
      position: absolute;
      top: 50%; /* 确保x轴在按钮中央 */
      left: 0;
      width: 100%;
      height: 4px;
      background-color: #aaa;
      z-index: 0;
    }

    .timeline-year {
      position: relative;
      text-align: center;
      z-index: 1;
      cursor: pointer;
      flex: 1;
    }

    .year-button {
      width: 120px; /* 固定宽度使按钮大小一致 */
      padding: 1rem; /* 增大内边距以适应多行文字 */
      border: 2px solid;
      border-radius: 4px;
      font-size: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
      white-space: normal; /* 允许多行文字换行 */
      overflow: visible;
      position: relative; 
      margin-left: 4px; /* 确保放大时左侧边框仍可见 */
      margin-right: 4px; /* 防止相邻元素重叠 */
    }

    .day-theme .year-button {
      background-color: #fff;
      color: #000;
      border-color: #000;
    }

    .night-theme .year-button {
      background-color: #000;
      color: #fff;
      border-color: #fff;
    }

    .year-button:hover {
      background-color: #007bff;
      color: white;
      transform: scale(1.05);
      overflow: visible;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .year-details {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 1rem;
      background-color: rgba(255, 255, 255, 0.85);
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .close-year-button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: 2px solid;
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    .day-theme .close-year-button {
      background-color: #fff;
      color: #000;
      border-color: #000;
    }

    .night-theme .close-year-button {
      background-color: #000;
      color: #fff;
      border-color: #fff;
    }

    .close-year-button:hover {
      background-color: #b02a37;
      color: white;
    }

    .year-books {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.5rem;
      padding-top: 1rem;
    }

    .timeline-book {
      width: 100px;
      text-align: center;
      transition: transform 0.3s ease;
    }

    .timeline-book:hover {
      transform: translateY(-10px);
    }

    .timeline-book img {
      width: 100%;
      height: 120px;
      object-fit: cover;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s ease;
    }

    .timeline-book img:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .timeline-book p {
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: #333;
    }

    .timeline-title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .reading-timeline-wrapper h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    .timeline-year:hover .year-button {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
</style>
