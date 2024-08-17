import { ref, computed } from "vue"; // Import the ref function from the Vue Composition API

  /* Thats the interface import for Entity */
import type { businessUnit } from "./businessUnit";



      /* Thats the interface Export for Entity */
export interface user {
  id: string,
  email: string,
  password: string,
  role: string,
  provider: string,
  createdAt: Date,
  modifiedAt: Date,
  userBusinessUnit: businessUnit,
  createdBy: user,
  modifiedBy: user,
}


  /* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "Email",
    columnLabel: "email",
    type:"email"
  },
  {
    columnName: "Password",
    columnLabel: "password",
    type:"password"
  },
  {
    columnName: "Role",
    columnLabel: "role",
    type:"role"
  },
  {
    columnName: "Provider",
    columnLabel: "provider",
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
    email: null,
    password: null,
    role: null,
    provider: null,
    createdAt: null,
    modifiedAt: null,
status: false,
    businessUnitId: null,
    createdById: null,
    modifiedById: null,
});


  /* Thats the formFields Export to create dynamic inputs */
export const defaultFormFields =computed(() => {
  return [
  ];
});

export const formFields =ref(
   [
 {
    label: "email",
    name: "email",
    order: 1,
    placeholder: "Enter email",
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
    label: "password",
    name: "password",
    order: 1,
    placeholder: "Enter password",
    attributeType: "InputPassword",
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

    max:32,


    min:10,
    rules: [{"required":true}],
  },
 {
    label: "role",
    name: "role",
    order: 1,
    placeholder: "Enter role",
    attributeType: "UserRole",
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
    label: "provider",
    name: "provider",
    order: 1,
    placeholder: "Enter provider",
    attributeType: "Input",
    display: {
    },
    allowedExtensions: [
    ],
    options: [
    ],

    isHidden: false,

    rules: [],
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
    label: "businessUnit",
    order: 1,
    name: "businessUnitId",
    placeholder: "Enter userBusinessUnit",
    attributeType: "HasOneRelation",
    displayName:"code",
    relationName: "userBusinessUnit",
    rules: [],
    isHidden: false,
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








































  ].sort((a, b) => a.order - b.order)
);

export const relations={
  user:{
    id:"userCreator81ix49d",
    type:"hasMany",
    model:"user",
    displayName:"",
    formKey:"createdById",
    fillable: true, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  businessUnit:{
    id:"userCreatorahwb2bjv",
    type:"hasMany",
    model:"businessUnit",
    displayName:"",
    formKey:"createdById",
    fillable: true, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  center:{
    id:"Center_user1teg10e",
    type:"hasMany",
    model:"center",
    displayName:"id",
    formKey:"ownerId",
    fillable: false, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  teacher:{
    id:"Teacher_usercpl2ig3t",
    type:"hasMany",
    model:"teacher",
    displayName:"id",
    formKey:"ownerId",
    fillable: false, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  level:{
    id:"Level_usercacvji3",
    type:"hasMany",
    model:"level",
    displayName:"id",
    formKey:"ownerId",
    fillable: false, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  video:{
    id:"Video_userhcbe4rac",
    type:"hasMany",
    model:"video",
    displayName:"id",
    formKey:"ownerId",
    fillable: false, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  student:{
    id:"Student_userv978977",
    type:"hasMany",
    model:"student",
    displayName:"id",
    formKey:"ownerId",
    fillable: false, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  result:{
    id:"result_useryx8jokoi",
    type:"hasMany",
    model:"result",
    displayName:"id",
    formKey:"ownerId",
    fillable: false, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  homework:{
    id:"Homework_usery4zqt559",
    type:"hasMany",
    model:"homework",
    displayName:"id",
    formKey:"ownerId",
    fillable: false, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  attendance:{
    id:"attendance_userd04sml7",
    type:"hasMany",
    model:"attendance",
    displayName:"id",
    formKey:"ownerId",
    fillable: false, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  subscription:{
    id:"subscription_user6mg1ys",
    type:"hasMany",
    model:"subscription",
    displayName:"id",
    formKey:"ownerId",
    fillable: false, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  exam:{
    id:"Exam_usera8682efh",
    type:"hasMany",
    model:"exam",
    displayName:"id",
    formKey:"ownerId",
    fillable: false, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  submissions:{
    id:"submissions_user0czu8xa",
    type:"hasMany",
    model:"submissions",
    displayName:"id",
    formKey:"ownerId",
    fillable: false, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 

}

export const withArray= [
      "userBusinessUnit",
      "createdBy",
      "modifiedBy",
     ];

export const filterFields = computed(() => {
  return [ 
    {
       attributeType: "Input",
       order: 1,       label: "email",
       name: "email",
       type: 'contains',
       placeholder: "Enter email",
     },
    {
       attributeType: "Input",
       order: 1,       label: "provider",
       name: "provider",
       type: 'contains',
       placeholder: "Enter provider",
     },
]
})
export const filterFormData = ref({
        email: null,
        provider: null,

 })
