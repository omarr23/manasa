import { ref, computed } from "vue"; // Import the ref function from the Vue Composition API

  /* Thats the interface import for Entity */
import type { user } from "./user";
import type { businessUnit } from "./businessUnit";
import type { teacher } from "./teacher";
import type { video } from "./video";
import type { student } from "./student";



      /* Thats the interface Export for Entity */
export interface homework {
  id: number,
  title: string,
  description: string,
  createdAt: Date,
  modifiedAt: Date,
  owner: user,
  businessUnit: businessUnit,
  createdBy: user,
  modifiedBy: user,
  homeworkTeacher: teacher,
  homeworkVideo: video,
  homeworkStudent: student,
}


  /* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "Title",
    columnLabel: "title",
    type:"string"
  },
  {
    columnName: "Description",
    columnLabel: "description",
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
    columnName: "HomeworkTeacher",
    columnLabel: "homeworkTeacher",
    type:"hasOne"
  },
  {
    columnName: "HomeworkVideo",
    columnLabel: "homeworkVideo",
    type:"hasOne"
  },
  {
    columnName: "HomeworkStudent",
    columnLabel: "homeworkStudent",
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
    title: null,
    description: null,
    createdAt: null,
    modifiedAt: null,
    ownerId: null,
    businessUnitId: null,
    createdById: null,
    modifiedById: null,
    homeworkTeacherId: null,
    homeworkVideoId: null,
    homeworkStudentId: null,
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
    label: "title",
    name: "title",
    order: 1,
    placeholder: "Enter Title",
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
    label: "description",
    name: "description",
    order: 1,
    placeholder: "Enter Description",
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
    label: "teacher",
    order: 1,
    name: "homeworkTeacherId",
    placeholder: "Enter homeworkTeacher",
    attributeType: "HasOneRelation",
    displayName:"name",
    relationName: "homeworkTeacher",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "video",
    order: 1,
    name: "homeworkVideoId",
    placeholder: "Enter homeworkVideo",
    attributeType: "HasOneRelation",
    displayName:"title",
    relationName: "homeworkVideo",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "student",
    order: 1,
    name: "homeworkStudentId",
    placeholder: "Enter homeworkStudent",
    attributeType: "HasOneRelation",
    displayName:"username",
    relationName: "homeworkStudent",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },

  ].sort((a, b) => a.order - b.order)
);

export const relations={

}

export const withArray= [
      "owner",
      "businessUnit",
      "createdBy",
      "modifiedBy",
      "homeworkTeacher",
      "homeworkVideo",
      "homeworkStudent",
     ];

export const filterFields = computed(() => {
  return [ 
    {
       attributeType: "Input",
       order: 1,       label: "title",
       name: "title",
       type: 'contains',
       placeholder: "Enter Title",
     },
    {
       attributeType: "Input",
       order: 1,       label: "description",
       name: "description",
       type: 'contains',
       placeholder: "Enter Description",
     },
]
})
export const filterFormData = ref({
        title: null,
        description: null,

 })
