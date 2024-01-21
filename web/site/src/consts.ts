// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Long Nguyen";
export const SITE_DESCRIPTION = "Welcome to my website!";

export const EXTERNAL_LINKS = {
  email: {
    displayText: "me@long-nguyen.dev",
    url: "mailto:me@long-nguyen.dev",
  },
  github: {
    displayText: "Github",
    url: "https://github.com/ryuuart",
  },
  linkedin: {
    displayText: "LinkedIn",
    url: "https://www.linkedin.com/in/18nguyenl/",
  },
};

export const INTRODUCTION = {
  greeting: "Hello!",
  description:
    "I’m Long, a front-end engineer. I make visions and ideas real with art and code.",
  links: [
    {
      displayText: "Resume",
      url: "",
    },
    EXTERNAL_LINKS.email,
    // {
    //   displayText: "Blog",
    //   url: "",
    // },
    // {
    //   displayText: "Art",
    //   url: "",
    // },
  ],
};

export const FOOTER_LIST_LINKS = {
  title: "Links",
  links: [
    // {
    //   displayText: "Portfolio",
    //   url: "/portfolio",
    // },
    // {
    //   displayText: "Artwork",
    //   url: "/art",
    // },
    // {
    //   displayText: "Blog",
    //   url: "/blog",
    // },
    {
      displayText: "About Me",
      url: "/about",
    },
  ],
};

export const FOOTER_LIST_SOCIALS = {
  title: "Socials",
  links: [EXTERNAL_LINKS.github, EXTERNAL_LINKS.linkedin],
};
