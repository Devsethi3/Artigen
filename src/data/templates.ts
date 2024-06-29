export default [
  {
    name: "Blog Title",
    desc: "An AI tool that generate blog title depends on your blog information",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/4186/4186534.png",
    aiPrompt:
      "Give me 5 blog topic idea in bullet wise only based on give niche and outline topic and give me the result in Rich text editor format",
    slug: "generate-blog-title",
    form: [
      {
        label: "Enter your blog niche",
        field: "input",
        name: "niche",
        required: true,
      },
      {
        label: "Enter blog outline",
        field: "textarea",
        name: "outline",
      },
    ],
  },
  {
    name: "YouTube Description Generator",
    desc: "An AI tool that creates engaging YouTube video descriptions",
    category: "Video",
    icon: "https://cdn-icons-png.flaticon.com/128/1384/1384060.png",
    aiPrompt:
      "Generate a compelling YouTube video description (max 200 words) based on the video title and key points. Include a call-to-action and relevant keywords for SEO.",
    slug: "generate-youtube-description",
    form: [
      {
        label: "Video Title",
        field: "input",
        name: "videoTitle",
        required: true,
      },
      {
        label: "Key Points (comma-separated)",
        field: "textarea",
        name: "keyPoints",
        required: true,
      },
    ],
  },

  {
    name: "Instagram Tags Generator",
    desc: "An AI tool that suggests relevant hashtags for Instagram posts",
    category: "Social Media",
    icon: "https://cdn-icons-png.flaticon.com/128/174/174855.png",
    aiPrompt:
      "Generate 15-20 relevant and trending Instagram hashtags based on the post content and target audience. Include a mix of popular and niche-specific tags.",
    slug: "generate-instagram-tags",
    form: [
      {
        label: "Post Content",
        field: "textarea",
        name: "postContent",
        required: true,
      },
      {
        label: "Target Audience",
        field: "input",
        name: "targetAudience",
        required: true,
      },
    ],
  },

  {
    name: "Blog Content Generator",
    desc: "An AI tool that generates full blog post content",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/1187/1187595.png",
    aiPrompt:
      "Generate a 500-word blog post on the given topic. Include an introduction, 3-4 main points with subheadings, and a conclusion. Use a conversational yet informative tone.",
    slug: "generate-blog-content",
    form: [
      {
        label: "Blog Topic",
        field: "input",
        name: "blogTopic",
        required: true,
      },
      {
        label: "Target Audience",
        field: "input",
        name: "targetAudience",
        required: true,
      },
      {
        label: "Key Points to Cover (comma-separated)",
        field: "textarea",
        name: "keyPoints",
      },
    ],
  },

  {
    name: "Product Name Generator",
    desc: "An AI tool that suggests creative names for products or businesses",
    category: "Branding",
    icon: "https://cdn-icons-png.flaticon.com/128/3389/3389081.png",
    aiPrompt:
      "Generate 10 creative and memorable name ideas for a product or business based on the given description and target market. Ensure the names are unique and brandable.",
    slug: "generate-product-name",
    form: [
      {
        label: "Product/Business Description",
        field: "textarea",
        name: "description",
        required: true,
      },
      {
        label: "Target Market",
        field: "input",
        name: "targetMarket",
        required: true,
      },
    ],
  },

  {
    name: "Meta Description Generator",
    desc: "An AI tool that creates SEO-friendly meta descriptions for web pages",
    category: "SEO",
    icon: "https://cdn-icons-png.flaticon.com/128/1378/1378598.png",
    aiPrompt:
      "Generate an engaging meta description (max 155 characters) for the given web page. Include the primary keyword and a call-to-action. Optimize for click-through rate.",
    slug: "generate-meta-description",
    form: [
      {
        label: "Page Title",
        field: "input",
        name: "pageTitle",
        required: true,
      },
      {
        label: "Primary Keyword",
        field: "input",
        name: "primaryKeyword",
        required: true,
      },
      {
        label: "Page Content Summary",
        field: "textarea",
        name: "contentSummary",
        required: true,
      },
    ],
  },

  {
    name: "Tweet Thread Generator",
    desc: "An AI tool that creates engaging Twitter thread ideas",
    category: "Social Media",
    icon: "https://cdn-icons-png.flaticon.com/128/3256/3256013.png",
    aiPrompt:
      "Create an outline for a 5-tweet thread on the given topic. Each tweet should be max 280 characters. Make the content informative and engaging, with a hook in the first tweet.",
    slug: "generate-tweet-thread",
    form: [
      {
        label: "Thread Topic",
        field: "input",
        name: "threadTopic",
        required: true,
      },
      {
        label: "Target Audience",
        field: "input",
        name: "targetAudience",
        required: true,
      },
    ],
  },

  {
    name: "Podcast Episode Description",
    desc: "An AI tool that generates compelling podcast episode descriptions",
    category: "Audio",
    icon: "https://cdn-icons-png.flaticon.com/128/2628/2628834.png",
    aiPrompt:
      "Create an engaging podcast episode description (150-200 words) based on the episode title and main topics. Include key points discussed and a teaser to entice listeners.",
    slug: "generate-podcast-description",
    form: [
      {
        label: "Episode Title",
        field: "input",
        name: "episodeTitle",
        required: true,
      },
      {
        label: "Main Topics (comma-separated)",
        field: "textarea",
        name: "mainTopics",
        required: true,
      },
      {
        label: "Guest Name (if any)",
        field: "input",
        name: "guestName",
      },
    ],
  },

  {
    name: "FAQ Generator",
    desc: "An AI tool that creates relevant FAQs for products or services",
    category: "Customer Support",
    icon: "https://cdn-icons-png.flaticon.com/128/3362/3362707.png",
    aiPrompt:
      "Generate 5 relevant and common FAQs with answers (50-75 words each) for the given product or service. Focus on addressing potential customer concerns and highlighting key features.",
    slug: "generate-faqs",
    form: [
      {
        label: "Product/Service Name",
        field: "input",
        name: "productName",
        required: true,
      },
      {
        label: "Brief Description",
        field: "textarea",
        name: "description",
        required: true,
      },
      {
        label: "Key Features (comma-separated)",
        field: "textarea",
        name: "keyFeatures",
        required: true,
      },
    ],
  },
];
