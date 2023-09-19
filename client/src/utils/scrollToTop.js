/**
 * 페이지 최상단으로 이동.
 * @param {boolean} smooth - 스무스 스크롤 여부
 */
export default function scollToTop(smooth) {
  const scrollToOptions = {
    top: 0,
    left: 0,
    behavior: smooth ? 'smooth' : 'auto',
  };

  window.scrollTo(scrollToOptions);
}
