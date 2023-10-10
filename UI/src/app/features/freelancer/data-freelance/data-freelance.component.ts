import { Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-data-freelance',
  templateUrl: './data-freelance.component.html',
  styleUrls: ['./data-freelance.component.css']
})
export class DataFreelanceComponent implements OnInit {
  constructor(private userService: UserService,
     private renderer: Renderer2,
     private router: Router, 
     private fb: FormBuilder,
     private modalService: BsModalService
     ) { }
  model: any = [];
  dtOptions: DataTables.Settings = {};
  dataTable: any;
  editForm: FormGroup =new FormGroup({});
  editUserId: any;
  @ViewChild('template')
  templateRef!: TemplateRef<any>;
  ngOnInit(): void {
    this.dtOptions = {
      ordering: false,

      ajax: (dataTablesParameters: any, callback) => {
        this.userService
          .GetAllUser()
          .subscribe(resp => {
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp
            });
          });
      },
      rowCallback: (row: Node, data: any[] | object, dataIndex: number) => {
        row.childNodes[0].textContent = String(dataIndex + 1);
      },
      columns: [{
        title: '#',
        data: null
      }, {
        title: 'Username',
        data: 'username'
      }, {
        title: 'Email',
        data: 'email'
      }, {
        title: 'Phone No.',
        data: 'phoneNumber'
      }, {
        title: 'Hobbies',
        data: 'userHobbies[, ].hobby'
      }, {
        title: 'Skills',
        data: 'userSkillsets[, ].skillName'
      }, {
        title: 'Action',
        defaultContent: '<a class="btn btn-info edit-user">Edit</a><a class="btn btn-danger delete-user" >Delete</a>'
      }],
    };

    var _currClassRef = this;

    $(document).on('click', '#datatable-cdn tbody td a', function () {

      var tr: JQuery<HTMLElement> = $(this).closest('tr');
      var row: DataTables.RowMethods = $('#datatable-cdn').DataTable().row(tr);

      this.model = row.data();
      if (this.classList.contains("delete-user")) {
  
        _currClassRef.Delete(this.model?.id);
        
      }else if(this.classList.contains("edit-user")){
        _currClassRef.openModal(this.model);
      }
    })
  }

  Delete(id: any) {
    console.log(id);
    this.userService.delete(id).subscribe({
      next: response => {
        console.log("Record Deleted!");
        window.location.reload();
      },
      error: error => {
        console.log(error);
      }
    })
  }

  modalRef?: BsModalRef;
  
 
  openModal(model: any) {
    this.modalRef = this.modalService.show(this.templateRef);
    this.InitializeForm(model);
  }

  getValue(model: any, y: any){
    let value = "";
    for(var i = 0; i < model.length; i++)
    {
      y === 1 ? value = model[i].hobby : value = model[i].skillName;
      if(i != (model.length - 1) ) value += ",";     
    }

    return value;
  }
  
  InitializeForm(model: any){
    this.editForm = this.fb.group({
      username: [model?.username, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: [model?.email,[ Validators.email, Validators.required]],
      phoneNumber: [model?.phoneNumber, Validators.required],
      userHobbies: [this.getValue(model?.userHobbies, 1),Validators.required],
      userSkillsets: [this.getValue(model?.userSkillsets, 2), Validators.required],
    })

    this.getId(model?.id);
  }

  getId(id: any)
  {
    return this.editUserId = id;
  }

  editSubmitForm(){
    let hobby = this.editForm.get('userHobbies')?.value.split(',').map(function(item:any){
      return { hobby: item};
    });
    let skill = this.editForm.get('userSkillsets')?.value.split(',').map(function(item:any){
      return { skillName: item};
    });

    this.editForm.get('userHobbies')?.setValue(hobby);
    this.editForm.get('userSkillsets')?.setValue(skill);

    const values = this.editForm.value

    this.userService.edit(this.editUserId, values).subscribe({
      next: response => {
        console.log("registered!");
        window.location.reload();
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
