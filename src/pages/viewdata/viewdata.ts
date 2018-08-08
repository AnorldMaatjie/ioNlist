import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddDataPage } from '../add-data/add-data';
import { EditDataPage } from '../edit-data/edit-data';
/**
 * Generated class for the ViewdataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-viewdata',
  templateUrl: 'viewdata.html',
})
export class ViewdataPage {
  classlist: any = [];
  constructor(public navCtrl: NavController,
    private sqlite: SQLite) {}


    ionViewDidLoad() {
      this.getData();
    }
    
    ionViewWillEnter() {
      this.getData();
    }
    
    getData() {
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS classlist(rowid INTEGER PRIMARY KEY, Firstname TEXT, Surname TEXT, type TEXT, Student INT,Address TEXT)', [])
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
        db.executeSql('SELECT * FROM classlist ORDER BY rowid DESC', [])                                 
        .then(res => {
          this.classlist = [];
          for(var i=0; i<res.rows.length; i++) {
            this.classlist.push({rowid:res.rows.item(i).rowid,Firstname:res.rows.item(i).Firstname,Surname:res.rows.item(i).Surname,type:res.rows.item(i).type,Student:res.rows.item(i).Student,Address:res.rows.item(i).Address})
          }
        })
        
      }).catch(e => console.log(e));
    }
    
    addData() {
      this.navCtrl.push(AddDataPage);
    }
    
    editData(rowid) {
      this.navCtrl.push(EditDataPage, {
        rowid:rowid
      });
    }
    
    deleteData(rowid) {
      this.sqlite.create({
        name: 'ionicdb.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM classlist WHERE rowid=?', [rowid])
        .then(res => {
          console.log(res);
          this.getData();
        })
        .catch(e => console.log(e));
      }).catch(e => console.log(e));
    }


}
