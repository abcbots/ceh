import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

declare var window: any;

@Component({
        selector: 'page-page1',
        templateUrl: 'page1.html'
})

export class Page1 {

	db: any;

	constructor(
		public platform: Platform
	) {
		this.imagepicker = ImagePicker;
		if (window.cordova) {
			this.imagepicker = ImagePicker;
		} else {
			if (window.openDatabase)
				this.db = window.openDatabase;
			};
		};
        }

}
