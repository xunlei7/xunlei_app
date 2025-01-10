<script>
    export let isDayTime;
    import { books, movies } from '../data/data.js';

    // 书架
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

    //电影
    let groupedMovies = {};
    movies.forEach((movie) => {
      if (!groupedMovies[movie.year]) {
        groupedMovies[movie.year] = [];
      }
      groupedMovies[movie.year].push(movie);
    });
  
    let sortedMovieYears = Object.keys(groupedMovies)
      .filter(year => year !== "Watching Now")
      .sort((a, b) => Number(b) - Number(a));
  
    if (Object.keys(groupedMovies).includes("Watching Now")) {
      sortedMovieYears = ["Watching Now", ...sortedMovieYears];
    }

    let showModal = false; // 控制弹窗显示状态
    let selectedItem = null; // 选中的书或电影

    function openModal(item) {
      selectedItem = item;
      showModal = true;
    }

    function closeModal() {
      showModal = false;
      selectedItem = null;
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
      <h2>Words, Reels, and Feels</h2>
      <p>I am passionate about books related to programming, fiction, and personal development. I enjoy immersing myself in new stories and learning from each book I read.</p>
    </div>
   
        <!-- 电影书架 -->
    <div class="movieshelf-wrapper">
      <h1 class="movieshelf-title">Movie & TV Shows shelf</h1>
        <p class="bookshelf-description">
          Here's a collection of movies and TV shows I have watched and loved:
        </p>
  
        {#each sortedMovieYears as year}
          <div class="year-section">
            <h2 class="year-header">{year}</h2>
            <div class="bookshelf">
              {#each groupedMovies[year] as movie}
                <button class="movie" type="button" on:click={() => openModal(movie)} aria-label="Open movie details">
                  <img src={movie.image} alt={movie.title} />
                </button>
              {/each}
            </div>
          </div>
        {/each}
    </div>

    <!-- 分割线 -->
    <div class="divider"></div>

    <!-- 书籍书架 -->
    <div class="bookshelf-wrapper">
      <h1 class="bookshelf-title">Bookshelf</h1>
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
          <img class="book-cover" src={selectedItem.image} alt="{selectedItem.title}" />
          <h3>{selectedItem.title}</h3>
          {#if selectedItem.author}
            <p><strong>Author:</strong> {selectedItem.author}</p>
          {:else if selectedItem.director}
            <p><strong>Director:</strong> {selectedItem.director}</p>
          {/if}
          <p>{selectedItem.description}</p>
          <div class="modal-actions">
            <button class="close-button" on:click={closeModal}>Close</button>
          </div>
        </div>
      </div>
    {/if}

    <div class="combined-timeline-wrapper {isDayTime ? 'day-theme' : 'night-theme'}">
      <h2 class="timeline-title">Timeline</h2>
      <div class="timeline-scroll-container">
        <div class="timeline-x-axis"></div>
        {#each sortedYears.concat(sortedMovieYears).sort((a, b) => Number(a) - Number(b)) as year}
          <div class="timeline-year">
            <button class="year-button" on:click={() => openYearDetails(year)}>{year}</button>
          </div>
        {/each}
      </div>
  
        {#if selectedYear}
          <div class="year-details">
            <h3>from {selectedYear}</h3>
            <button class="close-year-button" on:click={closeYearDetails}>Close</button>
            <div class="year-books">
              {#each groupedBooks[selectedYear] as book (book.title)}
                <div class="timeline-book">
                  <img src={book.image} alt="{book.title}" />
                  <p>{book.title} (Book)</p>
                </div>
              {/each}
              {#each groupedMovies[selectedYear] as movie (movie.title)}
                <div class="timeline-book">
                  <img src={movie.image} alt="{movie.title}" />
                  <p>{movie.title} ({movie.type === "movie" ? "Movie" : "TV"})</p>
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

    .movieshelf-wrapper{
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
    .movieshelf-wrapper::-webkit-scrollbar {
      width: 8px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .movieshelf-wrapper:hover::-webkit-scrollbar {
      opacity: 1;
    }

    .bookshelf-title {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.3rem;
      text-align: center;
    }

    .movieshelf-title {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.3rem;
      text-align: center;
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


    .movie {
      padding: 0;
      background-color: transparent;
      border: none;
      border-radius: 0;
      box-shadow: none;
    }
    .movie img{
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 8px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
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

    .movie:hover img {
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

    .combined-timeline-wrapper {
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

    .combined-timeline-wrapper::-webkit-scrollbar {
      height: 8px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .combined-timeline-wrapper:hover::-webkit-scrollbar {
      opacity: 1;
    }

    .combined-timeline-wrapper::-webkit-scrollbar-thumb {
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
      background-color:inherit;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      border: 1px solid #d3d3d3; 
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
      background-color: #007bff;
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
      color: inherit;
    }

    .timeline-title {
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .combined-timeline-wrapper h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    .timeline-year:hover .year-button {
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    .divider {
      width: 50%; /* 分割线宽度 */
      height: 1px; /* 分割线高度 */
      background-color: #cccccc;
      margin: 1rem auto;
    }

</style>
