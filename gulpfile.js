var gulp        = require('gulp'),
browserSync = require('browser-sync').create(),
sass        = require('gulp-sass');



var config = {
	server: {
		baseDir: "./dist"
	},
	tunnel: true,
	host: 'localhost',
	port: 3000,
	browser: 'opera',
	logPrefix: "frontend_2k19"
};

var path = {
	build: {
		html: 'dist/',
		css: 'dist/css/',
		js: 'dist/js/',
		fonts: 'dist/fonts/',
		img: 'dist/img/'
	},
	src: {
		html: 'app/*.html',
		css: 'app/sass/**/*.scss',
		js: 'app/js/**/*.js',
		fonts: 'app/fonts/**/*.*',
		img: 'app/img/**/*.*'
	},
	watch: {
		html: 'app/*.html',
		css: 'app/sass/**/*.scss',
		js: 'app/js/**/*.js',
		fonts: 'app/fonts/**/*.*',
		img: 'app/img/**/*.*'
	}
};



function start_server() {
	browserSync.init(config);

	gulp.watch(path.watch.html).on("change", function() {
		return gulp.src(path.src.html)
		.pipe(gulp.dest(path.build.html))
		.pipe(browserSync.reload({stream:true}));
	});

	gulp.watch(path.src.css, function() {
		return gulp.src(path.src.css)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest(path.build.css))
		.pipe(browserSync.stream());
	});

	gulp.watch(path.watch.img, function() {
		return gulp.src(path.src.img)
		.pipe(gulp.dest(path.build.img))
		.pipe(browserSync.reload({stream: true}));
	});

	gulp.watch(path.watch.fonts, function() {
		return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts));
	});

	gulp.watch(path.watch.js, function() {
		return gulp.src(path.src.js)
		.pipe(gulp.dest(path.build.js))
		.pipe(browserSync.reload({stream:true}));
	});
}

exports.default = start_server;