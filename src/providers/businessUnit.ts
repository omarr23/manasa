import { ref, computed } from "vue"; // Import the ref function from the Vue Composition API

  /* Thats the interface import for Entity */



      /* Thats the interface Export for Entity */
export interface businessUnit {
  id: string,
  code: string,
  name: string,
  createdAt: Date,
  modifiedAt: Date,
  parent: businessUnit,
  createdBy: user,
  modifiedBy: user,
}


  /* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "Code",
    columnLabel: "code",
    type:"string"
  },
  {
    columnName: "Name",
    columnLabel: "name",
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




  /* It's gonna be static, so you can use it as a constant for all table so we can use the dropdown actions */
  {
    columnName: "Actions",
    columnLabel: "actions",
  },
];

 /* Thats the formFields Export to create dynamic inputs */
export const formData = ref({
    code: null,
    name: null,
    createdAt: null,
    modifiedAt: null,
    parentId: null,
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
    label: "code",
    name: "code",
    order: 1,
    placeholder: "Enter code",
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
    label: "name",
    name: "name",
    order: 1,
    placeholder: "Enter name",
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
    label: "businessUnit",
    order: 1,
    name: "parentId",
    placeholder: "Enter parent",
    attributeType: "HasOneRelation",
    displayName:"code",
    relationName: "parent",
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
    id:"userbusinessUnitshlnn05",
    type:"hasMany",
    model:"user",
    displayName:"",
    formKey:"businessUnitId",
    fillable: true, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  businessUnit:{
    id:"businessUnitParentq2k67me",
    type:"hasMany",
    model:"businessUnit",
    displayName:"code",
    formKey:"parentId",
    fillable: true, 
    required: true,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  center:{
    id:"Center_businessUnit7x0r81lc",
    type:"hasMany",
    model:"center",
    displayName:"id",
    formKey:"businessUnitId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  teacher:{
    id:"Teacher_businessUnitka9gvr3ri",
    type:"hasMany",
    model:"teacher",
    displayName:"id",
    formKey:"businessUnitId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  level:{
    id:"Level_businessUnitdp5j9nqn",
    type:"hasMany",
    model:"level",
    displayName:"id",
    formKey:"businessUnitId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  video:{
    id:"Video_businessUnitfpwb9u1s",
    type:"hasMany",
    model:"video",
    displayName:"id",
    formKey:"businessUnitId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  student:{
    id:"Student_businessUnitfcxxrj63",
    type:"hasMany",
    model:"student",
    displayName:"id",
    formKey:"businessUnitId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  result:{
    id:"result_businessUnitlpvob7ok",
    type:"hasMany",
    model:"result",
    displayName:"id",
    formKey:"businessUnitId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  homework:{
    id:"Homework_businessUnit4d455ign",
    type:"hasMany",
    model:"homework",
    displayName:"id",
    formKey:"businessUnitId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  attendance:{
    id:"attendance_businessUnit2zx9l1fe",
    type:"hasMany",
    model:"attendance",
    displayName:"id",
    formKey:"businessUnitId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  subscription:{
    id:"subscription_businessUnith8thhad",
    type:"hasMany",
    model:"subscription",
    displayName:"id",
    formKey:"businessUnitId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  exam:{
    id:"Exam_businessUnitjizupuag",
    type:"hasMany",
    model:"exam",
    displayName:"id",
    formKey:"businessUnitId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 
  submissions:{
    id:"submissions_businessUnitz4ipou7a",
    type:"hasMany",
    model:"submissions",
    displayName:"id",
    formKey:"businessUnitId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: false,
    pivot: false

   }, 

}

export const withArray= [
      "parent",
      "createdBy",
      "modifiedBy",
     ];

export const filterFields = computed(() => {
  return [ 
    {
       attributeType: "Input",
       order: 1,       label: "code",
       name: "code",
       type: 'contains',
       placeholder: "Enter code",
     },
    {
       attributeType: "Input",
       order: 1,       label: "name",
       name: "name",
       type: 'contains',
       placeholder: "Enter name",
     },
]
})
export const filterFormData = ref({
        code: null,
        name: null,

 })
