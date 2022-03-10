module.exports = {
  ci: {
    collect: {
      maxAutodiscoverUrls: 2,
      settings: {
        preset: "desktop",
        throttling: { 
          cpuSlowdownMultiplier: 0,
        }
      }
    },
    assert: {
      preset: 'lighthouse:no-pwa'
    },
    upload: {
      target: 'lhci',
      token: 'f458bf9b-d83a-4efb-befa-17e1dbfa1f74',
      serverBaseUrl: 'https://good-glamorous-saturday.glitch.me/'
    },
  },
};