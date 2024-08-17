import { ref, computed } from "vue"; // Import the ref function from the Vue Composition API

  /* Thats the interface import for Entity */
import type { exam } from "./exam";
import type { user } from "./user";
import type { businessUnit } from "./businessUnit";



      /* Thats the interface Export for Entity */
export interface submissions {
  id: number,
  grade: number,
  createdAt: Date,
  modifiedAt: Date,
  submissionsExam: exam,
  owner: user,
  businessUnit: businessUnit,
  createdBy: user,
  modifiedBy: user,
}


  /* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "Grade",
    columnLabel: "grade",
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
    columnName: "SubmissionsExam",
    columnLabel: "submissionsExam",
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
    grade: null,
    createdAt: null,
    modifiedAt: null,
    submissionsExamId: null,
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
    label: "grade",
    name: "grade",
    order: 1,
    placeholder: "Enter grade",
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
    label: "exam",
    order: 1,
    name: "submissionsExamId",
    placeholder: "Enter submissionsExam",
    attributeType: "HasOneRelation",
    displayName:"name",
    relationName: "submissionsExam",
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

}

export const withArray= [
      "submissionsExam",
      "owner",
      "businessUnit",
      "createdBy",
      "modifiedBy",
     ];

export const filterFields = computed(() => {
  return [ 
    {
       attributeType: "InputNumber",
       order: 1,       label: "Min grade", 
       fields: [
        {
          attributeType: "InputNumber",
          type: 'range',
          op: 'gte',
          key: "grade",
          name: "gradeFrom",
          placeholder: 'From'
        },
        {
          attributeType: "InputNumber",
          type: 'range',
          op: 'lte',
          key: "grade",
          name: "gradeTo",
          placeholder: 'To'
        }
      ]
     },
]
})
export const filterFormData = ref({
        minGrade:null,
        maxGrade:null,

 })
