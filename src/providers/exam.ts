import { ref, computed } from "vue"; // Import the ref function from the Vue Composition API

  /* Thats the interface import for Entity */
import type { level } from "./level";
import type { video } from "./video";
import type { teacher } from "./teacher";
import type { user } from "./user";
import type { businessUnit } from "./businessUnit";



      /* Thats the interface Export for Entity */
export interface exam {
  id: number,
  name: string,
  time: Date,
  numberOfQuestions: number,
  image: string,
  createdAt: Date,
  modifiedAt: Date,
  examLevel: level,
  examVideo: video,
  examTeacher: teacher,
  owner: user,
  businessUnit: businessUnit,
  createdBy: user,
  modifiedBy: user,
}


  /* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "Name",
    columnLabel: "name",
    type:"string"
  },
  {
    columnName: "Time",
    columnLabel: "time",
    type:"time"
  },
  {
    columnName: "NumberOfQuestions",
    columnLabel: "numberOfQuestions",
    type:"int"
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
    columnName: "ExamLevel",
    columnLabel: "examLevel",
    type:"hasOne"
  },
  {
    columnName: "ExamVideo",
    columnLabel: "examVideo",
    type:"hasOne"
  },
  {
    columnName: "ExamTeacher",
    columnLabel: "examTeacher",
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
    time: null,
    numberOfQuestions: null,
    image: null,
    createdAt: null,
    modifiedAt: null,
    examLevelId: null,
    examVideoId: null,
    examTeacherId: null,
    ownerId: null,
    businessUnitId: null,
    createdById: null,
    modifiedById: null,
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

    rules: [],
  },
 {
    label: "time",
    name: "time",
    order: 1,
    placeholder: "Enter time",
    attributeType: "Time",
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
    label: "numberOfQuestions",
    name: "numberOfQuestions",
    order: 1,
    placeholder: "Enter NumberOfQuestions",
    attributeType: "InputNumber",
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
    label: "level",
    order: 1,
    name: "examLevelId",
    placeholder: "Enter examLevel",
    attributeType: "HasOneRelation",
    displayName:"name",
    relationName: "examLevel",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "video",
    order: 1,
    name: "examVideoId",
    placeholder: "Enter examVideo",
    attributeType: "HasOneRelation",
    displayName:"title",
    relationName: "examVideo",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "teacher",
    order: 1,
    name: "examTeacherId",
    placeholder: "Enter examTeacher",
    attributeType: "HasOneRelation",
    displayName:"name",
    relationName: "examTeacher",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
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




  ].sort((a, b) => a.order - b.order)
);

export const relations={
  submissions:{
    id:"submissions_Examdmtb0a7l",
    type:"hasMany",
    model:"submissions",
    displayName:"grade",
    formKey:"submissionsExamId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 

  studentRelation:{ "model": "exam",
    "relationName": "exams",
    "relationCollection": "student",
    "relationModel": "students",
    "relationKey": "examStudentId",
    "relationKeyFilter":"studentExamId",
    "relationId": "id",
    "searchable": false,
   type:"hasMany",
     pivot: true,
       id:"ExamsOnStudents_Examx2g3mrrq",
    },
}

export const withArray= [
      "examLevel",
      "examVideo",
      "examTeacher",
      "owner",
      "businessUnit",
      "createdBy",
      "modifiedBy",
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
    {
       attributeType: "Time",
       order: 1,       label: "time",
       fields: [
        {
          attributeType: "Time",
          type: 'range',
          op: 'gte',
          key: "time",
          name: "timeFrom",
          placeholder: 'From'
        },
        {
          attributeType: "Time",
          type: 'range',
          op: 'lte',
          key: "time",
          name: "timeTo",
          placeholder: 'To'
        }
      ]
     },
    {
       attributeType: "InputNumber",
       order: 1,       label: "Min numberOfQuestions", 
       fields: [
        {
          attributeType: "InputNumber",
          type: 'range',
          op: 'gte',
          key: "numberOfQuestions",
          name: "numberOfQuestionsFrom",
          placeholder: 'From'
        },
        {
          attributeType: "InputNumber",
          type: 'range',
          op: 'lte',
          key: "numberOfQuestions",
          name: "numberOfQuestionsTo",
          placeholder: 'To'
        }
      ]
     },
]
})
export const filterFormData = ref({
        name: null,
        TimeFrom:null,
        TimeTo:null,
        minNumberOfQuestions:null,
        maxNumberOfQuestions:null,

 })
