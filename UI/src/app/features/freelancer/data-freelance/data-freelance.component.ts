import { Component, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

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
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }
  model: any = [];
  dtOptions: DataTables.Settings = {};
  dataTable: any;
  editForm: FormGroup = new FormGroup({});
  editUserId: any;
  idData!: number;
  @ViewChild('template') templateRef!: TemplateRef<any>;
  @ViewChild('confirmDelete') confirmDeleteRef!: TemplateRef<any>;
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
        defaultContent: '<a class="btn btn-info edit-user me-2"><i class="fa fa-edit"></i></a><a class="btn btn-danger delete-user" ><i class="fa fa-trash"></i></a>'
      }],
    };

    var _currClassRef = this;

    $(document).on('click', '#datatable-cdn tbody td a', function () {

      var tr: JQuery<HTMLElement> = $(this).closest('tr');
      var row: DataTables.RowMethods = $('#datatable-cdn').DataTable().row(tr);

      this.model = row.data();
      if (this.classList.contains("delete-user")) {
        _currClassRef.confirmDeleteBox(this.model?.id);

      } else if (this.classList.contains("edit-user")) {
        _currClassRef.openModal(this.model);
      }
    })
  }

  Delete(id: number) {
    this.userService.delete(id).subscribe({
      next: response => {
        this.toastr.info("Data successfully delete.");
        $('#datatable-cdn').DataTable().ajax.reload();
        this.modalRef?.hide();
      },
      error: error => {
        this.toastr.error(error);
      }
    })
  }

  modalRef?: BsModalRef;

  confirmDeleteBox(id: number) {
    this.idData = id;
    this.modalRef = this.modalService.show(this.confirmDeleteRef);
  }

  confirm() {
    this.Delete(this.idData);
  }

  decline() {
    this.modalRef?.hide();
  }
  openModal(model: any) {
    this.modalRef = this.modalService.show(this.templateRef);
    this.InitializeForm(model);
  }

  getValue(model: any, y: any) {
    let value = "";
    for (var i = 0; i < model.length; i++) {
      let prop = "";
      y === 1 ? prop = model[i].hobby : prop = model[i].skillName;
      if (i != (model.length - 1)) prop = prop + ",";

      value += prop;
    }

    return value;
  }

  InitializeForm(model: any) {
    this.editForm = this.fb.group({
      username: [model?.username, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: [model?.email, [Validators.email, Validators.required]],
      phoneNumber: [model?.phoneNumber, Validators.required],
      userHobbies: [this.getValue(model?.userHobbies, 1), Validators.required],
      userSkillsets: [this.getValue(model?.userSkillsets, 2), Validators.required],
    })

    this.getId(model?.id);
  }

  getId(id: any) {
    return this.editUserId = id;
  }

  editSubmitForm() {
    let hobby = this.editForm.get('userHobbies')?.value.split(',').map(function (item: any) {
      return { hobby: item };
    });
    let skill = this.editForm.get('userSkillsets')?.value.split(',').map(function (item: any) {
      return { skillName: item };
    });

    this.editForm.get('userHobbies')?.setValue(hobby);
    this.editForm.get('userSkillsets')?.setValue(skill);

    const values = this.editForm.value

    this.userService.edit(this.editUserId, values).subscribe({
      next: response => {
        this.toastr.success("Data successfully edit.");
        this.modalRef?.hide();
        $('#datatable-cdn').DataTable().ajax.reload();
      },
      error: error => {
        this.toastr.error(error);
      }
    })
  }
}
