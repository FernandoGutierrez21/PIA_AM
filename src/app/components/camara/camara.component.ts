import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';


@Component({
  selector: 'app-camara',
  templateUrl: './camara.component.html',
  styleUrls: ['./camara.component.scss'],
})
export class CamaraComponent implements OnInit {

  constructor(public photoService: PhotoService) { }

  ngOnInit() {}

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

}
