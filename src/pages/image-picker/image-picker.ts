import { Component } from '@angular/core';
import { ImagePicker } from 'ionic-native';
import { Platform } from 'ionic-angular';

/*
        Generated class for the ImagePicker page.

        See http://ionicframework.com/docs/v2/components/#navigation for more info on
        Ionic pages and navigation.
*/

@Component({
        selector: 'page-image-picker',
        templateUrl: 'image-picker.html'
})

export class ImagePickerPage {

	imagepicker: any;
	images: any = [];

	constructor(
		public platform: Platform
	) {
		this.imagepicker = ImagePicker;
		if (window.cordova) {
			this.imagepicker = ImagePicker;
		} else {
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

        ionViewDidLoad() {
                console.log('ionViewDidLoad ImagePickerPage');
        }

}
