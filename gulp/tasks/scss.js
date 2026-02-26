import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие css файла
import webpcss from 'gulp-webpcss'; // Вивод WEBP изображений
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорних префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; //Групировка медиа запросов



const sass = gulpSass(dartSass)

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(sass({
			outputStyle: 'expanded'
		}))

		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				autoprefixer({
					grid: true,
					overrideBrowserslist: ["last 3 versions"],
					cascade: true
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpcss(
					{
						webpClass: "._webp",
						noWebpClass: "._no-webp"
					}
				)
			)
		)
		// Настройка вигрузит 2 файла css----
		.pipe(app.gulp.dest(app.path.build.css))
		//------
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				rename({
					extname: '.min.css'
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				app.gulp.dest(app.path.build.css)
			)
		)
		.pipe(app.plugins.browsersync.stream());
}