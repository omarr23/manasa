import { ref, computed } from "vue"; // Import the ref function from the Vue Composition API

  /* Thats the interface import for Entity */
import type { user } from "./user";
import type { businessUnit } from "./businessUnit";



      /* Thats the interface Export for Entity */
export interface student {
  id: number,
  username: string,
  email: string,
  image: string,
  blocked: boolean,
  phone: string,
  createdAt: Date,
  modifiedAt: Date,
  owner: user,
  businessUnit: businessUnit,
  createdBy: user,
  modifiedBy: user,
  studentuser: user,
}


  /* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "Username",
    columnLabel: "username",
    type:"string"
  },
  {
    columnName: "Email",
    columnLabel: "email",
    type:"email"
  },
  {
    columnName: "Image",
    columnLabel: "image",
    type:"image"
  },
  {
    columnName: "Blocked",
    columnLabel: "blocked",
    type:"boolean"
  },
  {
    columnName: "Phone",
    columnLabel: "phone",
    type:"string"
  },
  {
    columnName: "CreatedAt",
    columnLabel: "createdAt",
    type:"createdAt"
  },
  {
    columnName: "ModifiedAt",
    columnLabel: "modifiedAt",
    type:"modifiedAt"
  },

    {
    columnName: "Status",
    columnLabel: "status",
    type: "boolean",
  },



  /* It's gonna be static, so you can use it as a constant for all table so we can use the dropdown actions */
  {
    columnName: "Actions",
    columnLabel: "actions",
  },
];

 /* Thats the formFields Export to create dynamic inputs */
export const formData = ref({
    username: null,
    email: null,
    image: null,
    blocked: false,
    phone: null,
    createdAt: null,
    modifiedAt: null,
status: false,
    ownerId: null,
    businessUnitId: null,
    createdById: null,
    modifiedById: null,
    studentuserId: null,
});


  /* Thats the formFields Export to create dynamic inputs */
export const defaultFormFields =computed(() => {
  return [
  {
    name: "ownerId",
    defaultValue: "{{session.user.id}}",
  },
  {
    name: "businessUnitId",
    defaultValue: "{{session.user.businessUnitId}}",
  },
  ];
});

export const formFields =ref(
   [
 {
    label: "username",
    name: "username",
    order: 1,
    placeholder: "Enter Username",
    attributeType: "Input",
    display: {
      create: true,
      list: true,
      view: true,
      edit: true,
    },
    allowedExtensions: [
    ],
    options: [
    ],

    isHidden: false,

    rules: [],
  },
 {
    label: "email",
    name: "email",
    order: 1,
    placeholder: "Enter Email",
    attributeType: "Input",
    display: {
      create: true,
      list: true,
      view: true,
      edit: true,
    },
    allowedExtensions: [
    ],
    options: [
    ],

    isHidden: false,

    rules: [{"required":true},{"type":"email"}],
  },
 {
    label: "image",
    name: "image",
    order: 1,
    placeholder: "Enter image",
    attributeType: "ImageUploader",
    display: {
      create: true,
      list: true,
      view: true,
      edit: true,
    },
    allowedExtensions: [
        "image/jpeg",
        "image/png",
        "image/jpg",
    ],
    options: [
    ],

    isHidden: false,

    rules: [],
  },
 {
    label: "blocked",
    name: "blocked",
    order: 3,
    placeholder: "Enter Blocked",
    attributeType: "Checkbox",
    display: {
      create: true,
      list: true,
      view: true,
      edit: true,
    },
    allowedExtensions: [
    ],
    options: [
    ],

    isHidden: false,

    rules: [],
  },
 {
    label: "phone",
    name: "phone",
    order: 1,
    placeholder: "Enter Phone",
    attributeType: "Input",
    display: {
      create: true,
      list: true,
      view: true,
      edit: true,
    },
    allowedExtensions: [
    ],
    options: [
    ],

    isHidden: false,

    rules: [{"required":true}],
  },
 {
    label: "createdAt",
    name: "createdAt",
    order: 1,
    placeholder: "Enter createdAt",
    attributeType: "",
    display: {
      create: false,
      list: true,
      view: true,
      edit: false,
    },
    allowedExtensions: [
    ],
    options: [
    ],

    isHidden: false,

    rules: [],
  },
 {
    label: "modifiedAt",
    name: "modifiedAt",
    order: 1,
    placeholder: "Enter modifiedAt",
    attributeType: "",
    display: {
      create: false,
      list: true,
      view: true,
      edit: false,
    },
    allowedExtensions: [
    ],
    options: [
    ],

    isHidden: false,

    rules: [],
  },
  {
      label: "status",
      name: "status",
      order: 1,
      placeholder: "Enter Active",
      attributeType: "Radio",
      display: {
        create: true,
        list: true,
        view: true,
        edit: true,
      },
      isHidden: false,
      allowedExtensions: [],
      options: ["ACTIVE", "SUSPENDED"],
      rules: [],
      disabled: false,

    },


  {
    label: "user",
    order: 1,
    name: "ownerId",
    placeholder: "Enter owner",
    attributeType: "HasOneRelation",
    displayName:"email",
    relationName: "owner",
    rules: [{"required":true}],
    defaultValue: "{{session.user.id}}",
    isHidden: true,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "businessUnit",
    order: 1,
    name: "businessUnitId",
    placeholder: "Enter businessUnit",
    attributeType: "HasOneRelation",
    displayName:"code",
    relationName: "businessUnit",
    rules: [],
    defaultValue: "{{session.user.businessUnitId}}",
    isHidden: true,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "user",
    order: 1,
    name: "createdById",
    placeholder: "Enter createdBy",
    attributeType: "HasOneRelation",
    displayName:"email",
    relationName: "createdBy",
    rules: [],
    isHidden: true,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "user",
    order: 1,
    name: "modifiedById",
    placeholder: "Enter modifiedBy",
    attributeType: "HasOneRelation",
    displayName:"email",
    relationName: "modifiedBy",
    rules: [],
    isHidden: true,
    isDisable: false,
    constrains:[
    ],
  },



  {
    label: "user",
    order: 1,
    name: "studentuserId",
    placeholder: "Enter studentuser",
    attributeType: "HasOneRelation",
    displayName:"email",
    relationName: "studentuser",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },





  ].sort((a, b) => a.order - b.order)
);

export const relations={
  result:{
    id:"Student_resultm9fdahhjk",
    type:"hasMany",
    model:"result",
    displayName:"Total",
    formKey:"resultStudentId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 
  homework:{
    id:"Student_Homework1vc2qrf9",
    type:"hasMany",
    model:"homework",
    displayName:"Title",
    formKey:"homeworkStudentId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 
  attendance:{
    id:"Student_attendance6g6fkpik",
    type:"hasMany",
    model:"attendance",
    displayName:"attended",
    formKey:"attendanceStudentId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 
  subscription:{
    id:"subscription_Studentenisxokb",
    type:"hasMany",
    model:"subscription",
    displayName:"Phone",
    formKey:"subscriptionStudentId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 

  examRelation:{ "model": "student",
    "relationName": "students",
    "relationCollection": "exam",
    "relationModel": "exams",
    "relationKey": "studentExamId",
    "relationKeyFilter":"examStudentId",
    "relationId": "id",
    "searchable": true,
   type:"hasMany",
     pivot: true,
       id:"ExamsOnStudents_Studentok08kv1x",
    },
}

export const withArray= [
      "owner",
      "businessUnit",
      "createdBy",
      "modifiedBy",
      "studentuser",
     ];

export const filterFields = computed(() => {
  return [ 
    {
       attributeType: "Input",
       order: 1,       label: "username",
       name: "username",
       type: 'contains',
       placeholder: "Enter Username",
     },
    {
       attributeType: "Input",
       order: 1,       label: "email",
       name: "email",
       type: 'contains',
       placeholder: "Enter Email",
     },
    {
       attributeType: "Checkbox",
       order: 3,       label: "blocked",
       name: "blocked",
       type: 'boolean',
       op: 'is',
       key:"blocked",
       placeholder: "Enter Blocked",
     },
    {
       attributeType: "Input",
       order: 1,       label: "phone",
       name: "phone",
       type: 'contains',
       placeholder: "Enter Phone",
     },
]
})
export const filterFormData = ref({
        username: null,
        email: null,
        blocked: false,
        phone: null,

 })
