var Settings = (function(){
	var me = {};

	me.readSettings = function(){

		setDefaults();

		var settings = Storage.get("bassoonTrackerSettings");

		if (!settings) return;

		try {
			settings = JSON.parse(settings);
		} catch (e) {
			return false;
		}

		for (var key in settings){
			if (SETTINGS.hasOwnProperty(key) && settings.hasOwnProperty(key)){
				SETTINGS[key] = settings[key];
			}
		}

		if (SETTINGS.playBackEngine && SETTINGS.playBackEngine<3){
			Tracker.playBackEngine = SETTINGS.playBackEngine;
		}
	};

	me.saveSettings = function(){
		var settings = {
			playBackEngine: SETTINGS.playBackEngine,
			keyboardTable: SETTINGS.keyboardTable
		};
		Storage.set("bassoonTrackerSettings",JSON.stringify(settings));
	};

	me.reset = function(){
		// reset default Settings;
		setDefaults();
		me.saveSettings();
	};

	function setDefaults(){
		SETTINGS.keyboardTable = "qwerty";
		SETTINGS.playBackEngine = PLAYBACKENGINE.SIMPLE;
	}

	return me;
})();