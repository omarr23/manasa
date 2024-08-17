import { ref, computed } from "vue"; // Import the ref function from the Vue Composition API

  /* Thats the interface import for Entity */
import type { teacher } from "./teacher";
import type { student } from "./student";
import type { level } from "./level";
import type { user } from "./user";
import type { businessUnit } from "./businessUnit";



      /* Thats the interface Export for Entity */
export interface subscription {
  id: number,
  phone: string,
  activationCode: string,
  createdAt: Date,
  modifiedAt: Date,
  subscriptionTeacher: teacher,
  subscriptionStudent: student,
  subscriptionLevel: level,
  owner: user,
  businessUnit: businessUnit,
  createdBy: user,
  modifiedBy: user,
}


  /* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "Phone",
    columnLabel: "phone",
    type:"string"
  },
  {
    columnName: "ActivationCode",
    columnLabel: "activationCode",
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
    columnName: "SubscriptionTeacher",
    columnLabel: "subscriptionTeacher",
    type:"hasOne"
  },
  {
    columnName: "SubscriptionStudent",
    columnLabel: "subscriptionStudent",
    type:"hasOne"
  },
  {
    columnName: "SubscriptionLevel",
    columnLabel: "subscriptionLevel",
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
    phone: null,
    activationCode: null,
    createdAt: null,
    modifiedAt: null,
    subscriptionTeacherId: null,
    subscriptionStudentId: null,
    subscriptionLevelId: null,
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
    label: "activationCode",
    name: "activationCode",
    order: 1,
    placeholder: "Enter activationCode",
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
    label: "teacher",
    order: 1,
    name: "subscriptionTeacherId",
    placeholder: "Enter subscriptionTeacher",
    attributeType: "HasOneRelation",
    displayName:"name",
    relationName: "subscriptionTeacher",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "student",
    order: 1,
    name: "subscriptionStudentId",
    placeholder: "Enter subscriptionStudent",
    attributeType: "HasOneRelation",
    displayName:"username",
    relationName: "subscriptionStudent",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },

  {
    label: "level",
    order: 1,
    name: "subscriptionLevelId",
    placeholder: "Enter subscriptionLevel",
    attributeType: "HasOneRelation",
    displayName:"name",
    relationName: "subscriptionLevel",
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
      "subscriptionTeacher",
      "subscriptionStudent",
      "subscriptionLevel",
      "owner",
      "businessUnit",
      "createdBy",
      "modifiedBy",
     ];

export const filterFields = computed(() => {
  return [ 
    {
       attributeType: "Input",
       order: 1,       label: "phone",
       name: "phone",
       type: 'contains',
       placeholder: "Enter Phone",
     },
    {
       attributeType: "Input",
       order: 1,       label: "activationCode",
       name: "activationCode",
       type: 'contains',
       placeholder: "Enter activationCode",
     },
]
})
export const filterFormData = ref({
        phone: null,
        activationCode: null,

 })
