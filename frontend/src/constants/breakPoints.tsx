// Breakpoints w px (mobile-first approach)
export const breakPoints = {
  mobile: 0, // < 768px
  tablet: 768, // 768px - 1024px
  laptop: 1024, // 1024px - 1440px
  desktop: 1440, // >= 1440px
} as const;

// Media queries dla CSS-in-JS / Emotion
export const breakPointsMediaQueries = {
  mobile: `@media (max-width: ${breakPoints.tablet - 1}px)`, // < 768px
  tablet: `@media (min-width: ${breakPoints.tablet}px)`, // >= 768px
  laptop: `@media (min-width: ${breakPoints.laptop}px)`, // >= 1024px
  desktop: `@media (min-width: ${breakPoints.desktop}px)`, // >= 1440px

  // Dodatkowo: zakresy
  onlyMobile: `@media (max-width: ${breakPoints.tablet - 1}px)`,
  onlyTablet: `@media (min-width: ${breakPoints.tablet}px) and (max-width: ${
    breakPoints.laptop - 1
  }px)`,
  onlyLaptop: `@media (min-width: ${breakPoints.laptop}px) and (max-width: ${
    breakPoints.desktop - 1
  }px)`,
} as const;

export default breakPoints;
