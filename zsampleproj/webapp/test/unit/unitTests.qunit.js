/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"act/fin/ar/zsampleproj/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});