const themeToggler = (theme = "light") => {
    document.documentElement.className = ""
    document.documentElement.classList.add(theme)
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
};
export default themeToggler