// Импортируем модули
import notify from "gulp-notify";
import newer from "gulp-newer";
import plumber from "gulp-plumber";
import ifPlugin from "gulp-if";
// import prettier from "gulp-prettier";
// import rename from 'gulp-rename';
import replace from 'gulp-replace';
import browsersync from 'browser-sync';
// Экспортируем объект
export const plugins = {
	replace: replace,
	plumber: plumber,
	notify: notify,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
}