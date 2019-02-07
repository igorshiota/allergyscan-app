import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import {
  NavController,
  NavParams,
  ActionSheetController,
  LoadingController,
  AlertController
} from "ionic-angular";
import { Camera } from "@ionic-native/camera";

import { Item } from "../../models/item.model";
import items from "../../data/items";

import { ItemsService } from "../../services/items.service";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  itemList: Item[];
  founded = [];
  imageUrl = "";
  OCRAD: any;

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private itemsService: ItemsService,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    //this.itemList = items;
    //console.log(this.itemList);
  }

  ionViewEnter() {
    this.loadItems();
  }

  private loadItems() {
    this.itemList = this.itemsService.getItems();
  }

  onAddItem(form: NgForm) {
    this.itemsService.addItem(form.value.itemName);
    form.reset();
    this.loadItems();
  }

  onRemoveItem(index: number) {
    this.itemsService.removeItem(index);
    this.loadItems();
  }

  onEmptyList() {
    this.itemsService.removeAllItems();
  }

  //Below is the code related to the camera/scan part

  onShowActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Choose Photo",
          handler: () => {
            this.onScan(0); // 0 == Library
          }
        },
        {
          text: "Take Photo",
          handler: () => {
            this.onScan(1); // 1 == Camera
          }
        },
        {
          text: "Demo Photo",
          handler: () => {
            this.imageUrl = "assets/imgs/demo2.jpg";
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  onScan(sourceType: number) {
    // You can check the values here:
    // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
    this.camera
      .getPicture({
        quality: 100,
        destinationType: 0, // DATA_URL
        sourceType,
        allowEdit: true,
        saveToPhotoAlbum: false,
        correctOrientation: false
      })
      .then(
        imageData => {
          this.imageUrl = `data:image/jpeg;base64,${imageData}`;
        },
        err => {
          console.log(`ERROR -> ${JSON.stringify(err)}`);
        }
      );
  }

  onAnalyzeImage() {
    let found = false;
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    (<any>window).OCRAD(document.getElementById("image"), text => {
      loader.dismissAll();
      let alert = this.alertCtrl.create({
        title: "Label: ",
        subTitle: text,
        buttons: ["Dismiss"]
      });
      alert.present();
      console.log(text);
      for (const item of this.itemList) {
        if (text.indexOf(item.name) >= 0) {
          found = true;
          break;
        }
      }

      if (found) {
        this.presentAlertNotSafe();
      } else if (this.itemList.length <= 0) {
        this.presentAlertAddItem();
      } else {
        this.presentAlertSafe();
      }
    });
  }

  onRestart() {
    this.imageUrl = "";
    this.onShowActionSheet();
  }

  // Alerts

  presentAlertNotSafe() {
    let alert = this.alertCtrl.create({
      title: "Product not safe!",
      subTitle: "This product contains the ingredient(s) listed!",
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  presentAlertSafe() {
    let alert = this.alertCtrl.create({
      title: "This Product is Safe!",
      subTitle:
        "Wohoo! This product does not contain any of the ingredients listed!",
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  presentAlertAddItem() {
    let alert = this.alertCtrl.create({
      title: "No Items were added!",
      subTitle: "Please add an item to the list!",
      buttons: ["Dismiss"]
    });
    alert.present();
  }
}
/* INITIAL STUDY FUNCTION

  onScan(){
  	this.camera.getPicture({
  		encodingType: this.camera.EncodingType.JPEG,
  		correctOrientation: true
  	})
  		.then(
  			imageData => {
  				this.imageUrl = imageData;
  			})
  		.catch(
  			err => {
  				console.log(err)
  			}
  			);
  }
  

} */
