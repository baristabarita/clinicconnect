import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isModalVisible = false;

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  handleConfirm() {
    // Handle appointment scheduling logic
    alert('Appointment Scheduled!');
    this.closeModal();
  }
}
