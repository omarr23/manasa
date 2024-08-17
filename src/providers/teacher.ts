import { ref, computed } from "vue"; // Import the ref function from the Vue Composition API

  /* Thats the interface import for Entity */
import type { user } from "./user";
import type { businessUnit } from "./businessUnit";
import type { center } from "./center";



      /* Thats the interface Export for Entity */
export interface teacher {
  id: number,
  name: string,
  image: string,
  createdAt: Date,
  modifiedAt: Date,
  owner: user,
  businessUnit: businessUnit,
  createdBy: user,
  modifiedBy: user,
  teacherCenter: center,
  teacheruser: user,
}


  /* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "Name",
    columnLabel: "name",
    type:"string"
  },
  {
    columnName: "Image",
    columnLabel: "image",
    type:"image"
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
    columnName: "TeacherCenter",
    columnLabel: "teacherCenter",
    type:"hasOne"
  },


  /* It's gonna be static, so you can use it as a constant for all table so we can use the dropdown actions */
  {
    columnName: "Actions",
    columnLabel: "actions",
  },
];

 /* Thats the formFields Export to create dynamic inputs */
export const formData = ref({
    name: null,
    image: null,
    createdAt: null,
    modifiedAt: null,
    ownerId: null,
    businessUnitId: null,
    createdById: null,
    modifiedById: null,
    teacherCenterId: null,
    teacheruserId: null,
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

    max:20,


    min:3,
    rules: [{"required":true},{"min":3},{"max":20}],
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
    label: "center",
    order: 1,
    name: "teacherCenterId",
    placeholder: "Enter teacherCenter",
    attributeType: "HasOneRelation",
    displayName:"name",
    relationName: "teacherCenter",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },





  {
    label: "user",
    order: 1,
    name: "teacheruserId",
    placeholder: "Enter teacheruser",
    attributeType: "HasOneRelation",
    displayName:"email",
    relationName: "teacheruser",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },





  ].sort((a, b) => a.order - b.order)
);

export const relations={
  video:{
    id:"Teacher_Videov2leeaz",
    type:"hasMany",
    model:"video",
    displayName:"Title",
    formKey:"videoTeacherId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 
  result:{
    id:"Teacher_resultk0l812bs",
    type:"hasMany",
    model:"result",
    displayName:"Total",
    formKey:"resultTeacherId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 
  homework:{
    id:"Teacher_Homeworku3miolkk",
    type:"hasMany",
    model:"homework",
    displayName:"Title",
    formKey:"homeworkTeacherId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 
  attendance:{
    id:"Teacher_attendancebqqi5rw6",
    type:"hasMany",
    model:"attendance",
    displayName:"attended",
    formKey:"attendanceTeacherId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 
  subscription:{
    id:"subscription_Teacherbcsqtuo",
    type:"hasMany",
    model:"subscription",
    displayName:"Phone",
    formKey:"subscriptionTeacherId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 
  exam:{
    id:"Exam_Teacherc5nli9kd",
    type:"hasMany",
    model:"exam",
    displayName:"name",
    formKey:"examTeacherId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 

  levelRelation:{ "model": "teacher",
    "relationName": "teachers",
    "relationCollection": "level",
    "relationModel": "levels",
    "relationKey": "teacherLevelId",
    "relationKeyFilter":"levelTeacherId",
    "relationId": "id",
    "searchable": false,
   type:"hasMany",
     pivot: true,
       id:"TeachersOnLevels_Teacherkcijz5ce",
    },
}

export const withArray= [
      "owner",
      "businessUnit",
      "createdBy",
      "modifiedBy",
      "teacherCenter",
      "teacheruser",
     ];

export const filterFields = computed(() => {
  return [ 
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
        name: null,

 })
