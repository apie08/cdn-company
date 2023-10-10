import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-add-freelance',
  templateUrl: './add-freelance.component.html',
  styleUrls: ['./add-freelance.component.css']
})

export class AddFreelanceComponent {
  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private router: Router,
    private toastr: ToastrService){}
  model: any = {};
  addForm: FormGroup =new FormGroup({});

  ngOnInit() : void{
    this.InitiliazeForm();
  } 
  

  InitiliazeForm(){
    this.addForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['',[ Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[- +()0-9]{10,12}')]],
      userHobbies: ['',Validators.required],
      userSkillsets: ['', Validators.required],
    })
  }

  submitForm(){
    let hobby = this.addForm.get('userHobbies')?.value.split(',').map(function(item:any){
      return { hobby: item};
    });
    let skill = this.addForm.get('userSkillsets')?.value.split(',').map(function(item:any){
      return { skillName: item};
    });

    this.addForm.get('userHobbies')?.setValue(hobby);
    this.addForm.get('userSkillsets')?.setValue(skill);

    const values = this.addForm.value

    this.userService.register(values).subscribe({
      next: response => {
          this.toastr.success("Successfully save!");
          $('#datatable-cdn').DataTable().ajax.reload();
          this.addForm.reset();
      },
      error: error => {
        this.toastr.error(error);
      }
    })
  }

  reloadPage(){
    window.location.reload()
  }
}
