import fileinclude from "gulp-file-include";
import rename from 'gulp-rename';
import terser from 'gulp-terser';
export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemap: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(fileinclude())
		// Настройка вигрузит 2 файла js----
		.pipe(app.gulp.dest(app.path.build.js))
		//------
		.pipe(
			app.plugins.if(
				app.isBuild,
				terser()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				rename({
					extname: '.min.js'
				})
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				app.gulp.dest(app.path.build.js)
			)
		)
		.pipe(app.plugins.browsersync.stream());
}