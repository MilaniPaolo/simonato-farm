import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Injectable()
export class CameraService {

  constructor(private camera: Camera,
              private imagePicker: ImagePicker) { }

  takePicture(): Promise<any>  {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    return this.camera.getPicture(options);
  }

  pickPicture(): Promise<any> {
    const options = {
      maximumImagesCount: 1,
      outputType: 1
    };
    return this.imagePicker.getPictures(options);
  }
}
