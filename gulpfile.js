var gulp        = require('gulp'),
browserSync = require('browser-sync').create(),
sass        = require('gulp-sass');



var config = {
	server: {
		baseDir: "./dist"
	},
//	tunnel: true,
	host: 'localhost',
	port: 3000,
	browser: 'default',
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
		css: 'app/scss/**/*.scss',
		js: 'app/js/**/*.js',
		fonts: 'app/fonts/**/*.*',
		img: 'app/img/**/*.*'
	},
	watch: {
		html: 'app/*.html',
		css: 'app/scss/**/*.scss',
		js: 'app/js/**/*.js',
		fonts: 'app/fonts/**/*.*',
		img: 'app/img/**/*.*'
	}
};


function prod_html() {
	return gulp.src(path.src.html)
			.pipe(gulp.dest(path.build.html));
}
function prod_css() {
	return gulp.src(path.src.css)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest(path.build.css))
}
function prod_js() {
	return gulp.src(path.src.js)
			.pipe(gulp.dest(path.build.js));
}
function prod_fonts() {
	return gulp.src(path.src.fonts)
			.pipe(gulp.dest(path.build.fonts));
}
function prod_img() {
	return gulp.src(path.src.img)
			.pipe(gulp.dest(path.build.img));
}

function start_server() {
	browserSync.init(config);

	prod_html();
	prod_css();
	prod_js();
	prod_fonts();
	prod_img();

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