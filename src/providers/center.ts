import { ref, computed } from "vue"; // Import the ref function from the Vue Composition API

  /* Thats the interface import for Entity */
import type { user } from "./user";
import type { businessUnit } from "./businessUnit";



      /* Thats the interface Export for Entity */
export interface center {
  id: number,
  name: string,
  image: string,
  createdAt: Date,
  modifiedAt: Date,
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


  ].sort((a, b) => a.order - b.order)
);

export const relations={
  teacher:{
    id:"Center_Teacherq71pesx",
    type:"hasMany",
    model:"teacher",
    displayName:"name",
    formKey:"teacherCenterId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 

}

export const withArray= [
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
]
})
export const filterFormData = ref({
        name: null,

 })
