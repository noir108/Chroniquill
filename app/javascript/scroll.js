document.addEventListener("DOMContentLoaded", () => {
  const topBtn = document.getElementById("scr-btn");
  const indexSub = document.getElementById("ind-sub");

  topBtn.addEventListener("click", () => {
    indexSub.scroll({
      top: 0,
      behavior: "smooth",
    });
  });
});