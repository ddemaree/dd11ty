module.exports = {
  fontSets: [
    "soehne",
    "soehne-mono",
    "soehne-breit"
  ],
  menu: [
    {
      text: "Home",
      icon: "home",
      url: "/",
      identifier: "home"
    },
    {
      text: "About",
      icon: "user-ninja",
      url: "/about",
      identifier: "about",
      hidden: true
    },
    {
      text: "Writing",
      icon: "feather-alt",
      url: "/articles",
      identifier: "articles"
    },
    {
      text: "Notes",
      icon: "comment-alt-dots",
      url: "/notes",
      identifier: "notes",
      hidden: true
    }
  ]
}