var gulp = require("gulp");
var reactify = require("reactify");
var notify = require("gulp-notify");
var sass = require("gulp-sass");
var cssShrink = require("gulp-cssshrink");
var uglify = require("gulp-uglify");
var browsersync = require("browser-sync").create();
var rename = require("gulp-rename");
var webpack = require("webpack");
var gutil = require("gulp-util");

var environment = "dev";

var errorHandler = function (e) {
    "use strict";

    console.log(e);
    notify("ops!");
    this.emit("end");
};

gulp.task("webpack", function (callback) {
    "use strict";

    //@todo not working right
    webpack(require("./webpack.config.js"), function (err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build", err);
        }
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
    });
});

gulp.task("browsersync", function () {
    "use strict";

    browsersync.init({
        server: "./",
        host: "0.0.0.0",
        open: false
    });

    gulp.watch([
        "example.html",
        "example.jsx",
        "dist/*.js"
    ]).on("change", browsersync.reload);

    gulp.watch([
        "example.css"
    ]).on("change", browsersync.reload.bind(null, "example.css"));
});

gulp.task("sass", function () {
    "use strict";

    var bundle = gulp.src([
        "./src/SuperSelect.scss"
    ])
    .pipe(sass())
    .on("error", errorHandler)
    .pipe(rename("SuperSelect.css"))
    .pipe(gulp.dest("./dist"));

    return bundle;
});

gulp.task("css", ["sass"], function () {
    "use strict";

    var bundle = gulp.src([
        "dist/SuperSelect.css"
    ]);

    if (environment === "prod") {
        bundle.pipe(cssShrink());
    }

    bundle.pipe(gulp.dest("./dist"))
    .pipe(browsersync.stream());

    return bundle;
});

gulp.task("dev", ["css", "webpack", "browsersync"], function () {
    "use strict";

    gulp.watch(["src/*.js", "src/*.jsx"], ["webpack"]);
    gulp.watch("src/*.scss", ["css"]);
});

gulp.task("setProduction", function () {
    "use strict";

    process.env.NODE_ENV = "production";
    environment = "prod";
});

gulp.task("default", ["setProduction", "css", "webpack"]);
