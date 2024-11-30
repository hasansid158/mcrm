import useMediaQuery from "@mui/material/useMediaQuery";



/******
 * listening browser size change events
 * @returns {Obj} { isMobile, isTablet, isLaptop }
 */
export default function useScreenSize() {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const isLaptop = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('xl'));

  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
  };
};