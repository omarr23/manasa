import { ref, computed } from "vue"; // Import the ref function from the Vue Composition API

  /* Thats the interface import for Entity */
import type { user } from "./user";
import type { businessUnit } from "./businessUnit";
import type { teacher } from "./teacher";
import type { student } from "./student";



      /* Thats the interface Export for Entity */
export interface result {
  id: number,
  total: number,
  createdAt: Date,
  modifiedAt: Date,
  owner: user,
  businessUnit: businessUnit,
  createdBy: user,
  modifiedBy: user,
  resultTeacher: teacher,
  resultStudent: student,
}


  /* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "Total",
    columnLabel: "total",
    type:"int"
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
    columnName: "ResultTeacher",
    columnLabel: "resultTeacher",
    type:"hasOne"
  },
  {
    columnName: "ResultStudent",
    columnLabel: "resultStudent",
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
    total: null,
    createdAt: null,
    modifiedAt: null,
    ownerId: null,
    businessUnitId: null,
    createdById: null,
    modifiedById: null,
    resultTeacherId: null,
    resultStudentId: null,
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
    label: "total",
    name: "total",
    order: 1,
    placeholder: "Enter Total",
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
    name: "resultTeacherId",
    placeholder: "Enter resultTeacher",
    attributeType: "HasOneRelation",
    displayName:"name",
    relationName: "resultTeacher",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "student",
    order: 1,
    name: "resultStudentId",
    placeholder: "Enter resultStudent",
    attributeType: "HasOneRelation",
    displayName:"username",
    relationName: "resultStudent",
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
      "resultTeacher",
      "resultStudent",
     ];

export const filterFields = computed(() => {
  return [ 
    {
       attributeType: "InputNumber",
       order: 1,       label: "Min total", 
       fields: [
        {
          attributeType: "InputNumber",
          type: 'range',
          op: 'gte',
          key: "total",
          name: "totalFrom",
          placeholder: 'From'
        },
        {
          attributeType: "InputNumber",
          type: 'range',
          op: 'lte',
          key: "total",
          name: "totalTo",
          placeholder: 'To'
        }
      ]
     },
]
})
export const filterFormData = ref({
        minTotal:null,
        maxTotal:null,

 })
