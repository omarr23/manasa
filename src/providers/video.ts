import { ref, computed } from "vue"; // Import the ref function from the Vue Composition API

  /* Thats the interface import for Entity */
import type { user } from "./user";
import type { businessUnit } from "./businessUnit";
import type { teacher } from "./teacher";



      /* Thats the interface Export for Entity */
export interface video {
  id: number,
  title: string,
  urlServer1: string,
  urlServer2: string,
  urlServer3: string,
  thumbnail: string,
  details: string,
  activationcode: string,
  createdAt: Date,
  modifiedAt: Date,
  owner: user,
  businessUnit: businessUnit,
  createdBy: user,
  modifiedBy: user,
  videoTeacher: teacher,
}


  /* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: "Title",
    columnLabel: "title",
    type:"string"
  },
  {
    columnName: "UrlServer1",
    columnLabel: "urlServer1",
    type:"string"
  },
  {
    columnName: "UrlServer2",
    columnLabel: "urlServer2",
    type:"string"
  },
  {
    columnName: "UrlServer3",
    columnLabel: "urlServer3",
    type:"string"
  },
  {
    columnName: "Thumbnail",
    columnLabel: "thumbnail",
    type:"image"
  },
  {
    columnName: "Details",
    columnLabel: "details",
    type:"text"
  },
  {
    columnName: "Activationcode",
    columnLabel: "activationcode",
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
    columnName: "VideoTeacher",
    columnLabel: "videoTeacher",
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
    urlServer1: null,
    urlServer2: null,
    urlServer3: null,
    thumbnail: null,
    details: null,
    activationcode: null,
    createdAt: null,
    modifiedAt: null,
    ownerId: null,
    businessUnitId: null,
    createdById: null,
    modifiedById: null,
    videoTeacherId: null,
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
    label: "urlServer1",
    name: "urlServer1",
    order: 1,
    placeholder: "Enter URLServer1",
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
    label: "urlServer2",
    name: "urlServer2",
    order: 1,
    placeholder: "Enter URLServer2",
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
    label: "urlServer3",
    name: "urlServer3",
    order: 1,
    placeholder: "Enter URLServer3",
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
    label: "thumbnail",
    name: "thumbnail",
    order: 1,
    placeholder: "Enter Thumbnail",
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
    label: "details",
    name: "details",
    order: 2,
    placeholder: "Enter Details",
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
    label: "activationcode",
    name: "activationcode",
    order: 1,
    placeholder: "Enter Activationcode",
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
    name: "videoTeacherId",
    placeholder: "Enter videoTeacher",
    attributeType: "HasOneRelation",
    displayName:"name",
    relationName: "videoTeacher",
    rules: [],
    isHidden: false,
    isDisable: false,
    constrains:[
    ],
  },




  ].sort((a, b) => a.order - b.order)
);

export const relations={
  exam:{
    id:"Exam_Videotoc9m3zg",
    type:"hasMany",
    model:"exam",
    displayName:"name",
    formKey:"examVideoId",
    fillable: false, 
    required: false,
    unique: false,
    constrains: "",
    configurable: true,
    pivot: false

   }, 
  attendance:{
    id:"attendance_Video2uekcz9m",
    type:"hasMany",
    model:"attendance",
    displayName:"attended",
    formKey:"attendanceVideoId",
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
      "videoTeacher",
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
       order: 1,       label: "urlServer1",
       name: "urlServer1",
       type: 'contains',
       placeholder: "Enter URLServer1",
     },
    {
       attributeType: "Input",
       order: 1,       label: "urlServer2",
       name: "urlServer2",
       type: 'contains',
       placeholder: "Enter URLServer2",
     },
    {
       attributeType: "Input",
       order: 1,       label: "urlServer3",
       name: "urlServer3",
       type: 'contains',
       placeholder: "Enter URLServer3",
     },
    {
       attributeType: "Input",
       order: 2,       label: "details",
       name: "details",
       type: 'contains',
       placeholder: "Enter Details",
     },
    {
       attributeType: "Input",
       order: 1,       label: "activationcode",
       name: "activationcode",
       type: 'contains',
       placeholder: "Enter Activationcode",
     },
]
})
export const filterFormData = ref({
        title: null,
        urlServer1: null,
        urlServer2: null,
        urlServer3: null,
        details: null,
        activationcode: null,

 })
