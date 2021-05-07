const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

exports.default = () => (
	gulp.src('./raw_images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./public/images'))
);