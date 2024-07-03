export default [
  {
    name: "Blog Title",
    desc: "An AI tool that generates blog titles based on your blog information",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/4186/4186534.png",
    aiPrompt:
      "Generate 5 creative and SEO-optimized blog title ideas based on the given niche and outline. Each title should be engaging and relevant.",
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
      "Generate a compelling YouTube video description (max 200 words) based on the video title and key points. Include a call-to-action and relevant keywords for SEO. Ensure the description is engaging and informative.",
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
      "Generate 20 relevant and trending Instagram hashtags based on the post content and target audience. Include a mix of popular and niche-specific tags. Ensure the hashtags maximize reach and engagement.",
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
      "Generate a 1000-word blog post on the given topic. Include an introduction, 3-4 main points with subheadings, and a conclusion. Use a conversational yet informative tone. Ensure the content is well-researched and engaging.",
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
      "Generate 10 creative and memorable name ideas for a product or business based on the given description and target market. Ensure the names are unique, brandable, and aligned with the target audience.",
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
      "Generate an engaging meta description (max 155 characters) for the given web page. Include the primary keyword and a call-to-action. Optimize for click-through rate and SEO.",
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
      "Create an outline for a 7-tweet thread on the given topic. Each tweet should be max 280 characters. Make the content informative, engaging, and ensure the thread flows logically.",
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
      "Create an engaging podcast episode description (150-200 words) based on the episode title and main topics. Include key points discussed and a teaser to entice listeners. Ensure the description is informative and engaging.",
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
      "Generate 10 relevant and common FAQs with answers (50-75 words each) for the given product or service. Focus on addressing potential customer concerns and highlighting key features. Ensure the FAQs are clear and informative.",
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
  {
    name: "E-commerce Product Description",
    desc: "An AI tool that generates detailed product descriptions for e-commerce",
    category: "E-commerce",
    icon: "https://cdn-icons-png.flaticon.com/128/1387/1387762.png",
    aiPrompt:
      "Create a detailed and compelling product description (200-300 words) for the given product. Include key features, benefits, and a call-to-action. Ensure the description is optimized for SEO and conversion.",
    slug: "generate-product-description",
    form: [
      {
        label: "Product Name",
        field: "input",
        name: "productName",
        required: true,
      },
      {
        label: "Key Features (comma-separated)",
        field: "textarea",
        name: "keyFeatures",
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
    name: "LinkedIn Post Generator",
    desc: "An AI tool that creates engaging LinkedIn posts",
    category: "Social Media",
    icon: "https://cdn-icons-png.flaticon.com/128/174/174857.png",
    aiPrompt:
      "Generate a professional and engaging LinkedIn post (100-150 words) based on the given topic and key points. Include relevant hashtags and a call-to-action. Ensure the post is optimized for engagement.",
    slug: "generate-linkedin-post",
    form: [
      {
        label: "Post Topic",
        field: "input",
        name: "postTopic",
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
    name: "Newsletter Content Generator",
    desc: "An AI tool that generates content for newsletters",
    category: "Email Marketing",
    icon: "https://cdn-icons-png.flaticon.com/128/281/281769.png",
    aiPrompt:
      "Generate a detailed and engaging newsletter content (400-500 words) based on the given topic and key points. Include a call-to-action and ensure the content is informative and engaging.",
    slug: "generate-newsletter-content",
    form: [
      {
        label: "Newsletter Topic",
        field: "input",
        name: "newsletterTopic",
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
    name: "Case Study Generator",
    desc: "An AI tool that generates detailed case studies based on project details",
    category: "Business",
    icon: "https://cdn-icons-png.flaticon.com/128/1484/1484860.png",
    aiPrompt:
      "Generate a detailed case study (500-800 words) based on the given project details. Include an introduction, project goals, methodologies, results, and a conclusion. Highlight key achievements and lessons learned.",
    slug: "generate-case-study",
    form: [
      {
        label: "Project Title",
        field: "input",
        name: "projectTitle",
        required: true,
      },
      {
        label: "Project Goals",
        field: "textarea",
        name: "projectGoals",
        required: true,
      },
      {
        label: "Methodologies Used",
        field: "textarea",
        name: "methodologies",
        required: true,
      },
      {
        label: "Results Achieved",
        field: "textarea",
        name: "results",
        required: true,
      },
    ],
  },
  {
    name: "LinkedIn Post Generator",
    desc: "An AI tool that creates professional LinkedIn posts",
    category: "Social Media",
    icon: "https://cdn-icons-png.flaticon.com/128/174/174857.png",
    aiPrompt:
      "Generate a professional LinkedIn post (max 300 words) based on the provided topic and key points. Ensure the tone is professional and engaging, suitable for a business audience.",
    slug: "generate-linkedin-post",
    form: [
      {
        label: "Post Topic",
        field: "input",
        name: "postTopic",
        required: true,
      },
      {
        label: "Key Points",
        field: "textarea",
        name: "keyPoints",
        required: true,
      },
    ],
  },
  {
    name: "Meal Planner",
    desc: "An AI tool that generates weekly meal plans based on dietary preferences and nutritional goals.",
    category: "Health & Fitness",
    icon: "https://cdn-icons-png.flaticon.com/128/3077/3077216.png",
    aiPrompt:
      "Create a customized meal plan for the week. Include breakfast, lunch, dinner, and snacks. Consider dietary restrictions and preferences.",
    slug: "generate-meal-planner",
    form: [
      {
        label: "Dietary Preferences",
        field: "input",
        name: "dietPreferences",
        required: true,
      },
      {
        label: "Nutritional Goals",
        field: "textarea",
        name: "nutritionalGoals",
      },
    ],
  },
  {
    name: "Budget Planner",
    desc: "An AI tool that helps users plan and manage their personal finances.",
    category: "Finance",
    icon: "https://cdn-icons-png.flaticon.com/128/2486/2486780.png",
    aiPrompt:
      "Create a monthly budget plan. Include income sources, fixed expenses, variable expenses, and savings goals.",
    slug: "generate-budget-planner",
    form: [
      {
        label: "Monthly Income",
        field: "input",
        name: "monthlyIncome",
        required: true,
      },
      {
        label: "Fixed Expenses",
        field: "textarea",
        name: "fixedExpenses",
        required: true,
      },
      {
        label: "Savings Goals",
        field: "textarea",
        name: "savingsGoals",
      },
    ],
  },
  {
    name: "Event Planner",
    desc: "An AI tool that assists in planning events such as parties, weddings, and corporate gatherings.",
    category: "Events",
    icon: "https://cdn-icons-png.flaticon.com/128/2490/2490302.png",
    aiPrompt:
      "Plan an upcoming event. Specify the type of event, guest list, venue preferences, and event schedule.",
    slug: "generate-event-planner",
    form: [
      {
        label: "Event Type",
        field: "input",
        name: "eventType",
        required: true,
      },
      {
        label: "Guest List",
        field: "textarea",
        name: "guestList",
        required: true,
      },
      {
        label: "Venue Preferences",
        field: "textarea",
        name: "venuePreferences",
      },
      {
        label: "Event Schedule",
        field: "textarea",
        name: "eventSchedule",
        required: true,
      },
    ],
  },
];
