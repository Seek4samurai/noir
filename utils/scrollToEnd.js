const ScrollToBottom = (ref) => {
  ref.ScrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
export default ScrollToBottom;
