<script>
    import ProjectCard from '../components/ProjectCard.svelte'; // 引入 ProjectCard 组件
    export let isDayTime; // 接收从 App.svelte 传递的 isDayTime
    const projects = [
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

    let currentPopup = ""; // 当前打开弹窗的项目名称

    // 设置当前弹窗的函数，支持多弹窗交互
    const setCurrentPopup = (popupName) => {
        currentPopup = currentPopup === popupName ? "" : popupName;
    };

</script>

<main class="projects-container">
    <!-- 遍历项目数据并渲染项目卡片 -->
    {#each projects as project (project.name)} <!-- 使用唯一标识符优化渲染 -->
        <ProjectCard 
            name={project.name}
            description={project.description}
            language={project.language}
            tags={project.tags}
            httpsLink={project.httpsLink}
            sshLink={project.sshLink}
            website={project.website}
            currentPopup={currentPopup} 
            setCurrentPopup={setCurrentPopup} 
            isDayTime={isDayTime}
        
        />
    {/each}
</main>

