/************************************************************

https://github.com/SuyashMShepHertz/indexedDB_sample

************************************************************/

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

declare var window: any;

@Component({
        selector: 'page-page1',
        templateUrl: 'page1.html'
})

export class Page1 {

	db: any;
	rollNo: any;
	name: any;
	date: any;
	indexedDB: any;

	constructor(
		public platform: Platform
	) {
		this.platform.ready().then( ()=> {
			if (window.cordova) {
				console.log("window.cordova");
			} else  {
				this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
				console.log("this.indexedDB");
				let request;
				if (!this.indexedDB) {
					console.log("Your Browser does not support IndexedDB");
				} else {
					request = this.indexedDB.open("testDB");
					request.onerror = (event)=> {
						console.log("Error opening DB", event);
					};
					request.onsuccess = (event)=> {
						console.log("Success opening DB");
						this.db = event.target.result;
					};
					request.onupgradeneeded = (event)=> {
						console.log("Upgrading");
						this.db = event.target.result;
						this.db.createObjectStore("students", { keyPath : "rollNo" });
					};
				};
			};
		});
        }

	add() {
		let rollNo = this.rollNo;
		let name = this.name;
		let date = this.date;
		let transaction = this.db.transaction(["students"],"readwrite");

		transaction.oncomplete = (event)=> {
			console.log("Success :)");
			alert("Add : Success");
		};

		transaction.onerror = (event)=> {
			console.log("Error :(");
			alert("Add : Error");
		};  

		let objectStore = transaction.objectStore("students");
		objectStore.add({rollNo: rollNo, name: name, date: date});
	}


	remove() {
		let db = this.db;
		let name = this.name;
		let rollNo = this.rollNo;
		db.transaction(["students"],"readwrite").objectStore("students").delete(rollNo);
	}

	get() {
		let db = this.db;
		let name = this.name;
		let rollNo = this.rollNo;
		let request = db.transaction(["students"],"readwrite").objectStore("students").get(rollNo);
		request.onsuccess = ()=> {
			this.name = request.result.name;
		};
	}

	update() {
		let db = this.db;
		let name = this.name;
		let rollNo = this.rollNo;
		let transaction = db.transaction(["students"],"readwrite");
		let objectStore = transaction.objectStore("students");
		let request = objectStore.get(rollNo);
		request.onsuccess = ()=> {
			request.result.name = name;
			objectStore.put(request.result);
		};
	}

	sqlCreateTasks() {
		let sql = "CREATE TABLE IF NOT EXISTS tasks (";
		sql += "task_id integer not null primary key autoincrement";
		sql += ", ";
		sql += "task_name varchar(100)";
		sql += " )";
		return sql;
	}

}
