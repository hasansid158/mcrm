import { createTheme } from "@mui/material/styles";

const colours = {
  lightGrey: "#efefef",
  hoverGrey: "#D6D6DC",
  grey: '#cfcfcf',
  textWhite: '#fff',
  text: '#11100F',
  background: "#f7f7f7",
  backgroundGrey: "#F7F8FC",
  // backgroundGrey: "#f0f0f0",
  backgroundLightGold: "#fff6e6",
  transparentBg: "#1c1914f0",
  darkBlack: "#1c1914",
  fontColor: "#4d4d4d",
  gold: "#FFCB5B",
  lightGold: "#F5deb3",
  darkGold: "#231e17",
  lightBlue: '#52C5B6',
  pink: "#F76A63",
  backgroundGold: "#FFCB5B",
  heavyRed: "#8f5d54",
  backgroundBlue: "#52C5B6",
  backgroundDarkBlue: "#30344E",
  error: "#FF5733",
  warning: "#ffb343",
  disabledColor: "#957b3f",
  lowGreen: '#8ed58e',
  highGreen: '#62e762',
  borderGrey: '#E1E2E3',
  orange: '#FF5538',
};

const theme = createTheme({
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  palette: {
    common: {
      lightGrey: colours.lightGrey,
      hoverGrey: colours.hoverGrey,
      grey: colours.grey,
      textWhite: colours.textWhite,
      text: colours.text,
      background: colours.background,
      backgroundGrey: colours.backgroundGrey,
      transparentBg: colours.transparentBg,
      darkBlack: colours.darkBlack,
      darkGold: colours.darkGold,
      heavyRed: colours.heavyRed,
      backgroundLightGold: colours.backgroundLightGold,
      fontColor: colours.fontColor,
      gold: colours.gold,
      lightGold: colours.lightGold,
      backgroundBlue: colours.backgroundBlue,
      backgroundDarkBlue: colours.backgroundDarkBlue,
      error: colours.error,
      warning: colours.warning,
      backgroundGold: colours.backgroundGold,
      lowGreen: colours.lowGreen,
      highGreen: colours.highGreen,
      borderGrey: colours.borderGrey,
      fieldOutline: colours.fieldOutline,
      orange: colours.orange,
    },
    // primary: {
    //   main: '#eaefe3',
    //   contrastText: colours.white,
    //   light: '#eaefe3',
    //   dark: '#2e3d12',
    // },
    // secondary: {
    //   main: '#5d792a',
    //   contrastText: colours.white,
    //   light: '#f7e9db',
    //   dark: '#43591c',
    // },
    primary: {
      main: colours.orange,
      contrastText: colours.textWhite,
      light: colours.textWhite,
    },
    secondary: {
      main: colours.backgroundDarkBlue,
      contrastText: colours.textWhite,
      light: colours.textWhite,
    },
    //new
    // primary: {
    //   main: '#FF5538',
    //   contrastText: colours.white,
    //   // light: colours.lightGold,
    // },
    // secondary: {
    //   main: '#30344E',
    //   contrastText: colours.white,
    //   light: '#3B3E57',
    // },
    pinkWhite: {
      main: colours.pink,
      contrastText: "#fff",
    },
    blueWhite: {
      main: colours.lightBlue,
      contrastText: "#fff",
    },
    whiteGold: {
      main: colours.white,
      contrastText: colours.gold,
    },
  },
  typography: {
    allVariants: {
      color: colours.text,
    },
    fontFamily: [
      '"Outfit"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h1: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: "52px",
      fontWeight: "bold",
      lineHeight: "61px",
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: "42px",
      fontWeight: "bold",
      lineHeight: "49px",
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: "32px",
      fontWeight: "bold",
      lineHeight: "38px",
    },
    h4: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: "24px",
      fontWeight: "600",
      lineHeight: 1,
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: "20px",
      fontWeight: 500,
      lineHeight: 1,
    },
    h6: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: "18px",
      fontWeight: 500,
      // lineHeight: '20px',
    },
    pb: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: "19px",
    },
    p: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "19px",
    },
    pO: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "19px",
    },
    p2: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "16px",
    },
    p2O: {
      fontFamily: '"Outfit", sans-serif',
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "16px",
    },
    p3: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "13px",
      fontWeight: 400,
      lineHeight: "15px",
    },
    description: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: "14px",
    },
    textLink: {
      fontFamily: '"Poppins", sans-serif',
      fontSize: "10px",
      fontWeight: 500,
      lineHeight: "12px",
    },
    button: {
      textTransform: "none",
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1280,
      xl: 1550,
    },
  },

  components: {
    MuiSnackbar: {
      variants: [
        {
          props: { variant: "primary" },
          style: {
            "& .MuiSnackbarContent-root": {
              background: colours.gold,
              color: colours.white,
            },
          },
        },
        {
          props: { variant: "secondary" },
          style: {
            "& .MuiSnackbarContent-root": {
              background: colours.backgroundGrey,
            },
          },
        },
      ],
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        }
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          backgroundColor: 'white',
          borderRadius: '5px !important',
        }
      },
      variants: [
        {
          props: { size: "small" },
          style: {
            height: '40px',
            minHeight: '40px',
          },
        },
        {
          props: { size: "large" },
          style: {
            height: '48px',
            minHeight: '48px',
          },
        },
      ],
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: '"Outfit", sans-serif',
          fontSize: '18px',
          background: 'white',
        }
      }
    },

    MuiAutocomplete: {
      styleOverrides: {
        listbox: {
          fontSize: 12,
        },
        popper: {
          zIndex: 99999999999,
        }
      },
      variants: [
        {
          props: { size: "small" },
          style: {
            '& .MuiInputBase-root': {
              minHeight: '40px',
            }
          },
        },
        {
          props: { size: "large" },
          style: {
            '& .MuiInputBase-root': {
              minHeight: '48px',
            }
          },
        },
      ]
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
        size: 'small',
      },
      styleOverrides: {
        root: {
          height: '48px',
          fontFamily: '"Outfit", sans-serif',
          fontSize: "14px",
          fontWeight: 500,
          borderRadius: '10px',
        },
      },
      variants: [
        {
          props: { size: "tiny" },
          style: {
            height: '35px',
            '& svg': {
              fontSize: '20px',
            }
          },
        },
      ],
    },

    MuiLoadingButton: {
      styleOverrides: {
        root: {
          "&.MuiLoadingButton-loading": {
            background: colours.disabledColor,
          },
          "& .MuiLoadingButton-loadingIndicator": {
            color: colours.lightGold,
          },
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderColor: colours.borderGrey,
          '& .MuiDataGrid-withBorderColor': {
            borderColor: colours.borderGrey,
          },
          // '& .MuiDataGrid-row': { position: 'relative'},
          '& .MuiDataGrid-row:hover': {
            backgroundColor: colours.hoverGrey,
          },
          '& input': {
            fontSize: '12px'
          },
        },
      },
    },

    // MuiPaginationItem-root
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-ellipsis': {
            padding: 'unset',
            minWidth: 'unset',
          },
        }
      }
    }
  },
});

export default theme;
