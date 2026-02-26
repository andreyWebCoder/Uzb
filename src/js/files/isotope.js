//====================isotope filter========================================
const elem = document.querySelector('.portfolio__grid');
const iso = new Isotope(elem, {
	itemSelector: '.grid-portfolio__item',
	layoutMode: 'masonry',
	persentPosition: true,
	masonry: {
		columnWidth: '.grid-portfolio__item',
		horizontalOrder: true,
	}
});
document.querySelectorAll('.nav-portfolio__link').forEach(el => {
	el.addEventListener('click', (e) => {
		// Отменяем переход
		e.preventDefault();
		let filter = e.currentTarget.dataset.filter;
		iso.arrange({ filter: `${filter}` });
	});
});
//========= Добавка активного класса на кнопки фильтра===================================================
var btnContainer = document.getElementById("myDIV");
// Сделать все кнопки с class="btn" внутри контейнера
var btns = btnContainer.getElementsByClassName("nav-portfolio__link");
// Выполните цикл по кнопкам и добавьте активный класс к текущей/нажатой кнопке
for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function () {
		var current = document.getElementsByClassName("active");
		// Если нет активного класса
		if (current.length > 0) {
			current[0].className = current[0].className.replace(" active", "");
		}
		// Добавить активный класс для текущей/нажатой кнопки
		this.className += " active";
	});
}