import { ref, computed } from 'vue' // Import the ref function from the Vue Composition API

/* Thats the interface import for Entity */

/* Thats the interface Export for Entity */
export interface eventConfiguration {
  id: number
  name: string
  event: string
  entity: string
  hookUrl: string
  createdAt: Date
  modifiedAt: Date
}

/* Thats the tableHeader for the table in index file */
export const tableHeader = [
  {
    columnName: 'Name',
    columnLabel: 'name',
    type: 'string'
  },
  {
    columnName: 'Event',
    columnLabel: 'event',
    type: 'MultiSelectCommaSeparated'
  },
  {
    columnName: 'Entity',
    columnLabel: 'entity',
    type: 'string'
  },
  {
    columnName: 'HookUrl',
    columnLabel: 'hookUrl',
    type: 'string'
  },
  {
    columnName: 'CreatedAt',
    columnLabel: 'createdAt',
    type: 'createdAt'
  },
  {
    columnName: 'ModifiedAt',
    columnLabel: 'modifiedAt',
    type: 'modifiedAt'
  },

  /* It's gonna be static, so you can use it as a constant for all table so we can use the dropdown actions */
  {
    columnName: 'Actions',
    columnLabel: 'actions'
  }
]

/* Thats the formFields Export to create dynamic inputs */
export const formData = ref({
  name: null,
  event: null,
  entity: null,
  hookUrl: null,
  createdAt: null,
  modifiedAt: null
})

/* Thats the formFields Export to create dynamic inputs */
export const defaultFormFields = computed(() => {
  return []
})

export const formFields = ref(
  [
    {
      label: 'name',
      name: 'name',
      order: 1,
      placeholder: 'Enter name',
      attributeType: 'Input',
      display: {
        create: true,
        list: true,
        view: true,
        edit: true
      },
      allowedExtensions: [],
      options: [],

      isHidden: false,

      rules: []
    },
    {
      label: 'event',
      name: 'event',
      order: 1,
      placeholder: 'Enter event',
      attributeType: 'MultiSelectCommaSeparated',
      display: {
        create: true,
        list: true,
        view: true,
        edit: true
      },
      allowedExtensions: [],
      options: ['AfterCreate', 'AfterUpdate', 'AfterDelete'], // temo will be dynamic from config api

      isHidden: false,

      rules: [{ required: true }]
    },
    {
      label: 'entity',
      name: 'entity',
      order: 1,
      placeholder: 'Enter entity',
      attributeType: 'Input',
      display: {
        create: true,
        list: true,
        view: true,
        edit: true
      },
      allowedExtensions: [],
      options: [],

      isHidden: false,

      rules: []
    },
    {
      label: 'hookUrl',
      name: 'hookUrl',
      order: 1,
      placeholder: 'Enter hookUrl',
      attributeType: 'Input',
      display: {
        create: true,
        list: true,
        view: true,
        edit: true
      },
      allowedExtensions: [],
      options: [],

      isHidden: false,

      rules: []
    },
    {
      label: 'createdAt',
      name: 'createdAt',
      order: 1,
      placeholder: 'Enter createdAt',
      attributeType: '',
      display: {
        create: false,
        list: true,
        view: true,
        edit: false
      },
      allowedExtensions: [],
      options: [],

      isHidden: false,

      rules: []
    },
    {
      label: 'modifiedAt',
      name: 'modifiedAt',
      order: 1,
      placeholder: 'Enter modifiedAt',
      attributeType: '',
      display: {
        create: false,
        list: true,
        view: true,
        edit: false
      },
      allowedExtensions: [],
      options: [],

      isHidden: false,

      rules: []
    }
  ].sort((a, b) => a.order - b.order)
)

export const relations = {}

export const withArray = []

export const filterFields = computed(() => {
  return [
    {
      attributeType: 'Input',
      order: 1,
      label: 'name',
      name: 'name',
      type: 'contains',
      placeholder: 'Enter name'
    },
    {
      attributeType: 'Input',
      order: 1,
      label: 'event',
      name: 'event',
      type: 'contains',
      placeholder: 'Enter event'
    },
    {
      attributeType: 'Input',
      order: 1,
      label: 'entity',
      name: 'entity',
      type: 'contains',
      placeholder: 'Enter entity'
    },
    {
      attributeType: 'Input',
      order: 1,
      label: 'hookUrl',
      name: 'hookUrl',
      type: 'contains',
      placeholder: 'Enter hookUrl'
    }
  ]
})
export const filterFormData = ref({
  name: null,
  event: null,
  entity: null,
  hookUrl: null
})
