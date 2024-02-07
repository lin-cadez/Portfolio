function switchTheme() {
	document.body.classList.toggle("dark");
	document.body.classList.toggle("light");

	document.getElementById("sun").classList.toggle("hidden");
	document.getElementById("moon").classList.toggle("hidden");
}

function showNav() {
	nav = document.getElementsByClassName("nav")[0];
	nav.style.left = "0";
}

document.addEventListener("click", function (e) {
	if (
		e.target.classList.contains("nav") ||
		e.target.classList.contains("nav-item")
	) {
		nav = document.getElementsByClassName("nav")[0];
		nav.style.left = "-100%";
	}
});

window.addEventListener("scroll", function () {
	var o =
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop,
		t = document.querySelector(".top");
	o > 400 ? (t.style.display = "flex") : (t.style.display = "none");
});
