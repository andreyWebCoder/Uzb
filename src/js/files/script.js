"use strict"
document.querySelectorAll('.simplebar').forEach(el => {
	new SimpleBar(el, {
		autoHide: false,
		scrollbarMinSize: '25',
		scrollbarMaxSize: '37',
	},
	)
});
//+========================================================================
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// Получение обычных спойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Инициализация обычних спойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}
	// Получение спойлеров с медиазапросами
	const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
		return item.dataset.spollers.split(",")[0];
	});
	// Инициализация спойлеров с едиазапросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach(item => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(",");
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});
		// Получае уникальние брейкпоинты
		let mediaQueries = breakpointsArray.map(function (item) {
			return '(' + item.type + "-width:" + item.value + "px)," + item.value + ',' + item.type;
		});
		mediaQueries = mediaQueries.filter(function (item, index, self) {
			return self.indexOf(item) === index;
		});

		//Работаем с кажды брейкпоинтом
		mediaQueries.forEach(breakpoint => {
			const paramsArray = breakpoint.split(",");
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);

			//Обекти с нужныи условиями
			const spollersArray = breakpointsArray.filter(function (item) {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// События
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	//Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	//работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}
	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}
	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}

//+========================================================================
//Menu
window.onload = function () {
	document.addEventListener("click", documentActions);
	// Actions ( делегирование собитий click)
	function documentActions(e) {
		const targetElement = e.target;
		if (window.innerWidth >= 768 && isMobile.any()) {
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__list li').classList.toggle('_hover');
			}
			if (!targetElement.closest('.menu__list li') && document.querySelectorAll('.menu__list li._hover').length > 0) {
				_removeClasses(document.querySelectorAll('.menu__list li._hover'), "_hover");
			}
		}
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
		} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}
		if (targetElement.classList.contains('header__arrow')) {
			document.querySelector('.profile-form').classList.toggle('_active');
			document.querySelector('.header__arrow').classList.toggle('_active');
		} else if (!targetElement.closest('.profile-form') && document.querySelector('.profile-form._active')) {
			document.querySelector('.profile-form').classList.remove('_active');
			document.querySelector('.header__arrow').classList.remove('_active');
		}
	}
}
// Play
const player = Plyr.setup('.audio-page__player', {
	enabled: true, // Отключение плеера
	controls: [
		// 'play-large', // Большая кнопка воспроизведения в центре
		// 'restart', // Начать воспроизведение заново
		// 'rewind', // Перемотка назад по времени поиска (по умолчанию 10 секунд)
		'play', // Воспроизвести / приостановить воспроизведение
		// 'fast-forward', // Быстрая перемотка вперед по времени поиска (по умолчанию 10 секунд)
		// 'progress', // Индикатор выполнения и ползунок для воспроизведения и буферизации
		// 'current-time', // Текущее время воспроизведения
		// 'duration', // Полная продолжительность СМИ
		'mute', // Отключить звук
		'volume', // Контроль громкости
		// 'captions', // Переключить подписи
		// 'settings', // Меню настроек
		// 'pip', // Картинка в картинке (в настоящее время только в Safari)
		// 'airplay', // Airplay (в настоящее время только Safari)
		// 'download', // Показывать кнопку загрузки со ссылкой либо на текущий источник, либо на настраиваемый URL-адрес, который вы указываете в своих параметрах.
		// 'fullscreen', // Включить полноэкранный режим
	],
	loadSprite: false,
});

const playerVideo = Plyr.setup('.muvi-page__video', {
	enabled: true, // Отключение плеера
	controls: [
		'play-large', // Большая кнопка воспроизведения в центре
		// 'restart', // Начать воспроизведение заново
		// 'rewind', // Перемотка назад по времени поиска (по умолчанию 10 секунд)
		'play', // Воспроизвести / приостановить воспроизведение
		// 'fast-forward', // Быстрая перемотка вперед по времени поиска (по умолчанию 10 секунд)
		'progress', // Индикатор выполнения и ползунок для воспроизведения и буферизации
		// 'current-time', // Текущее время воспроизведения
		// 'duration', // Полная продолжительность СМИ
		'mute', // Отключить звук
		'volume', // Контроль громкости
		// 'captions', // Переключить подписи
		'settings', // Меню настроек
		// 'pip', // Картинка в картинке (в настоящее время только в Safari)
		// 'airplay', // Airplay (в настоящее время только Safari)
		// 'download', // Показывать кнопку загрузки со ссылкой либо на текущий источник, либо на настраиваемый URL-адрес, который вы указываете в своих параметрах.
		'fullscreen', // Включить полноэкранный режим
	],
});


// =============================================
// ============Троеточие== в тексте===============================
Ellipsis({
	ellipsis: '…',
	debounce: 300,
	responsive: true,
	className: '.clamp',
	lines: 1,
	portrait: null,
	break_word: false,
});
// =============================================