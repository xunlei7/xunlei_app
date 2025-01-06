<script>
    export let isDayTime;
    export let books = [];
  
  
    let groupedBooks = {};
    books.forEach((book) => {
      if (!groupedBooks[book.year]) {
        groupedBooks[book.year] = [];
      }
      groupedBooks[book.year].push(book);
    });
  
    // 对年份进行排序
    let sortedYears = Object.keys(groupedBooks)
      .filter(year => year !== "Reading Now") // 过滤掉 "Reading Now"
      .sort((a, b) => Number(b) - Number(a)); // 转换字符串为数字后排序
  
    // 将 "Reading Now" 放在第一个位置
    if (Object.keys(groupedBooks).includes("Reading Now")) {
      sortedYears = ["Reading Now", ...sortedYears];
    }
  </script>
  
  <div class="{isDayTime ? 'day-theme' : 'night-theme'} container">
    <div class="bookshelf-wrapper">
      <h1 class="bookshelf-title">My Bookshelf</h1>
      <p class="bookshelf-description">
        Here's a collection of books I have read, want to read, and currently reading:
      </p>
  
      <!-- 遍历排序后的年份组，按年份展示书籍 -->
      {#each sortedYears as year}
        <div class="year-section">
          <h2 class="year-header">{year}</h2>
          <div class="bookshelf">
            {#each groupedBooks[year] as book}
              <div class="book">
                <img src={book.image} alt={book.title} />
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
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
      border-bottom: 1px solid #aaa; /* 添加灰色分割线 */
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
  
    .day-theme {
      --shelf-bg-color: #f8f8f8;
      color: #333;
    }
  
    .night-theme {
      --shelf-bg-color: #1a1a1a;
      color: #f0f0f0;
    }
  </style>
  