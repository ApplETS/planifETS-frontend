const tailwindConfig = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navbar: '#40314E',
        background: '#1F1824',
        yearSection: '#2F2B4B',
        sessions: '#211F33',
        courseSidebar: '#2F2B4B',
        login: '#2F2B4B',
        loginButtonHover: '#8C89F2',

        // Status tags
        creditsTag: '#FFFFFF',
        completedCourseTag: '#6DE9A2',
        inProgressCourseTag: '#EED37E',
        failedCourseTag: '#FFA5A6',
        duplicateCourseTag: '#FFA500',
        notOfferedCourseTag: '#d15656',
        buttonTags: '#A5A1FF',

        // Buttons
        navbarButton: '#EFE3DE',
        navbarButtonHover: '#7D90ED',
        favoris: '#EFE3DE',
        searchbar: '#D8D2F1',
        textDarkBackground: '#F0F4FF',
        textLightBackground: '#000000',
        sessionCourse: '#2F3359',
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
