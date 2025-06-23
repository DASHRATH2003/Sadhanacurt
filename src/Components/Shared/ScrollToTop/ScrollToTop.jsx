import useScrollToTop from '../../../Hooks/Helper/useScrollToTop';

const ScrollToTop = ({ children }) => {
  useScrollToTop();
  return children;
};

export default ScrollToTop; 