import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { NgxSelectModule } from 'ngx-select-ex';

@Component({
  selector: 'app-pin-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxSelectModule, FileUploadModule],
  templateUrl: './pin-form.component.html',
  styleUrls: ['./pin-form.component.scss']
})
export class PinFormComponent {
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  response = '';
  pinForm: FormGroup;
  collaboratorsList = [];
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    // Initialize the FileUploader with FormData
    this.uploader = new FileUploader({
      url: 'YOUR_UPLOAD_ENDPOINT', // Replace with your backend endpoint
      disableMultipart: false, // Set to true for custom form data handling
      autoUpload: false,
    });

    this.uploader.response.subscribe(res => this.response = res);

    // Fetch collaborators from localStorage
    const collaborators = localStorage.getItem('customers');
    this.collaboratorsList = collaborators
      ? JSON.parse(collaborators).map((item: any) => item.name)
      : [];

    // Initialize form group
    this.pinForm = this.fb.group({
      title: ['', Validators.required],
      image: [null, Validators.required], // Store Base64 image here
      collaborators: [[], Validators.required],
      privacy: ['public', Validators.required],
    });
  }

  public fileOverBase(e: boolean): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileDrop(event: any) {
    const file = event[0];
    this.convertFileToBase64(file).then((base64: string | ArrayBuffer | null) => {
      this.imagePreview = base64; // Set preview for display
      this.pinForm.patchValue({ image: base64 }); // Store Base64 image in form control
    });
  }

  private convertFileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  onSubmit() {
    if (this.pinForm.valid) {
      // Save pin data including Base64 image to localStorage
      const pins = JSON.parse(localStorage.getItem('pins') || '[]');
      pins.push(this.pinForm.value);
      localStorage.setItem('pins', JSON.stringify(pins));

      alert('Pin added successfully!');
    }
  }
}
