import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
   
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
   
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
   
  constructor(private toastr: ToastrService,
    private router: Router) { }
   
  showSuccess(message, title){
      this.toastr.success(message, title)
  }
   
  showError(message, title){
      this.toastr.error(message, title)
  }

  showErrorGeneric(message, title){
    this.toastr.error(message, title)
}
   
  showInfo(message, title){
      this.toastr.info(message, title)
  }
   
  showWarning(message, title){
      this.toastr.warning(message, title)
  }

  swalAlertMessage(title, text, type) {
    Swal.fire({
      title: title,
      icon: 'info',
      html: text,
    })
    // Swal.fire({
    //   title: title,
    //   text: text,
    //   type: type,
    //   confirmButtonText: 'Ok',
    //   customClass: 'sweet-alert',
    //   allowOutsideClick: false
    // });
  }

  sweetAlertWithConfirm(title, text, type, url) {
    Swal.fire({
      title: 'title',
      icon: 'info',
      html: text,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl(`/${url}`);
      }
    })
  }


   
}