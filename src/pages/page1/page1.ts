import { Component } from '@angular/core';
import { ImagePicker } from 'ionic-native';
import { NavController } from 'ionic-angular';

@Component({
        selector: 'page-page1',
        templateUrl: 'page1.html'
})

export class Page1 {

	imagepicker: any;
	images: any = [];

	constructor(
		public navCtrl: NavController
	) {
		this.imagepicker = ImagePicker;
        }

	add() {
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
