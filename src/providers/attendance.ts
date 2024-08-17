import { ref, computed } from "vue"; // Import the ref function from the Vue Composition API

  /* Thats the interface import for Entity */
import type { user } from "./user";
import type { businessUnit } from "./businessUnit";
import type { teacher } from "./teacher";
import type { level } from "./level";
import type { student } from "./student";
import type { video } from "./video";



      /* Thats the interface Export for Entity */
export interface attendance {
  id: number,
  attended: boolean,
  createdAt: Date,
  modifiedAt: Date,
  owner: user,
  businessUnit: businessUnit,
  createdBy: user,
  modifiedBy: user,
  attendanceTeacher: teacher,
  attendanceLevel: level,
  attendanceStudent: student,
  attendanceVideo: video,
}


  /* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "Attended",
    columnLabel: "attended",
    type:"boolean"
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
    columnName: "AttendanceTeacher",
    columnLabel: "attendanceTeacher",
    type:"hasOne"
  },
  {
    columnName: "AttendanceLevel",
    columnLabel: "attendanceLevel",
    type:"hasOne"
  },
  {
    columnName: "AttendanceStudent",
    columnLabel: "attendanceStudent",
    type:"hasOne"
  },
  {
    columnName: "AttendanceVideo",
    columnLabel: "attendanceVideo",
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
    attended: false,
    createdAt: null,
    modifiedAt: null,
    ownerId: null,
    businessUnitId: null,
    createdById: null,
    modifiedById: null,
    attendanceTeacherId: null,
    attendanceLevelId: null,
    attendanceStudentId: null,
    attendanceVideoId: null,
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
    label: "attended",
    name: "attended",
    order: 3,
    placeholder: "Enter attended",
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
    name: "attendanceTeacherId",
    placeholder: "Enter attendanceTeacher",
    attributeType: "HasOneRelation",
    displayName:"name",
    relationName: "attendanceTeacher",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "level",
    order: 1,
    name: "attendanceLevelId",
    placeholder: "Enter attendanceLevel",
    attributeType: "HasOneRelation",
    displayName:"name",
    relationName: "attendanceLevel",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "student",
    order: 1,
    name: "attendanceStudentId",
    placeholder: "Enter attendanceStudent",
    attributeType: "HasOneRelation",
    displayName:"username",
    relationName: "attendanceStudent",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "video",
    order: 1,
    name: "attendanceVideoId",
    placeholder: "Enter attendanceVideo",
    attributeType: "HasOneRelation",
    displayName:"title",
    relationName: "attendanceVideo",
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
      "attendanceTeacher",
      "attendanceLevel",
      "attendanceStudent",
      "attendanceVideo",
     ];

export const filterFields = computed(() => {
  return [ 
    {
       attributeType: "Checkbox",
       order: 3,       label: "attended",
       name: "attended",
       type: 'boolean',
       op: 'is',
       key:"attended",
       placeholder: "Enter attended",
     },
]
})
export const filterFormData = ref({
        attended: false,

 })
