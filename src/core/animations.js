import theme from "./theme";

export const transitions = (property = 'all') => ({
    common: theme.transitions.create(property, {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.standard,
      }),

    short: theme.transitions.create('all', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.short,
      }),

    shortest: theme.transitions.create('all', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shortest,
      }),
  });