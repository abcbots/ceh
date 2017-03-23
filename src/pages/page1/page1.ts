import { Component } from '@angular/core';
import { ImagePicker } from 'ionic-native';
import { Platform } from 'ionic-angular';

declare var window: any;

@Component({
        selector: 'page-page1',
        templateUrl: 'page1.html'
})

export class Page1 {

	imagepicker: any;
	images: any = [];
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

	pick() {

		let options = {
			width: 800,
			height: 600,
			maximumImagesCount: 10
		};

		this.imagepicker.getPictures(options).then( (data)=> {
			for (let i=0;data.length>i;i++) {
				this.images.push(data[i]);
			};
		});

	}

}
