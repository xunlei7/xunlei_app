
// books
export const books = [
    { title: "The C Programming Language", 
      author: "Brian W. Kernighan and Dennis M. Ritchie", 
      image:"/Cbook.jpg", 
      description: "The book serves as both an introduction to the C programming language and a reference guide. It provides a concise, authoritative explanation of the language's core concepts, syntax, and powerful features, with numerous examples and exercises to solidify understanding.",
      year: "2022" 
    },
    { title: "The House of Camellia", 
      author: "Ito Ogawa",
      image: "/book.jpg",
      description: "Hatoko inherits her grandmother’s letter-writing shop in Kamakura, helping clients express emotions through heartfelt letters. This touching story reflects on family, tradition, and the power of written words.",
      year: "2023"
    },
];


// movies
export const movies = [
  { 
    title: "The Long Season", 
    director: "Xin Shuang", 
    image: "/TheLongSeason.jpg", 
    description: "A gripping Chinese suspense drama that intertwines multiple timelines to unravel the mystery surrounding a disappearance. With rich characters and an evocative portrayal of time, the series explores human emotions, regret, and resilience.",
    year: "2022" 
  },

  { 
    title: "Oppenheimer", 
    director: "Christopher Nolan", 
    image: "/Oppenheimer.jpg", 
    description: "A historical biopic that delves into the life of J. Robert Oppenheimer, the theoretical physicist known as the 'father of the atomic bomb.' The film captures his internal and external conflicts during the creation of the Manhattan Project and the devastating aftermath of his invention.",
    year: "2024" 
  },

  { 
    title: "We Made a Beautiful Bouquet", 
    director: "Nobuhiro Doi", 
    image: "/BeautifulBouquet.jpeg", 
    description: "A poignant Japanese romance that follows the bittersweet love story of a young couple who meet by chance but share a fleeting, yet profound connection. Through their shared dreams and struggles, the film paints a delicate portrait of fleeting modern relationships.",
    year: "2024" 
  },

  { 
    title: "Detective Conan: The Bride of Halloween", 
    director: "Susumu Mitsunaka", 
    image: "/ConanHalloweenBride.jpg", 
    description: "This animated mystery film follows Conan Edogawa as he attempts to thwart a looming terrorist attack during a wedding ceremony. Filled with high-stakes drama, puzzles, and action, it’s a thrilling addition to the beloved Detective Conan series.",
    year: "2024" 
  },

  { 
    title: "Shoplifters", 
    director: "Hirokazu Kore-eda", 
    image: "/Shoplifters.jpg", 
    description: "A critically acclaimed Japanese drama that tells the story of a makeshift family surviving through petty theft and love on the margins of society. When they take in a neglected child, their bonds are tested as their secrets come to light.",
    year: "2024" 
  },

  { 
    title: "Deadpool 3", 
    director: "Shawn Levy", 
    image: "/deadpool.jpg", 
    description: "The highly anticipated sequel follows the witty and irreverent antihero Deadpool as he embarks on a new adventure. Packed with hilarious humor, fourth-wall-breaking antics, and thrilling action, the movie is set to expand the Marvel Cinematic Universe with unexpected twists and beloved characters.",
    year: "2024" 
  },
  { 
    title: "Robot Dreams", 
    director: "Pablo Berger", 
    image: "/robot.jpg", 
    description: "A heartwarming and emotional animated film based on the graphic novel by Sara Varon. Set in a futuristic world, the story follows a lonely dog who builds a robot companion, only to face unexpected challenges and poignant lessons about friendship, loss, and resilience.",
    year: "2023" 
  },
  {
    title: "My Altay (我的阿勒泰)",
    director: "Li Juan (李娟)", 
    image: "/MyAltay.jpg",
    description: "Based on Li Juan's heartfelt memoirs, 'My Altay' captures the serene yet resilient life of the nomadic Kazakh community in the Altay Mountains. The story paints a poetic portrayal of the author's connection to the land, people, and culture, celebrating the beauty of everyday life and the harsh yet awe-inspiring nature of the region.",
    year: "2023"
  },
  {
    title: "Claw Doll",
    director: "Yan Fei, Peng Damao",
    image: "/ClawDollMovie.jpg",
    description: "Claw Doll is a 2024 comedy film starring Shen Teng and Ma Li. The story follows Ma Chenggang (played by Shen Teng), a wealthy man from Xihong City, and his wife Chunlan (played by Ma Li), as they attempt to raise their son Ma Jiye to become a responsible heir. To teach him life lessons, they pretend to be poor and live a humble life filled with hard work and valuable lessons. The film balances humor with a thoughtful exploration of parenting and education.",
    year: "2024"
  },
  { 
    title: "Your Name", 
    director: "Makoto Shinkai", 
    image: "/YourName.jpg", 
    description: "A breathtaking Japanese animated romantic fantasy film that follows two teenagers mysteriously swapping bodies across time and space. Directed by Makoto Shinkai, this visually stunning masterpiece explores themes of fate, love, and connection.",
    year: "2016" 
}


];

// projects

export const projects = [
    {
        name: "xunlei_web",
        description: "This site",
        language: "Svelte",
        tags: ["SvelteKit", "Web", "Server Side Rendering"],
        httpsLink: "https://github.com/xunlei7/xunlei.app.git",
        sshLink: "git@github.com:xunlei7/xunlei.app.git"
    },
    {
        name: "Toxic Comments Detection System in AI Arte",
        description: "A machine learning-based system to detect toxic comments",
        language: "Python",
        tags: ["Machine Learning", "Toxic Comment Detection", "NLP", "AI Ethics"],
        httpsLink: "https://github.com/5400FinalGroup/5400Final.git",
        sshLink: "git@github.com:5400FinalGroup/5400Final.git"
    },
    {
        name: "YouTube-Video-Success",
        description: "Collection, preprocessing, and analysis of YouTube video data to extract meaningful insights",
        language: "Python",
        tags: ["Machine Learning", "YouTube Data Analysis", "Data Preprocessing", "Video Analytics"],
        httpsLink: "https://github.com/dsan-5000/YouTube-Video-Success.git",
        sshLink: "git@github.com:dsan-5000/YouTube-Video-Success.git",
        website: "https://xunlei.georgetown.domains/portfolio_project/"
    },
    {
        name: "Crawling and EDA",
        description: "This project involves using the SerpApi API to crawl and collect job descriptions from Google Jobs. The collected data will then be cleaned using LLM (Large Language Models) and analyzed to extract meaningful insights and patterns.",
        language: "Python",
        tags: ["Web Scraping", "API Integration", "SerpApi", "Data Analysis"],
        httpsLink: "https://github.com/dsan-5000/hw-3-xunlei7.git",
        sshLink: "git@github.com:dsan-5000/hw-3-xunlei7.git"
    },
    {
        name: "Cyber security",
        description: "Implement a key generator, encryptor, and decryptor for secure file encryption and decryption using SS public and private key pairs.",
        language: "C",
        tags: ["Cryptography", "Key Generation", "Public Key", "Private Key"],
        httpsLink: "https://git.ucsc.edu/cse13s/winter2023-section01/xlei11.git",
        sshLink: "git@git.ucsc.edu:cse13s/winter2023-section01/xlei11.git"
    },
    {
        name: "LZ78 Compression",
        description: "Implement encode and decode programs for LZ78 compression and decompression, supporting text and binary files, variable bit-length codes, efficient 4KB blocks, and interoperability across little and big endian systems.",
        language: "C",
        tags: ["LZ78 Compression", "Data Compression", "Binary Files", "Efficient I/O"],
        httpsLink: "https://git.ucsc.edu/cse13s/winter2023-section01/xlei11.git",
        sshLink: "git@git.ucsc.edu:cse13s/winter2023-section01/xlei11.git"
    },
    {
        name: "Fuzzy Name Matching Algorithm",
        description: "Implement a Fuzzy Name Matching algorithm that computes a similarity score between two given names.",
        language: "Python",
        tags: ["Fuzzy Matching", "Name Matching", "Algorithm Design", "Data Cleaning"],
        httpsLink: "https://github.com/DSAN5400-F24/fall-2024-assignment-04-xunlei7",
        sshLink: "git@github.com:DSAN5400-F24/fall-2024-assignment-04-xunlei7.git"
    },
    {
        name: "Naive Bayes Classifier",
        description: "Implements a Naive Bayes classifier to predict presidential speech authors, using custom and scikit-learn methods, with visualizations.",
        language: "Python",
        tags: ["Naive Bayes", "Text Classification", "Scikit-learn", "Data Visualization"],
        httpsLink: "https://github.com/DSAN5400-F24/fall-2024-assignment-03-xunlei7.git",
        sshLink: "git@github.com:DSAN5400-F24/fall-2024-assignment-03-xunlei7.git"
    },
    
    {
        name: "A Little Slice of π",
        description: "Implement a small number of mathematical functions (e^x and x^(1/2)), mimicking <math.h>, and using them to compute the fundamental constants e and π. Using a dedicated test harness to compare implemented functions with those of the math library.",
        language: "C",
        tags: ["Numerical Computation", "Math Library",  "Algorithm Implementation"],
        httpsLink: "https://git.ucsc.edu/cse13s/winter2023-section01/xlei11.git",
        sshLink: "git@git.ucsc.edu:cse13s/winter2023-section01/xlei11.git"
    },
    {
        name: "Sorting: Putting your affairs in order",
        description: "Implement Shell Sort, Batcher Sort, Heap Sort, and recursive Quicksort to explore their mechanics and computational complexity.",
        language: "C",
        tags: ["Sorting Algorithms", "Shell Sort", "Batcher Sort", "Heap Sort", "Quicksort"],
        httpsLink: "https://git.ucsc.edu/cse13s/winter2023-section01/xlei11.git",
        sshLink: "git@git.ucsc.edu:cse13s/winter2023-section01/xlei11.git"
    },
    {
        name: "Game of Life",
        description: "Implement Conway's Game of Life on a 2D grid with cells that evolve through generations based on three simple rules.",
        language: "C",
        tags: ["Conway's Game of Life", "2D Grid Simulation", "Cellular Automata", "Game Theory"],
        httpsLink: "https://git.ucsc.edu/cse13s/winter2023-section01/xlei11.git",
        sshLink: "git@git.ucsc.edu:cse13s/winter2023-section01/xlei11.git"
    },
    {
        name: "Looping in RISC-V Assembly",
        description: "Implement a RISC-V Assembly program that prompts for a pattern height, validates input, and prints a pattern using numbers, stars (*), and dollar signs ($).",
        language: "RISC_V",
        tags: ["RISC-V Assembly", "Pattern Printing", "Input Validation", "Assembly Programming"],
        httpsLink: "https://git.ucsc.edu/cse-12/spring22/xlei11.git",
        sshLink: "git@git.ucsc.edu:cse-12/spring22/xlei11.git"
    },
    {
        name: "Paint application",
        description: "Develop a mini 'Paint' application in RISC-V Assembly, using keyboard input to draw patterns on a Bitmap display by mapping 32-bit/64-bit values to colors and addressing them as pixels.",
        language: "RISC_V",
        tags: ["RISC-V Assembly", "Graphics Programming", "Keyboard Input", "Pixel Mapping"],
        httpsLink: "https://git.ucsc.edu/cse-12/spring22/xlei11.git",
        sshLink: "git@git.ucsc.edu:cse-12/spring22/xlei11.git"
    },

];

// blog

export let blogEntries = [
    {
        date: "2024年12月25日",
        title: "Christmas Day",
        text: "🎄 Merry Christmas! 🎄,Welcome to 2025, a new start",
        image: "/tree.jpg",
      
    },
    {
        date: "2025年01月07日",
        title: "",
        text: "find it from the www.pexels.com, love it !",
        image: "/love.jpg",
    
    },
   
];

// home page quesion 
export let faqs = [
  {
    question: "Why did you choose data science?",
    answer: "I love solving complex problems and uncovering insights hidden in data.",
  },
  {
    question: "What was your favorite project?",
    answer: "My favorite project was a customer churn prediction model that helped a startup reduce customer attrition.",
  },
  {
    question: "What challenges excite you the most?",
    answer: "I enjoy working on time series forecasting problems due to their real-world impact and complexity.",
  },
];